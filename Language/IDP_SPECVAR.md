# 预定义/特殊变量和常量

## 局部变量
- **_i**：`int` 类型变量，普通局部变量，无需声明。
- **_s**：`str` 类型变量，普通局部变量，无需声明。
- **this**：指向当前[成员函数](IDP_CLASSES.html)调用对象的引用。

## 线程变量
- **_command**：当前[线程](../Other/IDP_THREADS.html)的命令字符串，类型为 `lpstr`。若线程未带命令启动，则为 0。另见 [mac](../Commands/IDP_MAC.html)、[QM 命令行](https://quickmacros.com/help/Language/..%5CQM_Help%5CIDH_TRIG_COMMANDLINE.html)。
- **_hresult**：最近调用的 COM 函数的[错误码](../_COM/IDP_COM_CALL.html)，某些其他函数也使用。
- **_error**：[错误信息](../Flow/IDP_ERR.html)。
- **_monitor**：控制对话框、屏幕文本等显示的监视器，可修改以指定特定监视器。可能值：
  - `0`（默认）：视上下文而定，通常为主监视器。若指定对话框所有者窗口，则为该窗口的监视器。[ShowDialog](../User/IDH_DIALOG_EDITOR.html) 还依赖对话框样式。
  - `1-30`：监视器索引。
  - `-1`：鼠标所在监视器。
  - `-2`：活动窗口所在监视器。
  - `-3`：主监视器。
  - 窗口句柄：使用该窗口所在监视器。
  - 无效值（无效索引、句柄等）：使用主监视器。
- **_monitor** 适用于函数：`mes`、`inp`、`inpp`、`OnScreenDisplay`、`ListDialog`、[ShowDialog](../User/IDH_DIALOG_EDITOR.html) 及使用它们的多数函数。某些函数使用单独的 `monitor` 参数或标志以应用 `_monitor`。
- 示例：
  ```cpp
  ;; 在监视器 2 显示消息框
  _monitor=2
  mes "text"

  ;; 在鼠标所在监视器显示屏幕文本，并恢复变量
  _i=_monitor; _monitor=-1
  OnScreenDisplay "text"
  _monitor=_i
  ```
- 多数变量由 QM 自动填充，部分可修改。
- 另有 10 个 `int` 类型变量 `tls0` 至 `tls9`，为向后兼容保留。

## 全局变量
- **_winnt**：Windows 主版本号：
  - `5`：XP/2003
  - `6`：Vista/7/8
  - `10`：Windows 10
- **_winver**：Windows 版本号（十六进制）：
  - `0x501`：XP (5.1)
  - `0x502`：2003 (5.2)
  - `0x600`：Vista (6.0)
  - `0x601`：Windows 7 (6.1)
  - `0x602`：Windows 8 (6.2)
  - `0x603`：Windows 8.1 (6.3)
  - `0xA00`：Windows 10 (10.0)
- **_iever**：Internet Explorer 版本号（十六进制）：
  - `0x600`：IE 6
  - `0x700`：IE 7
  - `0x800`：IE 8
  - 以此类推
- 显示十六进制值示例：
  ```cpp
  out "0x%X" _winver
  ```
- **_win64**（QM 2.2.0）：32 位 Windows 为 0，64 位 Windows 为 1。注：QM 为 32 位，但可在 64 位 Windows 上运行。另见 [IsWindow64Bit](../User/IDP_QMDLL.html#IsWindow64Bit)。
- **_unicode**（QM 2.3.0）：[Unicode 模式](../Other/IDP_UNICODE.html)，若 QM 运行于 Unicode 模式（选项 -> 通用 -> 文本：Unicode），则非零，等同于默认代码页（ANSI 模式为 `CP_ACP` (0)，Unicode 模式为 `CP_UTF8` (65001)）。另见 [str.ansi 和 str.unicode](../str/IDP_S_UNICODE.html)。
- **_portable**（QM 2.3.5）：QM 作为[便携应用](../Other/IDP_PORTABLE.html)运行时为 1，否则为 0。
- **_hwndqm**：QM 主窗口句柄。在 [EXE](../QM_Help/IDH_MAKEEXE.html) 中为进程主线程中创建的隐藏窗口句柄（非宏执行线程）。
- **_hinst**：程序模块句柄（`HMODULE` 或 `HINSTANCE`）：
  - 在 QM 中为 `qm.exe`，在 [EXE](../QM_Help/IDH_MAKEEXE.html) 中为 EXE 文件。
  - 可用于 `CreateWindowEx` 等 API 函数。
  - 对于 API 资源函数，建议使用 [GetExeResHandle](../User/IDP_QMDLL.html#GetExeResHandle)。
- **_logfile**：`LogFile` 函数使用的默认日志文件，默认在“我的文档\My QM”中的 `qm log.txt`，在 EXE 中为程序文件夹中的 `exename log.txt`，可修改。
- **_logfilesize**：`LogFile` 函数使用的日志文件最大大小，默认 1 MB，可修改。
- **_qmdir**：QM 或 EXE 文件路径（不含文件名，末尾带 `\`），等同于扩展的 `$qm$\`。获取完整路径使用 `ExeFullPath`。
- **_qmver_str**：QM 版本字符串，如 `2.1.5`。另见下方 QMVER 常量。
- （QM 2.3.2）除 `_logfile` 和 `_logfilesize` 外，所有全局预定义变量为只读。

## 常量
- **QMVER**：Quick Macros 版本号，例如 `0x2010506` 表示 2.1.5.6。
- **EXE**：
  - `1`：编译为 [EXE](../QM_Help/IDH_MAKEEXE.html)。
  - `2`：qmm（在独立进程运行但非独立 EXE 的宏）。
  - `0`：宏在 QM 中运行。
- **WINNT, WINVER, IEVER**：已过时，建议使用变量 `_winnt`、`_winver`、`_iever`。在 QM 中运行的宏中，这些常量与变量值相同。在 [EXE](../QM_Help/IDH_MAKEEXE.html) 中，变量反映运行计算机的版本，常量反映编译时计算机的版本。建议使用变量并结合 `if`，而非 `#if`。
- （QM 2.3.3）QM 定义运行时错误常量，名称以 `ERR_` 或 `ERRC_` 开头：
  - **ERR_**：字符串形式错误码，如 `def ERR_FILECOPY "502 cannot copy file"`，可用于 [end](../Flow/IDP_END.html)，如 `end ERR_FILECOPY`。
  - **ERRC_**：数字形式错误码，如 `def ERR_FILECOPY 502`，可用于 [err](../Flow/IDP_ERR.html)，如 `if(_error.code=ERR_FILECOPY)`。
  - 错误码范围：500-1999。