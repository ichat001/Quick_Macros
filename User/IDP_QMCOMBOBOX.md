# ShowDropdownList; QM_ComboBox 和 QM_Edit 控件

## 目录

- [ShowDropdownList 函数](#showdropdownlist)
- [QM_ComboBox 控件](#qm_combobox)
- [QM_Edit 控件](#qm_edit)
- [IQmDropdown 接口](#iqmdropdown)
- [在 EXE 中使用](#exe)

---

## <a name="showdropdownlist"></a>ShowDropdownList 函数

```qm
#ShowDropdownList ICsv'csv [int&iSelected] [ARRAY(byte)&aChecked] [funcFlags] [hwndHost] [RECT&rDD] [cbFunc] [cbParam] [IQmDropdown&dd]
#ShowDropdownListSimple $csv [int&iSelected] [ARRAY(byte)&aChecked] [funcFlags] [hwndHost] [RECT&rDD]
```

显示一个临时的顶级窗口，包含一个可选择（如 ComboBox 控件）、可勾选（带复选框，类似多选 ListBox）或禁用（可用作标题、分隔符等）的项目列表。默认情况下，所有项目都可选择。项目可以包含图标、颜色等。

`ShowDropdownListSimple` 是 `ShowDropdownList` 的简化版本，使用 CSV 字符串作为第一个参数，去掉了几个参数，其他功能相同。

### 返回值
返回以下一个或多个值（以[标志](IDP_FLAGS.md)形式）：

| 标志名称              | 标志值  | 描述                                      |
|-----------------------|---------|-------------------------------------------|
| QMDDRET_SELOK         | 1       | 用户选择了可选择项目（通过点击、Enter 或 Tab）。 |
| QMDDRET_CHECKCHANGED  | 2       | 复选框状态发生变化。                      |
| QMDDRET_SELCHANGED    | 4       | 选择的项发生变化（需与 QMDDRET_SELOK 一起）。 |
| QMDDRET_NOERRORS      | 0x100   | 下拉列表成功显示（无错误）。              |

如果无法显示下拉列表（例如参数无效），返回 0。

### 参数

#### **csv**
设置控件属性和添加列表项目。对于 `ShowDropdownList`，它是一个 [ICsv](IDP_ICSV.md) 变量；也用于接收结果（如果未使用 `iSelected`/`aChecked`）。对于 `ShowDropdownListSimple`，它是一个 [CSV](IDP_ICSV.md) 字符串。以下是 `ICsv` 变量或 CSV 字符串的格式描述：

**首行 - 控件属性：**

- **列 0**：选中的项目索引。
  - 如果为空或 -1，表示无选中。
  - 如果使用控件标志 2，此单元格存储用于表示勾选项目的 32 位数字。
  - 如果未使用 `iSelected`，此函数会使用并更新此单元格。
- **列 1**：图像列表。可以是：
  - 图像列表文件或[资源](IDP_RESOURCES.md)名称（单行）。
  - 图标文件或资源列表（多行或以换行符结尾），用双引号括起来。
  - 图像列表句柄（如果是数字）。函数不会复制或销毁图像列表。可以使用 `__ImageList` 变量加载/创建/销毁图像列表。
- **列 2**：控件[标志](IDP_FLAGS.md)：
  - 1：带复选框。使用 `aChecked` 或项目标志获取/设置勾选状态。
  - 2：带复选框。使用 32 位数字（存储在 `iSelected` 或单元格 0 0）表示勾选项目，位为 1 表示勾选。不使用标志 1 和 `aChecked`。
  - 4：鼠标远离时不关闭下拉列表。
  - 8：自动颜色。禁用项目的文本为灰色，标题项目（项目标志 2|4|8）的背景为绿色。如果项目明确指定颜色，则无效。
  - 0x10：多列，带水平滚动条。
  - 0x20：项目从左到右、然后从上到下排列。
  - 0x40：使用 `hwndHost`/`rDD` 的宽度作为下拉列表的最小宽度（非精确宽度），根据项目字符串计算实际宽度。
  - 0x80：快速下拉（无动画）。
- **列 3**：未使用。
- **列 4**：列表文本[颜色](IDP_COLOR.md)，格式为 0xBBGGRR。
- **列 5**：列表背景颜色，格式为 0xBBGGRR。
- **列 6**：如果使用标志 0x10 或 0x20，设置列宽（>0 为像素，<0 为对话框单位）。也设置下拉列表的最小宽度。
- **列 7**：垂直显示的最大项目数（一个滚动页面）。

**其他行 - 列表项目：**

- **列 0**：项目文本。
- **列 1**：图像列表中的项目图像索引。如果为空或 -1，无图像。
  - 如果未使用图像列表，此列可用于其他用途，例如作为项目 ID。
- **列 2**：项目[标志](IDP_FLAGS.md)：
  - 1：勾选。函数根据需要更新此标志，并添加/移除标志 0x80（勾选状态变化）。
  - 2：无复选框。项目可选择（如果未禁用）。
  - 4：禁用（不可选择）。
  - 8：粗体字体。例如，标题项目可使用标志 0xE（无复选框、禁用、粗体）。
  - 16：即使有复选框也允许选择。点击复选框切换勾选状态；点击项目文本选择并关闭。
  - 32：分组。勾选该项目会取消相邻项目的此标志。
- **列 3**：项目提示文本。
- **列 4**：项目文本[颜色](IDP_COLOR.md)，格式为 0xBBGGRR。
- **列 5**：项目背景颜色，格式为 0xBBGGRR。
- **列 6**：项目缩进。
- **列 7**：项目数据。任意文本或数字，函数不使用。

对于 `ShowDropdownListSimple`，`csv` 必须是有效的 [CSV](IDP_ICSV.md) 字符串。如果单元格文本包含特殊字符（逗号、双引号、换行），必须用双引号括起来，文本中的双引号需替换为两个双引号。

在数字单元格中，可使用十进制数、十六进制数（例如 "0xE"）或带 | 运算符的表达式（例如 "1|4|0x300"）。

CSV 控件标志和项目标志有[命名常量](IDP_DEF.md)，定义在 `\System\Declarations\QmDll` 中。如果 CSV 是[F-string](IDP_FSTRING.md)，可使用这些名称，例如：

```qm
str csv=F",,{QMDD_CHECKBOXES1|QMDD_AUTOCOLORS}[]..."
```

#### **iSelected**
设置并接收选中的项目索引变量。
- 如果省略或为 0，函数使用 `csv` 单元格 0 0。
- 如果使用控件标志 2，此变量（或 `csv` 单元格 0 0）存储勾选项目的 32 位数字。

#### **aChecked**
设置勾选状态的数组变量。勾选项目的元素包含标志 1。
- 函数根据需要更新 `aChecked` 元素，元素将包含标志：1 表示勾选，0x80 表示勾选状态变化。
- 如果省略或为 0，函数使用 `csv` 中的项目标志。
- 如果数组为空或较小，函数会在使用复选框时创建它。

#### **funcFlags**
函数[标志](IDP_FLAGS.md)：
- QMDDFF_CSVINPUT (1)：仅用 `iSelected`/`aChecked` 输出，`csv` 用于输入。
- QMDDFF_SORT (8)：对 `csv` 行排序，并更新单元格 0 0 和 `iSelected` 以匹配新的选中项目索引。如果使用 CSV 标志 2 或 `aChecked` 用于输入，则无效。

#### **hwndHost**
宿主控件句柄。下拉列表将显示在宿主控件下方或上方，并使用其宽度和字体。

#### **rDD**
一个 `RECT` 变量。如果使用：
- 下拉列表将在屏幕上的此矩形中显示，并使用 `rDD` 的宽度。
- 如果 `rDD` 的宽度或高度为 0，则不限制下拉列表的宽度或高度。
- 如果未使用 `rDD` 和 `hwndHost`，下拉列表将显示在鼠标光标附近。
- 如果参数指定的下拉列表宽度（`rDD`、`hwndHost` 宽度等）小于两个项目的高度，函数会忽略它并根据项目字符串计算宽度。

#### **cbFunc, cbParam**
回调函数地址及其传递值，用于通知各种事件。回调函数必须以以下形式开头：

```qm
function# cbParam QMDROPDOWNCALLBACKDATA&x
```

- **cbParam**：`ShowDropdownList` 的 `cbParam`。
- **x**：事件信息。

```qm
type QMDROPDOWNCALLBACKDATA IQmDropdown'dd code itemIndex itemState
```

- **dd**：[IQmDropdown](IDP_QMCOMBOBOX.md#iqmdropdown) 变量，可调用 `x.dd.Check`、`x.dd.IsChecked` 等函数。
- **code**：事件代码：
  - 1, 2：复选框状态变化。`itemIndex` 为项目索引，`itemState` 为 1（勾选）或 0（未勾选）。用户勾选/取消勾选时，`code` 为 1；`Check` 函数操作时，`code` 为 2。返回 0。

#### **dd**
接收 [IQmDropdown](IDP_QMCOMBOBOX.md#iqmdropdown) 接口指针的变量，仅在下拉列表显示时有效。`ShowDropdownList` 返回时，将变量置为 0。例如，在对话框过程中关闭下拉列表时，可调用 `dd.Close` 或其他方法（如 `dd.Check`、`dd.IsChecked`）。

### 其他功能

**键盘快捷键**（仅在 `hwndHost` 使用、活动且属于当前线程时有效）：
- Down/Up/PgDn/PgUp：高亮项目。
- 空格键：切换高亮项目的勾选状态。
- Enter 或 Tab：关闭下拉列表，返回值包含 `QMDDRET_SELOK`（1），可能包含 `QMDDRET_CHECKCHANGED`（2）或/和 `QMDDRET_SELCHANGED`（4）。
- Esc 或 Alt：关闭下拉列表，不包含 `QMDDRET_SELOK` 或 `QMDDRET_SELCHANGED`，可能包含 `QMDDRET_CHECKCHANGED`。

### 示例

#### 示例 1：显示下拉列表并获取选中项目索引

```qm
 显示下拉列表并获取选中项目索引
str imagelist="$qm$\il_qm.bmp"  ;;提示：在 QM 代码编辑器中查看图像，选中工具栏按钮“在代码编辑器中显示图像”
str csv=
F
 ,{imagelist}
 one,1
 two,2
 three

int iSelected
int R=ShowDropdownListSimple(csv iSelected)
out F"R=0x{R}, selected={iSelected}"
```

#### 示例 2：显示带复选框的下拉列表，使用 32 位变量获取勾选项目

```qm
 显示带复选框的下拉列表；使用 32 位变量获取勾选项目
str icons="$qm$\new.ico[]$qm$\copy.ico[]$system$\shell32.dll,4"
str csv=
F
 ,"{icons}",2
 one,1
 two,2
 three,,1

int checked
int R=ShowDropdownListSimple(csv checked)
out F"R=0x{R} checkBoxes=0x{checked}"

int i
for i 0 3
    if(checked>>i&1) out F"item {i} is checked"
```

#### 示例 3：显示带复选框的下拉列表，从 CSV 获取勾选项目

```qm
 显示带复选框的下拉列表并从 CSV 获取勾选项目
str csv=
 ,,1
 one,1
 two,2
 three,,1

ICsv x._create; x.FromString(csv)

int R=ShowDropdownList(x)
out F"R=0x{R}"
 x.ToString(_s); out _s

int i
for i 1 x.RowCount
    if(x.CellInt(i 2)&1) out F"item {i-1} is checked"
```

---

## <a name="qm_combobox"></a>QM_ComboBox 控件

`QM_ComboBox` 控件是增强的 ComboBox 控件，拥有更好的下拉列表功能，支持图像、复选框（多选）等。其下拉列表部分使用 `ShowDropdownList` 函数。

在[对话框编辑器](IDH_DIALOG_EDITOR.md)中添加 `QM_ComboBox` 控件。使用对话框编辑器创建的对话框变量设置和获取控件数据（属性和列表项目）。

### 示例对话框

```qm
\Dialog_Editor

str dd=
 BEGIN DIALOG
 0 "" 0x90C80AC8 0x0 0 0 224 136 "Dialog"
 3 QM_ComboBox 0x54230243 0x0 8 8 96 213 ""
 4 QM_ComboBox 0x54230242 0x0 8 28 96 213 ""
 5 QM_ComboBox 0x54230243 0x0 8 48 96 213 ""
 6 QM_ComboBox 0x54230243 0x0 8 68 96 213 ""
 1 Button 0x54030001 0x4 116 116 48 14 "OK"
 2 Button 0x54030000 0x4 168 116 48 14 "Cancel"
 END DIALOG
 DIALOG EDITOR: "" 0x2040300 "*" "" "" ""

str controls = "3 4 5 6"
str qmcb3 qmcb4 qmcb5 qmcb6
 最简单的。添加三个项目并选中 Mercury（索引 0）
qmcb3="0[]Mercury[]Venus[]Earth"
 带图标。添加三个项目，选中 Mercury，并在下拉列表中显示图像列表中的前三个图像
str imagelist="$qm$\il_qm.bmp"  ;;提示：在 QM 代码编辑器中查看图像，选中工具栏按钮“在代码编辑器中显示图像”
qmcb4=F"0,{imagelist}[]Mercury,0[]Venus,1[]Earth,2"
 带复选框。添加三个项目，勾选 Mercury（其项目标志包含 1），并将控件文本设置为“Mercury”
qmcb5=",,1[]Mercury,,1[]Venus,,0[]Earth"
 带复选框，使用 32 位数字勾选项目。添加三个项目，勾选 Mercury 和 Earth（0x5 的第一和第三位为 1），并将控件文本设置为“Mercury, Earth”
qmcb6=
 0x5,,3
 Mercury
 Venus
 Earth

if(!ShowDialog(dd 0 &controls)) ret

out qmcb3
out qmcb4
out qmcb5
out qmcb6
```

### 如何设置控件属性和列表项目

在调用 [ShowDialog](IDH_DIALOG_EDITOR.md) 之前，将 [CSV](IDP_ICSV.md) 字符串赋值给对话框控件变量。

**首行 - 控件属性：**

- **列 0**：选中的项目索引。
  - 如果为空或 -1，表示无选中。
  - 如果形如 "-1 text"，设置可编辑控件的文本。仅当控件不带复选框时有效。
  - 如果使用控件标志 2，此单元格存储勾选项目的 32 位数字。
- **列 1**：图像列表。可以是：
  - 图像列表文件或[资源](IDP_RESOURCES.md)名称（单行）。
  - 图标文件或资源列表（多行或以换行符结尾），用双引号括起来。
  - 图像列表句柄（如果是数字）。控件不会复制或销毁图像列表，需确保其在控件销毁或项目替换/删除前有效。
- **列 2**：控件[标志](IDP_FLAGS.md)：
  - 1：带复选框。使用项目标志获取/设置勾选状态，控件文本格式为勾选项目标签列表，如 "Item1, Item2"。
  - 2：带复选框。使用单元格 0 0 的 32 位数字表示勾选项目，位为 1 表示勾选。控件文本格式取决于标志 1 和 0x800，默认显示十六进制数。
  - 4：鼠标远离时不关闭下拉列表。
  - 8：自动颜色。禁用项目文本为灰色，标题项目（项目标志 2|4|8）背景为绿色。如果项目明确指定颜色，则无效。
  - 0x10：多列，带水平滚动条。
  - 0x20：项目从左到右、然后从上到下排列。
  - 0x40：使用控件宽度作为下拉列表的最小宽度（非精确宽度），根据项目字符串计算实际宽度。
  - 0x80：快速下拉（无动画）。
  - 0x100：对话框变量获取 CSV。详见下文。
  - 0x200：点击时不选中编辑控件中的所有文本。
  - 0x400：设置选中项目为无或勾选项目为无时，不清除编辑控件文本。
  - 0x800：当使用标志 2 时，显示勾选项目为 "1|2|4|0x300" 而非 "0x307"。
  - 0x1000：从编辑文本自动添加未知项目到列表，在显示下拉列表或获取控件数据前添加，并选中或勾选添加的项目。不与标志 2 一起使用。
- **列 3**：提示文本。在控件未聚焦且文本为空时显示的较浅文本。
- **列 4**：列表文本[颜色](IDP_COLOR.md)，格式为 0xBBGGRR。
- **列 5**：列表背景颜色，格式为 0xBBGGRR。
- **列 6**：如果使用标志 0x10 或 0x20，设置列宽（>0 为像素，<0 为对话框单位）。也设置下拉列表的最小宽度。
- **列 7**：垂直显示的最大项目数（一个滚动页面）。

**其他行 - 列表项目：**

- **列 0**：项目文本。
- **列 1**：图像列表中的项目图像索引。如果为空或 -1，无图像。
  - 如果未使用图像列表，此列可用于其他用途，例如作为项目 ID。
- **列 2**：项目[标志](IDP_FLAGS.md)：
  - 1：勾选。
  - 2：无复选框。项目可选择（如果未禁用）。
  - 4：禁用（不可选择）。
  - 8：粗体字体。例如，标题项目可使用标志 0xE（无复选框、禁用、粗体）。
  - 32：分组。勾选该项目会取消相邻项目的此标志。
- **列 3**：项目提示文本。
- **列 4**：项目文本[颜色](IDP_COLOR.md)，格式为 0xBBGGRR。
- **列 5**：项目背景颜色，格式为 0xBBGGRR。
- **列 6**：项目缩进。
- **列 7**：项目数据。用于 CB_GETITEMDATA 和 CB_SETITEMDATA 的整数。如果不使用这些消息，可为任意文本，控件不使用。

必须是有效的 [CSV](IDP_ICSV.md) 字符串。如果单元格文本包含特殊字符（逗号、双引号、换行），必须用双引号括起来，文本中的双引号需替换为两个双引号。运行时创建有效 CSV 可使用 [ICsv](IDP_ICSV.md) 变量。

在数字单元格中，可使用十进制数、十六进制数（例如 "0xE"）或带 | 运算符的表达式（例如 "1|4|0x300"）。

列表项目在 CSV 中是可选的。例如，可仅设置控件属性。可以在处理 CBN_DROPDOWN 通知时添加项目。如果在 CBN_DROPDOWN 时不添加项目，控件不会显示下拉列表。可以在 CBN_DROPDOWN 时调用 `ShowDropdownList`、显示消息框、弹出菜单等，或不做任何操作；但为此目的，建议使用 `QM_Edit` 控件。

在对话框过程中设置控件数据，可使用 `DT_SetControl`、 `CB_Add` 或 CB_INSERTITEM 消息。`str.setwintext` 设置可编辑控件文本。

### 如何获取控件数据

当 `ShowDialog` 在 OK 时返回，对话框控件变量包含的字符串格式取决于控件样式和标志。

**默认格式：**
- 如果控件可编辑：控件文本。
- 如果控件不带复选框：选中项目索引（无选中为 -1）。使用 [val](IDP_VAL.md) 转换为 int。
- 如果带复选框：
  - 如果使用控件标志 2：32 位数字（见上文）。使用 [val](IDP_VAL.md) 转换为 int。
  - 否则：由 '1'（勾选项目）和 '0'（未勾选项目）组成的字符串。例如，三个项目中仅第一个勾选，返回 "100"。

**如果使用控件标志 0x100**，返回初始 CSV 字符串（可用 [ICsv](IDP_ICSV.md) 解析），根据用户选择修改：
- 如果控件不带复选框：
  - 如果控件只读：单元格 0 0 为选中项目索引（无选中为 -1）。
  - 如果可编辑：单元格 0 0 为选中项目索引后跟控件文本，如 "0 First item" 或 "-1 any text"。
- 如果带复选框：
  - 如果使用控件标志 2：单元格 0 0 为 32 位数字。
  - 否则：勾选项目的项目标志（列 2）包含标志 1；勾选状态变化的项目包含标志 0x80。

在对话框过程中获取控件数据，可使用 `DT_GetControl`。`str.getwintext` 获取控件文本。

### 样式、消息和通知

控件基于标准 ComboBox 控件（除下拉列表部分外），支持其主要功能。

**支持的 ComboBox 样式：**
CBS_DROPDOWN（可编辑）、CBS_DROPDOWNLIST（只读）、CBS_SORT、CBS_AUTOHSCROLL、CBS_LOWERCASE、CBS_UPPERCASE。不可为 CBS_SIMPLE 或 owner-draw。

**支持的 ComboBox 消息：**
CB_GETDROPPEDSTATE、CB_ADDSTRING、CB_INSERTSTRING、CB_DELETESTRING、CB_RESETCONTENT、CB_GETCOUNT、CB_GETCURSEL、CB_GETITEMDATA、CB_SETITEMDATA、CB_GETLBTEXT、CB_GETLBTEXTLEN、CB_SHOWDROPDOWN、CB_GETCOMBOBOXINFO、CB_GETCUEBANNER、CB_GETEDITSEL、CB_LIMITTEXT、CB_SETCUEBANNER、CB_SETEDITSEL。

控件支持 QM CB_ 函数（`CB_SelectedItem` 等），这些函数发送上述消息。

**部分支持的 ComboBox 消息：**
CB_GETITEMHEIGHT、CB_SETITEMHEIGHT（仅当 wParam 为 -1）。修改列表的消息在下拉列表显示时失败并返回 -1。CB_GETDROPPEDWIDTH 和 CB_SETDROPPEDWIDTH 不支持，但可在 CSV 中指定自动宽度（列 6，标志 0x40）。

**其他消息：**
- LB_SETSEL：设置项目勾选状态。
- LB_GETSEL：获取项目勾选状态。

**支持的 ComboBox 通知：**
CBN_CLOSEUP、CBN_DROPDOWN、CBN_EDITCHANGE、CBN_EDITUPDATE、CBN_KILLFOCUS、CBN_SELCHANGE、CBN_SELENDCANCEL、CBN_SELENDOK、CBN_SETFOCUS。

**其他通知：**
控件通过 WM_NOTIFY 消息发送其他通知，lParam 为 `NMQMCB` 变量地址。其第一个成员 `hdr` 为 `NMHDR` 类型（见 MSDN）。其他成员值取决于通知代码（hdr.code）。

```qm
type NMQMCB NMHDR'hdr IQmDropdown'dd itemIndex itemState
```

**通知代码：**
- 1：用户在下拉列表中勾选或取消勾选复选框。使用 LB_SETSEL 或 `dd.Check` 时不发送此通知。`NMQMCB` 变量成员：
  - **itemIndex**：项目索引。
  - **itemState**：1 表示勾选，0 表示未勾选。
  - **dd**：[IQmDropdown](IDP_QMCOMBOBOX.md#iqmdropdown) 变量，可调用 `dd.Check`、`dd.IsChecked` 等。

### 其他功能

- **增量搜索**：当下拉列表显示时，用户更改可编辑控件文本，控件会高亮文本以用户输入开头或包含用户输入的第一个项目。使用 Enter 或 Tab 选择。仅在不带复选框时有效。
- **快速添加**：比标准 ComboBox 添加大量项目更快。
- **裁剪提示**：对裁剪项目显示 "..." 和信息提示。
- **键盘和鼠标快捷键**：
  - Down/Up/PgDn/PgUp：显示下拉列表。
  - 中键点击：清除可编辑控件文本。
- **下拉列表键盘快捷键**：
  - Down/Up/PgDn/PgUp：高亮项目。
  - 空格键：切换高亮项目的勾选状态。
  - Enter 或 Tab：选择高亮的可选项目并关闭下拉列表，应用新的复选框状态。
  - Esc 或 Alt：关闭列表而不选择。如果无可选项目，应用新的复选框状态。

---

## <a name="qm_edit"></a>QM_Edit 控件

`QM_Edit` 控件是带有一个或两个按钮的 Edit 控件。

- 默认情况下，控件有一个箭头按钮，类似 ComboBox 控件。按下时，控件向父对话框发送 `CBN_DROPDOWN` 命令消息。对话框过程可显示下拉列表或执行其他操作，并根据需要设置控件文本。控件本身不显示下拉列表等。
- 控件还可有一个用户按钮。点击时，控件向父对话框发送 `BN_CLICKED` 命令消息。对话框过程可执行操作，例如显示“打开文件”对话框并设置控件文本。

在[对话框编辑器](IDH_DIALOG_EDITOR.md)中添加 `QM_Edit` 控件。使用对话框编辑器创建的对话框变量在 [ShowDialog](IDH_DIALOG_EDITOR.md) 前后设置/获取控件文本。在对话框过程中，可使用 `str.setwintext`/`str.getwintext` 或 `DT_SetControl`/`DT_GetControl` 设置/获取控件文本。

控件支持所有 Edit 控件样式、消息和通知。

**特定于 QM_Edit 控件的消息：**

- **QMEM_SETBUTTON**：添加/移除按钮并设置用户按钮图像（16x16 像素）。
  - **wParam**：[标志](IDP_FLAGS.md)：
    - 0, 1, 2 用于设置用户按钮图像：
      - 0：`lParam` 为图标文件路径或[资源](IDP_RESOURCES.md)名称，可为 0。
      - 1：`lParam` 为图标句柄，控件会复制图标。
      - 2：`lParam` 为图像列表句柄，`flags` 高位字为图像索引，使用 `MakeInt(flags index)`。控件会复制图像。
    - 0x100：不移除箭头按钮，控件将同时具有两个按钮。
    - 0x200：移除用户按钮。
  - **lParam**：取决于 `wParam`。如果为 0，控件绘制“打开文件夹”图像。

**特定于 QM_Edit 控件的 WM_COMMAND 通知：**

- **CBN_DROPDOWN**：用户按下箭头按钮或 Down/Up/PgDn/PgUp 键。对话框过程可显示下拉列表或执行其他操作。
- **BN_CLICKED**：用户点击用户按钮或按 Enter（如果窗口可用）或 Alt+Enter。

**键盘和鼠标快捷键：**

- Down/Up/PgDn/PgUp：生成 `CBN_DROPDOWN` 通知，类似按下箭头按钮。多行控件需 Alt 键。
- Enter：生成 `BN_CLICKED` 通知，类似点击用户按钮。如果控件为多行或 Enter 关闭父窗口，需 Alt 键。
- 中键点击：清除文本。

**替换现有 Edit 控件为 QM_Edit 控件：**

- 在对话框定义中将 Edit 替换为 QM_Edit。
- 添加代码处理通知（`CBN_DROPDOWN` 或/和 `BN_CLICKED`）。
- 可选地在 `WM_INITDIALOG` 下设置按钮图像等（`QMEM_SETBUTTON`）。
- 无需更多更改，因为 `QM_Edit` 控件功能与 Edit 控件类似，仅增加按钮。

**创建多行控件：**
添加样式 `ES_MULTILINE`、`ES_WANTRETURN`、`ES_AUTOVSCROLL`、`WS_VSCROLL` 和 `WS_EX_LEFTSCROLLBAR`。如需换行，移除 `ES_AUTOHSCROLL`。

### 示例

```qm
\Dialog_Editor

str dd=
 BEGIN DIALOG
 0 "" 0x90C80AC8 0x0 0 0 224 136 "Dialog"
 3 QM_Edit 0x56030080 0x200 8 8 96 12 ""
 4 QM_Edit 0x56030080 0x200 8 28 208 12 ""
 1 Button 0x54030001 0x0 168 116 48 14 "OK"
 END DIALOG
 DIALOG EDITOR: "" 0x2040300 "*" "" "" ""

str controls = "3 4"
str qme3 qme4
qme3="zero"
if(!ShowDialog(dd &sub.DlgProc &controls _hwndqm)) ret
out qme3
out qme4

#sub DlgProc
function# hDlg message wParam lParam

sel message
    case WM_INITDIALOG
        SendDlgItemMessage hDlg 4 QMEM_SETBUTTON 0 0  ;;添加用户按钮“打开文件夹”并移除箭头
        SendDlgItemMessage hDlg 4 EM_SETCUEBANNER 0 @" File"
        
    case WM_COMMAND goto messages2
ret
 messages2
sel wParam
    case CBN_DROPDOWN<<16|3  ;;按下箭头按钮
     显示下拉列表，类似 ComboBox
    lpstr o=":5 $qm$\il_qm.bmp"
    str s=F"0,{o}[]zero,1[]one,2[]two,28"
    ICsv x._create; x.FromString(s)
    int i R=ShowDropdownList(x i 0 1 lParam)
    if(R&QMDDRET_SELOK=0) ret
    s=x.Cell(i+1 0); s.setwintext(lParam)
    
    case 4  ;;点击用户按钮 (BN_CLICKED)
    str sFile
    if(OpenSaveDialog(0 sFile)) sFile.setwintext(lParam)
ret 1
```

---

## <a name="iqmdropdown"></a>IQmDropdown 接口

在回调、通知等中可使用，控制显示中的下拉列表。

```qm
interface# IQmDropdown :IUnknown
    Check(i flags)
    #IsChecked(i)
    #Select(i [flags])
    Close([flags])
    Update(iFirst [iLast] [flags])
    [g]#Hwnd()
    [g]#HwndLV()
    [g]#SelectedItem()
    [g]ARRAY(byte)ItemStates()
    [g]ICsv'Csv()
    {A461B246-3C33-4398-915B-0B834A60A670}
```

### 方法

#### **Check(i flags)**

更改项目 `i` 的复选框状态。

**返回**：1 表示成功，0 表示 `i` 无效或项目非复选框。

**flags**：
- 0：取消勾选
- 1：勾选
- 2：切换
- 0x100：不调用 `cbFunc`

#### **#IsChecked(i)**

返回 1（项目 `i` 勾选）或 0（未勾选）。

#### **#Select(i [flags])**

高亮项目 `i`。

**返回**：新选中的项目索引。

**flags**：
- 1：不确保可见
- 2：跳过向下禁用项目
- 4：跳过向上禁用项目

如果 `i` 无效（例如 -1）或项目禁用（未使用标志 2 或 4），移除选择并返回 -1。不关闭窗口，需调用 `Close`。

#### **Close([flags])**

关闭下拉列表窗口。

**flags**：
- 1：确认关闭（类似用户点击可选项目或按 Enter/Tab）。

#### **Update(iFirst [iLast] [flags])**

重绘一个或多个列表项目。

调用此函数以应用通过 `Csv` 获取的 `csv` 中项目属性的更改。

- **iFirst**：要更新的第一个项目的 0 基索引。
- **iLast**：要更新的最后一个项目的 0 基索引。如果省略或 <= `iFirst`，仅更新 `iFirst`。
- **flags**：1 表示 `csv` 中项目标志（第三列）已更改。如果更改其他列（颜色、文本等），无需此标志。

#### **[g]#Hwnd()**

获取下拉窗口句柄（顶级窗口）。

#### **[g]#HwndLV()**

获取列表视图控件句柄（子窗口）。

#### **[g]#SelectedItem()**

获取当前高亮项目索引或 -1。

#### **[g]ARRAY(byte)ItemStates()**

获取项目勾选状态和其他状态/样式的数组。元素包含传递给 `ShowDropdownList` 的 `csv`（或 `QM_ComboBox` 的 CSV 字符串）的项目标志，更新标志：1 表示勾选，0x80 表示勾选状态变化。

#### **[g]ICsv'Csv()**

获取传递给 `ShowDropdownList` 的 `csv` 变量（或从 `QM_ComboBox` 的 CSV 字符串创建的 `ICsv` 变量）。可修改项目文本、图标、提示、颜色和缩进：修改 `csv` 中的项目单元格并调用 `Update`。可添加更多列，但不要添加/移除行或修改首行（控件属性）。

---

## <a name="exe"></a>在 EXE 中使用

所有这些函数、接口和控件也可在[EXE](IDH_MAKEEXE.md)中使用。它们位于 QM 的 `qmgrid.dll` 中，在未安装 QM 的计算机上不可用。

在 EXE 代码开头添加以下行，将 `qmgrid.dll` 添加到 EXE：

```qm
ExeQmGridDll
```

创建 EXE 时，它将 `qmgrid.dll` 添加到 EXE 资源。运行时，它会提取到临时文件夹并加载。

如果不想将 DLL 添加到 EXE：
- 从 QM 文件夹中获取 `qmgrid.dll`，与 EXE 一起添加到 ZIP 文件或安装程序，在其他计算机上提取到同一文件夹。
- 如果在对话框或 `CreateControl` 中使用控件，EXE 会在需要时加载 DLL，否则可使用 `LoadLibrary` 加载。

可将图像列表和图标文件添加到 EXE 资源。在“Make Exe”对话框中选中“Auto add files...”，在宏中为文件路径添加唯一资源 ID，如 ":5 $my qm$\imagelist.bmp"。或者使用[宏资源](IDP_RESOURCES.md)。在 Resources 对话框中导入文件，创建资源字符串，如 "resource:<macro5>image:imagelist" 或 "image:imagelist"。文件/资源名称必须在单独变量中（见示例），而非直接在 CSV 字符串中。如果不想将文件添加到 EXE，确保它们在 EXE 运行的计算机上可用。

### 示例

```qm
str imagelist=":5 $qm$\il_qm.bmp"  ;;5 是资源 ID，可为 1-0xffff
str csv=
F
 ,{imagelist}
 one,1
 two,2
 three
```