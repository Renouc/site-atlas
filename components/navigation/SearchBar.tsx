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
    <div className="rounded-[2rem] border border-slate-200/80 bg-white/85 p-4 shadow-[0_18px_50px_-28px_rgba(15,23,42,0.45)] backdrop-blur">
      <label className="flex flex-col gap-3">
        <span className="text-sm font-medium text-slate-600">
          搜索名称、描述或标签
        </span>
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="例如：文档、部署、AI、设计"
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
          />
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={onReset}
              className="h-12 rounded-2xl border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-100"
            >
              清空条件
            </button>
          ) : null}
        </div>
      </label>
      <p className="mt-3 text-sm text-slate-500">当前匹配 {resultCount} 个站点</p>
    </div>
  );
}
