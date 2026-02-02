---
prev:
  text: git 日常使用
  link: /tools/git
next:
  text: javascript 笔记
  link: /fe_lang/javascript
---

## Linux 命令整理

### scp 命令

#### Linux scp 命令用于 Linux 之间复制文件和目录。

scp 是 secure copy 的缩写, scp 是 linux 系统下基于 ssh 登陆进行安全的远程文件拷贝命令。
scp 是加密的，rcp 是不加密的，scp 是 rcp 的加强版。

#### 语法

```bash
#完整功能
scp [-1246BCpqrv] [-c cipher] [-F ssh_config] [-i identity_file] [-l limit] [-o ssh_option] [-P port] [-S program] [[user@]host1:]file1 [...] [[user@]host2:]file2

# -1： 强制scp命令使用协议ssh1
# -2： 强制scp命令使用协议ssh2
# -4： 强制scp命令只使用IPv4寻址
# -6： 强制scp命令只使用IPv6寻址
# -B： 使用批处理模式（传输过程中不询问传输口令或短语）
# -C： 允许压缩。（将-C标志传递给ssh，从而打开压缩功能）
# -p：保留原文件的修改时间，访问时间和访问权限。
# -q： 不显示传输进度条。
# -r： 递归复制整个目录。
# -v：详细方式显示输出。scp和ssh(1)会显示出整个过程的调试信息。这些信息用于调试连接，验证和配置问题。
# -c cipher： 以cipher将数据传输进行加密，这个选项将直接传递给ssh。
# -F ssh_config： 指定一个替代的ssh配置文件，此参数直接传递给ssh。
# -i identity_file： 从指定文件中读取传输时使用的密钥文件，此参数直接传递给ssh。
# -l limit： 限定用户所能使用的带宽，以Kbit/s为单位。
# -o ssh_option： 如果习惯于使用ssh_config(5)中的参数传递方式，
# -P port：注意是大写的P, port是指定数据传输用到的端口号
# -S program： 指定加密传输时所使用的程序。此程序必须能够理解ssh(1)的选项。

# 简易
scp [可选参数] file_source file_target

# 举例
scp -r ./* develop@www.dalitek.online:/opt/project/dalitek_hr/app/public/
```

### ssh 远程登陆

```bash
ssh -p port useraccount@remote_address
```

### nginx 操作

```bash

sudo systemctl start nginx # 启动ng

sudo systemctl reload nginx #重新加载

sudo systemctl stop nginx #停止ng
```

### nano 操作

```bash
nano file_name.file
```

### 文件移动

mv 命令不仅可以用于重命名文件或目录，还可以用于移动它们。使用 mv 命令重命名的基本语法非常简单.

```bash
mv 原文件名 新文件名
mv myFile newName
```

### rm -rf

rm -rf 是一个强大的 Linux 命令，用于递归删除目录及其内容，并且不会提示确认。这个命令非常危险，因为它会删除指定目录及其所有子目录和文件，且无法恢复。

```bash
rm -rf /path/to/directory #此命令将删除 /path/to/directory 及其所有内容。
```

### unzip

```bash
#1. 解压到当前目录
unzip archive.zip

# 2. 解压到指定目录
unzip archive.zip -d /path/to/directory

#3. 查看 .zip 文件内容
unzip -l archive.zip

#4. 测试 .zip 文件完整性
unzip -t archive.zip

#5. 解压时覆盖已存在文件
unzip -o archive.zip

#6. 解压时不覆盖已存在文件
unzip -n archive.zip

#7. 解压带密码的 .zip 文件
unzip -P 密码 archive.zip

# 8. 排除特定文件解压
unzip archive.zip -x "*.log"

```

## 实例：闲置 ecs 部署代理转发 agent

### 操作步骤

这份文档是为您量身定制的**低配 ECS 搭建 AI 助手与 Coding Agent 实战计划**。

该方案采用了 **API 转发模式**，将繁重的计算压力转移至外部大模型服务商（如 DeepSeek），您的 ECS 仅作为轻量级的管理和界面展示平台，**1 核 1G 或 2 核 2G 即可流畅运行**。

---

# 🚀 实战计划：基于低配 ECS 的私有 AI 助手与编程 Agent

**目标**：利用闲置 ECS 搭建带图形界面的 AI 对话助手，并配置 VS Code 编程助手。
**核心架构**：

- **服务端 (ECS)**：Docker + Open WebUI (界面 & 知识库管理) -> 连接外部 API。
- **客户端 (本地)**：VS Code + Continue 插件 -> 连接外部 API。
- **计算端**：外部商业大模型 API (DeepSeek/阿里通义/Moonshot)。

---

## 📅 第一阶段：准备工作

### 1.1 硬件与系统检查

- **ECS 配置**：确认已安装 Linux 系统（推荐 Ubuntu 20.04/22.04 LTS 或 Debian 11/12）。
- **网络**：需拥有公网 IP。
- **SSH 工具**：本地终端或 Putty/Xshell 可连接服务器。

### 1.2 获取“大脑” (API Key)

这是整个系统的核心智力来源。推荐 **DeepSeek**（代码能力强，价格极低）。

