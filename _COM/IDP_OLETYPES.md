# QM 定义的 OLE 自动化变量类型及其他类型

## 概述

参见：[内置类型](../Language/IDH_VARIABLES.md)

QM 支持 7 种 OLE 自动化类型：FLOAT、[CURRENCY, DECIMAL, VARIANT](IDP_OLE_CDV.md)、[BSTR](IDP_OLE_BSTR.md)、[DATE](IDP_OLE_DATE.md)、[ARRAY](IDP_OLE_ARRAY.md)。前 6 种主要用于 COM 函数。这些类型实际上是用户定义类型，但在大多数情况下被视为内置类型。QM 会在需要时自动在内置类型与 OLE 自动化类型之间[转换](../Tables/IDP_VARTABLE.md)。然而，仅少数 QM 内置函数支持这些类型，其他函数会将其转换为内置类型。在使用运算符的表达式中，OLE 自动化类型被转换为 double。为获得更高精度，建议使用[成员函数](IDP_OLE_CDV.md)。

以下表格展示了 OLE 自动化类型的属性及其与 C++ 和 C# 变量类型的对应关系：

| 类型 | FLOAT | CURRENCY | DECIMAL | VARIANT | BSTR | DATE | ARRAY |
|------|-------|----------|---------|---------|------|------|-------|
| **数值型** | 是 | 是 | 是 | * |  | 是 |  |
| **字符串** |  |  |  | * | 是 |  |  |
| **可为小数** | 是 | 是 | 是 | * |  | 是 |  |
| **有符号** | 是 | 是 | 是 | * |  | 是 |  |
| **大小（字节）** | 4 | 8 | 16（2 未使用） | 16** | 4** | 8 | 4** |
| **精度** | < double | ~ double | > double | * |  |  |  |
| **C++** | float | CY | DECIMAL | VARIANT | BSTR | DATE, double | SAFEARRAY* |
| **C#** | float |  | decimal | object | string |  | arrays |

* VARIANT 类型变量可包含多种类型的值。

** BSTR 类型变量为指向前缀长度的 Unicode UTF-16（双字节）字符串的指针（4 字节），总大小为 4 + 4 + (字符数 * 2) + 2 字节。VARIANT 类型变量也可包含 BSTR 或其他类型数据的指针。ARRAY 类型变量为指向数组描述符的指针（4 字节），数组描述符包含指向数组数据的指针，其大小取决于数组类型和维度数。

## 其他 QM 定义的类型和接口

QM 还定义了以下类型和接口：

- [QMITEM](../Functions/IDP_QMITEM.md)
- [FILTER](../QM_Help/IDH_TFF.md)
- [QMERROR](../Flow/IDP_ERR.md)
- [POINT](../Functions/IDP_XMYM.md)
- [RECT](../Functions/IDP_SCAN.md)
- [SYSTEMTIME, FILETIME](IDP_OLE_DATE.md)
- [FINDRX, CHARRANGE](../RegExp/IDP_FINDRXSTRUCT.md)
- [REPLACERX, REPLACERXCB](../RegExp/IDP_REPLACERXSTRUCT.md)
- [CALLOUT](../RegExp/IDP_CALLOUT.md)
- [FINDWORDN](../Functions/IDP_FINDT.md)
- [MES](../Functions/IDP_MES.md)
- [UDTRIGGER](../QM_Help/IDH_TRIG_EXT.md)
- [KEYEVENT](../Commands/IDP_KEY.md)
- [GUID](../Functions/IDP_UUIDOF.md)
- [IUnknown, IDispatch](IDP_INTERFACE.md)
- [IAccessible](../Functions/IDP_ACCESSIBLE.md)

及其他类型。