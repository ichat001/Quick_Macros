# 移除字符串开头或/和结尾的字符

## 语法

```
s.ltrim([char|chars])
s.rtrim([char|chars])
s.trim([char|chars])
```

## 参数

- **s** - str 变量。
- **char** - 要移除的字符，整数 [字符代码](../Tables/IDP_ASCII.md)。默认值：空格和其他空白字符。
- **chars** - 要移除的字符集，字符串。

## 备注

- `ltrim` 移除 **s** 开头的指定字符。
- `rtrim` 移除 **s** 结尾的指定字符。
- `trim` 移除 **s** 开头和结尾的指定字符。

在 [Unicode 模式](../Other/IDP_UNICODE.md) 下，**char** 或 **chars** 中不要使用非 ASCII 字符。

## 示例

```cpp
str s = " String "
s.trim
 // 现在 s 是 "String"
s.trim('g')
 // 现在 s 是 "Strin"
s.trim("stn")
 // 现在 s 是 "ri"
```