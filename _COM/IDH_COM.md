# QM 中的 COM 支持

**另见**： [关于 COM](IDP_COM_ABOUT.md), [使用 COM 组件](IDP_COM_USAGE.md)。

在 QM 中，您可以：

1. 使用 [类型库](IDP_TYPELIB.md)。查看可用的类型库，在代码中声明它们，并使用类型库中声明的标识符（接口、类型、常量等）。

2. 显式 [声明 COM 接口](IDP_INTERFACE.md)。

3. 使用 [COM 接口指针变量](IDP_COM_IPTR.md)。

4. [创建 COM 对象](IDP_COM_FUNC.md)。

5. [调用 COM 对象函数](IDP_COM_CALL.md)（方法和属性）。

6. 使用早期绑定（VTBL 或 id）或后期绑定。默认情况下，如果可能，QM 使用最快的 VTBL 绑定。您可以使用 [#opt dispatch](IDP_DIR_OPT.md) 指令使用 id 绑定，或使用 `IDispatch` 变量进行后期绑定（无需声明）。

7. 枚举 [集合](IDP_FOREACH.md)。

8. 接收 [事件](IDP_COM_EVENTS.md)。

9. 在 [对话框](IDH_DIALOG_EDITOR.md) 中使用 ActiveX 控件。

10. 使用 [OLE 自动化变量类型](IDP_OLETYPES.md)。

11. 使用 [类型信息](IDH_TYPEINFO.md)。

12. 执行 VBScript 代码。使用 `VbsExec` 及其他来自 System\Functions\Scripting 文件夹的函数。

QM 不支持 VB 和其他语言中的某些功能：默认成员、隐式应用程序对象等。