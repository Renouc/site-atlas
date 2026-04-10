"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";

type SearchBarProps = {
  value: string;
  hasActiveFilters: boolean;
  onChange: (value: string) => void;
  onReset: () => void;
};

export default function SearchBar({
  value,
  hasActiveFilters,
  onChange,
  onReset,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (e.key === "/" && !isTyping) {
        e.preventDefault();
        inputRef.current?.focus();
        return;
      }

      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        if (inputRef.current?.value) {
          onChange("");
        } else {
          inputRef.current?.blur();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onChange]);

  const showHint = !isFocused && !value;

  return (
    <div>
      <div className="flex gap-3">
        <label className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400 dark:text-slate-500"
            strokeWidth={2}
          />
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="搜索网站、用途或标签"
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white/90 pl-11 pr-4 text-base text-slate-900 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.1)] outline-none transition-all duration-200 ease-out placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:shadow-[0_0_0_3px_rgba(99,102,241,0.12),0_2px_12px_-4px_rgba(15,23,42,0.1)] dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-100 dark:shadow-none dark:placeholder:text-slate-500 dark:focus:border-indigo-500 dark:focus:bg-slate-800 dark:focus:shadow-[0_0_0_3px_rgba(99,102,241,0.2)]"
          />
          {showHint ? (
            <kbd className="pointer-events-none absolute right-3.5 top-1/2 hidden -translate-y-1/2 select-none rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium leading-none text-slate-400 dark:border-slate-600 dark:bg-slate-700/60 dark:text-slate-500 sm:flex">
              /
            </kbd>
          ) : null}
        </label>

        {hasActiveFilters ? (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-12 cursor-pointer items-center gap-2 whitespace-nowrap rounded-2xl border border-slate-200 bg-white/90 px-4 text-sm font-medium text-slate-500 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.1)] transition-all duration-150 ease-out hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 active:scale-95 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-400 dark:shadow-none dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-200"
          >
            <X className="h-4 w-4" strokeWidth={2} />
            重置
          </button>
        ) : null}
      </div>
    </div>
  );
}
