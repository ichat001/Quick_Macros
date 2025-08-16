# 将用户定义类型的变量转换为字符串或从字符串转换

## 语法

```
s.getstruct(var [flags])
s.setstruct(var [flags2])
```

## 参数

- **s** - str 变量。
- **var** - [用户定义类型](../Language/IDP_TYPE.md)的变量。
- **[flags](../Other/IDP_FLAGS.md)**（用于 `getstruct`）：
  | 值 | 描述 |
  |----|------|
  | 1  | 添加成员名称。如果未使用此标志，字符串仅包含值。 |
- **[flags2](../Other/IDP_FLAGS.md)**（用于 `setstruct`）：
  | 值 | 描述 |
  |----|------|
  | 1  | 如果 **s** 包含成员名称，则使用此标志。使用此标志时，**s** 中成员的顺序不重要，某些成员可能缺失，**s** 中某些行可能为空或包含任意数据。适用于用户可能编辑的字符串。如果未使用此标志，**s** 必须仅包含值，与 `getstruct`（不带标志 1）生成的内容完全一致。 |
  | 2  | 字符串中的成员名称不区分大小写。 |
  | 4  | 不清除 **s** 中缺失的 **var** 成员。 |
  | 8  | 如果 **s** 中缺少某些成员，则报错。 |

## 备注

- `getstruct` 将用户定义类型变量 **var** 的所有成员值转换为单一字符串 **s**。
- `setstruct` 从 **s**（由 `getstruct` 或其他代码生成）提取值并填充 **var**。

例如，如果 **var** 是具有两个 int 成员 x 和 y 的类型，**s** 示例可能为：

```
10
20
```

如果使用标志 1，则为：

```
x 10
y 20
```

成员名称和值之间由一个或多个空格分隔。

变量也可以包含字符串。例如，如果 **var** 是具有四个 str 成员 s1、s2、s3 和 s4 的类型，**s** 示例可能为：

```
s1 string1
s2 "string that contains spaces[]or ''escape sequences''"
s3
s4 ""
```

如果字符串包含空格或需要[转义](IDP_S_ESCAPE.md)的字符，在 **s** 中必须转义并用双引号括起来，如示例中的 s2。否则无需括起来。`setstruct` 不会对未括起来的字符串进行取消转义。空字符串如 s3，零长度字符串如 s4。

嵌入数组示例：

```
array_of_int_word_byte_long_double 2 -5 184 0
array_of_byte_also_can_be "string"
array_of_str[0] string1
array_of_str[1] string2
array_of_POINT[0].x 10
array_of_POINT[0].y 20
array_of_POINT[1].x 30
array_of_POINT[1].y 40
```

如果 int/word/byte 成员名称包含 "flags"，`getstruct` 会以十六进制格式化其值。

使用标志 1 时，函数速度稍慢。

由 `getstruct`（带标志 1）生成的字符串可传递给 [IStringMap](../User/IDP_ISTRINGMAP.md) 的 AddList 函数。需移除引号并对括起来的值取消转义。

并非所有类型都支持。限制：
1. **var** 不能是内置类型（int、byte、word、str、lpstr、long、double）、指针或接口指针。
2. **var** 不能包含 lpstr，不能是或包含 ARRAY、BSTR、VARIANT、指针或接口指针。

QM 2.3.2：限制 2 不适用于 `getstruct`，允许将这些类型用于调试目的。

自 QM 2.2.1 添加。

## 示例

```cpp
out
type T1 byte'x word'y str's
type T2 int'i str's T1't double'd long'k byte'b[2]

T2 t tt
t.i=-5
t.s="''string''[]line2"
t.t.x=200
t.t.y=50000
t.t.s="string2"
t.d=1.55
t.k=0x100000000
t.b[0]=3
t.b[1]=4

str s
s.getstruct(t 1)
out s
out "---"
s.setstruct(tt 1)

out tt.i
out tt.s
out tt.t.x
out tt.t.y
out tt.t.s
out tt.d
out tt.k
out tt.b[0]
out tt.b[1]

// 输出：
// i -5
// s "''string''[]line2"
// t.x 200
// t.y 50000
// t.s string2
// d 1.55
// k 4294967296
// b[0] 3
// b[1] 4
// ---
// -5
// "string"
// line2
// 200
// 50000
// string2
// 1.55
// 4294967296
// 3
// 4
```