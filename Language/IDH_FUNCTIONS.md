# 函数

函数是一段命名的、可作为单元执行的代码。它可以接收多个值（参数）并返回一个值。例如，`win` 函数接收窗口名称，查找窗口并返回窗口句柄。除了预定义函数（QM 内置函数、DLL 和 COM 函数），您还可以创建自己的用户定义函数。通常，当需要多次执行同一段代码时，您可以将其放入函数中，然后通过函数名称从任何宏中调用，而无需在每个宏中重复代码。

**另见**：
- [函数作为 QM 项目类型](IDH_FUNCTION.md)
- [函数提示](IDH_FUNCTIONTIPS.md)
- [函数声明（参数等）](IDP_FUNCTION.md)
- [调用函数的多种方式](IDP_FUNCTIONCALL.md)

## 函数调用语法

全局函数（内置、用户定义和 DLL 函数）使用以下语法调用：

```qm
func([a b ...])
```

- **func**：函数名称。
- **a, b, ...**：函数参数。

如果不使用函数的返回值，括号可选。函数返回值可以赋值给变量，或作为另一个函数的参数，或作为带运算符的表达式的一部分。例如：

```qm
Func a b
variable = Func(a b)
Func2(a Func(b c))
d = e + Func(b c) / 10
```

[字符串](IDH_STRINGS.md)、[OLE 类型](IDP_OLETYPES.md)、[用户定义类](IDP_CLASSES.md)和 [COM 接口](IDP_COM_CALL.md) 的成员函数使用以下语法调用：

```qm
var.Func([a b ...])
```

- **var**：调用函数的变量，其类型必须与函数 `Func` 所属的类型一致。

例如，使用字符串函数：

```qm
str s
s.format("%i %i" a b)
```

用户定义函数和 DLL 函数还可以通过 [地址调用](IDP_CALL.md)。

## QM 内置函数

见 [参考](IDH_REFERENCE.md)。在 QM 编辑器中，内置函数显示为 <span style="color: blue;">此颜色</span>。

## 用户定义函数

[用户定义函数](IDH_FUNCTION.md) 是可以从其他宏调用的宏。在 QM 编辑器中，用户定义函数显示为 <span style="color: #800080;">此颜色</span>。

**另见**：
- [函数提示](IDH_FUNCTIONTIPS.md)
- [子函数](IDP_DIR_SUB.md)

使用 [function](IDP_FUNCTION.md) 定义函数的类型和参数，使用 [ret](IDP_RET.md) 返回值。可以通过 [& 操作符](IDP_OPUNARY.md) 获取函数地址并用作回调函数。用户定义函数也可以像宏一样直接运行（非从代码调用）。函数支持递归（直接或通过其他函数调用自身）。每个运行的函数实例拥有独立的局部变量。

以下展示函数调用和执行的流程。红色线条表示执行流程方向，绿色线条表示参数传递和返回值。第二个参数声明为引用（`&`），因此函数接收变量 `e` 的地址并可修改其值。

![函数调用流程](function.gif)

## 用户定义成员函数

[类成员函数](IDP_CLASSES.md) 与其他用户定义函数类似，但只能通过该类型的变量调用，无其他执行方式。

## DLL 函数

可以使用 Windows API 和其他 DLL 函数。声明 DLL 函数使用 [dll](IDP_DLL.md)。查找 DLL 函数帮助：在编辑器中键入或点击函数名，按 [F1](IDP_F1.md)，然后在 [MSDN 库](IDP_MSDN.md) 或互联网中搜索。

## COM 函数

也可以使用 [COM 函数](IDH_COM.md)。