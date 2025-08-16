# 设置字符串长度

## 语法

```
s.fix([length] [flags])
```

## 参数

- **s** - str 变量。
- **length** - 新长度。
  - 默认值：-1，通过搜索空字符查找字符串长度。
  - 不得超过字符串缓冲区的字节数（[nc 属性](IDP_S_DATA.md)）。
- **[flags](../Other/IDP_FLAGS.md)**：
  | 值 | 描述 |
  |----|------|
  | 1  | 不释放额外内存。如果未使用此标志，且 **length** 小于 **nc**，可能会释放额外内存。 |
  | 2  | 限制 **s** 长度。仅当 **length** 小于当前 **s** 长度时更改 **s** 的长度。 |
  | 4  | QM 2.3.3。校正 **length**，使字符串不以无效字节结束。如果 **length** 位于换行字符中间，移除整个换行符。如果位于多字节 UTF-8 字符中间，移除整个字符。 |

## 备注

设置 **s** 的长度。

此函数可用于：
- 在分配字符串缓冲区（[str.all](IDP_S_ALL.md)）后设置正确的字符串长度。通常与需要字符串缓冲区的 DLL 函数一起使用。
- 使字符串变短。例如，可使用 `s.fix(x)` 代替 `s.left(s x)`，或使用 `s.fix(0)` 代替 `s=""`。

**length** 是字节数，而不是字符数。在 Unicode 模式下，非 ASCII 字符占用超过 1 个字节。要限制字符数长度，请使用 `LimitLen` 代替。

## 示例

```cpp
int hwnd = win()
str s
s.all(256)
int i = GetWindowText(hwnd s 256)
s.fix(i)
 // 或：
str s.fix(GetWindowText(win() s.all(256) 256))
```