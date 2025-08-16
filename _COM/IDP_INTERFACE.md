# 声明 COM 接口

## 语法

```qm
interface[@|#] typename :baseinterface memberfunctions [{guid}]
```

## 参数

- **typename**：接口的 [名称](IDP_IDENTIFIERS.html)。
- **baseinterface**：此接口继承的基接口。
- **memberfunctions**：成员函数列表。
  - 可在多个缩进行中声明 `typename` 后的成员函数及其他部分。
- **guid**：接口的 [GUID](IDP_GUID.html)，在 [_create](IDP_COM_FUNC.html) 等场景中隐式使用。

## 选项

| 选项 | 说明 |
|------|------|
| `@` | 声明 dispinterface，函数通过 `IDispatch::Invoke` 调用。默认声明普通接口，函数直接调用。 |
| `#` | 所有函数兼容 Automation，C++ 中返回值为 `HRESULT` 类型（在 QM 中隐藏）。若函数返回负 `HRESULT`，QM 抛出运行时错误。 |

## 成员函数语法

```qm
[[attributes]][membertype]membername[(parameters)]
```

### 参数
- **attributes**：以下一个或多个属性：
  | 属性 | 说明 |
  |------|------|
  | `f` | 方法（默认）。 |
  | `p` | 属性设置函数（property-put）。 |
  | `g` | 属性获取函数（property-get）。 |
  | `r` | 属性引用设置函数（property-put byref）。 |
  | `h` | 函数兼容 Automation。若使用了 `#`、 `a` 或 `l`，则可选。不适用于 dispinterface。QM 2.2.0 起，若指定返回类型，`[h]` 等同于 `[a]`；之前版本仅指定 `[h]` 时，函数视为无返回值。 |
  | `a` | 函数兼容 Automation，包含隐藏的返回值参数（不在 `parameters` 中指定）。若使用了 `#`，则可选。不适用于 dispinterface。 |
  | `l` | 函数兼容 Automation，包含隐藏的区域设置参数（不在 `parameters` 中指定）。不适用于 dispinterface。 |

- **membertype**：返回值 [类型](IDP_TYPESPEC.html)。
- **membername**：函数的 [名称](IDP_IDENTIFIERS.html)。
- **parameters**：参数，与 [dll](IDP_DLL.html) 声明相同。必须使用括号（可为空），除非未定义参数。

## 备注

- **功能**：声明 [COM](IDH_COM.html) 接口，定义可用于 COM 对象的函数。COM 接口本质上是函数地址数组，接口指针变量存储 COM 对象的地址，该对象包含函数数组地址。COM 对象可实现多个接口，所有接口均直接或间接继承自 `IUnknown`，其包含 `QueryInterface`、`AddRef` 和 `Release` 三个函数。`QueryInterface` 获取其他接口指针，`AddRef` 和 `Release` 管理对象生命周期。`IDispatch` 接口提供通过名称调用函数的四个方法。QM 自动定义 `IUnknown` 和 `IDispatch`，并在需要时隐式调用其函数（可显式调用，但不在接口成员函数弹窗列表中）。
- **接口声明**：
  - 普通接口需按函数在数组中的确切顺序声明所有成员函数（可更改名称）。仅需完整声明将使用的函数，其他函数可简化为 `x`。若函数未声明参数，调用时可传递任意数量参数，但类型需匹配预期。为明确指定无参数，使用空括号 `()`。
  - dispinterface 可只声明部分函数，顺序任意，函数按名称调用，名称不可更改。
- **其他声明方式**：接口可通过 [reference files](IDH_SETT_FILES.html) 或 [type libraries](IDP_TYPELIB.html) 声明，无需显式声明。`WINAPI` 和 `WINAPIV` 文件包含许多接口声明。
  **示例**：
  ```qm
  WINAPI.ITaskScheduler ts
  ```
- **QM 2.3.0**：支持可选参数，与 [dll](IDP_DLL.html) 类似。
- **QM 2.3.0**：支持注释，与 [type](IDP_TYPE.html) 类似。
- **QM 2.4.1**：参数可声明为 [引用而非指针](IDH_POINTERS.html)，如 `VARIANT&p` 等同于 `VARIANT*p`。

**相关内容**： [declarations](IDP_DECLARATION.html), [scope](IDP_IDENTIFIERS.html)

## 示例

```qm
interface IDispatch :IUnknown
	#GetTypeInfoCount(*pctinfo)
	#GetTypeInfo(iTInfo lcid ITypeInfo*pTInfo)
	#GetIDsOfNames(GUID*riid word**rgszNames cNames lcid rgDispId)
	#Invoke(dispIdMember GUID*riid lcid @wFlags DISPPARAMS*pDispParams VARIANT*pVarResult EXCEPINFO*pExcepInfo *puArgErr)
	{00020400-0000-0000-C000-000000000046}

interface IAccessible :IDispatch
	[ga]IAccessible'Parent()
	[ga]ChildCount()
	[ga]IAccessible'Child(VARIANT'varChild)
	[ga]BSTR'Name(VARIANT'varChild)
	[ga]BSTR'Value(VARIANT'varChild)
	[ga]BSTR'Description(VARIANT'varChild)
	[ga]VARIANT'Role(VARIANT'varChild)
	[ga]VARIANT'State(VARIANT'varChild)
	[ga]BSTR'Help(VARIANT'varChild)
	[ga]HelpTopic(BSTR*pszHelpFile VARIANT'varChild)
	[ga]BSTR'KeyboardShortcut(VARIANT'varChild)
	[ga]VARIANT'Focus()
	[ga]VARIANT'Selection()
	[ga]BSTR'DefaultAction(VARIANT'varChild)
	[h]Select(flagsSelect VARIANT'varChild)
	[h]Location(*pxLeft *pyTop *pcxWidth *pcyHeight VARIANT'varChild)
	[a]VARIANT'Navigate(navDir VARIANT'varStart)
	[a]VARIANT'HitTest(xLeft yTop)
	[h]DoDefaultAction(VARIANT'varChild)
	[ph]Name(VARIANT'varChild BSTR'szName)
	[ph]Value(VARIANT'varChild BSTR'szValue)
	{618736e0-3c3d-11cf-810c-00aa00389b71}

interface# ITask :IScheduledWorkItem
	SetApplicationName(@*pwszApplicationName)
	GetApplicationName(@**ppwszApplicationName)
	SetParameters(@*pwszParameters)
	GetParameters(@**ppwszParameters)
	SetWorkingDirectory(@*pwszWorkingDirectory)
	GetWorkingDirectory(@**ppwszWorkingDirectory)
	SetPriority(dwPriority)
	GetPriority(*pdwPriority)
	SetTaskFlags(dwFlags)
	GetTaskFlags(*pdwFlags)
	SetMaxRunTime(dwMaxRunTimeMS)
	GetMaxRunTime(*pdwMaxRunTimeMS)
	{148BD524-A2AB-11CE-B11F-00AA00530503}

interface@ IExample :IDispatch #Method(VARIANT'v) [g]BSTR'Property() [p]Property(BSTR'name)
```