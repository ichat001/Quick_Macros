# 查找文件并获取完整路径；展开特殊文件夹名称

## 语法

```
s.searchpath([file] [path])
s.expandpath([file] [flags])
```

## 参数

- **s** - str 变量。
- **file** - 文件或文件夹的完整路径或文件名（包含扩展名）。也可以是驱动器（应以 \ 结尾）。默认值：**s**。
  - 完整路径可以以 [$ 括起来的特殊文件夹名称](https://quickmacros.com/help/str/../Other/IDP_SEARCHPATHS.html) 或 [% 括起来的环境变量](../Language/IDP_SCOPE2.md) 开头。
- **path** - 搜索的文件夹。如果 **file** 包含完整路径，则忽略此参数。默认值：""。
- **[flags](../Other/IDP_FLAGS.md)**：
  | 值 | 描述 |
  |----|------|
  | 1  | 展开所有（仅）环境变量。如果未使用此标志，仅当 **file** 以 % 开头时才展开环境变量。 |
  | 2  | QM 2.2.0。反向展开路径。例如，如果 **file** 是 "c:\windows\system32\file.exe"，**s** 将为 "$system$\file.exe"。 |

## 备注

- `searchpath` 在 **path** 中搜索 **file**。如果省略 **path** 且 **file** 不是完整路径，则在[这些位置](https://quickmacros.com/help/str/../Other/IDP_SEARCHPATHS.html)搜索。如果 **file** 是完整路径，仅测试文件是否存在。如果 **file** 存在，**s** 将接收完整路径，否则 **s** 将为空。
- `expandpath` 仅展开特殊文件夹名称或环境变量，但不搜索。所有 QM 文件函数都支持特殊文件夹，因此无需在调用它们之前使用此函数。可在调用 DLL 和 COM 函数前使用。

另见：[FileExists](../User/IDP_QMDLL.md#FileExists)。

## 示例

```cpp
// 如果文件存在，获取完整路径：
str s.searchpath("c:\folder\file.txt")
if(s.len) out s ;; "c:\folder\file.txt"
else out "未找到"

// 搜索 "notepad.exe" 并获取完整路径：
str s.searchpath("notepad.exe")
if(s.len) out s ;; 例如 "c:\windows\system32\notepad.exe"
else out "未找到"

// 获取以特殊文件夹名称开头的完整路径：
str s.expandpath("$Desktop$\new file.txt")
out s ;; 例如 "c:\windows\desktop\new file.txt"
```