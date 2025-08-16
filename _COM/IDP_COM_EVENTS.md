# COM 事件

## 语法

```qm
ip._setevents(["eventfolder"] [flags])
```

## 参数

- **ip** - 接口指针变量。
- **eventfolder** - 事件函数所在位置。可以是：
  - QM 2.4.1 起：`"sub"` 或 `"sub.prefix"`。如果事件函数是与 `_setevents` 语句在同一宏/函数中的 [子函数](IDP_DIR_SUB.md)，请使用此选项。
  - 包含事件函数的文件夹（宏列表中的文件夹）。不推荐使用。
  - 如果省略 **eventfolder** 或为 `""`，则断开事件连接。
- **[flags](IDP_FLAGS.md)**：
  | 标志 | 描述 |
  |------|------|
  | 1 | 不允许在同一对象上建立多个连接。 |

## 说明

通常，您调用 COM 对象的函数（“方法”和“属性”）。一些 COM 对象还支持“事件”，即可以调用您的函数（事件函数）。但首先需要将对象的事件连接到您的函数。

`_setevents` 用于连接或断开对象的事件。

示例：

```qm
Excel.Application x._create
x._setevents("sub.x")
```

当对象（示例中的变量 x）触发事件时，会调用 **eventfolder** 中对应的函数（示例中的 [子函数](IDP_DIR_SUB.md)）。

### 创建新事件函数

- 在接口指针变量后输入 `.`，会显示一个包含函数的弹出列表，其中可能包含事件（带有闪电图标 <img src="../image/ti/com_event.gif" width="16" height="16">）。双击一个事件，会添加 `_setevents`（如果不存在）并创建具有 [正确名称和参数](#事件函数命名和参数) 的事件子函数。然后，您可以在子函数中添加更多代码。
- 您也可以从对话框编辑器调用弹出列表：选择一个 ActiveX 控件（例如 Web 浏览器）并点击“事件”。

### 事件函数命名和参数

事件函数的名称必须由某个前缀、一个下划线（`_`）和事件名称组成。如果 **eventfolder** 为 `"sub.prefix"`，则函数名称必须使用该前缀；否则，可以使用任意前缀。例如，如果 **eventfolder** 为 `"sub.x"`，将连接类似 `"x_Event1"`、`"x_Event2"` 等子函数。其他子函数可用于其他目的，例如与其他 `_setevents` 语句一起使用。

事件函数的参数必须与事件参数匹配。事件函数不返回值。如果函数返回非零值，则视为错误代码。

当使用 QM 文件夹存储事件函数时，如果存在多个同名文件夹，`_setevents` 使用宏列表中最接近的一个。首先搜索调用 `_setevents` 的函数所在文件夹及其子文件夹，然后是其父文件夹及其子文件夹，再然后是其他祖先文件夹，最后是整个宏列表。为避免混淆，建议使用子函数。

### 线程和事件

通常，COM 对象仅在单一线程（运行中的宏）中工作。要接收事件，创建对象的线程必须保持运行。如果线程立即结束，事件将无意义。例如，您可以使用对话框。也可以使用 `wait`，但需在之前插入 `opt waitmsg 1`，否则事件将被阻塞。参见示例。

### 访问事件源对象

在事件函数中访问事件源对象变量的方法：

- 在 `function` 语句中将其声明为最后一个参数。自动创建函数时，该参数会以注释形式添加（需移除 `;;;`）。示例：
  ```qm
  function x y Excel.Application'x
  x.Function()
  ```
- 具有 v 属性的子函数可以使用父函数的变量。
- 使用 [线程作用域](IDP_SCOPE.md)（带 `-`）声明变量。不要在对话框中的 ActiveX 控件中使用此方法。

### 多重连接

默认情况下，多次调用 `_setevents` 会创建多个连接。例如，您可以同时连接两个文件夹。如果设置标志 1，则在建立新连接前会删除之前的连接。

### 断开连接

要断开连接，调用不带参数的 `_setevents`。通常无需这样做，因为对象删除时会自动断开连接。

### 限制

事件仅可用于类型库中的 coclasses（图标 <img src="../image/ti/com_class.gif" width="16" height="16">）。

`_setevents` 必须直接与变量一起使用。类似 `var.Function._setevents(...)` 的代码将无效。

## 示例 - Excel, wait

```qm
ExcelSheet es.Init
Excel.Worksheet x=es.ws
x._setevents("sub.x")
opt waitmsg 1
10

#sub x_SelectionChange
function Excel.Range'Target ;;Excel._Worksheet'x
out 1
```

## 示例 - 对话框, Web 浏览器控件

```qm
\Dialog_Editor

str controls = "3"
str ax3SHD
ax3SHD="http://www.quickmacros.com"
if(!ShowDialog("" &sub.DialogProcedure &controls)) ret

BEGIN DIALOG
0 "" 0x90C80AC8 0x0 0 0 224 136 "Dialog"
3 ActiveX 0x54030000 0x0 0 0 224 114 "SHDocVw.WebBrowser"
1 Button 0x54030001 0x4 116 116 48 14 "OK"
2 Button 0x54030000 0x4 168 116 48 14 "Cancel"
END DIALOG
DIALOG EDITOR: "" 0x2040104 "*" "" "" ""

#sub DialogProcedure
function# hDlg message wParam lParam
sel message
    case WM_INITDIALOG
    SHDocVw.WebBrowser we3
    we3._getcontrol(id(3 hDlg))
    we3._setevents("sub.we3")
    
    case WM_DESTROY
    case WM_COMMAND goto messages2
ret
messages2
sel wParam
    case IDOK
    case IDCANCEL
ret 1

#sub we3_DocumentComplete
function IDispatch'pDisp `&URL ;;SHDocVw.IWebBrowser2'we3
out URL
```