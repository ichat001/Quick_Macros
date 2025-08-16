# 运行或打开文件、文件夹、网页、创建电子邮件

## 语法

```qm
run file [par] [verb] [dir] [flags] [window] [hwnd]
```

## 参数

- **file** - [完整路径或文件名](../Other/IDP_SEARCHPATHS.md)。
- **par** - 命令行参数。仅用于可执行文件。
- **verb** - "open"、"edit"、"print"、"explore" 或文件右键菜单中列出的其他操作。并非所有操作都可用。默认动词字符串是菜单中加粗的操作，通常为 "open"。另见标志 0x40000。
- **dir** - 默认目录。使用 `"*"` 从 **file** 中提取。
- **[flags](../Other/IDP_FLAGS.md)**:

| 标志 | 描述 |
|------|------|
| 前 8 位 | 窗口显示状态：0 或 1 - 正常（默认），2 - 最小化，3 - 最大化，4 - 非活动，7 - 最小化非活动，16 - 隐藏。大多数程序不支持此设置。 |
| 0x100 | 出错时不显示错误消息框。 |
| 0x200 | 等待程序准备好接受用户输入（键盘、鼠标）。并非对所有窗口有效。 |
| 0x400 | 等待程序退出。<ul><li>仅在程序实际启动且 **file** 不是快捷方式时等待。</li></ul> |
| 0x800 | 程序启动后，等待窗口 **window** 激活。<ul><li>最多等待 5 分钟（QM 2.3.3 之前为 1 分钟）。超时则报错。</li><li>不使用此标志时，若使用 **window** 和 **hwnd**，则等待窗口可见（可为非活动状态）。QM 2.3.3：若使用标志 16（隐藏），则等待窗口创建（可为不可见）。</li></ul> |
| 0x1000 | 若窗口 **window** 已存在，则不执行操作。若未使用此标志，则激活该窗口。 |
| 0x2000 | 即使窗口 **window** 已存在，仍运行程序。<ul><li>若需等待窗口，则等待新窗口。因此，若运行程序仅激活现有窗口，则会失败。</li></ul> |
| 0x4000 | QM 2.3.4。在 64 位 Windows 上禁用 [文件系统重定向](http://www.google.lt/search?q=file system redirector Wow64)。用于运行 64 位系统程序。 |
| 0x10000 | QM 2.2.0。以管理员身份运行。在管理员账户上不显示同意或“以管理员身份运行”对话框，除非在 [exe](../QM_Help/IDH_MAKEEXE.md) 或 [便携版](../Other/IDP_PORTABLE.md) 中。需显示对话框时，使用 **verb** "runas"。详情见备注。 |
| 0x20000 | QM 2.2.0。同上，但在标准用户账户上以标准用户身份运行。 |
| 0x30000 | QM 2.2.0。若 QM 以管理员身份运行，则以管理员身份运行程序。 |
| 0x40000 | QM 2.4.1。支持 shell 菜单扩展中的动词，包括 "Properties"。 |

- **[window](../Other/IDP_WINDOWEXPRESSION.md)** - 程序的窗口。
  - 若窗口存在，`run` 仅激活它（除非使用 **flags** 0x1000 或 0x2000）。
  - 否则运行 **file**。若使用标志 0x800 或 **hwnd**，则等待该窗口。
- **hwnd** - 接收窗口 **window** 句柄的 int 变量。

## 备注

**file** 可以是程序、文档、快捷方式、文件夹或互联网资源（"http://..."、"mailto:..." 等）。要打开网页，也可使用 [web](IDP_WEB.md)。

作为函数使用时，`run` 返回启动进程的句柄（运行程序）或 -1。之后需使用 `CloseHandle` 关闭，除非赋给 `__Handle` 变量。例如：`__Handle h=run("notepad.exe"); wait 0 H h; out "closed"`。

若使用标志 0x400（等待退出），`run` 返回程序的退出代码。

运行速度取决于 [spe](IDP_SPE.md) 设置。

要运行/打开无法通过路径指定的对象（例如控制面板对象），可使用 [ITEMIDLIST 字符串](../Other/IDP_SEARCHPATHS.md)。

支持格式为 "::{XXXX}\{XXXX}" 的类 ID 字符串。从 QM 2.2.0 开始，其他函数（如获取图标、创建快捷方式）也支持此类字符串。

若 [UAC](../Other/IDP_VISTA.md) 开启，即使在管理员账户上，大多数程序也无管理员权限，拥有中等完整性级别（IL）。若程序具有管理员 IL，其启动的程序也以管理员身份运行。但 `run` 行为不同（[exe](../QM_Help/IDH_MAKEEXE.md) 和 [便携版](../Other/IDP_PORTABLE.md) 除外）。即使 QM 以管理员身份运行，由 `run` 启动的程序具有中等 IL。要以管理员身份运行程序，使用标志 0x10000-0x30000。函数 [web](IDP_WEB.md) 启动的 IE 也非管理员权限。函数 [StartProcess](../User/IDP_QMDLL.md#StartProcess) 和 `RunAs` 也可启动不同 IL 的程序。其他函数（`RunConsole2`、`CreateProcess` 等）启动的程序与 QM 的 IL 相同，但无 uiAccess。

## 提示

可将文件拖放到宏文本中，插入针对该文件的 `run` 命令。按住 Ctrl 可插入快捷方式路径而非目标路径。也可拖放互联网链接、虚拟文件夹/对象或多个文件，也可拖放到工具栏。

若 **file** 是文档，则在该文件类型的默认程序中打开。要在特定程序中打开，使用 **file** 指定程序，**par** 指定文档。例如：`run "wordpad.exe" "c:\x.txt"`。

若宏需操作新窗口，但程序加载缓慢，尝试使用标志 0x200，或/和 **window** 结合标志 0x800。或在 `run` 后使用 [wait](IDP_WAIT.md) 或 [wait for](IDP_WAIT_FOR.md) 命令（"wait"、"wait for active window" 等）。

有时，`run` 启动的程序会显示对话框，`run` 会等待直到手动关闭对话框。此时，创建关闭对话框的函数，并使用 `mac` 从宏中启动。见示例。

要运行控制台程序并捕获其输出，使用 `RunConsole2` 替代。

要以其他用户身份运行程序，使用 `RunAs` 替代。若指定加密密码，无需用户交互。不能用于以当前用户提升权限运行（使用 `run` 的标志 0x10000-0x30000 或 **verb** "runas"，或 [StartProcess](../User/IDP_QMDLL.md#StartProcess)）。

64 位 Windows 有两个 System32 和 Program Files 文件夹。[了解更多](../Other/IDP_VISTA.md)。

QM 2.3.3 之前，不支持 QM 文件夹中的 [相对路径](../Other/IDP_SEARCHPATHS.md)。

如何判断程序是否在运行？使用 [win](../Functions/IDP_WIN.md) 搜索其窗口。若无窗口，使用函数 [ProcessNameToId](../User/IDP_QMDLL.md#ProcessNameToId)。

## 示例

```qm
run "c:\f\text.txt"  ;; 打开 text.txt
run "$system$\notepad.exe"  ;; 运行记事本
run "c:\f\my file.lnk"  ;; 运行快捷方式
run "c:\m" "" "explore"  ;; 浏览文件夹
run "c:\t.txt" "" "print"  ;; 打印 "t.txt"
run "control" "appwiz.cpl"  ;; 打开控制面板“添加/删除程序”
run "$system$\notepad.exe" "" "" "" 3  ;; 运行记事本，最大化
run "$system$\notepad.exe" "" "" "" 0 "Notepad"  ;; 运行或激活记事本
run "$system$\notepad.exe" "s.cpp" "" "c:\f"  ;; 运行记事本，带参数 "s.cpp"，默认目录 "c:\f"
run "app.exe"; wait 15 P 10  ;; 运行程序，等待最多 15 秒直到 CPU 使用率 < 10%
run "http://www.aaa.com"  ;; 打开网页
run "mailto:name@isp.com"  ;; 创建新电子邮件
run "mailto:name@isp.com?subject=Question"  ;; 创建新电子邮件
str x.expandpath("$documents$\test.txt")
int y=5
str cl=F"/X ''{x}'' /Y {y}"
run "zzz.exe" cl  ;; 运行程序，带包含变量的命令行
run "$system$\notepad.exe" "" "" "" 0x400  ;; 运行记事本并等待其进程结束
mac "CloseDialog"
run "program"  ;; 运行显示启动对话框的程序，导致 run 等待
...
;; 函数 CloseDialog:
wait(10 "Dialog Name"); err ret
key Y
```