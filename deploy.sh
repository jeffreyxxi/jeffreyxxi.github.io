#!/usr/bin/env sh

# 遇到错误时立即退出
set -e

# 构建静态文件（使用 pnpm）
pnpm build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名，在这里写入你的域名，例如：
# echo 'www.example.com' > CNAME

# 初始化一个临时的 Git 仓库并提交当前构建产物
git init
git checkout -b master
git add -A
git commit -m "deploy"

# 推送到 GitHub Pages 对应的仓库和分支
# 当前配置：仓库 jeffreyxxi/jeffreyxxi.git 的 master 分支
git push -f git@github.com:jeffreyxxi/jeffreyxxi.git master

# 返回原始目录
cd - >/dev/null 2>&1