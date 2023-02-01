# pxtarget.json 手册页

PXT 目标由 JSON 文件描述。 下面是两个文件示例，一个简单，一个更复杂：`pxtarget.json` `pxtarget.json`

- https://github.com/microsoft/pxt-sample/blob/master/pxtarget.json
- https://github.com/microsoft/pxt-microbit/blob/master/pxtarget.json

JSON 文件由接口和 在顶层描述，如下所示。 注释中标记为“派生”的字段由来自其他来源的 PXT 填充， 如前所述。以下所有其他字段均由用户提供。可选字段的名称后有一个“？” `pxtarget.json TargetBundle AppTarget`

所有 PXT 目标还必须提供 NPM package.json 文件，该文件描述了构建目标所需的版本控制、依赖关系和资源。 您可以在此处找到 pxt-sample 和 pxt-microbit 的示例：

- https://github.com/microsoft/pxt-sample/blob/master/package.json
- https://github.com/microsoft/pxt-microbit/blob/master/package.json

下面详细介绍了如何[创建目标](/guide/target-creation)

## TargetBundle

该接口描述了捆绑的 PXT 软件包 与目标（而不是从 Web 中提取）以及语义 目标版本：`TargetBundle`

``` typescript
interface TargetBundle extends AppTarget {
    versions: TargetVersions;       // 定义目标的语义版本控制
    bundleddirs: string[];          // 打包到webapp中的包 (libs/*)
}
```
### versions: TargetVersions
PXT 使用其目标和包的[语义版本控制](http://semver.org/)。目标版本 界面有两个相关字段，填充如下：
``` typescript
interface TargetVersions {
    target: string; // 等同于 "package.json" 中的 version 字段
    pxt: string;    // 等同于 "package.json" 或 "node_modules/pxt-core/package.json" 中的 version 字段 
}
```

### bundleddirs： string[]
除了所需的“ corepkg”之外，目标还可以使用许多软件包。为了确保将扩展程序捆绑到Web应用程序中，您必须将其包含在此列表中。例如，在 http://github.com/microsoft/pxt-microbit/blob/master 中，我们看到：
``` typescript
"bundleddirs": [
    "libs/core",
    "libs/radio",
    "libs/devices",
    "libs/bluetooth"
],
```

这样可以确保将上述四个软件包被编译/捆绑到Web应用程序中，并在Web应用程序的初始下载中交付。micro:bit的其他软件包，例如 http://github.com/microsoft/pxt-neopixel 不捆绑并保留在github.com上，网络应用程序会根据需要加载它们（通常是通过“扩展”最终用户的要求）。

## AppTarget
大多数用户定义的字段都由接口描述。 ` pxttarget.json ` ` AppTarget `

``` typescript
interface AppTarget {
    id: string;             // 唯一ID：应匹配 ^[A-Z]+$;用于URL和域名
    name: string;           // 友好的名称(空间允许)
    corepkg: string;        // 指定目标核心API的目录（在libs/下）
                            // 这种库也称为包。请参见下面的部分进行描述。
    compile: CompileTarget; // 请参见下面的部分进行描述
    appTheme: AppTheme;     // 请参见下面的部分进行描述

    nickname?: string;      // 友好的ID（应匹配 ^[A-ZA-Z]+$）;生成文件时使用 
                            // 文件夹等。默认为ID
    platformid?: string;    // 在GitHub搜索包中用作搜索词；默认为ID

    title?: string;         // 用于HTML标题标签
    description?: string;   // 用于HTML META描述

    cloud?: AppCloud;       // 有关其余字段的描述，请参见下面的部分
    simulator?: AppSimulator;
    runtime?: RuntimeOptions;
    compileService?: TargetCompileService;
}

```

### corepkg: string
目标必须在目标的核心API所在的libs/目录下有一个核心包。核心包应始终与web应用捆绑在一起，如下所示：
``` typescript
"corepkg": "core",
"bundleddirs": [
    "libs/core"
]
```

### compile: CompileTarget
PXT支持对JavaScript和ARM机器代码（本机）的编译。纯Web目标不需要本机编译路径。
``` typescript
interface CompileTarget {
    isNative: boolean;      // false->仅用于模拟器的JavaScript汇编
    hasHex: boolean;        // 输出二进制文件（意味着isNative为true）
    nativeType?: string;    // 目前只有“thumb”，尽管AVR有一个原型
    // 输出文件选项
    useUF2?: boolean;       // true->输出UF2格式（请参阅 https://github.com/microsoft/uf2），false--> hex文件
    hexMimeType?: string;   // 十六进制文件的MIME类型
    driveName?: string;     // 通过MSD插入时，该设备将如何显示？
    deployDrives?: string;  // 应复制HEX/UF2文件的驱动器的部分名称
    // 代码生成选项
    floatingPoint?: boolean; // 在JavaScript中使用浮点（默认为32位整数）
    taggedInts?: boolean;    // true->在本机中使用带标记的整数（表示floatingPoint）
    shortPointers?: boolean; // true->16位指针
    flashCodeAlign?: number; // 默认为1K页面大小
    flashChecksumAddr?: number;  // 代码校验和的存储位置
    // 高级调试选项
    boxDebug?: boolean;     // 生成装箱调试代码
    jsRefCounting?: boolean;// 在JS中生成调试以进行参考计数方案
    openocdScript?: string;
}
```

### appTheme: AppTheme
PXT有大量选项用于控制目标的外观和感觉。以下是pxt示例中的appTheme，其中包含一些注释：
``` typescript 
"appTheme": {
    // 用于UI各种组件的URL
    "logoUrl": "https://microsoft.github.io/pxt-sample/",
    "homeUrl": "https://microsoft.github.io/pxt-sample/",
    "privacyUrl": "https://go.microsoft.com/fwlink/?LinkId=521839",
    "termsOfUseUrl": "https://go.microsoft.com/fwlink/?LinkID=206977",
    // 填充（？）菜单
    "docMenu": [
        {
            "name": "About",
            "path": "/about"
        },
        {
            "name": "Docs",
            "path": "/docs"
        }
    ],
    // 为Blockly和JavaScript启用工具箱
    "coloredToolbox": true,
    "monacoToolbox": true,
    "invertedMenu": true,
    "simAnimationEnter": "rotate in",
    "simAnimationExit": "rotate out"
}
```

### cloud?: AppCloud
PXT有一个云后端，为web应用程序提供一组服务。使用pxttarget.json中的字段配置服务，该字段由接口定义：` cloud ` ` AppCloud `

``` typescript
interface AppCloud {
    sharing?: boolean;      // 通过URL启用项目的匿名共享
    importing?: boolean;    // 启用从先前共享的项目中导入
                            // URL（需要共享？出版？）
    packages?: boolean;           // 启用了软件包的加载（来自github）
    preferredPackages?: string[]; // github上软件包的公司/项目列表（#tag）
    githubPackages?: boolean;     // 启用用户指定的术语以搜索github以获取软件包
    // 即将弃用
    publishing?: boolean;   // 必须设置为true才能导入？工作；没有其他明显的目的
    embedding?: boolean;
    // 当前不支持
    workspaces?: boolean;
}
```

例如，在http://github.com/microsoft/pxt-microbit的pxttarget.json 中，我们看到：
``` typescript
"cloud": {
    "workspace": false,
    "packages": true,
    "sharing": true,
    "publishing": true,
    "preferredPackages": [
        "Microsoft/pxt-neopixel"
    ],
    "githubPackages": true
}
```

### simulator?: AppSimulator
PXT在web应用程序的左侧提供了一个基于JavaScript的模拟环境（通常用于micro:bit等物理计算设备）。PXT使用[主板](https://makecode.com/targets/board)来表示模拟器中显示的主要物理计算设备。每个目标都有一个板（外加可选部件）。
``` typescript
interface AppSimulator {
    // define aspects of physical computing device
    boardDefinition?: BoardDefinition;
    // if true, boardDefinition comes from board package
    dynamicBoardDefinition?: boolean;
    // running and code changes
    autoRun?: boolean;          // automatically run program after a change to its code
    stopOnChange?: boolean;     // stop execution when user changes code
    headless?: boolean;         // whether simulator should still run while collapsed
    // buttons and parts
    hideRestart?: boolean;      // hide the restart button 
    hideFullscreen?: boolean;   // hide the fullscreen button
    parts?: boolean;            // parts enabled?
    instructions?: boolean;     // generate step-by-step wiring instructions (Make button)
    // appearance
    aspectRatio?: number;       // width / height
    partsAspectRatio?: number;  // aspect ratio of the simulator when parts are displayed
    // miscellaneous
    trustedUrls?: string[];     // URLs that are allowed in simulator modal messages
}
```
也可以在[主板](https://makecode.com/targets/board)封装中定义。` boardDefinition `

### runtime?: RuntimeOptions
此严重命名错误的选项控制Blockly编辑器中的可用块：
```typescript
interface RuntimeOptions {
    // control whether or not Blockly built-in categories appear
    mathBlocks?: boolean;       
    textBlocks?: boolean;
    listsBlocks?: boolean;
    variablesBlocks?: boolean;
    logicBlocks?: boolean;
    loopsBlocks?: boolean;
    // options specific to the special "on start" block
    onStartNamespace?: string; // default = loops
    onStartColor?: string;
    onStartGroup?: string;
    onStartWeight?: number;
    onStartUnDeletable?: boolean;
}
```

### compileService?: TargetCompileService
PXT提供了可能包含在目标/软件包中的C/C ++代码的编译服务。
当前，可以将此编译服务配置为使用[Yotta](https://www.mbed.com/en/platform/software/mbed-yotta/)或[Platformio](http://platformio.org/)。PXT默认使用Yotta和Platformio的本地安装。PXT希望在GitHub上找到C/C ++源。
```typescript
interface TargetCompileService {
    buildEngine?: string;           // default is yotta, set to platformio
    // where are the sources
    githubCorePackage?: string;     // e.g. lancaster-university/microbit
    gittag: string;
    // yotta configuration
    yottaCorePackage?: string;      // name for PXT use
    yottaTarget?: string;           // name of yotta target to build
    yottaBinary?: string;           // name of yotta output file 
    yottaConfig?: any;              // additional config
    // platformio configuration
    platformioIni?: string[];       // define contents of platformio.ini file
    serviceId: string;
}
```

#### uploadDocs and uploadApiStringsBranchRx
The flag determins if the API strings and docs have to be uploaded to crowdin when a build occurs on master or release branches.` uploadDocs `

The flag provide a custom regex for matching the branch where api strings should be uploaded. From a stable branch, this would be ` uploadApiStringsBranchRx  ` ` ^stable\d+\.\d+$ `


## 其他设置
### 模板项目
您可以添加或修改使用新项目创建的默认文件，方法是添加 一个名为（制作它）的库。 ` template ` ` hidden `