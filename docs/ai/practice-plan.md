---
prev:
  text: AI 模型搭配与选型
  link: /ai/model-selection
next:
  text: AI 官方资料入口
  link: /ai/references
---

# AI 自动化实践计划

## 说明

- 信息更新时间：`2026-05-13`
- 本页只保留真实实践计划与执行记录，不再单独展开“当前目标”“选型判断”“阶段路线”之类的说明性内容
- 从第二个二级标题开始，每一个二级标题都代表一个独立实践计划，内部统一按“实施步骤 + 执行记录”维护
- 后续如果开始新的实践，只需要继续在本文后面新增新的二级标题即可
- 当前主计划已经从“OpenClaw Docker + 宿主机仓库 + Hermes API”收敛为“纯 Hermes + 宿主机仓库 + Hermes Dashboard/Feishu”

## 实践计划一：纯 Hermes + 宿主机仓库 + Dashboard/Feishu 的个人 Agent 架构

### 计划目标

- 在 `Ubuntu 22.04.5 LTS` 服务器上仅保留 `Hermes` 作为核心 Agent
- 让 `Hermes` 直接操作宿主机上的 `notes` 仓库，不再经过 `OpenClaw` 转发
- 提供两类入口：
  - `Hermes Web Dashboard + TUI`：浏览器控制台与调试入口
  - `Feishu`：日常移动消息入口
- 保留 `OpenClaw` 当前部署状态记录，但不再继续以它作为主入口推进

### 架构约定

- `Hermes`：跑在宿主机，负责消息入口、会话执行、工具调用和文档改写
- `notes` 仓库：放在宿主机固定目录 `/data/repos/notes`
- `notes` 分支约定：`source` 是源码分支，`master` 是构建产物分支，`main` 已废弃
- `Hermes Dashboard`：作为浏览器管理后台，必要时同时开启网页内聊天页
- `Feishu`：作为手机与外部电脑上的日常消息入口
- `OpenClaw`：当前阶段不删除，只保留状态记录；确认 Hermes 跑稳后再决定是否彻底卸载
- 账号策略：`root` 只负责初始化与 systemd 操作，长期运行统一使用普通用户 `agent`
- 工具链策略：`Node.js` 和 `pnpm` 统一通过 `Volta` 安装和管理

### 常用命令与操作速查

- 当前环境里的几层关系：

```text
1. 宿主机：
   你 SSH 登录后看到的 Linux 系统本体
   Hermes 跑在这一层
   notes 仓库也放在这一层

2. Hermes Gateway：
   负责消息入口、cron、API Server、Feishu 等平台接入

3. Hermes Dashboard：
   浏览器里的管理后台
   可选开启 --tui，在网页里直接聊天

4. OpenClaw：
   当前仍保留在 Docker 中，但只作为冻结状态保留，不再作为主入口
```

- 常见目录：

```text
/data/apps/hermes                 -> Hermes 运行目录
/data/apps/hermes/home            -> Hermes 数据目录
/data/repos/notes                 -> 笔记仓库目录
/data/apps/openclaw               -> OpenClaw 当前部署目录（仅留档，不再主用）
/home/agent/.openclaw             -> OpenClaw 当前配置目录（仅留档）
```

- 登录与用户切换：

```bash
# 以 agent 用户登录服务器
ssh agent@<服务器IP>

# root 切到 agent
su - agent
```

- 基础目录与当前位置：

```bash
pwd
ls -al

cd /data/apps/hermes
cd /data/apps/hermes/home
cd /data/repos/notes
```

- Hermes 服务状态、启停与日志：

```bash
export HERMES_HOME=/data/apps/hermes/home

/home/agent/.local/bin/hermes --version
/home/agent/.local/bin/hermes gateway status --system
/home/agent/.local/bin/hermes gateway start --system
/home/agent/.local/bin/hermes gateway restart --system
/home/agent/.local/bin/hermes gateway stop --system

journalctl -u hermes-gateway -f
journalctl -u hermes-gateway -n 80 --no-pager
```

- Hermes 配置与端口：

