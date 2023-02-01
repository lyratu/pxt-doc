# 创建 SAMD21 makecode 目标

本指南介绍了基于 SAMD21 的目标设置和工作的步骤。

## 先决条件

1. 安装[Node](https://nodejs.org/)（最低版本 5.7）和 npm（应随 Node 一起提供）
2. 安装 PXT 命令行：
   > npm install -g pxt
3. 阅读[创建目标](/guide/target-creation)文档。

## 步骤 1: UF2-SAMD21 引导程序

在[UF2-SAMD21](https://github.com/microsoft/uf2-samd21/pulls) bootloader repo 中创建一个新的 pull 请求，以添加板的配置。[README](https://github.com/microsoft/uf2-samd21/blob/master/README.md)提供了有关如何创建配置的详细信息。您可以查看[通用](https://github.com/microsoft/uf2-samd21/blob/master/boards/generic/board_config.h)配置以查看示例。

## 步骤 2: 创建目标存储库

克隆[pxt-sample](https://github.com/microsoft/pxt-sample)作为创建目标的基础。确保在此回购中运行`npm install`。您可以通过在根目录中运行`pxt serve`来为示例编辑器提供服务。

## 步骤 3: 看看 pxtarget.json

在你的 repo 中，你需要一个`pxtarget.json`文件来为你的目标配置 pxt 编辑器。请参阅[pxtarget](/guide/pxtarget)页面以获取有关此文件的文档以及所有可用选项。

## 步骤 4: 添加公共软件包

[pxt-common-packages](https://github.com/microsoft/pxt-common-packages)是所有 SAMD21 目标通用的 CODAL 代码所在的 repo。运行`npm install --save pxt-common-packages`在目标 repo（从 pxt 示例构建的新目标）中保存 pxt 通用包，将其添加到目标中。如果您在本地开发库，则可以从 Github 克隆 pxt 通用包 repo 并将其链接为：`npm link <path to cloned repo>`（如果您在当地链接包，请确保将其添加到`package.json`中）。

## 步骤 5: 设置目标的 libs 文件夹

目标中的`libs`文件夹包含在实际设备上运行的代码库。库是 C++和 TypeScript（\*.ts）文件的组合，用于定义块编辑器和文本编辑器中可用的 API。要设置目标的 libs 文件夹，请执行以下操作：

### 添加 pxt-common-packages “core” 库

此步骤用于在 pxt 通用包中配置 “core” 库。您还可以对希望从 pxt 公共包中包含的任何其他库使用以下步骤。

1. 删除 pxt 示例 repo 中`libs\core`的内容。
2. 创建一个名为 pxt.json 的新文件，其中包含以下内容：

```
{
    "additionalFilePath": "../../node_modules/pxt-common-packages/libs/core"
}
```

1. 配置了文件路径后，添加到此目录中与 pxt-common-packages core 库中的文件同名的任何文件都将覆盖该文件。使用此方法，您可以覆盖 pxt 公共包中的任何文件。
2. 对 pxt 公共包中的“base”库重复这些步骤。

### 添加板的“main”库

1. 在`libs`文件夹中，创建一个包含板名称的目录。该目录将是您的板的主库，应包含 pxt 通用包中不包含的任何代码。向该文件夹添加一个`pxt.json`文件，该文件依赖于上一步中创建的“core”库。请参见 pxt-adafruit circuit-playground 中的[pxt.json](https://github.com/microsoft/pxt-adafruit/blob/master/libs/circuit-playground/pxt.json)，作为该文件的示例。
2. 添加一个名为`config.ts`的文件。该文件用于配置板的引脚。例如，请参见 pxt-adafruit circuit-playground 中的[config.ts](https://github.com/microsoft/pxt-adafruit/blob/master/libs/circuit-playground/config.ts)。
3. 添加另一个名为 `device.d.ts` 的文件。此文件用于定义 TypeScript 可见的电路板组件。例如，请参见 pxt-adafruit circuit-playground 中的[device.d.ts](https://github.com/Microsoft/pxt-adafruit/blob/master/libs/circuit-playground/device.d.ts)。
4. 确保在步骤 1 中添加的`pxt.json`中同时添加`device.d.ts`和`config.ts`

### 添加“blocksproject”库

在 `libs` 文件夹中，需要一个 `blocksproject` 库。此库包含用户启动新项目时最初加载到编辑器中的默认或“base”项目。`main.blocks` 文件包含项目初始块的 XML 定义。现在，您可以保持原样。在这个库的 `pxt.json` 中，为上一步创建的“main”库添加一个依赖项。

## 步骤 6: 添加 common-sim 库

对于 pxt 模拟器来模拟 C++中定义的函数，需要这些函数的等效 TypeScript 版本。pxt 通用包的 npm 模块包含一个“common-sim”文件，该文件定义了所有 API 的模拟器实现。要在目标中使用 common-sim：

1. 在`sim\public\sim.manifest`内部，在`CACHE`部分下添加一行`/sim/common-sim.js`。
2. 在`sim\public\simulator.html`内部，在`/sim/sim.js`的脚本标记上方添加`/sim/common-sim.js`的脚本标签。
3. 在`sim\simulator.ts`内部，将`/// <reference path="../built/common-sim.d.ts"/>`添加到文件顶部。
4. 在`sim\simulator.ts`内部，修改`Board`类以实现common-sim的`CommonBoard`接口。

## 步骤 7: 接下来的步骤
此时，您应该有一个可以生成UF2文件的基本目标。查看以下步骤以进一步定制目标。
1. 有关如何自定义编辑器外观的详细信息，请参阅[主题](/guide/theming)文档。
2. 了解如何使用注释注释为目标[定义块](/guide/defining-blocks)。
3. 将文档添加到编辑器中。了解如何在[markdown](https://makecode.com/writing-docs)中编写参考和项目主题。