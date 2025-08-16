# 调用回调函数

[PCRE](IDH_PCRE.md) 提供了一种称为“调用”（callout）的功能，允许在正则表达式模式匹配过程中临时将控制权传递给调用者。在正则表达式中，`(?C)` 标记调用外部函数的点。可以通过在 `C` 后添加一个小于 256 的数字来标识不同的调用点，默认值为 0。例如，以下模式包含两个调用点：

```regex
(?C1)\dabc(?C2)def
```

`FINDRX`（用于 [findrx](IDP_FINDRX.md)）和 `REPLACERX`（用于 [str.replacerx](IDP_S_REPLACERX.md)）类型具有成员 `fcallout`。如果 `fcallout` 是用户定义函数的地址，则每次遇到模式中的调用点时都会调用该函数。

在菜单 **File -> New -> Templates** 中可找到调用函数模板。

函数定义必须以以下形式开头：

```qm
function#[c] CALLOUT&x
```

其中，`x` 是 `CALLOUT` 类型的变量。

## CALLOUT 类型定义

```qm
type CALLOUT version number CHARRANGE*vec $subject length start_match current_position capture_top capture_last FINDRX*frx []REPLACERX*rrx
```

### 成员说明
- **`version`**：类型的版本号。
- **`number`**：模式中编译的调用点编号（即 `?C` 后的数字）。
- **`vec`**：目标字符串中的偏移数组，可检查以提取已匹配的子字符串。
- **`subject`**：目标字符串（`str.replacerx` 中的 `s`，`findrx` 中的 `string`）。
- **`length`**：目标字符串的长度。
- **`start_match`**：当前匹配尝试在目标字符串中的起始偏移。如果模式未锚定，调用函数可能因不同的起点被多次调用。
- **`current_position`**：当前匹配指针在目标字符串中的偏移。
- **`capture_top`**：截至当前已捕获的最高编号子字符串的编号加 1（即 `vec` 长度）。若无子字符串捕获，则值为 1。
- **`capture_last`**：最近捕获的子字符串的编号。
- **`frx`**：传递给 `findrx` 的变量地址。
- **`rrx`**：传递给 `str.replacerx` 的变量地址。

## 返回值

| 返回值 | 含义 |
|--------|------|
| `0`    | 匹配正常继续。 |
| `> 0`  | 当前点匹配失败，但继续回溯测试其他可能性，如同前向断言失败。 |
| `-1`   | 匹配失败（未找到）。 |
| `< -1` | 生成指定错误编号的错误，应小于 -100。 |