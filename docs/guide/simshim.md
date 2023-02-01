# 自动生成库文件

PXT 用户可见的 API（作为 TypeScript 函数/类或块）公开了 C++库文件（在硬件目标的情况下）和 JavaScript 模拟器（运行时环境）中定义的行为。这些是在目标定义中`/libs`文件夹下的 TypeScript 文件（通常为 `.d.ts`）中定义的。让我们称这些为 **shim files**。

**shim files** 中的定义包括以`//%`开头的 JSDoc 注释和注释。特别是，`//%shim=foo:：bar` 表示当前函数应该映射到 C++函数 `foo:：bar`，也映射到模拟器函数 `pxsim.foo.bar`。

PXT 可以在硬件目标的情况下从 C++生成 **shim files**，也可以从模拟器源生成填充文件。在这两种情况下，PXT 将复制所有 JSDoc 样式的注释和`//%`注释，添加 `shim=...`注释，并适当地映射类型（例如，C++`int` 类型映射到 `number`，TypeScript `RefAction` 映射到`（）=>void`）。我们将复制的信息称为 API 元数据。

## 从 C++自动生成

对于硬件目标，API 元数据应该在 C++中定义，而不是在模拟器中定义。这主要是因为在 C++端调试不匹配比在 JS 端要困难得多。

构建目标时，根据`/libs`下的每个包生成 **shims**。**shims files** 称为`shims.d.ts`和`enums.d.ts`。 枚举是单独生成的，因此它们可以`＜reference…＞`来自模拟器源。

这两个文件都应该在`pxt.json`的`“files”`部分列出，我们还建议将它们签入 git。

PXT 为 C++片段实现了一个简单的解析器。这个解析器不会处理你抛出的所有东西。特别是，它是基于行的，不会很好地接受多行注释（文档注释除外）。要注释掉一段 C++代码，请使用`#if 0 .... #endif`结束符。

