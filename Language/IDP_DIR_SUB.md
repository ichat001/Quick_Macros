# 编译器指令：#sub

## 语法

```qm
#sub name [attributes]
```

## 参数

- **name**：[子函数名称](IDP_IDENTIFIERS.html)。
- **attributes**：指定子函数属性的一个或多个字符：

| 属性 | 说明 |
|------|------|
| `c` | 子函数为其父函数所在 [类](IDP_CLASSES.html) 的成员函数。示例：`#sub Member c`。调用方式：`sub.Member` 或 `var.sub.Member`。 |
| `m` | 子函数文本用作 [菜单](IDH_POPUP.html)、工具栏或自动文本的菜单项文本。菜单项格式为 `Label :sub.SubName`，不可作为函数调用。 |
| `v` | 子函数可访问父函数在首个子函数调用语句前声明的局部和线程变量。需谨慎使用，详见备注中的“更多”。 |
| `r` | 子函数可访问父函数在首个子函数调用语句前的 [ref](IDP_REF.html) 和 [typelib](IDP_TYPELIB.html) 声明。 |
| `p` | **QM 2.4.3**：私有。在包含 [共享子函数](#shared) 的函数中，此子函数不共享。其他函数的子函数默认私有，无需此属性。 |

## 备注

- **功能**：定义子函数，子函数是嵌入父 [QM 项目](IDH_ITEMS.html)（如宏）文本的用户定义函数，非独立 QM 项目，无法在宏列表中管理。可用于宏、函数、成员函数、菜单、工具栏和自动文本。
- **版本**：QM 2.4.1 新增。
- **调用**：使用 `sub.` 前缀调用，如 `sub.SubName`，仅限父函数及其子函数调用。**QM 2.4.3** 支持 [共享子函数](#shared)。
- **使用场景**：
  - 私有函数，仅限当前宏使用。
  - 不希望函数出现在宏列表中。
  - 与父函数在同一文本中编辑。
  - 多行菜单项文本，无需单独创建宏/函数。
  - 使用子函数特有功能，如 `v` 属性（访问父函数变量）。
- **限制**：
  - 不可被多个宏/函数调用。
  - 不可拥有触发器或其他 QM 项目属性。
  - 某些场景不支持子函数（尝试使用会报错）。
  - 不兼容旧版 QM（< 2.4.1）。
- **子函数特性**：
  - 子函数不可嵌套，`#sub` 终止当前代码（父函数或其他子函数）。
  - 所有子函数可访问父函数所在 [类](IDP_CLASSES.html) 的私有/保护成员，即使无 `c` 属性。
  - 默认速度 ([spe](IDP_SPE.html))：子函数为 0，带 `m` 属性的子函数与宏/菜单项相同，为 100。
- **更多**：
  - 编译时，QM 为子函数创建临时隐藏 QM 项目，拥有独立 ID 和名称（如 `<00001>SubName`，通常显示为 `ParentName:SubName` 或 `SubName`）。支持名称格式如 `<00001>SubName` 或 `ParentName:SubName`，但需临时项目已存在。
  - 子函数相关操作通常使用父函数：
    - [str.getmacro](IDP_S_MACRO.html) 获取父函数全部文本（含子函数）。
    - [qmitem](IDH_REFERENCE.html#qmitem) 获取父函数属性。
    - [dis](IDH_REFERENCE.html#dis) 启用/禁用父函数。
    - [str.setmacro](IDP_S_MACRO.html#setmacro) 替换父函数文本。
    - 使用 [宏资源和设置](IDP_RESOURCES.html) 的函数。
    - [ShowDialog](IDP_UDF.html#ShowDialog)（`""`）、[CsExec](IDP_UDF.html#CsExec)（`""`）等从父函数文本获取对话框/脚本。
    - 生成 exe 时，若需子函数文本，添加父函数文本。
  - 子函数独立操作：
    - [IsThreadRunning](IDP_QMDLL.html#IsThreadRunning)、[EnumQmThreads](IDP_QMDLL.html#EnumQmThreads)、[shutdown](IDH_REFERENCE.html#shutdown) -6、[EndThread](IDP_UDF.html#EndThread)、[WaitForThreads](IDP_UDF.html#WaitForThreads)、“End thread”触发器。示例：`IsThreadRunning("ParentName:SubName")`。
  - 子函数限制：
    - 不可单独加密。
    - 不可在非父函数进程运行。
    - 不可作为 exe 主函数。
    - 不可为类特殊函数（构造函数、析构函数、赋值运算符）。
  - **v 属性注意事项**：
    - 回调函数可能在父函数返回后或在其他线程调用，可能导致“无法访问变量”运行时错误。`v` 属性不可用于 [mac](IDP_MAC.html) 或菜单。
    - 递归调用父函数时，带 `v` 属性的子函数使用调用栈中最靠近的父函数实例变量，可能导致意外结果，建议避免父函数递归。
  - 子函数线程和定时器默认在“Running items”面板中隐藏，可右键文件夹显示。

## 使用方式

子函数可像普通函数一样使用：
- 直接调用：`sub.SubName(1 2)` 或 `classVar.sub.SubName(1 2)`。
- 回调函数：如 [atend](IDH_REFERENCE.html#atend)、[win](IDH_REFERENCE.html#win)、[ShowDialog](IDP_UDF.html#ShowDialog)。获取地址：`&sub.SubName`。
- 线程运行：[mac](IDP_MAC.html)，如 `mac "sub.SubName"`。
- 定时器函数：[tim](IDP_TIM.html)，如 `tim 1 sub.SubName`。
- [COM 事件](IDP_COM_EVENTS.html)。
- 编译器指令：[ #compile](IDP_DIR_COMPILE.html)、[ #set](IDP_DIR_SET.html)、**QM 2.4.3** [ #err](IDP_DIR_ERR.html)。

## 示例

```qm
sub.Test

#sub Test
out "sub-function Test"
out sub.Test2(3 4)

#sub Test2
function# a b
out "sub-function Test2"
ret a+b
```

## <a name="shared"></a>共享子函数

- **默认**：子函数仅限父函数及其子函数调用。
- **QM 2.4.3**：支持共享子函数，分全局和类两种：
  - **全局共享子函数**：可从任何地方调用，需位于名为 `__sub_X` 的函数中（`X` 为任意名称）。调用方式：`sub_X.Func(1 2)`。
  - **类共享子函数**：可从类成员函数及其子函数调用，需位于类成员函数 `Class.__subX` 中（`Class` 为类名，`X` 为任意名称）。调用方式：`subX.Func(1 2)` 或 `classVar.subX.Func(1 2)`。需使用 `c` 属性（如 `#sub Member c`），无 `c` 属性的函数类似全局函数，但仅限类函数调用，且可访问类的公共/私有/保护成员。
- **限制**：
  - 共享子函数不可使用 `v`、`r`、`m` 属性，可使用 `p` 属性使其非共享。
  - `__sub_X` 和 `Class.__subX` 函数仅作为共享子函数容器，不可直接调用、运行或编译。若尝试，会编译其所有共享子函数（便于调试）。
- **相关内容**：[共享子函数](IDP_DIR_SUB.html#shared)