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

- 信息更新时间：`2026-04-30`
- 本页只保留真实实践计划与执行记录，不再单独展开“当前目标”“选型判断”“阶段路线”之类的说明性内容
- 从第二个二级标题开始，每一个二级标题都代表一个独立实践计划，内部统一按“实施步骤 + 执行记录”维护
- 后续如果开始新的实践，只需要继续在本文后面新增新的二级标题即可
- 本页第一条实践计划先记录“OpenClaw Docker + 宿主机仓库 + Hermes API 的推荐架构”

## 实践计划一：OpenClaw Docker + 宿主机仓库 + Hermes API 的推荐架构

### 计划目标

- 在 `Ubuntu 22.04.5 LTS` 服务器上把 `OpenClaw`、宿主机笔记仓库和 `Hermes API` 串成一条可长期维护的链路
- `OpenClaw` 只负责消息入口、会话管理和任务转发，不承担复杂文档改写主流程
- 笔记项目仓库保留在宿主机，由 `Hermes` 直接操作，避免把核心项目长期塞进容器内部
- 第一版优先跑通“消息进入 -> OpenClaw 转发 -> Hermes 改仓库 -> 构建 VuePress”的最小闭环

### 架构约定

- `OpenClaw`：跑在 `Docker` 容器里，负责 Telegram 等消息入口
- `Hermes`：跑在宿主机，开启 `OpenAI-compatible API Server`
- `notes` 仓库：放在宿主机固定目录 `/data/repos/notes`
- 胶水层：在 `OpenClaw` 工作区里放一个本地脚本，收到任务后调用 `Hermes API`
- 账号策略：`root` 只负责初始化安装，后续长期运行统一使用普通用户 `agent`
- 工具链策略：`Node.js` 和 `pnpm` 统一通过 `Volta` 安装和管理
- 默认原则：简单 Markdown 小改动可由 `OpenClaw` 直接处理；涉及检索、总结、批量改写、构建发布的任务优先交给 `Hermes`

### 实施步骤与执行记录

#### 步骤 1：检查服务器状态并安装必要服务

- 实施说明：这台机器目前是裸机状态，所以第一步不直接定目录，而是先确认现状、补齐基础服务、创建长期运行用户，再根据磁盘布局固定目录。当前已确认信息如下：

```text
系统：Ubuntu 22.04.5 LTS
架构：x86_64
当前登录用户：root
系统盘：/dev/sda2，39G，总体可用约 27G
数据盘：/dev/sdb，40G，ext4，挂载到 /data，可用约 38G
内存：3.7 GiB
Swap：3.8 GiB
已有工具：git、curl、sudo
缺失工具：Docker、Node.js、pnpm
当前监听端口：22、53
```

- 方案判断：

```text
1. 后续业务数据优先落到 /data，而不是系统盘
2. root 只做初始化，后续改用 agent 用户
3. Docker 用官方 APT 仓库安装
4. Node.js 和 pnpm 用 Volta 管理
5. 这台机器内存偏紧，第一版先避免并行跑太多重任务
```

- 建议命令：

