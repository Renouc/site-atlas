import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TRACKING_QUERY_KEYS = new Set([
  "fbclid",
  "gclid",
  "igshid",
  "mc_cid",
  "mc_eid",
  "ref",
  "ref_",
  "spm",
]);

const BROWSER_PATHS = {
  win32: [
    { browser: "Chrome", path: "Google/Chrome/User Data" },
    { browser: "Edge", path: "Microsoft/Edge/User Data" },
    { browser: "Brave", path: "BraveSoftware/Brave-Browser/User Data" },
  ],
  darwin: [
    {
      browser: "Chrome",
      path: "Library/Application Support/Google/Chrome",
    },
    {
      browser: "Edge",
      path: "Library/Application Support/Microsoft Edge",
    },
    {
      browser: "Brave",
      path: "Library/Application Support/BraveSoftware/Brave-Browser",
    },
  ],
  linux: [
    { browser: "Chrome", path: ".config/google-chrome" },
    { browser: "Edge", path: ".config/microsoft-edge" },
    { browser: "Brave", path: ".config/BraveSoftware/Brave-Browser" },
  ],
};

const DEFAULT_CONFIG = {
  blacklist: {
    domains: [],
  },
};

export const OUTPUT_DIR = path.resolve(".local", "bookmarks");
export const RAW_OUTPUT_PATH = path.join(OUTPUT_DIR, "raw.json");
export const REJECTED_OUTPUT_PATH = path.join(OUTPUT_DIR, "rejected.json");
export const NORMALIZED_OUTPUT_PATH = path.join(OUTPUT_DIR, "normalized.json");

function getBaseDir() {
  const home = os.homedir();

  if (process.platform === "win32") {
    return process.env.LOCALAPPDATA || path.join(home, "AppData", "Local");
  }

  return home;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function isDefaultPort(protocol, port) {
  return (
    (protocol === "https:" && port === "443") ||
    (protocol === "http:" && port === "80")
  );
}

function isPrivateIpv4(hostname) {
  return (
    hostname.startsWith("10.") ||
    hostname.startsWith("127.") ||
    hostname.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname)
  );
}

function isLocalHostname(hostname) {
  return (
    hostname === "localhost" ||
    hostname === "0.0.0.0" ||
    hostname === "::1" ||
    hostname.endsWith(".local")
  );
}

function normalizeRule(rule) {
  return String(rule || "").trim().toLowerCase();
}

function matchBlacklistRule(hostname, rule) {
  const normalizedRule = normalizeRule(rule);

  if (!normalizedRule) {
    return false;
  }

  if (normalizedRule.endsWith(".")) {
    return hostname.startsWith(normalizedRule);
  }

  return hostname === normalizedRule || hostname.endsWith(`.${normalizedRule}`);
}

function getBlacklist(config) {
  return config?.blacklist?.domains || [];
}

export function loadConfig() {
  const configPath = path.resolve("bookmark.config.json");

  if (!fs.existsSync(configPath)) {
    return {
      configPath: null,
      config: DEFAULT_CONFIG,
    };
  }

  return {
    configPath,
    config: JSON.parse(fs.readFileSync(configPath, "utf8")),
  };
}

export function writeJson(filePath, data) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function findBrowserDirs() {
  const baseDir = getBaseDir();
  const list = BROWSER_PATHS[process.platform] || [];

  return list
    .map((entry) => ({
      browser: entry.browser,
      userDataDir: path.join(baseDir, entry.path),
    }))
    .filter((entry) => fs.existsSync(entry.userDataDir));
}

function getProfiles(userDataDir) {
  try {
    return fs
      .readdirSync(userDataDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)
      .filter((name) => name === "Default" || name.startsWith("Profile "));
  } catch {
    return [];
  }
}

export function getBookmarkFiles() {
  const browserDirs = findBrowserDirs();
  const files = [];

  for (const entry of browserDirs) {
    const profiles = getProfiles(entry.userDataDir);

    for (const profile of profiles) {
      const bookmarkPath = path.join(entry.userDataDir, profile, "Bookmarks");

      if (fs.existsSync(bookmarkPath)) {
        files.push({
          browser: entry.browser,
          profile,
          userDataDir: entry.userDataDir,
          path: bookmarkPath,
        });
      }
    }
  }

  return files;
}

function chromeTimeToIso(chromeTime) {
  if (!chromeTime) {
    return null;
  }

  const epoch = Date.UTC(1601, 0, 1);
  const timestamp = Number(chromeTime);

  if (!Number.isFinite(timestamp)) {
    return null;
  }

  return new Date(epoch + timestamp / 1000).toISOString();
}

