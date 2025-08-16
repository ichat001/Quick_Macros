# 工具栏右键菜单

右键点击自定义 [工具栏](IDH_TOOLBAR.md) 时显示弹出菜单，用于设置工具栏选项。更多选项可在 [Properties](IDH_TOOLBAROPTIONS.md) 对话框中设置。

## 菜单项

- **Edit toolbar**：显示 QM 窗口并打开工具栏进行编辑。
- **Edit macro**：若按钮用于运行宏，显示 QM 窗口并打开该宏。
- **Open file location**：打开按钮关联的程序或文件所在文件夹。

## 选项

- **Show text**：显示按钮的文本标签。
- **Sizing border**：显示边框，未勾选时无法调整工具栏大小。
- **1-pixel border**（QM 2.2.0）：显示 1 像素边框，若勾选 **Sizing border**，可用于调整大小。
- **Auto shrink**：鼠标指针在工具栏内外时，工具栏大小不同。
- **Follow owner window**：工具栏随拥有者窗口移动或调整大小。
- **Follow screen size**（自由工具栏）：屏幕分辨率改变时移动工具栏。
- **Activate owner window on click**：点击工具栏时激活拥有者窗口。
- **Tooltips always**：即使勾选 **Show text**，也显示工具提示。
- **Vertical toolbar**：将工具栏设为垂直模式，替换垂直分隔符为水平分隔符等（需手动拖动边框调整宽高）。
- **Equal-size buttons**：勾选 **Show text** 时，按钮大小一致。
- **3D buttons**（QM 2.2.1）：显示旧式 3D 按钮，不兼容高亮颜色，在 Vista 及以上版本不兼容自定义字体。
- **Open file on drop**（QM 2.3.0）：拖放文件到按钮时不显示菜单，若按钮运行程序，则在该程序中打开文件。右键拖放可显示菜单。
- **Hide if full-screen window**（QM 2.3.3）：全屏窗口激活时隐藏工具栏（附着工具栏仅在拥有者窗口全屏时隐藏，自由工具栏在同一显示器全屏窗口激活时隐藏）。
- **Other programs cannot hide**：禁止其他程序隐藏或移动自由工具栏（不适用于附着工具栏）。例如，多桌面程序不会在非活动桌面隐藏工具栏。注意：Windows 10/11 虚拟桌面中，自由工具栏始终可见，不受此选项影响。
- **On top of topmost windows**（QM 2.3.3）：定期将自由工具栏置于始终置顶窗口（如任务栏）之上（Z 序）。未勾选时，工具栏可能位于其他置顶窗口后。也可通过再次触发工具栏使其可见（仅限自由工具栏）。
- **Quick icons**：快速加载图标，关闭工具栏时将图标保存到单一缓存文件，下次打开时从缓存加载。适用于图标数量多、加载慢的工具栏。未勾选时，每次从关联文件提取图标（较慢，尤其在杀毒软件扫描时，且耗内存）。
- **Refresh icons**：刷新过期的图标，适用于勾选 **Quick icons** 时。

## 坐标

若勾选 **Follow owner** 或 **Follow screen size**，工具栏坐标相对于拥有者窗口或屏幕的选定角落。若勾选 **Auto shrink**，扩展方向取决于选定角落。

- **Auto select**：用鼠标右键移动工具栏时，自动选择最近的角落。

## 注意事项

- **QM 2.4.0**：工具栏设置、位置和大小在关闭工具栏时保存到主 [QM 文件](IDH_QML.md)（包括当前加载的共享文件中的工具栏）。旧版 QM 使用注册表保存。
- **恢复丢失工具栏**：若工具栏运行但不可见，点击 **Run** 菜单的 **View Active Items**，在 **Running Items** 列表右键点击工具栏，选择 **Move Here**。点击 **Reset** 将关闭工具栏并重置其大小、位置和右键菜单设置为默认值。