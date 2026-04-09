import NavigationShell from "@/components/navigation/NavigationShell";
import { sites } from "@/data/sites";
import { getActiveSiteCount } from "@/lib/site-index";
import { SITE_CATEGORIES } from "@/types/site";

export default function Home() {
  const activeSiteCount = getActiveSiteCount(sites);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-10 sm:px-8 lg:px-10">
      <section className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_70px_-36px_rgba(15,23,42,0.45)] backdrop-blur sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-end">
          <div className="space-y-4">
            <span className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-white">
              SITE ATLAS
            </span>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                个人收藏导航
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                面向单人自用的收藏管理首页，帮你更快回找、筛选并打开常用站点。
                内容数据留在仓库里，置顶偏好保存在当前浏览器中。
              </p>
            </div>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[1.5rem] bg-slate-950 px-5 py-4 text-white shadow-[0_24px_48px_-30px_rgba(15,23,42,0.8)]">
              <dt className="text-sm text-slate-300">当前收录</dt>
              <dd className="mt-2 text-3xl font-semibold">{activeSiteCount}</dd>
              <dd className="mt-1 text-sm text-slate-400">个可见站点</dd>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 text-slate-700">
              <dt className="text-sm text-slate-500">置顶策略</dt>
              <dd className="mt-2 text-base font-medium">localStorage 持久化</dd>
              <dd className="mt-1 text-sm text-slate-500">
                没有置顶时不展示该区块
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mt-8">
        <NavigationShell sites={sites} categories={SITE_CATEGORIES} />
      </section>
    </main>
  );
}
