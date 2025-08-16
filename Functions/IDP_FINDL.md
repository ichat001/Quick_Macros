# 查找字符串中的第 n 行

## 语法
```
int findl(string [n])
```

## 参数
- **string** - 要搜索的字符串。
- **n** - 基于 0 的行索引，默认 -1。

## 备注
- 返回 **string** 中第 **n** 行的首个字符的基于 0 的索引。若行数少于 **n**+1，返回 -1。
- 若 **n** 省略或为负数，查找下一行（仅在同一函数中有效）。
- QM 2.3.3 修复：**n** 省略时无效的错误。

**另见**：[getl](../str/IDP_S_GETL.html)、[numlines](IDP_NUMLINES.md)、[foreach](../Flow/IDP_FOREACH.html)、[换行符](../Other/IDP_LINEBREAK.html)

## 示例
```cpp
// 查找第二行（行索引 1）
str s = "line0[]line1[]line2"
int i = findl(s 1)
out i ;;7（首行 5 个字符，换行符 2 个字符）

// 遍历每一行
int li
for li 0 1000000000
	i=findl(s -li)
	if(i<0) break
	out i
```