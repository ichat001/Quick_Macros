# 转换为小写或大写

## 语法1

```
s.lcase([ss])
s.ucase([ss])
```

## 语法2

```
s.lcase(from [length])
s.ucase(from [length])
```

## 参数

- **s** - str 变量。
- **ss** - 在转换前赋给 **s** 的字符串。
- **from**, **length** (QM 2.3.5) - 字符（字节）范围。
  - 如果省略 **length** 或为 -1，从 **from** 开始转换所有字符。
  - 如果范围在多字节 UTF-8 字符中间结束，则包含整个字符。

## 备注

- `lcase` 转换为小写。
- `ucase` 转换为大写。

## 示例

```cpp
str s1 = "String"
s1.ucase
out s1 ;;STRING

str s2 = "sTrInG"
s2.ucase(0 1)
s2.lcase(1)
out s2 ;;String
```