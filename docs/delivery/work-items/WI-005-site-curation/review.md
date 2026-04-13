# WI-005 复盘

## 完成情况

- 已新增 `ts-node`、`Zustand`、`Electron`、`Taro`、`ahooks`、`es-toolkit`、`Zod`、`Dotenv`、`LangGraph JS Docs`、`TanStack Query`、`SWR`、`Elysia` 共 12 个条目
- 已补充 `Vite`、`Bun Docs`、`Vue.js`、`React Native`、`Expo` 共 5 个开发类条目
- 已将当前活动工作单切换为 `WI-005`，并同步 `README.md` 入口
- 已保持 `SiteRecord` 模型、现有分类与站点维护规则不变

## 本轮归一化

- `Zustand` 使用 `https://zustand.docs.pmnd.rs/getting-started/introduction`，替代原始候选中的 `/learn/...` 路径
- `SWR` 使用官方中文入口 `https://swr.vercel.app/zh-CN`
- `TanStack Query` 作为 `TanStack` 总入口之外的专项文档并存，避免生态入口与具体库文档混淆
- `Bun` 使用用户指定的官方文档入口 `https://bun.com/docs`，以便直接命中文档场景
- `Expo` 与 `React Native` 保留官方主入口，兼顾文档、生态与产品入口导航

## 保留意见

- 本轮没有需要直接排除的站点，均属于高频或高价值官方资源
- `ts-node` 适合兼容既有 Node.js 工作流，但若目标只是现代 TypeScript 脚本执行，通常会优先考虑已存在的 `tsx`
- `Dotenv` 可作为环境变量生态入口，但不应被误解为前端敏感信息保护方案；更适合放在配置管理语境下理解

## 影响范围

- 影响数据源：`data/sites.ts`
- 影响治理入口：`docs/_meta/manifest.yaml`、`README.md`
- 不影响：数据模型、首页交互、偏好层逻辑
