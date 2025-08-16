# 定时器

## 语法

```qm
tim [timeS] [function] [flags]
```

## 参数

- **timeS** - 定时器周期（秒）。默认值：0。最大值：2147483.647，若超过则报错。
- **function** - 用户定义函数的名称。默认值：调用者函数。
  - 该函数不接收参数。
- [**flags**](../Other/IDP_FLAGS.md)：

| 标志 | 描述 |
|------|------|
| 1 | 允许 **function** 的多个实例同时运行。 |
| 2 | QM 2.3.3。一次性定时器，函数仅运行一次。无此标志，定时器为周期性。 |

## 备注

设置定时器，每隔 **timeS** 秒执行 **function**。

- 若 **timeS** 为 0 或省略，停止定时器。
- 若该函数的定时器已存在且 **timeS** 非 0，则更改或重置其周期。下次运行将在 **timeS** 秒后。
- 若定时器函数被禁用，函数不会运行，但定时器仍运行。
- 定时器函数每次在新的线程中运行。不建议使用小周期（<1 秒）的 `tim`。
- 通常建议使用 `rep` 和 `wait` 替代 `tim`。在对话框过程或其他窗口过程中，使用 `SetTimer`、`KillTimer` 和 `WM_TIMER` 替代（见示例）。

### 提示

- 要创建在所有 QM 版本中有效的一次性定时器，可在定时器函数中使用 `tim 0` 停止定时器。
- 可在“运行项列表”（菜单 运行 -> 查看活动项）中查看当前活动定时器，右键单击可停止定时器。不显示在单独进程中运行的宏启动的定时器。

## 示例

```qm
;; 每 30 秒运行函数 Func：
tim 30 Func

;; 停止定时器：
tim 0 Func

;; 每 2 秒运行函数 Func：
rep
	wait 2
	Func

;; 在对话框过程中使用定时器：
sel message
	case WM_INITDIALOG
	SetTimer hDlg 35 1000 0 ;; 35 为定时器 ID，1000 为周期（毫秒）
	
	case WM_TIMER
	sel wParam
		case 35
		KillTimer hDlg wParam
		out "timer 35"
```