# 等待特定事件

**另见**：[wait](IDP_WAIT.md)

## 事件

- [等待窗口](#aw)
- [等待窗口名称](#aw_wt)
- [等待按键](#ak)
- [等待鼠标](#am)
- [等待 CPU](#ap)
- [等待句柄](#ah)
- [等待多个句柄](#ahm)
- [等待变量](#av)
- [等待网页](#ai)
- [等待光标（鼠标指针）](#acu)
- [等待颜色](#ac)
- [等待屏幕图像](#as)
- [等待其他事件](#aother)

## 语法（适用于所有事件）

```qm
[wait ]timeS event [...]
```

作为函数使用：

```qm
int wait(timeS event [...])
```

## 参数

- **timeS** - 最大等待时间（秒）。可为整数（如 5）或浮点数（如 0.5）。
- **event** - 以下描述的字面量之一（WA 等）。
- **...** - 更多参数，取决于 **event**。

## 备注

- 若 **timeS** ≤ 0，则无限等待。
- 若 **timeS** > 0，则最多等待 **timeS** 秒。若事件未在 **timeS** 内发生，则报错。可使用 [err](../Flow/IDP_ERR.md) 继续宏。
- 等待时间精度取决于事件：
  - 按键、鼠标和 H/HM 事件：0-10 毫秒。
  - 其他事件：20-300 毫秒。
- 可作为函数使用，例如 `variable=wait(...)`。返回值取决于事件，未指定时返回 1。若设置了 [opt waitmsg](IDP_OPT.md)，线程接收到 `WM_QUIT` 消息时返回 0。
- **注意**：若线程有窗口/对话框、使用 COM 事件或某些使用 Windows 消息的 API 函数，应避免使用 wait 命令，或使用短时间（<0.1 秒）。默认情况下，等待时不处理消息，可能导致线程挂起。使用 [opt waitmsg](IDP_OPT.md) 可在等待时处理消息。
- **注意**：不要直接使用 Windows API 等待函数，因 QM 无法在用户请求时正确结束线程，可能导致内存泄漏或其他问题，且无法应用 opt waitmsg。
- QM 2.4.0：`wait` 使用可警告等待（alertable waiting）。例如，可使用 `QueueUserAPC` 在等待线程中运行函数。

## 等待窗口 {#aw}

```qm
[wait ]timeS event window
```

### 参数

- **event**：

| 事件 | 描述 |
|------|------|
| WA | 等待窗口激活、可见且未最小化。<ul><li>若窗口不存在，先等待其创建。</li><li>返回窗口句柄。</li><li>WA 可选。</li><li>另见：[run](IDP_RUN.md)。</li></ul> |
| -WA 或 WN | 等待窗口失活或销毁。<ul><li>若窗口已失活或不存在，不等待。</li><li>返回活动窗口的句柄。</li></ul> |
| WC | 等待窗口创建。<ul><li>若窗口已存在，不等待。</li><li>返回窗口句柄。</li></ul> |
| -WC 或 WD | 等待窗口销毁。<ul><li>若窗口不存在，不等待。</li><li>返回活动窗口的句柄。</li></ul> |
| WP | 等待窗口的程序退出。<ul><li>若窗口不存在，不等待。</li><li>返回活动窗口的句柄。</li><li>另见：[run](IDP_RUN.md)。</li></ul> |
| WV | 等待窗口可见。<ul><li>若窗口不存在，先等待其创建。</li><li>返回窗口句柄。</li></ul> |
| -WV | 等待窗口隐藏或销毁。<ul><li>若窗口不存在，返回 1。</li><li>返回窗口句柄。</li></ul> |
| WE | 等待窗口启用。<ul><li>若窗口不存在，先等待其创建。</li><li>返回窗口句柄。</li></ul> |
| -WE | 等待窗口禁用或销毁。<ul><li>若窗口不存在，返回 1。</li><li>返回窗口句柄。</li></ul> |
| WAI | 等待多个窗口之一激活、可见且未最小化。<ul><li>**window** 为窗口列表，如 `"Notepad[]WordPad"`。</li><li>返回列表中窗口的 1 基索引。</li></ul> |

- [**window**](../Other/IDP_WINDOWEXPRESSION.md) - 窗口，可为子窗口。

### 示例

```qm
;; 最多等待 5 秒，直到窗口 "Notepad" 出现，超时则报错：
wait 5 WA "Notepad"
;; 或（可省略 WA）：
wait 5 "Notepad"
;; 或（可省略 wait）：
5 WA "Notepad"
;; 或（可省略 WA 和 wait）：
5 "Notepad"

;; 最多等待 5 秒，直到窗口 "Notepad" 出现，超时则继续：
wait WA 5 "Notepad"; err

;; 最多等待 5 秒，直到窗口 "Notepad" 出现，超时则运行宏 "Open"：
wait 5 WA "Notepad"
err
	mac- "Open"

;; 等待窗口 "Notepad" 关闭：
wait 0 -WC "Notepad"

;; 等待窗口名称为 "Calc" 且类为 "SciCalc" 的窗口创建：
wait 0 WC win("Calc" "SciCalc")

;; 等待窗口 "Window" 中 ID 为 1500 的控件启用：
wait 0 WE id(1500 "Window")

;; 最多等待 5 秒，直到窗口 "Notepad" 出现，存储窗口句柄到变量：
int hwnd = wait(5 WA "Notepad"); err

;; 等待当前活动窗口失活（另一窗口激活），返回新活动窗口的句柄：
int hwnd = wait(5 -WA "")

;; 等待属于程序 "APP" 的消息框 "Error" 或 "Warning"：
int hwnd = wait(5 win("Error[]Warning" "#32770" "APP" 16))
```

## 等待窗口名称 {#aw_wt}

```qm
[wait ]timeS event handle name [flags]
```

### 参数

- **event**：

| 事件 | 描述 |
|------|------|
| WT | 等待窗口名称为 **name**。 |
| -WT | 等待窗口名称不为 **name**。 |

- **handle** - 窗口句柄。
- **name** - 等待的名称，可为部分名称。
- [**flags**](../Other/IDP_FLAGS.md)：

| 标志 | 描述 |
|------|------|
| 1 | **name** 为完整名称或包含 [通配符](../Functions/IDP_MATCHW.md) (*?)。 |
| 2 | **name** 为 [正则表达式](../RegExp/IDP_PCRE.md)。 |
| 4 | **name** 不区分大小写。 |

### 备注

QM 2.3.4 新增。

## 等待按键 {#ak}

```qm
[wait ]timeS event [keycode]
```

### 参数

- **event**：

| 事件 | 描述 |
|------|------|
| K | 等待按键释放事件。 |
| KF | 等待按键按下事件。<ul><li>不同于 K，会“吃掉”键盘事件，活动窗口不会接收。</li><li>在 [exe](../QM_Help/IDH_MAKEEXE.md) 中不可用。</li></ul> |

- [**keycode**](../Tables/IDP_KEYCODES.md) - 单一 QM 按键代码，可选。
  - 若省略 **keycode**，等待任意按键。
  - **keycode** 也可为括号中的字符串变量（QM 按键代码）或数值（[虚拟键码](../Tables/IDP_VIRTUALKEYS.md)）。

### 备注

返回虚拟键码。

[**UAC**](../Other/IDP_VISTA.md)：若 QM 以标准用户运行且活动窗口具有更高完整性级别，则无效。

### 示例

```qm
;; 等待 F12 键：
wait 0 K F12

;; 等待任意按键，吃掉按键并显示虚拟键码：
int vk = wait(0 KF)
out vk
```

## 等待鼠标 {#am}

```qm
[wait ]timeS event
```

### 参数

- **event**：

| 事件 | 描述 |
|------|------|
| ML | 等待左键释放事件，返回 1。 |
| MR | 等待右键释放事件，返回 2。 |
| MM | 等待中键释放事件，返回 4。 |
| M | 等待任意鼠标按键释放事件，返回按键代码：1 左键，2 右键，4 中键，5 X1，6 X2。 |

### 备注

不“吃掉”鼠标事件，活动窗口会接收。

[**UAC**](../Other/IDP_VISTA.md)：若 QM 以标准用户运行且活动窗口具有更高完整性级别，则无效。

## 等待 CPU {#ap}

```qm
[wait ]timeS event [threshold]
```

### 参数

- **event**：

| 事件 | 描述 |
|------|------|
| P | 等待 CPU 使用率低于 **threshold**。<ul><li>**threshold** 必须为 1 到 100。</li></ul> |
| -P | 等待 CPU 使用率高于 **threshold**。<ul><li>**threshold** 必须为 0 到 99。</li></ul> |

- **threshold** - CPU 使用率（%）。默认值：20% 或通过 [RtOptions](../User/IDP_QMDLL.md#RtOptions) 设置。

### 备注

谨慎使用。某些程序持续占用 CPU，即使已准备好接受输入。

**另见**：[GetCPU](../User/IDP_QMDLL.md#GetCPU)。

### 示例

```qm
;; 运行程序并最多等待 15 秒，直到 CPU 使用率低于 20%：
run "app.exe"; wait 15 P 20
```

## 等待句柄 {#ah}

```qm
[wait ]timeS H handle
```

### 参数

- **handle** - [同步对象](http://www.google.com/search?q=site%3Amicrosoft.com%20synchronization%20objects) 句柄。

### 备注

等待对象变为 signaled 状态。例如，可等待另一线程退出。

返回 1，若句柄无效返回 -1。

`wait` H/HM/HMA 使用 Windows API 等待函数（`[Msg]WaitForMultipleObjectsEx`），成功时修改对象状态。例如，等待自动重置事件成功后，`wait` 重置它；等待互斥体成功后，线程拥有互斥体；若互斥体被放弃，`wait` 调用 `SetLastError(128)`。不要直接使用 Windows API 等待函数（除非超时为 0 或很小），因 QM 无法在用户请求时正确结束线程，且无法应用 opt waitmsg。

**提示**：使用 `__Handle` 类型变量存储句柄，变量销毁时自动调用 `CloseHandle` 关闭。不要关闭 QM 线程句柄。

**提示**：等待互斥体，另见 [lock](IDP_LOCK.md)。

### 示例

```qm
;; 运行 notepad 并等待其退出（仅示例，建议使用 run 的 0x400 标志）：
__Handle hProcess=run("notepad.exe")  ;; __Handle 变量会关闭句柄
wait 0 H hProcess

;; 在单独线程运行函数 "Function" 并等待其退出：
int hThread=mac("Function")  ;; 注意：不要对 QM 线程句柄使用 __Handle
wait 0 H hThread

;; 创建事件并等待另一线程设置（SetEvent）：
;; ______Thread1_______
__Handle+ g_hevent; if(!g_hevent) g_hevent=CreateEvent(0 0 0 0)
wait 60 H g_hevent
;; ______Thread2_______
SetEvent(g_hevent)
```

## 等待多个句柄（QM 2.2.0） {#ahm}

```qm
[wait ]timeS HM ha
```

或

```qm
[wait ]timeS HM h1 h2 [h3] [h4]
```

### 参数

- **ha** - `ARRAY(int)` 类型变量，包含最多 60 个 [同步对象](http://www.google.com/search?q=site%3Amicrosoft.com%20synchronization%20objects) 句柄。
  - QM 2.4.0：也支持 `ARRAY(__Handle)`。
- **h1-h4** - 同步对象句柄，可为 `int` 或 `__Handle` 类型。

### 备注

- 若使用 HM，等待任一对象变为 signaled 状态，返回第一个 signaled 句柄的 1 基索引。
- 若使用 HMA（QM 2.4.0 新增），等待所有对象变为 signaled 状态，返回 1。
- 若句柄无效，返回 -1。
- **提示**：使用 `__Handle` 或 `ARRAY(__Handle)` 类型变量存储句柄，变量销毁时自动调用 `CloseHandle` 关闭。不要关闭 QM 线程句柄。

### 示例

```qm
;; 创建两个事件对象，等待任一被设置（SetEvent）：
__Handle+ g_e1 g_e2
if(!g_e1) g_e1=CreateEvent(0 0 0 0)
if(!g_e2) g_e2=CreateEvent(0 0 0 0)
int i=wait(0 HM g_e1 g_e2)
out i

;; 启动三个 notepad 进程，等待所有关闭：
ARRAY(__Handle) a
rep 3
	a[]=run("notepad.exe")
wait 0 HMA a
```

## 等待变量 {#av}

```qm
[wait ]timeS event variable
```

### 参数

- **event**：

| 事件 | 描述 |
|------|------|
| V | 等待变量变为非零。 |
| -V | 等待变量变为 0。 |

- **variable** - `int` 类型变量。

### 备注

返回变量的最终值。

## 等待网页 {#ai}

```qm
[wait ]timeS I [url]
```

### 参数

- **url** - 等待的 URL，若省略则等待浏览器不忙碌。

### 备注

等待网页加载完成且浏览器不忙碌。

仅适用于 Internet Explorer 及基于 IE 的浏览器。

**注意**：仅在单一窗口中等待。若等待期间页面在新窗口打开，则忽略新窗口。

**另见**：[web](IDP_WEB.md)。

## 等待光标（鼠标指针） {#acu}

```qm
[wait ]timeS event cursor
```

### 参数

- **event**：

| 事件 | 描述 |
|------|------|
| CU | 等待指定光标出现。 |
| -CU | 等待指定光标消失。 |

- **cursor** - 以下之一：
  - 标准光标标识符，如 IDC_ARROW。
  - QM 2.3.2：自定义光标标识符，在等待对话框中录制。

## 等待颜色 {#ac}

```qm
[wait ]timeS event color x y [window] [flags]
```

### 参数

- **event**：

| 事件 | 描述 |
|------|------|
| C | 等待指定 [颜色](../Other/IDP_COLOR.md) 出现在窗口或屏幕（若 **window** 为 0 或省略）的指定 [点](../Other/IDP_PIXELS.md)。 |
| -C | 等待像素颜色从指定颜色改变。 |

- **x y** - [坐标](../Other/IDP_PIXELS.md)。
- [**window**](../Other/IDP_WINDOWEXPRESSION.md) - 顶级或子窗口。若省略或为 0，**x y** 为屏幕坐标。
- [**flags**](../Other/IDP_FLAGS.md)：

| 标志 | 描述 |
|------|------|
| 1 | **x y** 相对于窗口客户区或工作区的左上角。 |
| 2 | 激活 **window**，若最小化则恢复。若 **x y** 不属于 **window** 或其顶级父窗口，则报错。若使用 0x1000 则不报错。 |
| 0x1000 | QM 2.4.3。直接从 **window** 获取像素颜色，而非屏幕。同 [scan](../Functions/IDP_SCAN.md) 的 0x1000 标志。若未使用 **window**、未启用 Windows Aero 主题或 **window** 为 [DPI 缩放](../Other/IDP_DPI.md)，则忽略此标志。 |

### 备注

**另见**：[pixel](../Functions/IDP_PIXEL.md)、[scan](../Functions/IDP_SCAN.md)。

## 等待屏幕图像 {#as}

```qm
[wait ]timeS event file [window] [rect] [flags] [colorDiff] [matchIndex]
```

### 参数

- **event**：

| 事件 | 描述 |
|------|------|
| S | 等待图像出现。 |
| -S | 等待图像消失。 |

- **file, window, rect, flags, colorDiff, matchIndex** - 同 [scan](../Functions/IDP_SCAN.md)。

### 备注

QM 2.3.2 新增更多功能。

### 提示

在大型区域（整个屏幕或窗口）等待图像（S、-S）会消耗大量 CPU。若其他应用程序同时进行处理，QM 可能减慢其速度。若处理速度重要，可查看 qm.exe 的 CPU 使用率，若过高，可通过最小化搜索区域（[了解更多](../Functions/IDP_SCAN.md)）减少 CPU 使用。等待时，QM 定期搜索图像。若速度（`spe`）为 0，搜索频率更高。

使用 Windows 任务管理器或 perfmon.exe 查看 CPU 使用率，也可使用 [GetCPU](../User/IDP_QMDLL.md#GetCPU) 函数。

## 等待其他事件 {#aother}

- 等待用户输入：[mes](../Functions/IDP_MES.md)（消息框）、[inp](../Functions/IDP_MES.md)（输入框）、`ShowDialog`（自定义对话框）、`ListDialog` 等对话框。
- 等待可访问对象（文本、链接、按钮等）：[acc](../Functions/IDP_ACC.md)，在“查找可访问对象”对话框中指定等待时间。
- 等待 HTML 元素（Internet Explorer 中的网页对象）：[htm](../Functions/IDP_HTM.md)，在“查找 HTML 元素”对话框中指定等待时间。
- 等待图像：[scan](../Functions/IDP_SCAN.md)，在“查找图像”对话框中选择“等待”。
- 运行程序并等待：[run](IDP_RUN.md)，使用“运行程序”对话框。
- 打开网页并等待：[web](IDP_WEB.md)，使用“打开网页”对话框。

等待其他事件可通过 [rep](../Flow/IDP_REP.md) 实现。要创建新的“等待”用户定义函数，可使用 `WaitFor` 模板（菜单 文件 -> 新建 -> 模板）。

**注意**：不要使用 Windows API 等待函数，因 QM 无法在用户请求时正确结束线程，可能导致内存泄漏或其他问题，且无法应用 opt waitmsg。

### 示例

```qm
;; 等待不支持的条件：
rep() if(condition) break; else 0.1

;; 等待鼠标左键按下：
rep() 0.01; ifk((1)) break

;; 等待两个文件之一出现：
str file1="$personal$\file1.txt"
str file2="$personal$\file2.txt"
rep
	if(FileExists(file1)) break
	if(FileExists(file2)) break
	0.5
```