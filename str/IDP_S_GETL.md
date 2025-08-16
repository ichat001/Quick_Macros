# 查找并获取其他字符串的第 n 行

## 语法

```
int s.getl(ss [n] [flags])
```

## 参数

- **s** - str 变量。
- **ss** - 源字符串。
- **n** - 行的基于 0 的索引。默认值：-1。
- **[flags](../Other/IDP_FLAGS.md)**：
  | 值 | 描述 |
  |----|------|
  | 2  | 获取右侧所有部分。 |

## 备注

从 **ss** 获取第 **n** 行。返回 **ss** 中该行第一个字符的基于 0 的索引。如果 **ss** 中的行数少于 **n**+1，返回 -1。

如果省略 **n** 或为负数，则获取下一行。仅在同一函数中有效。

另见：[findl](../Functions/IDP_FINDL.md)、[numlines](../Functions/IDP_NUMLINES.md)、[foreach](../Flow/IDP_FOREACH.md)、[换行字符](../Other/IDP_LINEBREAK.md)。

## 示例

```cpp
str s ss="one[]two[][]four[]"
int i
for i 0 2000000000
    if(s.getl(ss -i)<0) break ;;没有更多行
    if(s.len=0) continue ;;跳过空行
    out s
```