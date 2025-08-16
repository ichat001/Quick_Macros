# 更改窗口位置或大小

## 语法

```qm
mov left top [window] [flags]
siz width height [window] [flags]
mov+ left top width height [window] [flags]
```

## 参数

- **left**, **top** - 窗口左上角的新 [坐标](../Other/IDP_PIXELS.md)。
- **width**, **height** - 新的宽度和高度。
- [**window**](../Other/IDP_WINDOWEXPRESSION.md) - 顶级或 [子窗口](../Other/IDP_WINDOWSTYLES.md)。若省略或为 ""，使用活动窗口。
- [**flags**](../Other/IDP_FLAGS.md)：

| 标志 | 描述 |
|------|------|
| 1 | 不更改 `mov` 和 `mov+` 的 left 或 `siz` 的 width。 |
| 2 | 不更改 `mov` 和 `mov+` 的 top 或 `siz` 的 height。 |
| 4 | 坐标相对于工作区，仅适用于顶级窗口。 |
| 0x100, 0x200 | QM 2.3.6：在 `mov+` 中不更改 width 或 height。 |

## 备注

- `mov` 更改窗口位置。
- `siz` 更改窗口大小。
- `mov+` 更改窗口位置和大小（QM 2.3.6 新增）。

坐标必须相对于主显示器。若需相对于其他显示器，使用 `XyMonitorToNormal` 函数转换坐标。

若为子窗口（控件），坐标必须相对于其直接父窗口的客户区。

若 **width** 和/或 **height** 为浮点数，则解释为屏幕（顶级窗口）或直接父窗口客户区（控件）的比例。整数为像素。

若窗口已最小化，位置和大小不会更改。也不应在窗口最大化时更改。为确保 Notepad 窗口未最小化且未最大化，可使用以下代码：

```qm
int w2=win("Notepad")
if(min(w2)) res w2
if(max(w2)) res w2
```

速度取决于 [spe](IDP_SPE.md)。

### 其他移动/调整窗口大小的函数

- `CenterWindow` - 移动到屏幕中心、角落或指定显示器。
- `EnsureWindowInScreen` - 确保整个窗口在其或指定显示器内。
- `MoveWindowToMonitor` - 移动窗口到另一显示器。
- `ArrangeWindows` - 排列多个窗口，如平铺或最小化。
- `SaveMultiWinPos`, `RestoreMultiWinPos` - 保存/恢复多个窗口的位置。
- [AdjustWindowPos](../User/IDP_QMDLL.md#AdjustWindowPos)。
- Windows API 函数：`MoveWindow`, `SetWindowPos`, `SetWindowPlacement`。注意：[DPI 缩放窗口](../Other/IDP_DPI.md) 使用逻辑坐标（非可见坐标），而 QM 函数使用物理坐标（可见坐标）。

上述函数需使用窗口句柄（通过 `win`, `child` 或 `id` 获取），且仅接受整数坐标。按 F1 获取帮助。

## 示例

```qm
;; 移动 "Notepad" 到坐标 500, 0
mov 500 0 "Notepad"

;; 移动 "Notepad" 到屏幕中央
mov 0.5 0.5 "Notepad"

;; 更改 "Notepad" 大小
siz 300 200 "Notepad"

;; 更改 "Notepad" 大小，宽度为屏幕宽度，高度为屏幕高度的 0.25
siz 1.0 0.25 "Notepad"

;; 移动并调整窗口大小
mov+ 100 100 400 400 win("Notepad")
```