```bash
# 更新软件包索引，先让 apt 知道最新可安装的软件列表
apt-get update

# 安装基础依赖：
# ca-certificates：HTTPS 证书
# curl：下载脚本和文件
# gnupg：导入软件仓库签名
# lsb-release：识别系统版本
# git：拉代码
# unzip/jq/build-essential：后面常用到的辅助工具
apt-get install -y ca-certificates curl gnupg lsb-release git unzip jq build-essential

# 如果 agent 用户还不存在，就创建一个普通用户
if ! id -u agent >/dev/null 2>&1; then
  adduser --disabled-password --gecos "" agent
fi

# 把 agent 加入 sudo 组，后面需要它具备管理员能力
usermod -aG sudo agent

# 准备 agent 用户的 SSH 目录
mkdir -p /home/agent/.ssh

# 如果 root 里已经有可用公钥，就复制给 agent，方便后面直接用 agent 登录
if [ -f /root/.ssh/authorized_keys ]; then
  cp /root/.ssh/authorized_keys /home/agent/.ssh/authorized_keys
fi

# 修正 agent 用户家目录下 SSH 文件的权限
chown -R agent:agent /home/agent/.ssh
chmod 700 /home/agent/.ssh
chmod 600 /home/agent/.ssh/authorized_keys 2>/dev/null || true

# 创建 Docker 官方仓库密钥目录
install -m 0755 -d /etc/apt/keyrings

# 下载 Docker 官方仓库的 GPG 密钥
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc

# 让所有用户都可以读取这个密钥文件
chmod a+r /etc/apt/keyrings/docker.asc

# 写入 Docker 官方 APT 仓库地址
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" > /etc/apt/sources.list.d/docker.list

# 重新刷新索引，让 apt 识别新加的 Docker 仓库
apt-get update

# 安装 Docker Engine、CLI、containerd、buildx 和 compose 插件
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 让 Docker 开机自启，并立即启动
systemctl enable --now docker

# 允许 agent 用户直接使用 docker 命令
usermod -aG docker agent

# 切换到 agent 用户，后续把 Node.js 工具链装到这个用户环境里
su - agent

# 安装 Volta，用它统一管理 Node.js 和 pnpm
curl https://get.volta.sh | bash

# 开启 Volta 对 pnpm 的支持
echo 'export VOLTA_FEATURE_PNPM=1' >> ~/.bashrc

# 固定 Hermes 的数据目录，避免默认落到用户家目录里
echo 'export HERMES_HOME=/data/apps/hermes/home' >> ~/.bashrc

# 重新加载 agent 的 shell 配置
source ~/.bashrc

# 安装 Node.js LTS 版本
volta install node@lts

# 安装 pnpm
volta install pnpm

# 验证 Node.js、pnpm、Docker 是否都已经可用
node -v
pnpm -v
docker --version
docker compose version
```

- 补充说明：

```text
1. Volta 官方当前对 pnpm 的支持需要开启 VOLTA_FEATURE_PNPM=1
2. agent 加入 docker 组后，重新登录一次 shell 再测试 docker 命令最稳
3. 如果后面准备直接用 agent 通过 SSH 登录，建议在这一步顺手验证 agent 用户能否正常登录
4. 如果服务器访问 download.docker.com 不稳定，可以保留官方安装思路，但把仓库地址切到阿里云 Docker CE 镜像源
```

- 如果 Docker 官方源访问失败，可改用阿里云镜像源：

```bash
# 先确认一下是不是官方 Docker 源连不上
curl -I https://download.docker.com/linux/ubuntu/gpg

# 如果上面仍然报错，再创建 APT keyrings 目录
install -m 0755 -d /etc/apt/keyrings

# 从阿里云 Docker CE 镜像源下载 GPG 密钥
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg -o /etc/apt/keyrings/docker-aliyun.asc

# 让系统可以读取这个密钥文件
chmod a+r /etc/apt/keyrings/docker-aliyun.asc

# 把 Docker 的软件源切换成阿里云镜像源
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker-aliyun.asc] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" > /etc/apt/sources.list.d/docker.list

# 更新软件包索引
apt-get update

# 安装 Docker Engine、CLI、containerd、buildx 和 compose 插件
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 让 Docker 开机自启，并立即启动
systemctl enable --now docker

# 把 agent 加入 docker 组，后面就可以用普通用户执行 docker 命令
usermod -aG docker agent

# 检查 Docker 和 Docker Compose 是否安装成功
docker --version
docker compose version
```

- 推荐固定目录：

```text
/data/apps/openclaw     -> OpenClaw Docker 部署目录
/data/apps/hermes       -> Hermes 运行目录
/data/repos/notes       -> 当前 VuePress 笔记仓库
/data/backups           -> 备份目录
```

- 固定目录命令：

```bash
# 创建 OpenClaw、Hermes、代码仓库和备份目录
mkdir -p /data/apps/openclaw
mkdir -p /data/apps/hermes
mkdir -p /data/repos
mkdir -p /data/backups

# 把这些目录的所有权交给 agent，后续都由 agent 维护
chown -R agent:agent /data/apps /data/repos /data/backups
```

- 预期结果：基础依赖已安装，`agent` 用户可用，`Docker` 可用，`Volta + Node.js + pnpm` 可用，后续统一以 `/data` 作为主要落盘目录。
- 执行记录：
- 执行时间：`2026-04-29`
- 实际命令：

```bash
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
```

- 实际结果：

```text
curl: (35) OpenSSL SSL_connect: Connection reset by peer in connection to download.docker.com:443
chmod: cannot access '/etc/apt/keyrings/docker.asc': No such file or directory
```

