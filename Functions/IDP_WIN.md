# 查找窗口（获取句柄）；比较属性

## 语法

### 语法 1 - 指定窗口

```qm
int win(name [class] [exename] [flags] [propCSV] [matchindex|array])
int wintest(hwnd name [class] [exename] [flags] [propCSV])
```

*注*：QM 2.3.4 之前使用以下语法（现已废弃）：

```qm
int win(name [class] [exename] [flags] [x y] [matchindex|array])
int wintest(hwnd name [class] [exename] [flags] [x y])
```

### 语法 2 - 从点获取窗口

```qm
int win(x y [workarea])
int wintest(x y [workarea])
```

### 语法 3 - 从鼠标位置获取窗口

```qm
int win(mouse)
int wintest(hwnd mouse)
```

### 语法 4 - 获取活动窗口

```qm
int win
```

## 参数

- **name** - 窗口标题。
  - 默认：可为部分标题，区分大小写。
  - 空字符串 (`""`) 匹配任何标题。
- **class** - 窗口类名。
  - 必须为完整类名或包含通配符 (`*?`)，不区分大小写。
  - 默认：`""`（任意类）。
  - QM 2.3.4 之前，使用通配符需加标志 `0x800`。
  - 可在 QM 状态栏查看类名。
- **exename** - 程序名称。默认：`""`（任意程序）。可以是：
  - 文件名（如 `"NOTEPAD"`）或完整路径（如 `"$system$\notepad.exe"`）。
  - QM 2.2.0 起：进程 ID。
- **[flags](IDP_FLAGS.md)**：
  | 标志 | 描述 |
  |------|------|
  | 1 | **name** 为完整标题或包含 [通配符](IDP_MATCHW.md)（`*?`）。例如，窗口标题以 `" - Notepad"` 结尾，使用 `"* - Notepad"` 和标志 1；精确匹配 `"Notepad"` 也需标志 1。字符串 `"*"` 匹配无标题窗口。 |
  | 2 | **name** 不区分大小写。 |
  | 4 | 窗口不得为 [弹出窗口](IDP_WINDOWSTYLES.md)。 |
  | 8 | 窗口必须为弹出窗口。 |
  | 16 | **name** 为标题列表。 |
  | 32 | **exename** 为拥有者窗口，可以是句柄、名称或 `+类名`。 |
  | 0x200 | **name** 为 [正则表达式](IDP_PCRE.md)。 |
  | 0x400 | 窗口必须可见。如果未指定 **class**，此为默认行为，除非之前使用 `opt hidden 1`。`wintest` 不默认此标志。 |
- **propCSV** - 其他属性的列表，格式为 `"name1=value1[]name2=value2[]..."`，为 [CSV](IDP_ICSV.md) 字符串，分隔符为 `=`。默认：`""`。
  | 名称 | 值 |
  |------|------|
  | owner | 拥有者窗口句柄。例如：`F"owner={hwndOwner}"`。 |
  | xy | 窗口必须包含的屏幕 [点坐标](IDP_PIXELS.md)。例如：`"xy=100 50"` 或 `"xy=0.9 0.1"`（靠近右上角）。 |
  | style | 窗口样式，可选后跟掩码。例如：`"style=0x54032000"`（精确匹配样式）、`F"style=-1 {WS_DISABLED}"`（必须禁用）、`F"style=0 {WS_DISABLED}"`（不得禁用）。 |
  | exStyle | 扩展样式，可选后跟掩码。 |
  | cClass, cText, cId, cFlags | 窗口必须包含指定控件，参数与 [child](IDP_CHILD.md) 相同，皆可选。例如：`"cClass=Static[]cText=Example*[]cFlags=1"`。 |
  | GetProp | 窗口必须具有指定的 [窗口属性](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-setprop)（通过 `SetProp` 设置）。属性名称，可选后跟值。若仅名称，值可为任意非零值。注意：谨慎使用 `SetProp`，避免使用过多属性名，可能导致应用程序停止工作。使用完后通过 `RemoveProp` 删除。 |
  | callback | [回调函数](IDP_ENUMWIN.md) 地址，可选后跟传递值。例如：`F"callback={&Function} {aValue}"`。 |
  | threadId (QM 2.4.2) | 线程 ID。可通过 `GetCurrentThreadId`、`GetWindowThreadProcessId` 或 `GetQmThreadInfo` 获取。 |
  | processHandle (QM 2.4.2) | 进程句柄。例如：<br>`__Handle hp=run("notepad.exe")`<br>`int w=wait(30 WC win("" "Notepad" "" 0 F"processHandle={hp}"))`<br>注意：不同于进程 ID，若有进程 ID，应作为 **exename** 参数传递。 |
