---
prev:
  text: git 日常使用
  link: /tools/git
next:
  text: linux 服务器操作
  link: /tools/linux
---

# AI 工具链与大模型

## 说明

- 信息更新时间：`2026-04-24`
- 本页关注重点：适合个人开发者，尤其是从前端走向全栈、希望独立完成“小项目全生命周期”的 Agent 方案
- 本页优先记录：产品形态、能力边界、常见模型搭配、适用场景、长期跟踪结论
- 本页默认不重点写价格，因为价格和套餐变动太快，长期参考价值不如能力结构
- 本页覆盖的是截至 `2026-04-24` 仍值得重点关注的一线方案与开放方案，不追求穷举全市场

## 结论先行

- 如果当前目标是独立完成需求分析、编码、调试、测试、部署、文档、迭代这一整条链路，`Codex + GPT-5.4` 是 2026 年 4 月最值得优先投入的一套主力组合之一。
- 如果你已经习惯 IDE 内工作流，`Cursor`、`GitHub Copilot`、`Windsurf` 依然是主流第一梯队；它们的差异已经不只是“补全质量”，而是背景任务、工具调用、浏览器/终端操作、项目规则、云端异步执行能力。
- 如果你想真正理解 Agent，不建议只用封闭产品。至少要补一套开放栈：`Cline`、`OpenCode`、`Continue`、`Aider`、`OpenHands` 这类方案更适合学习模型、工具、上下文、权限、MCP、自动化之间是怎么拼起来的。
- `OpenClaw` 不属于“主力编码 IDE Agent”，但非常值得关注。它更像“本地优先的个人 Agent 控制平面”，适合把聊天入口、浏览器、命令执行、Webhook、Cron、自动化工作流统一起来。
- 对你这种“前端工程师向全栈过渡”的阶段，最优策略通常不是只选一个 Agent，而是形成分层组合：`一个主力编码 Agent + 一个开放学习栈 + 一个自动化/工作流 Agent`。

## 你当前应该重点看什么

如果目标是“一个人独立把小项目做完”，选型时重点看下面这些能力，而不是只看模型名字：

- 能不能跨文件、跨目录、跨模块持续工作，而不是只会补一段代码
- 能不能跑命令、读日志、修测试、改配置、连浏览器、做验证
- 能不能处理前端 + 后端 + 部署 + 文档，而不是只擅长某一层
- 能不能通过规则、记忆、技能、MCP、脚本把你的经验固化下来
- 能不能开多个任务并行跑，让你从“亲自写”升级成“指挥和验收”
- 能不能在安全边界内工作：审批、沙箱、只读/可写、分支、工作树、回滚

## Agent 方案地图

### 一、闭环型主流编码 Agent

这类产品适合直接拿来做日常开发主力。

| 方案 | 形态 | 常见模型搭配 | 主要特点 | 适合度 |
| --- | --- | --- | --- | --- |
| `Codex` | `App + CLI + IDE + Cloud` | `GPT-5.4`、`GPT-5.3-Codex` | OpenAI 自家全链路编码 Agent，支持多 agent、工作树、云环境、自动化、电脑操作 | 很高 |
| `Cursor` | `AI IDE` | `Cursor Auto`、`Claude`、`GPT`、`Gemini`、`xAI`、`DeepSeek` | IDE 体验成熟，背景 Agent 强，多模型切换灵活 | 很高 |
| `Claude Code` | `Terminal-first` | `Claude Sonnet 4`、`Claude Opus 4.1` | 终端工作流强，深度理解代码库，审批和安全感好 | 很高 |
| `GitHub Copilot` | `IDE + GitHub.com + Agent` | `Claude Sonnet 4.5/4.6`、`Claude Opus 4.6/4.7`、`GPT-5.2-Codex`、`GPT-5.3-Codex`、`GPT-5.4`、`Gemini 3.1 Pro`、`Auto` | 和 issue/PR/repo 生命周期结合最深，异步 agent 在 GitHub 上工作 | 很高 |
| `Windsurf` | `AI IDE` | `SWE-1.6`、`SWE-1.5`、`Claude 4 Sonnet`、`Claude 4 Opus`、`Adaptive` | 自研 SWE 模型 + Cascade，强调实时协作、工具链、部署 | 高 |
| `Qoder` | `IDE + CLI + Quest` | `Qoder tiered models`、自带 Frontier、Custom Models | 更强调上下文工程、任务模式、异步 Quest | 中高 |
| `TRAE` | `AI IDE + SOLO` | 平台内模型路由 + 多 agent | 更偏“AI 工程师”式工作流，支持 SOLO 并行执行 | 中高 |
| `Zed` | `AI Editor` | 自托管/自带模型 + 外部 Agent | 编辑器本体轻快，支持外部 Agent Client Protocol | 中 |

