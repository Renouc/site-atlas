import { Search, X } from "lucide-react";

type SearchBarProps = {
  value: string;
  resultCount: number;
  hasActiveFilters: boolean;
  onChange: (value: string) => void;
  onReset: () => void;
};

export default function SearchBar({
  value,
  resultCount,
  hasActiveFilters,
  onChange,
  onReset,
}: SearchBarProps) {
  return (
    <div className="space-y-2.5">
      <div className="flex gap-3">
        <label className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400 dark:text-slate-500"
            strokeWidth={2}
          />
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="搜索名称、描述或标签"
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white/90 pl-11 pr-4 text-base text-slate-900 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.1)] outline-none transition-all duration-200 ease-out placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:shadow-[0_0_0_3px_rgba(99,102,241,0.12),0_2px_12px_-4px_rgba(15,23,42,0.1)] dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-100 dark:shadow-none dark:placeholder:text-slate-500 dark:focus:border-indigo-500 dark:focus:bg-slate-800 dark:focus:shadow-[0_0_0_3px_rgba(99,102,241,0.2)]"
          />
        </label>

        {hasActiveFilters ? (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-12 cursor-pointer items-center gap-2 whitespace-nowrap rounded-2xl border border-slate-200 bg-white/90 px-4 text-sm font-medium text-slate-500 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.1)] transition-all duration-150 ease-out hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 active:scale-95 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-400 dark:shadow-none dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-200"
          >
            <X className="h-4 w-4" strokeWidth={2} />
            清空条件
          </button>
        ) : null}
      </div>

      <p className="pl-1 text-xs text-slate-500 dark:text-slate-400">
        {value.trim() || hasActiveFilters
          ? `当前匹配 ${resultCount} 个站点`
          : `已收录 ${resultCount} 个站点`}
      </p>
    </div>
  );
}
