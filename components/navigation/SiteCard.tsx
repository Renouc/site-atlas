import type { SiteRecord } from "@/types/site";

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
  return (
    <article className="group flex h-full flex-col rounded-[2rem] border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.45)] transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_24px_48px_-28px_rgba(15,23,42,0.55)]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {site.category}
        </span>
        <button
          type="button"
          onClick={() => onTogglePin(site.id)}
          aria-pressed={isPinned}
          className={[
            "rounded-full px-3 py-1 text-xs font-semibold transition",
            isPinned
              ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
              : "bg-slate-100 text-slate-500 hover:bg-slate-200",
          ].join(" ")}
          aria-label={isPinned ? `取消置顶 ${site.name}` : `置顶 ${site.name}`}
        >
          {isPinned ? "★ 已置顶" : "☆ 置顶"}
        </button>
      </div>

      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 flex-col gap-4 rounded-[1.5rem] outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-950">{site.name}</h3>
            <span className="text-sm text-slate-400">↗</span>
          </div>
          <p className="text-sm leading-6 text-slate-600">{site.description}</p>
        </div>

        {site.note ? (
          <p className="rounded-2xl bg-slate-50 px-3 py-2 text-sm text-slate-500">
            {site.note}
          </p>
        ) : null}

        <div className="mt-auto flex flex-wrap gap-2">
          {site.tags.map((tag) => (
            <span
              key={`${site.id}-${tag}`}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </a>
    </article>
  );
}
