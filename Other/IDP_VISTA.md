# Windows Vista, 7, 8, 10, 11; Windows 64-bit

## 用户账户控制（UAC）

Windows Vista 及更高版本引入了 **用户账户控制（UAC）** 安全特性。即使在管理员账户下，大多数进程权限受限。本节介绍 UAC 对 Quick Macros (QM) 的影响及解决方法。另见 [QM 创建的程序](IDH_MAKEEXE.html)。

### 完整性级别（Integrity Levels, IL）

UAC 开启时，进程在启动前分配一个固定 **完整性级别（IL）**，运行时不可更改。以下为 IL 说明：

| IL | 说明 |
|----|------|
| **High** | 进程以管理员身份运行。通常启动需管理员权限的程序会显示“用户账户控制”对话框（**同意对话框**），称为**提升**。程序可标记为需要管理员权限，或通过右键“以管理员身份运行”、文件属性设置，或 Windows 识别为安装程序。管理员进程启动的子进程也具有管理员权限，无需同意对话框。**QM 默认以 High IL 运行**（可在选项中更改），启动时不显示同意对话框以避免 Windows 启动时阻塞。QM 启动的进程默认具有 Medium IL。 |
| **Medium** | 进程以标准用户身份运行，权限受限（如无法写入 Windows/Program Files 文件夹、多数注册表键、操作服务，或与更高 IL 进程交互）。大多数进程（如 Windows 资源管理器）为 Medium IL。若 QM 选项选择“UAC: run as User”（不推荐），则以 Medium IL 运行。 |
| **uiAccess** | 具有 Medium IL，但允许与 High IL 和 uiAccess 进程交互（键盘、鼠标、菜单命令、消息、钩子等）。少数程序具有 uiAccess 权限。QM 若在选项中选择“UAC: run as uiAccess”（推荐非管理员运行方式）或在非管理员账户下，默认以 uiAccess 运行。 |
| **Low** | 最小权限，仅可写入特定文件夹和注册表键。通常仅 Internet Explorer（保护模式）以 Low IL 运行。QM 无 Low IL 运行选项，但单独进程的宏可设为 Low IL。 |
| **System** | 最高权限，仅限服务和部分系统进程。QM 无 System IL 运行选项。 |

### 常见问题与解答

- **Q：QM 使用哪个 IL？可更改吗？**  
  A：默认以管理员（High IL）运行，可在选项中更改。
- **Q：QM 应以管理员、uiAccess 还是标准用户运行？最少问题？**  
  A：以管理员运行问题最少。
- **Q：以管理员运行 QM 安全吗？**  
  A：较安全。QM 启动的程序（[run](IDP_RUN.html)）默认以 Medium IL 运行。若认为不安全，可设为 uiAccess，不推荐 User 模式（Medium IL）。
- **Q：宏可否与 QM 不同 IL？**  
  A：可在属性中设为单独进程运行，选择不同 IL。
- **Q：可否关闭 UAC？**  
  A：可在控制面板 -> 用户账户关闭 UAC，或通过“secpol.msc”调整本地安全策略（如无需同意提升或在默认桌面显示同意对话框）。