- 遇到的问题：服务器在访问 `https://download.docker.com` 时连接被重置，导致 GPG 密钥文件没有成功下载，后续 `chmod` 也随之失败。
- 处理结果：保留当前步骤不变，但将 Docker 安装方案切换为“阿里云 Docker CE 镜像源”备用路径，继续按上面的备用命令执行。
- 当前状态：`待执行`

#### 步骤 1 补充：使用本地 Mac 为服务器提供临时代理

- 适用场景：服务器访问 `GitHub`、`download.docker.com`、`get.volta.sh` 或其他海外资源较慢、超时、连接被重置，但本地 `Mac` 已经通过 `Clash Verge` 拥有可用代理。
- 核心思路：不急着在服务器上永久安装代理软件，而是先通过 `SSH` 反向隧道，把你本地 `Mac` 的代理端口临时映射到服务器，让服务器先借用本地网络能力完成安装任务。
- 为什么这样做：

```text
1. 对服务器侵入小，不需要先装 clash / mihomo / sing-box
2. 随用随开，装完依赖就可以关闭
3. 出问题时更容易回退，不会影响服务器全局网络
```

- 前置条件：

```text
1. Mac 本地已启动 Clash Verge
2. 确认 Clash 的 HTTP 或 mixed 代理端口，例如 7890
3. agent 用户已经可以通过 SSH 正常登录服务器
```

- 第一步：在 Mac 本地确认 Clash 端口

```bash
# 查看 7890 端口是否正在本机监听
lsof -iTCP:7890 -sTCP:LISTEN

# 如果没有输出，说明 Clash 端口可能不是 7890，需要去 Clash Verge 里确认实际端口
```

- 第二步：在 Mac 本地建立反向隧道

```bash
# 这条命令的含义是：
# 让服务器上的 127.0.0.1:7890 转发到你 Mac 本地的 127.0.0.1:7890
# -N 表示不打开远程 shell，只保持隧道
# -R 表示远程端口转发
ssh -v -o ExitOnForwardFailure=yes -N -R 7890:127.0.0.1:7890 agent@43.228.79.44
```

- 补充说明：

```text
1. 这条命令执行后“看起来卡住”通常是正常现象，说明隧道正在前台保持连接
2. 只要没有报错，一般就表示反向隧道已建立成功
3. 这个终端窗口不要关闭，关闭后代理就会失效
```

- 第三步：在服务器上验证代理是否打通

```bash
# 测试服务器能否通过这个代理访问 GitHub
curl -I --proxy http://127.0.0.1:7890 https://github.com

# 测试服务器能否通过这个代理访问 Volta 安装脚本
curl -I --proxy http://127.0.0.1:7890 https://get.volta.sh
```

- 第四步：在服务器当前 shell 临时启用代理

```bash
# 只对当前 shell 生效，不会永久污染系统环境
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
export HTTP_PROXY=http://127.0.0.1:7890
export HTTPS_PROXY=http://127.0.0.1:7890
```

- 第五步：在代理环境下继续安装

```bash
# 例如重新安装 Volta
curl https://get.volta.sh | bash

# 例如重新尝试访问 Docker 官方源
curl -I https://download.docker.com/linux/ubuntu/gpg
```

- 第六步：安装完成后取消代理

```bash
# 清理当前 shell 里的代理环境变量
unset http_proxy https_proxy HTTP_PROXY HTTPS_PROXY
```

- 额外提醒：

```text
1. 这是“临时借用本地代理”的方案，不是服务器永久代理方案
2. 如果后续这台服务器长期都需要访问海外资源，再考虑单独部署 mihomo / sing-box
3. 如果 Clash 使用的是 SOCKS 端口，就把 http://127.0.0.1:7890 改成 socks5h://127.0.0.1:7890
4. 如果 ssh -N -R 没有报错但代理仍不可用，优先检查 Mac 本地 Clash 端口是否真的是 7890
```

- 本次实践记录：
- 执行时间：`2026-04-30`
- 实际情况：在安装 `Volta` 时，脚本卡在 `Fetching archive for Linux` 阶段，判断为服务器访问海外资源不稳定。
- 处理结果：采用“本地 Mac + Clash Verge + SSH 反向隧道”的方式，为服务器提供临时代理，最终辅助完成 `Volta`、`Node.js`、`pnpm`、`Docker` 的安装。
- 当前状态：`已验证可用`

