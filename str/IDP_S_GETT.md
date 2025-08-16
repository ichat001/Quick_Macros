# 查找并获取其他字符串的第 n 个标记

## 语法

```
int s.gett(ss [n] [delim] [flags])
```

## 参数

- **s** - str 变量。
- **ss** - 源字符串。
- **n** - 标记的基于 0 的索引。默认值：-1。
- **delim** - [分隔符](../Other/IDP_TABLEOFDELIM.md)。
- **[flags](../Other/IDP_FLAGS.md)**：
  | 值 | 描述 |
  |----|------|
  | 2  | 获取右侧所有部分。 |
  | 0x100 | **delim** 为分隔符表。 |
  | 0x200 | QM 2.3.3。向 **delim** 添加空格。 |

## 备注

从 **ss** 获取第 **n** 个标记（由 **delim** 中的字符分隔的子字符串）。返回该标记第一个字符在 **ss** 中的基于 0 的索引。如果 **ss** 中的标记数少于 **n**+1，返回 -1。

如果省略 **n** 或为负数，则查找下一个标记。仅在同一函数中有效。

### 提示
要获取行，使用 [getl](IDP_S_GETL.md)。

另见：[findt](../Functions/IDP_FINDT.md)、[findrx](../Functions/IDP_FINDRX.md)。

## 示例

```cpp
// 获取第二个标记
str s = "my.exe /cl"
str st.gett(s 1 " .:\/''[]")
out st

// 遍历每个单词
int t
for t 0 1000000000
    if(st.gett(s -t)<0) break
    out st
```