<template><div><h2 id="git-使用笔记" tabindex="-1"><a class="header-anchor" href="#git-使用笔记"><span>git 使用笔记</span></a></h2>
<h3 id="设置用户名和邮箱" tabindex="-1"><a class="header-anchor" href="#设置用户名和邮箱"><span>设置用户名和邮箱</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git config --global user.name "jeffreyxxi"</span>
<span class="line">git config --global user.email "1316930758@qq.com"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建文件夹-进入文件夹-显示当前文件位置" tabindex="-1"><a class="header-anchor" href="#创建文件夹-进入文件夹-显示当前文件位置"><span>创建文件夹/进入文件夹/显示当前文件位置</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">cd E:</span>
<span class="line">mkdir FileFloder_Name       //创建文件夹</span>
<span class="line">cd FileFloder_Name          //进入文件夹</span>
<span class="line">pwd                         //git bash中显示当前位置</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="初始化-git-仓库" tabindex="-1"><a class="header-anchor" href="#初始化-git-仓库"><span>初始化 git 仓库</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git init</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="添加文件到仓库" tabindex="-1"><a class="header-anchor" href="#添加文件到仓库"><span>添加文件到仓库</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git add git_notes.md</span>
<span class="line">//一次添加多个文件</span>
<span class="line">git add git_notes_1.md git_notes_2.md</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="提交文件到仓库" tabindex="-1"><a class="header-anchor" href="#提交文件到仓库"><span>提交文件到仓库</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git commit -m "create a notes by markdown document"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li>注意: 每次修改文件后提交都需要两步 ,先添加, 在提交*</li>
</ul>
<h3 id="查看仓库当前的状态" tabindex="-1"><a class="header-anchor" href="#查看仓库当前的状态"><span>查看仓库当前的状态</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git status</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="比较差异" tabindex="-1"><a class="header-anchor" href="#比较差异"><span>比较差异</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git diff</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="查看提交日志" tabindex="-1"><a class="header-anchor" href="#查看提交日志"><span>查看提交日志</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git log</span>
<span class="line">git log --pretty=oneline    //显示成一行</span>
<span class="line">git log --graph --pretty=oneline --abbrev-commit  //显示时间线</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="回退到某一个版本-跳转到某一个版本" tabindex="-1"><a class="header-anchor" href="#回退到某一个版本-跳转到某一个版本"><span>回退到某一个版本 / 跳转到某一个版本</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git reset --hard commitid    // commitid 通过 git log 查看 commitid 建议写全,不过只写前几位git也会自己去寻找匹配</span>
<span class="line">git reset --hard head^       // head^ 回退到上一个版本 一个 ^ 表示一个版本</span>
<span class="line">git reset --hard head^^      // 回退到前两个版本</span>
<span class="line">git reset --hard head~100    //回退到100个版本之前</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看-git-记录的每一条命令" tabindex="-1"><a class="header-anchor" href="#查看-git-记录的每一条命令"><span>查看 git 记录的每一条命令</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git reflog</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>*HEAD 指向的版本就是当前版本，因此，Git 允许我们在版本的历史之间穿梭，使用命令 git reset --hard commit_id</p>
<p>穿梭前，用 git log 可以查看提交历史，以便确定要回退到哪个版本。</p>
<p>要重返未来，用 git reflog 查看命令历史，以便确定要回到未来的哪个版本。*</p>
<h3 id="丢弃工作区的修改" tabindex="-1"><a class="header-anchor" href="#丢弃工作区的修改"><span>丢弃工作区的修改</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git checkout -- filename</span>
<span class="line">// 让这个文件回到最新一次add或者commit时的状态</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p><em>git checkout -- filename 中 , 参数 &quot;--&quot; 是非常重要的, 没有 &quot;--&quot;，就变成了“切换到另一个分支”的命令</em></p>
<h3 id="删除文件" tabindex="-1"><a class="header-anchor" href="#删除文件"><span>删除文件</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">rm filename    //本地删除文件 需要带上格式的后缀名,比如 git_notes.md</span>
<span class="line">git rm filename   //git仓库删除文件  需要带上文件格式的后缀名</span>
<span class="line">git commit -m "subscribe for this action"  //不用添加,直接提交即可</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="关联远程仓库" tabindex="-1"><a class="header-anchor" href="#关联远程仓库"><span>关联远程仓库</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git remote add origin git@address.com:username/projectname.git</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="推送本地仓库到远程仓库" tabindex="-1"><a class="header-anchor" href="#推送本地仓库到远程仓库"><span>推送本地仓库到远程仓库</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git push origin master</span>
<span class="line">// origin : 仓库名称,就是git remote add origin 中的 origin,例如:</span>
<span class="line">// 关联远程库: git remote add origin_t master</span>
<span class="line">// 推送: git push origin_t master</span>
<span class="line">// 第一次推送时最好加上 -u 参数,将本地master 分支和远程master分支关联起来</span>
<span class="line">// eg: git push -u origin_t master</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="拉取远程仓库" tabindex="-1"><a class="header-anchor" href="#拉取远程仓库"><span>拉取远程仓库</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git push origin_t master</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="克隆远程仓库" tabindex="-1"><a class="header-anchor" href="#克隆远程仓库"><span>克隆远程仓库</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git clone git@address.com:username/projectname.git</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="创建分支" tabindex="-1"><a class="header-anchor" href="#创建分支"><span>创建分支</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git branch branchname</span>
<span class="line">// eg. git branch dev</span>
<span class="line"></span>
<span class="line">git branch --set-upstream branchname origin/branchname</span>
<span class="line">// 建立本地分支和远程分支的关联</span>
<span class="line">// 这个命令好像提示不支持了</span>
<span class="line"></span>
<span class="line">git checkout -b branchname origin/branchname</span>
<span class="line">//在本地创建和远程分支关联的分支</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="切换分支" tabindex="-1"><a class="header-anchor" href="#切换分支"><span>切换分支</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git checkout branchname</span>
<span class="line">// eg.git checkout dev</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建并切换到该创建的分支" tabindex="-1"><a class="header-anchor" href="#创建并切换到该创建的分支"><span>创建并切换到该创建的分支</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git checkout -b branchname</span>
<span class="line">//eg. git checkout -b dev</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看分支" tabindex="-1"><a class="header-anchor" href="#查看分支"><span>查看分支</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git branch</span>
<span class="line">//列出所有的分支,并在当前分支有一个 "*"号</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="合并其他分支到当前分支" tabindex="-1"><a class="header-anchor" href="#合并其他分支到当前分支"><span>合并其他分支到当前分支</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git merge dev</span>
<span class="line">// 这是把dev分支合并到当前分支,比如当前分支是master,就表示把dev分支合并到master分支</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除分支" tabindex="-1"><a class="header-anchor" href="#删除分支"><span>删除分支</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git branch -d branchname</span>
<span class="line">git branch -D branchname</span>
<span class="line">// 强制删除分支,用于分支还没有合并就要删除的情况,使用 -D 参数会丢失修改</span>
<span class="line"></span>
<span class="line">git push --delete origin branchname</span>
<span class="line">// 删除远程分支</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="禁用快速模式" tabindex="-1"><a class="header-anchor" href="#禁用快速模式"><span>禁用快速模式</span></a></h3>
<p>通常合并分支是 git 会自动使用快速模式,但是快速模式下删除分支后会丢失分支信息
可以强制禁用快速模式, 合并分支的时候 git 回会生成一个新的 commit,这样,从分至历史上可以看出分支信息</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git merge --no-off -m "some summary for this action" branchname</span>
<span class="line">// -m "some summary for this action" 就是提交的时候的说明备注</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="存储当前工作现场-以及查看-恢复-删除存储的工作现场" tabindex="-1"><a class="header-anchor" href="#存储当前工作现场-以及查看-恢复-删除存储的工作现场"><span>存储当前工作现场 ,以及查看,恢复,删除存储的工作现场</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git stash  //存储</span>
<span class="line">git stash list //查看存储的工作现场列表</span>
<span class="line">git stash apply stash@{number} //恢复至某个存储状态,但是恢复后stash内容并不删除</span>
<span class="line">git stash pop stash@{number}  //恢复值某个存储状态,并且删除stash内容</span>
<span class="line">git stash drop stash@{number}  //删除某个存储状态</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看远程库信息" tabindex="-1"><a class="header-anchor" href="#查看远程库信息"><span>查看远程库信息</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git remote</span>
<span class="line">git remote -v  //查看更详细的信息</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="标签" tabindex="-1"><a class="header-anchor" href="#标签"><span>标签</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git tag tagname  //  添加一个标签,默认添加在最新的commit上面</span>
<span class="line">git tag tagname commitid  // 添加一个标签,但是添加在commitid 上面的</span>
<span class="line">git tag -a tagname -m tagsubscribe commitid  // -a 指定标签名 -m 说明文字</span>
<span class="line">git tag // 查看标签</span>
<span class="line">git show tagname  // 查看标签信息</span>
<span class="line">git tag -d tagname  //本地删除标签</span>
<span class="line">git push origin tagname //推送本地标签到远程</span>
<span class="line">git push origin --tags  //一次性推送所有为推送到远程的标签</span>
<span class="line"></span>
<span class="line">git tag -d tagname</span>
<span class="line">git push origin :refs/tags/tagname</span>
<span class="line">//删除远程标签, 先删除本地标签,在推送删除修改</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="合并指定提交到某一个分支" tabindex="-1"><a class="header-anchor" href="#合并指定提交到某一个分支"><span>合并指定提交到某一个分支</span></a></h3>
<p>eg. 合并 A 分支的 commitid :aaa123 到 B 分支</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git checkout A    //切换到A分支</span>
<span class="line">git log           //查看log,目的是得到commitId : aaa123</span>
<span class="line">git checkout B    //切换到B分支</span>
<span class="line">git cherry-pick aaa123   //合并A分支的commitid :aaa123到B分支</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="合并两个独立启动仓库的历史" tabindex="-1"><a class="header-anchor" href="#合并两个独立启动仓库的历史"><span>合并两个独立启动仓库的历史</span></a></h3>
<p>eg. 提示: fatal: refusing to merge unrelated histories 的时候,</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git pull origin master --allow-unrelated-histories</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div></template>


