# 设置字符串的一部分

## 语法1

```
s.set(ss [from] [nc])
```

## 语法2

```
s.set(char [from] [nc])
```

## 参数

- **s** - str 变量。
- **ss** - 源字符串。
- **char** - 源字符，整数 [字符代码](../Tables/IDP_ASCII.md)。
- **from** - 复制位置，**s** 中的基于 0 的字符索引。默认值：0。
- **nc** - 要复制的字符数。

## 备注

- **语法1**：从 **ss** 复制 **nc** 个字符（若省略 **nc**，则复制整个 **ss**）到 **s**，从 **from** 开始。
- **语法2**：若省略 **from** 和 **nc**，用 **char** 填充 **s**。否则，从 **from** 开始，将 **nc** 个（默认值为 1）**char** 字符复制到 **s**。在 [Unicode 模式](../Other/IDP_UNICODE.md) 下，不要使用非 ASCII 字符。
- **共同点**：如果 **from** + **nc** 大于 **s**.len，**s** 会自动扩展。如果 **from** 大于 **s**.len，从 **s**.len 到 **from** 的区域会用空格填充。

## 示例

```cpp
str s = "My dog"
s.set("cat" 3)
 // 现在 s 是 "My cat"

str s.all(6 2)
 // 现在 s 已分配 6 个字节，字符串内容未定义
s.set(' ')
 // 现在 s 是 "      "（6 个空格）

str s = "Number"
s.set('1' 7)
 // 现在 s 是 "Number 1"
```