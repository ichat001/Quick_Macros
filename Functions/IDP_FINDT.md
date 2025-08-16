# 查找字符串中的第 n 个标记（部分或单词）

## 语法
```
int findt(string [n] [delim] [flags])
```

## 参数
- **string** - 要搜索的字符串。
- **n** - 基于 0 的标记索引，默认 -1。
- **delim** - [分隔符表](../Other/IDP_TABLEOFDELIM.html)。
- **flags**：
  | 值 | 描述 |
  |----|------|
  | 0x100 | **delim** 为分隔符表。 |
  | 0x200 | QM 2.3.3：向 **delim** 添加空格。 |

## 备注
- 返回 **string** 中第 **n** 个标记（由 **delim** 中的字符分隔的子字符串）的首个字符的基于 0 的索引。若标记数少于 **n**+1，返回 -1。
- 若 **n** 省略或为负数，查找下一个标记（仅在同一函数中有效）。

### 提示
- 查找行时，使用 [findl](IDP_FINDL.md)。

**另见**：[gett](../str/IDP_S_GETT.html)、[findrx](IDP_FINDRX.md)

## 示例
```cpp
// 查找第二个标记
str s = "my.exe /cl"
int i = findt(s 1 " .:\/''[]")
out i ;;3

// 遍历每个单词
int t
for t 0 1000000000
	i=findt(s -t)
	if(i<0) break
	out i
```