#### 步骤 2：先完成服务器 Git 配置，再把笔记仓库放到宿主机

- 实施说明：你现在已经在服务器上创建好了各个目录，下一步不要急着直接 `git clone`，而是先把 `agent` 用户的 `Git` 身份、认证方式和拉代码目录整理好。这样后面无论是手动更新，还是让 `Hermes` 自动改仓库，都会更稳。
- 推荐做法：优先使用 `SSH` 方式拉取 `GitHub` 私有仓库；`HTTPS + PAT` 只作为备用方案。

##### 2.1 先切换到长期运行用户并检查 Git

```bash
# 切换到长期运行用户，后续 Git、Node、Hermes 都尽量在这个用户下操作
su - agent

# 确认当前用户确实已经切成 agent
whoami

# 查看 Git 是否已安装
git --version

# 顺手确认家目录是否正常
echo "$HOME"
pwd
```

- 预期结果：当前用户是 `agent`，并且 `git --version` 能正常输出版本号。

##### 2.2 配置 Git 的基础身份信息

```bash
# 配置提交时显示的用户名
git config --global user.name "你的 GitHub 用户名或常用名称"

# 配置提交时显示的邮箱
git config --global user.email "你的 GitHub 邮箱"

# 建议把默认分支名设成 main，和大多数远端仓库保持一致
git config --global init.defaultBranch main

# 建议让 pull 默认走 merge，避免新手阶段因为 rebase 产生额外理解成本
git config --global pull.rebase false

# 启用彩色输出，日志和 diff 更好看一点
git config --global color.ui auto

# 查看当前全局配置是否生效
git config --global --list
```

- 补充说明：

```text
1. user.name 和 user.email 主要影响你以后在服务器上提交代码时显示的身份
2. 如果这台服务器后续只负责拉代码和构建，不常直接提交，前两项依然建议配置，避免后面临时提交时报错
3. pull.rebase 没有绝对标准，这里先用 false，后续如果你自己更偏好 rebase 再改也可以
```

##### 2.3 推荐方案：用 SSH 配置 GitHub 拉代码

- 为什么优先推荐 SSH：

```text
1. 不需要每次输入账号密码
2. 私有仓库长期维护更方便
3. 比把 PAT 直接存服务器里更稳妥
```

- 第一步：检查服务器上是否已经有可复用的 SSH 密钥

```bash
# 查看 agent 用户自己的 SSH 目录
ls -al ~/.ssh
```

- 如果你看到类似 `id_ed25519` 和 `id_ed25519.pub` 的文件，并且就是准备用来连 GitHub 的那一套，可以直接跳到后面的“测试 GitHub SSH 连接”。
- 如果还没有，就创建一套新的 SSH 密钥：

```bash
# 生成一套给 GitHub 使用的 SSH 密钥
# -t ed25519：当前优先推荐的算法
# -C：给这把密钥加一个备注，通常写 GitHub 邮箱
ssh-keygen -t ed25519 -C "你的 GitHub 邮箱"
```

- 执行时建议：

```text
1. 直接回车，默认保存到 /home/agent/.ssh/id_ed25519
2. passphrase 可以设置，也可以先留空
3. 如果你后续打算让服务器长期自动拉代码，留空会省掉解锁步骤，但安全性略低
```

- 第二步：读取公钥，并添加到 GitHub

```bash
# 输出公钥内容，复制整行
cat ~/.ssh/id_ed25519.pub
```

- 在 `GitHub` 网页端操作：

```text
1. 打开 GitHub
2. 进入 Settings
3. 进入 SSH and GPG keys
4. 点击 New SSH key
5. Title 可以写：notes-server-agent
6. 把刚才 cat 出来的整行公钥粘进去
7. 保存
```

- 第三步：让服务器首次信任 GitHub 主机指纹

```bash
# 把 github.com 的主机指纹写入 known_hosts，避免首次连接时交互确认
ssh-keyscan github.com >> ~/.ssh/known_hosts

# 修正权限
chmod 700 ~/.ssh
chmod 600 ~/.ssh/known_hosts
chmod 600 ~/.ssh/id_ed25519 2>/dev/null || true
chmod 644 ~/.ssh/id_ed25519.pub 2>/dev/null || true
```

- 第四步：测试 SSH 连接是否成功

```bash
# 测试 GitHub SSH 登录
ssh -T git@github.com
```

- 预期输出特征：

