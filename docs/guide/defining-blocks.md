# 定义积木块

本节介绍如何注释您的生成代码 API，以便在块编辑器中公开它们。

> 在[Playground](https://makecode.com/playground)上现场尝试一些积木，看看它们是如何工作的。修改它们甚至创建新的！

块是由添加到 API 元素（导出函数、方法、枚举等）开头的注释定义的。属性是在以注释形式开头的注释行上指定的。所有注释都可以在包含公开 API 代码的 TypeScript 库文件中找到。它们可以从 C++库文件或 TypeScript 模拟器文件[自动生成](https://makecode.com/simshim)。

## 类别

每个顶级 TypeScript 命名空间用于填充块编辑器工具箱中的类别。名称将在工具箱中自动大写。

```typescript
namespace basic {
    ...
}
```

您还可以为名称空间提供 JSDoc 注释、颜色和权重，以及友好名称（Unicode）。我们强烈建议仔细选择颜色，因为它会显著影响块的外观和可读性。同一名称空间中的所有块都具有相同的颜色，以便用户可以从样本中轻松找到类别。

```typescript
/**
 * Provides access to basic micro:bit functionality.
 */
//% color=190 weight=100 icon="\uf1ec" block="Basic Blocks"
namespace basic {
    ...
}
```

- `icon` 要显示的图标字体中的 Unicode 字符。可以使用 Font Awesome 中的任何免费非品牌图标（在撰写本文时为 v5.15.4）。可以找到完整列表 https://fontawesome.com/v5/search?m=free
- `color` 应包含在以开头的注释行中。颜色采用色调值或 HTML 颜色 `//%`
- `weight` 确定类别在工具箱中的位置。更高的 weight 意味着它看起来更接近顶部。

要在块编辑器工具箱的“高级”部分下显示类别，请添加注释 `advanced=true`

### 类别组

通过在组内将相似或相关的块分[组](https://makecode.com/playground#basic-groups)在一起，可以使块类别更具组织性。使用组功能时，同一组的块将一起出现在工具箱弹出按钮中，并且组的标签将显示在其上方。这使得用户更容易浏览可用的块。

要定义组，请将组属性添加到命名空间。`groups` 属性是组名称的数组。定义每个块时，可以将块单独指定给这些组。

> **小贴士:** 定义组的顺序是组在工具箱弹出按钮中显示的顺序。未指定给命名组的块将放置在默认的 `other` 组中，该组不显示标签。 `other` 组可用于决定未分组块将按组顺序出现的位置。这取决于您将 `others` 放置在 `groups` 数组中的位置。\*将块指定给组时，名称区分大小写，因此请确保放置在块上的组名称与组定义中的组名称相同。

```typescript
/**
 * Provides access to basic micro:bit functionality.
 */
//% color=190 weight=100 icon="\uf1ec" block="Basic Blocks"
//% groups=['LED matrix', 'Control flow', 'others']
namespace basic {
```

## 方块

具有 `block` 属性的所有 **导出函数** 将在块编辑器中可用。

```typescript
//% block
export function showNumber(v: number, interval: number = 150): void {}
```

如果需要对块的外观进行更多控制，可以指定 `blockId` 和 `block` 参数。

```typescript
//% blockId=device_show_number
//% block="show|number $v"
export function showNumber(v: number, interval: number = 150): void {}
```

- `blockId` 是块的常量、唯一 id。此 id 在块代码中序列化，因此更改它将破坏您的用户。如果未指定，它是从命名空间和函数名派生的，因此重命名函数或命名空间将破坏 TypeScript 和 Blocks 用户。
- `block` 包含构建块结构的语法（下面将详细介绍）。

还可以使用其他可选属性： `inlineInputMode=external` 强制外部输入渲染。这会导致块参数在多行之间换行，而不是保持内联。有关更多信息，请参阅[内联输入](https://makecode.com/defining-blocks#inline-input)部分。`advanced=true` 会将此块置于父类别的“更多…”子类别下。默认情况下，用于隐藏高级或很少使用的块

## 块语法

`block` 属性指定如何组织函数的参数以创建块。

```typescript
block = field, { '|' field }
field := string
    | string `$` parameter
parameter = string
```

- 每个 `field` 都映射到块上的字段名。
- 函数参数映射到具有相同名称的 `$parameter` 参数。加载器自动构建块字段名和函数名之间的映射。
- 当有四个或更多参数时，块将自动切换到外部输入（包装）
- `|` 表示如果块处于外部输入模式，则从何处开始新行。

## 自定义块本地化

您可以通过提供 `block.loc.locale` 条目来覆盖 `block` 中用于特定区域设置的值。

```typescript
block.loc.LOCALE = blocksyntax;
```

例如

```typescript
//% block="square $x"
//% block.loc.fr="$x au carré"
export function square(x: number): number {}
```

您还可以重写 `jsdoc` 描述和参数信息。

```typescript
jsdoc.loc.LOCALE = translated jsdoc
PARAM.loc.LOCALE = parameter jsdoc
```

```typescript
/**
    Computes the square of x
    @param x the number to square
**/
//% block="square $x"
//% block.loc.fr="$x au carré"
//% jsdoc.loc.fr="Calcule le carré de x"
//% x.loc.fr="le nombre"
export function square(x: number): number {}
```

## 支持的类型

要导出的函数签名支持以下[类型](https://makecode.com/playground#basic-types)：

- `number`（TypeScript）或 `int`（C++）
- `string`（TypeScript）或 `StringData*`（C++）
- enums（见下文）
- 也被导出的自定义类
- 上面的数组

## 指定阴影块

“阴影”块是一个不能从其父块中删除的块，但可以将其他块放在其顶部。它们用于确保块输入始终具有有效值，而不是在删除块时留下“洞”。所有参数都在 PXT 中为支持的类型（如上所列）提供了阴影块。要为不支持的类型指定阴影块或覆盖默认阴影，请使用以下语法：

```typescript
//% block="$myParam"
//% myParam.shadow="myShadowBlockID"
export function myFunction(myParam: number): void {}
```

如果现有块定义指定了块字符串中的阴影块 id，则可以使用上述语法更改值，而不更改块字符串。这允许在不使块的本地化无效的情况下更改阴影块。将阴影 id 设置为 `unset` 将删除任何现有的阴影值。

## 指定最小值、最大值和默认值

对于类型 `number` 的参数，可以指定最小值、最大值和默认值，如下所示：

```typescript
//% block
//% v.min=0 v.max=42 v.defl=25
export function showNumber(v: number, interval: number = 150): void {}
```

**Playground 示例**：[范围](https://makecode.com/playground#field-editors-range)、[默认值](https://makecode.com/playground#basic-default-values)

## 报告程序块和报表块

报告块是可以插入其他块的输入的圆形或六边形块。任何返回类型不是 void 的函数，如果它具有 `block` 注释属性，则将被制作为报告程序块。有时有一些函数返回值，但作为语句也很有用，例如 `Array.pop()`返回数组的一个元素，但在 JavaScript 中通常忽略该值。要定义同时具有报告器和语句窗体的块，请使用 `blockAliasFor` 注释属性：

```typescript
/**
 * Remove the last element from an array and return it.
 */
//% blockId="array_pop" block="get and remove last value from $list"
export function pop(): number;

/**
 * Remove the last element from an array.
 */
//% blockId="array_pop_statement" block="remove last value from $list"
//% blockAliasFor="Array.pop"
export function _popStatement(): void;
```

在上面的示例中，`pop()` 和 `_popStatement()` 定义的块都将转换为 `Array.pop()`。请注意， `_popStatements()` 以下划线开头，以防止在 monaco 编辑器中以文本补全形式显示。任何定义为别名的块都应具有与源函数相同的参数。`blockAliasFor` 的值应该是源函数的完全限定名。

## 数组默认值

对于原始类型的数组，块上的默认值是根据函数签名中的数组类型生成的。

```typescript
//% block="$myParam"
export function mySimpleFunction(myParam: number[]): void {}
```

对于具有非基元或自定义类型的数组，将阴影 ID 设置为“lists_create_with”，并使用您希望填充数组的元素类型的 blockId 设置参数的默认值。

```typescript
//% block="$myParam"
//% myParam.shadow="lists_create_with"
//% myParam.defl="screen_image_picker"
export function myFunction(myParam: Image[]): void {}
```

> **小贴士：** 上面的示例将仅在 Arcade 编辑器中渲染，因为这是支持 Image 类型的地方。

**Playground 示例：**[数组默认值](https://makecode.com/playground#basic-array-default-values)

## 输入格式

### 内联输入

具有四个或更多参数的块将自动切换到 `External Inputs` 模式，在该模式下，参数将换行而不是保持内联。要使具有多个参数的块显示为单行，请使用 `inlineInputMode=inline`。该块将从左向右展开，而不是将参数输入包装在多行上。

```typescript
//% block="map $value|from low $fromLow|high $fromHigh|to low $toLow|high $toHigh"
//% inlineInputMode=inline
export function map(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number): number {
  return ((value - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow) + toLow;
}
```

要强制外部输入，请设置 `inlineInputMode=external`。在块定义中，如果块处于外部输入模式，则 `|` 指示新行的起始位置。在每个参数之后也会开始新行。

**Playground 示例：**[内联输入](https://makecode.com/playground#basic-input-format)

### 可扩展参数

如果块有多个参数，但其中一些或所有参数可能仍设置为默认值，则可以将块设置为可扩展。这简化了块，并且在未展开时显得更短。

设置为展开的块部分由两个字段分隔符 `||` 分隔。在以下示例中，两个可选参数与块定义的第一部分分隔开 `|| `：

```typescript
//% block="play an alarm sound || of $sound for $duration ms"
```

`expandableArgumentMode` 属性控制参数的展开方式。在本示例中，它设置为 `toggle`，这将显示一个 (+) 图标，该图标在单击时展开块。

```typescript
enum AlarmSound {
  //% block="annoy"
  Annoy,
  //% block="alert"
  Alert,
}

//% color="#AA278D"
namespace alarms {
  /**
   * Play an alarm sound for some time
   * @param sound of the alarm to play
   * @param duration of the alarm sound
   */
  //% block="play an alarm sound || of $sound for $duration ms"
  //% duration.shadow=timePicker
  //% expandableArgumentMode="toggle"
  //% sound.defl=AlarmSound.Annoy
  //% duaration.defl=2000
  export function alarmSound(sound?: AlarmSound, duration?: number) {}
}
```

以下是 `expandableArgumentMode` 的设置：

- `toggle` - 选择（单击）展开图标时展开所有参数
- `enabled` - 对于展开图标的每个选择（单击），一次展开一个参数。
- `disabled` - 不要展开任何参数，保持块折叠。未显示图标。

**Playground 示例：**[内联输入](https://makecode.com/playground#basic-input-format)

## 带参数的回调

接受回调函数的 API 将把回调转换为语句输入。如果 API 中的回调被设计为接受参数，则可以使用$NAME 注释在块上指定这些参数（与指定函数参数的方式相同）。例如：

```typescript
/**
 * Run code when a certain kind of sprite is created
 * @param kind
 * @param sprite
 */
//% draggableParameters="reporter"
//% blockId=spritesoncreated block="on created $sprite of kind $kind"
//% kind.defl=spritekind
export function onCreated(kind: number, handler: (sprite: Sprite) =void): void {
}
```

在上面的示例中，设置 `draggableParameters=“reporter”` 使参数成为报告器块，可以从块中拖动（和复制）并在事件处理程序中使用，就像本地范围变量一样。

**Playground 示例：**[函数](https://makecode.com/playground#functions), [块类型](https://makecode.com/playground#basic-types), [事件](https://makecode.com/playground#events)

## 枚举

支持枚举，并将自动由块中的下拉列表表示。

```typescript
enum Button {
  A = 1,
  B = 2,
  //% blockId="ApB" block="A+B"
  AB = 3,
}
```

- 初始值设定项可用于映射值
- `blockId` 属性可用于覆盖块 id
- `block` 属性可用于覆盖渲染的字符串

**提示：非枚举参数的下拉列表**

可以为非枚举的参数提供下拉列表。它包括以下步骤：\*使用所需的下拉条目创建枚举

```typescript
enum Delimiters {
  //% block="new line"
  NewLine = 1,
  //% block=","
  Comma = 2,
}
```

- 将枚举作为参数并返回相应值的函数

```typescript
//% blockId="delimiter_conv" block="$del"
export function delimiters(del : Delimiters) : string {
    switch(del) {
        case Delimiters.NewLine: return "\n";
        case Delimiters.Comma:  return ",";
        ...
    }
}
```

- 使用枚举转换函数块 id（`delimiter_conv`）作为此参数的阴影块的值

```typescript
//% blockId="read_until" block="read until $del"
//% del.shadow=delimiter_conv
export function readUntil(del: string) : string {
    ...
}
```

**提示：使用常量下拉列表**

TypeScript 中的枚举可能是冗长的，因此有时需要将下拉列表编译为常量变量而不是枚举成员（例如，`Item.Shovel` 可以改为 `Shovel`）。

要实现此行为，请在枚举中将 `emitAsConstant` 设置为 true

```typescript
//% emitAsConstant
enum Item {
  //% block="Iron"
  Iron = 1,
}
```

然后为该枚举成员声明一个常量，如下所示：

```typescript
//% enumIdentity="Item.Iron"
const IRON = Item.Iron;
```

如果枚举具有填充函数，则也可以像设置枚举成员一样设置 `blockIdentity`。这将使反编译器将该常量的任何实例转换为该枚举的块。

```typescript
//% emitAsConstant
enum Item {
  //% block="Iron"
  //% blockIdentity="blocks.item"
  Iron = 1,
}

namespace blocks {
  //% shim=TD_ID
  //% blockId=minecraftItem
  //% block="item $item"
  export function item(item: Item): number;
}

//% enumIdentity="Item.Iron"
//% blockIdentity="blocks.item"
const IRON = Item.Iron;
```

**提示：字符串参数的隐式转换**

如果您有一个将字符串作为参数的 API，则可以绕过在块编辑器中进行的常规类型检查，并允许将任何类型的块放置在输入中。PXT 将自动将连接到参数输入的任何块转换为生成的 TypeScript 中的字符串。要启用该行为，请在参数上设置 `shadowOptions.toString`，如下所示：

```typescript
//% blockId=console_log block="console|log $text"
//% text.shadowOptions.toString=true
export function log(text: string): void {
  serial.writeString(text + "\r\n");
}
```

**Playground 示例：**[枚举](https://makecode.com/playground#basic-enums)

### 使用块创建枚举

可以让块本身动态定义枚举。该块将指定一些初始成员，但通过在参数下拉列表中选择“Add a new<enum_name>…”选项可以添加其他成员。

首先创建一个定义枚举并具有初始成员的阴影块。

```typescript
//% shim=ENUM_GET
//% blockId=planet_enum_shim
//% block="Planet $arg"
//% enumName="Planets"
//% enumMemberName="planet"
//% enumPromptHint="e.g. Saturn, Mars, ..."
//% enumInitialMembers="Mecury, Venus, Earth"
export function _planetEnumShim(arg: number) {
  return arg;
}
```

这个函数实际上不会出现在用户代码中，它只是用于定义块。为了确保该函数不会在 intellisense 中显示，在其名称的开头添加一个“\_”。

示例中显示的所有注释属性都是必需的（包括 `shim` 、`blockId` 和 `block`）。枚举属性的工作方式如下：

- `enumName` - 枚举的名称。必须是有效的 JavaScript 标识符。
- `enumMemberName` - 将用于在对话框和块中引用枚举成员的名称。这应该是独一无二的。
- `enumPromptHint` - 将出现在用于创建枚举的新成员的对话框中的提示。
- `enumInitialMembers` - 这些是使用此块时始终添加到项目中的枚举值。第一个值是默认选择。它是逗号或空格分隔的，所有成员都使用有效的 JavaScript 标识符。列表必须至少有一个值。
- `enumStartValue` （可选）-一个正整数，指定从块到 TypeScript 时将发出的最小值。

只有在项目中使用了该块（或在过去使用过）时，才会在用户代码的顶部发出枚举。如果用户在 TypeScript 中更改了枚举的值，那么当切换回块时，这些更改应该保持不变。

当函数使用枚举阴影块时，传入参数的类型应为 `number`（不要使用 `enum` 类型）。

```typescript
//% blockId=planet_id
//% block="planet id from $planet"
//% planet.shadow="planet_enum_shim"
export function whatPlanet(planet: number): number {
  return planet;
}
```

**Playground 示例：**[使用块创建枚举](https://makecode.com/playground#language-create-enums)

## JSDoc

JSDoc 注释将自动用作块的工具提示。

```typescript
/**
 * Scroll a number on the screen. If the number fits on the screen (i.e. is a single digit), do not scroll.
 * @param interval speed of scroll
 */
//% block
//% help=functions/show-number
export function showNumber(value: number, interval: number = 150): void {}
```

可选的 `help` 属性可用于指向特定的文档路径。要定义扩展块的自定义帮助，请参阅 [GitHub extension Authoring](https://makecode.com/extensions/github-authoring)。

## 对象和实例方法

可以直接公开实例方法和对象工厂，也可以通过一点扁平化（这是推荐的，因为扁平化的 C 样式 API 最好映射到块）。

### 直接创建

```typescript
//%
class Message {
    ...
    //% blockId="message_get_text" block="$this|text"
    public getText() { ... }
}
```

- 注释实例方法时，需要在块语法定义中指定 `$this` 参数。

您需要公开一个工厂方法来根据需要创建对象。对于上面的示例，我们添加一个创建消息的函数：

```typescript
//% blockId="create_message" block="create message|with $text"
export function createMessage(text: string): Message {
  return new Message(text);
}
```

### 自动创建

如果对象具有合理的默认构造函数，并且即使稍后需要覆盖变量，调用此构造函数也是无害的，那么将无参数函数指定为自动创建很有用，如下所示：

```typescript
namespace images {
    export function emptyImage(width = 5, height = 5): Image { ... }
}
//% autoCreate=images.emptyImage
class Image {
    ...
}
```

现在，当用户添加引用方法的块时，将自动引入全局变量，并使用 `Image` `images.emptyImage()` 初始化全局变量

在默认构造函数具有副作用（例如，配置 pin）的情况下，或者如果默认值最常被重写，则不应使用该语法。`autoCreate`

### 固定实例集

有时，给定类的实例数是固定的。一个例子是表示电子板上的引脚的对象。可以以类似于枚举的方式公开这些实例：

```typescript
//% fixedInstances
//% blockNamespace=pins
class DigitalPin {
    ...
    //% blockId=device_set_digital_pin block="digital write|pin $this|to $value"
    digitalWrite(value: number): void { ... }
}

namespace pins {
    //% fixedInstance
    export let D0: DigitalPin;
    //% fixedInstance
    export let D1: DigitalPin;
}
```

这将导致一个块，其中第一个孔是带有和的下拉孔，第二个孔是常规整数值。变量可以具有其他注释（例如）。目前，仅支持变量（或）`digital write pin [D0] to`
` [0]D0 D1 D0 D1 block="D#0" fixedInstance let const`

固定实例也支持继承。例如，考虑添加以下声明。

```typescript
//% fixedInstances
class AnalogPin extends DigitalPin {
    ...
    //% blockId=device_set_analog_pin block="analog write|pin $this|to $value"
    //% blockNamespace=pins
    analogWrite(value: number): void { ... }
}

namespace pins {
    //% fixedInstance
    export let A0: AnalogPin;
}
```

将有一个带有的选项下拉列表，但打开的选项现在是，和 `.analog` `writeA0` `digital` `write` `D0 ` `D1` `A0`

带有注释的变量可以添加到任何地方，甚至可以添加到不同的库或命名空间中。`fixedInstance`

此功能通常与属性一起使用 `indexedInstance*`

该属性指定工具箱中的哪个抽屉将用于此块。它可以在方法或类上指定（应用于类中的所有方法）。通常，您还需要在类或方法上进行设置。 `blockNamespace` `color=...`

也可以在 TypeScript 中定义要在块中使用的实例，例如：

```typescript
namespace pins {
  //% fixedInstance whenUsed
  export const A7 = new AnalogPin(7);
}
```

注释导致变量仅在使用时包含在编译中，即使它是用可能会产生副作用的东西初始化的。当没有初始值设定项或初始值设定值是一个简单常量时，这会自动发生，但对于函数调用和构造函数，必须包含 `whenUsed` `whenUsed`

**Playground 示例：**[固定实例](https://makecode.com/playground#language-fixed-instances)

### 属性

TypeScript 中定义的类的字段和 get/set 访问器可以在块中公开。通常，对于给定的类型，您需要一个用于所有 getter 的块，一个用于 setter 的块以及一个用于更新（编译到运算符）的块。这可以通过注释自动完成，例如：`+=` `//%` `blockCombine`

```typescript
class Foo {
  //% blockCombine
  x: number;
  //% blockCombine
  y: number;
  // exposed with custom name
  //% blockCombine block="foo bar"
  foo_bar: number;

  // not exposed
  _bar: number;
  _qux: number;

  // exposed as read-only (only in the getter block)
  //% blockCombine
  get bar() {
    return this._bar;
  }

  // exposed in both getter and setter
  //% blockCombine
  get qux() {
    return this._qux;
  }
  //% blockCombine
  set qux(v: number) {
    if (v != 42) this._qux = v;
  }
}
```

**Playground 示例：**[类](https://makecode.com/playground#classes)

### 工厂

如果您希望按需创建类实例，而不是自动创建或使用固定实例，则可以创建工厂函数来创建实例。这通常是一个简单的函数，它用运算符实例化类，并可能将一些参数值作为选项传递给构造函数。`new`

```typescript
//% color="#FF8000"
namespace Widgets {
  export class Gizmo {
    _active: boolean;

    constructor(activate: boolean) {
      this._active = activate;
    }

    setInactive() {
      this._active = false;
    }
  }

  /**
   * Create a Gizmo widget and automtically set it to a variable
   */
  //% block="create gizmo"
  //% blockSetVariable=gizmo
  export function createGizmo(): Gizmo {
    return new Gizmo(true);
  }
}
```

为了确保在使用块时有一个有效的类实例，该属性为新实例设置了一个变量。在上面的示例中，属性将自动创建的实例并将变量设置为该实例。如果变量不存在，则会创建该变量。这允许在将块拉入编辑器时默认创建的有效实例。`blockSetVariable` `blockSetVariable` `Gizmo` `gizmo` `gizmo` `Gizmo`

**Playground 示例：**[工厂](https://makecode.com/playground#factories)

### 命名空间附件

如果类是在命名空间外部定义的，但您希望为其方法或与命名空间关联的财产定义块，则可以将类附加到命名空间。在类定义的开头，添加带有属性的注释，并将其设置为关联命名空间的名称。使用 Factory 中示例中的类，注释可能是 `blockNamespace`

```typescript
//% blockNamespace=Widgets color="#FF8000"
```

这允许类中的块与名称空间中的其他块一起出现在编辑器中。还要注意，类的设置与块的颜色相匹配`Gizmo` `Widgets` `color` `Widgets`

在此示例中，前面的类被放置在命名空间之外。此外，该方法被转换为一个块，以便与中的其他块一起显示`Gizmo` `Widgets` `setInactive` `Widgets`

```typescript
//% blockNamespace=Widgets color="#FF8000"
class Gizmo {
  _active: boolean;

  constructor(activate: boolean) {
    this._active = activate;
  }

  /**
   * Set the Gizmo widget to inactive
   */
  //% block="set %Widgets(gizmo) to inactive"
  setInactive() {
    this._active = false;
  }
}

//% color="#FF8000"
namespace Widgets {
  /**
   * Create a Gizmo widget and automtically set it to a variable
   */
  //% block="create gizmo"
  //% blockSetVariable=gizmo
  export function createGizmo(): Gizmo {
    return new Gizmo(true);
  }
}
```

**Playground 示例：**[工厂](https://makecode.com/playground#factories)

该属性包括对工厂功能创建的变量的引用。默认情况下，这将块与有效的实例匹配。`block` `setInactive` `gizmo` `createGizmo`

## 字段编辑器

字段编辑器允许您控制如何输入或选择参数值。字段编辑器是一个影子块，它调用选择 UI 元素、项目下拉列表或其他扩展输入方法的呈现。

使用具有字段编辑器名称的属性将字段编辑器附加到参数。在此示例中，打开或关闭 LED 的功能使用字段编辑器将开关元素显示为块参数 ` shadow` `toggleOnOff`

```typescript
/**
 * Toggle the LED on or off
 */
//% block="LED $on"
//% on.shadow="toggleOnOff"
export function ledOn(on: boolean) {}
```

### 内置字段编辑器

有现成的字段编辑器，它们是内置的，可以直接在块中使用：

- [Range](https://makecode.com/playground#field-editors-range)
- [Color Picker](https://makecode.com/playground#field-editors-color)
- [Toggle](https://makecode.com/playground#field-editors-toggle)
- [Time Picker](https://makecode.com/playground#field-editors-dropdowns)
- [Grid Picker](https://makecode.com/playground#field-editors-gridpicker)
- [Note](https://makecode.com/playground#field-editors-note)
- [Protractor](https://makecode.com/playground#field-editors-protractor)
- [Speed](https://makecode.com/playground#field-editors-speed)
- [Turn Ratio](https://makecode.com/playground#field-editors-turn-ratio)

### 自定义字段编辑器

如果要为块创建自定义字段编辑器，则需要为其定义阴影块。这是用作参数属性的名称。`blockId` `shadow`

以下是设置网球比赛分数的示例字段编辑器：

```typescript
/**
 * Get the score for a tennis game
 * @param score
 */
//% blockId=tennisScore block="$score"
//% blockHidden=true
//% colorSecondary="#FFFFFF"
//% score.fieldEditor="numberdropdown" score.fieldOptions.decompileLiterals=true
//% score.fieldOptions.data='[["Love", 1], ["15", 2], ["30", 3], ["40", 4], ["Game", 5]]'
export function __tennisScore(score: number): number {
  return score;
}

//% block="set game score $score"
//% score.shadow="tennisScore"
export function setScore(score: number) {}
```

通过设置为隐藏块。该参数设置了三个属性：`blockHidden` `true` `score`

- `fieldEditor` - 用于选择值的 UI 元素
- `fieldOptions.decompileLiterals` - 设置为以将值与其文字形式匹配。`true`
- `fieldOptions.data` - 选择下拉列表的名称与值匹配列表。>–或–
- `fieldOptions.values` - 可从中选择的简单值列表，如：> `vehicles.fieldOptions.values='[["truck"], ["airplane"], ["cruise ship"]]'`

**Playground 示例：**[自定义字段编辑器](https://makecode.com/playground#field-editors-dropdowns)

## 排序

所有块的默认权重为 50，用于在 UI 中对它们进行排序，权重最高的块首先显示。要调整[排序](https://makecode.com/playground#basic-ordering)，只需使用宏注释函数：`weight`

```typescript
//% weight=10
...
```

如果给定的 API 仅用于块，并且在 TypeScript 中没有太多意义（例如，因为有其他 TypeScript API），您可以使用 flag 来禁用在自动完成中显示它。 `//%` `hidden`

## 分组
要将块放入先前定义的组（请参阅本页顶部的[类别](https://makecode.com/defining-blocks#category)部分），请使用属性。组的名称必须与您在命名空间中定义的组之一完全匹配 `group`

> **提示：** 使用组功能时，块仅与同一组中其他块的权重进行比较。
```typescript
//% group="LED Matrix"
...
```

如果不想显示标签，可以使用 **blockGap** 宏手动将块分组在一起。它允许您指定工具箱中当前块与下一块之间的距离。与该参数相结合，它允许您直观地将块分组在一起，基本上复制了分组功能，但没有标签。默认值为。`weight` `blockGap` `8`
```typescript
//% blockGap=14
...
```

## 变量赋值
如果一个块实例化了一个自定义对象，比如一个精灵，那么用户很可能希望将其存储在一个变量中。添加以修改工具箱条目以包含变量。`blockSetVariable`

## 测试您的块
我们建议迭代构建块API，并在编辑器中试用，以获得“感觉”。要做到这一点，理想的设置是：-使用本地运行目标-保持打开TypeScript的代码编辑器，在那里可以编辑API-刷新浏览器并在虚拟程序上尝试更改`pxt serve`

有趣的是，您可以设计整个API而无需实现它！

## 弃用块
 要弃用现有API，可以添加 **deprecated** 的属性，如下所示：
 ```typescript
 //% deprecated=true
 ```
 这将导致API在TypeScript中仍然可用，但阻止块出现在Blockly工具箱中。如果用户尝试加载使用旧API的项目，则只要存在TypeScript API，该项目仍将正确加载。项目中任何已弃用的块都将显示在编辑器中，但不会显示在工具箱中。

 ## API设计提示和技巧
 为块编辑器设计各种API时收集了一些提示。

 - **为初学者设计：** 块接口适合初学者。您需要为此创建一个特定的类C函数层。
 - **用户将尝试捕捉到一起的任何操作：** 您的运行时应该处理具有优雅降级的无效输入，而不是突然崩溃。一些用户会尝试将任何东西都放在一起，做好准备。
 - **OO在块中很麻烦：** 们建议使用类似C的API，而不是OO类。它可以更好地映射到块
 - **保持较小的块数：** 工具箱里只有这么多空间。具体说明要在块中看到的每个API。