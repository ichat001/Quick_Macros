# 使用正则表达式查找并替换

另见：[关于正则表达式](../RegExp/IDP_PCRE.md)、[正则表达式语法](../RegExp/IDH_PCRE.md)、[findrx](../Functions/IDP_FINDRX.md)

## 语法

```
int s.replacerx(pattern [replaceto|rr] [flags])
```

## 参数

- **s** - str 变量。
- **pattern** - 匹配要查找的子字符串的正则表达式，字符串。
- **replaceto** - 替换字符串。默认值：""。**replaceto** 中的某些字符序列具有特殊含义：
  | 序列 | 描述 |
  |------|------|
  | $n, $nn, ${n} | 第 n 或 nn 个捕获的[子匹配](../Functions/IDP_FINDRX.md)（1 到 99）。 |
  | $0, ${0} | 整个匹配。 |
  | $$ | $ 符号。 |
  | $` | 匹配前的 **s** 部分。 |
  | $' | 匹配后的 **s** 部分。 |
- **rr** - [REPLACERX](../RegExp/IDP_REPLACERXSTRUCT.md) 类型的变量地址。
- **[flags](../Other/IDP_FLAGS.md)**：
  | 值 | 描述 |
  |----|------|
  | 1  | 不区分大小写。 |
  | 2  | 整词匹配。在 **pattern** 的开头和结尾添加 \b。 |
  | 4  | 单次替换。 |
  | 8  | 多行模式。如果设置此标志（或在 **pattern** 中使用 (?m)），^ 和 $ 匹配行的开头和结尾。默认：^ 和 $ 匹配整个字符串的开头和结尾。 |
  | 32 | QM 2.3.0。将 **pattern** 从 UTF-8 转换为 ANSI。在 QM 运行于 Unicode 模式时使用（否则忽略）。如果 **pattern** 包含非 [ASCII](../Tables/IDP_ASCII.md) 字符，但 **s** 是 ANSI（非 UTF-8），需设置此标志。因为 **pattern** 中的这些字符通常由 2 或 3 个字节组成，而 **s** 中的字符由 1 个字节组成。 |
  | [pcre 标志](../RegExp/IDP_PCREFLAGS.md) | |

## 备注

查找 **s** 中匹配 **pattern** 的部分并替换为 **replaceto**。

如果未设置标志 4，替换所有找到的匹配，并返回替换次数。如果设置标志 4，仅替换第一个找到的匹配，并返回其在 **s** 中的基于 0 的字符索引，若未找到则返回 -1。

## 示例

```cpp
// 将连续的两个相同单词替换为单个单词
str s="Is is the cost of of gasoline going up up?"
out s.replacerx("([a-z]+) \1" "$1" 1|2)
out s
// 输出：
// 3
// Is the cost of gasoline going up?
```