```text
如果配置成功，通常会看到：
Hi <your-github-name>! You've successfully authenticated, but GitHub does not provide shell access.
```

- 如果出现以下问题，可优先这样判断：

```text
1. Permission denied (publickey)：大概率是公钥还没加到 GitHub，或者加错账号
2. Host key verification failed：大概率是 known_hosts 没写好
3. Connection timed out：大概率是服务器到 GitHub 网络不通，需要继续走你前面那套临时代理方案
```

##### 2.4 用 SSH 方式把 notes 仓库拉到宿主机

```bash
# 确保仓库父目录存在
mkdir -p /data/repos

# 进入代码仓库目录
cd /data/repos

# 如果 notes 目录还是空目录，先删掉空目录再 clone
rmdir /data/repos/notes 2>/dev/null || true

# 使用 SSH 地址克隆仓库
git clone git@github.com:<你的 GitHub 用户名>/<你的仓库名>.git notes

# 进入仓库目录
cd /data/repos/notes

# 查看当前远端地址
git remote -v

# 查看当前分支
git branch -vv

# 查看最近一次提交，确认代码已经拉下来
git log --oneline -n 3
```

- 如果远端默认分支不是 `main`，可以继续执行：

```bash
# 查看远端所有分支
git branch -r

# 如果需要切到指定分支，例如 master 或 dev
git checkout master
```

- 补充说明：

```text
1. 如果 /data/repos/notes 里已经不是空目录，就不要直接 clone 到当前目录里，先确认里面有没有历史文件
2. 你当前说“已经创建了各个目录”，如果 notes 目录是空目录，上面的 rmdir 就能安全删除；如果删不掉，说明里面已经有文件，需要先 ls 看一下再决定
3. 仓库目录建议最终保持为 /data/repos/notes，和前面文档里的架构约定一致
```

##### 2.5 如果不方便配 SSH，可临时使用 HTTPS + PAT

- 适用场景：你暂时不想配 SSH，或者当前只想尽快拉一次私有仓库代码。
- 不推荐长期这样做，因为 `PAT` 管理起来比 `SSH` 麻烦，也更容易误存到命令历史里。

```bash
# 进入仓库父目录
cd /data/repos

# 如果 notes 目录还是空目录，先删掉
rmdir /data/repos/notes 2>/dev/null || true

# 用 HTTPS 地址克隆
git clone https://github.com/<你的 GitHub 用户名>/<你的仓库名>.git notes
```

- 执行 `git clone` 后：

```text
1. Username 输入你的 GitHub 用户名
2. Password 不再输入 GitHub 登录密码，而是输入 GitHub Personal Access Token
```

- GitHub 上创建 `PAT` 的大致路径：

```text
Settings -> Developer settings -> Personal access tokens -> Tokens (classic) 或 Fine-grained tokens
```

- 权限建议：

```text
1. 只拉私有仓库代码：至少保证对目标仓库有只读访问权限
2. 如果后续要在服务器上提交并 push，再补写权限
3. 优先使用过期时间较短的 token
```

- 如果你不想每次都重新输入，可以临时缓存凭证：

```bash
# 把 HTTPS 凭证在内存里缓存 8 小时
git config --global credential.helper 'cache --timeout=28800'
```

- 不建议在这台服务器上直接使用下面这种永久明文存储：

```text
git config --global credential.helper store
```

##### 2.6 拉完代码后，先做一次基础检查

```bash
# 进入仓库
cd /data/repos/notes

# 查看工作区状态
git status

# 看一下当前目录结构是否正常
ls

# 重新加载 Volta 环境变量
source ~/.bashrc

# 再次确认 node 和 pnpm 在 agent 环境中能用
node -v
pnpm -v

# 安装项目依赖
pnpm install

# 执行 VuePress 构建，确认这台服务器能独立构建项目
pnpm build
```

- 预期结果：`/data/repos/notes` 已是完整仓库，Git 身份和认证方式已可用，且宿主机可以单独完成 `pnpm build`。

##### 2.7 后续最常用的更新代码命令

```bash
# 切换到 agent 用户
su - agent

# 进入仓库
cd /data/repos/notes

# 看看本地有没有未提交改动
git status

# 拉取远端最新提交
git pull origin main
```

