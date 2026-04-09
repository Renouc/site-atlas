import { ALL_CATEGORY } from "@/types/site";
import type { SiteCategory, SiteCategoryFilter } from "@/types/site";

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

        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            className={[
              "rounded-full px-4 py-2 text-sm font-medium transition",
              isActive
                ? "bg-slate-900 text-white shadow-[0_14px_30px_-18px_rgba(15,23,42,0.9)]"
                : "bg-white/80 text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100",
            ].join(" ")}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
