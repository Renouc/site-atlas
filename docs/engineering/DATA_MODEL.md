# 数据模型

## 1. 目标

定义 V1 首页导航所需的最小稳定字段集，既保证表达能力，也控制维护成本。

## 2. 核心实体

### SiteRecord

```ts
type SiteStatus = "active" | "draft" | "archived";

type SiteCategory =
  | "常用"
  | "开发"
  | "AI / LLM"
  | "设计"
  | "工具"
  | "学习"
  | "资讯"
  | "其他";

interface SiteRecord {
  id: string;
  name: string;
  url: string;
  description: string;
  category: SiteCategory;
  tags: string[];
  pinned: boolean;
  note?: string;
  sortOrder?: number;
  status: SiteStatus;
}
```

## 3. 字段约束

- `id`：稳定、唯一，不因展示名称变化而变化
- `name`：站点展示名称，要求短且可识别
- `url`：完整链接，必须可直接跳转
- `description`：一句话说明用途，不能为空
- `category`：必须属于受控分类集合
- `tags`：0 个或多个稳定标签，优先复用
- `pinned`：是否进入置顶区
- `note`：补充说明，可选
- `sortOrder`：手动排序字段，可选
- `status`：用于控制是否展示或归档

## 4. 状态语义

- `active`：正常参与展示与搜索
- `draft`：未准备好，不进入默认展示
- `archived`：已淘汰，仅保留历史，不进入默认展示

## 5. 排序建议

- 先按 `pinned`
- 再按 `sortOrder`
- 再按 `name`

## 6. 示例

```ts
const example: SiteRecord = {
  id: "openai-docs",
  name: "OpenAI Docs",
  url: "https://platform.openai.com/docs",
  description: "OpenAI 平台官方文档，查询模型、API 与实践指南。",
  category: "AI / LLM",
  tags: ["文档", "API", "LLM"],
  pinned: true,
  status: "active",
};
```

## 7. 演进规则

- 如新增字段，需先说明其用户价值与维护成本
- 若新增字段只服务低频场景，不进入核心模型
- 结构变化必须同步更新页面规格与维护手册
