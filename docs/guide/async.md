# 异步和线程

## 背景

JavaScript 通常是单线程的（有 web 工作者和其他此类发明，但这些通常被认为是独立的进程，与主进程不共享地址空间）。如果函数需要等待某些输入（例如，web 请求），则需要提供一个回调函数，该函数在数据可用时执行。

```typescript
downloadData("https://example.com/", (err, data) => {
    if (err) { ... }
    else {
        let parsed = JSON.parse(data)
        ...
    }
})
```

当您开始嵌套这些时，这会有些问题。

解决这一问题的一种方法是使用 promise，但想法仍然不变-在处理程序中，您提供了数据可用时要执行的函数，但其优点是您通常可以避免嵌套它们（返回 promise 的函数通常按惯例调用）：`.then()` `somethingAsync`

```typescript
downloadDataAsync("https://example.com/")
    .then(data => {
        let parsed = JSON.parse(data)
        ...
    }, err => { ... })
    .then(() => downloadDataAsync("https://somewhere-else.com/"))
    .then(somewhere => ...)
```

有人建议将 C#-style 引入到 JavaScript。事实上，TypeScript 可以编译成 ES6 生成器（yield）。在这种情况下，您可以使用运算符使对 promise 返回函数的调用看起来是顺序的：`async` `await` `async/await` `await`

```typescript
let parsed = JSON.parse(await downloadDataAsync("https://example.com/"))
...
let somewhere = await downloadDataAsync("https://somewhere-else.com/")
...
```

不用说，这比前两种解决方案更容易理解，也更容易正确。事实上，它允许您模拟协作多线程——您认为您有多个线程，但在任何给定的时间只有一个线程运行，您可以确保您的线程在使用时不会被中断`await`

## Promise? Await? 又是什么循环? for

现在，所有这些都很好，但并不是你想向一个只想学习循环是什么的人解释的。`for`

因此，PXT 允许用户调用异步函数，就好像它们是常规函数一样。这会丢失线程可能中断的位置信息，但我们希望可以在 IDE 中恢复（例如，在异步调用旁边显示一个小时钟）。

```typescript
let parsed = JSON.parse(downloadData("https://example.com/"))
...
let somewhere = downloadData("https://somewhere-else.com/")
...
```

以这种方式支持异步函数是我们有自己的从 TypeScript 到 JavaScript 的编译方案的主要原因之一（跨浏览器调试器是另一个主要原因）。

## 实现异步函数

目前，要实现异步函数，首先需要向声明中添加属性：`//% promise`

```typescript
//? Downloads data from remote site.
//% promise shim=basic::downloadData
export function downloadData(url: string) {
  return "";
}
```

在模拟器中，您返回一个 promise：

```typescript
export function downloadData(url: string) {
  return new Promise<string>((resolve, reject) =>
    $.get(url, (data, status) => {
      resolve(data);
    })
  );
}
```
也可以使用和使用函数来获取回调。你可以看到一些旧代码这样做。`//% async` `getResume()`

注意，您可以从模拟器文件[生成TypeScript定义](https://makecode.com/simshim)，这将处理和注释。`//% promise` `//% shim=...`