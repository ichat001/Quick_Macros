# 扩展、DLL 和类别（Extensions, DLL, Categories）

## 概述

在 Quick Macros (QM) 中，可使用以下类型的函数：

- **QM 内置函数**：参见 [参考](IDH_REFERENCE.html)。
- **QM 扩展**：许多位于 QM 的 System 文件夹，可创建或从 [论坛](http://www.quickmacros.com/forum/viewtopic.php?f=2&t=3368) 下载。
- **QM 导出的 DLL 函数**：包括 [DLL 函数、COM 接口和控件](IDP_QMDLL.html)。
- **Windows API 和其他 DLL 函数、COM 类/接口及控件**：参见 [Windows API](IDP_REF.html)、[COM](IDP_COM_USAGE.html)。

## 函数类别

所有 QM 函数及部分 API/COM 函数按以下类别组织（参见 [类别](IDP_CATEGORIES.html)）：

| 类别 | 说明 |
|------|------|
| `mouse` | 鼠标相关函数。 |
| `keytext` | 键盘、文本、剪贴板相关函数（**QM 2.3.2** 新增）。 |
| `dialog` | 消息框、其他对话框、弹出菜单。另见 [自定义对话框](IDH_DIALOG_EDITOR.html)。 |
| `file` | 运行、文件、文件夹、数据库、XML、CSV 相关函数。 |
| `window` | 窗口、控件相关函数。另见 [部分 Windows API 窗口函数](IDP_E_WINDOW.html)。 |
| `control` | 控件、其他 UI 对象、菜单、Excel、图像查找。 |
| `time` | 等待、日期/时间相关函数。 |
| `internet` | 网络相关函数。 |
| `string` | 字符串函数和操作符。 |
| `math` | 数学及相关函数。另见 [msvcrt 数学函数](IDP_OPCRT.html)。 |
| `multimedia` | 声音相关函数。 |
| `qm` | QM 项目、线程、杂项信息等。 |
| `sys` | 系统功能：注册表、关机、托盘图标、进程、环境变量等。另见 [服务](IDP_E_SERVICES.html)。 |
| `sysinfo` | 获取/设置系统设置和信息：版本、显示、用户等。 |
| `script` | QM 支持的其他语言：VBScript、C、C# 等。 |
| `flow` | 流程控制：if、repeat、select 等。 |
| `_debug` | 调试、错误、优化、日志（**QM 2.3.2** 新增）。 |
| `_operator` | 操作符（**QM 2.3.2** 新增）。 |
| `_other` | 子类别（**QM 2.3.2** 新增）： |
| | `__declaration` | 函数、类型等声明。 |
| | `__directive` | 编译器指令。 |
| | `__programming_misc` | 编程相关杂项 QM 函数。 |
| | `__qm_dll` | QM 导出的所有 DLL 函数和 COM 接口。 |
| | `__in_dlgproc` | 可在对话框过程中使用的函数。 |
| | `__variable_examples` | 声明和初始化变量的示例。 |
| | `__array_examples` | 数组操作示例。 |
| | `__rt_option` | 运行时选项。 |

## 获取帮助

- 在代码编辑器中点击函数名并按 [F1](IDP_F1.html) 获取帮助。
- 查看 QM 状态栏中的函数信息。