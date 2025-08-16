# 变量

## 概述

变量用于临时存储数字、文本和其他数据，数据可随时更改。变量可作为参数传递给宏命令和函数。

在使用变量之前，需进行 [声明](IDP_VARIABLES.html)，除非使用 [预定义变量](IDP_SPECVAR.html)。变量声明包括类型和名称。最常用的变量类型包括：
- `int`：用于整数值。
- `str`：用于字符串。
- `double`：用于浮点数值。

变量名称可包含字符 A-Z、a-z、0-9 和 `_`，且不能以数字开头。

### 示例：声明与赋值
```qm
int i; str S3; double _a
i=5
S3="text"
_a=15.477
```

## 变量类型

QM 提供 7 种内置变量类型，以及 7 种 [OLE-Automation 变量类型](IDP_OLETYPES.html)（包括数组），并定义了其他类型。用户可通过 [type](IDP_TYPE.html)、[class](IDP_CLASSES.html)、[interface](IDP_INTERFACE.html) 语句或 [类型库](IDP_TYPELIB.html) 定义更多类型。

### 内置变量类型属性

| 类型 | byte | word | int | long | double | lpstr | str |
|------|------|------|-----|------|--------|-------|-----|
| **是否数字** | 是 | 是 | 是 | 是 | 是 | 否 | 否 |
| **是否字符串** | 否 | 否 | 否 | 否 | 否 | 是 | 是 |
| **是否整数** | 是 | 是 | 是 | 是 | 否 | 否 | 否 |
| **是否带符号** | 否 | 否 | 是 | 是 | 是 | 否 | 否 |
| **大小（字节）** | 1 | 2 | 4 | 8 | 8 | 4 | 16 + 字符串 |
| **[类型字符](IDP_TYPESPEC.html)** | `!` | `@` | `#` | `%` | `^` | `$` | `~` |
| **最小值** | 0 | 0 | -2147483648 | -2^63 | - | - | - |
| **最大值** | 255 | 65535 | 2147483647 | 2^63 - 1 | - | - | - |
| **C++ 对应类型** | BYTE, char | WORD, short | int, long, DWORD, UINT, HWND 等 | __int64 | double | LPSTR, char* | 类似 CString |
| **C# 对应类型** | byte | ushort | int | long | double | - | 类似 string |

### 内存存储

下图展示不同类型变量在内存中的存储方式，绿色方块表示变量占用的字节：

![变量内存图](variables.gif)

## 相关内容

- [变量声明](IDP_VARIABLES.html)
- [存储和作用域](IDP_SCOPE.html)
- [更多存储类型](IDP_SCOPE2.html)
- [预定义变量](IDP_SPECVAR.html)
- [用户定义类型](IDP_TYPE.html)
- [字符串](IDH_STRINGS.html)
- [OLE 类型及其他预定义类型](IDP_OLETYPES.html)
- [安全数组](IDP_OLE_ARRAY.html)
- [类型转换等](IDP_VARTABLE.html)

## 使用场景

- [表达式](IDP_EXPRESSION.html)
- [运算符](IDH_OPERATORS.html)
- [函数](IDH_FUNCTIONS.html)
- [字符串操作](IDH_STRINGS.html)
- [指针](IDH_POINTERS.html)