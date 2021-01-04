#!/usr/bin/env sh

# 发生错误时停止
set -e

git init
git add -A
git commit -m 'init'

#git config --local user.name "向前"
#git config --local user.email "542168513@qq.com"

# 如果部署到 https://{USERNAME}.github.io
 git push -f git@github.com:maxlxq/maxlxq.github.io.git master:master

# 如果部署到 https://{USERNAME}.github.io/{REPO}
#git push -f git@github.com:maxlxq/maxlxq.github.io.git master
