# 声明（Declarations）

## 概述

Quick Macros (QM) 除支持 [内置函数](IDH_REFERENCE.html) 外，还可使用 Windows DLL 或其他 DLL（如下载的 DLL）中的函数。这些函数及其相关类型和常量统称为 **应用程序编程接口（API）**，Windows API 文档见 [MSDN 库](IDP_MSDN.html)。使用前需声明，否则 QM 无法找到函数、进行类型检查或获取常量值。

声明可放在使用它们的宏/函数中，或放在之前已执行或 [编译](IDP_DIR_COMPILE.html) 的函数中，例如 [init2](IDP_UDF.html) 函数（若不存在可创建）或具有“QM file loaded”触发器的函数。重复声明相同的标识符不会报错。参见 [更多信息](IDP_IDENTIFIERS.html)。

所有声明的标识符（除局部和线程变量外）具有全局作用域，可在任何宏中使用。它们在输入点号（`.`）时显示在 [弹出列表](IDH_TYPEINFO.html) 中，代码中以不同颜色高亮显示，并可在 QM 状态栏查看。

## 默认声明

部分 Windows API 函数、类型、常量和接口默认已声明，无需手动声明：
- 部分内置于 QM。
- 部分位于 System 文件夹。
- 更多声明位于 [WINAPI 和 WINAPIV 引用文件](IDP_REF.html)。
- QM 论坛提供包含更多声明的文件可供下载。

## 类型库和引用文件

其他声明位于 [类型库](IDP_TYPELIB.html) 和 [引用文件](IDP_REF.html)，无需显式声明标识符，直接使用 `libname.identifier` 语法：
- 在代码中输入库名后加点号（`.`），从弹出列表双击选择标识符。
- QM 引用文件仅 QM 支持，类型库被大多数编程语言支持，主要用于描述 COM 组件。
- 已安装的类型库在 COM Libraries 对话框中列出，许多免费或商业组件及其类型库可在网上获取。
- 类型库和引用文件需声明（使用 [typelib](IDP_TYPELIB.html) 或 [ref](IDP_REF.html)），除非默认已声明。
- 已声明的类型库和引用文件列在全局弹出列表底部。

## 支持的标识符类型

下表列出 QM 支持的所有标识符类型：

| 图标 | 类型 | 声明方式 | 示例 |
|------|------|----------|------|
| ![QM 函数](f_qm.gif) | [QM 内置函数](IDH_REFERENCE.html) | 无需声明 | `lef`, `if` |
| ![用户函数](f_udf.gif) | 用户定义函数 | [function](IDP_FUNCTION.html) | `MyFunction` |
| ![DLL 函数](f_dll.gif) | DLL 函数 | [dll](IDP_DLL.html) | `GetCursorPos` |
| ![QM 类型](type_qm.gif) | [QM 内置类型](IDH_VARIABLES.html), [OLE 类型](IDP_OLETYPES.html) | 无需声明 | `int`, `BSTR` |
| ![用户类型](type_udt.gif) | 用户定义类型 | [type](IDP_TYPE.html) | `LOGFONT` |
| ![类](class.gif) | 类 | [class](IDP_CLASSES.html) | `Ftp` |
| ![COM 类](com_class.gif) | [COM 类](IDH_COM.html) | [类型库](IDP_TYPELIB.html) | `WshNetwork` |
| ![COM 接口](com_interface.gif) | COM 接口 | [类型库](IDP_TYPELIB.html) 或 [interface](IDP_INTERFACE.html) | `IHTMLElement` |
| ![常量](constant.gif) | 命名常量 | [def](IDP_DEF.html) | `WM_USER` |
| ![类型库](lib.gif) | COM 类型库 | [typelib](IDP_TYPELIB.html) | `Shell32` |
| ![引用文件](lib.gif) | API 引用文件 | [ref](IDP_REF.html) | `WINAPI` |
| ![类别](category.gif) | 类别 | [category](IDP_CATEGORIES.html) | `internet` |
| - | [编译器指令](IDH_REFERENCE.html) | 无需声明 | `#ifdef` |
| ![变量](variable.gif) | 变量 | [类型名称](IDP_VARIABLES.html) | `i` |
| ![QM 成员函数](f_qm.gif) | [内置类型的成员函数](IDH_REFERENCE.html) | 无需声明 | `getwintext` |
| ![类成员函数](f_member.gif) | [类成员函数](IDP_CLASSES.html) | QM 项目名称使用特殊语法，类型和参数用 [function](IDP_FUNCTION.html) 声明 | `SetValue` |
| ![COM 方法](com_method.gif) | [COM 方法](IDP_COM_CALL.html)（接口成员函数） | [类型库](IDP_TYPELIB.html) 或 [interface](IDP_INTERFACE.html) | `GoBack` |
| ![COM 属性](com_property.gif) | [COM 属性](IDP_COM_CALL.html)（接口成员函数） | [类型库](IDP_TYPELIB.html) 或 [interface](IDP_INTERFACE.html) | `Height` |
| ![COM 事件](com_event.gif) | [COM 事件](IDP_COM_EVENTS.html)（COM 对象调用的用户函数） | [类型库](IDP_TYPELIB.html) | `a_Activate` |

## 类型库和引用文件支持的声明

- **类型库**：支持 COM 类、COM 接口、用户定义类型、DLL 函数、命名常量、枚举（QM 不直接使用枚举，但可使用其常量）。
- **引用文件**：支持 DLL 函数、用户定义类型、类、类别、COM 接口、命名常量、类型库。