### 二、开放可组装型 Agent

这类产品更适合学习 Agent 原理、自己搭工作流、自由切模型。

| 方案 | 形态 | 常见模型搭配 | 主要特点 | 适合度 |
| --- | --- | --- | --- | --- |
| `Cline` | `VS Code 扩展 + CLI` | `Claude`、`GPT`、`Gemini`、`DeepSeek`、本地模型 | 透明、可控、客户端运行、MCP 生态强 | 很高 |
| `OpenCode` | `Terminal + IDE + Desktop` | `GPT 5`、`GPT 5 Codex`、`Claude Sonnet 4.5` 等 | 开源、支持 75+ provider、多会话并行、权限可控 | 很高 |
| `Continue` | `VS Code/JetBrains + CLI` | `Claude`、`GPT`、`Gemini`、`Qwen3 Coder`、`Devstral`、`Kimi K2`、`gpt-oss` | 最适合学习“多模型分工”与自定义角色 | 很高 |
| `Aider` | `CLI` | `Claude`、`GPT`、其他 API 模型 | Git 集成很强，适合终端驱动、补丁式开发 | 高 |
| `OpenHands` | `Cloud / GUI / CLI / Headless` | `Claude Sonnet 4/4.5`、`GPT-5`、`Gemini 2.5 Pro`、`DeepSeek`、`Kimi K2` | 更像通用软件工程 Agent 平台，能跑命令、浏览网页、调 API | 高 |
| `Roo Code` | `VS Code + Cloud` | 多 provider / 自带 Router / BYOM | 模式化与多 Agent 设计有启发，但已宣布停止服务 | 仅参考 |

### 三、控制平面 / 自动化型 Agent

这类产品不一定是主力写代码工具，但对“把 AI 用出业务价值”很关键。

| 方案 | 形态 | 常见模型搭配 | 主要特点 | 适合度 |
| --- | --- | --- | --- | --- |
| `OpenClaw` | `本地优先个人 Agent 平台` | 自选 provider | 统一聊天入口、Exec、Browser、Webhooks、Cron、Gateway 安全边界 | 很高 |
| `Amp` | `Terminal + Editor` | 内部多模型路由，含 `GPT-5.4`、`Claude Opus 4.6`、`fast models` | 强调“前沿多模型编排”，更像研究型高质量 agent harness | 高 |

## 重点方案详解

### 1. `Codex + GPT-5.4`

#### 定位

OpenAI 当前主推的编码 Agent 组合，适合从“单次问答”升级到“长任务交付”。截至 `2026-04-24`，`GPT-5.4` 已经接入 `ChatGPT`、`API` 和 `Codex`。

#### 适合你的原因

- 你已经在尝试这套组合，迁移成本最低
- `GPT-5.4` 不是单纯“代码模型”，它把推理、编码、电脑操作、工具使用整合到了一个主力模型里
- OpenAI 明确把 `Codex` 做成了 `App + CLI + IDE + Cloud` 的统一体系，适合从局部编码扩展到整条交付链
- 对前端体验尤其友好，官方明确强调其在复杂前端任务上的效果提升

#### 这套组合的强项

