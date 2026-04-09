import { PINNED_SITES_STORAGE_KEY } from "@/types/site";
import type { SiteRecord } from "@/types/site";

function sanitizePinnedSiteIds(siteIds: string[]) {
  return [...new Set(siteIds.filter(Boolean))];
}

function parsePinnedSiteIds(value: string | null) {
  if (!value) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(value);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return sanitizePinnedSiteIds(
      parsedValue.filter((item): item is string => typeof item === "string")
    );
  } catch {
    return [];
  }
}

export function readPinnedSiteIds() {
  if (typeof window === "undefined") {
    return [];
  }

  return parsePinnedSiteIds(window.localStorage.getItem(PINNED_SITES_STORAGE_KEY));
}

export function writePinnedSiteIds(siteIds: string[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    PINNED_SITES_STORAGE_KEY,
    JSON.stringify(sanitizePinnedSiteIds(siteIds))
  );
}

export function togglePinnedSiteId(
  currentPinnedSiteIds: readonly string[],
  siteId: string
) {
  const nextPinnedSiteIds = sanitizePinnedSiteIds([...currentPinnedSiteIds]);

  if (nextPinnedSiteIds.includes(siteId)) {
    return nextPinnedSiteIds.filter((currentSiteId) => currentSiteId !== siteId);
  }

  return [siteId, ...nextPinnedSiteIds];
}

export function prunePinnedSiteIds(
  currentPinnedSiteIds: readonly string[],
  sites: readonly SiteRecord[]
) {
  const activeSiteIds = new Set(
    sites.filter((site) => site.status === "active").map((site) => site.id)
  );

  return sanitizePinnedSiteIds(
    currentPinnedSiteIds.filter((siteId) => activeSiteIds.has(siteId))
  );
}
