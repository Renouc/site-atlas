export const ALL_CATEGORY = "全部" as const;

export const SITE_CATEGORIES = [
  "开发",
  "AI / LLM",
  "设计",
  "工具",
  "学习",
  "资讯",
  "其他",
] as const;

export const SITE_STATUSES = ["active", "draft", "archived"] as const;

export type SiteCategory = (typeof SITE_CATEGORIES)[number];
export type SiteCategoryFilter = typeof ALL_CATEGORY | SiteCategory;
export type SiteStatus = (typeof SITE_STATUSES)[number];

export interface SiteRecord {
  id: string;
  name: string;
  url: string;
  description: string;
  category: SiteCategory;
  tags: string[];
  note?: string;
  sortOrder?: number;
  status: SiteStatus;
}

export const PINNED_SITES_STORAGE_KEY = "site-atlas:pinned-site-ids";
