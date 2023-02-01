# 创建目标
PXT 可以定制为创建您自己的**目标**，使用您自己的一组 API 和运行时，并得到基于块和 JavaScript 编辑的支持。具体项目如下:
- https://makecode.adafruit.com (源自 https://github.com/microsoft/pxt-adafruit)
- https://maker.makecode.com (源自 https://github.com/microsoft/pxt-maker)
- https://microsoft.github.io/pxt-sample/ (源自 https://github.com/microsoft/pxt-sample)

我们假定读者熟悉Node.JS、NPM、JavaScript和/或C++。如果尚未执行此操作，请安装Node. JS和PXT命令行
```
npm install -g pxt
```
- 获取[pxt-sample](https://github.com/microsoft/pxt-sample)的副本，并在您喜欢的编辑器中打开它。
- 打开一个命令提示符并运行在目标文件夹
- npm install

此时，为您的目标选择一个标识符。仅使用字母字符，因为它将在各种路由操作中使用。

## 目标结构
目标包含一个pxtarget.json文件和以下文件夹：
- ` /libs ` 定义（在C ++，Static TypeScript或Thumb汇编器中的）API的包（有时称为库）以及它们如何呈现给积木块。
- ` /sim ` 用于浏览器中的模拟器的TypeScript源代码, 如果存在的话。
- ` /docs ` markdown文档页面

### pxtarget.json
pxtarget. json文件包含target的配置选项。 现在, 请更新、和字段以反映您的target信息。` id name title `
- 小贴士：在此文件搜索并替如上字段 ` sample>pxtarget.json `

### package.json
您的target最终将必须发布到 NPM, 因此请继续使用您的目标 id、存储库位置等更新文件。 * 也是个好机会可以是检查您的target id 是否在 NPM 中也是可用的。` package.json `

### 更新assets文件夹
图形资源在 文件夹下面。` /docs/static `
- **avatar.svg** 用于主页头部图片
- **loader.svg** 用于加载状态图片

### 主页配置
请参考 [targets/home-screen](https://makecode.com/targets/home-screen)

### core
pxt-sample 包定义了一个最小的包结构 ` libs/core `

事实上，pxt-sample 的 API 存在于(带注释的暴露 [定义积木块](https://makecode.com/defining-blocks))中，因为这个目标仅用于 web。PXT 编译器根据模拟器代码生成文件 ` sim/api.ts libs/core/sim.d.ts`

有关创建包的更多信息，请参见[创建PXT包](https://makecode.com/packages)，其中包括包本身中的代码。现在，您可以尝试将一个新的 API 添加到带有注释的现有名称空间中，以创建一个新块 ` sim/api.ts `

### 将 JavaScript 库添加到目标中
您可能希望在目标中使用许多有用的 JavaScript 库，尤其是为了更轻松地构建模拟器 （）。执行此操作的基本模式是：` sim/simulator.js `
- 将 JavaScript 文件添加到目录 ` sim/public/js `
- 在使用标记时包括这些文件 ` sim/public/simulator.html  <script> ` 

### 将 JavaScript 库暴露给 TypeScript 和 Blockly
如果你想让JavaScript函数（来自现有库）对目标用户可用（通过TypeScript和Blockly），还有更多的工作要做。您需要编写 TypeScript 函数来包装现有的 JavaScript 函数。一些 JavaScript 库可能已经有一个可用的 TypeScript 声明文件，这可以使过程更简单。

### 更新 project templates
模板是目标的默认项目。有一个默认的块项目和一个默认的JavaScript项目。初始模板是空项目。若要更改默认项目，请在 ` libs/blocksprj ` 目录 

### 在本地测试目标
更新目标后，即可在本地运行。运行以下命令：
```
pxt serve
```
编辑器将自动打开目标 API 项目，您可以直接在 PXT 中对其进行编辑。此时，我们建议使用将用作沙盒的块创建新项目。在本地测试目标时，将在文件夹下创建新项目（并自动“git 忽略”）。您可以使用这些项目来更改模板。只需将项目的内容复制到` /projects ` ` /projects ` ` /libs/templates/ `

每当您进行更改时，本地 Web 服务器都会触发构建。只需在构建完成后重新加载页面即可。

## 定义 API 和块
PXT环境中可用的API是从TypeScript包（库）文件（下面的文件）加载的。它们可以从C++库文件或TypeScript模拟器文件自动生成 ` /libs `

阅读更多关于[如何注释APIS](https://makecode.com/defining-blocks)以在PXT中将其公开为块的信息

## 路径重写
上传到 PXT 云时，各种文件的 URL 将被重写为指向 CDN 的文件。CDN 上有三种类型的 URL：
- ` /blob/<blob_hash>/some/path/filename.ext ` -路径和文件名可以是任意的
- ` /commit/<commit_hash>/path/in/that/commit/filename.ext ` -路径实际来自提交的位置
- ` /tree/<tree_hash>/path/in/that/tree/filename.ext ` -路径实际来自树的地方

应尽可能使用 URL，因为它们仅在文件更改时更改。这允许更快的应用程序更新 ` /blob/ `

例如，比较  https://makecode.microbit.org/\---manifest 和 https://github.com/microsoft/pxt/blob/master/webapp/public/release.manifest

通常，PXT将重写以to开头的URL和以to开头。这发生在manifest和HTML文件以及一些JavaScript文件（web worker源代码和）中。部分重写在上传时发生在客户端（引入了和等字符串），部分重写发生在云中 ` /cdn/ ` ` /commit/... ` ` /blb/ ` ` /blob/... ` ` embed.js ` ` unknown macro ` ` unknown macro `

当前，仅在模拟器文件中，所有内容都被重写为。但是，未来，模拟器文件应明确使用以使意图清晰 ` /cdn/ ` ` /sim/ ` ` /blb/ ` ` /blob/... ` ` /blb/ `

使用的主要原因是资源需要相对路径时。例如，这是阻止媒体文件的情况。 ` /cdn/ ` ` /blb/ `

URL尚未在重写中支持。` /tree/... `