# 调用 COM 函数

## 语法

方法、属性获取函数和属性设置函数的调用语法如下：

```qm
[... = ]ip.method[(parameters)]
[... = ]ip.property[(parameters)]
ip.property[(parameters)] = value
```

其中：
- **ip** 是接口指针变量；
- **method** 和 **property** 是函数名称。
- 参数通常为 BSTR 或 VARIANT 类型，但您可以传递 QM 内置类型（如 str 等），QM 会自动进行转换。

## 错误

大多数 COM 函数实际返回错误代码，成功时为 0，错误时为负值，部分成功或返回信息时为正值。在 C++ 中定义为 HRESULT 类型（在 QM 中为 int）。调用函数时无需直接使用此返回值。如果在类型库中标记为返回值，则使用最后一个参数作为返回值。如果函数返回负的 HRESULT，QM 会生成错误，可通过 [err](IDP_ERR.md) 处理。只有当函数的返回值声明为 HRESULT 时（几乎所有函数都如此声明），才会出现此行为。QM 将最后调用的 COM 函数的返回值存储在特殊变量 [_hresult](IDP_SPECVAR.md) 中。

## 单语句多重调用

单个语句可包含多个函数调用。如果一个函数返回接口指针，可以立即在该接口指针上调用另一个函数。例如：

```qm
Excel.Worksheet xlSheet=+xlApp.Workbooks.Add(xlWBATWorksheet).ActiveSheet
```

等同于以下三个语句：

```qm
Excel.Workbooks xlBooks=xlApp.Workbooks
Excel.Workbook xlBook=xlBooks.Add(xlWBATWorksheet)
Excel.Worksheet xlSheet=+xlBook.ActiveSheet
```

QM 2.3.0 起，也可用于通过 [interface](IDP_INTERFACE.md) 声明的接口。

## 按引用传递参数

对于“按引用”传递的参数（QM 状态栏中显示为 &），必须传递该类型的变量或该类型变量的地址。不能像在 Visual Basic 中那样传递简单数字或字符串。例如，VB 语句：

```qm
doc = Documents.Add("file")
```

在 QM 中，如果参数按值传递（例如声明为 VARIANT'filename），则相同。但如果参数按引用传递（例如声明为 VARIANT&filename），应为：

```qm
VARIANT v="file"; doc = docs.Add(v)
;; 或
VARIANT v="file"; doc = docs.Add(&v)
```

## 默认成员

QM 不支持默认成员。例如，Visual Basic 语句：

```qm
doc = docs(1) ;;从集合中获取第 1 项
```

在 QM 中应为：

```qm
doc = docs.Item(1)
```

在函数弹出列表中，默认成员显示为蓝色。

## 可选参数

QM 部分支持可选参数。

在 QM 状态栏中，可选参数显示为 `[param]`，具有默认值的可选参数显示为 `[param=1]`。

VARIANT 类型的可选参数可以省略，或使用 `@` 代替。如果有默认值，则使用该默认值。

例如，调用函数 Func，假设它有 3 个可选参数，仅为第 2 个参数传递 x：

```qm
ip.Func(@ x)
```

## 可变数量参数

某些 COM 函数支持可变数量的参数。对于此类函数，QM 状态栏显示“vararg”。

将参数存储到 ARRAY(VARIANT) 变量中，并将其作为最后一个参数传递。例如，假设 QM 状态栏显示：`Func(BSTR's ARRAY(VARIANT)*a) . vararg`：

```qm
ARRAY(VARIANT) a.create(2)
a[0] = 1; a[1] = "string2"
ip.Func("string1" &a)
```

通过 IDispatch::Invoke 调用时，直接传递参数。IDispatch::Invoke 在变量为 IDispatch 类型、使用 `#opt dispatch 1` 或接口不支持 vtbl 绑定时使用。例如：

```qm
ip.Func("string1" 1 "string2")
```

## 无类型库且不想声明接口

您也可以调用未声明接口的函数。接口指针变量必须为 IDispatch 类型。例如：

```qm
IDispatch app._create("Word.Application")
app.Visible = -1
```

参数类型应与预期类型匹配。QM 仅在明显情况下进行隐式转换，例如 str 到 BSTR。返回值类型始终为 VARIANT。

对于未声明的接口，QM 无法显示类型信息（函数弹出列表和状态栏）。

您也可以在 QM 中使用 VBScript 或 JScript 代码。例如：

```qm
lpstr code=
 Set app=CreateObject("Word.Application")
 app.Visible=True
VbsExec code
```

或者，操作单个对象的代码部分可用 VBScript，其他部分用 QM。`VbsFuns` 和 `VbsEval` 函数可用于在 VBScript 和 QM 之间交换值。

## 示例

参见 [其他主题](IDP_COM_FUNC.md) 及 [论坛](http://www.quickmacros.com/forum/viewtopic.php?f=2&t=3368) 中的 COM 示例。