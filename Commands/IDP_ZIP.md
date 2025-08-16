# 压缩/解压文件

## 语法1 - 压缩

```qm
zip zipfile files [flags] [warnings] [nozipext]
```

## 语法2 - 解压

```qm
zip- zipfile folder [flags2] [warnings]
```

## 参数

### 语法1 - 压缩

- **zipfile** - 标准 zip 文件。
- **files** - 要压缩的文件或文件夹。支持 [通配符](../Other/IDP_WILDCARD.md)。也可为文件/文件夹列表，列表中以 `>` 开头的行被跳过。
- [**flags**](../Other/IDP_FLAGS.md)：

| 标志 | 描述 |
|------|------|
| 1 | 最低压缩级别（更快）。 |
| 2 | 存储完整路径。 |
| 4 | 添加文件夹时不存储相对路径。 |
| 8 | QM 2.3.0：添加文件但不压缩。不可与标志 1 一起使用。 |

- **warnings** - 接收错误列表（如“文件未找到”）的 `str` 变量。若使用，失败的文件会被跳过。若未使用或为 0，失败时报错。
- **nozipext** - QM 2.3.0：逗号分隔的文件扩展名列表（如 "mp3,rar,jpg,chm"）。这些类型的文件将被添加但不压缩。

### 语法2 - 解压

- **zipfile** - 标准 zip 文件。
- **folder** - 解压文件的目标文件夹。
- [**flags2**](../Other/IDP_FLAGS.md)：

| 标志 | 描述 |
|------|------|
| 1 | 覆盖只读文件。 |

- **warnings** - 接收错误列表的 `str` 变量。若使用，失败的文件会被跳过。若未使用或为 0，失败时报错。

## 备注

### 语法1

创建新的 zip 文件 **zipfile** 并添加 **files**。若指定的 zip 文件已存在，则覆盖。

### 语法2

从 zip 文件 **zipfile** 解压所有文件到指定 **folder**。

### Unicode 支持

zip 文件格式不支持 zip 文件内的 Unicode 文件名：
- 在 ANSI 模式下，Unicode 字符转换为相似 ANSI 字符或 `?`，可能导致 zip 文件无效。
- 在 Unicode 模式下，QM 添加/解压 UTF-8 文件名，确保 zip 文件有效，但其他程序可能无法解码 UTF-8。
- 建议避免在 zip 中使用 Unicode 文件名。

### 限制

无法创建或解压大于 2 GB 的 zip 文件。

## 示例

```qm
str zf="$desktop$\test.zip"
str sf.getmacro("List of files to zip")
str sw

out "zip"
zip zf sf 0 sw
if(sw.len) out sw

out "unzip"
zip- zf "$desktop$\unzip" 0 sw
if(sw.len) out sw
```