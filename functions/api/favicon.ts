/**
 * Cloudflare Pages Function: /api/favicon?domain=example.com
 *
 * 在 Cloudflare 边缘节点（国内可达）代理 favicon 请求，
 * 避免客户端直连 Google 被 GFW 阻断的问题。
 *
 * 优先级：Google S2 → 目标站 favicon.ico → 404
 * 缓存：浏览器 1 天 / 边缘 7 天，命中缓存后延迟可忽略不计。
 */

const CACHE_CONTROL = "public, max-age=86400, s-maxage=604800, stale-while-revalidate=3600";

function isValidDomain(domain: string): boolean {
  return (
    domain.length > 0 &&
    domain.length <= 253 &&
    /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i.test(domain) &&
    !/^\d+(\.\d+){3}$/.test(domain) // 排除裸 IPv4，防 SSRF
  );
}

async function tryFetch(url: string, timeoutMs = 5000): Promise<Response | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) });
    if (res.ok) return res;
  } catch {
    // 超时或网络错误，继续降级
  }
  return null;
}

export async function onRequestGet({ request }: { request: Request }): Promise<Response> {
  const domain = new URL(request.url).searchParams.get("domain") ?? "";

  if (!isValidDomain(domain)) {
    return new Response(null, { status: 400 });
  }

  // 1. 优先从 Google S2 获取高质量 favicon
  const googleRes = await tryFetch(
    `https://www.google.com/s2/favicons?sz=64&domain=${domain}`
  );
  if (googleRes) {
    return new Response(await googleRes.arrayBuffer(), {
      headers: {
        "Content-Type": googleRes.headers.get("Content-Type") ?? "image/png",
        "Cache-Control": CACHE_CONTROL,
      },
    });
  }

  // 2. 降级：直接拉取目标站的 favicon.ico
  const directRes = await tryFetch(`https://${domain}/favicon.ico`);
  if (directRes) {
    return new Response(await directRes.arrayBuffer(), {
      headers: {
        "Content-Type": directRes.headers.get("Content-Type") ?? "image/x-icon",
        "Cache-Control": CACHE_CONTROL,
      },
    });
  }

  // 3. 全部失败 → 返回 404，触发客户端字母头像降级
  return new Response(null, { status: 404 });
}
