# WI-005 复盘

## 完成情况

- 已新增 `ts-node`、`Zustand`、`Electron`、`Taro`、`ahooks`、`es-toolkit`、`Zod`、`Dotenv`、`LangGraph JS Docs`、`TanStack Query`、`SWR`、`Elysia` 共 12 个条目
- 已补充 `Vite`、`Bun Docs`、`Vue.js`、`React Native`、`Expo` 共 5 个开发类条目
- 已补充 `Ethereum.org 中文` 作为以太坊官方中文学习、生态与开发者资源总入口
- 已补充 `Conventional Commits`、`Cloudflare`、`RxJS`、`PixiJS`、`Git 中文` 共 5 个开发类条目
- 已补充 `reCAPTCHA Docs` 作为网站人机验证、风险评估与 Bot 防护的官方文档入口
- 已补充 `Etherscan Docs`、`Alchemy Docs`、`Gas.zip`、`ChainList`、`React SVGR`、`Starship`、`Ghostty` 共 7 个开发与工具类条目
- 已补充 `CryptoRank`、`深潮 TechFlow` 共 2 个 Web3 工具与资讯类条目
- 已将当前活动工作单切换为 `WI-005`，并同步 `README.md` 入口
- 已保持 `SiteRecord` 模型、现有分类与站点维护规则不变

## 本轮归一化

- `Zustand` 使用 `https://zustand.docs.pmnd.rs/getting-started/introduction`，替代原始候选中的 `/learn/...` 路径
- `SWR` 使用官方中文入口 `https://swr.vercel.app/zh-CN`
- `TanStack Query` 作为 `TanStack` 总入口之外的专项文档并存，避免生态入口与具体库文档混淆
- `Bun` 使用用户指定的官方文档入口 `https://bun.com/docs`，以便直接命中文档场景
- `Expo` 与 `React Native` 保留官方主入口，兼顾文档、生态与产品入口导航
- `Ethereum.org 中文` 使用 `https://ethereum.org/zh/`，保留官方中文总入口，覆盖以太坊基础、生态、钱包、安全、开发者资源与路线图
- `Conventional Commits` 使用用户提供的简体中文规范页 `https://www.conventionalcommits.org/zh-hans/v1.0.0/`，保留版本化规范入口
- `Cloudflare` 保留用户提供的官方中文主站 `https://www.cloudflare.com/zh-cn/`，兼顾产品总览与开发者能力入口
- `reCAPTCHA Docs` 使用 Google Cloud 官方中文概览页 `https://docs.cloud.google.com/recaptcha/docs/overview?hl=zh-cn`，优先命中网站人机验证、密钥创建、前后端评估与防刷集成场景
- `RxJS` 使用官方主站 `https://rxjs.dev/`，作为响应式编程与文档入口
- `PixiJS` 使用官方主站 `https://pixijs.com/`，兼顾文档、教程与示例导航
- `Git 中文` 使用用户提供的中文官方入口 `https://git-scm.cn/`，覆盖安装、教程、工具与参考文档
- `Alchemy` 使用 `https://www.alchemy.com/docs`，替代产品首页，直接命中文档与开发接入场景
- `React SVGR` 使用 `https://react-svgr.com/docs/getting-started/`，替代站点首页，直接进入文档起步页
- `Ghostty` 使用 `https://ghostty.org/docs`，替代产品首页，优先服务配置与使用查阅
- `Starship` 保留用户提供的中文入口 `https://starship.rs/zh-CN/`
- `CryptoRank` 保留用户提供的中文入口 `https://cryptorank.io/zh`，直接覆盖加密市场数据与分析场景
- `深潮 TechFlow` 保留用户提供的中文入口 `https://www.techflowpost.com/zh-CN`，直接覆盖中文 Web3 资讯与深度内容场景

## 保留意见

- 本轮新增候选中，`PixiJS` 已在 `data/sites.ts` 中存在，因此不重复新增
- Web3 相关站点当前数量尚不足以新增一级分类，暂通过 `Web3`、`EVM`、`RPC`、`Gas`、`跨链` 等标签聚合
- `Ethereum.org 中文` 归入 `学习`，因为当前入口是官方中文总站，核心价值是帮助理解以太坊基础、生态与后续开发资料；若后续主要查开发接口，可再补充开发者专项入口
- `CryptoRank` 当前归入 `工具`，因为核心使用场景是行情、排行与数据分析；`深潮 TechFlow` 归入 `资讯`，因为核心使用场景是内容阅读与行业动态跟进
- `ts-node` 适合兼容既有 Node.js 工作流，但若目标只是现代 TypeScript 脚本执行，通常会优先考虑已存在的 `tsx`
- `Dotenv` 可作为环境变量生态入口，但不应被误解为前端敏感信息保护方案；更适合放在配置管理语境下理解
- `Cloudflare` 当前落库为官方中文主站；若后续使用场景明显偏向开发文档，可再评估是否补充 `developers.cloudflare.com` 作为更直接入口
- `reCAPTCHA Docs` 属于较窄的安全/反滥用场景，但对网站表单、登录与关键操作的人机验证接入有明确复用价值，因此作为专项官方文档保留

## 影响范围

- 影响数据源：`data/sites.ts`
- 影响治理入口：`docs/_meta/manifest.yaml`、`README.md`
- 不影响：数据模型、首页交互、偏好层逻辑
