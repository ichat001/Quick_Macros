# 使用 COM 组件

## 关于 COM 组件

COM 组件（也称为 ActiveX 组件或 ActiveX 控件）提供多种实用功能。例如，Windows Script Host (Wsh) 组件提供文件、驱动器、网络等功能，这些功能在 QM 的内置函数中不可用。Web 浏览器控件可以在对话框中显示网页。使用 COM 组件只需最少的编程知识，通常可以直接从列表中选择功能，无需深入阅读帮助文档。

COM 组件主要分为两类：
- **ActiveX 控件**：提供图形用户界面，用于对话框。
- **非控件组件**：不可见，但提供各种实用功能。

ActiveX 控件通过 [Dialog Editor](IDH_DIALOG_EDITOR.html) 添加到对话框，非控件组件通过 [_create](IDP_COM_FUNC.html) 或其他函数创建。

大多数 COM 组件提供类型库（Type Libraries），包含组件提供的 coclass、接口和函数声明，使其可被 QM 等程序使用。

**相关内容**： [QM 中的 COM 支持](IDH_COM.html)

## COM 库对话框

“COM Libraries (Type Libraries, ActiveX Controls)” 对话框用于查看已注册的类型库，并可注册新组件或独立类型库。主要用途是查找组件的类型库并在当前宏中插入 [typelib](IDP_TYPELIB.html) 声明语句，以便在宏中使用组件。

### 功能
- **Find**：搜索类型库名称或控件名称，选中包含输入文本的下一个项目。
- **Insert declaration from list**：在当前宏中插入类型库声明。使用方法见下文“使用 COM 组件”部分。
- **Use file path**：勾选后，声明使用 [syntax2](IDP_TYPELIB.html)（文件路径），默认使用 syntax1（GUID）。
- **Insert declaration from file...**：定位类型库文件并插入声明语句，无需注册类型库或组件。
- **Register..., Unregister...**：注册（安装）或注销（卸载）dll 或 ocx 组件，以及包含类型库的任何文件。
- **Libraries**：查看已注册的类型库，包括 ActiveX 控件和其他 COM 组件的类型库。
- **Controls**：查看已注册的 ActiveX 控件，选择控件时显示其类型库信息（若有）。点击“Insert Declaration From List”插入类型库声明。
- **Preview**：预览选定控件的外观。部分控件需运行时调用函数激活，预览可能与运行时不同。
- **Add control to dialog**：将选定控件添加到对话框（在 Dialog Editor 中可用）。

对话框底部显示选定类型库文件的路径，若存在多语言类型库，可选择语言。右侧显示类型库信息：名称（可自定义）、coclass（COM 对象类型）和接口（可用函数集合）。

## 查找和安装 COM 组件

许多 COM 组件由 Windows 或应用程序安装，可在 QM 中使用。更多组件可在网上找到，但寻找免费、可靠的组件可能较困难，需注意组件的实用性、稳定性、依赖性及成本。

### 安装
- **已带安装程序的组件**：如普通软件安装，完成后可在 COM Libraries 对话框中找到类型库。
- **无安装程序的组件**（如 ocx 或 dll 文件）：使用 COM Libraries 对话框的 Register 按钮安装。
- **独立类型库**（tlb、olb、dll 文件）：使用 Register 按钮注册。
- **移动组件文件**：若移动文件位置，需重新注册（不会自动重新注册）。

已注册类型库可使用 GUID（[syntax1](IDP_TYPELIB.html)）或文件路径（syntax2）声明，未注册类型库只能使用文件路径。

