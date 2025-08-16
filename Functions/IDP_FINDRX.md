# 使用正则表达式查找或比较字符串

**相关内容**：
- [正则表达式简介](../RegExp/IDP_PCRE.html)
- [正则表达式语法](../RegExp/IDH_PCRE.html)
- [str.replacerx](../str/IDP_S_REPLACERX.html)

## 语法
```
int findrx(string pattern [from] [flags] [result] [submatch])
```
或
```
int findrx(string pattern rf [flags] [result] [submatch])
```

## 参数
- **string** - 要搜索的字符串。
- **pattern** - 正则表达式，匹配要查找的子字符串，类型为字符串。
- **from** - 开始搜索的基于 0 的字符索引，默认 0。
- **rf** - [FINDRX](../RegExp/IDP_FINDRXSTRUCT.html) 类型变量，用于设置搜索的字符串范围和回调函数。
- **flags**：
  | 值 | 描述 |
  |----|------|
  | 1 | 不区分大小写。 |
  | 2 | 整词匹配，在 **pattern** 首尾添加 `\b`。 |
  | 4 | 查找所有匹配项，仅当 **result** 为数组时有效。 |
  | 8 | 多行模式，若设置（或 **pattern** 中使用 `(?m)`），`^` 和 `$` 匹配行首和行尾；默认匹配整个字符串的首尾。 |
  | 16 | 不需要子匹配，当 **result** 为数组时可加速。 |
  | 32 | QM 2.3.0：将 **pattern** 从 UTF-8 转换为 ANSI（仅在 QM 运行于 Unicode 模式时有效，忽略否则）。用于 **pattern** 含非 [ASCII](../Tables/IDP_ASCII.html) 字符而 **string** 为 ANSI 的情况。 |
  | 128 | 仅编译 **pattern**。 |
  | [PCRE 标志](../RegExp/IDP_PCREFLAGS.html) | 其他 PCRE 标志。 |
- **result** - `str`、`int`、`ARRAY(str)` 或 `ARRAY(CHARRANGE)` 类型变量。
- **submatch** - 要查找的子匹配编号（整数），0（默认）表示整个匹配。QM 2.4.3 前，若 **result** 为数组或 0，则忽略。

## 备注
- 在 **string** 中查找子字符串，使用正则表达式 **pattern** 指定。支持查找整个匹配、子匹配或所有匹配及子匹配。
  - **匹配**：**string** 中与 **pattern** 匹配的部分。
  - **子匹配**：与 **pattern** 中括号（不以 `?` 开头）包围的子模式匹配的部分。
- **返回值**（取决于标志和其他参数）：
  | 情况 | 返回值 |
  |------|--------|
  | 默认 | 匹配在 **string** 中的基于 0 的首字符索引，未找到返回 -1。 |
  | 非零 **submatch** | 子匹配的首字符索引，未找到返回 -1。 |
  | 标志 4 | 匹配数量，未找到返回 0。 |
  | 标志 128 | 未使用。 |
- **result** 存储匹配信息，取决于其类型（假设未使用标志 4）：
  | 类型 | 存储内容 |
  |------|----------|
  | str | 存储匹配或子匹配（若 **submatch** 非零）；若标志 128，存储编译后的模式。 |
  | int | 存储匹配或子匹配的长度。 |
  | ARRAY(str) | 元素 0 存储匹配，其后元素存储子匹配；若标志 16，仅存储匹配；QM 2.4.3，若 **submatch** 非 0，仅存储子匹配。 |
  | ARRAY(CHARRANGE) | 存储匹配及子匹配的起始和结束偏移；若标志 16，仅存储匹配；QM 2.4.3，若 **submatch** 非 0，仅存储子匹配；也支持 `ARRAY(POINT)`（与 `CHARRANGE` 相同，成员名更短）。 |
- **CHARRANGE 类型**：
  ```cpp
  type CHARRANGE cpMin cpMax
  ```
  - **cpMin**：子字符串（匹配或子匹配）在 **string** 中的基于 0 的首字符索引。
  - **cpMax**：子字符串的结束位置。
- 若设置标志 4 且 **result** 为数组，查找所有匹配，生成二维数组。用 `result[x y]` 访问，其中 `y` 为匹配索引（0 为首个匹配，1 为第二个匹配，...），`x` 为 0 或子匹配索引（0 为整个匹配，1 为首个子匹配，...）。示例：
  - `result[0 0]`：首个匹配。
  - `result[0 1]`：第二个匹配。
  - `result[1 0]`：首个匹配的首个子匹配。
- 若设置标志 128（仅编译）且 **result** 为 `str` 变量，仅编译 **pattern** 并存储到 **result**，不执行搜索。可用于后续 `findrx` 或 `str.replacerx` 的 **pattern** 参数，使用已编译模式可提高约 2 倍速度。编译时仅使用 **pattern**、**flags** 和 **result**，后续使用需保持相同的 **flags** 值。

## 示例
```cpp
// 查找数字 (10)
str subject="abc10 100 def"
out findrx(subject "\d+")

// 查找作为整词的数字 (100)，并存储到 s
str subject="abc10 100 def"
str s
if(findrx(subject "\d+" 0 2 s)>=0) out s

// 提取 HTML 标签（简化的“查找所有”示例）
str html
IntGetFile("http://www.google.com" html)
str pattern="<(.*)>.*</\1>" ;;匹配 HTML 标签
ARRAY(str) a
findrx(html pattern 0 4 a)
int i
for(i 0 a.len)
	out "子匹配=%s, 整体=%s" a[1 i] a[0 i]

// 提取 URL 组件
str subject="http://msdn.microsoft.com:80/scripting/default.htm"
str pattern="(\w+):\/\/([^/:]+)(:\d*)?([^# ]*)"
int i; ARRAY(str) a
if(findrx(subject pattern 0 0 a)<0) out "不匹配"; ret
for i 0 a.len
	out a[i]

// 提取 URL 组件，显示偏移和长度
str subject="http://msdn.microsoft.com:80/scripting/default.htm"
str pattern="(\w+):\/\/([^/:]+)(:\d*)?([^# ]*)"
int i; ARRAY(CHARRANGE) a
if(findrx(subject pattern 0 0 a)<0) out "不匹配"; ret
for i 0 a.len
	int offset(a[i].cpMin) length(a[i].cpMax-a[i].cpMin)
	str s.get(subject offset length)
	out "偏移=%i 长度=%i %s" offset length s

// 仅提取 URL 中的服务器
str subject="http://msdn.microsoft.com:80/scripting/default.htm"
str pattern="(\w+):\/\/([^/:]+)(:\d*)?([^# ]*)"
str server
if(findrx(subject pattern 0 0 server 2)>=0) out server
```