# 移除字符串的一部分

## 语法

```
s.remove(from [nc])
```

## 参数

- **s** - str 变量。
- **from** - 要移除的第一个字符的基于 0 的索引。
- **nc** - 要移除的字符数。默认值：-1（移除右侧所有字符，类似 [str.fix](IDP_S_FIX.md)）。

## 备注

从 **s** 的中间移除 **nc** 个字符。

## 示例

```cpp
str s = "My dog and cat"
s.remove(2 8)
 // 现在 s 是 "My cat"
```