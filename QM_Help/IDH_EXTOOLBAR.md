# 扩展工具栏

## 概述
工具栏选项可设置钩子函数：
```cpp
/hook functionname
```

指定的用户定义钩子函数接收工具栏主窗口（非所有者窗口）从 `WM_CREATE` 开始的所有消息，从而扩展 QM 工具栏功能，例如创建更多控件。

- 模板：菜单 -> 文件 -> 新建 -> 模板。

## 钩子函数定义
工具栏钩子函数必须以以下形式开头：
```cpp
function# hWnd message wParam lParam
```

- 若钩子函数返回非零值，消息不会在默认窗口过程中进一步处理。以下消息也不会在默认工具栏窗口过程中处理：
  - `WM_GETMINMAXINFO`
  - `WM_NCHITTEST`
  - `WM_WINDOWPOSCHANGING`
  - `WM_SYSCOMMAND`
  - `WM_ERASEBKGND`
- 若需返回 0 且不进一步处理，声明函数为 `long` 类型（`function% ...`）并返回 `0x100000000`。
- 修改工具栏行为的返回非零值的消息：
  - `WM_SIZE`：禁用调整子工具栏控件大小。
  - `WM_EXITSIZEMOVE`：禁用调整大小/移动后失活。
  - `WM_MOUSEACTIVATE`：禁用点击时失活。
  - `WM_COMMAND`：不运行与按钮关联的宏/文件/命令。

## 注意事项
- 若钩子函数执行 `end`，将不再被调用。
- QM 2.2.0：工具栏完全初始化并显示前发送 `WM_INITDIALOG`，`wParam` 为子工具栏控件句柄，`lParam` 为 0，需返回 0（之前版本不发送此消息）。
- QM 2.2.0.11：工具栏控件创建时不带 `WS_EX_NOPARENTNOTIFY` 样式，因此钩子函数接收 `WM_PARENTNOTIFY` 消息，例如可在创建工具栏控件时设置字体（此时按钮尚未添加）。
- 钩子函数在 QM 主线程运行，需谨慎，避免使 QM 不稳定：
  - 不要使用等待命令。
  - 不要使用 `atend`。
  - 避免使用[线程变量](../Other/IDP_THREADS.html)。
  - 使用 `SetProp`、`GetProp` 和 `RemoveProp` 函数存储当前工具栏作用域的变量。

## 示例
```cpp
/MyToolbar
function# hWnd message wParam lParam

type MYTOOLBARVARS a str'b ARRAY(POINT)c ;; 声明类型以存储多个变量（示例）
MYTOOLBARVARS* v=+GetProp(hWnd "v") ;; 获取变量（必需）

sel message
	case WM_INITDIALOG
	v._new; SetProp(hWnd "v" v) ;; 创建变量（必需）
	v.a=1; out v.a ;; 使用变量（示例）

	case WM_DESTROY
	v.a=3; out v.a ;; 使用变量（示例）
	v._delete; RemoveProp(hWnd "v") ;; 销毁变量（必需）

	case WM_SETCURSOR
	v.a=2; out v.a ;; 使用变量（示例）
```

## 更多资源
- 可在 [Quick Macros 论坛](http://www.quickmacros.com/forum/viewtopic.php?f=2&t=3368) 查看示例工具栏。