# 隐藏或显示窗口

## 语法

### 语法 1 - 设置状态
```
hid[-] [window]
```

### 语法 2 - 获取状态
```
int hid(window)
```

## 参数

- **window** - [顶级或子窗口](../Other/IDP_WINDOWEXPRESSION.md)。若省略：
  - 对于 `hid`，使用活动窗口。
  - 对于 `hid-`，使用最后隐藏的窗口。

### 选项

| 选项 | 描述 |
|------|------|
| 默认 | 隐藏窗口 |
| - | 显示窗口 |

## 备注

### 语法 1
隐藏或显示窗口。速度取决于 [spe](IDP_SPE.md)。

### 语法 2
返回窗口状态：1（隐藏）或 0（可见）。调用 Windows API 函数 `IsWindowVisible`。另见 `IsWindowCloaked`。

### 提示
- 隐藏活动窗口后，它可能仍保持活动状态（尽管不可见）。为取消激活，可在 `hid` 后使用 `act` 激活下一个窗口，见示例。
- `hid-` 仅显示窗口，不激活。若需显示并激活，使用 `act` 代替。

## 示例

```cpp
hid "Notepad" ;;隐藏“Notepad”
hid- "Notepad" ;;显示“Notepad”
hid- ;;显示最后隐藏的窗口

// 隐藏 Notepad 并激活下一个窗口
int h=win("Notepad")
hid h
if(h=win) act
```