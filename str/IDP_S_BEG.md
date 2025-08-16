# 比较字符串的开头、结尾或中间部分

## 语法

```
int s.beg(string [lens])
int s.begi(string [lens])
int s.end(string [lens])
int s.endi(string [lens])
int s.mid(string from [lens])
int s.midi(string from [lens])
```

## 参数

- **s** - str 变量。
- **string** - 用于比较的字符串。
- **lens** - 要比较的字符数。默认值：-1（函数自动获取 **string** 的长度）。
- **from** - 在 **s** 中开始比较的基于 0 的字符索引。

## 备注

- `beg` 如果 **s** 以 **string** 开头，返回 1；否则返回 0。
- `end` 如果 **s** 以 **string** 结尾，返回 1；否则返回 0。
- `mid` 如果 **s** 在 **from** 位置包含 **string**，返回 1；否则返回 0。

- `begi`、`endi` 和 `midi` 执行不区分大小写的比较。

## 示例

```cpp
str s = "Edit\Copy"
if(s.beg("Edit")) out "True"; else out "False"
 // 真
if(s.midi("cop" 5)) out "True"; else out "False"
 // 真
```