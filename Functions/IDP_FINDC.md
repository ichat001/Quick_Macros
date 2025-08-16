# 在字符串中查找字符

## 语法
```
int findc(string char [from])
int findcr(string char [fromr])
int findcs(string charset [from])
int findcn(string charset [from])
```

## 参数
- **string** - 要搜索的字符串。
- **char** - 要查找的字符，可为整数 [ASCII 字符码](../Tables/IDP_ASCII.html) 或单字符字符串。
- **charset** - 要查找或跳过的字符集，类型为字符串。
- **from** - 开始搜索的基于 0 的字符索引，默认 0。
- **fromr** - 从右向左搜索的基于 0 的起始字符索引，默认 -1（字符串长度）。

## 备注
- 查找 **string** 中的字符 **char**，未找到返回 -1。
- **findc**：返回 **char** 的基于 0 的索引。
- **findcr**：返回 **char** 的基于 0 的索引，但从右向左搜索。
- **findcs**：返回 **string** 中首个在 **charset** 中的字符的基于 0 的索引。
- **findcn**：返回 **string** 中首个不在 **charset** 中的字符的基于 0 的索引。
- 在 [Unicode](../Other/IDP_UNICODE.html) 模式下，**string** 可包含任意字符，但 **char** 必须为 ASCII 字符，**charset** 仅限 ASCII 字符。如需查找 Unicode 字符，使用 [find](IDP_FIND.md)。

## 示例
```cpp
str s = "c:\windows\calc.exe"
int i = findc(s ':')
// 此时 i 为 1
i = findcr(s '\')
// 此时 i 为 10
i = findcs(s ":\/." 11)
// 此时 i 为 15
```