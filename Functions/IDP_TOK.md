# 分割字符串（Tokenize）

## 语法

```qm
int tok(string arr [n] [delim] [flags] [arr2])
```

## 参数

- **string** - 要分割的字符串，通常为 `str` 变量。
- **arr** - 接收分割后的令牌（tokens）。类型为 `ARRAY(str)` 或 `ARRAY(lpstr)`，也可以是 [基于指针的数组](IDP_TOK2.md)（`str` 或 `lpstr`）。如果不需要，可为 0。
- **n** - 所需的最大令牌数。如果省略或为 -1，则获取所有令牌。
- **delim** - [分隔符](IDP_TABLEOFDELIM.md)。
- **[flags](IDP_FLAGS.md)**：
  | 标志 | 描述 |
  |------|------|
  | 1 | 修改 **string**：将每个令牌后的第一个分隔符替换为 0。<br>- 适用于 `arr` 为 `lpstr` 数组时。<br>- **string** 必须为 `str` 类型，非 `lpstr`。 |
  | 2 | 如果令牌数超过 **n**，将剩余部分作为最后一个（第 **n**-1）令牌。<br>- 例如，`string` 为 `"a b c"`，**n** 为 2，将得到 `"a"` 和 `"b c"`，而非 `"a"` 和 `"b"`。 |
  | 4 | 不分割 `" "`（双引号）内的部分。<br>- 例如，`tok "a, 'b, c'" a -1 ", '" 4` 得到 `"a"` 和 `"b, c"`，而非 `"a"`、`"b"`、`"c"`。 |
  | 8 | 不分割 `( )` 内的部分。 |
  | 16 | 不分割 `[ ]` 内的部分。 |
  | 32 | 不分割 `{ }` 内的部分。 |
  | 64 | 不分割 `< >` 内的部分。 |
  | 128 | 不分割 `' '`（单引号）内的部分。 |
  | 0x100 | **delim** 为分隔符表。 |
  | 0x200 (QM 2.3.1) | 递归解析 `( )`、`[ ]`、`{ }`、`< >` 内的部分。<br>- 例如，解析 `"a (b > c) d"` 时，标志 `8|64` 得到 `"a (b "`, `"c"`, `"d"`；加上 `0x200` 得到单个令牌 `"a (b > c) d"`。 |
  | 0x400 (QM 2.3.1) | 禁用以下默认行为：<br>1. 双引号 `""` 内的 `)]}>` 字符被忽略。<br>2. 单引号 `''` 内的单个 `)]}>` 字符被忽略。 |
  | 0x1000 (QM 2.3.3) | 分隔符包括空白（空格、制表符、换行符、控制字符）和 **delim** 字符。 |
  | 0x2000 (QM 2.3.5) | 始终修剪令牌周围的空白，并移除空令牌。<br>- 例如，`tok " a , b " a -1 "," 0x2000` 得到 `"a"` 和 `"b"`，而非 `" a "` 和 `" b "`。 |
- **arr2** - 存储令牌之间（之后）的部分，长度与 **arr** 相同。如果不需要，可为 0。

## 说明

解析 **string** 并将令牌存储到 **arr** 中，返回令牌数量。

- 如果 **arr** 是 `str` 数组，接收令牌的副本；如果是 `lpstr` 数组，接收指向 **string** 内令牌的指针，速度更快。
- QM 2.3.5 起：即使 **delim** 不包含相关字符，标志 4-128 仍有效，令牌将包含这些字符。
- QM 2.3.5 修复：当括号内的部分前面有非分隔符字符时，标志 4-128 被忽略的错误。

### 提示

虽然 `tok` 可用于获取多行字符串的行，但有更简单的方法。参见示例 3、[foreach](IDP_FOREACH.md)、[findl](IDP_FINDL.md)、[str.getl](IDP_S_GETL.md)。

也可以使用 [正则表达式](IDP_PCRE.md)（[findrx](IDP_FINDRX.md)、[str.replacerx](IDP_S_REPLACERX.md)）或其他字符串函数（如 `find`、`findc`、`findw`）解析字符串。

## 示例

### 示例 1

```qm
str s = "one two three"
ARRAY(str) arr
int i nt
nt = tok(s arr)
for(i 0 nt) out arr[i]
;; 输出：
;; one
;; two
;; three
```

### 示例 2

```qm
str s = "one, (two + three) four five"
ARRAY(str) arr arr2
int i nt
nt = tok(s arr 3 ", ()" 8 arr2)
for(i 0 nt) out "'%s' '%s'" arr[i] arr2[i]
;; 输出：
;; 'one' ', ('
;; 'two + three' ') '
;; 'four' ' '
```

### 示例 3

```qm
str s = "one[]two[]three"
ARRAY(str) arr = s
for(int'i 0 arr.len) out arr[i]
;; 输出：
;; one
;; two
;; three
```

### 示例 4

```qm
str s="abcdef"
int i
;; 将 s 分割成字符作为字符串：
ARRAY(str) a.create(s.len)
for(i 0 a.len) a[i].get(s i 1)
;; 将 s 分割成字符作为字符代码：
ARRAY(int) b.create(s.len)
for(i 0 b.len) b[i]=s[i]
```