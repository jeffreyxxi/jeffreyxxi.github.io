---
prev: false
next: /javascript
---

## git 使用笔记

### 设置用户名和邮箱

```
git config --global user.name "jeffreyxxi"
git config --global user.email "1316930758@qq.com"
```

### 创建文件夹/进入文件夹/显示当前文件位置

```
cd E:
mkdir FileFloder_Name       //创建文件夹
cd FileFloder_Name          //进入文件夹
pwd                         //git bash中显示当前位置
```

### 初始化 git 仓库

```
git init
```

### 添加文件到仓库

```
git add git_notes.md
//一次添加多个文件
git add git_notes_1.md git_notes_2.md
```

### 提交文件到仓库

```
git commit -m "create a notes by markdown document"
```

- 注意: 每次修改文件后提交都需要两步 ,先添加, 在提交\*

### 查看仓库当前的状态

```
git status
```

### 比较差异

```
git diff
```

### 查看提交日志

```
git log
git log --pretty=oneline    //显示成一行
git log --graph --pretty=oneline --abbrev-commit  //显示时间线
```

### 回退到某一个版本 / 跳转到某一个版本

```
git reset --hard commitid    // commitid 通过 git log 查看 commitid 建议写全,不过只写前几位git也会自己去寻找匹配
git reset --hard head^       // head^ 回退到上一个版本 一个 ^ 表示一个版本
git reset --hard head^^      // 回退到前两个版本
git reset --hard head~100    //回退到100个版本之前
```

### 查看 git 记录的每一条命令

```
git reflog
```

\*HEAD 指向的版本就是当前版本，因此，Git 允许我们在版本的历史之间穿梭，使用命令 git reset --hard commit_id

穿梭前，用 git log 可以查看提交历史，以便确定要回退到哪个版本。

要重返未来，用 git reflog 查看命令历史，以便确定要回到未来的哪个版本。\*

### 丢弃工作区的修改

```
git checkout -- filename
// 让这个文件回到最新一次add或者commit时的状态
```

_git checkout -- filename 中 , 参数 "--" 是非常重要的, 没有 "--"，就变成了“切换到另一个分支”的命令_

### 删除文件

```
rm filename    //本地删除文件 需要带上格式的后缀名,比如 git_notes.md
git rm filename   //git仓库删除文件  需要带上文件格式的后缀名
git commit -m "subscribe for this action"  //不用添加,直接提交即可
```

### 关联远程仓库

```
git remote add origin git@address.com:username/projectname.git
```

### 推送本地仓库到远程仓库

```
git push origin master
// origin : 仓库名称,就是git remote add origin 中的 origin,例如:
// 关联远程库: git remote add origin_t master
// 推送: git push origin_t master
// 第一次推送时最好加上 -u 参数,将本地master 分支和远程master分支关联起来
// eg: git push -u origin_t master
```

### 拉取远程仓库

```
git push origin_t master
```

### 克隆远程仓库

```
git clone git@address.com:username/projectname.git
```

### 创建分支

```
git branch branchname
// eg. git branch dev

git branch --set-upstream branchname origin/branchname
// 建立本地分支和远程分支的关联
// 这个命令好像提示不支持了

git checkout -b branchname origin/branchname
//在本地创建和远程分支关联的分支
```

### 切换分支

```
git checkout branchname
// eg.git checkout dev
```

### 创建并切换到该创建的分支

```
git checkout -b branchname
//eg. git checkout -b dev
```

### 查看分支

```
git branch
//列出所有的分支,并在当前分支有一个 "*"号
```

### 合并其他分支到当前分支

```
git merge dev
// 这是把dev分支合并到当前分支,比如当前分支是master,就表示把dev分支合并到master分支
```

### 删除分支

```
git branch -d branchname
git branch -D branchname
// 强制删除分支,用于分支还没有合并就要删除的情况,使用 -D 参数会丢失修改

git push --delete origin branchname
// 删除远程分支
```

### 禁用快速模式

通常合并分支是 git 会自动使用快速模式,但是快速模式下删除分支后会丢失分支信息
可以强制禁用快速模式, 合并分支的时候 git 回会生成一个新的 commit,这样,从分至历史上可以看出分支信息

```
git merge --no-off -m "some summary for this action" branchname
// -m "some summary for this action" 就是提交的时候的说明备注
```

### 存储当前工作现场 ,以及查看,恢复,删除存储的工作现场

```
git stash  //存储
git stash list //查看存储的工作现场列表
git stash apply stash@{number} //恢复至某个存储状态,但是恢复后stash内容并不删除
git stash pop stash@{number}  //恢复值某个存储状态,并且删除stash内容
git stash drop stash@{number}  //删除某个存储状态
```

### 查看远程库信息

```
git remote
git remote -v  //查看更详细的信息
```

### 标签

```
git tag tagname  //  添加一个标签,默认添加在最新的commit上面
git tag tagname commitid  // 添加一个标签,但是添加在commitid 上面的
git tag -a tagname -m tagsubscribe commitid  // -a 指定标签名 -m 说明文字
git tag // 查看标签
git show tagname  // 查看标签信息
git tag -d tagname  //本地删除标签
git push origin tagname //推送本地标签到远程
git push origin --tags  //一次性推送所有为推送到远程的标签

git tag -d tagname
git push origin :refs/tags/tagname
//删除远程标签, 先删除本地标签,在推送删除修改
```

### 合并指定提交到某一个分支

eg. 合并 A 分支的 commitid :aaa123 到 B 分支

```
git checkout A    //切换到A分支
git log           //查看log,目的是得到commitId : aaa123
git checkout B    //切换到B分支
git cherry-pick aaa123   //合并A分支的commitid :aaa123到B分支
```

### 合并两个独立启动仓库的历史

eg. 提示: fatal: refusing to merge unrelated histories 的时候,

```
git pull origin master --allow-unrelated-histories
```
