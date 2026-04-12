# 书签源数据整理说明

本文件给后续参与整理数据的 AI 使用。当前阶段只负责：

1. 从浏览器提取书签源数据
2. 输出清洗、过滤、去重后的标准化结果
3. 为后续 AI 整理提供明确约束

不在当前脚本阶段直接生成正式发布数据。

## 输入文件

执行 `pnpm bookmarks:extract` 后，会生成：

- `.local/bookmarks/raw.json`：原始抽取结果
- `.local/bookmarks/rejected.json`：被过滤或判定无效的数据
- `.local/bookmarks/normalized.json`：后续整理的主输入

后续 AI 应优先使用 `.local/bookmarks/normalized.json`。

## 源数据字段

`normalized.json` 中的每条记录包含：

- `id`：基于清洗后 URL 生成的稳定源 ID
- `title`：书签标题
- `url`：清洗后的 URL
- `domain`：域名
- `path`：URL path
- `createdAt`：书签创建时间
- `browser`：来源浏览器
- `profile`：来源 profile
- `folderPath`：来源文件夹路径
- `duplicateCount`：重复次数
- `sourceSignals`：多来源信号

这些字段是“线索”，不是最终渲染数据。

## 整理目标

AI 需要基于源数据，整理出真正可展示的站点数据，目标输出为 `types/site.ts` 中定义的 `SiteRecord[]`。

最终数据需要满足：

- 仅保留公开可访问、长期价值较高的网站
- 尽量补充高质量 `description`
- 合理分类、补齐标签
- 与现有正式数据增量合并
- 不覆盖已有优质站点

## 整理原则

### 1. 站点筛选

优先保留以下站点：

- 官方文档
- 官方产品站
- 高质量开发工具
- 高质量设计资源
- 高质量学习资源
- 持续维护的资讯站

应过滤以下站点：

- 内网、局域网、本地调试地址
- 临时页面、登录跳转页、搜索结果页
- 单篇价值很低且难以长期复用的内容页
- 重复站点的低质量变体
- 内容残缺、站点失效或明显不适合展示的页面

### 2. 增量合并

如果仓库中已经存在正式站点数据：

- 默认保留已有优质站点
- 不要用新的低质量结果覆盖旧数据
- 同一站点已存在时，优先做信息补全，而不是重复新增
- 只有在新结果明显更完整、更准确时，才替换旧描述

### 3. 分类

当前分类以 `types/site.ts` 中的 `SiteCategory` 为准：

- 开发
- AI / LLM
- 设计
- 工具
- 学习
- 资讯
- 其他

如果确实无法归入现有分类，应先提出新增分类建议，再扩展 `SiteCategory`，不要随意硬塞。

### 4. 描述生成

`description` 不能只根据域名或标题猜测，优先依据：

- 首页标题与副标题
- 官方介绍文案
- 导航结构
- 功能说明
- 文档首页或 about 页面

如果书签信息不足以支撑高质量描述，应进一步访问页面内容后再总结。

`description` 要求：

- 1~2 句即可
- 直接说明网站核心用途
- 尽量体现差异化价值
- 不写空话、套话、营销腔
- 不要照抄页面大段原文

### 5. 标签补充

`tags` 建议控制在 2~4 个，突出：

- 领域
- 主要能力
- 技术栈或主题
- 使用场景

避免无意义标签和纯重复标签。

## 最终输出格式

目标结构为：

```ts
type SiteRecord = {
  id: string
  name: string
  url: string
  description: string
  category: SiteCategory
  tags: string[]
  note?: string
  sortOrder?: number
  status: "active" | "draft" | "archived"
}
```

整理结果应优先输出可直接用于渲染的数据，而不是再次输出源数据副本。

## 建议工作流

建议 AI 按以下顺序处理：

1. 读取 `.local/bookmarks/normalized.json`
2. 基于 URL 去重并识别已有正式站点
3. 挑选高价值、公开、可长期展示的网站
4. 为候选站点补齐分类、标签、描述
5. 对信息不足的站点补充访问页面内容
6. 输出符合 `SiteRecord[]` 的最终结果

## 质量底线

如果某个站点无法确认其真实用途、质量或公开可访问性：

- 宁可暂不纳入最终展示数据
- 也不要凭猜测生成描述并发布