```bash
echo $HERMES_HOME
sed -n '1,240p' /data/apps/hermes/home/config.yaml
sed -n '1,240p' /data/apps/hermes/home/.env
ss -lntp | grep -E '8642|9119'
```

- Hermes Dashboard：

```bash
# 仅本机访问
/home/agent/.local/bin/hermes dashboard

# 开启网页聊天页，并监听所有网卡
/home/agent/.local/bin/hermes dashboard --tui --host 0.0.0.0 --port 9119
```

- Docker / OpenClaw 只读留档：

```bash
systemctl status docker --no-pager
docker --version
docker compose version

cd /data/apps/openclaw
docker compose ps
docker compose logs --tail=80 openclaw-gateway
```

### 步骤 1：确认当前 Hermes 已具备单独承载 Agent 的基础能力

- 实施说明：这一轮不再围绕 `OpenClaw -> Hermes` 联动排障，而是先把问题收敛为“Hermes 自己是否已经具备独立承担个人 Agent 的能力”。如果这一步成立，后面所有工作都围绕 Hermes 自己展开。

```bash
export HERMES_HOME=/data/apps/hermes/home

# 查看版本
/home/agent/.local/bin/hermes --version

# 查看系统服务状态
/home/agent/.local/bin/hermes gateway status --system

# 查看最近日志
journalctl -u hermes-gateway -n 80 --no-pager

# 查看 API 监听
ss -lntp | grep 8642

# 从宿主机测试模型列表
curl -H "Authorization: Bearer <your-hermes-api-key>" \
  http://127.0.0.1:8642/v1/models
```

- 预期结果：确认 Hermes 已能独立提供 `Gateway + API Server`，后续只需要增加 Dashboard 和 Feishu，而不再依赖 OpenClaw。

- 执行记录（`2026-05-13`）：

1. `Hermes Agent` 当前版本为 `v0.12.0 (2026.4.30)`。
2. `hermes-gateway.service` 当前为 `active (running)`，并配置为开机自启。
3. 当前 API Server 已监听 `0.0.0.0:8642`。
4. `config.yaml` 中 `terminal.cwd` 已指向 `/data/repos/notes`，说明 Hermes 已经按宿主机仓库模式运行。

- 当前状态：`已完成，Hermes 已具备独立承载个人 Agent 的基础能力`

### 步骤 2：冻结记录 OpenClaw 当前部署和失败状态

- 实施说明：虽然当前决定不再继续使用 OpenClaw，但在彻底移除前，仍然需要把当前部署、配置和失败症状留档，方便未来回溯“为什么收敛成纯 Hermes”。这一节只记录事实，不再继续修它。

```bash
# Docker 状态
systemctl status docker --no-pager
docker --version
docker compose version

# OpenClaw 当前状态
cd /data/apps/openclaw
docker compose ps
docker compose config --services
docker compose logs --tail=80 openclaw-gateway
docker compose logs --tail=80 openclaw-cli

# 宿主机上的 OpenClaw 配置目录
ls -al /home/agent/.openclaw
ls -al /home/agent/.openclaw/workspace | sed -n '1,80p'
```

- 预期结果：文档中保留一份足够清晰的 OpenClaw 冻结状态说明，后续即使停掉 Docker，也知道当时保留了什么、卡在什么点。

- 执行记录（`2026-05-13`）：

1. `docker.service` 当前为 `active (running)`，开机自启已开启。
2. 当前 `Docker version` 为 `29.4.2`，`Docker Compose version` 为 `v5.1.3`。
3. `docker compose ps` 显示当前只有 `openclaw-gateway` 处于运行状态，`openclaw-cli` 不是常驻容器。
4. `openclaw-gateway` 当前暴露端口为 `18789-18790`。
5. `openclaw-gateway` 日志持续报错，核心症状是：
   - 多次 `deleteWebhook` / `setMyCommands` / `deleteMyCommands` 失败
   - 多次 `getMe` 请求超时
   - 持续访问 `https://api.telegram.org/.../getMe` 超时
   - `health-monitor` 多次尝试重启 Telegram 渠道
