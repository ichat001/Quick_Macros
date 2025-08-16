# 分配或释放字符串缓冲区

## 语法1 - 分配

```
s.all(length [flags] [fillchar])
```

## 语法2 - 压缩

```
s.all(-1)
```

## 语法3 - 释放

```
s.all
```

## 参数

- **s** - str 变量。
- **length** - 要分配的字节数，不包括终止空字符。
- **[flags](../Other/IDP_FLAGS.md)**：
  | 值 | 描述 |
  |----|------|
  | 1  | 保留之前的字符串（最多 **length** 字节）。 |
  | 2  | 将字符串长度（[len 属性](IDP_S_DATA.md)）设置为 **length**。如果未使用此标志，**len** 将为 0 或保留字符串的长度。 |
- **fillchar** - 用于填充分配字符串的[字符](../Tables/IDP_ASCII.md)（不包括保留部分）。如果省略，分配的字符串内容未定义。在 [Unicode 模式](../Other/IDP_UNICODE.md)下，**fillchar** 必须是 ASCII 字符。

## 备注

### 语法1
分配字符串缓冲区（内存）。

设置 [nc 属性](IDP_S_DATA.md) 为分配的字节数，不包括终止空字符。

为提高性能，可能会分配超过 **length** 字节的内存。

### 语法2
压缩字符串缓冲区。释放其他字符串函数可能添加或未释放的额外内存。额外内存用于避免频繁重新分配。

### 语法3
释放字符串缓冲区。将 [lpstr、len 和 length 属性](IDP_S_DATA.md) 设置为 0。

另见：[str.fix](IDP_S_FIX.md)。

### 提示
函数 `all` 可用于在调用需要缓冲区指针的 DLL 函数之前分配缓冲区。DLL 函数返回后，使用不带 **length** 或以 DLL 函数返回值作为 **length** 的 `fix` 函数。

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