- 如果你平时实际用的是 `master` 或 `dev` 分支，就把最后一行改成对应分支名。
- 如果服务器以后主要只做自动化执行，建议形成固定习惯：每次 `git pull` 前先 `git status`，避免本地临时改动和远端更新打架。
- 执行记录：
- 执行时间：
- 实际命令：
- 实际结果：
- 遇到的问题：
- 处理结果：
- 当前状态：`未执行`

#### 步骤 3：在宿主机安装并启动 Hermes API

- 实施说明：这一层是整个方案的执行核心。`Hermes` 直接跑在宿主机，默认监听 `127.0.0.1:8642`，由它去操作 `/data/repos/notes`，这样改文档、跑构建、执行脚本都不需要绕容器文件系统。因为这台机器已经明确要用 `Volta` 管理 Node，所以这里默认在 `agent` 用户环境下安装 Hermes。
- 建议命令：

```bash
# 切换到 agent 用户，Hermes 后续也由它长期运行
su - agent

# 重新加载 Volta 和 HERMES_HOME 环境变量
source ~/.bashrc

# 先创建 Hermes 的数据目录
mkdir -p "$HERMES_HOME"

# 使用官方安装脚本安装 Hermes
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash

# 执行 Hermes 的初始化配置
hermes setup

# 打开 API Server 能力
hermes config set API_SERVER_ENABLED true

# 设置 API 鉴权密钥，后面 OpenClaw 调用它时要用
hermes config set API_SERVER_KEY <your-hermes-api-key>

# 先前台启动一次，验证 Hermes 网关能否正常跑起来
hermes gateway
```

- 说明：

```text
Hermes API 默认监听：http://127.0.0.1:8642
OpenAI-compatible base URL：http://127.0.0.1:8642/v1
HERMES_HOME 推荐固定为：/data/apps/hermes/home
```

- 生产化建议：

```bash
# 切换到 agent 用户
su - agent

# 重新加载环境变量，确保 PATH 和 HERMES_HOME 都存在
source ~/.bashrc

# 安装 systemd 服务，让 Hermes 可以常驻运行
sudo env "PATH=$PATH" "HERMES_HOME=$HERMES_HOME" hermes gateway install --system

# 启动 systemd 服务
sudo env "PATH=$PATH" "HERMES_HOME=$HERMES_HOME" hermes gateway start --system

# 查看服务状态
sudo env "PATH=$PATH" "HERMES_HOME=$HERMES_HOME" hermes gateway status --system

# 持续观察服务日志
journalctl -u hermes-gateway -f
```

- 预期结果：宿主机上已有可用的 `Hermes API Server`，后续可以通过 HTTP 请求把任务转发给它。
- 执行记录：
- 执行时间：
- 实际命令：
- 实际结果：
- 遇到的问题：
- 处理结果：
- 当前状态：`未执行`

#### 步骤 4：用 Docker 部署 OpenClaw，并给容器保留必要挂载

- 实施说明：这一步不再把 OpenClaw 当作“主要代码执行器”，而是当作消息入口和调度入口。它自己的配置和工作区仍然放在容器挂载目录里，同时按需把宿主机仓库或脚本目录挂进来。
- 建议命令：

```bash
# 切换到 agent 用户，后续 OpenClaw 也由它维护
su - agent

# 进入 OpenClaw 部署目录
cd /data/apps/openclaw

# 克隆 OpenClaw 源码到当前目录
git clone https://github.com/openclaw/openclaw.git .

# 创建 OpenClaw 的配置目录和工作区目录
mkdir -p data/config data/workspace

# 指定要使用的 OpenClaw 镜像版本
export OPENCLAW_IMAGE="ghcr.io/openclaw/openclaw:latest"

# 指定 OpenClaw 配置文件挂载到宿主机的哪个目录
export OPENCLAW_CONFIG_DIR="/data/apps/openclaw/data/config"

# 指定 OpenClaw 工作区挂载到宿主机的哪个目录
export OPENCLAW_WORKSPACE_DIR="/data/apps/openclaw/data/workspace"

# 额外挂载 notes 仓库和 Hermes 目录到容器里，方便 OpenClaw 看到它们
export OPENCLAW_EXTRA_MOUNTS="/data/repos/notes:/home/node/.openclaw/workspace/mounts/notes:rw,/data/apps/hermes:/home/node/.openclaw/workspace/mounts/hermes:rw"

# 执行 OpenClaw 官方 Docker 初始化脚本
./scripts/docker/setup.sh
```

- 补充说明：