6. 这说明当前 OpenClaw 的主要阻塞点不是容器启动失败，而是 `Telegram` 在该服务器网络环境下不可达。
7. `openclaw-cli` 日志显示曾出现过两种状态：
   - `Config: missing`
   - `Config: valid` 但 `Gateway: not reachable at ws://127.0.0.1:18789`
8. `/home/agent/.openclaw/openclaw.json` 及多份备份文件仍保留，说明宿主机已有历史配置。
9. `/home/agent/.openclaw/workspace` 当前仍存在，仅作为历史 OpenClaw 工作区留档。

- 当前状态：`已完成，OpenClaw 当前部署与失败症状已冻结留档`

### 步骤 3：先停掉 OpenClaw 容器与 Docker 服务，但暂不删除文件

- 实施说明：这一步的目标不是卸载，而是先把运行中的 OpenClaw 停下来，避免它继续占用资源、持续打 Telegram 外网超时日志，并减少对 Hermes 的干扰。当前阶段只停服务，不删目录、不删配置、不删镜像。

```bash
# 先停 OpenClaw 容器
cd /data/apps/openclaw
docker compose down

# 确认 OpenClaw 已停止
docker compose ps

# 停掉 Docker 服务
systemctl stop docker

# 停掉 Docker socket，避免后续执行 docker 命令时自动拉起服务
systemctl stop docker.socket

# 确认 Docker 与 socket 已停止
systemctl status docker --no-pager
systemctl status docker.socket --no-pager

# 再确认 OpenClaw 暴露端口已消失
ss -lntp | grep -E '18789|18790'

# 如希望本轮实践期间不再开机自启，可一并禁用
systemctl disable docker.service docker.socket
```

- 预期结果：OpenClaw 不再运行，Docker 服务已停止，Hermes 继续作为宿主机常驻服务单独运行。

- 风险提醒：

1. 执行 `systemctl stop docker` 后，当前所有 Docker 容器都会一起停掉。
2. 这一步不影响 `Hermes Gateway`，因为它当前是 systemd 服务，不依赖 Docker。
3. 若未来临时还想回看 OpenClaw，可直接重新启动 Docker，再进入 `/data/apps/openclaw` 做只读检查。
4. 如果只停 `docker.service` 而不处理 `docker.socket`，后续一旦再执行 `docker ...` 命令，systemd 仍可能自动拉起 Docker；本轮已选择连 `docker.socket` 一并停止并禁用。

- 执行记录（`2026-05-13`）：

1. 已在 `/data/apps/openclaw` 执行 `docker compose down`，`openclaw-gateway`、`openclaw-cli` 容器以及 `openclaw_default` 网络已被移除。
2. `docker compose ps` 已为空，说明当前没有运行中的 OpenClaw 容器。
3. 已执行 `systemctl stop docker`，`docker.service` 当前状态为 `inactive (dead)`。
4. 已执行 `systemctl stop docker.socket`，避免后续 Docker 被 socket 激活自动拉起。
5. 已执行 `systemctl disable docker.service docker.socket`，本轮实践期间不再随系统启动自动恢复。
6. `ss -lntp | grep -E '18789|18790'` 当前无输出，说明 OpenClaw 的对外端口已完全消失。

- 当前状态：`已完成，OpenClaw 与 Docker 已停止并禁用自动拉起`

### 步骤 4：补齐 Hermes Dashboard 依赖，并先在本机启动 Dashboard/TUI

- 实施说明：`Hermes Web Dashboard` 将作为当前纯 Hermes 架构中的浏览器控制台。先在服务器本机验证它能启动，再考虑远程访问。优先使用官方 Dashboard，而不是继续依赖 OpenClaw 的 Control UI。

```bash
export HERMES_HOME=/data/apps/hermes/home

# 切到 agent 用户执行更稳
su - agent
export HERMES_HOME=/data/apps/hermes/home

# 安装 Dashboard 与网页 TUI 所需依赖
pip install 'hermes-agent[web,pty]'

# 本机启动 Dashboard
/home/agent/.local/bin/hermes dashboard

# 如果要同时开聊天页
/home/agent/.local/bin/hermes dashboard --tui
```

