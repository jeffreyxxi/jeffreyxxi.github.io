<template><div><h2 id="linux-命令整理" tabindex="-1"><a class="header-anchor" href="#linux-命令整理"><span>Linux 命令整理</span></a></h2>
<h3 id="scp命令" tabindex="-1"><a class="header-anchor" href="#scp命令"><span>scp命令</span></a></h3>
<h4 id="linux-scp-命令用于-linux-之间复制文件和目录。" tabindex="-1"><a class="header-anchor" href="#linux-scp-命令用于-linux-之间复制文件和目录。"><span>Linux scp 命令用于 Linux 之间复制文件和目录。</span></a></h4>
<p>scp 是 secure copy 的缩写, scp 是 linux 系统下基于 ssh 登陆进行安全的远程文件拷贝命令。
scp 是加密的，rcp 是不加密的，scp 是 rcp 的加强版。</p>
<h4 id="语法" tabindex="-1"><a class="header-anchor" href="#语法"><span>语法</span></a></h4>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token comment">#完整功能</span></span>
<span class="line"><span class="token function">scp</span> <span class="token punctuation">[</span>-1246BCpqrv<span class="token punctuation">]</span> <span class="token punctuation">[</span>-c cipher<span class="token punctuation">]</span> <span class="token punctuation">[</span>-F ssh_config<span class="token punctuation">]</span> <span class="token punctuation">[</span>-i identity_file<span class="token punctuation">]</span> <span class="token punctuation">[</span>-l limit<span class="token punctuation">]</span> <span class="token punctuation">[</span>-o ssh_option<span class="token punctuation">]</span> <span class="token punctuation">[</span>-P port<span class="token punctuation">]</span> <span class="token punctuation">[</span>-S program<span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token punctuation">[</span>user@<span class="token punctuation">]</span>host1:<span class="token punctuation">]</span>file1 <span class="token punctuation">[</span><span class="token punctuation">..</span>.<span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token punctuation">[</span>user@<span class="token punctuation">]</span>host2:<span class="token punctuation">]</span>file2</span>
<span class="line"></span>
<span class="line"><span class="token comment"># -1： 强制scp命令使用协议ssh1</span></span>
<span class="line"><span class="token comment"># -2： 强制scp命令使用协议ssh2</span></span>
<span class="line"><span class="token comment"># -4： 强制scp命令只使用IPv4寻址</span></span>
<span class="line"><span class="token comment"># -6： 强制scp命令只使用IPv6寻址</span></span>
<span class="line"><span class="token comment"># -B： 使用批处理模式（传输过程中不询问传输口令或短语）</span></span>
<span class="line"><span class="token comment"># -C： 允许压缩。（将-C标志传递给ssh，从而打开压缩功能）</span></span>
<span class="line"><span class="token comment"># -p：保留原文件的修改时间，访问时间和访问权限。</span></span>
<span class="line"><span class="token comment"># -q： 不显示传输进度条。</span></span>
<span class="line"><span class="token comment"># -r： 递归复制整个目录。</span></span>
<span class="line"><span class="token comment"># -v：详细方式显示输出。scp和ssh(1)会显示出整个过程的调试信息。这些信息用于调试连接，验证和配置问题。</span></span>
<span class="line"><span class="token comment"># -c cipher： 以cipher将数据传输进行加密，这个选项将直接传递给ssh。</span></span>
<span class="line"><span class="token comment"># -F ssh_config： 指定一个替代的ssh配置文件，此参数直接传递给ssh。</span></span>
<span class="line"><span class="token comment"># -i identity_file： 从指定文件中读取传输时使用的密钥文件，此参数直接传递给ssh。</span></span>
<span class="line"><span class="token comment"># -l limit： 限定用户所能使用的带宽，以Kbit/s为单位。</span></span>
<span class="line"><span class="token comment"># -o ssh_option： 如果习惯于使用ssh_config(5)中的参数传递方式，</span></span>
<span class="line"><span class="token comment"># -P port：注意是大写的P, port是指定数据传输用到的端口号</span></span>
<span class="line"><span class="token comment"># -S program： 指定加密传输时所使用的程序。此程序必须能够理解ssh(1)的选项。</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 简易</span></span>
<span class="line"><span class="token function">scp</span> <span class="token punctuation">[</span>可选参数<span class="token punctuation">]</span> file_source file_target </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 举例</span></span>
<span class="line"><span class="token function">scp</span> <span class="token parameter variable">-r</span> ./* develop@www.dalitek.online:/opt/project/dalitek_hr/app/public/</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ssh-远程登陆" tabindex="-1"><a class="header-anchor" href="#ssh-远程登陆"><span>ssh 远程登陆</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token function">ssh</span> <span class="token parameter variable">-p</span> port useraccount@remote_address</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="nginx-操作" tabindex="-1"><a class="header-anchor" href="#nginx-操作"><span>nginx 操作</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"></span>
<span class="line"><span class="token function">sudo</span> systemctl start nginx <span class="token comment"># 启动ng</span></span>
<span class="line"></span>
<span class="line"><span class="token function">sudo</span> systemctl reload nginx <span class="token comment">#重新加载</span></span>
<span class="line"></span>
<span class="line"><span class="token function">sudo</span> systemctl stop nginx <span class="token comment">#停止ng</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nano操作" tabindex="-1"><a class="header-anchor" href="#nano操作"><span>nano操作</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token function">nano</span> file_name.file</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="文件移动" tabindex="-1"><a class="header-anchor" href="#文件移动"><span>文件移动</span></a></h3>
<p>mv命令不仅可以用于重命名文件或目录，还可以用于移动它们。使用mv命令重命名的基本语法非常简单.</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token function">mv</span> 原文件名 新文件名</span>
<span class="line"><span class="token function">mv</span> myFile newName</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="rm-rf" tabindex="-1"><a class="header-anchor" href="#rm-rf"><span>rm -rf</span></a></h3>
<p>rm -rf 是一个强大的 Linux 命令，用于递归删除目录及其内容，并且不会提示确认。这个命令非常危险，因为它会删除指定目录及其所有子目录和文件，且无法恢复。</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token function">rm</span> <span class="token parameter variable">-rf</span> /path/to/directory <span class="token comment">#此命令将删除 /path/to/directory 及其所有内容。</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="unzip" tabindex="-1"><a class="header-anchor" href="#unzip"><span>unzip</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token comment">#1. 解压到当前目录</span></span>
<span class="line"><span class="token function">unzip</span> archive.zip</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 解压到指定目录</span></span>
<span class="line"><span class="token function">unzip</span> archive.zip <span class="token parameter variable">-d</span> /path/to/directory</span>
<span class="line"></span>
<span class="line"><span class="token comment">#3. 查看 .zip 文件内容</span></span>
<span class="line"><span class="token function">unzip</span> <span class="token parameter variable">-l</span> archive.zip</span>
<span class="line"></span>
<span class="line"><span class="token comment">#4. 测试 .zip 文件完整性</span></span>
<span class="line"><span class="token function">unzip</span> <span class="token parameter variable">-t</span> archive.zip</span>
<span class="line"></span>
<span class="line"><span class="token comment">#5. 解压时覆盖已存在文件</span></span>
<span class="line"><span class="token function">unzip</span> <span class="token parameter variable">-o</span> archive.zip</span>
<span class="line"></span>
<span class="line"><span class="token comment">#6. 解压时不覆盖已存在文件</span></span>
<span class="line"><span class="token function">unzip</span> <span class="token parameter variable">-n</span> archive.zip</span>
<span class="line"></span>
<span class="line"><span class="token comment">#7. 解压带密码的 .zip 文件</span></span>
<span class="line"><span class="token function">unzip</span> <span class="token parameter variable">-P</span> 密码 archive.zip</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 8. 排除特定文件解压</span></span>
<span class="line"><span class="token function">unzip</span> archive.zip <span class="token parameter variable">-x</span> <span class="token string">"*.log"</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