function walkBookmarkTree(node, context, output) {
  if (!node) {
    return;
  }

  if (node.type === "url" && node.url) {
    output.push({
      title: node.name || "",
      url: node.url,
      createdAt: node.date_added ? chromeTimeToIso(node.date_added) : null,
      browser: context.browser,
      profile: context.profile,
      folderPath: context.folderPath.join(" / "),
      sourcePath: context.sourcePath,
    });
    return;
  }

  const nextFolderPath =
    node.type === "folder" && node.name
      ? [...context.folderPath, node.name]
      : context.folderPath;

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      walkBookmarkTree(child, { ...context, folderPath: nextFolderPath }, output);
    }
  }
}

export function extractBookmarksFromFile(file) {
  const raw = JSON.parse(fs.readFileSync(file.path, "utf8"));
  const records = [];

  for (const rootKey of Object.keys(raw.roots || {})) {
    walkBookmarkTree(
      raw.roots[rootKey],
      {
        browser: file.browser,
        profile: file.profile,
        folderPath: [],
        sourcePath: file.path,
      },
      records
    );
  }

  return records;
}

export function cleanUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);

    if (!["http:", "https:"].includes(url.protocol)) {
      return null;
    }

    url.username = "";
    url.password = "";
    url.hash = "";

    const searchKeys = [...url.searchParams.keys()];

    for (const key of searchKeys) {
      if (key.startsWith("utm_") || TRACKING_QUERY_KEYS.has(key)) {
        url.searchParams.delete(key);
      }
    }

    url.searchParams.sort();

    if (isDefaultPort(url.protocol, url.port)) {
      url.port = "";
    }

    return url.toString();
  } catch {
    return null;
  }
}

function getRejectReason(urlString, config) {
  if (!urlString) {
    return "invalid_url";
  }

  const url = new URL(urlString);
  const hostname = url.hostname.toLowerCase();

  if (isLocalHostname(hostname) || isPrivateIpv4(hostname)) {
    return "private_host";
  }

  const blacklist = getBlacklist(config);

  if (blacklist.some((rule) => matchBlacklistRule(hostname, rule))) {
    return "blacklisted_domain";
  }

  return null;
}

function createSourceId(value) {
  return `src_${crypto.createHash("sha1").update(value).digest("hex")}`;
}

function createNormalizedRecord(record) {
  const cleanedUrl = cleanUrl(record.url);
  const rejectedReason = getRejectReason(cleanedUrl, record.config);

  if (rejectedReason) {
    return {
      accepted: false,
      reason: rejectedReason,
      record: {
        ...record,
        cleanedUrl,
      },
    };
  }

  const url = new URL(cleanedUrl);

  return {
    accepted: true,
    record: {
      id: createSourceId(cleanedUrl),
      title: record.title.trim() || url.hostname,
      url: cleanedUrl,
      domain: url.hostname.toLowerCase(),
      path: url.pathname,
      createdAt: record.createdAt,
      browser: record.browser,
      profile: record.profile,
      folderPath: record.folderPath,
      sourcePath: record.sourcePath,
    },
  };
}

function mergeDuplicateRecord(target, current) {
  target.duplicateCount += 1;
  target.sourceSignals.push({
    browser: current.browser,
    profile: current.profile,
    folderPath: current.folderPath,
    sourcePath: current.sourcePath,
    title: current.title,
    createdAt: current.createdAt,
  });

  return target;
}

export function normalizeBookmarks(rawRecords, config) {
  const rejected = [];
  const dedupedMap = new Map();

  for (const rawRecord of rawRecords) {
    const result = createNormalizedRecord({ ...rawRecord, config });

    if (!result.accepted) {
      rejected.push({
        reason: result.reason,
        title: rawRecord.title,
        url: rawRecord.url,
        cleanedUrl: result.record.cleanedUrl,
        browser: rawRecord.browser,
        profile: rawRecord.profile,
        folderPath: rawRecord.folderPath,
        sourcePath: rawRecord.sourcePath,
      });
      continue;
    }

    const normalized = result.record;
    const existing = dedupedMap.get(normalized.url);

    if (existing) {
      dedupedMap.set(normalized.url, mergeDuplicateRecord(existing, normalized));
      continue;
    }

    dedupedMap.set(normalized.url, {
      ...normalized,
      duplicateCount: 1,
      sourceSignals: [
        {
          browser: normalized.browser,
          profile: normalized.profile,
          folderPath: normalized.folderPath,
          sourcePath: normalized.sourcePath,
          title: normalized.title,
          createdAt: normalized.createdAt,
        },
      ],
    });
  }

  return {
    rejected,
    normalized: [...dedupedMap.values()].sort((left, right) =>
      left.title.localeCompare(right.title, "zh-Hans-CN")
    ),
  };
}

export function ensureOutputDirs() {
  ensureDir(OUTPUT_DIR);
}
