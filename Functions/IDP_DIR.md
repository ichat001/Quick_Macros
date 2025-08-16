# 查找或枚举文件

**已废弃**：推荐使用 [FileExists](../User/IDP_QMDLL.html#FileExists)。可通过“If file exists”、“Get file info”或“Enumerate files”对话框生成代码。

## 语法
```
lpstr dir([file] [flags])
```

## 参数
- **file** - 文件、文件夹或驱动器。
  - 文件名可包含[通配符](../Other/IDP_WILDCARD.html)。
  - 若省略或为 ""，查找当前函数中之前使用 `dir` 时指定的含通配符的 **file** 的下一个匹配项。
- **flags**：
  | 值 | 描述 |
  |----|------|
  | 0 | 仅查找文件。 |
  | 1 | 仅查找文件夹和驱动器。 |
  | 2 | 查找所有。 |
  | 3 | 若为 3 或省略，使用当前函数中之前 `dir` 使用的标志。 |

## 备注
- 若文件存在，返回文件名（含扩展名）；否则返回 0。
- **另见**：[str.searchpath](../str/IDP_S_SEARCHPATH.html)、[特殊文件夹](../Other/IDP_SEARCHPATHS.html)。

## 示例
```cpp
// 检查文件是否存在
if(dir("$desktop$\test.txt"))
	out "文件存在"

// 枚举桌面上的 .txt 文件
lpstr s=dir("$desktop$\*.txt")
rep
	if(s = 0) break
	out s
	s = dir

// 枚举 c:\windows 中的文件夹
lpstr s=dir("c:\windows\*" 1)
rep
	if(s = 0) break
	out s
	s = dir

// 枚举驱动器
Wsh.FileSystemObject fso._create
Wsh.Drive dr
foreach dr fso.Drives
	out dr.Path
	out dr.DriveType ;;0 未知, 1 可移动, 2 固定, 3 网络, 4 CD-ROM, 5 RAM 磁盘
```