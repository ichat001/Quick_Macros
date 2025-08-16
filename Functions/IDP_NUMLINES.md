# 获取字符串中的行数

## 语法

```qm
int numlines(s)
```

## 参数

- **s** - 字符串。

## 说明

返回字符串 **s** 中的行数，不包括最后的空行。行分隔符可以是回车换行符（`[]`，即 `\r\n`）或仅换行符（`[10]`，即 `\n`）。

**另见**： [findl](IDP_FINDL.md), [getl](IDP_S_GETL.md), [foreach](IDP_FOREACH.md), [行分隔符](IDP_LINEBREAK.md)。

## 示例

```qm
out numlines("one[]two")
out numlines("one[]two[]")
out numlines("")
;; 输出：
;; 2
;; 2
;; 0
```