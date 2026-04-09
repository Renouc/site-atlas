"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { FolderOpen } from "lucide-react";

import CategoryTabs from "@/components/navigation/CategoryTabs";
import SearchBar from "@/components/navigation/SearchBar";
import SiteCard from "@/components/navigation/SiteCard";
import {
  prunePinnedSiteIds,
  readPinnedSiteIds,
  togglePinnedSiteId,
  writePinnedSiteIds,
} from "@/lib/pinned-sites";
import { filterSites, prioritizePinnedSites } from "@/lib/site-index";
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

  const visibleSites = useMemo(
    () => prioritizePinnedSites(filteredSites, pinnedSiteIds),
    [filteredSites, pinnedSiteIds]
  );

  const pinnedSiteIdSet = useMemo(
    () => new Set(pinnedSiteIds),
    [pinnedSiteIds]
  );

  const hasActiveFilters =
    searchTerm.trim().length > 0 || selectedCategory !== ALL_CATEGORY;

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
    <div className="space-y-7">
      <SearchBar
        value={searchTerm}
        resultCount={filteredSites.length}
        hasActiveFilters={hasActiveFilters}
        onChange={setSearchTerm}
        onReset={handleReset}
      />

      <CategoryTabs
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {filteredSites.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center dark:border-slate-600 dark:bg-slate-800/50">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300">
            <FolderOpen className="h-5 w-5" strokeWidth={2} />
          </div>
          <h2 className="mt-3 text-base font-semibold text-slate-900 dark:text-slate-100">
            没有找到匹配站点
          </h2>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            可以试试更短的关键词，或者切换到其他分类查看。
          </p>
        </section>
      ) : null}

      {visibleSites.length > 0 ? (
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              <FolderOpen className="h-4 w-4" strokeWidth={2} />
              {hasActiveFilters ? "筛选结果" : "全部站点"}
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {visibleSites.length} 个
            </span>
          </div>
          <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
            {visibleSites.map((site) => (
              <SiteCard
                key={site.id}
                site={site}
                isPinned={pinnedSiteIdSet.has(site.id)}
                onTogglePin={handleTogglePin}
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
