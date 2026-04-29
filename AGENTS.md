# 项目级 AGENTS

## 概述

本项目为个人笔记文档项目，基于 VuePress 构建，使用 GitHub Pages 发布。

`./AGENTS.md` 是项目级 Agent 说明文件，用于管理整体文档结构、约束、构建与发布流程。

## 项目结构

- `docs/fe_lang/`：前端语言与开发相关文档，例如 JavaScript、CSS、HTML、Vue、开发随笔、面试总结
- `docs/notes/`：个人兴趣笔记，如股票学习、思考记录等
- `docs/tools/`：工具类文档，如 Git、Linux
- `docs/ai/`：AI 学习与实践文档，如 Agent 工具链、模型选型、自动化实践计划、官方资料入口
- `docs/readme.md`：首页配置与导航入口

## 关键点

- 所有文档均以 Markdown (.md) 存储
- 使用 VuePress 2.x 构建静态站点
- 使用 `deploy.sh` 部署到 GitHub Pages
- 文档内容须使用中文编写

## 工作流程

### 新增文档

1. 选择合适目录：`fe_lang`、`notes`、`tools`
2. 新建 Markdown 文件，文件名建议使用小写英文，并保持当前项目命名风格
3. 保持与现有文件相同的 frontmatter 格式
4. 如为新顶级内容，补充 `docs/readme.md` 的导航链接

### 构建站点

```bash
pnpm build
```

### 部署站点

```bash
bash deploy.sh
```

### AI 工具链文档建议

- 推荐使用 `docs/ai/` 目录集中维护 AI 相关文档
- 建议至少拆分为以下类型：
  - Agent 工具链与产品地图
  - 模型搭配与选型结论
  - 自动化实践计划与问题复盘
  - 官方资料入口
- 不再建议把 AI 工具综述、模型选型、实践计划全部堆在单一文档中
- 当用户在实践 AI 工具、Agent 工作流、自动化系统、服务器部署、消息触发、计划编排等内容时，优先沉淀到 `docs/ai/` 对应专题文档
- 若用户后续持续推进某个 AI 实践计划，应优先更新 `docs/ai/practice-plan.md`

## 约束与规范

### 文档语言

- 所有文档内容必须使用中文编写
- 文件名、目录名仍建议使用小写英文，不含空格

### 文档格式

- 仅使用 Markdown 格式
- VuePress 页面需使用兼容 frontmatter（如 `prev` / `next`）

### 版本控制

- 使用 Git 管理所有变更
- 提交信息应简洁明了
- 更新后手动执行发布，不依赖自动发布流程

### 更新频率

- 按需更新，依据内容新增或修正
- 不要求固定更新时间表

### 目录管理

- 维持现有目录结构：`fe_lang`、`notes`、`tools`
- 预留未来扩展目录，如后端语言、数据库等

### 构建与发布

- 手动执行构建与发布脚本
- 发布前确保构建通过
- 当前不启用自动 CI/CD

## 关系说明

- `./AGENTS.md`：项目级 Agent 说明文件，定义整体文档规则与发布流程
- `./stock-skill`：文档级 Skill，专注于 `docs/notes/stock.md` 的内容生成与补充规则
- `./ai-skill`：文档级 Skill，专注于 `docs/ai/` 目录下的 AI 学习与实践文档结构与内容指导
- 未来其它文档可根据需要创建对应的文档级 Skill，但当前只保留 `stock-skill` 和 `ai-skill`
- `docs/ai/` 同时承担“AI 工具研究笔记 + 真实实践记录”双重角色，后续如围绕某个 AI 项目持续实施，可持续向对应文档追加内容

## 建议

- 文档内容保持简洁、结构清晰
- 统一使用中文描述
- 新增文档后补充导航链接
- 本地测试 `pnpm dev` 或 `pnpm build` 再部署
