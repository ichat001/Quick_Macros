# 将字符串转换为/从 Unicode UTF-16 转换

## 语法

```
s.unicode([ss] [codepage] [length])
s.ansi([ss] [codepage] [length])
```

## 参数

- **s** - str 变量。
- **ss** - 源字符串。默认值：**s**。对于 `ansi`，可以是字符串、word* 或 BSTR。
- **codepage** (QM 2.3.0) - [代码页标识符](https://learn.microsoft.com/en-us/windows/win32/intl/code-page-identifiers)。若省略或为负数，使用 QM 默认代码页（取决于是否运行在 Unicode 模式，见备注）。
- **length** - 从 **ss** 获取的字符数。若省略或为负数，获取整个 **ss**。对于 `unicode`，必须是字节数（即使包含多字节字符）。对于 `ansi`，必须是 2 字节字符数（即使包含 4 字节字符）。

## 备注

Unicode 文本常使用 UTF-16 格式（字符通常为 2 字节，有时为 4 字节），用于大多数 COM 函数、名称以 W 结尾的 Windows API 函数等。然而，QM 函数不支持 UTF-16 字符串，仅支持 ANSI 或 UTF-8 字符串。因此，有时需要将字符串转换为/从 UTF-16 转换。虽然 str 变量通常存储 ANSI 或 UTF-8 字符串，但也可存储 UTF-16 字符串。

- `unicode` 将 **ss** 从 ANSI 或 UTF-8 转换为 UTF-16，并存储结果到 **s**。
- `ansi` 将 **ss** 从 UTF-16 转换为 ANSI 或 UTF-8，并存储结果到 **s**。

QM 2.3.0：BSTR 变量可直接传递给 `ansi`，无需使用其 pstr 成员。

如果 **ss** 包含二进制数据（空字符），函数仅获取第一个空字符之前的内容，除非明确指定 **length**。

[BSTR](../_COM/IDP_OLE_BSTR.md) 类型变量以 UTF-16 格式存储文本。也可使用 = 运算符转换到/从 BSTR，使用默认代码页（ANSI 模式下为 CP_ACP，Unicode 模式下为 CP_UTF8）。与 `ansi`/`unicode` 不同，= 运算符可处理二进制数据。

调用 DLL 函数时，转换到 UTF-16 更方便使用 [运算符 @](../Language/IDP_OPUNARY.md)，见示例。

注意：由于历史原因，函数名称不准确，UTF-8 也是 Unicode 的一种。更好的名称应为 `toutf16`（代替 `unicode`）和 `fromutf16`（代替 `ansi`）。QM 2.3.0 之前不支持 UTF-8，因此当时名称合适。

如果 QM 运行在 ANSI 模式（选项中未勾选 Unicode），默认代码页为 CP_ACP（0），即当前系统 Windows ANSI 代码页，可用 `GetACP` 查看实际值。如果运行在 Unicode 模式（选项中勾选 Unicode），默认代码页为 CP_UTF8（Unicode 以 UTF-8 编码）。

要将字符串从一种 ANSI 或 UTF-8 编码转换为另一种 ANSI 或 UTF-8 编码，可使用 `str` 函数 `ConvertEncoding` 或 `LoadUnicodeFile`，见示例。

另见：[_unicode 变量](../Language/IDP_SPECVAR.md)、[ANSI 和 ASCII 字符](../Tables/IDP_ASCII.md)、[代码页标识符](https://learn.microsoft.com/en-us/windows/win32/intl/code-page-identifiers)。

## 示例

```cpp
int h; str s1 s2 s3
s1="QM_Editor"
s2="QM_Editor"

// 调用需要 UTF-16 字符串作为输入参数的函数
h=FindWindowW(+s1.unicode 0)

// 或使用运算符 @
h=FindWindowW(@s2 0)

// 或使用运算符 L，仅适用于字符串常量
h=FindWindowW(L"QM_Editor" 0)

// 调用使用 UTF-16 字符串作为输出参数的函数
BSTR b.alloc(300)
GetWindowTextW h b 300
s3.ansi(b) ;;注意：不要使用 s3=b，因为它会获取整个缓冲区

out s3

// 从当前 QM 编码转换为 iso-8859-1
s1.ConvertEncoding(_unicode 28591)
```