- 一个模型即可覆盖：需求理解、方案设计、编码、测试、浏览器验证、文档、自动化
- 支持多 agent 并行、工作树、云环境，适合你逐步学习“任务拆分和调度”
- `GPT-5.4` 具备原生电脑操作能力，适合真实软件工作流，而不是只会文本补全
- Codex 已支持在终端、IDE、App、Cloud 之间连贯工作

#### 可能的短板

- OpenAI 体系更强在“闭环体验”，如果你想深挖底层编排，开放栈可学习性不如 Cline / Continue
- 如果你习惯一直待在 IDE 里，Codex App/CLI 的工作方式需要一段适应期

#### 适合的用法

- 主力做：需求拆解、全栈小项目推进、复杂前端页面、跨文件重构、测试和验证
- 配合做：把重复动作沉淀成 Skills、Automations、项目规则

### 2. `Cursor + Claude / GPT / Gemini / Cursor Auto`

#### 定位

最成熟的一类 AI IDE 方案之一。它的核心优势不只是“能选很多模型”，而是把 Agent 做进了日常编码环境。

#### 这套组合的特点

- `Cursor Auto` 可以自动选取当前最合适的高级模型
- 支持背景 Agent，在远程 Ubuntu 环境中异步编辑、运行代码，并可联网安装依赖
- 支持多家一线模型，适合横向对比不同模型风格
- 对习惯 IDE 的人，上手成本通常低于 terminal-first 工具

#### 什么时候适合你

- 想保留 IDE 主工作流
- 更重视编辑体验、局部修改、交互速度
- 需要边写边调，而不是完全切去一个独立 agent 工作台

#### 推荐搭配思路

- 日常开发：`Cursor Auto`
- 高质量重构/复杂理解：偏 `Claude`
- 全局推理、工具协调、长任务：偏 OpenAI 当前一线强模型
- 超长上下文场景：偏 `Gemini`

### 3. `Claude Code + Claude Sonnet 4 / Opus 4.1`

#### 定位

终端优先的强 Agent。它不是 IDE 补全工具，而是“在你的环境里代你工作”的工程搭子。

#### 强项

- 深度理解整个代码库，不用你手动拼太多上下文
- 可以直接连接你已有的命令行、测试、构建、GitHub/GitLab 工作流
- 默认审批更保守，安全感更强
- 对代码解释、重构、测试修复、陌生仓库 onboarding 很强

#### 适合你吗

如果你准备从“写前端页面”逐步走向“会在终端里搞定服务、数据库、部署、日志”，`Claude Code` 很值得长期掌握。它会倒逼你提高命令行和工程化能力。

### 4. `GitHub Copilot + GitHub 原生工作流 + 多模型`

#### 定位

最强项不一定是本地编码体验，而是和 `issue -> branch -> PR -> review -> merge` 这条链的结合。

#### 强项

- 可把 issue 直接交给 coding agent 异步处理
- Agent 生成 PR 后可继续基于评论迭代
- 模型选择已经不再局限于单一模型，官方当前列出了 `Claude 4.5/4.6/4.7`、`GPT-5.2/5.2-Codex/5.3-Codex/5.4`、`Gemini 2.5 Pro/3.1 Pro` 等可选项
- 对个人项目或团队协作都很适合，因为代码生命周期管理在 GitHub 上天然完整

#### 适合你吗

如果你未来会频繁用 GitHub 管 issue、PR、自动化、Actions，Copilot 的价值会越来越高。它非常适合作为“项目流程 Agent”，哪怕你的本地编码主力不是它。

### 5. `Windsurf + SWE-1.6 / Claude 4 家族`

#### 定位

Windsurf 依旧是强势 AI IDE。它的差异点在于不只是集成第三方模型，还在推自己的 `SWE-1.x` 软件工程模型家族。截至 `2026-04-24`，官方模型页已将 `SWE-1.6` 标为当前最新通用版本。

#### 强项

