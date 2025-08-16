# 文件路径

## 特殊文件夹

所有 QM 文件函数（如 `run`、`cop`、`ren`、`del`、`FileExists`、`str.searchpath`、`str.getfile` 等）以及菜单/工具栏支持以特殊文件夹字符串开头的文件路径。指定特殊文件夹的方式有以下几种：

### 1. QM 定义的特殊文件夹

使用 `$` 括起来的 QM 定义特殊文件夹字符串。例如：

```qm
"$desktop$\file.txt"
```

在对话框中（如 Run Program 对话框），点击 **SF** 按钮可查看可用特殊文件夹。

**QM 特定特殊文件夹**：
- `$qm$`：Quick Macros 程序文件夹，例如 `"C:\Program Files (x86)\Quick Macros 2"` 或 `"G:\PortableApps\QuickMacrosPortable\App\QuickMacros"`。
- `$my qm$`：Quick Macros 数据文件夹，例如 `"C:\Users\Me\Documents\My QM"` 或 `"G:\PortableApps\QuickMacrosPortable\Data\My QM"`，可在 **Options -> Files** 中更改。
- `$temp qm$`：用户临时文件夹中的 QM 子文件夹，通常与 `$temp$\QM` 相同。在便携式 QM 中为 `$temp$\QM-portable`，退出时 QM 会删除该文件夹。文件夹可能不存在，但大多数 QM 文件函数会在其中创建文件或文件夹时自动创建。
- `$drive$`：Quick Macros 程序文件夹所在驱动器，如 `"C:"`、`"G:"` 或 `"\\server\share"`，在 [便携式 QM](IDP_PORTABLE.md) 中特别有用，因驱动器盘符不固定。

**特殊文件夹 CSIDLs**：

```qm
{CSIDL_ADMINTOOLS, "Administrative Tools"},
{CSIDL_APPDATA, "AppData"},
{CSIDL_INTERNET_CACHE, "Cache"},
{CSIDL_CDBURN_AREA, "CD Burning"},
{CSIDL_PROGRAM_FILES_COMMON, "Common Files"},
{CSIDL_COOKIES, "Cookies"},
{CSIDL_DESKTOPDIRECTORY, "Desktop"},
{CSIDL_PERSONAL, "Documents"},
{CSIDL_PERSONAL, "My Documents"}, ;; 别名
{CSIDL_PERSONAL, "Personal"}, ;; 别名
{CSIDL_FAVORITES, "Favorites"},
{CSIDL_FONTS, "Fonts"},
{CSIDL_HISTORY, "History"},
{CSIDL_LOCAL_APPDATA, "Local AppData"},
{CSIDL_MYMUSIC, "My Music"},
{CSIDL_MYPICTURES, "My Pictures"},
{CSIDL_MYVIDEO, "My Video"},
{CSIDL_NETHOOD, "NetHood"},
{CSIDL_PRINTHOOD, "PrintHood"},
{CSIDL_PROGRAM_FILES, "Program Files"},
{CSIDL_PROGRAM_FILES, "PF"}, ;; 别名
{CSIDL_PROGRAMS, "Programs"},
{CSIDL_RECENT, "Recent"},
{CSIDL_SENDTO, "SendTo"},
{CSIDL_STARTMENU, "Start Menu"},
{CSIDL_STARTUP, "Startup"},
{CSIDL_SYSTEM, "System"},
{CSIDL_QM_TEMP, "Temp"}, ;; 无 CSIDL，通常为 CSIDL_LOCAL_APPDATA\Temp
{CSIDL_TEMPLATES, "Templates"},
{CSIDL_PROFILE, "User Profile"}, ;; QM 2.3.0
{CSIDL_WINDOWS, "Windows"},
{CSIDL_COMMON_ADMINTOOLS, "Common Administrative Tools"},
{CSIDL_COMMON_APPDATA, "Common AppData"},
{CSIDL_COMMON_DESKTOPDIRECTORY, "Common Desktop"},
{CSIDL_COMMON_DOCUMENTS, "Common Documents"},
{CSIDL_COMMON_FAVORITES, "Common Favorites"},
{CSIDL_COMMON_MUSIC, "Common Music"},
{CSIDL_COMMON_MUSIC, "CommonMusic"}, ;; 别名
{CSIDL_COMMON_PICTURES, "Common Pictures"},
{CSIDL_COMMON_PICTURES, "CommonPictures"}, ;; 别名
{CSIDL_COMMON_PROGRAMS, "Common Programs"},
{CSIDL_COMMON_STARTMENU, "Common Start Menu"},
{CSIDL_COMMON_STARTUP, "Common Startup"},
{CSIDL_COMMON_TEMPLATES, "Common Templates"},
{CSIDL_COMMON_VIDEO, "Common Video"},
{CSIDL_COMMON_VIDEO, "CommonVideo"}, ;; 别名
{CSIDL_QM_QM, "QM"},
{CSIDL_QM_MYQM, "My QM"},
{CSIDL_QM_MYQM, "MyQM"}, ;; 别名
{CSIDL_QM_TEMPQM, "Temp QM"}, ;; QM 2.3.5
{CSIDL_QM_DRIVE, "Drive"}, ;; QM 2.3.5
```

