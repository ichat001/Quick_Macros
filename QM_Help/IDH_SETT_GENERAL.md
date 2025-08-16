# 选项：通用

## 系统托盘图标

- **Tray icon**：取消勾选以移除 QM 系统托盘图标。移除后，可通过 **Ctrl+Alt+Shift+Q** 打开 QM 窗口，或点击开始菜单中的 QM 图标（**Programs -> Quick Macros 2**）或在 Windows 资源管理器中运行 QM（若已运行）。
- 可设置仅在宏运行时显示托盘图标，此时图标不响应鼠标点击。

## 开机启动

- **Run at startup**：启用后，Windows 启动时运行 QM。
  - 管理员可为所有用户设置，使用注册表实现。
  - 非所有用户设置时，各用户可单独设置，使用 **Startup** 文件夹。
  - 此功能在 [便携版 QM](IDP_PORTABLE.md) 中不可用。

## 检查新版本

- **Check for new QM version**：QM 启动时检查新版本，若有新版本，在 QM 输出窗口显示。

## Unicode

- **Unicode**：勾选后，QM 将宏和用户界面文本解释为 [Unicode](IDP_UNICODE.md) UTF-8 编码；未勾选时为 ANSI 编码（类似 QM 2.3.0 之前版本）。
- 启用 Unicode 并重启 QM 后，点击 Unicode 复选框旁的小箭头按钮，转换宏到 UTF-8。

## 运行身份

- **Run as**：设置 QM 进程的 [UAC 完整性级别](IDP_VISTA.md)。此功能在 [便携版 QM](IDP_PORTABLE.md) 中不可用。

## 混合粘贴

- **Hybrid paste in menu/TB/autotext**：在菜单、工具栏和自动文本列表中，若省略 [paste](IDP_PASTE.md)/[outp](IDP_OUTP.md)，启用 [混合粘贴](IDP_PASTE.md)。例如，`: "text"` 等同于 `:paste+ "text"`；未勾选时等同于 `:paste "text"`。

## 清除类别名称

- **Erase category when item selected**：从 [类别](IDP_CATEGORIES.md) 列表选择项目时，清除类别名称。

## 禁用前台窗口锁定

- **Disable "lock foreground window"**：允许后台应用程序激活窗口。通常保持未勾选。若 [act](IDP_ACT.md)、[run](IDP_RUN.md) 等命令无法激活窗口，可尝试勾选。

## 显示隐藏运行项目

- **Show hidden Running items**：在运行项目面板显示所有项目。未勾选时，隐藏私有文件夹（在 **Folder Properties** 中勾选“Private functions”）中的项目，如 QM 扩展（System）。可右键点击运行项目面板的文件夹或空白处快速隐藏/显示。

## 列表显示模式

- **List with [+] boxes**：设置 QM 项目主列表的视图和行为。在 [+] 模式下，双击可更方便地编辑项目名称。

## 错误处理

- **On error**：发生错误时，打开包含错误的宏，并可选在 QM 窗口隐藏时显示窗口。

## 工具栏布局

- **Layout of toolbars**：指定自定义工具栏的替代布局（配置）名称，适用于多台电脑使用同一 QM 文件但需不同工具栏位置/大小/样式的情况。
  - 示例：主电脑使用默认布局（无名称），电脑 B 使用 L1，电脑 C 和 D 使用 L2。
  - 工具栏位置/大小/样式数据存储在当前 QM 文件中，各布局独立保存。隐藏工具栏时保存数据。首次在自定义布局中启动的工具栏继承默认布局数据。

## 录制截图

- **Record images**：录制鼠标点击或使用 **Mouse** 对话框时捕获截图（小图像），保存在 [宏资源](IDP_RESOURCES.md) 中，名称以 `~:` 开头，作为注释插入宏文本。删除包含 `~:...` 的宏文本并关闭宏后，自动删除未使用的截图资源。可通过工具栏的 **Images in code editor** 按钮显示/隐藏代码编辑器中的图像。

## 启用 Chrome 可访问对象

- **Enable Chrome acc when it starts**：自动启用 Chrome 网页区域的可访问对象，仅在 QM 运行时 Chrome 进程启动时生效，可能使大型网页加载变慢。详情见 [在网页中使用可访问对象](IDP_ACCESSIBLE.md)。

## 检查扩展

- **Check extensions**：检查 [QM 扩展](IDH_EXTEND.md) 是否正常工作。

## 导出设置

- **Export settings**：将 QM 注册表设置导出为 `.reg` 文件。详情见 [网络设置](IDH_NETWORK.md)。

## 运行时选项

- **Run-time options**：显示如何更改运行时选项。QM 2.3.4 移除全局运行时选项设置，现通过 [RtOptions](IDP_QMDLL.md#RtOptions) 修改。为兼容性，早期版本设置的选项仍有效。

## 调试

- **Debug**：提供调试 QM 或宏的选项。
  - 选择 **dump exceptions** 生成每次异常（包括 QM 内部异常及 DLL/组件异常）的崩溃转储文件（`.dmp`）。异常可能导致 QM 崩溃或其他异常行为。
  - 可将 `.dmp` 文件附在邮件中报告 QM 错误/崩溃。
  - 不需要时可删除 **Debug** 文件夹。
  - 这些选项不适用于在其他进程中运行的宏。