```text
/home/node/.openclaw/workspace/mounts/notes   -> 宿主机笔记仓库
/home/node/.openclaw/workspace/mounts/hermes  -> 宿主机 Hermes 目录
```

- 预期结果：`OpenClaw` 容器正常启动，工作区里可看到挂载进来的仓库和脚本目录。
- 执行记录：
- 执行时间：
- 实际命令：
- 实际结果：
- 遇到的问题：
- 处理结果：
- 当前状态：`未执行`

#### 步骤 5：让 OpenClaw 容器能访问宿主机上的 Hermes API

- 实施说明：这是这套架构的关键连接点。`Hermes API` 默认绑定在宿主机 `127.0.0.1:8642`，容器里的 `localhost` 不是宿主机，所以需要给 OpenClaw 容器一个稳定的宿主机访问入口。单机 Linux 场景下，推荐使用 `host.docker.internal` 映射。
- 建议文件：

在 `/data/apps/openclaw` 新建 `docker-compose.override.yml`：

```yaml
services:
  openclaw-gateway:
    # 让网关容器能通过 host.docker.internal 访问宿主机
    extra_hosts:
      - "host.docker.internal:host-gateway"
  openclaw-cli:
    # 让 CLI 容器也能通过同样的名字访问宿主机
    extra_hosts:
      - "host.docker.internal:host-gateway"
```

- 验证命令：

```bash
# 切换到 agent 用户
su - agent

# 进入 OpenClaw 部署目录
cd /data/apps/openclaw

# 按新的 override 配置重启容器
docker compose up -d

# 在容器里请求 Hermes API，确认网络已经打通
docker compose exec openclaw-gateway curl -fsS http://host.docker.internal:8642/v1/models
```

- 预期结果：容器内部能访问 `Hermes API`，后续 OpenClaw 才能通过脚本把任务转发给 Hermes。
- 执行记录：
- 执行时间：
- 实际命令：
- 实际结果：
- 遇到的问题：
- 处理结果：
- 当前状态：`未执行`

#### 步骤 6：在 OpenClaw 工作区里准备一个调用 Hermes API 的脚本

- 实施说明：推荐不要一开始就追求复杂编排，先用一个明确的本地脚本把“OpenClaw 收到任务 -> 调用 Hermes API”打通。后续无论是改成 Skill、命令路由还是定时任务，都有稳定基础。
- 建议脚本路径：

```text
/data/apps/openclaw/data/workspace/scripts/call-hermes.sh
```

- 建议脚本内容：

```bash
#!/usr/bin/env bash
set -euo pipefail

PROMPT="${1:-}"

if [ -z "$PROMPT" ]; then
  echo "missing prompt"
  exit 1
fi

curl -sS http://host.docker.internal:8642/v1/responses \
  -H "Authorization: Bearer ${HERMES_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"model\": \"hermes-agent\",
    \"input\": \"你现在在 /data/repos/notes 仓库中工作。请根据以下任务执行，并在需要时修改 Markdown、运行 pnpm build、汇总结果：${PROMPT}\"
  }"
```

- 建议命令：

```bash
# 创建放脚本的目录
mkdir -p /data/apps/openclaw/data/workspace/scripts

# 给脚本增加可执行权限
chmod +x /data/apps/openclaw/data/workspace/scripts/call-hermes.sh
```

- 预期结果：OpenClaw 侧已经有一个可直接调用的 Hermes 转发脚本。
- 执行记录：
- 执行时间：
- 实际命令：
- 实际结果：
- 遇到的问题：
- 处理结果：
- 当前状态：`未执行`

#### 步骤 7：验证完整链路是否跑通

- 实施说明：这一步不是只验证某个单点，而是验证整条链路。推荐先用最简单的 Markdown 改动做冒烟测试，不要一上来就做复杂抓取。
- 建议测试任务：

```text
请在 /data/repos/notes/docs/ai/practice-plan.md 末尾追加一段“链路测试记录”，然后执行 pnpm build，并返回修改摘要。
```

- 建议命令：

```bash
# 进入 OpenClaw 工作区
cd /data/apps/openclaw/data/workspace

# 调用前面准备好的脚本，把测试任务转发给 Hermes
HERMES_API_KEY=<your-hermes-api-key> ./scripts/call-hermes.sh "请在 /data/repos/notes/docs/ai/practice-plan.md 末尾追加一段“链路测试记录”，然后执行 pnpm build，并返回修改摘要。"

# 回到 notes 仓库，检查 Hermes 是否真的改了文件
cd /data/repos/notes

# 查看具体改动
git diff

# 再手动执行一次构建，确认生成站点没有问题
pnpm build
```