- **matchindex** (QM 2.2.0) - 匹配窗口的基于 1 的索引，用于存在多个匹配其他属性（**name**、**class** 等）的窗口时。
- **array** (QM 2.2.1) - `ARRAY(int)` 类型变量，接收所有匹配窗口的句柄。另见 `GetMainWindows`。
- **x, y** (语法 2) - 屏幕中的 [点](IDP_PIXELS.md)，函数获取包含此点的窗口。
- **workarea** (语法 2) - 若非零，坐标相对于工作区域（最大化窗口使用的屏幕区域）。
- **mouse** (语法 3) - 字面值 `mouse`。
- **hwnd** (`wintest`) - 要测试的窗口句柄。

## 说明

`win` 返回 [顶级窗口](IDP_WINDOWSTYLES.md) 的 [句柄](IDP_WINDOWEXPRESSION.md)。若未找到窗口，返回 0。句柄可传递给任何接受窗口参数的函数。

测试窗口可见性时，函数调用 `IsWindowVisible`，不调用 `IsWindowCloaked`。例如，可找到非活动的 Windows 8 应用窗口或 Windows 10/11 非活动虚拟桌面上的窗口。

`wintest` 比较窗口（**hwnd**）的属性与指定属性，匹配返回 1，不匹配返回 0。若使用标志 16，返回在列表中的基于 1 的索引。若 **hwnd** 为 0 或无效，则报错。另见 [WinTest](IDP_QMDLL.md#WinTest)。

### 提示

- 使用“查找窗口或控件”对话框或按 `Ctrl+Shift+Alt+W`（显示生成窗口函数代码的菜单）创建 `win` 代码。录制和其他对话框也会生成包含 `win` 的代码。
- 在 QM 状态栏可查看窗口类名、标题和程序名。使用“探索窗口”对话框可查看更多窗口属性。

## 示例

```qm
int h = win ;; 活动窗口
h = win("Notepad") ;; 标题为 "Notepad"
h = win("Find" "#32770" "NOTEPAD" 1|0x400) ;; 标题 "Find"，类 "#32770"，程序 "notepad"，标题需精确匹配，必须可见
h = win("" "Notepad" "" 0 "xy=100 100") ;; 类 "Notepad"，位于屏幕 100x100 像素处
h = win(200 0.5) ;; 位于屏幕水平 200 像素、垂直屏幕高度一半的窗口
act win(mouse) ;; 激活鼠标位置的窗口

int h=win
sel wintest(h "Visual[]Quick" "" "" 16)
    case 1 out "Visual"
    case 2 out "Quick"
    case 0 out "other"

out
ARRAY(int) a; int i; str sc sn
out "[][9]ALL VISIBLE WINDOWS"
win("" "" "" 0 0 0 a)
for(i 0 a.len)
    sc.getwinclass(a[i])
    sn.getwintext(a[i])
    out "%i '%s' '%s'" a[i] sc sn

out "[][9]ALL INVISIBLE WINDOWS"
opt hidden 1
win("" "" "" 0 0 0 a)
for(i 0 a.len)
    if(!hid(a[i])) continue ;; 此窗口可见
    sc.getwinclass(a[i])
    sn.getwintext(a[i])
    out "%i '%s' '%s'" a[i] sc sn

out "[][9]ALL WINDOWS OF EXPLORER"
opt hidden 1
win("" "" "explorer" 0 0 0 a)
for(i 0 a.len)
    sc.getwinclass(a[i])
    sn.getwintext(a[i])
    out "%i '%s' '%s'" a[i] sc sn
```