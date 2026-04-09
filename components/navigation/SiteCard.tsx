import { ExternalLink, Pin, PinOff } from "lucide-react";

import type { SiteRecord } from "@/types/site";

const CATEGORY_BADGE: Record<string, string> = {
  常用: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:ring-indigo-800",
  开发: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-800",
  "AI / LLM":
    "bg-violet-50 text-violet-700 ring-1 ring-violet-200 dark:bg-violet-950/50 dark:text-violet-300 dark:ring-violet-800",
  设计: "bg-rose-50 text-rose-700 ring-1 ring-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:ring-rose-800",
  工具: "bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:ring-amber-800",
  学习: "bg-sky-50 text-sky-700 ring-1 ring-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:ring-sky-800",
  资讯: "bg-slate-100 text-slate-600 ring-1 ring-slate-200 dark:bg-slate-700/50 dark:text-slate-300 dark:ring-slate-600",
};

const DEFAULT_BADGE =
  "bg-slate-100 text-slate-600 ring-1 ring-slate-200 dark:bg-slate-700/50 dark:text-slate-300 dark:ring-slate-600";

type SiteCardProps = {
  site: SiteRecord;
  isPinned: boolean;
  onTogglePin: (siteId: string) => void;
};

export default function SiteCard({
  site,
  isPinned,
  onTogglePin,
}: SiteCardProps) {
  const badgeClass = CATEGORY_BADGE[site.category] ?? DEFAULT_BADGE;

  const domain = (() => {
    try {
      return new URL(site.url).hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
  })();

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-[0_2px_16px_-6px_rgba(15,23,42,0.12)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_8px_32px_-8px_rgba(15,23,42,0.18)] active:scale-[0.99] active:translate-y-0 dark:border-slate-700/80 dark:bg-slate-800/90 dark:hover:border-slate-600 dark:shadow-none dark:hover:shadow-none">
      <div className="mb-3.5 flex items-center justify-between gap-3">
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClass}`}>
          {site.category}
        </span>
        <button
          type="button"
          onClick={() => onTogglePin(site.id)}
          aria-pressed={isPinned}
          aria-label={isPinned ? `取消置顶 ${site.name}` : `置顶 ${site.name}`}
          className={[
            "inline-flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-150 ease-out active:scale-95",
            isPinned
              ? "bg-amber-100 text-amber-600 ring-1 ring-amber-200 hover:bg-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:ring-amber-700 dark:hover:bg-amber-900/60"
              : "text-slate-500 ring-1 ring-slate-200 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:ring-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-200",
          ].join(" ")}
        >
          {isPinned ? (
            <PinOff className="h-3.5 w-3.5" strokeWidth={2.2} />
          ) : (
            <Pin className="h-3.5 w-3.5" strokeWidth={2.2} />
          )}
          {isPinned ? "取消置顶" : "置顶"}
        </button>
      </div>

      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 flex-col gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      >
        <div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-base font-semibold text-slate-950 transition-colors duration-150 group-hover:text-indigo-700 dark:text-slate-100 dark:group-hover:text-indigo-400">
              {site.name}
            </h3>
            <ExternalLink
              className="shrink-0 text-slate-300 transition-colors duration-150 group-hover:text-indigo-400 dark:text-slate-600 dark:group-hover:text-indigo-400"
              strokeWidth={2.2}
              size={12}
            />
          </div>
          {domain ? (
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-500">
              {domain}
            </p>
          ) : null}
        </div>

        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          {site.description}
        </p>

        {site.note ? (
          <p className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-500 ring-1 ring-slate-100 dark:bg-slate-700/50 dark:text-slate-400 dark:ring-slate-600">
            {site.note}
          </p>
        ) : null}

        {site.tags.length > 0 ? (
          <div className="mt-auto flex flex-wrap gap-1.5">
            {site.tags.map((tag) => (
              <span
                key={`${site.id}-${tag}`}
                className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600 dark:bg-slate-700 dark:text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </a>
    </article>
  );
}
