# Site Atlas 知识治理系统

本目录不是普通文档集合，而是项目的知识治理系统。它的目标是让人类与 AI 在后续迭代中始终基于同一套权威信息协作，避免需求漂移、设计脱节和实现跑偏。

## 设计目标

- 为每类信息建立单一事实源
- 为 AI 提供稳定、明确、可执行的阅读顺序与任务路由
- 为每次迭代建立工作单，控制边界并沉淀变更记录
- 让产品、设计、工程、运营资产可以相互追踪

## 目录说明

- `docs/_meta/`：治理元数据，定义宪法、优先级、任务路由、资产清单
- `docs/foundation/`：项目基础定义、术语与长期原则
- `docs/product/`：愿景、需求、信息架构
- `docs/design/`：交互规则与页面规格
- `docs/engineering/`：架构、数据模型、关键技术决策
- `docs/delivery/`：路线图、工作单、验收与复盘
- `docs/operations/`：日常维护与内容运营流程

## AI 必读顺序

1. `AGENTS.md`
2. `docs/_meta/CONSTITUTION.md`
3. `docs/_meta/authority.yaml`
4. `docs/_meta/routing.yaml`
5. `docs/_meta/manifest.yaml`
6. 当前工作单
7. 当前任务所需权威资产

## 协作协议

- 产品边界只认 `PRD`
- 页面行为只认页面规格与交互规则
- 数据字段只认 `DATA_MODEL`
- 技术取舍只认 `ADR`
- 任何实现变更都要回写对应资产
- 无工作单的复杂需求，不直接进入实现
