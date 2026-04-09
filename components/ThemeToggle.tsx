"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const THEME_STORAGE_KEY = "theme";

type ThemeMode = "light" | "dark";

function getThemeFromDom(): ThemeMode {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const syncTheme = () => {
      setTheme(getThemeFromDom());
    };

    const timer = window.setTimeout(syncTheme, 0);
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const onSystemChange = (event: MediaQueryListEvent) => {
      if (!window.localStorage.getItem(THEME_STORAGE_KEY)) {
        const nextTheme: ThemeMode = event.matches ? "dark" : "light";

        applyTheme(nextTheme);
        setTheme(nextTheme);
      }
    };

    mediaQuery.addEventListener("change", onSystemChange);

    return () => {
      window.clearTimeout(timer);
      mediaQuery.removeEventListener("change", onSystemChange);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "切换到浅色模式" : "切换到深色模式"}
      title={isDark ? "切换到浅色模式" : "切换到深色模式"}
      className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-[0_1px_4px_-2px_rgba(15,23,42,0.1)] transition-all duration-150 ease-out hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800 active:scale-95 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-700/80 dark:hover:text-slate-100"
    >
      {isDark ? (
        <Sun className="h-[15px] w-[15px]" strokeWidth={2} />
      ) : (
        <Moon className="h-[15px] w-[15px]" strokeWidth={2} />
      )}
      <span>{isDark ? "浅色" : "深色"}</span>
    </button>
  );
}
