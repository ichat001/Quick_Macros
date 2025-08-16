# 在二进制数据中查找字符串

## 语法
```
int findb(string substring [len] [from])
```

## 参数
- **string** - 要搜索的字符串，必须为 `str` 类型变量。
- **substring** - 要查找的子字符串，可为字符串或二进制数据指针。
- **len** - **substring** 的字节数，默认值：若 **substring** 为字符串，则为 **substring** 长度；否则此参数必填。
- **from** - 开始搜索的基于 0 的字符索引，默认 0。

## 备注
- 返回 **substring** 在 **string** 中的基于 0 的首字符索引，未找到返回 -1。
- **string** 和 **substring** 均可包含二进制数据（如空字符）。

## 示例
```cpp
str s="one two"; s[3]=0
// 此时 s 在位置 3 包含空字符
int i=findb(s "e[0]t" 3)
// 此时 i 为 2
```