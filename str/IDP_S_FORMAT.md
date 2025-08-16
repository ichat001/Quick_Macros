# 格式化字符串

另见：[字符串中的变量](../Language/IDP_FSTRING.md)、[字符串常量和转义序列](../Language/IDP_CONSTANT.md)

## 语法

```
s.format(formatstring ...)
s.formata(formatstring ...)
```

## 参数

- **s** - str 变量。
- **formatstring** - 格式控制字符串。
- **...** - 参数。替换 **formatstring** 中格式字段的变量或其他值。
  - 参数的顺序和类型必须与 **formatstring** 中的对应格式字段匹配。
  - 参数必须是[内置类型](../Language/IDH_VARIABLES.md)（str、lpstr、int、double、byte、word、long）。不要使用 [OLE 自动化类型](../_COM/IDP_OLETYPES.md)。

## 备注

`format` 创建包含变量值的字符串。**formatstring** 包含普通字符（直接复制不变）和[格式字段](../Tables/IDP_PRINTF.md)（被参数值替换）。

`formata` 与 `format` 的区别仅在于它将结果追加到 **s** 的末尾。

### 提示
常用的格式字段：
- %i：整数（int、byte、word）
- %s：字符串（str、lpstr）
- %G：双精度浮点数（double）
- %I64i：长整数（long）
- %c：单个字符
- %X：十六进制整数

可通过代码工具栏中的“文本”对话框插入此函数。

`out` 和其他一些函数也支持格式化。例如：`int i=5; out "i=%i" i`

## 示例

```cpp
int i=50
str s="stringvar"
double d=3.1415926535897932384626433832795
str f
f.format("variables: i=%i, s='%s', d=%.10G" i s d)
out f ;;变量：i=50, s="stringvar", d=3.141592654
```