# 复制、重命名或移动文件和文件夹

## 语法

```
cop[+|-|!] from to [flags]
ren[*|+|-|!] from to [flags]
```

## 参数

- **from** - 源文件或文件夹。
- **to** - 目标文件夹或文件。若使用 `ren` 的 `*` 选项（重命名），必须为不含路径的新文件名。
- **flags** - 参见 [标志说明](IDP_COPFLAGS.md)。

### 选项

| 选项 | 描述 |
|------|------|
| 默认 | 若目标文件已存在，显示对话框询问操作。 |
| + | 若目标文件已存在，重命名复制或移动的文件。 |
| - | 若目标文件已存在，替换它。 |
| ! | 若目标文件已存在，报错。可使用 [err](../Flow/IDP_ERR.md) 继续执行。不可用于文件列表。 |
| *（仅 `ren`） | 重命名。默认：移动，或移动并重命名。 |

## 备注

- `cop` 复制文件或文件夹。
- `ren` 移动或/和重命名文件或文件夹。
- 与所有 QM 文件函数一样，支持[特殊文件夹](../Other/IDP_SEARCHPATHS.md)。也支持相对路径（QM 2.3.0 及以上版本改进）。
- 复制或移动多个文件的方法：
  1. 在 **from** 的文件名部分使用[通配符](../Other/IDP_WILDCARD.html)，**to** 必须为文件夹，所有匹配文件将复制到该文件夹。若需复制匹配的子文件夹，需移除 FOF_FILESONLY 标志。可使用“Copy Files”或“Move/Rename Files”对话框插入正确标志。
  2. 在 **from** 中使用文件全路径列表，每行一个文件，**to** 可为单一文件夹或目标文件列表。
  3. 枚举文件，使用“Enumerate Files”对话框插入代码。
- 函数操作类似于用户手动执行，对小文件较慢（尤其在 Vista 上）。可使用更快的函数：`FileCopy`、`FileMove`、`FileRename`。
- QM 2.3.0：移除自动延迟。

### 提示
将文件拖放到宏文本上可插入完整路径。

## 示例

```cpp
// 复制文件 "x.txt" 从 "c:\a" 到 "c:\b" 文件夹
cop "c:\a\x.txt" "c:\b\x.txt"

// 若 "c:\b\x.txt" 已存在，复制为 "Copy of x"
cop+ "c:\a\x.txt" "c:\b\x.txt"

// 若 "c:\b\x.txt" 已存在，替换它
cop- "c:\a\x.txt" "c:\b\x.txt"

// 复制 "c:\a" 中的所有文本文件到 "c:\b" 文件夹
cop "c:\a\*.txt" "c:\b"

// 复制所有文件（不包括子文件夹）
cop "c:\a\*.*" "c:\b"

// 使用变量复制文件
str sfrom = "c:\a\x.txt"
str sto = "c:\b\x.txt"
cop sfrom sto

// 移动文件 "g.gif" 从 "c:\a" 到 "c:\b" 文件夹
ren "c:\a\g.gif" "c:\b"

// 重命名文件 "g.gif" 为 "h.gif"
ren "c:\a\g.gif" "c:\a\h.gif"

// 同上
ren* "c:\a\g.gif" "h.gif"

// 复制多个文件从“我的文档”到桌面文件夹
lpstr dest="$desktop$\from my doc"
mkdir dest
lpstr files=
 $personal$\book1.xls
 $personal$\page1.htm
 $personal$\document1.doc
cop files dest
```