---
prev: ./javascript
next: ./node
---

## Linux 命令整理

### scp命令

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

### nano操作
```bash
nano file_name.file
```


### 文件移动
mv命令不仅可以用于重命名文件或目录，还可以用于移动它们。使用mv命令重命名的基本语法非常简单.

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