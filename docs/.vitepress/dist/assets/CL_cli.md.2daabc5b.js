import{_ as e,c as a,o as l,a as r}from"./app.b666acaa.js";const b=JSON.parse('{"title":"命令行工具","description":"","frontmatter":{},"headers":[{"level":2,"title":"设置工作区","slug":"设置工作区","link":"#设置工作区","children":[]},{"level":2,"title":"使用 CLI","slug":"使用-cli","link":"#使用-cli","children":[{"level":3,"title":"创建新项目","slug":"创建新项目","link":"#创建新项目","children":[]},{"level":3,"title":"打开现有项目","slug":"打开现有项目","link":"#打开现有项目","children":[]}]},{"level":2,"title":"命令","slug":"命令","link":"#命令","children":[]},{"level":2,"title":"调试命令","slug":"调试命令","link":"#调试命令","children":[]},{"level":2,"title":"高级命令","slug":"高级命令","link":"#高级命令","children":[]}],"relativePath":"CL/cli.md"}'),t={name:"CL/cli.md"},o=r(`<h1 id="命令行工具" tabindex="-1">命令行工具 <a class="header-anchor" href="#命令行工具" aria-hidden="true">#</a></h1><p>PXT 附带了一个命令行工具，名为“惊喜”、“惊喜”。要使用它，您需要首先安装 node.js。然后，您可以使用安装（您可能需要在 Linux 或 macOS 上使用）：<code>pxt</code> <code>pxt</code> <code>npm</code> <code>sudo</code></p><blockquote><p>npm install -g pxt</p></blockquote><blockquote><p>如果要在 Windows 上构建 pxt microbit，请确保安装了以下各项：</p><ol><li><a href="http://docs.yottabuild.org/#installing-on-windows" target="_blank" rel="noreferrer">Yotta（遵循 Windows 的手动安装）</a></li><li><a href="https://sourceforge.net/projects/srecord/files/srecord-win32/1.64/" target="_blank" rel="noreferrer">SRecord 1.64</a>并将其移至 C:</li><li><a href="https://www.visualstudio.com/downloads/" target="_blank" rel="noreferrer">Visual Studio 和/或 C++工具链</a><blockquote><p>此外，确保将这些添加到路径中：<br> C:\\Python27\\Scripts <br> C:\\srecord_dir</p></blockquote></li></ol></blockquote><h2 id="设置工作区" tabindex="-1">设置工作区 <a class="header-anchor" href="#设置工作区" aria-hidden="true">#</a></h2><p>对于每个 PXT 目标（编辑器），您都需要为项目创建一个目录。假设您要安装 target，并将目录命名为：<code>microbit</code> <code>microbit</code></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">mkdir microbit</span></span>
<span class="line"><span style="color:#A6ACCD;">cd microbit</span></span>
<span class="line"><span style="color:#A6ACCD;">pxt target microbit</span></span>
<span class="line"><span style="color:#A6ACCD;">pxt serve</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>最后一个命令将在默认浏览器中打开编辑器</p><p>概念上与加上一些内务处理相同，例如设置文件以指向目标。<code>pxt target microbit</code> <code>npm install pxt-microbit</code> <code>pxtcli.json</code></p><p>在未来，你只需要 run。您还可以运行以升级目标和 PXT。<code>pxt serve</code> <code>npm update</code></p><h2 id="使用-cli" tabindex="-1">使用 CLI <a class="header-anchor" href="#使用-cli" aria-hidden="true">#</a></h2><p>如果您已经从 web 浏览器创建了 PXT 项目，则可以转到它的文件夹（它位于下面）并使用 CLI 构建和部署它。<code>projects</code></p><ul><li>首先，将安装所有必需的 PXT 软件包 <code>pxt install</code></li><li>使用（或仅使用）构建包并将其部署到设备 <code>pxt deploy</code> <code>pxt</code></li></ul><p>您可以使用<a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">VSCode</a>将其发布到 GitHub 上。</p><p>虽然您可以使用任何编辑器编辑 TypeScript 代码，但在学习该语言时，您可以考虑使用 VSCode，因为它提供语法高亮显示、linting 和其他支持，可以节省调试扩展的时间。</p><h3 id="创建新项目" tabindex="-1">创建新项目 <a class="header-anchor" href="#创建新项目" aria-hidden="true">#</a></h3><p>打开文件夹的 shell。<code>microbit</code></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"># create a new subfolder for your project</span></span>
<span class="line"><span style="color:#A6ACCD;">cd projects</span></span>
<span class="line"><span style="color:#A6ACCD;">mkdir blink</span></span>
<span class="line"><span style="color:#A6ACCD;">cd blink</span></span>
<span class="line"><span style="color:#A6ACCD;"># start the project set</span></span>
<span class="line"><span style="color:#A6ACCD;">pxt init</span></span>
<span class="line"><span style="color:#A6ACCD;"># open VSCode</span></span>
<span class="line"><span style="color:#A6ACCD;">code .</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="打开现有项目" tabindex="-1">打开现有项目 <a class="header-anchor" href="#打开现有项目" aria-hidden="true">#</a></h3><p>您可以从嵌入的 URL 或十六进制文件中提取项目。打开项目文件夹的 shell</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"># extract the project from the URL</span></span>
<span class="line"><span style="color:#A6ACCD;">pxt extract EMBEDURL</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>其中是发布的项目 URL。<code>EMBEDURL</code></p><h2 id="命令" tabindex="-1">命令 <a class="header-anchor" href="#命令" aria-hidden="true">#</a></h2><p>运行以获取所有命令的列表。以下链接列表包含有关特定命令的更多信息。<code>pxt help</code></p><ul><li><a href="https://makecode.com/cli/target" target="_blank" rel="noreferrer">target</a>,下载编辑器工具</li><li><a href="https://makecode.com/cli/build" target="_blank" rel="noreferrer">build</a>,生成当前项目</li><li><a href="https://makecode.com/cli/deploy" target="_blank" rel="noreferrer">deploy</a>,构建和部署当前项目</li><li><a href="https://makecode.com/cli/console" target="_blank" rel="noreferrer">console</a>,监视器输出<code>console.log</code></li><li><a href="https://makecode.com/cli/bump" target="_blank" rel="noreferrer">bump</a>,增加版本号</li><li><a href="https://makecode.com/cli/checkdocs" target="_blank" rel="noreferrer">checkdocs</a>,验证文档链接和片段</li><li><a href="https://makecode.com/cli/staticpkg" target="_blank" rel="noreferrer">staticpkg</a>,将编辑器编译为平面文件系统</li><li><a href="https://makecode.com/cli/install" target="_blank" rel="noreferrer">install</a>,将扩展复制到 <code>pxt_modules/</code></li></ul><h2 id="调试命令" tabindex="-1">调试命令 <a class="header-anchor" href="#调试命令" aria-hidden="true">#</a></h2><ul><li><a href="https://makecode.com/cli/gdb" target="_blank" rel="noreferrer">gdb</a>,尝试启动 OpenOCD 和 GDB</li><li><a href="https://makecode.com/cli/hidserial" target="_blank" rel="noreferrer">hidserial</a>,从某些板<code>console.log(...)</code>监视</li><li><a href="https://makecode.com/cli/hiddmesg" target="_blank" rel="noreferrer">hiddmesg</a>,通过 HID 获取缓冲区并打印它<code>DMESG</code></li></ul><h2 id="高级命令" tabindex="-1">高级命令 <a class="header-anchor" href="#高级命令" aria-hidden="true">#</a></h2><ul><li><a href="https://makecode.com/cli/serve" target="_blank" rel="noreferrer">serve</a>,运行本地服务器</li><li><a href="https://makecode.com/cli/pyconv" target="_blank" rel="noreferrer">pyconv</a>,将 MicroPython 代码转换为静态 TypeScript。</li><li><a href="https://makecode.com/cli/update" target="_blank" rel="noreferrer">update</a>,更新依赖项并运行安装步骤 <code>pxt-core</code></li><li><a href="https://makecode.com/cli/buildsprites" target="_blank" rel="noreferrer">buildsprites</a>,将精灵图像编码为资源 <code>jres</code></li><li><a href="https://makecode.com/cli/login" target="_blank" rel="noreferrer">login</a>,存储 GitHub 令牌</li></ul>`,29),s=[o];function c(n,i,p,d,h,m){return l(),a("div",null,s)}const k=e(t,[["render",c]]);export{b as __pageData,k as default};