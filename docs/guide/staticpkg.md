# pxt-staticpkg

将目标打包为静态 HTML 页面

```
pxt staticpkg [--route route] [--githubpages] [--output output] [--locs-src locs-src]
```

## 描述

将 PXT 编辑器编译为静态 HTML 文件，这些文件可以在没有服务器的情况下提供，也可以集成到应用程序中。生成的文件放置`built/packaged`中。

## 标志

### route (可选)

路由路径。如果缺少，则默认为`local`。路由将被注入应用程序中的所有路径。

### githubpages (可选)

生成与 GitHub 页面兼容的网站。

### output (可选)

生成文件的目录。

> 在启动进程之前，将清理此目录。

### locs-src (可选)

获取要包含在生成中的编辑器翻译的目录

文件必须列出如下：

```typescript
{locs-src}/{lang id}/target-strings.json
{locs-src}/{lang id}/sim-strings.json
{locs-src}/{lang id}/{package id}-strings.json
{locs-src}/{lang id}/{package id}-jsdoc-strings.json
```

其中，`{locs-src}`是此处传递的目录参数，`{lang id}`是在 `pxtarget.json` 中的 `availableLocales` 中列出的语言标识符之一，而`{package id}`是 `bundleddirs` 中列出的包的标识符（例如 `core`）

### minify (可选)

最小化所有生成的 js 文件。

### githubpages (可选)

生成与 GitHub 页面兼容的网站。

### bump (可选)

凹凸版本号生成页面。

## 使用静态文件部署 PXT

运行`pxt staticpkg`将创建大量未`编译/打包`的文件。您可以使用 `pxt serve -pkg` 或任何其他任何 web 服务器。例如，您可以使用 [http-server](https://www.npmjs.com/package/http-server) 进行简单的测试。

```
npm install -g http-server
http-server -c-1 built/packaged
```

您还可以运行`pxt staticcpkg--route foo`，它将在`built/packaged/foo`下创建文件，假设它们位于 web 服务器上的`/foo/`下。如果未指定任何内容，文件将假定它们位于`/`下。要测试它，请运`行pxt serve -pkg`并转到 http://localhost:3232/foo/index.html.

## GitHub Pages 支持

GitHub 为您的项目文件提供免费托管。

如果您希望将网站发布到 GitHub 页面，只需在命令中添加`--githubpages`即可。

这将：如果需要，请使用`built/gh-pages`创建新的检出，如果需要，请隐式运行`pxt staticpkg- route repo-name`复制文件，从`built/packaged/repo-name`到`built/gh-pages`添加文件添加到 git，提交和推送

然后您可以前往https://your-username.github.io/repo-name/
