# 架构说明

## 1. 当前架构目标

- 以最小分层完成首页导航主链路与浏览器本地偏好闭环
- 保持内容源静态、类型化、可直接维护
- 将即时交互、主题与置顶偏好限制在最小客户端边界内

## 2. 承接原则

- 以 App Router 为基础
- 以仓库内类型化数据作为内容源
- 以服务端组装 + 必要客户端交互为默认模式
- 以模块职责清晰为优先，不引入不必要中间层
- 浏览器本地偏好使用客户端最小边界承接，不反向污染内容模型

## 3. 建议模块划分

- `app/layout.tsx`：根布局、主题初始化脚本与全局背景挂载
- `app/page.tsx`：首页入口与页面组装
- `app/api/favicon/route.ts`：以 Edge runtime 提供 favicon 代理与回退链路
- `components/ThemeToggle.tsx`：主题切换与主题本地持久化
- `components/BackgroundPattern.tsx`：纯展示背景组件
- `components/navigation/NavigationShell.tsx`：承接搜索、分类、置顶等客户端交互
- `components/navigation/SearchBar.tsx`：搜索输入、快捷键与重置行为
- `components/navigation/CategoryTabs.tsx`：分类切换
- `components/navigation/SiteCard.tsx`：站点卡片展示与置顶入口
- `components/navigation/FaviconAvatar.tsx`：站点图标加载与首字母回退
- `data/sites.ts`：站点内容源
- `lib/site-index.ts`：过滤、排序等纯逻辑
- `lib/pinned-sites.ts`：浏览器本地置顶读写逻辑
- `types/site.ts`：站点数据类型定义

## 4. 数据流

- 静态数据从 `data/sites.ts` 进入
- 服务端页面读取静态内容，并将其传递给客户端交互壳
- 搜索、筛选、排序逻辑保持纯函数，便于测试与复用
- 置顶偏好从 `localStorage` 读取，仅在客户端生效
- 主题偏好从本地存储或系统主题初始化，仅在客户端生效
- 卡片展示所需域名由 `url` 派生，不额外维护独立字段
- 图标展示由卡片传入域名，交给 `app/api/favicon/route.ts` 代理获取并回退

## 5. 渲染策略

- 页面内容默认由服务端读取并输出
- 搜索、分类、本地置顶与主题交互在最小范围内使用客户端组件
- 根布局在 hydration 前执行主题初始化脚本，避免主题闪烁
- favicon 代理路由负责与外部图标源交互，页面组件不直接承担跨域与回退细节
- 禁止为了简单过滤逻辑而把整个页面不必要地变成客户端组件

## 6. 外部依赖边界

- favicon 获取采用“Google S2 → DuckDuckGo → 目标站点 `/favicon.ico`”的回退链路
- 图标获取失败时，由 `FaviconAvatar` 回退为站点首字母头像
- 站点内容、置顶偏好与主题偏好彼此分层，不共享存储结构

## 7. 扩展边界

### 当前不引入

- 数据库
- CMS
- 登录系统

### 后续可扩展

- 书签导入解析
- 本地 JSON / YAML 数据源导入
- 简易维护后台
- 偏好导出或跨设备同步

## 8. 一致性要求

- 实际实现必须遵循 `DATA_MODEL`
- 页面行为必须遵循 `HOME.md` 与 `UX_RULES.md`
- 偏好层能力不得写回站点内容源
- 若架构发生实质变化，必须补 ADR
