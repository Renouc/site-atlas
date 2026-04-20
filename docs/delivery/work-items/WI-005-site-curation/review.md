# WI-005 复盘

## 完成情况

- 已新增 `ts-node`、`Zustand`、`Electron`、`Taro`、`ahooks`、`es-toolkit`、`Zod`、`Dotenv`、`LangGraph JS Docs`、`TanStack Query`、`SWR`、`Elysia` 共 12 个条目
- 已补充 `Vite`、`Bun Docs`、`Vue.js`、`React Native`、`Expo` 共 5 个开发类条目
- 已补充 `Conventional Commits`、`Cloudflare`、`RxJS`、`PixiJS`、`Git 中文` 共 5 个开发类条目
- 已将当前活动工作单切换为 `WI-005`，并同步 `README.md` 入口
- 已保持 `SiteRecord` 模型、现有分类与站点维护规则不变

## 本轮归一化

- `Zustand` 使用 `https://zustand.docs.pmnd.rs/getting-started/introduction`，替代原始候选中的 `/learn/...` 路径
- `SWR` 使用官方中文入口 `https://swr.vercel.app/zh-CN`
- `TanStack Query` 作为 `TanStack` 总入口之外的专项文档并存，避免生态入口与具体库文档混淆
- `Bun` 使用用户指定的官方文档入口 `https://bun.com/docs`，以便直接命中文档场景
- `Expo` 与 `React Native` 保留官方主入口，兼顾文档、生态与产品入口导航
- `Conventional Commits` 使用用户提供的简体中文规范页 `https://www.conventionalcommits.org/zh-hans/v1.0.0/`，保留版本化规范入口
- `Cloudflare` 保留用户提供的官方中文主站 `https://www.cloudflare.com/zh-cn/`，兼顾产品总览与开发者能力入口
- `RxJS` 使用官方主站 `https://rxjs.dev/`，作为响应式编程与文档入口
- `PixiJS` 使用官方主站 `https://pixijs.com/`，兼顾文档、教程与示例导航
- `Git 中文` 使用用户提供的中文官方入口 `https://git-scm.cn/`，覆盖安装、教程、工具与参考文档

## 保留意见

- 本轮没有需要直接排除的站点，均属于高频或高价值官方资源
- `ts-node` 适合兼容既有 Node.js 工作流，但若目标只是现代 TypeScript 脚本执行，通常会优先考虑已存在的 `tsx`
- `Dotenv` 可作为环境变量生态入口，但不应被误解为前端敏感信息保护方案；更适合放在配置管理语境下理解
- `Cloudflare` 当前落库为官方中文主站；若后续使用场景明显偏向开发文档，可再评估是否补充 `developers.cloudflare.com` 作为更直接入口

## 影响范围

- 影响数据源：`data/sites.ts`
- 影响治理入口：`docs/_meta/manifest.yaml`、`README.md`
- 不影响：数据模型、首页交互、偏好层逻辑
