# 获取字符串长度

## 语法

```qm
int len(s)
```

## 参数

- **s** - 字符串。
  - 可以是 `str` 或 `lpstr` 类型。
  - QM 2.3.0 起，也支持 `BSTR`、`word*` 和 `VARIANT` 类型。

## 说明

返回字符串中的字符数。通过搜索 [终止空字符](IDH_STRINGS.md) 来计算长度。如果 **s** 为 null，返回 0。如果 **s** 是 `VARIANT` 类型且不是 `VT_BSTR`，返回 0。

对于 `str` 和 `lpstr`，此函数始终返回字节数。在 [Unicode](IDP_UNICODE.md) 模式下，某些字符可能由 2-4 个字节组成。对于其他类型，始终返回 2 字节字符的数量。

### 提示

对于 `str` 和 `BSTR` 变量，建议使用 `len` 属性代替此函数。例如：`length = s.len`。

**另见**： [empty](IDP_EMPTY.md)。

## 示例

```qm
lpstr s = "String"
int i = len(s)
;; 现在 i 为 6

str s = "one two"; s[3]=0
out s.len
out len(s)
;; 输出：
;; 7
;; 3
```