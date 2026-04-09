import { ALL_CATEGORY } from "@/types/site";
import type { SiteCategoryFilter, SiteRecord } from "@/types/site";

type FilterOptions = {
  searchTerm: string;
  selectedCategory: SiteCategoryFilter;
};

export function isActiveSite(site: SiteRecord) {
  return site.status === "active";
}

export function getActiveSiteCount(sites: readonly SiteRecord[]) {
  return sites.filter(isActiveSite).length;
}

function normalizeSearchTerm(searchTerm: string) {
  return searchTerm.trim().toLocaleLowerCase("zh-CN");
}

function buildSearchText(site: SiteRecord) {
  return [site.name, site.description, site.note, ...site.tags]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase("zh-CN");
}

function compareSites(left: SiteRecord, right: SiteRecord) {
  const leftOrder = left.sortOrder ?? Number.MAX_SAFE_INTEGER;
  const rightOrder = right.sortOrder ?? Number.MAX_SAFE_INTEGER;

  if (leftOrder !== rightOrder) {
    return leftOrder - rightOrder;
  }

  return left.name.localeCompare(right.name, "zh-Hans-CN");
}

export function sortSites(sites: readonly SiteRecord[]) {
  return [...sites].sort(compareSites);
}

export function filterSites(
  sites: readonly SiteRecord[],
  { searchTerm, selectedCategory }: FilterOptions
) {
  const normalizedSearchTerm = normalizeSearchTerm(searchTerm);

  return sortSites(sites).filter((site) => {
    if (!isActiveSite(site)) {
      return false;
    }

    if (selectedCategory !== ALL_CATEGORY && site.category !== selectedCategory) {
      return false;
    }

    if (!normalizedSearchTerm) {
      return true;
    }

    return buildSearchText(site).includes(normalizedSearchTerm);
  });
}

export function splitPinnedSites(
  sites: readonly SiteRecord[],
  pinnedSiteIds: readonly string[]
) {
  const pinnedIndex = new Map(
    pinnedSiteIds.map((siteId, index) => [siteId, index] as const)
  );

  const pinnedSites: SiteRecord[] = [];
  const regularSites: SiteRecord[] = [];

  for (const site of sites) {
    if (pinnedIndex.has(site.id)) {
      pinnedSites.push(site);
    } else {
      regularSites.push(site);
    }
  }

  pinnedSites.sort((left, right) => {
    const leftIndex = pinnedIndex.get(left.id) ?? Number.MAX_SAFE_INTEGER;
    const rightIndex = pinnedIndex.get(right.id) ?? Number.MAX_SAFE_INTEGER;

    if (leftIndex !== rightIndex) {
      return leftIndex - rightIndex;
    }

    return compareSites(left, right);
  });

  return {
    pinnedSites,
    regularSites,
  };
}
