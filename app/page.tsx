import NavigationShell from "@/components/navigation/NavigationShell";
import ThemeToggle from "@/components/ThemeToggle";
import { sites } from "@/data/sites";
import { SITE_CATEGORIES } from "@/types/site";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-12 sm:px-8 lg:px-10">
      <header className="mb-10">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-4">
            <h1 className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-3.5 py-1 text-[11px] font-semibold tracking-[0.2em] text-white shadow-[0_4px_16px_-4px_rgba(99,102,241,0.5)]">
              SITE ATLAS
            </h1>

            <p className="max-w-lg text-base leading-7 text-slate-500 dark:text-slate-400">
              为真正会打开的网站，留出更短的路径。
            </p>
          </div>

          <div className="shrink-0 pt-1">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <NavigationShell sites={sites} categories={SITE_CATEGORIES} />
    </main>
  );
}
