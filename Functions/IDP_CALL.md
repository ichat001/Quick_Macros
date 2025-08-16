# 通过地址调用函数

## 语法
```
int call(address [a1 ...])
```

## 参数
- **address** - 函数地址，可为用户定义函数、DLL 函数、子函数或其他代码。对于用户定义函数，也可使用函数名称字符串或 QM 项目 ID。
- **a1 ...** - 函数参数。

## 备注
- 通过函数地址而非名称调用函数，允许运行时动态选择函数，例如调用回调函数。使用[一元运算符 &](../Language/IDP_OPUNARY.md)获取函数地址。
- 返回被调用函数的返回值，类型必须为 `int`。
- 参数类型和数量必须精确匹配，不进行类型转换。复合类型（如 `str`、接口指针等）不能按值传递。引用传递的变量需使用 `&` 运算符，如 `&var`。
- 回调函数应处理错误（必要时使用 [err](../Flow/IDP_ERR.md)）。若回调函数未处理错误，线程将终止，即使调用者使用了 `err`。

**另见**：[IsValidCallback](../User/IDP_QMDLL.html#IsValidCallback)

## 示例
```cpp
// 函数 MyFunction 定义
function# int'i str&s
...

// 常规调用 MyFunction
str s="string"
int r = MyFunction(1 s)

// 通过 call 调用 MyFunction
str s="string"
int fa = &MyFunction
int r = call(fa 1 &s)
// 或
str fn = "MyFunction"
r = call(fn 1 &s)
// 或
int iid = qmitem("MyFunction")
r = call(iid 1 &s)
```