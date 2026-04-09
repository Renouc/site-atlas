"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import CategoryTabs from "@/components/navigation/CategoryTabs";
import SearchBar from "@/components/navigation/SearchBar";
import SiteCard from "@/components/navigation/SiteCard";
import {
  prunePinnedSiteIds,
  readPinnedSiteIds,
  togglePinnedSiteId,
  writePinnedSiteIds,
} from "@/lib/pinned-sites";
import { filterSites, splitPinnedSites } from "@/lib/site-index";
import { ALL_CATEGORY } from "@/types/site";
import type { SiteCategory, SiteCategoryFilter, SiteRecord } from "@/types/site";

type NavigationShellProps = {
  sites: readonly SiteRecord[];
  categories: readonly SiteCategory[];
};

export default function NavigationShell({
  sites,
  categories,
}: NavigationShellProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<SiteCategoryFilter>(ALL_CATEGORY);
  const [pinnedSiteIds, setPinnedSiteIds] = useState<string[]>([]);

  useEffect(() => {
    const nextPinnedSiteIds = prunePinnedSiteIds(readPinnedSiteIds(), sites);

    writePinnedSiteIds(nextPinnedSiteIds);

    const timer = window.setTimeout(() => {
      setPinnedSiteIds(nextPinnedSiteIds);
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [sites]);

  const filteredSites = useMemo(
    () =>
      filterSites(sites, {
        searchTerm,
        selectedCategory,
      }),
    [searchTerm, selectedCategory, sites]
  );

  const { pinnedSites, regularSites } = useMemo(
    () => splitPinnedSites(filteredSites, pinnedSiteIds),
    [filteredSites, pinnedSiteIds]
  );

  const hasActiveFilters =
    searchTerm.trim().length > 0 || selectedCategory !== ALL_CATEGORY;
  const hasPinnedSites = pinnedSites.length > 0;
  const visibleResultSites = hasPinnedSites ? regularSites : filteredSites;

  const handleTogglePin = useCallback(
    (siteId: string) => {
      setPinnedSiteIds((currentPinnedSiteIds) => {
        const nextPinnedSiteIds = prunePinnedSiteIds(
          togglePinnedSiteId(currentPinnedSiteIds, siteId),
          sites
        );

        writePinnedSiteIds(nextPinnedSiteIds);
        return nextPinnedSiteIds;
      });
    },
    [sites]
  );

  const handleReset = useCallback(() => {
    setSearchTerm("");
    setSelectedCategory(ALL_CATEGORY);
  }, []);

  return (
    <div className="space-y-6">
      <SearchBar
        value={searchTerm}
        resultCount={filteredSites.length}
        hasActiveFilters={hasActiveFilters}
        onChange={setSearchTerm}
        onReset={handleReset}
      />

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-medium text-slate-600">按分类筛选</h2>
          <span className="text-sm text-slate-400">
            置顶保存在当前浏览器
          </span>
        </div>
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      {hasPinnedSites ? (
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">常用置顶</h2>
              <p className="mt-1 text-sm text-slate-500">
                这些站点是你在当前浏览器里标记的高频入口。
              </p>
            </div>
            <span className="text-sm text-slate-400">
              {pinnedSites.length} 个常用站点
            </span>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {pinnedSites.map((site) => (
              <SiteCard
                key={site.id}
                site={site}
                isPinned
                onTogglePin={handleTogglePin}
              />
            ))}
          </div>
        </section>
      ) : null}

      {filteredSites.length === 0 ? (
        <section className="rounded-[2rem] border border-dashed border-slate-300 bg-white/70 px-6 py-10 text-center shadow-[0_18px_40px_-30px_rgba(15,23,42,0.3)]">
          <h2 className="text-lg font-semibold text-slate-900">没有找到匹配站点</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            可以试试更短的关键词，或者切换到其他分类查看。
          </p>
        </section>
      ) : null}

      {visibleResultSites.length > 0 ? (
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">
                {hasActiveFilters ? "筛选结果" : "全部站点"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                卡片会优先帮助你判断这个站点是否值得点开。
              </p>
            </div>
            <span className="text-sm text-slate-400">
              {visibleResultSites.length} 个结果
            </span>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {visibleResultSites.map((site) => (
              <SiteCard
                key={site.id}
                site={site}
                isPinned={pinnedSiteIds.includes(site.id)}
                onTogglePin={handleTogglePin}
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
