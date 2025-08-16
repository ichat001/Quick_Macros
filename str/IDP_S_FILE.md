# 读取或写入文件

## 语法

```
s.getfile(file [from] [nbytes])
s.setfile(file [from] [nbytes] [flags])
```

## 参数

- **s** - str 变量。
- **file** - [文件](../Other/IDP_SEARCHPATHS.md)。
- **from** - 文件中的偏移量。默认值：0。
- **nbytes** - 要读取或写入的字节数。默认值：-1。
- **[flags](../Other/IDP_FLAGS.md)**（仅用于 `setfile`）：
  | 值 | 描述 |
  |----|------|
  | 1  | 追加换行符。 |
  | 2  | 写入现有文件（OPEN_ALWAYS）时，在写入结束处设置文件结束标志。详情见备注。 |
  | 4  | QM 2.3.2。创建新文件或打开现有文件。详情见备注。 |
  | 0x100 | QM 2.4.0。安全保存。文件在断电等情况下不会损坏。写入临时文件，刷新其缓冲区，然后将临时文件重命名为 **file**，如存在则替换。 |
  | 0x200 | QM 2.4.0。安全保存并备份。与 0x100 相同，但还会创建名为 **file**-backup 的备份文件。 |

## 备注

---

### getfile
`getfile` 将文件内容加载到 **s**。

如果文件不存在，会报错。

如果未使用 **from** 和 **nbytes** 或它们为 0 和 -1，则加载整个文件。

如果 **from** 大于 0 且未使用 **nbytes** 或为 -1，则从 **from** 开始加载整个文件。

如果 **from** + **nbytes** 超过文件长度，不会报错，但 **s** 将包含少于 **nbytes** 的内容或为空。

QM 2.4.1：`getfile` 支持[宏资源](../Other/IDP_RESOURCES.md)。如果 **file** 是资源名称（例如 "resource:data.bin"），则获取资源数据。在创建 [exe](../QM_Help/IDH_MAKEEXE.md) 时，QM 将宏资源添加到 exe 资源中，在 exe 中 `getfile` 从 exe 资源获取数据。不要使用 **from** 和 **nbytes**。

QM 2.3.0：`getfile` 支持 [exe 资源](../QM_Help/IDH_MAKEEXE.md#a3)。如果 **file** 以 : 和 1 到 0xffff 的整数开头（例如 ":5 c:\data.bin"），在 exe 中 `getfile` 从 id 为该数字且类型为 RT_RCDATA (10) 的 exe 资源获取数据。在 QM 中运行宏时，从文件中获取数据。如果勾选了“自动添加文件...”，QM 在创建 exe 时将文件添加到 exe 资源。不要使用 **from** 和 **nbytes**。

不要使用此函数加载大文件，因为可能无法为 **s** 分配内存。应分部分读取文件。使用 Windows API 函数更高效，可使用 `__HFile` 类。或使用数据库，例如 `Sqlite` 类。

---

### setfile
`setfile` 将 **s** 写入文件。

如果文件不存在，则创建。使用 Windows API 函数 `CreateFile`，创建模式为 CREATE_ALWAYS 或 OPEN_ALWAYS。
- 默认使用 CREATE_ALWAYS。如果文件存在，删除并创建新文件。
- 如果使用标志 4 或 **from** 非 0，则使用 OPEN_ALWAYS。如果文件存在，打开以写入，保留未被新数据覆盖的旧数据。可使用标志 2 截断旧数据。

如果 **from** 为 -1，则追加。

如果 **nbytes** 小于 0 或大于 **s**.len，则写入整个 **s**。

安全保存较慢，因为会立即写入磁盘（否则 Windows 会延迟写入）。然后仅重命名文件，速度快。但如果使用 OPEN_ALWAYS，会将旧文件复制到临时文件，若文件较大可能较慢。

`setfile` 可能的错误：
- 文件名包含无效字符。可使用 `str` 函数 ReplaceInvalidFilenameCharacters 避免。
- 文件被其他进程或 QM 函数独占访问。
- QM 未以管理员身份运行，且文件在 Program Files、Windows 或其他受保护文件夹中。
- 文件具有只读属性。使用安全保存时，函数会移除此属性且不失败。

QM 2.3.5：如果父文件夹不存在，会创建。在旧版 QM 中会报错。

---

### 注意
在 [Unicode 模式](../Other/IDP_UNICODE.md) 下，其他字符串函数将文本解释为 UTF-8。如果使用 `getfile` 加载包含非 ASCII 字符的 ANSI 文本文件，并将文本传递给其他字符串函数，可能需要[转换](IDP_S_UNICODE.md) ANSI 到 UTF-8。在其他情况下也可能需要转换。

### 提示
- 可使用“My QM”文件夹（在 My Documents 中）保存宏使用的各种文件。使用[特殊文件夹](../Other/IDP_SEARCHPATHS.md)字符串 $my qm$。
- 这些函数打开文件、写入/读取、关闭。若需多次写入/读取而不重新打开，应使用 Windows API 函数，可使用 `__HFile` 类。
- 如果多个线程（运行函数）可能同时访问同一文件，使用 [lock](../Commands/IDP_LOCK.md) 防止冲突。如果多个进程或计算机同时写入文件，使用论坛中的 `CFileInterlocked` 类。
- 可使用 [rget](../Functions/IDP_RGET.md) 和 `rset` 函数读写 ini 文件。

另见：[CSV](../User/IDP_ICSV.md)、[XML](../User/IDP_IXML.md)、`Sqlite` 类、其他文件类别函数和类。

## 示例

```cpp
str s1 s2 f
f="$my qm$\test.txt"
s1="test data"
s1.setfile(f)
s2.getfile(f)
out s2
```