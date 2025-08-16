# 替换转义序列为字符，或反之

## 语法

```
s.escape([flags])
```

## 参数

- **s** - str 变量。
- **flags** - 以下之一：
  | 值 | 描述 |
  |----|------|
  | 0  | 将[转义序列](../Language/IDP_CONSTANT.md)（`''`、`[]`、`[digits]`）替换为字符（`"`、换行、字符）。 |
  | 1  | 将不安全字符（`"`、换行、制表符、控制字符、`[`、`''`）替换为转义序列。 |
  | 8  | 进行 URL 解码。 |
  | 9  | 进行 URL 编码。用于包含空格和其他不安全字符的 URL 参数，将除 0-9、A-Z、a-z、_、- 和 . 外的字符替换为 %xx 形式的转义序列，其中 xx 为十六进制格式的字符代码。 |
  | 10 | 与 8 相同，但将 + 解码为空格。 |
  | 11 | 与 9 相同，但将空格编码为 +。 |
  | 16 | QM 2.3.2。跳过 { } 括起来的部分，类似[操作符 F](../Language/IDP_FSTRING.md)。此标志可与 0 和 1 一起使用。与标志 1 一起使用时，在 { } 中将 `"` 替换为 `。 |

## 备注

将转义序列替换为字符，或反之。

QM 2.3.0：移除标志 2（不转义 127 以上的字符）。现在不再转义这些字符，以避免 [UTF-8](../Other/IDP_UNICODE.md) 可能出现的问题。

另见：[str.encrypt](IDP_S_ENCRYPT.md)、[str.ansi](IDP_S_UNICODE.md)。

## 示例

```cpp
str s=
 line 1
 "line 2"
s.escape(1) ;;转义
out s
s.escape(0) ;;取消转义
out s

str s2="one, two"
s2.escape(9) ;;URL 编码
out s2
s2.escape(8) ;;URL 解码
out s2
```