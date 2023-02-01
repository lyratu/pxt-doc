# 模拟器

### 枚举

如果将枚举（和接口）放在库中的文件中，然后从模拟器中引用这些文件，则可以在模拟器和目标库之间共享它们。`.d.ts`

## 编译到 ARM 本机代码

若您的目标平台与 ARM Mbed 兼容，PXT 将能够在浏览器中将程序编译为 ARM 机器代码。我们建议与团队联系，以帮助您开始此主题。

## 异步函数

PXT 支持协作多线程和隐式异步函数。[查看更多](https://makecode.com/async)

## 离线支持

如果模拟器引用了图像或外部资源，那么它在脱机时可能无法工作。您可以通过为 PXT 创建的模拟器配置服务工作程序来解决这个问题。在目标文件夹中，添加一个名为`sim/public` `workerConfig.js`的文件，内容如下：

```typescript
self.setSimulatorWorkerOptions({
  urls: [],
});
```

放置在 URL 数组中的所有 URL 将与其他模拟器文件一起缓存。如果 URL 位于目标的文件夹中，则可以像这样引用它们：。路径组件将被 PXT 自动修补到完整的 URL 中以获取资源。`sim/public` `/sim/myFile.png` `/sim/`

**警告：** 确保添加到此阵列的所有 URL 都存在。如果这些 URL 中的任何一个未能解析，服务工作人员将不会安装，模拟器也不会脱机缓存。

## 消息模拟器

一旦检测到控制 sim 消息的特定信道，就可以注册将产生的外部模拟器。此功能用于生成特定于域的模拟器。

要启用此场景，您必须在字段下添加控制消息通道到模拟器 URL（和其他选项）的映射：`pxtarget.json` `simulator.messageSimulators`

```typescript
...
simulator: {
    ...
    messageSimulators: {
        ...
        "mychannel": {
            "url": "url of the simulator$PARENT_ORIGIN$",
        }
    }
}
```
加载消息模拟器URL时，MakeCode会以编辑器的URI编码来源扩展。您可以使用此值来验证iframe消息的来源。`$PARENT_ORIGIN$`

可选地，您可以指定将在本地开发模式中使用的. `localHostUrl`