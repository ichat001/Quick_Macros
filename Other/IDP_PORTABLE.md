# 便携式 QM

便携式 QM 可安装在 USB 驱动器上，并在其他计算机上运行，无需安装。它不要求管理员权限，且不会在主机上留下文件或设置。支持 [PortableApps.com](http://portableapps.com/)，但非必需。了解更多关于 [便携式应用程序](https://en.wikipedia.org/wiki/Portable_application) 的信息。

## 安装

首先，需在您的计算机上正常安装 QM。要在移动驱动器上安装或升级便携式 QM，在 QM 窗口选择菜单 **Tools -> Portable QM**，打开“Portable QM Setup”对话框。选项如下：

- **Install in this folder in USB drive**：便携式 QM 根文件夹。QM 将创建该文件夹并复制文件和设置。若使用 PortableApps.com，建议设为 `X:\PortableApps\QuickMacrosPortable`，其中 `X` 为 USB 驱动器盘符。
- **Replace portable file**：用当前加载的非便携式 QM 文件替换便携式 QM 文件（宏）。
- **Replace portable settings**：用当前非便携式 QM 设置替换便携式 QM 设置。设置从 QM 注册表键导出，保存到 `Data\settings.xml`。
- **Replace everything**：在重新安装便携式 QM 前删除指定文件夹。若未勾选，仅替换 QM 程序文件、其他 QM 数据（可选宏和设置），不影响便携式 QM 文件夹中的其他文件。

安装便携式 QM 时，非便携式 QM 需在计算机上注册，便携式 QM 将使用相同的注册信息。若未注册，便携式 QM 将以大部分功能禁用运行（如同试用期已过期）。

便携式 `$my qm$` 文件夹将位于 USB 驱动器中，默认便携式 [QM 文件](IDH_QML.md) 为 `$my qm$\Portable.qml`。

便携式 QM 会在其驱动器上创建备份文件，可能不理想。可以在 **Options -> Files** 中更改备份设置（安装前或运行便携式 QM 时）。

便携式 QM 通常占用 USB 驱动器 12-15 MB 空间。

## 使用

启动便携式 QM 的方法：

- 若使用 PortableApps.com，可从其菜单运行 QM，或设置为自动启动。
- 或者运行 `QuickMacrosPortable.exe`，位于安装便携式 QM 时指定的文件夹。
- **不要**直接运行 `qm.exe`。

### 在宏中使用注意事项

- 避免修改除 [默认注册表键](IDP_RGET.md) 外的其他注册表键。便携式 QM 退出时会将默认键保存到 USB 驱动器（`settings.xml`）并删除该键。涉及注册表修改的函数包括 `rset`、`FileTypeRegister`、`RegisterComComponent`。
- 避免在主机上创建并保留文件。临时文件应创建在 [特殊文件夹](IDP_SEARCHPATHS.md) `$temp qm$` 中，便携式 QM 退出时会删除。其他文件应创建在 USB 驱动器上，例如 `$my qm$` 或 `$drive$\Documents`。
- 可使用 [预定义变量](IDP_SPECVAR.md) `_portable`，在便携式 QM 中为 1，非便携式为 0。

拔出 USB 驱动器前，应关闭所有便携式应用程序。QM 在驱动器拔出时自动退出。若便携式 QM 未正常退出（例如崩溃），其设置和临时文件可能留在主机上，可再次运行并退出以清理。

便携式 QM 也可在已安装非便携式 QM（但未运行）的计算机上运行，使用相同的注册表键，并备份/恢复它。

## 不可用或受限功能

便携式 QM 无法使用需要管理员权限安装或使用的功能：

1. **[UAC](IDP_VISTA.md) 完整性级别（IL）及相关功能**：
   - 无法在 **Options** 中指定 IL（UAC: run as）。默认以用户权限运行。要以管理员权限运行，右键单击 `QuickMacrosPortable.exe` 或 PortableApps.com 菜单中的 QM 图标。无法以 uiAccess 运行。
   - 无法正确运行与 QM IL 不同的程序。需要更高 IL 时，显示 UAC 同意提示；需要较低 IL 时，以 QM 的 IL 运行。影响函数 `run`、`web`、`StartProcess` 及设置为以不同 IL 在单独进程运行的宏。
   - 以用户权限运行的 QM 无法自动化管理员窗口、更改管理员设置等（详见 [Vista](IDP_VISTA.md)）。
2. 进程触发器。
3. Shell 菜单触发器。
4. 解锁计算机。

便携式 QM 不应修改注册表或文件系统，除非后续恢复。以下功能被禁用：

1. Windows 启动时运行。可在 PortableApps.com 中设置 QM 在其启动时运行。
2. 创建计划任务和快捷方式。
3. 其他部分功能。

未安装的功能包括：

1. 开始菜单中的 QM 快捷方式。
2. QM 程序路径和 .qml 文件类型的注册。

## 同步文件

有时需在 PC 和便携式驱动器间同步 [QM 文件](IDH_QML.md)、`$my qm$` 文件夹或其他文件。Quick Macros 目前无此功能，可手动复制文件，或使用文件同步软件（如 PortableApps.com 提供的工具）。复制 .qml 文件时，若同文件夹中存在同名的 .qml-wal 文件，也需一并复制。

## 卸载

要卸载便携式 QM，删除其安装文件夹，将同时删除便携式 `$my qm$` 文件夹及其中的 QM 文件（除非更改了其位置）。