- 预期结果：浏览器管理后台可以在服务器本机访问，后续再进入远程映射配置。

- 说明：

1. 官方 Dashboard 默认监听 `127.0.0.1:9119`。
2. `--tui` 会在网页中嵌入聊天页，便于你直接和 Hermes 对话。
3. Dashboard 自身没有内建公网级认证，因此不建议直接裸露公网。

- 执行记录（`2026-05-13`）：

1. 当前 Hermes 环境是基于 `uv` 管理的虚拟环境，`venv/bin/` 下有 `python`，但没有独立的 `pip` 可执行文件，也没有内置 `pip` 模块。
2. 最终未采用系统全局 `pip`，而是通过现有 Hermes 运行环境补依赖并直接启动 Dashboard/TUI。
3. 执行 `/home/agent/.local/bin/hermes dashboard --tui --host 127.0.0.1 --port 9119 --no-open` 后，终端显示：
   - `Web UI built`
   - `Hermes Web UI -> http://127.0.0.1:9119`
4. 启动 Dashboard/TUI 后，用户已确认：
   - `Hermes Gateway` 没有被带挂
   - 本地 Mac 可以通过 SSH 隧道访问服务器上的 Dashboard/TUI 页面
5. 这说明 Hermes 当前已经具备可用的浏览器管理后台与网页聊天入口。

- 当前状态：`已完成，Hermes Dashboard/TUI 已在本机跑通并可通过 SSH 隧道从本地 Mac 访问`

### 步骤 5：配置 Hermes Dashboard 的远程访问方式

- 实施说明：当前已明确选定 `Tailscale 私网` 作为 Hermes Dashboard/TUI 的长期访问方案。原因很直接：Hermes Dashboard 自身没有内建公网认证，而这台服务器已经明确暴露在公网扫描环境里，因此不再继续推进 “`Nginx + 公网反向代理 + 认证`” 作为主路线。当前阶段保留：
  - 已验证临时入口：`SSH 隧道`
  - 正式长期入口：`Tailscale 私网`

- 当前已验证的临时方式：SSH 隧道

```bash
# 在本地 Mac 上执行
ssh -L 9119:127.0.0.1:9119 agent@<服务器IP>

# 然后在本地浏览器访问
http://127.0.0.1:9119
```

- 说明：

1. 当前这条方式已经被实际验证可用。
2. 它不要求把 Hermes Dashboard 改成监听公网地址，也不要求立即配置域名或反向代理。
3. 对当前“先跑通 Hermes”的阶段来说，这是风险最低的远程访问方式。

- 正式长期方案：Tailscale 私网访问

- 目标链路：

```text
手机 / 外部电脑
    |
Tailscale 私网
    |
https://<你的-tailnet-设备域名>
    |
tailscale serve
    |
http://127.0.0.1:9119
    |
Hermes Dashboard --tui
```

- 实施步骤：

```bash
# 1. 在服务器上安装 Tailscale
curl -fsSL https://tailscale.com/install.sh | sh

# 2. 启动服务
systemctl enable --now tailscaled
systemctl status tailscaled --no-pager

# 3. 登录到你的 tailnet
tailscale up

# 4. 查看当前分配到的设备名、私网 IP、MagicDNS 名称
tailscale status
tailscale ip -4
tailscale ip -6

# 5. 确保 Hermes Dashboard 仍只监听本机
/home/agent/.local/bin/hermes dashboard --tui --host 127.0.0.1 --port 9119 --no-open

# 6. 用 Tailscale Serve 暴露本机 Dashboard
tailscale serve --bg http://127.0.0.1:9119

# 7. 查看 Serve 配置
tailscale serve status
```

- 访问方式：

```text
1. 在你的 Mac、iPhone、iPad 或其他长期自用设备上安装 Tailscale
2. 登录到同一个 tailnet
3. 在浏览器里访问 tailscale serve 暴露出的 HTTPS 地址
4. Hermes Dashboard / TUI 页面应可直接打开
```

- 说明：

