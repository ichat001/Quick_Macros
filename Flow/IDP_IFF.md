# 如果文件或文件夹存在

> **注意**：已废弃。建议使用 [FileExists](IDP_QMDLL.md#FileExists) 或 [str.searchpath](IDP_S_SEARCHPATH.md)。

## 语法

```qm
iff[-] file
    statements
    ...
[else
    statements
    ...]
```

也可以写成单行：

```qm
iff[-](file) statements
[else statements]
```

## 参数

- **file** - 要搜索的文件。可以是文件或文件夹，也可以是驱动器。可以是完整路径或文件名。

### 选项

| 选项 | 描述 |
|------|------|
| - | 非（文件或文件夹不存在）。 |

## 说明

类似于 [if](IDP_IF.md)。

如果 **file** 存在，则执行 `iff` 后的 **statements**，并跳过 `else` 后的 **statements**（如果存在）。否则，跳过 `iff` 后的 **statements**，并执行 `else` 后的 **statements**（如果存在）。

QM 2.3.3 起，可用作函数。如果文件存在，返回 1；否则返回 0。

如果 **file** 不是完整路径，则在 [这些位置](IDP_SEARCHPATHS.md) 搜索。工作方式类似于 [str.searchpath](IDP_S_SEARCHPATH.md)。

## 示例

```qm
iff("c:\m\x.txt") mac- "Copy" ;;如果文件存在，执行宏“Copy”
iff-("notepad.exe") bee ;;如果文件不存在，发出蜂鸣声
iff(s) out s ;;如果文件存在，显示路径。路径存储在变量 s 中
iff-("$My Pictures$") end ;;如果特殊文件夹不存在，终止宏

;; 用作函数
if(iff("file1") and !iff("file2")) out "file1 exist; file2 does not exist."
```