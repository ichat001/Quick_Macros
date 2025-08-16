# 获取其他字符串的一部分

## 语法

```
s.left(ss nc)
s.right(ss nc)
s.get(ss from [nc])
s.geta(ss from [nc])
```

## 参数

- **s** - str 变量。
- **ss** - 源字符串。
- **nc** - 要复制的字符数。
- **from** - 要复制的第一个字符的基于 0 的索引。

## 备注

获取 **ss** 的一部分。

- `left` 获取 **ss** 开头的 **nc** 个字符。
- `right` 获取 **ss** 末尾的 **nc** 个字符。
- `get` 从 **ss** 的中间获取 **nc** 个字符，从 **from** 开始。如果省略 **nc** 或为负数，则获取 **ss** 的右侧所有部分。
- `geta` 获取并追加。

## 示例

```cpp
lpstr lp = "notepad.exe"
str s
s.left(lp 2)
 // 现在 s 是 "no"
s.right(lp 3)
 // 现在 s 是 "exe"
s.get(lp 7)
 // 现在 s 是 ".exe"
s.get(lp 1 2)
 // 现在 s 是 "ot"
s.geta(lp 7 1)
 // 现在 s 是 "ot."
```