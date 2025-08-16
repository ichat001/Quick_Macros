# 点击按钮或获取选中状态

## 语法

### 语法 1 - 点击、选中等
```
but[+|-|*|%] hwndbutton
```

### 语法 2 - 点击、选中等
```
but[+|-|*|%] id|text window
```

### 语法 3 - 获取选中状态
```
int but(hwndbutton)
```

### 语法 4 - 获取选中状态
```
int but(id|text window)
```

## 参数

- **hwndbutton** - 按钮句柄，可通过 [id](../Functions/IDP_ID.md) 或 [child](../Functions/IDP_CHILD.md) 函数获取。
- **window** - [顶级父窗口](../Other/IDP_WINDOWEXPRESSION.md)，函数仅在第一个匹配的窗口中搜索。
- **id** - 按钮 ID。
- **text** - 按钮标签，可为部分文本（从开头开始），下划线字符需前缀 &。窗口中不能有其他同名控件。

### 选项
| 选项 | 描述 |
|------|------|
| 默认 | 点击按钮 |
| + | 选中复选框 |
| - | 取消选中复选框 |
| * | 切换复选框状态 |
| % | 若复选框未选中，则点击 |

## 备注

### 语法 1 和 2
点击、选中或取消选中按钮、复选框或单选按钮。选项字符通常用于复选框，`+` 也可用于普通按钮，通常更可靠。

### 语法 3 和 4
返回复选框或单选按钮的选中状态：0（未选中）、1（选中）、2（不定状态）。

### 工作原理及在对话框过程中的使用
所有 `but` 版本可在任何地方使用，包括其他应用程序的窗口和自定义对话框。

- **点击版本**（`but` 和 `but%`）：发送 BM_CLICK 消息，触发 WM_LBUTTONDOWN 等并设置焦点。若窗口未激活，可能无效，尽管可能激活窗口。`Acc.DoDefaultAction` 似乎也使用此消息。
- **选中版本**（`but+`、`but-`、`but*`）：发送 BM_SETCHECK 消息，不设置焦点，适用于未激活的窗口。
- `but+`、`but-` 和 `but%` 若复选框已处于目标状态，则不执行操作。
- 所有“点击”和“选中”版本会向父对话框发送通知（WM_COMMAND）。若需在自定义对话框中选中复选框或单选按钮而不触发通知，可使用 `CheckDlgButton`、`CheckRadioButton`，或在 `ShowDialog` 前将对话框变量赋值为 1。
- 消息异步发送，例如，若按钮显示对话框，`but` 不会等待对话框关闭。应用 [spe](IDP_SPE.md) 的自动延迟。若目标窗口属于当前线程，则同步发送，不应用自动延迟。
- **获取选中状态**（语法 3 和 4）：发送 BM_GETCHECK 消息。替代方法包括 `IsDlgButtonChecked` 和 `BM_GETSTATE`，详见 MSDN。

## 示例

```cpp
but child(100 100 "Calc") ;;点击“Calc”窗口坐标 (100, 100) 处的按钮
but id(306 "Calc") ;;点击“Calc”窗口中 id=306 的按钮
but+ 306 "Calc" ;;选中“Calc”窗口中 id=306 的复选框
but "&Open" "Open" ;;点击“Open”窗口中的“Open”按钮

// 若“Find”对话框中的“Down”单选按钮未选中，则点击
int h=child("&Down" "Button" "Find")
if(!but(h)) but h
```