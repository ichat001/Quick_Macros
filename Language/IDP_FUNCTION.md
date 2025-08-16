# 定义函数参数和返回类型

## 语法
```
function[c][functype] [parameters]
```

## 参数
- **functype** - [返回类型](../Other/IDP_TYPESPEC.html)，默认 `int`。
- **parameters** - 参数列表：
  - 参数语法：`[type]name`
  - 可选参数语法：`[[type]name]`
  - 默认类型为 `int`。
- **c** - 使用 `__cdecl` 调用约定，适用于 C 回调函数，默认 `__stdcall`。

## 备注
- 定义用户自定义函数的返回类型和参数。
- 必须是函数或[子函数](IDP_DIR_SUB.html)的首条语句，仅允许注释在其前。
- 若无需参数，此语句可选，省略时返回类型为 `int`。
- 参数为局部变量，调用函数时接收传递的值（实参）。
- 用 `[]` 括起的参数为可选，未提供时值为 0。
- 若参数声明为指针或引用，须传递对应类型变量的地址，函数可修改该变量。可用于传递 `str`、数组或用户定义类型变量以避免复制。获取变量地址使用 `&` 运算符，引用参数可省略 `&`。某些函数的可选指针/引用参数可接受 0。
- `byte*` 类型参数可接收任意类型指针（如 `str`、`lpstr`、接口指针）。其他类型参数需传递相同或兼容类型的值（字符串到字符串，数值到数值等），需类型转换时使用[运算符 +](IDP_OPUNARY.html)。
- 函数可被其他函数、宏或作为回调函数调用。若通过其他方式（如运行按钮、触发器）启动，通常不传递实参，参数值为 0。可通过 [mac](../Commands/IDP_MAC.html) 或[命令行](https://quickmacros.com/help/Language/..%5CQM_Help%5CIDH_TRIG_COMMANDLINE.html)传递实参。

**另见**：[关于函数](IDH_FUNCTIONS.html)、[函数作为 QM 项目类型](../QM_Help/IDH_FUNCTION.html)、[函数提示](../QM_Help/IDH_FUNCTIONTIPS.html)、[调用方式](../Other/IDP_FUNCTIONCALL.html)、[变量](IDH_VARIABLES.html)、[指针](IDH_POINTERS.html)

## 示例
以下示例成对给出：首例为函数定义，次例为调用代码。假设函数名为 `Func`。

### 示例 1
```cpp
// 函数接受两个 int 参数，返回 int 类型值
function# a b
ret a+b/2

// 调用函数，传递 10 和 20，将返回值赋给变量 i
i = Func(10 20)
```

### 示例 2
```cpp
// 函数接受两个参数（lpstr 和 str 引用），返回 int 类型值
function# lpstr'sFile str&sr
if(!&sr) end "无效参数"
sr.from("$Desktop$\" sFile)
sr.searchpath()
ret s.len

// 调用函数，传递字符串常量和 str 变量地址，若返回非零则显示 s，否则显示错误
str s
if(Func("my file.txt" &s)) out s
else out "文件未找到"
```

### 示例 3
```cpp
// 函数接受两个 byte 指针参数，返回 int 类型值，使用 __cdecl 调用约定
function[c]# !*a !*b
if(a[0]>b[0]) ret 1
if(a[0]<b[0]) ret -1
// 若非通过 ret 返回，返回值为 0
// 此处使用类型声明字符，等同于 function[c]# byte*a byte*b
// 不直接调用，而是作为回调函数被 qsort 调用
str s="New York"
qsort s s.len 1 &Func
out s
// 此时 s 为 " NYekorw"（字符排序后）
```