# 编译器指令：#opt

## 语法

```qm
#opt option value
```

## 参数

- **option**：下表中的选项之一。
- **value**：下表中的值（0 或 1）。

| 选项 | 1（或非零） | 0 |
|------|-------------|---|
| `err` | 编译时错误继续执行，跳过错误语句（仅适用于部分语句，见示例）。 | 编译时错误停止执行。 |
| `nowarnings` | 不显示警告。 | 显示警告。 |
| `dispatch` | 通过 `IDispatch.Invoke` 调用 COM 函数。 | 若可用，通过 VTBL 调用 COM 函数。 |
| `hidedecl`（**QM 2.3.2**） | 在 [弹出列表](IDH_TYPEINFO.html) 中隐藏声明。 | 不隐藏声明。 |

## 备注

- **功能**：设置当前宏/函数编译时的选项。
- **初始值**：所有选项初始为 0。
- **隐藏声明的其他方法**：
  1. 名称以 `__` 开头。
  2. 用户定义函数位于 [私有文件夹](IDH_FOLDERPROP.html)。
  3. 类成员函数为私有或保护。

## 示例

```qm
#opt err 1
FunctionThatMayBeMissing(a b c)
#opt err 0

#opt nowarnings 1
mac FunctionThatReturnsIdOfFunctionToRun
#opt nowarnings 0

typelib Excel {00020813-0000-0000-C000-000000000046}
#opt dispatch 1
Excel.Application xlApp._create
xlApp.Visible = -1

#opt hidedecl 1
class HiddenClass -m_x -m_y
int+ g_hiddenVariable
#opt hidedecl 0
```