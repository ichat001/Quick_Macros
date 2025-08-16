# QM 宏列表文件

Quick Macros (QM) 将多个宏和其他 [QM 项目](IDH_ITEMS.md) 存储在扩展名为 `.qml` 的文件中。启动时，QM 加载最近使用的 **主文件**（初始为 `Main.qml`），以及 `System.qml`（QM 扩展）和可选的若干 **共享文件**（见下文）。

## 文件管理

QM 在退出或打开另一文件时关闭文件，同时：
- 终止运行中的线程
- 关闭工具栏
- 删除变量和声明

所有更改自动保存：
- 项目管理更改（如添加、删除、移动项目）立即保存。
- 文本更改延迟保存，也可在点击 **Save** 按钮时保存。
- 次要更改（如打开/展开状态）在关闭文件或隐藏 QM 时保存。

## QM 2.4.0 新特性

### 文件格式变更

文件格式改为 [SQLite 数据库](http://www.quickmacros.com/forum/viewtopic.php?f=12&t=5882&p=27149)。打开旧版本文件时，QM 自动转换为新格式，旧版本 QM 无法打开新格式文件。文件扩展名不变，转换时备份旧文件。

### 文件访问

- 文件打开时，其他 QM 实例只能以只读模式打开（见本地缓存副本和 [网络设置](IDH_NETWORK.md)）。
- 编辑宏等操作时，QM 首先将更改写入临时文件（`.qml-wal`），在关闭文件、隐藏 QM 或更改较多时转移到主文件（`.qml`）。详情见 [_qmfile.FullSave](IDP_QMFILE.md)。临时文件可能达 4 MB 或更大，属正常现象。另见 [备份](IDH_SETT_FILES.md)。

### 工具栏存储

自定义工具栏的位置、大小和样式现存储在文件中，而非注册表。当前加载的所有工具栏（包括共享文件中的）保存在当前主文件中。详情见 [Options -> Layout of toolbars](IDH_SETT_GENERAL.md)。

### 格式变更原因

- 旧格式限制多且不可靠。
- 新格式便于添加功能。
- 大文件或慢速磁盘时更快。
- 无需将整个文件加载到内存或保存时从内存重写。
- 部分数据无需存储在其他文件。
- 可使用 [QM 文件管理函数](IDP_QMFILE.md) 或 `Sqlite` 类管理宏资源、自定义数据等。
- 可在数据库管理程序（如 SQLite Expert）中编辑 QM 文件，编辑前需退出 QM（因文件锁定）。

## 共享文件

**共享文件** 是加载到主文件中虚拟文件夹的 QM 文件，称为 **共享文件夹**，图标上有“S”字母。通过 **File -> Import** 添加共享文件夹。若共享文件夹不在根目录（位于其他文件夹内），QM 不加载其文件。

共享文件夹类似文件链接，其项目存储在共享文件中，而非主文件，但可像主文件项目一样使用、编辑和管理。QM 自动保存更改并备份（QM 2.4.0）。

### 特殊共享文件夹

- **System 文件夹**（`System.qml`）：包含 [QM 扩展](IDH_EXTEND.md)，每次打开主文件时自动添加。
- **Temp 文件夹**（QM 2.4.0）：存储 QM 和宏创建的临时项目，为内存数据库，关闭主文件时清空。
- **Deleted 文件夹**（QM 2.4.0）：存储删除的项目，类似 Windows 回收站，默认为内存数据库，可右键指定文件。

### 本地缓存（QM 2.4.0）

若共享文件位于另一电脑，QM 以只读模式加载其本地缓存副本，避免文件不可用时的等待或失败。可在 **Folder Properties -> Shared File** 对话框启用/禁用。

## 安装文件

QM 安装以下 `.qml` 文件：

- **$my qm$\Main.qml**：用户初始主文件，位于 `My Documents\My QM`。升级 QM 时不替换。
- **$qm$\Installed Files\Main.qml**：当前 QM 版本的原始 `Main.qml`，升级时替换，不建议用作主文件。
- **$qm$\System.qml**：[QM 扩展](IDH_EXTEND.md)，升级时替换，不建议用作主文件。

**路径说明**：
- `$qm$`：QM 安装文件夹，通常为 `C:\Program Files (x86)\Quick Macros 2`。
- `$my qm$`：用户 QM 文件夹，默认在 `My Documents\My QM`。

更多文件可在 [QM 论坛](http://www.quickmacros.com/forum/index.php) 找到。

## 迁移 Quick Macros 及宏数据到另一电脑

将 Quick Macros 从电脑 A 迁移到电脑 B：

1. 在 B 上安装 Quick Macros。
2. 确保 B 上 Quick Macros 未运行（**File -> Exit program**）。
3. 在 A 上找到 `My QM` 文件夹（默认在 `My Documents`，可通过 **Options** 查看）。
4. 将 `My QM` 文件夹复制到 B 的 `My Documents`，若 B 已存在 `My QM`，先删除。
5. 若 A 的宏文件不在 `My QM` 中，复制到 B（查看路径：**File -> Recent** 首项）。
6. 在 B 上运行 Quick Macros。
7. 若未自动打开文件，通过 **File -> Open/New File** 打开。

**另见**：[网络设置](IDH_NETWORK.md)

## 文件查看器

打开未知 QM 文件时，先进入 **File Viewer**，可安全预览内容，然后选择打开、导入、添加为共享文件或取消。下载的文件可能包含恶意、冲突（重复函数、触发器等）或无用代码。若认为文件不安全或无用，可取消，或以禁用触发器方式导入，或仅导入选定项目。

**File Viewer** 还用于：
- 预览导入文件
- 从备份文件夹恢复项目
- 查看其他文件
- 在文件夹中搜索多个文件中的项目

**未知文件**：不在最近文件列表（**File -> Recent**）且未在 QM 中打开的文件。

## 修复损坏文件

QM 文件（SQLite 数据库）可能 [损坏](http://www.sqlite.org/howtocorrupt.html)，导致 QM 无法加载文件或操作宏及其他数据。

**修复方法**：
- 最佳方式：用最新备份文件替换，备份位于 `Documents\My QM\Backup`（除非在 [Options -> Files](IDH_SETT_FILES.md) 中更改）。
- 尝试 [修复文件](http://www.quickmacros.com/forum/viewtopic.php?f=12&t=5882&p=27149)。

## 相关内容

- [命令行](IDH_TRIG_COMMANDLINE.md)
- [文件菜单](IDH_MENU_FILE.md)
- [文件属性](IDH_FOLDERPROP.md)
- [网络设置](IDH_NETWORK.md)
- [备份](IDH_SETT_FILES.md)