1. 这条方案不要求 Hermes 直接监听公网地址。
2. 不需要备案域名，也不需要自行维护公网 HTTPS 证书。
3. 它更适合“自己和自己的几台设备长期访问”。
4. 如果要在陌生设备上临时访问，通常仍需要在该设备上安装 Tailscale 并登录同一 tailnet，因此便利性不如公网反向代理。
5. 当前新版 `tailscale serve` CLI 不再使用旧写法 `tailscale serve https / http://127.0.0.1:9119`，而是直接使用：
   `tailscale serve --bg http://127.0.0.1:9119`

- 不建议当前阶段采用的方式：

1. 直接开放 `0.0.0.0:9119` 到公网且不加任何认证。
2. 现在就把 Hermes Dashboard 暴露为普通公网网站。
3. 为了偶尔临时访问而优先上 `Nginx + 认证`，因为当前服务器已经有明显公网扫描压力。

- 预期结果：你可以在手机端和外部电脑端打开 Hermes Dashboard，并通过其中的聊天页直接与 Hermes 交互。

- 执行记录（`2026-05-13`）：

1. 当前 tailnet 已成功启用 `Serve/HTTPS` 能力。
2. 实际执行 `tailscale serve --bg http://127.0.0.1:9119` 后，`tailscale serve status` 返回：

```text
https://ldclouda31488.tail48d087.ts.net (tailnet only)
|-- / proxy http://127.0.0.1:9119
```

3. 初次通过 `ts.net` 域名访问时，曾出现：

```text
{"detail":"Invalid Host header. Dashboard requests must use the hostname the server was bound to."}
```

4. 问题根因是 Hermes Dashboard 以 `127.0.0.1` 作为绑定主机启动，导致通过 `ts.net` 域名进入时 Host header 校验失败。
5. 调整 Dashboard 启动方式后，当前已经能够通过 Tailscale 路径访问 Hermes Dashboard/TUI。

- 推荐补充配置：设备过期策略

1. 固定长期设备：
   - 例如当前云服务器、你的主力 Mac、主力 iPhone
   - 在 Tailscale Admin Console 的 `Machines` 页面中，对对应设备执行 `Disable Key Expiry`
   - 这样这些设备的 node key 不会因默认周期到期而断开
2. 陌生或临时设备：
   - 在 Tailscale Admin Console 的 `Device management` 中，把 `Key Expiry` 设置为 `1 day`
   - 这个设置会作为后续新登录设备的默认认证周期
   - 设备到期后会失去 tailnet 连接，若还要继续使用，需要重新认证
3. 关键边界：
   - `Key Expiry` 的自定义周期是 tailnet 级的默认值，不是按单台设备单独设置 24 小时
   - “固定设备永不过期 + 陌生设备 24 小时过期” 的现实做法是：
     1. 把全局默认设置成 `1 day`
     2. 再对可信固定设备逐台执行 `Disable Key Expiry`
4. 如果你担心陌生设备误加入 tailnet，建议同时开启 `Device approval`，这样新设备加入后还需要你在管理后台手动批准。
5. Admin Console 浏览器会话本身也有独立过期时间，它和设备 key expiry 不是同一个概念。

- 当前状态：`已完成，Tailscale 已作为长期访问方案跑通`

### 步骤 6：把 Hermes Dashboard 做成可长期运行的 systemd 服务

- 实施说明：现在 `Dashboard/TUI + Tailscale Serve` 已经验证可用，下一步建议把 Dashboard 做成单独的 systemd 服务，避免每次都手工启动。这里把 Dashboard 和 Gateway 分成两个 systemd 服务，便于分别排障。注意：当前为了兼容 `ts.net` 域名访问，Dashboard 服务采用的是已经实测可用的启动参数：
  - `--tui`
  - `--host 0.0.0.0`
  - `--port 9119`
  - `--insecure`
  - `--no-open`

- 为什么这里不是 `127.0.0.1`：

1. 之前已经验证：如果 Dashboard 绑定 `127.0.0.1`，通过 `Tailscale Serve` 的 `ts.net` 域名访问时会返回 `Invalid Host header`。
2. 当前这条参数组合已经在真实环境中验证通过，因此 systemd 服务直接沿用这一版，不再重新试错。
3. 虽然服务监听 `0.0.0.0:9119`，但长期访问入口仍然应固定为 `Tailscale Serve`，不要把 `9119` 直接开放给公网。

