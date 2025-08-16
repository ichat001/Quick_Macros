# 网格控件（QM_Grid）

## QM 2.3.2 变更
在 **QM 2.3.2** 之前，`QM_Grid` 控件几乎未文档化，仅在 [论坛](http://www.quickmacros.com/forum) 有部分示例。**QM 2.3.2** 引入了以下改进：
- 支持在 [exe](IDH_MAKEEXE.html) 中使用。
- 性能更快。
- 单元格文本长度无限制。
- 支持行或行文本的剪切/复制/粘贴。
- 新增多种消息、样式和控件类型。
- 更方便添加列和设置行控件类型。
- 支持在 [Dialog Editor](IDH_DIALOG_EDITOR.html) 中定义样式和列。
- 支持使用对话框变量设置/获取网格数据。
- 新增 `DlgGrid` 类，简化对话框过程中的控件操作。
- 新增 `Sqlite` 类，支持在网格控件中显示 SQLite 数据库表。
- 更好地支持图像和其他行属性。
- **注意**：部分功能变更可能导致不兼容，需测试现有宏（变更详见 [grid.h](http://www.quickmacros.com/com/grid.h.txt)）。

## 使用场景
`QM_Grid` 控件可用于对话框或其他窗口，用于：
- 显示可编辑的文本表格（如 Excel）。
- 显示多属性（属性网格），单个控件可替代多个简单控件（如编辑框、组合框、复选框）。
- 显示只读文本表格，类似 `SysListView32` 控件的报告视图，但更快且易用。
- 显示带复选框的列表。

## 使用方法

### 添加到对话框
- 使用 [Dialog Editor](IDH_DIALOG_EDITOR.html) 添加控件并定义样式和列。
- 运行时可使用 `DlgGrid` 类动态定义样式和列，参见 `sample_Grid` 函数。

### 设置数据
- **Dialog Editor** 生成包含网格控件变量的代码，在调用 `ShowDialog` 前，将 CSV 格式字符串赋值给网格变量，使用 [ICsv](IDP_ICSV.html) 接口加载和处理 CSV。
- 也可用 `DlgGrid` 类设置数据，参见 `sample_Grid` 函数。

### 获取数据
- 当 `ShowDialog` 以 OK 返回时，网格变量包含 CSV 格式字符串，可用 [ICsv](IDP_ICSV.html) 接口处理和保存。
- 也可用 `DlgGrid` 类获取数据，参见 `sample_Grid` 函数。

### 在对话框过程中操作控件
- 使用 `DlgGrid` 类，参见 `sample_Grid` 函数。
- 支持网格控件和列表视图控件（`SysListView32`）的消息、通知、类型和常量：
  - 网格控件消息等在 [grid.h](http://www.quickmacros.com/com/grid.h.txt) 文档化，在 QM 中通过 `GRID.` 前缀使用（如 `GRID.LVN_QG_COMBOFILL`）。
  - 列表视图控件消息等在 [MSDN 库](IDP_MSDN.html) 文档化，在 QM 中通过 `WINAPI` 和 `WINAPIV` 引用文件使用。

### 设置行或单元格控件类型
- 在对话框过程中使用 `DlgGrid` 类函数。
- 若网格具有“可设置行控件类型”样式（`GRID.QG_SETROWTYPE`, 4），可在添加文本时通过第一列单元格设置行控件类型，语法：`<type>text`（详见下文“详情”）。

**示例**：
```qm
\Dialog_Editor
str controls="3"
str qmg3=
 <0>edit,x
 <1>combo,x
 <2>check,Yes
 <7>read-only,x
 <8>edit multiline,x
 <9>combo sorted,x
 <16>edit+button,x
 <17>combo+button,x
 
if(!ShowDialog("Dialog90" 0 &controls)) ret
out qmg3

; BEGIN DIALOG
; 0 "" 0x90C80AC8 0x0 0 0 223 135 "Dialog"
; 3 QM_Grid 0x54030000 0x0 0 0 224 110 "7,0,0,2[]A,,[]B,,[]"
; 1 Button 0x54030001 0x4 120 116 48 14 "OK"
; 2 Button 0x54030000 0x4 170 116 48 14 "Cancel"
; END DIALOG
; DIALOG EDITOR: "" 0x2030202 "*" "" ""
```

### 设置图标、lparam 和其他列表视图控件属性
- 在对话框过程中使用 `DlgGrid` 类函数。
- 添加图标：
  1. 使用 QM 图像列表编辑器（代码工具栏）创建图像列表并生成加载代码。
  2. 在对话框过程中加载图像列表（`__ImageList.Load`），附加到控件（`DlgGrid.SetImagelist`），并设置图标索引（`DlgGrid.RowPropSet` 或 `DlgGrid.RowAddSetX`）。
- 若具有 `QG_SETROWTYPE` 样式，可在添加文本时设置行属性，参见下文“详情”和 `sample_Grid_images` 函数。

### 与数据库结合
- **SQLite**：使用 `Sqlite` 类直接在网格控件中显示表格，参见 `sample_Grid_Sqlite` 函数。
- **其他数据库**：使用 `Database` 和 `DlgGrid` 类，需逐行传输数据，当前无直接传输整个表格的函数。

### 在 EXE 中使用
- `QM_Grid` 控件位于 `qmgrid.dll`，在未安装 QM 的计算机上不可用。
- **嵌入 DLL 到 EXE**：
  ```qm
  ExeQmGridDll
  ```
  - 将 `qmgrid.dll` 添加到 EXE 资源，运行时提取到临时文件夹并加载。
- **不嵌入 DLL**：
  1. 从 QM 文件夹获取 `qmgrid.dll`。
  2. 与 EXE 一起放入 ZIP 或安装程序，在目标计算机上解压到同一文件夹。
  3. 若在对话框或使用 `CreateControl` 创建网格控件，EXE 会在需要时加载 DLL；否则使用 `LoadLibrary` 加载。

## 详情

- **类名**：`QM_Grid`，实现于 `qmgrid.dll`。
- **参考文件**：在 QM 中通过 `GRID` 引用文件访问网格控件消息等。

### 网格行属性
若网格控件具有“可设置行控件类型”样式（`GRID.QG_SETROWTYPE`, 4）：
1. 设置第一列单元格的控件类型会影响整行的其他单元格。
2. 添加行时，可在第一列单元格文本中指定行控件类型和其他行属性，语法：
   ```syntax
   <ctype/lparam/image/overlayImage/stateImage/indent/ctypes>text
   ```
   - **ctype**：行控件类型（见下文）。
   - **lparam**：用户定义的整数值或任意字符串。
   - **image**：图像索引，`-1` 表示无图像。
   - **overlayImage**：覆盖图像索引（1-15，0 不添加，透明绘制于普通图像上，使用 `__ImageList.SetOverlayImages` 或 `ImageList_SetOverlayImage` 定义）。
   - **stateImage**：状态图像索引（1-15，索引 1 显示状态图像列表的第 0 张图像，需设置状态图像列表或复选框样式，复选框使用 1 和 2 表示未选中/选中）。
   - **indent**：缩进，单位为图像宽度（-1 到 254）。
   - **ctypes**：单元格控件类型列表，`.` 继承 `ctype` 或列，`-1` 继承列（如 `.0 -1..2`）。
   - **备注**：
     - 所有部分可选，如 `<ctype>text` 或 `<//image>text`。
     - 数字需为简单数字，不支持常量或表达式。
     - 显示图像和缩进需设置图像列表（`DlgGrid.SetImagelist`）。
     - 若同时具有“用户不可编辑第一列”样式（`GRID.QG_NOEDITFIRSTCOLUMN`, 1），`<...>` 字符串不会移除，仅不显示。

### 控件类型
| 类型 | 说明 |
|------|------|
| `0` | 编辑框 |
| `1` | 组合框 |
| `2` | 复选框 |
| `3` | 日期 |
| `7` | 只读 |
| `8 (0|8)` | 多行编辑框 |
| `9 (1|8)` | 排序组合框 |
| `11 (3|8)` | 时间 |
| `16` | 带按钮 |
| `23 (7|16)` | 只读编辑框 + 按钮 |

### C++ 头文件
- [grid.h](http://www.quickmacros.com/com/grid.h.txt)