- **Q：可否无同意对话框以管理员运行程序？**  
  A：使用 [run](IDP_RUN.html) 的标志 `0x10000` 或 `0x20000`，或 [StartProcess](IDP_QMDLL.html#StartProcess)，或在宏属性中选“Run in separate process”并设为“Administrator”或“Highest available”。仅限 QM（非便携版）。其他方式如 Windows 任务计划程序也可。
- **Q：可否自动关闭某些程序的同意对话框？**  
  A：Windows 无此选项，QM 无法自动化安全桌面中的对话框。若对话框非安全桌面（通过本地安全策略设置），可创建函数关闭。

**更多信息**：
- QM [论坛](http://www.quickmacros.com/forum/index.php)
- [GetProcessUacInfo](IDP_QMDLL.html#GetProcessUacInfo)
- [IsUserAdmin](IDP_QMDLL.html#IsUserAdmin)

### UAC 导致的问题

**通用问题**（所有 IL）：
1. 使用映射网络驱动器（如 `Z:\file`）的文件函数可能失败。**解决方法**：使用 UNC 路径（如 `\\server\share\file`）。
2. 可能存在其他未发现问题。

**解决方法**：为 QM 或单独宏设置适当 IL。

### 以管理员或 uiAccess 运行 QM 时的问题

不同 IL 进程间操作受限，即使由高 IL 进程发起也可能受限：
1. [ `_getactive`](IDH_REFERENCE.html#_getactive)、`GetObject`（VBScript）等 COM 函数无法从不同 IL 进程获取 COM 对象。**解决方法**：
   - 属性中选“Run in separate process”，选择与目标应用相同的权限（通常为 User）。
   - 使用 [ `_create`](IDP_COM_FUNC.html#_create) 启动目标应用。
   - QM 和目标应用均以管理员运行。
   - 关闭 UAC。
2. 从 Medium IL 进程（如 Windows 资源管理器）拖放到 QM 失败。QM 使用另一进程重启拖放功能，但自定义对话框的 `WM_DROPFILES` 无效。**解决方法**：
   - 使用 [QmRegisterDropTarget](IDP_QMDLL.html#QmRegisterDropTarget)。
   - 属性中选“Run in separate process”并设为 User。
   - 关闭 UAC。
3. 其他可能问题。

### 以 User 或 uiAccess 运行 QM 时的问题

需要管理员权限的功能在非管理员（User 或 uiAccess）运行时失效：
1. 写入特定文件系统位置（如 Program Files、Windows 文件夹）：[cop](IDH_REFERENCE.html#cop)、[ren](IDH_REFERENCE.html#ren)、[del](IDH_REFERENCE.html#del)、[MkDir](IDP_UDF.html#MkDir)、[SetAttr](IDP_UDF.html#SetAttr)、[str.setfile](IDP_S_FILE.html#setfile)。
2. 写入特定注册表键（如 `HKEY_LOCAL_SYSTEM`、`HKEY_CLASSES_ROOT`）：[rset](IDH_REFERENCE.html#rset)。
3. [ `_create`](IDP_COM_FUNC.html#_create) 自动注册 COM 对象（因无法写入注册表）。
4. [RegisterComComponent](IDP_QMDLL.html#RegisterComComponent)（可用标志 4 显示同意对话框）。
5. [SetPrivilege](IDP_QMDLL.html#SetPrivilege)。
6. 操作服务。
7. 更改计算机日期。
8. COM 函数（如 [ `_getactive`](IDH_REFERENCE.html#_getactive)、`GetObject`）与不同 IL 进程交互失效。
9. Windows 8 及以上：QM 无法看到 Windows 应用商店应用窗口。
10. 其他可能问题。

**非管理员账户**：上述功能在所有操作系统上均失效。

**解决方法**：
1. 属性中选“Run in separate process”并设为 Administrator。
2. 以管理员运行 QM。
3. 关闭 UAC。

### 以 User 运行 QM 时的问题

以下功能无法与更高 IL 窗口交互，除非 QM（或 [exe](IDH_MAKEEXE.html)）以管理员或 uiAccess 运行（对 exe 更常见，因 QM 可设为管理员或 uiAccess）：
1. 键盘和鼠标命令：[key](IDH_REFERENCE.html#key)、[paste](IDH_REFERENCE.html#paste)/[outp](IDH_REFERENCE.html#outp)、[str.getsel](IDP_S_GETSEL.html)、[str.setsel](IDP_S_SETSEL.html)、[lef](IDH_REFERENCE.html#lef)、[mou](IDH_REFERENCE.html#mou)、[Acc.Mouse](IDP_ACC.html#Mouse)、[ifk](IDH_REFERENCE.html#ifk)、[wait K](IDH_REFERENCE.html#wait)、[wait M](IDH_REFERENCE.html#wait)。若当前活动窗口为更高 IL，鼠标命令在任何窗口失效。
2. 发送消息的 Windows API 函数：[SendMessage](IDP_QMDLL.html#SendMessage)、[PostMessage](IDP_QMDLL.html#PostMessage)（仅少数消息可发送）。
3. 操作窗口的 Windows API 函数：[SetWindowPos](IDP_QMDLL.html#SetWindowPos)、[EnableWindow](IDP_QMDLL.html#EnableWindow)。
4. 使用上述函数的功能：菜单和控件函数（[men](IDH_REFERENCE.html#men)、[but](IDH_REFERENCE.html#but)、[CB_x](IDP_UDF.html#CB_x)、[LB_x](IDP_UDF.html#LB_x)、[Acc.DoDefaultAction](IDP_ACC.html#DoDefaultAction)）、窗口函数（[hid](IDH_REFERENCE.html#hid)、[max](IDH_REFERENCE.html#max)、[mov](IDH_REFERENCE.html#mov)、[siz](IDH_REFERENCE.html#siz)、[ArrangeWindows](IDP_UDF.html#ArrangeWindows)、[Zorder](IDP_UDF.html#Zorder)、[Transparent](IDP_UDF.html#Transparent)）。
5. 大多数钩子，如 [BlockInput2](http://www.quickmacros.com/forum/viewtopic.php?f=1&t=XXX)（使用低级键盘和鼠标钩子）。
6. [BlockInput](IDP_QMDLL.html#BlockInput) 对部分窗口失效。
7. 工具栏无法附加到更高 IL 窗口。
8. Windows 8 及以上：发送系统热键（如 Alt+Tab、Win+R）通过 [key](IDH_REFERENCE.html#key)，与当前活动窗口无关。
9. 其他可能问题。

**备注**：通常管理员程序使用短暂且无需自动化，影响较小。

**解决方法（QM）**：
1. 属性中选“Run in separate process”并设为 Administrator。
2. 以管理员或 uiAccess 运行 QM。
3. 关闭 UAC。

**解决方法（exe）**：
1. 从 QM 运行 exe：属性中选“Run in separate process”，选择“As QM”（若 QM 为管理员或 uiAccess）或“Administrator”。若从桌面启动，创建运行宏的快捷方式（需安装 QM）。
2. 在清单中设置 `uiAccess="true"`，签名 exe 文件并放入 Program Files 文件夹，无需 QM，适用于任何计算机（参见 [生成 exe](IDH_MAKEEXE.html) 中的签名信息）。
3. 以管理员运行 exe（需同意，除非从管理员程序启动）。
4. 尽量不以管理员运行目标程序。
5. 关闭 UAC。

## 64 位 Windows

QM 为 32 位程序，但在 64 位 Windows 上运行良好。

- **标志变量**：[ `_win64`](IDP_SPECVAR.html) 在 64 位 Windows 上为 1，否则为 0。

### 注意事项

- **文件夹分离**：
  - 64 位和 32 位程序使用不同的 System 和 Program Files 文件夹。
  - 特殊文件夹 `$program files$` 扩展为 32 位文件夹（`Program Files (x86)`），QM 安装在此。环境变量 `%ProgramW6432%` 扩展为 64 位文件夹（`Program Files`）。
  - 特殊文件夹 `$system$` 扩展为 64 位路径（`C:\Windows\System32`），但实际使用 32 位文件夹（`C:\Windows\SysWOW64`）。[run](IDP_RUN.html) 默认启动 32 位程序，除非使用标志 `0x4000`。
- **注册表分离**：32 位程序使用特定的注册表位置。
- **更多信息**：[运行 32 位应用程序 (Windows)](http://www.google.com/search?q=site:microsoft.com Running 32-bit Applications (Windows))、[QM 论坛](http://www.quickmacros.com/forum/viewtopic.php?f=2&t=5028)。