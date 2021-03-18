#!/usr/bin/env sh

# 发生错误时停止
set -e

git init
git add -A

if [ -n "$1" ]; then
  git commit -m "[feat] $1"
else
  git commit -m "[feat] update blog"
fi

git config --local user.name "向前Hell"
git config --local user.email "542168513@qq.com"

export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890

# 如果部署到 https://{USERNAME}.github.io
git push origin master

# 如果部署到 https://{USERNAME}.github.io/{REPO}
#git push -f git@github.com:maxlxq/maxlxq.github.io.git master
