#!/usr/bin/env node

import {
  ensureOutputDirs,
  extractBookmarksFromFile,
  getBookmarkFiles,
  loadConfig,
  normalizeBookmarks,
  NORMALIZED_OUTPUT_PATH,
  RAW_OUTPUT_PATH,
  REJECTED_OUTPUT_PATH,
  writeJson,
} from "./shared.mjs";

function main() {
  const { config, configPath } = loadConfig();
  const files = getBookmarkFiles();
  const rawRecords = [];

  for (const file of files) {
    try {
      rawRecords.push(...extractBookmarksFromFile(file));
    } catch {
      console.warn(`⚠️ 跳过无法读取的书签文件：${file.path}`);
    }
  }

  const { normalized, rejected } = normalizeBookmarks(rawRecords, config);

  ensureOutputDirs();
  writeJson(RAW_OUTPUT_PATH, rawRecords);
  writeJson(REJECTED_OUTPUT_PATH, rejected);
  writeJson(NORMALIZED_OUTPUT_PATH, normalized);

  console.log(`📂 书签源：${files.length} 个 profile`);
  console.log(`🧾 原始书签：${rawRecords.length} 条`);
  console.log(`🚫 被过滤：${rejected.length} 条`);
  console.log(`✅ 标准化候选：${normalized.length} 条`);
  console.log(
    `⚙️ 黑名单配置：${configPath ? configPath : "未提供，使用默认空配置"}`
  );
  console.log(`📦 标准化输出：${NORMALIZED_OUTPUT_PATH}`);
}

main();
