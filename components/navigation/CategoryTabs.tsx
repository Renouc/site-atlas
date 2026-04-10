import { ALL_CATEGORY } from "@/types/site";
import type { SiteCategory, SiteCategoryFilter } from "@/types/site";

const CATEGORY_DOT: Record<string, string> = {
  "开发": "bg-emerald-400",
  "AI / LLM": "bg-violet-400",
  "设计": "bg-rose-400",
  "工具": "bg-amber-400",
  "学习": "bg-sky-400",
  "资讯": "bg-slate-400",
};

const CATEGORY_ACTIVE: Record<string, string> = {
  "全部": "bg-slate-900 text-white shadow-[0_4px_16px_-4px_rgba(15,23,42,0.5)] dark:bg-slate-100 dark:text-slate-900 dark:shadow-none",
  "开发": "bg-emerald-600 text-white shadow-[0_4px_12px_-3px_rgba(16,185,129,0.5)] dark:bg-emerald-500 dark:shadow-[0_4px_12px_-3px_rgba(16,185,129,0.6)]",
  "AI / LLM": "bg-violet-600 text-white shadow-[0_4px_12px_-3px_rgba(124,58,237,0.5)] dark:bg-violet-500 dark:shadow-[0_4px_12px_-3px_rgba(124,58,237,0.6)]",
  "设计": "bg-rose-500 text-white shadow-[0_4px_12px_-3px_rgba(244,63,94,0.5)] dark:bg-rose-500 dark:shadow-[0_4px_12px_-3px_rgba(244,63,94,0.6)]",
  "工具": "bg-amber-500 text-white shadow-[0_4px_12px_-3px_rgba(245,158,11,0.5)] dark:bg-amber-500 dark:shadow-[0_4px_12px_-3px_rgba(245,158,11,0.6)]",
  "学习": "bg-sky-600 text-white shadow-[0_4px_12px_-3px_rgba(14,165,233,0.5)] dark:bg-sky-500 dark:shadow-[0_4px_12px_-3px_rgba(14,165,233,0.6)]",
  "资讯": "bg-slate-600 text-white shadow-[0_4px_12px_-3px_rgba(71,85,105,0.5)] dark:bg-slate-500 dark:shadow-[0_4px_12px_-3px_rgba(71,85,105,0.6)]",
};

type CategoryTabsProps = {
  categories: readonly SiteCategory[];
  selectedCategory: SiteCategoryFilter;
  onSelect: (category: SiteCategoryFilter) => void;
};

export default function CategoryTabs({
  categories,
  selectedCategory,
  onSelect,
}: CategoryTabsProps) {
  const categoryOptions = [ALL_CATEGORY, ...categories];

  return (
    <div className="flex flex-wrap gap-2">
      {categoryOptions.map((category) => {
        const isActive = category === selectedCategory;
        const dot = CATEGORY_DOT[category];
        const activeClass = CATEGORY_ACTIVE[category] ?? CATEGORY_ACTIVE["全部"];

        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            className={[
              "inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-150 ease-out active:scale-95",
              isActive
                ? activeClass
                : "bg-white/90 text-slate-600 ring-1 ring-slate-200 shadow-[0_1px_4px_-2px_rgba(15,23,42,0.08)] hover:bg-slate-50 hover:ring-slate-300 dark:bg-slate-800/80 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-700/80 dark:hover:ring-slate-600",
            ].join(" ")}
          >
            {dot && category !== ALL_CATEGORY ? (
              <span
                className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-white/70" : dot}`}
              />
            ) : null}
            {category}
          </button>
        );
      })}
    </div>
  );
}
