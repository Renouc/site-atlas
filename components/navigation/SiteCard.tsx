import { ExternalLink, Pin } from "lucide-react";

import FaviconAvatar from "@/components/navigation/FaviconAvatar";
import type { SiteRecord } from "@/types/site";

const CATEGORY_BADGE: Record<string, string> = {
  开发:
    "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-800",
  "AI / LLM":
    "bg-violet-50 text-violet-600 ring-1 ring-violet-200 dark:bg-violet-950/50 dark:text-violet-300 dark:ring-violet-800",
  设计:
    "bg-rose-50 text-rose-600 ring-1 ring-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:ring-rose-800",
  工具:
    "bg-amber-50 text-amber-600 ring-1 ring-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:ring-amber-800",
  学习:
    "bg-sky-50 text-sky-600 ring-1 ring-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:ring-sky-800",
  资讯:
    "bg-slate-100 text-slate-500 ring-1 ring-slate-200 dark:bg-slate-700/50 dark:text-slate-300 dark:ring-slate-600",
};

const DEFAULT_BADGE =
  "bg-slate-100 text-slate-500 ring-1 ring-slate-200 dark:bg-slate-700/50 dark:text-slate-300 dark:ring-slate-600";

const CATEGORY_AVATAR: Record<string, string> = {
  开发:
    "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-300",
  "AI / LLM":
    "bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-300",
  设计: "bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-300",
  工具:
    "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-300",
  学习: "bg-sky-100 text-sky-600 dark:bg-sky-900/50 dark:text-sky-300",
  资讯:
    "bg-slate-100 text-slate-500 dark:bg-slate-700/60 dark:text-slate-300",
};

const DEFAULT_AVATAR =
  "bg-slate-100 text-slate-500 dark:bg-slate-700/60 dark:text-slate-300";

type SiteCardProps = {
  site: SiteRecord;
  isPinned: boolean;
  index: number;
  onTogglePin: (siteId: string) => void;
};

export default function SiteCard({
  site,
  isPinned,
  index,
  onTogglePin,
}: SiteCardProps) {
  const badgeClass = CATEGORY_BADGE[site.category] ?? DEFAULT_BADGE;
  const avatarClass = CATEGORY_AVATAR[site.category] ?? DEFAULT_AVATAR;
  const initial = [...site.name][0]?.toUpperCase() ?? "?";

  const domain = (() => {
    try {
      return new URL(site.url).hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
  })();

  return (
    <article
      className="animate-fade-up group relative flex flex-col rounded-2xl border border-slate-200/80 bg-white/95 shadow-[0_2px_16px_-6px_rgba(15,23,42,0.1)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_10px_36px_-8px_rgba(15,23,42,0.16)] active:scale-[0.99] active:translate-y-0 dark:border-slate-700/80 dark:bg-slate-800/90 dark:hover:border-slate-600 dark:shadow-none dark:hover:shadow-none"
      style={{ animationDelay: `${Math.min(index * 45, 360)}ms` }}
    >
      <button
        type="button"
        onClick={() => onTogglePin(site.id)}
        aria-pressed={isPinned}
        aria-label={isPinned ? `取消常用 ${site.name}` : `设为常用 ${site.name}`}
        title={isPinned ? `取消常用 ${site.name}` : `设为常用 ${site.name}`}
        className={[
          "absolute right-3.5 top-3.5 z-10 cursor-pointer rounded-xl p-1.5 transition-all duration-150 ease-out active:scale-90",
          isPinned
            ? "bg-amber-100 text-amber-500 dark:bg-amber-900/40 dark:text-amber-300"
            : "text-slate-300 opacity-0 hover:bg-slate-100 hover:text-slate-500 group-hover:opacity-100 dark:text-slate-600 dark:hover:bg-slate-700/80 dark:hover:text-slate-400",
        ].join(" ")}
      >
        <Pin className="h-3.5 w-3.5" strokeWidth={2} />
      </button>

      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 flex-col gap-4 rounded-2xl p-5 outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
      >
        <div className="flex items-start gap-3 pr-6">
          <FaviconAvatar
            domain={domain}
            initial={initial}
            avatarClass={avatarClass}
          />

          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex items-center gap-1.5">
              <h3 className="truncate text-base font-semibold text-slate-950 transition-colors duration-150 group-hover:text-indigo-700 dark:text-slate-100 dark:group-hover:text-indigo-400">
                {site.name}
              </h3>
              <ExternalLink
                className="h-3 w-3 shrink-0 text-slate-300 transition-colors duration-150 group-hover:text-indigo-400 dark:text-slate-600 dark:group-hover:text-indigo-400"
                strokeWidth={2.5}
              />
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
              {domain ? (
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  {domain}
                </span>
              ) : null}
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${badgeClass}`}
              >
                {site.category}
              </span>
            </div>
          </div>
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
                className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-500 dark:bg-slate-700 dark:text-slate-400"
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
