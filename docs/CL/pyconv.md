# pxt-pyconv 手册页

将 MicroPython 模块转换为 PXT

```
pxt pyconv <directory> [<support directory>...]
pxt pyconv <file.py>... [<support directory>...]
```

## 操作

在`<directory>`中找到的所有模块都将被转换并写入当前目录。通过存在`setup.py`、`README.rst`或类似文件来检测模块。

如果指定一个或多个`.py`文件而不是目录，它们将被转换

将在支持目录中搜索其他 Python 模块。它们在后台进行转换，但不会写入结果。

## python 在哪里?

该命令要求 Windows 上的 **python3** 或 `python3` 可执行文件位于 `PATH` 中。或者可以在 `PYTHON3` 环境变量中指定 python 路径。

## 局限性

只支持 Python 的一小部分。输出是 PXT 模块的起点。

- `__getitem__`, `__setitem__`不支持（索引器）
- 变量的范围可能会混淆-您可能需要手动拉出变量

`try/catch`是由 PXT 不支持的转换。

## 另请参见

[pxt](https://makecode.com/cli) tool
