# 项目级 AGENTS

## 概述

本项目为个人笔记文档项目，基于 VuePress 构建，使用 GitHub Pages 发布。

`./AGENTS.md` 是项目级 Agent 说明文件，用于管理整体文档结构、约束、构建与发布流程。

## 项目结构

- `docs/fe_lang/`：前端语言与开发相关文档，例如 JavaScript、CSS、HTML、Vue、开发随笔、面试总结
- `docs/notes/`：个人兴趣笔记，如股票学习、思考记录等
- `docs/tools/`：工具类文档，如 Git、Linux、AI 工具链与大模型
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

- 推荐创建 `docs/tools/ai.md`
- 包含以下分类：
  - 代理型工具（如 VS Code Copilot、Claude Code、Codex 等）
  - 大模型介绍（如 ChatGPT、Opus、Minimax 等）
- 内容内部再进行分类整理

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
- `./ai-skill`：文档级 Skill，专注于 `docs/tools/ai.md` 的 AI 工具链与大模型文档结构与内容指导
- 未来其它文档可根据需要创建对应的文档级 Skill，但当前只保留 `stock-skill` 和 `ai-skill`

## 建议

- 文档内容保持简洁、结构清晰
- 统一使用中文描述
- 新增文档后补充导航链接
- 本地测试 `pnpm dev` 或 `pnpm build` 再部署