- **注册**：访问 [DeepSeek 开放平台](https://platform.deepseek.com/)。
- **申请**：创建 API Key（以 `sk-` 开头）。
- **记录**：
  - **API Key**: `sk-xxxxxxxxxxxxxxxx`
  - **Base URL**: `https://api.deepseek.com` (注意不要带 `/v1`，Open WebUI 通常会自动处理，或者根据提示调整)

---

## 🛠 第二阶段：ECS 服务端部署 (Open WebUI)

### 2.1 基础环境配置 (Docker)

SSH 登录 ECS，按顺序执行以下命令：

```bash
# 1. 更新系统软件包
sudo apt update && sudo apt upgrade -y

# 2. 增加虚拟内存 (SWAP) - 【关键步骤】
# 低配机器必须加 Swap，防止内存突发占用导致死机
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# 3. 安装 Docker 环境
curl -fsSL https://get.docker.com | bash

# 4. 设置 Docker 开机自启
sudo systemctl enable --now docker
```

### 2.2 部署 Open WebUI

运行轻量级 Web 界面容器：

```bash
# 启动容器
# -v open-webui: 数据持久化，防止重启丢失聊天记录
# -p 3000:8080: 端口映射
docker run -d \
  -p 3000:8080 \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:main
```

### 2.3 网络放行

前往云服务商（阿里云/腾讯云/华为云）的 **控制台 -> 安全组/防火墙**：

- **添加规则**：协议 TCP，端口 `3000`，授权对象 `0.0.0.0/0`。

---

## ⚙️ 第三阶段：配置“大脑”连接

### 3.1 初始化管理员

1.  浏览器访问 `http://<你的ECS公网IP>:3000`。
2.  点击 **Sign Up**，注册第一个账号（系统自动赋予管理员权限）。

### 3.2 绑定外部 API

1.  进入 **Settings (设置)** -> **Connections (连接)**。
2.  找到 **OpenAI API** 部分（国内模型大多兼容 OpenAI 协议）。
3.  填写信息：
    - **Base URL**: `https://api.deepseek.com/v1` (注：DeepSeek 官方建议加上 v1)
    - **API Key**: 粘贴你的 `sk-xxxx` 密钥。
4.  点击右侧刷新/保存按钮，系统会显示 "Verified"。
5.  在 **Settings -> Models** 中，确保 `deepseek-chat` 或 `deepseek-coder` 已被拉取。

### 3.3 【重要】低配机 RAG 优化 (防止爆内存)

Open WebUI 默认会在本地运行一个嵌入模型用于文档分析，这会占用约 500MB-1G 内存。

- **操作**：进入 **Settings -> Models -> Embedding Models**。
- **修改**：将引擎从 `Default (SentenceTransformers)` 改为 **OpenAI** (或者直接关闭)。
- **填入**：如果 DeepSeek 不支持 Embedding，可申请 **SiliconFlow (硅基流动)** 的免费 Embedding API 填入此处，或者直接留空暂时停用文档分析功能，以保稳定。

---

## 💻 第四阶段：配置本地 Coding Agent (VS Code)

为了降低延迟，代码助手建议**直连 API**，而不经过 ECS 转发。

### 4.1 安装插件

- 打开 VS Code -> 扩展市场 -> 搜索并安装 **Continue**。

### 4.2 配置文件修改

1.  点击 VS Code 左侧 Continue 图标。
2.  点击底部齿轮 ⚙️ 打开 `config.json`。
3.  覆盖或修改 `models` 配置段：

```json
{
  "models": [
    {
      "title": "DeepSeek Coder",
      "provider": "openai",
      "model": "deepseek-coder",
      "apiKey": "你的_sk_密钥",
      "apiBase": "https://api.deepseek.com/v1",
      "contextLength": 8192
    }
  ],
  "tabAutocompleteModel": {
    "title": "DeepSeek Autocomplete",
    "provider": "deepseek",
    "model": "deepseek-coder",
    "apiKey": "你的_sk_密钥",
    "apiBase": "https://api.deepseek.com/v1"
  },
  "allowAnonymousTelemetry": false
}
```

---

## 🛡 第五阶段：安全与收尾 (可选但推荐)

直接暴露 3000 端口既不美观也不安全。

### 5.1 安装 Nginx 反向代理

```bash
sudo apt install nginx -y
```

### 5.2 配置端口转发 (让 80 端口指向 3000)

编辑配置文件：`sudo nano /etc/nginx/sites-available/default`
修改 `location /` 部分：

```nginx
server {
    listen 80;
    server_name _;  # 或者填你的域名

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

重启 Nginx：`sudo systemctl restart nginx`
_现在你可以直接访问 `http://<IP地址>` 而不需要输 `:3000` 了。_

---

## ✅ 最终核对清单 (Checklist)

1.  [ ] ECS 上 `docker ps` 显示 `open-webui` 状态为 Up。
2.  [ ] 浏览器能打开 WebUI，且能与 DeepSeek 对话。
3.  [ ] ECS 内存占用正常 (使用 `htop` 查看，通常应在 500MB-800MB 左右)。
4.  [ ] 本地 VS Code 按 `Ctrl+L` 能唤起助手，按 `Tab` 能自动补全代码。

**祝你的 AI 助手搭建顺利！**

## 实际操作步骤

### 1.ecs 重装

1. 重装后尝试 ssh 登录连接时报错

```

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the ED25519 key sent by the remote host is
SHA256:+ztsGptILcvB91XaHbcU9YGeyviAY0+QeArWZd1Kd2U.
Please contact your system administrator.
Add correct host key in C:\\Users\\jiupi/.ssh/known_hosts to get rid of this message.
Offending ECDSA key in C:\\Users\\jiupi/.ssh/known_hosts:6
Host key for 101.126.135.123 has changed and you have requested strict checking.
Host key verification failed.

```

- 报错原因：是 ssh 第一登录一台机器时会自动存储服务器指纹 Host Key，重装过后 IP 没变，但是服务器生成了新的指纹，所以报错。

- 解决办法：

```
ssh-keygen -R 101.126.135.123
```

- -R 意思是 Remove（移除），表示自动找到你的 known_hosts 文件并删除该 IP 对应的旧记录

2. 创建 deepseek API Key
