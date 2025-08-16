# 菜单和工具栏图标

使用[图标](IDH_ICONS.html)对话框查找或创建图标，并分配给菜单项和工具栏按钮。

## 图标指定方式
在菜单或工具栏定义中，可在项目后使用 `*` 指定图标文件，后面可跟基于 0 的图标索引。若未指定图标，则使用默认图标。使用 `**` 阻止添加图标。为所有菜单项禁用图标，可在“属性”对话框勾选“无图标”。

**示例**：
```cpp
Macro5 :mac "Macro5" * Shell32.dll * 5
Macro5 :mac "Macro5" * Shell32.dll,5
Select All :key Ca * C:\Icons\Select All.ico
:int i=2*2; paste(i * 10) * iconinmyqmfolder.ico
Macro5 :mac "Macro5" * $desktop$\ic1.ico
Macro5 :mac "Macro5" * "resource:<Macro5>ic1.ico"
Macro5 :mac "Macro5" **
```

- **QM 2.3.0**：支持使用 `iconfile,iconindex` 语法指定图标索引（如示例 2）。
- **QM 2.4.1**：支持[宏资源](../Other/IDP_RESOURCES.html)。若资源或文件（完整路径）用引号括起来，代码编辑器中会显示图标。

## 动态菜单与图标句柄
对于运行时创建的菜单（如 [DynamicMenu](../Functions/DynamicMenu.html)），可使用图标句柄而非图标文件。获取图标句柄可使用 [GetFileIcon](../User/IDP_QMDLL.html#GetFileIcon)、[GetWindowIcon](../User/IDP_QMDLL.html#GetWindowIcon) 或 Windows API 函数。图标句柄也可用于工具栏，图标在工具栏关闭前不得销毁。

**示例**（显示动态创建的窗口菜单）：
```cpp
;; 显示动态创建的窗口菜单
ARRAY(int) aw; GetMainWindows aw
ARRAY(__Hicon) ai.create(aw.len)
str s t
int i
for i 0 aw.len
	ai[i]=GetWindowIcon(aw[i])
	t.getwintext(aw[i])
	t.findreplace(" :" " [91]58]") ;; 转义 :
	t.escape(1) ;; 转义 " 等
	s+F"{t} :act {aw[i]}; err * {ai[i]}[]"
out s
i=DynamicMenu(s "" 1)
if(i) outw aw[i-1]
```