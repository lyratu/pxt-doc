# 主板定义

模拟器“板”包含模拟系统的当前状态。重要的是将所有状态存储在板实例中，因为 PXT 将重复使用相同的模拟器 IFrame 进行多次运行。vc0

```typescript
interface BoardDefinition {
  visual: BoardImageDefinition | string;
  gpioPinBlocks?: string[][];
  gpioPinMap: { [pin: string]: string };
  groundPins: string[];
  threeVoltPins: string[];
  fiveVoltPins: string[];
  attachPowerOnRight?: boolean;
  onboardComponents?: string[];
  marginWhenBreadboarding?: [number, number, number, number];
  spiPins?: {
    MOSI: string;
    MISO: string;
    SCK: string;
  };
  i2cPins?: {
    SDA: string;
    SCL: string;
  };
}
interface BoardImageDefinition {
  image: string;
  outlineImage?: string;
  width: number;
  height: number;
  pinDist: number;
  pinBlocks: PinBlockDefinition[];
  leds?: LEDDefinition[];
}
```

## 多个核心包

可以在一个目标中包含多个板定义。这是通过使用多个核心包（也称为板包）来实现的，每个核心包对应于特定的板模型。您只需设置所有的板包，并将其包含在中。确保在中为它们提供唯一的（在目标中）财产，尤其是在复制现有属性时`"core": ` `true` `pxt.json` `bundleddirs` `pxtarget.json` `name` `pxt.json`

您仍然需要在`corepkg` `pxtarget.json`中选择一个默认值

用户可以通过添加相应的核心包来更改项目的主板模型。任何现有的核心包都将被删除。

第二步是设置到，并可能包括在电路板封装中。`simulator.dynamicBoardDefinition` `pxtarget.json` `true` `board.json` `board.svg`

板内文件包包含上面定义的结构。该字段通常包含，将扩展为的数据URI。您也可以在`board.json` `BoardDefinition` `visual.image` `pkg://board.svg` `board.svg` `/docs/static`

通常，不同的板会有不同的引脚。看看下面关于如何[处理这个问题](https://makecode.com/simshim)。