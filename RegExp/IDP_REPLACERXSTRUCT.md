# REPLACERX 类型与替换回调函数

`REPLACERX` 类型可用于 [str.replacerx](IDP_S_REPLACERX.md) 函数，替代替换字符串。其定义如下：

```qm
type REPLACERX ifrom ito fcallout paramc frepl paramr $repl
```

## 成员说明
- **`ifrom`**：起始替换位置，基于 0 的字符索引，位于目标字符串 `s` 中。默认：0。
- **`ito`**：结束替换位置。默认：`s` 的长度。
- **`fcallout`**：[调用回调函数](IDP_CALLOUT.md)的地址。
- **`paramc`**：传递给调用回调函数的自定义值或指针。
- **`frepl`**：替换回调函数的地址。
- **`paramr`**：传递给替换回调函数的自定义值或指针。
- **`repl`**：替换字符串。若 `frepl` 非 0，则忽略。

在使用 `str.replacerx` 之前，可设置所需成员，未使用的成员保持未初始化（即 0）。

若 `frepl` 和 `fcallout` 均为 0，`str.replacerx` 的行为与使用替换字符串（`replaceto`）时相同，但可通过 `ifrom` 和 `ito` 指定替换的字符串部分。

## 替换回调函数

若 `frepl` 为用户定义函数的地址，则每次找到匹配时调用该函数以提供替换字符串。

在菜单 **File -> New -> Templates** 中可找到替换回调函数模板。

函数定义必须以以下形式开头：

```qm
function# REPLACERXCB&x
```

其中，`x` 为 `REPLACERXCB` 类型的变量，由 `str.replacerx` 填充。回调函数应修改 `match` 成员（通常设置为替换字符串），也可能修改其他成员。大多数情况下，仅需设置 `match` 并返回 0。

### REPLACERXCB 类型定义

```qm
type REPLACERXCB ~match ~strnew $subject CHARRANGE*vec lenv number REPLACERX*rrx
```

#### 成员说明
- **`match`**：匹配子字符串的副本，函数可修改，修改后成为替换字符串。
- **`strnew`**：正在格式化的字符串，包含从 `s` 开头到当前匹配的部分（包括之前的替换）。最终替换 `s`。
- **`subject`**：未修改的目标字符串（`s`）。
- **`vec`**：`s` 中的偏移数组。`vec[0]` 包含匹配的起始和结束偏移，后续元素包含子匹配的偏移。若第 n 个子表达式未匹配，`vec[n].cpMin` 和 `vec[n].cpMax` 为 -1。
- **`lenv`**：`vec` 数组的元素数量，至少为 1（无子匹配时）。
- **`number`**：替换次数（第一次为 1，第二次为 2，依此类推）。
- **`rrx`**：传递给 `str.replacerx` 的变量地址。

### 返回值

| 返回值 | 含义 |
|--------|------|
| `0` | 表示 `match` 为替换字符串，将追加到格式化字符串中。若 `match` 未修改，匹配子字符串不被替换。 |
| `> 0` | 表示不追加任何内容到格式化字符串，可用于删除匹配子字符串或由回调函数直接向 `strnew` 追加替换。 |
| `-1` | 停止替换过程，`str.replacerx` 立即返回，返回不包括当前替换的替换次数（单次替换模式下返回 -1）。若需包含当前替换并停止，设置 `x.rrx.ito = 0`。 |
| `< -1` | 生成指定错误编号的错误，需小于 -100。 |

## 示例
将字符串 `s` 中的所有十进制数字乘以 5：

```qm
str s="A2 B100"
REPLACERX r
r.frepl=&sub.replacerx_callback
s.replacerx("\d+" &r)
out s ;; A10 B500

#sub replacerx_callback
function# REPLACERXCB&x
x.match = val(x.match) * 5
```