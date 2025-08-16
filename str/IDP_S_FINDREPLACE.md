# 查找并替换

## 语法

```
int s.findreplace(findwhat [replaceto] [flags] [delim] [from])
```

## 参数

- **s** - str 变量。
- **findwhat** - 要查找的字符串。
- **replaceto** - 替换字符串。默认值：""。
- **[flags](../Other/IDP_FLAGS.md)**：
  | 值 | 描述 |
  |----|------|
  | 1  | 不区分大小写。 |
  | 2  | 整词匹配。 |
  | 4  | 单次替换。 |
  | 8  | 重复替换，直到 **s** 中不再包含匹配 **findwhat** 的子字符串。如果不使用此标志，结果字符串可能包含新的匹配子字符串。例如，在字符串 "abbcc" 中将 "bc" 替换为 ""，结果为 "abc"。使用此标志，结果为 "a"。 |
  | 16 | 替换为 [0] 字符。忽略 **replaceto**，可为 ""。 |
  | 32 | QM 2.2.0。替换 [0] 字符。忽略 **findwhat**，可为 ""。 |
  | 64 | QM 2.3.3。如果 **findwhat** 以分隔符开头/结尾，始终匹配。可与标志 2 一起使用。 |
  | 0x100 | **delim** 为分隔符表。 |
  | 0x200 | QM 2.3.3。向 **delim** 添加空格。 |
- **delim** - [分隔符](../Other/IDP_TABLEOFDELIM.md)。
- **from** - 开始位置，**s** 中的基于 0 的字符索引。默认值：0。

## 备注

在 **s** 中搜索 **findwhat**，并替换为 **replaceto**。如果设置了标志 2，则搜索由 **delim** 中的字符分隔的子字符串，否则忽略 **delim**。

如果未设置标志 4，替换所有找到的 **findwhat**，并返回替换次数。如果设置了标志 4，仅替换第一个找到的 **findwhat**，并返回 **findwhat** 在 **s** 中的基于 0 的字符索引。

## 示例

```cpp
str s="one two one twoo one.two"
s.findreplace("two" "THREE" 2 " .")
 // 现在 s 是 "one THREE one twoo one.THREE"

s="one two one two one two"
s.findreplace("two" "THREE" 4 "" 5)
 // 现在 s 是 "one two one THREE one two"

 // 移除空行：
s="one[][][][][]two"
s.findreplace("[][]" "[]" 8)
```