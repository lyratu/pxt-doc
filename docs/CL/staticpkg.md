## pxt-staticpkg 手册页

将目标打包为静态 HTML 页面

> pxt staticpkg [--route route] [--githubpages] [--output output] [--locs-src locs-src]

## 描述

将 PXT 编辑器编译为静态 HTML 文件，这些文件可以在没有服务器的情况下提供，也可以集成到应用程序中。生成的文件放置在`built/packaged`中。

## 标志

### route (可选)

路由路径。如果缺少，则默认为`local`。路由将被注入应用程序中的所有路径。

### githubpages (可选)

生成与 GitHub 页面兼容的网站。

### output (可选)

生成文件的目录。

> 在启动进程之前，将清理此目录。

### locs-src (可选)

### minify (可选)

最小化所有生成的 js 文件

### githubpages (可选)

生成与 GitHub 页面兼容的网站。

### bump (可选)

颠簸版本编号生成页面

## 使用静态文件部署 PXT

运行`pxt staticpkg`将创建许多`built/packaged`的文件。您可以使用`pxt serve -pkg`或任何其他任何 web 服务器。例如，您可以使用[http-server](https://www.npmjs.com/package/http-server)进行简单的测试。

```
npm install -g http-server
http-server -c-1 built/packaged
```

您还可以运行`pxt staticcpkg--route foo`，它将在`built/packaged/foo`下创建文件，假设它们位于 web 服务器上的`/foo/`下。如果未指定任何内容，文件将假定它们位于`/`下。要测试它，请运行`pxt serve -pkg`并转到 http://localhost:3232/foo/index.html.

## [GitHub Pages](https://pages.github.com/)支持

GitHub 为您的项目文件提供免费托管。

如果您希望将网站发布到 GitHub 页面，只需在命令中添加`--githubpages`即可。

这将：如果需要，在`built/gh-pages`页面中创建一个新的签出隐式运行 `pxt staticpkg --route repo-name`复制文件从`built/packaged/repo-name`到`built/gh-pages`将文件添加到 git、提交和推送

然后您可以前往 https://your-username.github.io/repo-name/