- `Cascade` 支持 Code/Chat、工具调用、Web Search、MCP、Workflows、App Deploys
- 支持实时感知你的编辑行为
- 自研 `SWE-1.6` 主打 agentic coding 性能与体验，`SWE-1.5` 仍值得作为路线参考
- 自动执行模式分 `Off / Auto / Turbo`，更强调执行级体验

#### 适合你吗

如果你想要一个更“主动执行”的 IDE Agent，且想观察“Agent 产品 + 自研工程模型”路线，Windsurf 很值得跟踪。

### 6. `Qoder / TRAE / Zed`

#### `Qoder`

- 官方文档强调 `Agent Mode` 可自动拆解任务、跨文件改动、自动感知项目环境、调用工具和执行命令
- 适合希望看到清晰计划、To-dos、背景任务和命令执行审批的人
- 模型层支持 tiered model、frontier model、custom model 三层选择

#### `TRAE`

- 更强调“AI engineer”感，`SOLO` 可以跨 IDE、终端、文档、浏览器、集成工具持续工作
- 支持并行 agent、语音输入、文档/数据/代码混合上下文
- 适合想观察“从 coding agent 走向通用知识工作 agent”的路线

#### `Zed`

- 是一个更开放、轻量、重性能的编辑器路径
- 支持多模型、BYOK、本地模型，以及通过 ACP 接外部 agent，例如 `Claude Agent`、`Codex`、`OpenCode`
- 适合对编辑器性能、开放性、组合式工作流要求高的人

## 开放学习栈：如果要真正学会 Agent，重点看这些

### `Cline`

- 核心特点：透明、客户端运行、你批准每一步、支持浏览器、终端、MCP、CLI
- 学习价值：非常适合理解 Agent 到底读了什么、做了什么、为什么这样调用工具
- 适合搭配：`Claude`、`GPT`、`Gemini`、`DeepSeek`、本地模型

### `OpenCode`

- 核心特点：开源、支持 75+ provider、终端/桌面/IDE 全覆盖、多 session 并行
- 学习价值：适合理解 provider 抽象、权限控制、agent mode、plan/build 模式
- 官方还直接推荐了适合它的编码模型，例如 `GPT 5`、`GPT 5 Codex`、`Claude Sonnet 4.5`

### `Continue`

- 核心特点：把模型拆成 `chat`、`autocomplete`、`edit`、`apply`、`embed`、`rerank` 等角色
- 学习价值：最适合理解“不要让一个模型干所有事”
- 官方建议里，闭源强模型包括 `Claude Opus 4.1`、`Claude Sonnet 4`、`GPT-5`、`Gemini 2.5 Pro`；开源模型包括 `Qwen3 Coder`、`Devstral`、`Kimi K2`、`gpt-oss`、`GLM 4.5`

### `Aider`

- 核心特点：终端小而强，和 Git 深度集成，AI 改动自动落到提交记录里
- 学习价值：适合练“补丁驱动 + Git 驱动”的最小可用 Agent 工作流
- 特别适合做：中小项目、局部改动、快速修 bug、保守重构

### `OpenHands`

- 核心特点：能改代码、跑命令、浏览网页、调 API，并支持 Cloud / GUI / CLI / Headless
- 学习价值：非常适合理解“软件工程 Agent 平台”而不是“IDE 插件”
- 官方建议模型包括 `Claude Sonnet 4/4.5`、`GPT-5`、`Gemini 2.5 Pro`、`DeepSeek`、`Kimi K2`

### `Roo Code`

- 参考价值依然在，尤其是 `mode`、`orchestrator`、`cloud agent` 这些设计思路
- 但官方文档已写明：`Roo Code` 全系产品将于 `2026-05-15` 停止服务
- 结论：可以研究其设计理念，不建议再重投入为主力工具

## `OpenClaw` 应该怎么理解

很多人会把 `OpenClaw` 当成“又一个 coding agent”，但它更准确的定位是：

- 本地优先的个人 Agent 平台
- 有清晰 Gateway 安全边界的执行控制面
- 能把聊天入口、浏览器、命令执行、Webhook、Cron、自动化串起来

### 它的价值不在于替代 Cursor/Codex

