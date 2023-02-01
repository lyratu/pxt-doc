# makecode 扩展

扩展是 PXT 用于扩展目标的动态/静态库机制，例如 pxt-micro:bit:

[pxt-microbit](https://github.com/microsoft/pxt-microbit)

下面是一个简单扩展的示例，它扩展了pxt-microbit目标，以便micro:bit可以驱动NeoPixel条带：

[pxt-neopixel](https://github.com/microsoft/pxt-neopixel)

要了解此扩展是如何浮出水面的，请访问https://makecode.microbit.org/ 并从齿轮菜单中选择“扩展”选项。您将看到可用选项中列出的扩展名“neopixel”。如果您单击它，一个名为“Neopixel”的新块类别将添加到编辑器中。

在这个场景中，PXT直接从GitHub动态加载neopixel扩展，将其编译并合并到web应用程序中。扩展也可以与web应用绑定（类似于静态链接）。对于动态加载的扩展，目标可以提供一个已批准扩展的白名单（请参见[pxtarget.json](/guide/pxtarget)）。
- 有什么问题吗？加入我们的[社区Discord](https://aka.ms/makecodecommunity)！

## 编写扩展
- [扩展入门指南](https://makecode.com/extensions/getting-started)
- 通过[pxt.json](/guide/pxt-json)文件进行扩展配置
- [命名约定](https://makecode.com/extensions/naming-conventions)
- [扩展版本](https://makecode.com/extensions/versioning)
- [扩展本地化](https://makecode.com/extensions/localization)
- [扩展审批](https://makecode.com/extensions/approval)
- [GitHub扩展署名](https://makecode.com/extensions/github-authoring)

## [编辑器扩展](https://makecode.com/extensions/extensions)
扩展可以提供可选的编辑器扩展。编辑器扩展是一个HTML页面，由编辑器加载到iFrame中。它允许与项目交互或通过消息访问串行数据。这些编辑器扩展托管在[GitHub pages](https://pages.github.com/)上。