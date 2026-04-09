<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Repo Agent Rules

## 工作语言

- 默认使用中文与用户沟通，除非用户明确要求其他语言

## 设计与实现原则

- 优先遵循第一性原理：先识别核心问题、真实约束、关键路径与最小可行闭环
- 优先做精简架构、简单设计、易维护、易测试的方案
- 以向下兼容为默认原则，不随意破坏现有主链路
- 复杂需求先给方案并等待用户 review；简单明确需求可直接修改
- 使用 Python 时统一通过 `python3` 执行

## 知识治理入口

在开始任何非琐碎任务前，必须按以下顺序读取并遵循：

1. `AGENTS.md`
2. `docs/_meta/CONSTITUTION.md`
3. `docs/_meta/authority.yaml`
4. `docs/_meta/routing.yaml`
5. `docs/_meta/manifest.yaml`
6. 当前任务对应的 `docs/delivery/work-items/...`
7. `routing.yaml` 指定的权威资产

## 执行协议

- 未阅读当前任务所需权威资产前，不直接修改代码或文档
- 任何需求、设计、数据结构、实现策略变更，都必须回写到其权威资产
- 若发现需求超出当前工作单范围，先更新工作单，再继续实现
- 若资产之间冲突，按 `docs/_meta/authority.yaml` 的优先级处理
- 若缺少对应资产，先补资产，再继续实现

## 交付要求

- 完成修改后，必须对照工作单验收项自检
- 汇报时说明：变更内容、影响范围、是否与需求一致、下一步建议
