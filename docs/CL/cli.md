# 命令行工具

PXT 附带了一个命令行工具，名为“惊喜”、“惊喜”。要使用它，您需要首先安装 node.js。然后，您可以使用安装（您可能需要在 Linux 或 macOS 上使用）：`pxt` `pxt` `npm` `sudo`

> npm install -g pxt

> 如果要在 Windows 上构建 pxt microbit，请确保安装了以下各项：
>
> 1. [Yotta（遵循 Windows 的手动安装）](http://docs.yottabuild.org/#installing-on-windows)
> 2. [SRecord 1.64](https://sourceforge.net/projects/srecord/files/srecord-win32/1.64/)并将其移至 C:
> 3. [Visual Studio 和/或 C++工具链](https://www.visualstudio.com/downloads/)
>    > 此外，确保将这些添加到路径中：<br>
>    > C:\Python27\Scripts <br>
>    > C:\srecord_dir

## 设置工作区

对于每个 PXT 目标（编辑器），您都需要为项目创建一个目录。假设您要安装 target，并将目录命名为：`microbit` `microbit`

```
mkdir microbit
cd microbit
pxt target microbit
pxt serve
```

最后一个命令将在默认浏览器中打开编辑器

概念上与加上一些内务处理相同，例如设置文件以指向目标。`pxt target microbit` `npm install pxt-microbit` `pxtcli.json`

在未来，你只需要 run。您还可以运行以升级目标和 PXT。`pxt serve` `npm update`

## 使用 CLI

如果您已经从 web 浏览器创建了 PXT 项目，则可以转到它的文件夹（它位于下面）并使用 CLI 构建和部署它。`projects`

- 首先，将安装所有必需的 PXT 软件包 `pxt install`
- 使用（或仅使用）构建包并将其部署到设备 `pxt deploy` `pxt`

您可以使用[VSCode](https://code.visualstudio.com/)将其发布到 GitHub 上。

虽然您可以使用任何编辑器编辑 TypeScript 代码，但在学习该语言时，您可以考虑使用 VSCode，因为它提供语法高亮显示、linting 和其他支持，可以节省调试扩展的时间。

### 创建新项目

打开文件夹的 shell。`microbit`

```
# create a new subfolder for your project
cd projects
mkdir blink
cd blink
# start the project set
pxt init
# open VSCode
code .
```

### 打开现有项目

您可以从嵌入的 URL 或十六进制文件中提取项目。打开项目文件夹的 shell

```
# extract the project from the URL
pxt extract EMBEDURL
```

其中是发布的项目 URL。`EMBEDURL`

## 命令

运行以获取所有命令的列表。以下链接列表包含有关特定命令的更多信息。`pxt help`

- [target](https://makecode.com/cli/target),下载编辑器工具
- [build](https://makecode.com/cli/build),生成当前项目
- [deploy](https://makecode.com/cli/deploy),构建和部署当前项目
- [console](https://makecode.com/cli/console),监视器输出`console.log`
- [bump](https://makecode.com/cli/bump),增加版本号
- [checkdocs](https://makecode.com/cli/checkdocs),验证文档链接和片段
- [staticpkg](https://makecode.com/cli/staticpkg),将编辑器编译为平面文件系统
- [install](https://makecode.com/cli/install),将扩展复制到 `pxt_modules/`

## 调试命令

- [gdb](https://makecode.com/cli/gdb),尝试启动 OpenOCD 和 GDB
- [hidserial](https://makecode.com/cli/hidserial),从某些板`console.log(...)`监视
- [hiddmesg](https://makecode.com/cli/hiddmesg),通过 HID 获取缓冲区并打印它`DMESG`

## 高级命令

- [serve](https://makecode.com/cli/serve),运行本地服务器
- [pyconv](https://makecode.com/cli/pyconv),将 MicroPython 代码转换为静态 TypeScript。
- [update](https://makecode.com/cli/update),更新依赖项并运行安装步骤 `pxt-core`
- [buildsprites](https://makecode.com/cli/buildsprites),将精灵图像编码为资源 `jres`
- [login](https://makecode.com/cli/login),存储 GitHub 令牌