它的价值在于：

- 让 Agent 不只存在于 IDE
- 让 Agent 可以从 `WhatsApp / Telegram / Discord / Gmail / Webhook` 等入口进来
- 让 Agent 能在你自己的机器或局域网里，通过 `Exec / Browser / Web` 做可验证执行
- 让重复动作变成 Cron、Webhook、Hooks、Skills

### 对你的实际意义

如果你未来想把 AI 用在下面这些方向，`OpenClaw` 非常值得长期跟踪：

- 个人项目运维和巡检
- 自动收集日志、报表、提醒
- 用聊天入口触发脚本、部署、截图、网页检查
- 形成自己的“个人 AI 工作台”

### 结论

`OpenClaw` 不是你唯一的主力编码 Agent，但它非常适合成为“全生命周期自动化层”。

## 当前主流模型搭配建议

### 第一梯队：主力模型

- `GPT-5.4`
  - 当前非常适合做“一个模型覆盖多阶段工作”
  - 兼顾推理、编码、电脑操作、长任务、工具协调
- `Claude Sonnet 4 / 4.5`
  - 依然是大量编码 Agent 的核心主力模型
  - 更偏代码理解、稳定编码、低摩擦协作
- `Claude Opus 4.1 / 4.6`
  - 更适合复杂任务、难重构、深分析
  - 成本通常更高，更适合难题而不是所有任务都开最大档
- `Gemini 2.5 Pro / Gemini 3.1 Pro`
  - 更适合超长上下文、检索、视觉、多模态、复杂资料整合

### 第二梯队：开放模型 / 性价比模型

- `Qwen3 Coder`
- `Devstral`
- `Kimi K2`
- `gpt-oss`
- `GLM 4.5`
- `DeepSeek`

这些模型更适合放在 `Continue`、`OpenHands`、`Cline`、`OpenCode` 这类开放栈里做对比和成本优化。

## 结合你的背景，我建议的三层组合

### 方案 A：当前最稳的主力组合

- 主力交付：`Codex + GPT-5.4`
- IDE 补位：`Cursor + Claude / GPT`
- 自动化补位：`OpenClaw`

适合你现在就开始。原因是这套组合能同时覆盖：

- 日常开发
- 小项目全生命周期
- IDE 体验
- 终端与自动化
- 后续沉淀技能、规则、工作流

### 方案 B：更偏工程能力成长

- 主力交付：`Claude Code + Claude Sonnet 4 / Opus 4.1`
- GitHub 生命周期：`GitHub Copilot coding agent`
- 开放学习：`Continue` 或 `Cline`

这套更能逼你练：

- 终端
- Git
- 测试
- 构建
- CI/CD
- 多模型分工

### 方案 C：更偏“研究 Agent 本身”

- 主力实验台：`OpenCode` 或 `Cline`
- 平台型 Agent：`OpenHands`
- 自动化与个人工作台：`OpenClaw`

这套不一定最顺手，但最有助于你理解：

- Agent 架构
- 模型选择
- 工具权限
- MCP
- 沙箱
- 多 Agent 编排

## 如果你的目标是“独立完成小项目全生命周期”，需要补的 AI 能力

不要只学怎么提问，还要系统补这些能力：

- 任务拆解：把一个模糊需求拆成可交付的子任务
- 上下文工程：知道给 Agent 什么上下文，什么时候不要给太多
- 验证闭环：让 Agent 写完之后自己跑测试、看日志、做截图、做回归检查
- 工具编排：学会 MCP、脚本、CLI、Browser automation、Webhook、Cron
- 规则沉淀：把反复说的话沉淀成 `AGENTS.md`、rules、skills、memory
- 多 Agent 协作：一个 agent 负责计划，一个负责实现，一个负责 review/验证
- 成本意识：不是所有任务都用最贵模型，要学会按任务选模型
- 结果经营：把 AI 产出的代码、文档、流程、脚本沉淀成自己的资产

## 我的长期更新方法

后续你每次探索新 Agent，可以按下面模板追加：

