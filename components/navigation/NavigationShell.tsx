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
            暂无结果
          </h2>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            换个关键词，或切换分类试试。
          </p>
        </section>
      ) : null}

      {visibleSites.length > 0 ? (
        <section>
          <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
            {visibleSites.map((site, index) => (
              <SiteCard
                key={`${site.id}-${selectedCategory}`}
                site={site}
                index={index}
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
