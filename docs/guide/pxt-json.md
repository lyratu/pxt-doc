# pxt.json 手册页

[PXT 扩展](https://makecode.com/extension)位于自己的目录中，本地位于 PXT 目标的`libs/`下。`pxt.json`文件描述了扩展名。为了显示一个真实的示例，这里是**pxt-neopixel**扩展名的[pxt.json](https://github.com/microsoft/pxt-neopixel/blob/master/pxt.json)文件。

`pxt.json` 由 [pxtpackage.d.ts](https://github.com/microsoft/pxt/blob/master/localtypings/pxtpackage.d.ts#L15-L43) 中的接口 `PackageConfig` 描述：

> **Packages**现在被称为**extensions**。在标识符中使用包名意味着扩展。

```typescript
interface PackageConfig {
  name: string; // public:true -> name must match ^[a-z][a-z0-9\-_]+
  description?: string; // longer description of extension
  license?: string; // name of license (as found on github)
  authors?: string[];

  files: string[]; // files to be included and compiled in the extension
  additionalFilePath?: string; // another directory to find files from

  dependencies: Map<string>; // extension dependencies (see below for more)
  public?: boolean; // set true to enable the extension to be published (to cloud),
  // in support of publishing user scripts

  icon?: string; // url to icon -- support for built-in extensions only
  card?: CodeCard;
  documentation?: string; // doc page to open when loading project

  // semver description for support target version
  version?: string;
  installedVersion?: string;
  targetVersions?: TargetVersions; // versions of the target/pxt the extension was compiled against

  fileDependencies?: Map<string>; // exclude certain files if dependencies are not fulfilled

  testFiles?: string[];
  testDependencies?: Map<string>;
  simFiles?: string[];

  cppDependencies?: Map<string>;

  binaryonly?: boolean;
  platformio?: PlatformIOConfig;
  yotta?: YottaConfig;

  gistId?: string;
}
```

## 依赖项（对其他扩展）

简单的扩展通常只依赖于自己目标的核心扩展：

```typescript
"dependencies": {
    "core": "file:../core"
}
```

许多目标使用[pxt-common-packages](https://github.com/microsoft/pxt-common-packages)，并将其专门化以满足其目标的需求。这些是用于目标的基本扩展集。例如，Adafruit Circuit Playground Express[扩展](https://github.com/microsoft/pxt-adafruit/blob/master/libs/circuit-playground/pxt.json)是多个扩展的组合。

```typescript
"dependencies": {
    "base": "file:../base",
    "core": "file:../core",
    "buttons": "file:../buttons",
    "accelerometer": "file:../accelerometer",
    "lightsensor": "file:../lightsensor",
    "thermometer": "file:../thermometer",
    "music": "file:../music",
    "light": "file:../light",
    "switch": "file:../switch",
    "infrared": "file:../infrared",
    "microphone": "file:../microphone",
    "touch": "file:../touch"
}
```

上述每个扩展都是目标的本地扩展，但从**pxt-common-packages**继承代码，然后可以根据目标的需要重写或专用化这些代码。例如，目标[pxt-adafruit](https://github.com/microsoft/pxt-adafruit)中的按钮[扩展](https://github.com/microsoft/pxt-adafruit/blob/master/libs/buttons/pxt.json)是使用`additionalFilePath`字段根据**pxt-common-packages**的按钮扩展定义的：

```typescript
{
    "description": "Button A and B drivers",
    "additionalFilePath": "../../node_modules/pxt-common-packages/libs/buttons"
}
```

`additionalFilePath`字段指的是目标的`node_modules`目录。`pxt.json`文件只需要指定在`additionalFilePath`中相对于`pxt.jsn`所做的更改（在上面的示例中）。

`additionalFilePath`是递归的或多级的-引用目录中的`pxt.json`可能有另一个`additionalFile`路径，它将按预期工作。

## 测试文件

`testFiles`下列出的文件仅在扩展名作为顶级程序编译时包含，而不只是导入到其他程序中。通常，当您从扩展目录中的命令行运行`pxt`时，或者当您在在线编辑器中编辑扩展本身时单击“**Download**”时，就会发生这种情况。它们通常包含用于扩展的单元测试。

类似地，`testDependencies`中的依赖项仅在编译为顶级时包含。可以为多个目标添加`testDependencies`，并且只有在可以解析这些目标时才会添加。

## 文件依赖

虽然不是很常见，但在某些扩展中，只有当项目中已经存在另一个扩展时，才能启用某些功能。例如，`weather`传感器包可能有通过无线电传输天气数据的代码，但只有在项目中已经有`radio`扩展时才应该启用该代码（以避免在没有无线电的板上出现问题，或者当蓝牙禁用无线电时）。这个问题的另一个解决方案是创建一个新的`weather-radio`，这取决于`weather`和`radio`。当附加功能相当大时，这是可取的，否则最好减少软件包的数量。

配置示例：

```typescript
...
"files": [
    "weather-reading.ts",
    "weather-radio.ts",
    "weather-jacdac.ts",
    "jd-helper.ts",
    "README.md"
],
"fileDependencies": {
    "weather-radio.ts": "radio",
    "weather-jacdac.ts": "jacdac",
    "jd-helper.ts": "jacdac"
},
...
```

这里，`weather-radio.ts`文件将仅在项目中引用`radio`时包含，`weather-jacdac.ts`和`jd-helper.ts`文件仅在`jacdac`存在时包含。

通常，您将添加 `radio` 和 `jacdac` 作为 `testDependencies`，这样您就可以在编辑器中看到整个扩展。将它们作为常规`dependencies`添加是没有意义的——这会抵消 `fileDependencies` 的影响，并始终包括依赖项和文件。

除了包名之外，您还可以使用`target:micbit`或类似的名称来指示文件仅在为特定的 MakeCode 编辑器编译时包含（其他选项包括`target:maker`和`target:arcade`）。

最后，允许使用布尔表达式，使用`!`, `&&` 和 `||`运算符。不允许使用括号，运算符优先级与 C 或 JavaScript 中的相同（`!`绑定比`&&`更紧，它绑定比`||`更紧）。

```typescript
...
"fileDependencies": {
    "weather-radio.ts": "!bluetooth &&target:microbit",
    "weather-buttons.ts": "target:microbit &&arcade-controls || target:arcade"
},
...
```
未来，我们可能会允许类似`"radio >= 1.2.3"`的内容。

## C++依赖
`cppDependencies`下的依赖项仅在为C++编译器生成代码时考虑。通常，可以在核心包的`cppDependencies`中列出包含C++代码的所有可选包。然后，当用户实际添加了这些可选包中的任何一个时，C++代码都不会改变，并且不需要重新编译（因此也不需要云往返）。