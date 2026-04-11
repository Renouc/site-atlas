/**
 * Next.js Route Handler: GET /api/favicon?domain=example.com
 *
 * 在边缘节点代理 favicon，避免客户端直连 Google 被 GFW 阻断。
 * 降级链：Google S2 → DuckDuckGo → 目标站 favicon.ico → 404
 */

export const runtime = "edge";

const CACHE_CONTROL =
  "public, max-age=86400, s-maxage=604800, stale-while-revalidate=3600";

const UA = "Mozilla/5.0 (compatible; FaviconProxy/1.0)";

function isValidDomain(domain: string): boolean {
  return (
    domain.length > 0 &&
    domain.length <= 253 &&
    /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i.test(domain) &&
    !/^\d+(\.\d+){3}$/.test(domain)
  );
}

async function tryFetch(url: string, timeoutMs = 5000): Promise<Response | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": UA },
    });
    clearTimeout(timer);
    if (res.ok) return res;
  } catch {
    // 超时或网络错误，继续降级
  }
  clearTimeout(timer);
  return null;
}

export async function GET(request: Request): Promise<Response> {
  const domain = new URL(request.url).searchParams.get("domain") ?? "";

  if (!isValidDomain(domain)) {
    return new Response(null, { status: 400 });
  }

  const sources = [
    `https://www.google.com/s2/favicons?sz=64&domain=${domain}`,
    `https://icons.duckduckgo.com/ip3/${domain}.ico`,
    `https://${domain}/favicon.ico`,
  ];

  for (const url of sources) {
    const res = await tryFetch(url);
    if (res) {
      return new Response(await res.arrayBuffer(), {
        headers: {
          "Content-Type": res.headers.get("Content-Type") ?? "image/png",
          "Cache-Control": CACHE_CONTROL,
        },
      });
    }
  }

  return new Response(null, { status: 404 });
}