- 预期结果：`Hermes` 能接收任务并修改宿主机仓库，`VuePress` 构建通过，链路从“任务输入”到“文档落库”完整可用。
- 执行记录：
- 执行时间：
- 实际命令：
- 实际结果：
- 遇到的问题：
- 处理结果：
- 当前状态：`未执行`

#### 步骤 8：再接入 Telegram 和后续自动化

- 实施说明：只有在第 7 步闭环稳定之后，才建议把消息入口正式接上。否则你会同时排查 Telegram、OpenClaw、Hermes、仓库构建四层问题，定位会很痛苦。
- 建议命令：

```bash
# 进入 OpenClaw 部署目录
cd /data/apps/openclaw

# 给 OpenClaw 添加 Telegram 频道配置
docker compose run --rm openclaw-cli channels add --channel telegram --token "<your-bot-token>"

# 重启网关，让新频道配置生效
docker compose restart openclaw-gateway

# 查看最近日志，确认 Telegram 初始化是否正常
docker compose logs --tail=200 openclaw-gateway
```

- 后续演进方向：

```text
1. 简单记录类任务：OpenClaw 直接处理
2. 文档整理和构建任务：OpenClaw 调 Hermes API
3. 定时任务：优先交给 Hermes 的 gateway/cron 能力
4. 发布动作：先保守处理，建议仍由宿主机脚本显式执行
```

- 预期结果：消息入口接入完成，并且已经明确哪些任务直接走 OpenClaw，哪些任务转给 Hermes。
- 执行记录：
- 执行时间：
- 实际命令：
- 实际结果：
- 遇到的问题：
- 处理结果：
- 当前状态：`未执行`

#### 步骤 9：整理运维和安全边界

- 实施说明：这套方案的核心风险不是“能不能跑”，而是“长期跑的时候会不会失控”。至少要把权限、日志、凭证和升级入口固定下来。
- 建议动作：

```bash
# 查看 notes 仓库当前是否有未提交改动
cd /data/repos/notes && git status

# 实时查看 OpenClaw 网关日志
cd /data/apps/openclaw && docker compose logs -f openclaw-gateway

# 实时查看 Hermes systemd 日志
journalctl -u hermes-gateway -f

# 用 agent 用户执行 Hermes 更新
su - agent -c 'source ~/.bashrc && hermes update'

# 拉取 OpenClaw 最新镜像并重启容器
cd /data/apps/openclaw && docker compose pull && docker compose up -d

# 备份 OpenClaw 配置和工作区数据
tar -czf /data/backups/openclaw-$(date +%F).tar.gz /data/apps/openclaw/data

# 备份 Hermes 数据目录
tar -czf /data/backups/hermes-$(date +%F).tar.gz /data/apps/hermes/home
```

- 风险提醒：

```text
1. 不建议把 Hermes API 直接绑到 0.0.0.0
2. 不建议一开始就让 OpenClaw 自动 git push
3. 不建议把笔记仓库只放在容器内部
4. 不建议长期继续用 root 作为日常运行用户
```

- 预期结果：形成一套能升级、能回滚、能排查的最小运维动作清单。
- 执行记录：
- 执行时间：
- 实际命令：
- 实际结果：
- 遇到的问题：
- 处理结果：
- 当前状态：`未执行`

### 本计划参考资料

- [Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- [Volta Getting Started](https://docs.volta.sh/guide/getting-started/)
- [OpenClaw Docker 安装文档](https://docs.openclaw.ai/install/docker)
- [OpenClaw Agent Workspace 文档](https://docs.openclaw.ai/concepts/agent-workspace)
- [OpenClaw Telegram 文档](https://docs.openclaw.ai/telegram)
- [OpenClaw GitHub 仓库](https://github.com/openclaw/openclaw)
- [Hermes 安装文档](https://hermes-agent.nousresearch.com/docs/getting-started/installation)
- [Hermes API Server 文档](https://hermes-agent.nousresearch.com/docs/user-guide/features/api-server)
- [Hermes Messaging Gateway 文档](https://hermes-agent.nousresearch.com/docs/user-guide/messaging)