```bash
cat >/etc/systemd/system/hermes-dashboard.service <<'EOF'
[Unit]
Description=Hermes Web Dashboard
After=network.target hermes-gateway.service tailscaled.service
Wants=hermes-gateway.service tailscaled.service

[Service]
Type=simple
User=agent
WorkingDirectory=/data/apps/hermes/home
Environment=HERMES_HOME=/data/apps/hermes/home
ExecStart=/home/agent/.local/bin/hermes dashboard --tui --host 0.0.0.0 --port 9119 --insecure --no-open
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable --now hermes-dashboard.service
systemctl status hermes-dashboard.service --no-pager
journalctl -u hermes-dashboard -n 80 --no-pager
```

- 补充验证：

```bash
ss -lntp | grep 9119
tailscale serve status
curl -I http://127.0.0.1:9119
```

- 预期结果：Hermes Dashboard 能作为独立服务常驻，后续继续通过 `Tailscale Serve` 暴露给私网设备访问。

- 执行记录（`2026-05-13`）：

1. 已创建 `/etc/systemd/system/hermes-dashboard.service`，并使用当前已验证可用的启动参数：

```text
/home/agent/.local/bin/hermes dashboard --tui --host 0.0.0.0 --port 9119 --insecure --no-open
```

2. 已执行：

```bash
systemctl daemon-reload
systemctl enable --now hermes-dashboard.service
```

3. 当前 `systemctl status hermes-dashboard.service --no-pager` 显示：
   - `Loaded: loaded`
   - `enabled`
   - `Active: active (running)`
4. 当前进程实际以 `agent` 用户环境中的 Hermes Python 运行：

```text
/data/apps/hermes/home/hermes-agent/venv/bin/python3 /home/agent/.local/bin/hermes dashboard ...
```

5. 当前 `ss -lntp | grep 9119` 显示：

```text
LISTEN 0 2048 0.0.0.0:9119 0.0.0.0:* users:(("hermes",pid=19467,fd=14))
```

6. 当前 `tailscale serve status` 仍然正常指向：

```text
https://ldclouda31488.tail48d087.ts.net (tailnet only)
|-- / proxy http://127.0.0.1:9119
```

7. 当前 `curl -I http://127.0.0.1:9119` 返回：

```text
HTTP/1.1 405 Method Not Allowed
allow: GET
server: uvicorn
```

8. 这不是异常。原因是 `curl -I` 发送的是 `HEAD` 请求，而当前 Dashboard 入口只允许 `GET`；从返回头部可确认：
   - `uvicorn` 已正常响应
   - 本机 `9119` 端口服务是活的

- 当前状态：`已完成，Hermes Dashboard 已作为 systemd 服务常驻并继续通过 Tailscale Serve 对外提供访问`

### 步骤 7：配置 Feishu 作为 Hermes 的日常消息入口

- 实施说明：这一层是纯 Hermes 架构下的移动消息入口。你未来可以把 Dashboard 当控制台，把 Feishu 当手机日常入口。Hermes 当前对 Feishu 的推荐方式是 `WebSocket` 长连接模式，不要求公网 webhook。

- 飞书侧准备：

1. 在飞书开放平台创建应用。
2. 开启 `Bot` 能力。
3. 打开事件订阅。
4. 选择：
   - `Use long connection to receive events (WebSocket)`
5. 添加 Hermes 文档要求的权限与事件：
   - 至少包含 `im.message.receive_v1`
6. 记录：
   - `App ID`
   - `App Secret`

- Hermes 侧配置示例：

```bash
export HERMES_HOME=/data/apps/hermes/home

# 先备份 .env
cp /data/apps/hermes/home/.env /data/apps/hermes/home/.env.bak.$(date +%F-%H%M%S)

# 编辑 .env，加入飞书配置
cat >> /data/apps/hermes/home/.env <<'EOF'

# Feishu
FEISHU_APP_ID=<your-feishu-app-id>
FEISHU_APP_SECRET=<your-feishu-app-secret>
FEISHU_ENABLED=true
FEISHU_CONNECTION_MODE=websocket
EOF
```