### 评估记录模板

- 日期：
- Agent / 产品：
- 搭配模型：
- 使用场景：
- 任务类型：
- 做得好的地方：
- 做得差的地方：
- 是否适合作为主力：
- 是否适合作为补充工具：
- 我的最终结论：

### 个人选型结论模板

- 当前主力：
- 当前补位：
- 当前自动化层：
- 当前不推荐：
- 下一步准备重点试用：

## 我当前的阶段性判断

截至 `2026-04-24`，如果我是“前端工程师，目标是一人独立做完整小项目”，我的阶段性判断会是：

1. 主力先用 `Codex + GPT-5.4`，因为它最接近“一个 agent 贯穿整条工作链”。
2. IDE 侧继续保留 `Cursor` 作为高频协作工具，因为 IDE 内修改和交互效率依旧很重要。
3. 再补一套 `Cline / OpenCode / Continue` 里的开放栈，用来真正学习 Agent 原理和模型分工。
4. 如果想把 AI 从“写代码”扩展到“帮我做事”，开始认真跟踪 `OpenClaw`。
5. `Roo Code` 可以研究，但不要再作为新主力投入，因为官方已宣布将在 `2026-05-15` 停服。

## 官方资料入口

### OpenAI / Codex

- [Introducing GPT-5.4](https://openai.com/index/introducing-gpt-5-4/)
- [Codex 产品页](https://openai.com/codex)
- [Introducing the Codex app](https://openai.com/index/introducing-the-codex-app/)
- [Codex for (almost) everything](https://openai.com/index/codex-for-almost-everything/)
- [Codex in ChatGPT / CLI 帮助文档](https://help.openai.com/en/articles/11369540-codex-in-chatgpt)

### Cursor

- [Cursor Models](https://docs.cursor.com/models)
- [Cursor Background Agents](https://docs.cursor.com/en/background-agents)

### Anthropic / Claude Code

- [Claude Code 产品页](https://www.anthropic.com/product/claude-code)
- [Claude Code 介绍页](https://www.anthropic.com/claude-code/)

### GitHub Copilot

- [Copilot 支持模型](https://docs.github.com/en/copilot/using-github-copilot/ai-models/supported-ai-models-in-copilot)
- [Copilot coding agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
- [Copilot coding agent 模型选择](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/changing-the-ai-model)

### Windsurf

- [Windsurf Cascade 概览](https://docs.windsurf.com/windsurf/cascade)
- [Windsurf AI Models](https://docs.windsurf.com/windsurf/models)

### 开放栈

- [Cline Overview](https://docs.cline.bot/introduction/overview)
- [Cline MCP Overview](https://docs.cline.bot/mcp/mcp-overview)
- [OpenCode 首页](https://opencode.ai/)
- [OpenCode Docs](https://opencode.ai/docs/)
- [OpenCode Providers](https://opencode.ai/docs/providers/)
- [Continue Overview](https://docs.continue.dev/setup/overview)
- [Continue Models](https://docs.continue.dev/customization/models)
- [Continue Model Roles](https://docs.continue.dev/customize/model-roles/intro)
- [Aider Git Integration](https://aider.chat/docs/git.html)
- [OpenHands Docs](https://docs.all-hands.dev/)
- [OpenHands 模型概览](https://docs.all-hands.dev/usage/llms/llms)

### 其他值得跟踪

- [OpenClaw 首页](https://openclawlab.com/en/)
- [OpenClaw Agent Runtime](https://openclawlab.com/en/docs/concepts/agent/)
- [Qoder Docs](https://docs.qoder.com/)
- [Qoder Agent Mode](https://docs.qoder.com/user-guide/chat/agent)
- [TRAE 官网](https://www.trae.ai/)
- [TRAE SOLO](https://www.trae.ai/solo-web)
- [Zed AI Overview](https://zed.dev/docs/ai/overview)
- [Amp Owner's Manual](https://ampcode.com/manual)
- [Roo Code Docs](https://docs.roocode.com/)
