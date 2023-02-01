# pxt-hidserial 手册页

监控某些板（特别是 SAMD21 板）的串行输出

> pxt hidserial

## 安装

此命令依赖于[node hid](https://github.com/node-hid/node-hid)，这是 node.JS 的本地包。要安装此包，请运行

> pxt npminstallnative

## 描述

当使用 Codal 运行时，PXT 通过 [ custom USB HID protocol called HF2](https://github.com/microsoft/uf2/blob/master/hf2.md)从 `Console.log()`和朋友发送数据。该协议支持许多其他功能，包括闪烁和一些调试。HF2 适用于所有主要操作系统（包括 Windows 7），无需任何驱动程序。

`pxt hidserial` 只是将串行数据转储到标准输出。使用 `pxt serve` 和开发时 `http://localhost:3232`，HID 串行被转发到浏览器，因此不需要使用 `pxt hidserial`。

其他有用的 HID 命令包括 `pxt hidlist` 以列出连接的 HID 设备，pxt hiddmesg 以转储 Codal 调试缓冲区。PXT 也可以通过 HID 进行部署-这是使用命令行或 `pxt serve` 时的默认设置。

## 另请参见

[pxt](https://makecode.com/cli) tool
