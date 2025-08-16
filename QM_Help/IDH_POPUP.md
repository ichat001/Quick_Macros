# 弹出菜单

弹出菜单用于启动宏、文件或其他命令。要创建新菜单，点击 **File -> New -> New Menu**。

以下信息适用于弹出菜单和[工具栏](IDH_TOOLBAR.md)（语法几乎相同）。例如，“菜单项”通常也指“工具栏按钮”。

## 菜单项

菜单文本的每行创建一个菜单项。语法：

```syntax
[label]:statements [* icon]
```

- **label**：菜单项显示文本，可选，支持[转义序列](IDP_CONSTANT.md)。
- **statements**：一个或多个命令，多个命令用分号分隔。
- **icon**：图标文件。

### 简化形式

1. **运行宏**：

```syntax
Macro [* icon]
```

- `Macro` 为宏名称，同时作为菜单项标签。

2. **运行文件**：

```syntax
[label]"file" [* icon]
```

- `file` 为文件名（完整路径或文件名）或 [ITEMIDLIST 字符串](IDP_SEARCHPATHS.md)。

以空格或分号开头的行可用作注释。

菜单项可通过代码工具栏对话框添加，也可拖放宏、文件或网络链接。

**示例菜单**：

```qm
My Macro:mac "My Macro"
IE:run "iexplore.exe"
Select All:key Ca * text.ico
Arial italic:spe; men 57696 "WordPad"; key "Arial" TPDY
:mes "Label is optional"
-
;; 注释
My Macro
IE "iexplore.exe"
```

## 分隔符

- `-`：水平分隔线（工具栏中可为垂直或水平）。
- `-digits`：宽分隔线（仅限工具栏），`digits` 为宽度。
- `|`：垂直分隔线（仅限菜单）。

## 子菜单

使用 `>` 和 `<` 创建子菜单。`>` 开头行开启子菜单，仅含 `<` 的行结束子菜单。工具栏不支持子菜单。

**示例**：

```qm
Macro1
>Submenu
    Macro2
    Macro3
    <
Macro4
```

## 展开文件文件夹（QM 2.2.0）

在菜单 **Properties** 中可设置自动展开文件文件夹，生成文件子菜单。语法：

```syntax
Label "folder" ["folder2" ...] [* icon]
```

- **Label**：通常为文件夹名称，可为任意文本。
- **folder**：文件夹路径或 [ITEMIDLIST 字符串](IDP_SEARCHPATHS.md)，最多可指定 10 个文件夹（合并显示）。

**示例菜单**：

```qm
/expandfolders
Start "$start menu$" "$common start menu$"
Desktop ":: "
My Computer ":: 14001F50E04FD020EA3A6910A2D808002B30309D"
C:\ "C:\"
```

若菜单仅含单一可展开文件夹项且无其他项，文件夹在主弹出菜单中展开，否则创建子菜单。

在 **Properties** 的 **Include/Exclude** 字段中，可指定包含或排除的文件模式。若两者均为空，包含所有文件。详情见 [菜单选项](IDH_MENUOPTIONS.md)。

## 菜单项标签特殊字符

- 在标签中插入 `&` 创建键盘快捷键（下划线字母），例如：`L&abel`。
- 使用 `&&` 表示单个 `&`。
- 使用箭头键选择菜单项，Enter 执行，Esc 关闭菜单或子菜单。
- **QM 2.2.0**：在标签中插入制表符（字面制表符、多个制表符或 `[9]`）以右对齐附加文本，如热键名称。例如：`Label[9]Ctrl+Shift+U`。

## 从代码显示菜单

使用 [mac](IDP_MAC.md) 从代码（如宏、其他菜单或工具栏）显示菜单：

- 作为函数调用（如 `variable=mac("menu")`），`mac` 等待菜单关闭，返回选中行的 1 基索引（或 0）。注意：行数不一定与可见菜单项匹配，因可能包含注释、分隔符等。
- 作为命令（如 `mac "menu"`），不等待。

**QM 2.2.0**：
- 对于展开的文件夹项，`mac` 返回 -1。使用 [GetLastSelectedMenuItem](IDP_QMDLL.md#GetLastSelectedMenuItem) 获取最后点击项的信息，也可获取其他项信息。
- 可在 **Properties** 中设置点击菜单项时不运行命令/文件/宏，宏可通过 `GetLastSelectedMenuItem` 获取文件路径并执行其他操作。
- `mac` 等待菜单关闭时会处理消息（早期版本不处理，导致在对话框中显示菜单效果不佳）。

若使用命令启动菜单（如 `mac "Menu" "command"`），`command` 被视为菜单项标签，直接执行该项而不显示菜单。

**指定菜单位置（QM 2.2.0）**：

```qm
mac "Menu" "" x y flags
```

- `flags` 为 [TrackPopupMenuEx](IDP_MSDN.md) 标志，如 `TPM_RIGHTALIGN`。
- 默认位置可将 `x` 和 `y` 设为 `""`。

**另见**：[菜单栏触发器](IDH_TRIG_QM.md)

## 子函数

[子函数](IDP_DIR_SUB.md) 可用于菜单及其他 QM 项目。第一个 `#sub` 指令结束菜单文本。子函数适合包含多行代码的菜单项，避免创建单独宏。

**示例菜单**：

```qm
A:out sub.Add(3 1)
B:sub.Sub1

#sub Add
function# a b
out __FUNCTION__
ret a+b

#sub Sub1 m
;; 带 m 属性，子函数作为菜单项文本，不作为函数调用
out __FUNCTION__
```

子函数默认速度（[spe](IDP_SPE.md)）为 0，带 `m` 属性的子函数与宏和菜单项相同，默认速度为 100。

## 右键菜单（QM 2.2.0）

右键点击菜单项会弹出小型菜单，用于快速打开 QM 中的菜单、目标宏或目标文件所在文件夹。右键打开子菜单的项需先按 Esc 关闭子菜单。

## 相关内容

- [菜单和工具栏图标](IDH_MENUICONS.md)
- [菜单选项](IDH_MENUOPTIONS.md)
- [混合粘贴](IDP_PASTE.md)
- `DynamicMenu`
- `ShowMenu`
- `ListDialog`
- [ShowDropdownList](IDP_QMCOMBOBOX.md)