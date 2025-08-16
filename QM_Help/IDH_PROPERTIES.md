# 属性

在 **Properties** 对话框中，可为当前 [QM 项目](IDH_ITEMS.md) 设置触发器和其他属性。

## 触发器

触发器是启动项目的特定事件。支持的触发器类型包括：
- [热键](IDH_TRIG_KEY.md)
- [鼠标](IDH_TRIG_MOUSE.md)
- [窗口](IDH_TRIG_WINDOW.md)
- [QM 事件](IDH_TRIG_QM.md)
- [文件](IDH_TRIG_FILE.md)
- [事件日志](IDH_TRIG_EVENTLOG.md)
- [进程](IDH_TRIG_PROCESS.md)
- [可访问对象](IDH_TRIG_ACC.md)
- [自动文本](IDH_TSM.md)
- [用户定义触发器](IDH_TRIG_EXT.md)

此外，可设置 [命令行触发器](IDH_TRIG_COMMANDLINE.md)（如调度器、快捷方式）或复制命令行字符串，供其他程序通过命令行或 `SendMessage` 启动 QM。其他启动宏的方式包括：
- [菜单](IDH_POPUP.md)
- [工具栏](IDH_TOOLBAR.md)
- [文本](IDH_TSM.md)
- 函数（如 [mac](IDP_MAC.md)、[tim](IDP_TIM.md)、`RunTextAsMacro`）
- QM 工具栏的 **Run** 按钮

### 程序

指定触发器适用的程序，仅需文件名（不含路径和 `.exe`）。可指定多个程序，用逗号分隔，例如：`NOTEPAD,CALC`。程序名称可在 QM 状态栏中查看（鼠标置于程序窗口时）。也可在 [文件夹或文件属性](IDH_FOLDERPROP.md) 中为所有项目设置程序。

### FF

分配 [过滤器函数](IDH_TFF.md)，用于缩小触发器范围或实现其他效果。

### 调度

设置项目在指定时间运行，使用 Windows 任务调度器创建任务。详情见 [命令行](IDH_TRIG_COMMANDLINE.md)、[解锁计算机](IDP_QMTL.md)。此功能在 [便携版 QM](IDP_PORTABLE.md) 中不可用。

### 快捷方式

在桌面、开始菜单或快速启动栏创建快捷方式，点击快捷方式启动 QM（若未运行）并执行该项目。此功能在 [便携版 QM](IDP_PORTABLE.md) 中不可用。

### 命令行

格式化 [命令行](IDH_TRIG_COMMANDLINE.md) 以启动项目，并复制到剪贴板。

### 多触发器

创建快捷宏并打开其 **Properties** 对话框。宏本身不能有多个触发器，但可通过快捷宏实现。快捷宏以空格、斜杠和目标宏名称或 [GUID](IDP_GUID.md) 开头，例如：` /TargetMacroName`。快捷宏的触发器会启动目标宏。

### 我的宏

查看已存在的选定类型触发器，避免重复触发器。

### 禁用

禁用触发器。禁用项目仍可通过 **Run** 按钮、[mac](IDP_MAC.md)、菜单或工具栏启动。

## 通用属性

适用于所有项目类型（宏、菜单等）。

### 模板

勾选后，当前项目将添加到 **File -> New -> Templates** 菜单。若项目名称为 `Macro`、`Function`、`Menu`、`Toolbar`、`Autotext` 或 `Member`，则替换默认的 **File -> New** 菜单项。若多个模板名称以相同单词加空格或下划线开头，添加到子菜单。

## [宏](IDH_MACRO.md) 属性

### 若宏正在运行

选择当宏启动时，若该宏或其他宏正在运行的行为。默认情况下，多个宏不能像其他 [QM 项目](IDH_ITEMS.md)（如函数）那样同时运行。

**QM 2.4.2** 新增 **Run simultaneously** 选项。此前需将宏转换为函数实现同时运行。现在可直接使用此选项，宏将具有函数的某些特性，详情见 [宏](IDH_MACRO.md)。

### 转换为函数

将宏转换为 [函数](IDH_FUNCTION.md)，可能更改名称以符合有效标识符要求（无空格等）。

## [函数](IDH_FUNCTION.md) 属性

### 允许单一实例

勾选后，函数在其 [线程](IDP_THREADS.md) 已运行时不会再次运行，仅适用于普通线程，不适用于特殊线程或代码调用的函数。或在函数开头添加：

```qm
if(getopt(nthreads)>1) ret
```

### 用作过滤器函数

勾选后，函数可用作 [过滤器函数](IDH_TFF.md)，与触发器一起使用以缩小范围或实现其他效果。

## 宏和函数共用属性

### 可运行

设置允许的启动方式。例如，为防止意外启动函数，可选择“No, can only be called”或“Yes, except the Run button”。也可设置运行其他宏或函数。此选项保存在宏文本首行，可不通过 **Properties** 对话框快速编辑，详情见 [函数](IDH_FUNCTION.md)。

### 在单独进程中运行

在 [制作 exe](IDH_MAKEEXE.md#a8) 中说明。QM 创建并运行 exe 或 qmm 文件以在单独进程中运行宏。

### 运行身份

宏进程的 UAC 完整性级别，详情见 [制作 exe](IDH_MAKEEXE.md#a8)、[UAC](IDP_VISTA.md)。

### 不在后台运行；若计算机锁定则解锁

详情见 [解锁计算机](IDP_QMTL.md)。

## [菜单](IDH_POPUP.md) 属性

设置 [菜单属性](IDH_MENUOPTIONS.md)。

## [工具栏](IDH_TOOLBAR.md) 属性

设置 [工具栏属性](IDH_TOOLBAROPTIONS.md)。

## [自动文本](IDH_TSM.md) 属性

设置自动文本列表选项。

## [成员函数](IDP_CLASSES.md) 属性

设置成员函数相关属性。

## [文件夹属性、文件属性](IDH_FOLDERPROP.md)

右键点击文件夹，选择 **Folder Properties** 设置文件夹属性。