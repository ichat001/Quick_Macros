# 字符串中的变量（Strings with Variables）

## 概述

**QM 2.3.2** 引入，使用 `F` 操作符在字符串中插入变量或其他表达式，变量需用 `{}` 括起来。

## 语法

```qm
F"text{variable1}text{variable2}"
```

- **自定义格式**：在变量后添加 [格式字段](IDP_PRINTF.html)，使用双 `%`，如 `F"text{variable1%%-20s}text"`。
- **默认格式**（根据变量类型）：

| 类型 | 默认格式 |
|------|----------|
| `int`, `word`, `byte`, 指针 | `%i`（若为 `0x{variable}` 则用 `%X`） |
| `str`, `lpstr` | `%s` |
| `long` | `%I64i`（若为 `0x{variable}` 则用 `%I64X`） |
| `double` | `%.15G` |
| 其他类型 | 不支持 |

## 多行字符串

支持在 [多行字符串](IDP_CONSTANT.html) 中使用变量：

```qm
str s=F
 text{variable1}text
 text{variable2}text
```

## 转义序列

- 转义序列（如 `[]`、`''`）仅在字符串的文本部分替换。
- `{` 的转义序列为 `{{`，适用于单行和多行字符串。
- **QM 2.3.4**：变量字段中支持用反引号（`）括起的字符串，多行字符串中用 `"` 替代。

## 限制

- 含变量的字符串不可用于必须为常量的场景，如 DLL 名称或 [case](IDH_REFERENCE.html#case) 字符串。
- 用于宏名或文件名时，阻止自动将宏或文件添加到 [exe](IDH_MAKEEXE.html)。

## 示例

```qm
int i=50
str s="stringvar"
double d=3.1415926535897932384626433832795
str sv=F"variables: i={i}, s=''{s}'', d={d%%.5G}, sum={i+d}, function={_s.from(`string` i)}"
out sv ;; 输出：variables: i=50, s="stringvar", d=3.1416, sum=53.1415926535898, function=string50

; 也可结合 key 使用 F"string"
key TT F"variables: 0x{i} {s%%20s} {d}" Y
```

## 相关内容

- [str.format](IDP_S_FORMAT.html)
- [字符串常量和转义序列](IDP_CONSTANT.html)
- [str.escape](IDP_S_ESCAPE.html)