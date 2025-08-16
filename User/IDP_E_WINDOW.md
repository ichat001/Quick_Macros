# Windows API 窗口函数

## 概述

以下是一些常用的 Windows API 窗口函数，`hWnd` 为窗口句柄，可通过 [win](IDP_WIN.html)、[child](IDP_CHILD.html) 或 [id](IDP_ID.html) 获取。

| 函数 | 说明 |
|------|------|
| `IsWindow(hWnd)` | 若句柄是有效且未销毁的窗口句柄，返回 1。 |
| `IsZoomed(hWnd)` | 若窗口最大化，返回 1。参见 [max](IDH_REFERENCE.html#max)。 |
| `IsIconic(hWnd)` | 若窗口最小化，返回 1。参见 [min](IDH_REFERENCE.html#min)。 |
| `IsWindowVisible(hWnd)` | 若窗口可见，返回 1。参见 [hid](IDH_REFERENCE.html#hid)。 |
| `IsWindowEnabled(hWnd)` | 若窗口启用，返回 1。 |
| `EnableWindow(hWnd fEnable)` | 启用（`fEnable=1`）或禁用（`fEnable=0`）窗口。 |
| `MoveWindow(hWnd x y nWidth nHeight bRepaint)` | 移动和调整窗口大小。参见 [mov+](IDH_REFERENCE.html#mov+)。 |
| `SetWindowPos(hWnd hWndInsertAfter x y cx cy wFlags)` | 移动、调整大小、设置 [Z 序](http://www.wikipedia.org/wiki/Z-order) 等，使用 `SWP_` 常量作为 `wFlags`。 |
| `GetWindowRect(hWnd RECT*lpRect)` | 获取窗口尺寸。参见 [DpiGetWindowRect](IDP_QMDLL.html#DpiGetWindowRect)。 |
| `GetParent(hWnd)` | 返回子窗口的直接父窗口句柄。 |
| `GetAncestor(hWnd gaFlags)` | 返回容器窗口句柄。`gaFlags`：1=父窗口（同 `GetParent`），2=顶级父窗口，3=顶级父窗口或拥有者。 |
| `WindowFromPoint(xPoint yPoint)` | 返回指定坐标点的窗口或子窗口句柄。参见 [win](IDP_WIN.html)、[child](IDP_CHILD.html)。 |

## 类型定义

| 类型 | 说明 |
|------|------|
| `type POINT x y` | 存储点的坐标。 |
| `type RECT left top right bottom` | 存储矩形坐标。 |

## 系统参数函数

- 使用 [GetSystemMetrics](IDP_QMDLL.html#GetSystemMetrics) 和 [SystemParametersInfo](IDP_QMDLL.html#SystemParametersInfo) 获取系统参数。
- 更多 Windows API 函数文档参见 [MSDN 库](IDP_MSDN.html)。

## 示例

```qm
; 切换活动窗口的最大化/还原状态
if(IsZoomed(win)) res; else max

; 显示活动窗口的尺寸
RECT r; DpiGetWindowRect(win &r)
out "x=%i y=%i width=%i height=%i" r.left r.top r.right-r.left r.bottom-r.top

; 获取工作区（屏幕上未被系统任务栏或桌面工具栏遮挡的部分）
RECT r; SystemParametersInfo(SPI_GETWORKAREA 0 &r 0)
```