### 2. 环境变量

使用 `%` 括起来的 [环境变量](IDP_SCOPE2.md) 名称。例如：

```qm
"%temp%\file.txt"
```

- 环境变量支持递归展开（QM 2.2.0）。例如，若环境变量 `v1` 的值为 `"$desktop$"`，则 `"%v1%"` 展开为桌面文件夹的完整路径。
- **提示**：可创建环境变量供全局使用。例如：

```qm
SetEnvVar "backup" "E:\_Backup"
run "%backup%"
```

此类变量仅在当前进程（QM 或 exe）中存在。

### 3. CSIDL 数值（QM 2.2.0）

使用 `$` 括起来的 CSIDL 数值。例如，`"$3$"` 展开为控制面板的 ITEMIDLIST 字符串。可在 [MSDN 库](IDP_MSDN.md) 中搜索 CSIDL 查看可用值。

**另见**：[str.expandpath](IDP_S_SEARCHPATH.md)

## ITEMIDLIST 字符串

Windows 资源管理器中的某些对象（如控制面板及其大部分对象）不是文件系统对象，无法使用文件系统路径访问。它们使用 `ITEMIDLIST` 类型的二进制结构。QM 简化此过程，部分函数（如 `run`、菜单/工具栏等）支持以 `:: ` 开头的 ITEMIDLIST 字符串。这些字符串可通过拖放非文件系统对象，或使用 Run Program、Open File 和 Open Folder 对话框插入。

**示例**：

```qm
run ":: 14001F50E04FD020EA3A6910A2D808002B30309D" ;; 我的电脑
run "$0x11$" ;; 我的电脑
run ":: 14001F50E04FD020EA3A6910A2D808002B30309D 14002E1E2020EC21EA3A6910A2DD08002B30309D A90000009CFFFFFF1D002500433A5C57494E444F57535C73797374656D33325C6465736B2E63706C00446973706C6179004368616E67652074686520617070656172616E6365206F6620796F7572206465736B746F702C207375636820617320746865206261636B67726F756E642C2073637265656E2073617665722C20636F6C6F72732C20666F6E742073697A65732C20616E642073637265656E207265736F6C7574696F6E2E00" ;; 显示设置
run "$3$ A90000009CFFFFFF1D002500433A5C57494E444F57535C73797374656D33325C6465736B2E63706C00446973706C6179004368616E67652074686520617070656172616E6365206F6620796F7572206465736B746F702C207375636820617320746865206261636B67726F756E642C2073637265656E2073617665722C20636F6C6F72732C20666F6E742073697A65732C20616E642073637265656E207265736F6C7574696F6E2E00" ;; 显示设置
run ":: " ;; 桌面
```

根对象为桌面，字符串为 `":: "`，与文件系统文件夹 `$desktop$` 不同。

文件系统对象也可用 ITEMIDLIST 访问，通过 Shift + 拖放插入 ITEMIDLIST 字符串。

**另见**：[PidlToStr](IDP_QMDLL.md#PidlToStr)、[PidlFromStr](IDP_QMDLL.md#PidlFromStr)

## 文件搜索路径和相对路径

某些函数（如 `run`、`str.searchpath`、`GetFileIcon` 等）无需完整路径，可使用文件名或相对路径，按以下顺序搜索：

1. QM 目录（QM 2.3.3 前，`run` 不搜索此目录）。
2. 当前目录（`GetCurDir`/`SetCurDir`）。
3. 32 位 Windows 系统目录。
4. 16 位 Windows 系统目录。
5. Windows 目录。
6. PATH 环境变量列出的目录。
7. `run` 和 `str.searchpath` 还搜索注册表“App Paths”键。

某些函数（包括 `str.searchpath` 和 `GetFileIcon`）首先搜索 `$My QM$` 特殊文件夹。

相对路径中：
- 开头的 `.\` 表示当前目录。
- 开头的 `..\` 表示当前目录的上级目录。例如，若当前目录为 `"c:\program files\quick macros 2"`，则 `"..\"` 为 `"c:\program files\"`，`"..\otherapp"` 为 `"c:\program files\otherapp"`。
- 路径可包含或完全由 `"."` 和 `".."` 组成。

**了解更多**：[文件名称和路径](http://www.google.lt/search?q=site%3Amicrosoft.com%20File%20Names%20Paths)

## 快捷方式

将快捷方式拖放到 QM 代码编辑器时，插入 `run` 及快捷方式目标路径。按住 Ctrl + 拖放插入快捷方式路径。

## 注意事项

- 文件函数可能无法处理映射网络驱动器路径（如 `"Z:\file"`），应始终使用 UNC 路径（如 `"\\server\share\file"`）。
- 64 位 Windows 有两个 System32 和 Program Files 文件夹，[了解更多](IDP_VISTA.md)。