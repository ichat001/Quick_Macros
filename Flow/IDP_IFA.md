# 如果窗口处于激活/焦点状态

## 语法

```qm
ifa[-] window
    statements
    ...
[else
    statements
    ...]
```

也可以写成单行：

```qm
ifa[-](window) statements
[else statements]
```

## 参数

- **[window](IDP_WINDOWEXPRESSION.md)** - 顶级窗口或 [子窗口](IDP_WINDOWSTYLES.md)。

### 选项

| 选项 | 描述 |
|------|------|
| - | 非（窗口不激活或无焦点）。 |

## 说明

类似于 [if](IDP_IF.md)。

如果 **window** 存在且处于激活状态，则执行 `ifa` 后的 **statements**，并跳过 `else` 后的 **statements**（如果存在）。否则，跳过 `ifa` 后的 **statements**，并执行 `else` 后的 **statements**（如果存在）。对于子窗口，测试其是否具有焦点。

QM 2.3.3 起，可用作函数。如果窗口激活，返回 1；如果未激活或未找到，返回 0。

**提示**：要检查“窗口是否存在”，请使用 [win](IDP_WIN.md) 和 `if`。参见最后一个示例。

**另见**： [wintest](IDP_WIN.md)

## 示例

```qm
ifa "Notepad"
    out "''Notepad'' is active"
    key Cv
else
    act "Notepad"
    bee

;; 用作函数
if(ifa("Notepad") or ifa("WordPad")) out "Notepad or WordPad window is active."

;; 检查窗口是否存在
int w=win("Notepad" "Notepad")
if w
    out "''Notepad'' exists"
```