**相关内容**： [RegisterComComponent](IDP_QMDLL.html#RegisterComComponent)

## 分发使用 COM 组件的宏

分发使用 COM 组件的宏时，需确保用户系统已安装该组件且版本兼容。宏要求用户拥有与 [typelib](IDP_TYPELIB.html) 声明中相同主版本号、相同或更高次版本号的类型库（包括 [exe 文件](IDH_MAKEEXE.html)）。可随宏一起分发组件。

### 注册
用户或安装程序需在目标计算机上注册组件：
- 使用 COM Libraries 对话框的 Register/Unregister 功能。
- 使用 [RegisterComComponent](IDP_QMDLL.html#RegisterComComponent) 函数。
- 对于 .NET COM 组件，使用 .NET 运行时文件夹中的 `regasm.exe`（详情可查阅网络）。

### 无需注册使用组件
QM 支持以下两种方式无需注册即可使用组件：
1. **QM 2.3.4**：在 [_create](IDP_COM_FUNC.html) 或 [dialog definition](IDH_DIALOG_EDITOR.html#a15) 中指定 dll/ocx 路径（不适用于 .NET 组件或某些特定组件）。
2. **QM 2.3.5**：使用 manifest 和 `__ComActivator` 类（适用于所有组件）。

### 自动下载示例
组件可通过 `DownloadComponent` 函数自动下载。例如：

```qm
typelib MSScript {0E59F1D2-1FBE-11D0-8FF2-00A0D10038BC} 1.0 0 1
#err MSScriptDownload
```

**MSScriptDownload 函数**：
```qm
lpstr s="$system$\msscript.ocx"
if(fileExists(s)) ret
int fa=&RegisterComComponent
mac "DownloadComponent" "" s "http://www.quickmacros.com/com/msscript.zip" "Microsoft Windows Script Control" 43 fa 6
ret -1
```

此代码在编译时运行。若类型库未安装，`typelib` 语句抛出错误，`#err` 触发 `MSScriptDownload` 函数下载并注册组件。但在 exe 文件中需在运行时检测组件缺失（如 `_create` 失败）。

## 使用 COM 组件

使用 COM 组件需先 [声明类型库](IDP_TYPELIB.html)。声明语句可置于当前宏、[init2](IDP_UDF.html) 函数或其他具有“QM file loaded”触发器的启动函数中。QM 已声明若干类型库，输入 `.` 时可在列表底部查看。

### 测试新组件
1. 创建新宏，使用 COM Libraries 对话框插入类型库声明。
2. 运行或编译宏（Ctrl+Shift+R）。
3. 输入类型库名称后加 `.`，查看可用类（列表顶部）。双击类名插入宏中。
4. 若为 ActiveX 控件类，QM 状态栏通常显示“;;;ActiveX control”。部分控件也可用作非控件组件，通过 [_create](IDP_COM_FUNC.html) 创建。

### 示例 1：安装和使用非控件组件
1. 在网上搜索 COM 组件（关键词如“COM component”、“ActiveX component”、“ActiveX DLL”、“ActiveX control”），下载。
2. 使用安装程序或 COM Libraries 对话框的 Register 按钮安装。
3. 在 COM Libraries 对话框中找到类型库，点击“Insert Declaration From List”，或使用“Insert Declaration From File”。
4. 运行或编译包含 [typelib](IDP_TYPELIB.html) 声明的宏（若在 [init2](IDP_UDF.html) 或启动函数中，自动编译）。
5. 输入类型库名称加 `.`，双击选择 coclass（选择与组件名称相关的类）。
6. 声明该类的变量，使用 [_create](IDP_COM_FUNC.html) 创建。
7. 输入变量名加 `.`，调用方法（绿色砖块图标）、属性（灰色图标）或设置 [事件](IDP_COM_EVENTS.html)（闪电图标）。

**示例**：
```qm
Excel.Application a._create
a.SomeMethod(arguments)
somevariable=a.SomeProperty
a.SomeProperty=somevalue
```

### 示例 2：安装和使用 ActiveX 控件
1. 搜索并下载 ActiveX 控件（关键词如“ActiveX control”）。
2. 同上安装。
3. 创建或打开智能对话框以放置控件。
4. 在 Dialog Editor 中点击“ActiveX controls...”，打开 COM Libraries 对话框。
5. 选择控件，点击“Add Control To Dialog”，若提示插入类型库声明，点击 Yes。
6. 控件或其占位符添加到对话框，可调整位置、大小或层级。
7. 设置事件：在 Dialog Editor 中点击控件并选择“Events”，插入接口指针变量声明和 [_getcontrol](IDP_COM_FUNC.html) 语句（置于 WM_INITDIALOG 下）。若在其他 case 语句中使用控件，需再次调用 `_getcontrol` 初始化变量。
8. 调用方法、属性或设置事件（同上）。

**示例**：参见 [Dialog Editor 示例](IDH_DIALOG_EDITOR.html)。