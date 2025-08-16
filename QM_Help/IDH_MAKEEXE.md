# 创建 EXE 文件

## 概述
默认情况下，宏在 Quick Macros（QM）中运行，但也可将其编译为独立的可执行文件（EXE）。EXE 文件无需 QM 即可运行，适合分发。相比在 QM 中运行的宏，EXE 不依赖 QM 版本，兼容性更强。

- **创建方式**：在菜单“运行 -> 创建 EXE”中，从当前宏或函数生成 EXE。
- **分离进程**：通过“创建 EXE”功能可[运行宏于分离进程](#run-in-separate-process)。QM 会生成 .qmm（编译宏）或 .exe 文件并在独立进程中运行。因此，术语“EXE”或“程序”通常指“.exe 文件或在分离进程中运行的宏”。

## 选项
- **Main**：程序启动时运行的主宏或函数。
- **Make**：创建的程序文件，可为 .exe 或 .qmm（用于分离进程运行）。
- **Icon**：程序图标，也用于对话框等。支持 .ico、.exe、.dll、.ocx 文件，可指定图标索引（如 `shell32.dll,18`）。
- **Manifest**：清单文件（可选，推荐使用）。默认使用 `default.exe.manifest`，启用视觉样式（美化对话框）。清单还指定 UAC 权限（详见[UAC](#uac)）。
- **.res**：可选的 .res 文件，包含添加到 EXE 的[资源](#resources)。
- **Auto add files**：自动添加 EXE 宏/函数中使用的文件到[资源](#resources)，仅限指定资源 ID 的文件（如 `scan ":10 $my qm$\file.bmp"`）。
- **Version**：文件版本及其他信息，格式为 `1`、`1.2`、`1.2.3` 或 `1.2.3.4`。“版本信息”对话框可包含任意内容。
- **End hotkey**：终止程序的热键。注意：
  - 仅单一程序可使用该热键，若已有其他程序或快捷方式占用则无效。
  - 若宏使用键盘/鼠标命令，避免使用带修饰键（Ctrl、Shift、Alt）的热键，以防用户按下的修饰键与宏按下的键/按钮混淆，导致不可预料的结果。
- **创建 EXE 时运行函数**：
  - **Before**：创建 EXE 前调用的函数，路径通过 `_command` 变量传递。QM 等待其运行，需返回非 0 值，否则报错。可用于关闭正在运行的程序（可用 `MakeExeCloseRunning` 函数）。
  - **After**：EXE 创建成功后调用的函数，需返回非 0 值。可用于将 EXE 添加到 ZIP 文件。示例：
    ```cpp
    str s1 s2
    ;; EXE 文件
    s1=_command
    ;; 其他文件
    s2=
     $qm$\a.ico
     $qm$\b.bmp
     $qm$\c.dll
    s1.from(s1 "[]" s2)
    ;; 添加到 ZIP
    zip "$my qm$\myexe10.zip" s1
    ret 1
    ```
  - **On Run**：从 QM 启动程序时运行的函数，QM 不直接运行程序。可用于带命令行运行程序。示例：
    - .exe 文件：`run _command "/command line"`
    - .qmm 文件：`run "qmmacro.exe" F"''{_command}'' /command line"`
    - 也可用 `mac` 传递命令行或参数。
- **调试**：
  - **Show added items**：在输出中显示添加的函数、文本项目、ActiveX 控件类及图像文件。
  - **Run immediately**：创建程序后自动运行程序或“On Run”函数。
  - **Output to QM**：若 QM 运行中，显示程序输出（`out`、运行时错误等）。若未勾选，`out` 无效果，除非重定向（使用 `RedirectQmOutput`、`ExeOutputWindow` 或 `ExeConsoleRedirectQmOutput`）。未勾选或重定向时，运行时错误显示为定时消息框。
  - **Go to error**：若 QM 运行中，显示程序运行时错误（打开函数并定位错误处）。需确保函数自上次创建 EXE 未修改或重命名。
  - 注：后两项即使在其他安装了 QM 的电脑上运行 EXE 也有效。
- **Console**（QM 2.4.1）：创建控制台 EXE，拥有控制台窗口或使用父进程（如 cmd.exe）的控制台。cmd.exe 不等待非控制台进程结束。示例：
  ```cpp
  SetConsoleTitle "QM test console"
  ExeConsoleRedirectQmOutput ;; 重定向 out 等到 ExeConsoleWrite
  ARRAY(str) a; int i
  ExeParseCommandLine _command a
  for(i 0 a.len) out a[i]
  ExeConsoleWrite "Type something and press Enter"
  str s
  ExeConsoleRead s
  ExeConsoleWrite F"s=''{s}''"
  2
  ```
- **宏/函数属性**：创建 EXE 时应用“仅允许单一实例”（函数）和“禁止运行/等待/终止”（宏）属性。

## 注意事项
### 保存设置
首次创建 EXE 时，可选择将设置保存在当前宏或文件夹中。若 EXE 包含多个文件夹中的函数，建议保存在文件夹，之后打开任一相关函数时使用该设置。文件夹名应与程序名一致（如 `X Editor`），用于错误消息框等。EXE 设置可在文件夹属性对话框中查看。

### 运行 EXE
- 可通过常规方式运行（如在资源管理器中双击）。
- 点击“运行”按钮时，宏在 QM 中运行，需勾选[分离进程运行](#run-in-separate-process)以运行 EXE。

### 源代码
- 创建 EXE 时，QM 编译主函数及所有使用的函数（包括通过 `mac` 创建的线程），编译代码添加到 EXE。源代码默认不添加，除非运行时需提取文本（见下文）。可用 [#exe](../Language/IDP_DIR_EXE.html) 显式添加函数或数据。勾选“显示添加项目”查看添加内容。
- 若宏/函数包含对话框定义（用于 `ShowDialog`）、菜单定义（用于 `ShowDialog` 或 `DT_CreateMenu`）或其他语言脚本（用于 `CsExec`、`CsFunc`、`CsScript.AddCode` 等），完整源代码会添加到 EXE。为避免此情况，将定义存储在单独宏或变量中。示例：
  - 源代码添加（因需提取对话框定义）：
    ```cpp
    BEGIN DIALOG
     0 "" 0x90C80AC8 0x0 0 0 224 136 "Dialog"
     1 Button 0x54030001 0x4 116 116 48 14 "OK"
     2 Button 0x54030000 0x4 168 116 48 14 "Cancel"
    END DIALOG
    if(!ShowDialog("This Macro" 0 0)) ret
    ```
  - 源代码不添加（对话框定义在变量中，仅添加定义字符串）：
    ```cpp
    str dd=
     BEGIN DIALOG
      0 "" 0x90C80AC8 0x0 0 0 224 136 "Dialog"
      1 Button 0x54030001 0x4 116 116 48 14 "OK"
      2 Button 0x54030000 0x4 168 116 48 14 "Cancel"
     END DIALOG
    if(!ShowDialog(dd 0 0)) ret
    ```
- EXE 不可反编译查看未作为文本添加的源代码，但可看到源代码中的字符串。可在“选项 -> 安全”中加密包含密码或其他敏感信息的字符串。

### 外部文件
- 外部文件（如 DLL）不自动添加到 EXE，需与 EXE 一起分发（如放入 ZIP 或安装程序），并提取到同一文件夹。也可作为[资源](#resources)添加（如 `ExeQmGridDll` 函数，代码可查看）。
- 必要文件（从 QM 文件夹获取）：
  - `qmgrid.dll`：若 EXE 使用 [QM 网格控件](../User/IDP_QMGRID.html)，可用 `ExeQmGridDll` 添加。
  - `qmtc32.dll`、`qmtc64.dll`：若 EXE 使用 `WindowText` 类。
  - `sqlite3.dll`：若 EXE 使用 `Sqlite` 类。
  - `mailbee.dll`：若 EXE 使用 QM 邮件函数（如 `SendMail`、`ReceiveMail`、`SmtpMail`、`Pop3Mail`）。
  - `arservicesmgr.dll`：若 EXE 使用 Services 类型库函数。
  - `tcc` 文件夹：若 EXE 使用 `__Tcc` 类（C 编译器）。
- 若 EXE 在安装了相同版本 QM 的电脑上运行，可从 QM 文件夹查找这些文件，无需复制到 EXE 文件夹。若 DLL 路径以 `$qm$` 开头且不在 EXE 文件夹，EXE 会在 QM 文件夹搜索。
- QM 2.3.4：`mailbee.dll` 和 `arservicesmgr.dll` 为 COM 组件，无需注册。

### 创建安装程序
- 使用安装程序软件（如 [Inno Setup](http://www.jrsoftware.org/isinfo.php)）创建包含 EXE、DLL、帮助文件等的压缩安装程序，运行安装向导、创建文件夹、提取文件、创建快捷方式及卸载程序。推荐使用 Inno Setup QuickStart Pack（Unicode 版），以 `Example1.iss` 为例创建脚本。QM 安装程序也使用 Inno Setup。

### 错误
- **编译时错误**（如“未知标识符”）在 EXE 中不发生，因 EXE 包含已编译代码。声明、类型库等引用不用于 EXE（创建时已包含所需信息）。但若缺少所需的 [DLL 函数](../Language/IDP_DLL.html) 或 COM 组件，程序会失败。可用[版本变量](../Language/IDP_SPECVAR.html)和延迟加载（`dll- ...`）检查 DLL 函数存在性，用 `err` 处理“无此接口支持”错误。
- **运行时错误**（如“窗口未找到”）未处理时，程序退出，错误显示在 QM 输出或消息框（取决于“输出到 QM”选项）。另见 `ExeOutputWindow` 和 [RedirectQmOutput](../User/IDP_QMDLL.html#RedirectQmOutput)。

### 全局变量与设置
- 若使用在 QM 启动时初始化的全局变量（如 `init2` 函数），需在 EXE 中添加初始化代码，否则变量为空。可在主函数开头调用初始化函数，使用 `#if EXE` 跳过 QM 中的执行。无需为[预定义全局变量](../Language/IDP_SPECVAR.html)或构造函数初始化的变量这样做。若使用 [RtOptions](../User/IDP_QMDLL.html#RtOptions) 更改运行时设置，也需在 EXE 中应用。

### 单一实例
- 若主函数勾选“仅允许单一实例”或宏设置“禁止运行/等待/终止”，程序仅允许单一实例运行。若需更多控制（如将命令行传递给已有实例），使用 [mutex](http://www.google.com/search?q=site%3Amicrosoft.com%20synchronization%20objects)。示例：
  ```cpp
  ;; 在 EXE 主函数开头
  SetLastError 0
  __Handle m=CreateMutex(0 1 "mutex_my_exe")
  if(!m) mes- "Error"
  if(GetLastError=ERROR_ALREADY_EXISTS) ;; 已有实例运行
  	;; 可在此执行代码
  	ret ;; 退出 EXE
  ```
- 注：`getopt nthreads` 无效。

### 命令行参数
- 程序启动时的命令行参数存储在 [_command](../Language/IDP_SPECVAR.html) 变量，可用 `ExeParseCommandLine` 解析。

### 退出代码
- 成功：主函数返回值（应为 0 或正数）。
- 失败：
  - -1：运行时错误导致主函数结束。
  - -2：另一实例已在运行。
  - -3：外部终止（如热键）。
  - -4：无法启动（如缺少 DLL 函数）。

### 线程
- 主函数不在 EXE 进程的主线程运行，QM 使用主线程管理线程及其他服务，主函数在单独线程执行。
- 可用 `mac` 创建更多线程，EXE 进程在主函数线程结束时终止，主线程可用 `WaitForThreads` 等待其他线程。
- `OnScreenDisplay`、`MsgBoxAsync`、`Play`、`Speak` 和 `mac` 为异步运行，主线程可用 `wait 0 H` 或 `WaitForThreads` 等待，部分函数支持同步标志。
- 使用 `shutdown -6` 终止 EXE 进程中的线程，不影响 QM 或其他进程；`shutdown -1` 从任意线程终止 EXE 进程。
- 全局变量的构造函数和析构函数在主线程运行。

### 触发器
- EXE 无法使用 QM 触发器（除非 QM 运行并使用其触发器）。
- 使用热键启动 EXE：创建桌面或开始菜单快捷方式，在快捷方式属性对话框设置热键。为避免 Ctrl/Shift/Alt 与 EXE 按下的键混淆，宏生成的 EXE 在执行前等待这些键释放；函数生成的 EXE 不等待，可在开头添加：
  ```cpp
  rep() if(GetMod) 0.02; else break
  ```

### 获取 EXE 文件路径
- 使用 [_qmdir](../Language/IDP_SPECVAR.html) 或 `ExeFullPath`。

### EXE 文件大小
- QM 创建的 EXE 最小约 400 KB。

### 速度
- QM 创建的程序与 QM 中的宏/函数运行速度相同，但非原生机器代码，某些情况（如与 C++ 程序相比）较慢。

### 创建 DLL
- QM 仅能创建 EXE，可使用 `__Tcc` 类以 C 语言创建 DLL。

### 支持的 Windows 版本
- QM 创建的程序支持 Windows 7、8、10、11（详见[UAC](#uac)）。

## 资源
**另见**：[宏资源](../Other/IDP_RESOURCES.html)。注意：EXE 资源不同于宏资源，但宏资源在创建 EXE 时自动转换为 EXE 资源。

- **资源定义**：添加到 EXE 的文件或其他数据，如位图、图标、光标、菜单、加速器、字符串、版本信息、二进制数据等。可分发文件与 EXE（如 ZIP 文件）或作为资源添加。
- **自动添加文件**：若勾选“自动添加文件”，QM 搜索 EXE 宏/函数源代码中形如 `:resourceid filepath` 的字符串，将文件添加为资源。例如：`scan ":10 file.bmp"`。资源类型如下：

| 文件类型 | 资源类型 | 显式加载 | 显式释放 | 备注 |
|----------|----------|----------|----------|------|
| bmp | Bitmap | [LoadPictureFile](../User/IDP_QMDLL.html#LoadPictureFile)（返回位图句柄） | `DeleteObject` | |
| ico | Icon | [GetFileIcon](../User/IDP_QMDLL.html#GetFileIcon)（返回图标句柄） | `DestroyIcon` | |
| cur | Cursor（QM 2.3.0） | [GetFileIcon](../User/IDP_QMDLL.html#GetFileIcon)（标志 4，返回光标句柄） | `DestroyCursor` | |
| exe, dll, ocx, icl | Icon（QM 2.3.0） | [GetFileIcon](../User/IDP_QMDLL.html#GetFileIcon)（返回图标句柄） | `DestroyIcon` | 需指定图标索引或负资源 ID（如 `:10 shell32.dll,15`），否则以 `RT_RCDATA` 添加整个文件。 |
| gif, jpg, png | RT_RCDATA（QM 2.3.0） | [LoadPictureFile](../User/IDP_QMDLL.html#LoadPictureFile)（加载为位图，返回位图句柄；QM 2.3.4 支持 png） | `DeleteObject` | 可用于对话框静态图片控件，在 `ShowDialog` 前赋值 `:resourceid filepath`。 |
| ani | RT_ANICURSOR（QM 2.4.1） | [GetFileIcon](../User/IDP_QMDLL.html#GetFileIcon)（标志 4，返回光标句柄） | `DestroyCursor` | 旧版 QM 为 `RT_RCDATA`。 |
| 其他 | RT_RCDATA（QM 2.3.0） | [str.getfile](../str/IDP_S_FILE.html) 或 `ExeGetResourceData`（加载原始数据） | 无需释放 | |

- **资源 ID**：1 至 0xFFFF，文件名扩展名需 1-4 个字母数字字符，字符串不得在注释、#if 排除代码或 F"string" 中。
- **支持 `:resourceid filepath` 语法的 QM 函数**：
  - `ShowDialog`（标题栏图标、图标、位图、图像列表）
  - [scan](../Functions/IDP_SCAN.html)（bmp、icon）
  - [GetFileIcon](../User/IDP_QMDLL.html#GetFileIcon)（icon、cursor）
  - [LoadPictureFile](../User/IDP_QMDLL.html#LoadPictureFile)（bmp、gif、jpg、png）
  - [str.getfile](../str/IDP_S_FILE.html)
  - `IXml.FromFile`
  - `ICsv.FromFile`
  - `CsScript.Load`
  - `RichEditLoad`
  - [bee](../Commands/IDP_BEE.html)（QM 2.3.4）
  - `__ImageListLoad`
  - `__ImageList.Load`
  - `__ImageList.Create`
  - `ShowDropdownList`
  - 及使用它们的函数。
- QM 2.3.0：在 QM 中运行时，始终从文件获取 `:resourceid filepath` 数据，旧版会尝试从 EXE 获取。
- QM 2.3.1：支持多行字符串。示例：
  ```cpp
  str multiline=
   :206 $qm$\keyboard.ico
   :207 $qm$\mouse.ico
  ```
- **其他添加方式**：使用 [#exe addfile](../Language/IDP_DIR_EXE.html) 或资源编辑器创建 .res 文件，在“创建 EXE”对话框指定，QM 将其资源添加到 EXE。加载时使用 `:resourceid`（如 `:300`）。
- **更新资源**：编辑添加的文件后需重新创建 EXE。
- **Windows API**：可用 `LoadImage`、`FindResource` 等加载资源，获取资源模块句柄用 [GetExeResHandle](../User/IDP_QMDLL.html#GetExeResHandle)。示例：
  ```cpp
  int hi=LoadImage(GetExeResHandle +133 IMAGE_ICON 0 0 0)
  ```
- **注意**：不建议使用对话框资源，QM 可创建对话框，资源无法使用 `ShowDialog` 的附加功能（如控件变量）。菜单也可在 QM 创建。
- **默认资源**：EXE 默认包含图标（ID 1，若指定图标文件）、清单（ID 1，若指定清单文件）、版本信息（ID 1，若指定版本或其他信息）。QM 2.3.0：EXE 图标资源 ID 从 133 改为 1。
- **图标**：默认使用主函数图标，其他 QM 项目图标不自动添加，EXE 中对话框使用相同图标。可在 `ShowDialog` 中显式指定图标文件（如 `:resourceid filepath`）。

## 不可用功能
以下功能在 EXE 中不可用，主要涉及 QM 项目和界面或依赖 QM 钩子、服务等：
- **函数**：`deb`、`dis`、`newitem`、`str.setmacro`、部分 [QM DLL 函数](../User/IDP_QMDLL.html)、`\System\Functions\Qm\unavailable in exe` 文件夹中的函数。
- **部分功能**：
  - `mac`：仅启动函数，无法打开项目 (+)。
  - `qmitem`：仅获取项目 ID。
  - `str.getmacro`：仅获取文本和名称。
  - `wait x KF`：等待按键并吃掉。
  - `_error.line`：为空。
  - `end` 标志 3：等同无标志 3。
  - `shutdown -2, -3, -4, -5`：运行时失败。
  - `str.encrypt` 算法 16：运行时失败。
  - `EnsureLoggedOn`：无法解锁（锁定时返回 0）。
- QM 在创建 EXE 时检测不可用函数及 `mac`、`qmitem`、`str.getmacro`、`wait` 的不可用功能。
- **其他**：
  - 菜单、工具栏、自动文本列表，仅宏、函数、成员函数可添加到 EXE，其他项目仅作为文本添加（用于 `str.getmacro` 等）。
  - QM 用户界面（编辑器、输出、录制、托盘图标等）。可用 `AddTrayIcon` 添加托盘图标，用 `ExeOutputWindow` 或 [RedirectQmOutput](../User/IDP_QMDLL.html#RedirectQmOutput) 查看输出。
  - 源代码。
  - 触发器。
  - QM 命令行参数。
  - 选项对话框中的声音及其他设置。
  - COM 组件自动注册，分发时可用 [RegisterComComponent](../User/IDP_QMDLL.html#RegisterComComponent) 安装（需管理员权限），或[无注册使用 COM 组件](../_COM/IDP_COM_USAGE.html)。
  - 富文本编辑 DLL 仅在对话框或 `CreateControl` 使用富文本控件时加载，可用 `LoadLibrary("Riched20")` 加载。[QM_Grid 控件](../User/IDP_QMGRID.html) 同理。
  - `net` 可用于在 QM 中运行宏，但 EXE 不可被控制（仅作 TCP 客户端，非服务器）。
  - 无法解锁锁定的电脑（属性 -> 通用 -> 解锁 ...）。

## 差异功能
- [预定义变量](../Language/IDP_SPECVAR.html) 在 EXE 中的值可能不同。
- [预定义常量](../Language/IDP_SPECVAR.html) 及所有常量使用创建 EXE 时的电脑值，而非运行时的电脑值。
- 特殊文件夹 `$qm$` 为 EXE 文件路径，非 qm.exe 路径。
- 特殊文件夹 `$my qm$` 在运行 EXE 的电脑上可能不存在。
- 部分函数实现不同，可能行为略有差异：
  - `run` 标志 0x10000 和 0x20000（以管理员运行）。
  - `web`。
  - `key`：可能较慢或可靠性较低。

## UAC
Windows Vista 及以上版本的**用户账户控制（UAC）**限制程序权限，即使在管理员账户下，大多数程序仅具标准用户权限，可能导致无法写入某些文件系统/注册表位置、操作服务或与高权限程序交互（键盘、鼠标、菜单命令、消息、钩子等）。QM 可与所有程序交互，但 QM 创建的程序可能受 UAC 影响（详见[此处](../Other/IDP_VISTA.html)）。

- 默认程序以标准权限运行，可自动化标准权限程序。若需自动化高权限程序（管理员或 uiAccess）或执行高权限操作，需以管理员或 uiAccess 运行。
- 通过清单资源指定权限，包含标签：
  - 默认：`level="asInvoker" uiAccess="false"`（普通权限）。
  - 其他 `level` 值：`highestAvailable`、`requireAdministrator`。
  - `uiAccess`：`false` 或 `true`（uiAccess 需代码签名，证书费用 100-500 美元/年）。
- 更多 UAC 和 MS Authenticode 签名信息可查阅网络或在 [Quick Macros 论坛](http://www.quickmacros.com/forum/index.php) 咨询。
- 另见：[GetProcessUacInfo](../User/IDP_QMDLL.html#GetProcessUacInfo)、[分离进程运行](#run-in-separate-process)。

## 分离进程运行
默认宏在 QM 进程中运行，勾选“属性 -> 分离进程运行”后，宏在独立进程中运行，适用于宏和函数。

- 启动时，QM 创建并执行 .qmm 或 .exe 文件，默认使用 .qmm，可在“创建 EXE”对话框改为 .exe 并调整设置。
- 若文件已存在，QM 检查宏和文件时间，必要时重新创建。若设置存储在文件夹，检查文件夹内所有宏/函数。若宏间接使用其他文件夹的函数，编辑后需重新创建（通过“创建 EXE”对话框或编辑/运行宏）。
- **用途**：调试 EXE 时，点击“运行”按钮即可，无需手动“运行 -> 创建 EXE”和“运行 -> 运行 EXE”。生成的 EXE 与菜单创建的完全相同。若初始为 .qmm，需改为 .exe。
- **UAC 完整性级别（IL）**：
  - 进程 IL 在启动时分配，无法更改。QM 可运行于管理员（High IL）、普通用户（Medium IL）或 uiAccess（Medium+uiAccess IL），在“选项”中设置。分离进程的宏可运行于：
    | 值 | 级别 | 说明 |
    |----|------|------|
    | 0 | 与 QM 相同 | 与 QM 的 IL 相同。 |
    | 1 | 用户 | Medium IL，即使 QM 为管理员。 |
    | 2 | 管理员 | High IL，非管理员账户需密码对话框。 |
    | 3 | 最高可用 | 管理员账户为 High IL，非管理员账户与 QM 相同。 |
    | 4 | 低 | Low IL，如受保护模式的 Internet Explorer。 |
    | 5 | 与 QM 相同，禁用 uiAccess | 与 QM 的 IL 相同，但无 uiAccess 权限。 |
  - QM 使用 [StartProcess](../User/IDP_QMDLL.html#StartProcess) 运行不同 IL 的 EXE，宏中也可使用（EXE 中除外）。
  - 若 UAC 关闭，EXE 与 QM 权限相同（“管理员”除外，在非管理员账户也适用）。非管理员账户下，IL 不同于 QM 时，EXE 可能以其他用户运行，可能影响用户特定文件夹（如 `$personal$`、`$my qm$`）和注册表键。若无法运行，尝试将 EXE 路径改为公共文件夹（如 `$common appdata$\qmexe`）。
  - 属性中的 UAC IL 仅在 QM 像宏一样启动 EXE 时应用，通过 `run` 或双击 EXE 图标时无效。可勾选“分离进程运行”，创建快捷方式并使用快捷方式应用。
  - [便携版 QM](../Other/IDP_PORTABLE.html) 有一定限制。
- **命令行**：
  - 使用 `mac` 启动宏时，可传递命令行，主 EXE 线程通过 `_command` 变量接收。也可传递字符串和数字参数（使用 `function`），勿传递指针和引用：
    ```cpp
    mac "macro name" "command line" 5 "string arg"
    ```
  - QM 在 QM 中创建线程管理 EXE 进程（显示运行宏图标、暂停终止等），列于“运行项目”列表和“线程”对话框。终止线程或通过暂停终止宏会结束进程。若 `mac` 用作函数（赋值给变量），返回线程句柄，调用宏可等待其结束：
    ```cpp
    int h=mac("macro name")
    wait 0 H h
    ```
    - 注：若宏和调用者均为宏，此功能无效，至少其一需为函数。
  - 若使用“On Run”函数，其首个参数接收命令行和参数，`_command` 包含 EXE 路径。函数需运行 EXE 并等待其退出（如 `run` 带标志 0x400，或 `StartProcess` 结合 `wait`），否则 QM 无法管理进程，且应在进程结束后尽快退出：
    ```cpp
    function# $ca
    run _command ca "" "" 0x400
    ```
- **例外**：以下情况即使勾选“分离进程运行”也不生效：
  1. 函数从代码调用。
  2. 函数从 EXE 启动（通过 `mac`）。
  3. 函数由 QM 启动/退出触发器同步启动。
  4. 函数以特殊方式（如过滤函数）被 QM 调用。
- 分离进程运行的宏部分功能不可用或不同（如全局变量不跨进程共享）。

### .qmm 文件
- .qmm 文件包含编译宏及相关资源，非可执行文件，从 QM 运行分离进程宏时由 `qmmacro.exe` 执行。不建议直接运行，因 .qmm 文件版本需匹配 `qmmacro.exe`。
- .qmm 文件格式同仅资源 DLL，可用作图标库。

### 防病毒软件问题
- **延迟启动**：分离进程宏可能因防病毒软件扫描 .exe、.qmm 或 `qmmacro.exe` 而延迟。
- **运行异常**：使用 .exe 的分离进程宏可能被防病毒软件警告或终止（如 Avast 放入沙箱）。建议将 EXE 文件夹（My QM）和 QM 文件夹加入防病毒软件的扫描/沙箱排除列表，或调整沙箱设置。

## 许可
使用 Quick Macros 创建、使用和分发程序无限制。