从 C++到 TypeScript 的[类型映射](https://makecode.com/cpp2ts)非常有限。例如，检查[microbit target](https://github.com/microsoft/pxt-microbit)。

## 从模拟器自动生成

这应用于仅针对软件的目标。

**shim file** 名为`sims.d.ts`，在构建目标时从`/sim/*.ts`生成。该文件将在目标的`“corepkg”`中生成。将来，我们可能允许在包之间进行拆分。类似地，对于 C++一代，`sims.d.ts`应该包含在`pxt.json`中并签入。

查看 [sample target](https://github.com/microsoft/pxt-sample)。

### 函数异步处理

名为`fooAsync`的函数（或方法）将公开为`foo`。它有望兑现承诺。这将生成`//%promise`注释，这将使编译器了解此调用约定。

### 传统异步处理

模拟器函数还可以使用`getResume()`获取回调函数，然后在函数应该恢复时调用结果函数。在这种情况下，需要包含`//% async` 注释。

## 模拟器实现

如果您在包中添加自己的 C++或汇编函数，并且您不能或不想向模拟器中添加相应的函数，则可以提供仅模拟器的实现。例如：

```typescript
/**
 *  Writes to the Bluetooth UART service buffer.
 */
//% blockId=bluetooth_uart_write block="bluetooth uart write %data" blockGap=8
//% shim=bluetooth::uartWrite
export function uartWrite(data: string): void {
  // dummy implementation for simulator
  console.log("UART Write: " + data);
}
```

请注意`shim=`注释。在 C++中，您可以得到以下内容：

```typescript
namespace bluetooth {
  //%
  void uartWrite(StringData *data) {
    // ...
  }
}
```

当 PXT 看到对带有`shim=`注释的函数的调用时，它将始终在本机编译中使用该 shim。在模拟器编译中，只有当函数没有主体或空主体时，才会使用**shim**。如果您不希望模拟器实现做任何事情，例如，可以将单个`return`语句作为主体。

## 索引的实例

暴露设备上引脚的典型模式如下：

```typescript
class DeviceIO {
  public:
    DevicePin pins[0];
    //% indexedInstanceNS=pins indexedInstanceShim=pins::getPin
    //%
    DevicePin A0;
    //%
    DevicePin A1;
    ...
};

namespace pins {
  DeviceIO io;
  //%
  DevicePin *getPin(int id) {
    // ... add range checking ...
    return &io.pins[id];
  }
}

namespace DevicePinMethods {
  //% blockId=device_get_digital_pin block="digital read|pin %name" blockGap=8
  //% blockNamespace=pins
  int digitalRead(DevicePin *name) {
    return name->getDigitalValue()
  }
  ...
}
```

`indexedInstanceShim`生成`shim=...(no)`注释。它们指示将对变量（只读）的访问编译为对具有特定文字参数的指定函数的调用。将自动为[块](https://makecode.com/defining-blocks#Fixed-Instance-Set)生成`fixedInstance`注释。

名称空间`FooMethods`被转换为`interface Foo`。这些通常用于包装不需要引用计数的本机 C++类。因此，您还需要手动添加以下 TypeScript：

```typescript
interface DevicePin {
  // no methods needed, they come from C++
}
```

如果您不这样做，运行时将调用不存在的方法，混乱将占上风（即使您在开始时可能看不到）

也可以在这样的声明中指定继承：

```typescript
interface AnalogPin extends DigitalPin {}
```

## 从 TypeScript 配置实例

上面的`indexedInstanceShim`方法在 C++中定义实例集（例如 pin）时工作良好。然而，有时您会希望在 TypeScript 端定义这些，这可能会限制代码大小，并允许在不更改 C++代码的情况下更改定义（从而避免云重新编译）。

这非常有用，特别是当一个目标中定义了多个板时。[核心板包](https://makecode.com/targets/board)至少包含两个配置文件。这里，我们使用`device.d.ts`和`config.ts`，但您可以将它们称为其他名称。

然后，您可以使用以下内容：

```typescript
// In device.d.ts
declare namespace pins {
  //% fixedInstance shim=pxt::getPinById(PIN_A0)
  const A0: PwmPin;
  //% fixedInstance shim=pxt::getPinById(PIN_A1)
  const A1: PwmPin;
  // ...
}
```

C++函数`pxt::getPinById(int pinId)`将查找给定其硬件名称的 pin 对象，如果尚未分配对象，则首先分配该对象。

`PIN_A0`等的定义位于`config`命名空间中：

```typescript
// In config.ts
namespace config {
  export const PIN_A0 = DAL.PA02;
  export const PIN_A1 = DAL.PB08;
  // ...
  export const NUM_NEOPIXELS = 1;
  // ...
}
```

您还可以配置管脚名称和其他硬件特性，如板载 neopixes 的数量等。

用户可以使用`userconfig`命名空间重写常量。例如：

```typescript
// In main.ts or other user file
namespace userconfig {
  // My board has PIN_D2 and PIN_D4 swapped!
  export const PIN_D2 = DAL.PA08;
  export const PIN_D4 = DAL.PA14;
}
```

这两个都引用 `DAL` 命名空间中的常量。每个目标通常有一个 `dal.d.ts` 文件，用于定义 `DAL` 名称空间，它是从 C++源自动生成的。一旦所有 C++文件都到位，并且您希望强制重新生成 `dal.d.ts`，请使用 `pxt builddaldts` 命令。

对于`config`（或`userconfig`）中的每个常量FOO，必须有一个对应的`DAL.CFG_FOO`，该`DAL.CFF_FOO`定义了存储配置设置的索引。设置的索引可以是任何32位数字，但它们在目标中应该是唯一的。这些通常在C++头文件中定义：
```c
#define CFG_PIN_A0 100
#define CFG_PIN_A1 101
#define CFG_PIN_A2 102
// ...
#define CFG_NUM_NEOPIXELS 200
// ...
```

在C++端，使用`pxt::getConfig(CFG_PIN_A0)`访问设置`PIN_A0`。

注释中的参数如`shim=pxt::getButtonByPin(PIN_A5,BUTTON_ACTIVE_LOW_PULL_UP)`在`DAL`命名空间中解析，然后在`userconfig`和`config`中解析。它们必须解析为整数常量。