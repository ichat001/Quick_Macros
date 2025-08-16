# 删除文件和文件夹

## 语法

```
del[-] file [flags]
```

## 参数

- **file** - 要删除的文件或文件夹。
- **flags** - 参见 [标志说明](IDP_COPFLAGS.md)。

### 选项

| 选项 | 描述 |
|------|------|
| 默认 | 将文件移至回收站。 |
| - | 删除文件（不移至回收站）。 |

## 备注

- 删除文件或文件夹。
- 与所有 QM 文件函数一样，支持[特殊文件夹](../Other/IDP_SEARCHPATHS.md)，也支持相对路径（QM 2.3.0 及以上版本改进）。
- 删除多个文件的方法：
  1. 在 **file** 的文件名部分使用[通配符](../Other/IDP_WILDCARD.md)，删除所有匹配文件。若需删除匹配的文件夹，需移除 FOF_FILESONLY 标志。可使用“Delete Files”对话框插入正确标志。
  2. 在 **file** 中使用文件全路径列表，每行一个文件。
  3. 枚举文件，使用“Enumerate Files”对话框插入代码。
- 函数操作类似于用户手动执行，对小文件较慢（尤其在 Vista 上）。可使用更快的函数 `FileDelete`。
- QM 2.3.0：移除自动延迟。

### 提示

将文件拖放到宏文本上可插入完整路径。

## 示例

```cpp
// 将文件移至回收站
del "$desktop$\text.txt"

// 删除文件
del- "$desktop$\text.txt"

// 清空回收站
SHEmptyRecycleBin 0 0 SHERB_NOCONFIRMATION