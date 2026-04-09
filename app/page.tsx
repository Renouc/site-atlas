import NavigationShell from "@/components/navigation/NavigationShell";
import ThemeToggle from "@/components/ThemeToggle";
import { sites } from "@/data/sites";
import { getActiveSiteCount } from "@/lib/site-index";
import { SITE_CATEGORIES } from "@/types/site";

export default function Home() {
  const activeSiteCount = getActiveSiteCount(sites);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-12 sm:px-8 lg:px-10">
      {/* ── 页头 ─────────────────────────────────────────── */}
      <header className="mb-10">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-3.5 py-1 text-[11px] font-semibold tracking-[0.2em] text-white shadow-[0_4px_16px_-4px_rgba(99,102,241,0.5)]">
              SITE ATLAS
            </span>

            <div className="space-y-2">
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 sm:text-5xl">
                个人收藏导航
              </h1>
              <p className="max-w-lg text-base leading-7 text-slate-500 dark:text-slate-400">
                面向单人自用，帮你快速回找并打开常用站点。
                <br className="hidden sm:block" />
                内容数据存在仓库，置顶偏好存在浏览器。
              </p>
            </div>

            <div className="flex items-center gap-3 pt-1 text-xs text-slate-600 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                收录 {activeSiteCount} 个站点
              </span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span>置顶偏好保存在当前浏览器</span>
            </div>
          </div>

          {/* 主题切换 */}
          <div className="shrink-0 pt-1">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ── 主体 ─────────────────────────────────────────── */}
      <NavigationShell sites={sites} categories={SITE_CATEGORIES} />
    </main>
  );
}
