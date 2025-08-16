# FINDRX 类型

`FINDRX` 类型的变量可用于 [findrx](IDP_FINDRX.md) 函数。其定义如下：

```qm
type FINDRX ifrom ito fcallout paramc
```

## 成员说明
- **`ifrom`**：起始匹配位置，基于 0 的字符索引，位于 `string` 中。
- **`ito`**：结束匹配位置。若为 0，则匹配至 `string` 长度。
- **`fcallout`**：[调用回调函数](IDP_CALLOUT.md)的地址。
- **`paramc`**：传递给调用回调函数的自定义值。

在使用 `findrx` 函数之前，可设置部分成员，未使用的成员可保持未初始化（即 0）。例如，若无需调用回调函数，仅需设置 `ifrom` 和/或 `ito`。

## 示例

```qm
str s="One two three"
str rx="[a-z]+(?C)o"
FINDRX r
r.fcallout=&sub.CalloutCallbackFunction
int i=findrx(s rx r)

#sub CalloutCallbackFunction
function#[c] CALLOUT*p
out p.start_match
```