- 如果官方当前版本要求将渠道配置写入 `config.yaml`，则按实际文档结构补入 `messaging` 或 `channels.feishu` 段，关键原则保持：

1. 开启 `Feishu`
2. 使用 `websocket` 模式
3. 先只开私聊
4. 后续再按需加群聊、allowlist、home chat

- 配置后重启 Gateway：

```bash
systemctl restart hermes-gateway.service
systemctl status hermes-gateway.service --no-pager
journalctl -u hermes-gateway -n 120 --no-pager
```

- 预期结果：你可以在飞书里私聊 Hermes，下发任务、收到执行反馈，并逐步配置主动通知。

- 当前状态：`待执行`

### 步骤 8：给 Feishu 补用户限制与主动通知配置

- 实施说明：当前 `Hermes Gateway` 日志已经明确提示：

```text
No user allowlists configured. All unauthorized users will be denied.
```

这说明后续正式启用飞书前，必须把用户限制补齐，避免错误地开放消息入口。

- 建议先做这两项：

1. 配置允许访问的飞书用户或测试群
2. 配置 `home chat`，让 Hermes 能主动把 cron 结果、后台任务结果发回来

- 验证方向：

```text
1. 我在飞书里给 Hermes 发一条测试消息
2. Hermes 正常回复
3. 我让 Hermes 执行一个后台或延迟任务
4. 任务完成后，Hermes 主动把结果回到飞书
```

- 当前状态：`待执行`

### 步骤 9：收尾后再决定是否彻底移除 OpenClaw

- 实施说明：这一轮先把 OpenClaw 停掉并冻结，不急着删除。等纯 Hermes 的 Dashboard 与 Feishu 都跑稳后，再决定是否彻底清理 Docker、OpenClaw 源码、镜像和工作区。

- 建议保留到下一轮再做的内容：

1. 是否删除 `/data/apps/openclaw`
2. 是否删除 `/home/agent/.openclaw`
3. 是否卸载 Docker 或仅停用
4. 是否保留 OpenClaw 镜像与 compose 文件作为历史样本

- 建议的最终判断标准：

1. Hermes Dashboard 已可远程访问
2. Feishu 已可双向聊天
3. Hermes 已能稳定操作 `notes` 仓库
4. 至少完成一次“飞书下发任务 -> Hermes 修改文档 -> 回消息”的闭环

- 当前状态：`待执行`

### 风险与注意事项

1. 当前 `Hermes API Server` 仍监听在 `0.0.0.0:8642`，如果后续不再需要 OpenAI API 被其它机器访问，建议考虑收回到 `127.0.0.1` 或配合安全组/反向代理收口。
2. `Hermes Dashboard` 官方本身不适合直接裸露公网，必须依赖私网或额外认证层。
3. 当前日志显示没有配置 allowlist，接入 Feishu 前必须先补用户限制策略。
4. 当前服务器内存使用率偏高，后续同时跑 Gateway、Dashboard、浏览器工具时，要留意资源波动。

### 当前结论

- 当前架构已正式从 `OpenClaw + Hermes` 收敛为 `纯 Hermes`
- `OpenClaw` 当前只保留状态留档，不再作为主入口
- 下一步优先顺序：
  1. 停掉 OpenClaw 与 Docker
  2. 跑通 Hermes Dashboard/TUI
  3. 配置 Feishu
  4. 完成纯 Hermes 消息闭环验证

### 参考资料

- [Hermes 安装文档](https://hermes-agent.nousresearch.com/docs/getting-started/installation)
- [Hermes Messaging Gateway 文档](https://hermes-agent.nousresearch.com/docs/user-guide/messaging)
- [Hermes Feishu 文档](https://hermes-agent.nousresearch.com/docs/user-guide/messaging/feishu)
- [Hermes Web Dashboard 文档](https://hermes-agent.nousresearch.com/docs/user-guide/features/web-dashboard)
- [Hermes API Server 文档](https://hermes-agent.nousresearch.com/docs/user-guide/features/api-server)
