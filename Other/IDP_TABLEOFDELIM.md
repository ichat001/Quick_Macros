# 分隔符

函数 [findw](IDP_FINDW.md)、[findt](IDP_FINDT.md)、[tok](IDP_TOK.md)、[str.gett](IDP_S_GETT.md) 和 [str.findreplace](IDP_S_FINDREPLACE.md) 具有 **delim** 参数，用于指定分隔符。

## **delim** 参数说明

**delim** 可以是以下几种形式：

1. **分隔符字符组成的字符串**：
   - 例如，若 `delim` 为 `" ,"`，则空格和逗号为分隔符。
   - **注意**：`delim` 不是分隔字符串，而是可能分隔符字符的集合。
   - 自 QM 2.3.3 起，这些函数支持使用标志将空白字符作为附加分隔符。

2. **省略、"" 或 0**：
   - 所有非单词字符（non-word characters）作为分隔符。

3. **delim 为 1**：
   - 分隔符为：空格、双引号、括号。

4. **delim 为 2（QM 2.3.3+）**：
   - 分隔符仅为空白字符。

### 空白字符定义

在上述函数中，空白字符包括：
- 空格
- 换行
- 制表符
- ASCII 码 0-31 的所有字符

### 单词字符定义

单词字符包括：
- 字母数字 ASCII 字符（A-Z、a-z、0-9）
- 下划线（`_`）
- [Unicode](IDP_UNICODE.md) 模式：所有非 ASCII 字符
- 非 Unicode 模式：其他 ANSI 字母字符

### Unicode 模式限制

在 Unicode 模式下，分隔符只能使用 ASCII 字符，即使明确指定，非 ASCII 字符也不会作为分隔符。

## 分隔符表

**delim** 也可以是一个分隔符表，使用标志 `0x100`。表必须是 256 字节数组（通常为 `str` 变量），每个字节对应一个 [ASCII 码](IDP_ASCII.md)：
- 分隔符字符的字节设为 1，其他设为 0。例如，`delim[32]=1` 表示空格（ASCII 码 32）为分隔符。
- 始终将 `delim[0]` 设为 1。
- 在 Unicode 模式下，不要使用非 ASCII 字符作为分隔符。

### 示例

创建分隔符表并用于 `tok` 函数，分隔符为所有空白字符（ASCII 码 < 33）、`"`、`<` 和 `>`：

```qm
str d.all(256 2 0)
d.set(1 0 33)
d[34]=1; d['<']=1; d['>']=1

str s="one.one ''two two'' <three + three>"
lpstr s1 s2 s3
int n=tok(s &s1 3 d 1|4|64|256)
;; 结果：s1="one.one", s2="two two", s3="three + three"
```