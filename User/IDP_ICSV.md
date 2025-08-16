# ICsv 接口

## 概述

`ICsv` 接口用于处理 [CSV](IDP_CSV.html) 文件和 CSV 格式字符串，支持解析 CSV、内存中管理二维表格、从表格生成 CSV。**添加于 QM 2.3.0**。

### CSV 格式
- **描述**：简单的文本格式，用于存储表格。行由换行符分隔，单元格由逗号分隔。包含换行符、逗号或双引号的值需用双引号括起，双引号需双写，逗号和换行符周围的空格被忽略。
- **示例**：
  ```csv
  value1,value2, value3
  11,22,33
  "value, with, commas","value with ""quotes""","multiline
  value"
  ,,
  ,rows with empty values,
  ,,
  ```
- **用途**：受 Microsoft Excel 等程序支持，适合数据交换。相比 [XML](IDP_IXML.html)，CSV 解析/生成更快，占用空间更少，通常更适合表格存储。
- **替代方式**：可用 `Database` 类操作 CSV 文件，但速度较慢。
- **更多信息**：可在线搜索 CSV 相关资料。

### 使用方法
声明 `ICsv` 变量并调用 `_create` 或 `CreateCsv`，然后使用 `ICsv` 接口函数。

## 示例

### 示例 1：操作 CSV 字符串
```qm
; CSV 字符串用于测试
str csv=
 A1, B1, C1
 A2, B2, C2

; 创建 ICsv 变量并加载数据
ICsv x._create
x.FromString(csv)

; 获取单元格
str cell
cell=x.Cell(1 1)
out F"cell 1 1 was: {cell}"

; 修改单元格
cell="Changed"
x.Cell(1 1)=cell

; 获取 CSV 数据到字符串
x.ToString(csv)

; 输出结果
out "changed CSV:"
out csv
```

### 示例 2：操作 CSV 文件
```qm
; 创建 ICsv 变量，设置分隔符并从文件加载数据
str s
ICsv v._create
v.Separator=";"
v.FromFile("$my qm$\test.csv")

; 遍历行和列
int nr=v.RowCount
int nc=v.ColumnCount
int r c
for r 0 nr ;; 遍历每行
    out "--- row %i ---" r
    for c 0 nc ;; 遍历每列
        s=v.Cell(r c)
        out s

; 显示 CSV
v.ToString(s); out s

; 保存到文件
v.ToFile("$my qm$\test.csv")
```

### 示例 3：添加行
参见 [AddRow 示例](#example_addrow)。

## 创建 ICsv 对象
- **使用 `_create`**：`ICsv x._create`（默认逗号分隔）。
- **使用 `CreateCsv`**（**QM 2.3.0**，2.3.4 前不可用 `_create`）：
  ```qm
  ICsv CreateCsv [flags] ;; flags: 1 使用逗号分隔
  ```
  - **flags**（**QM 2.3.2**）：
    - `1`：使用逗号分隔（等同于 `var.Separator=","`）。
    - 未使用 `1` 时，默认分隔符为控制面板中设置的分隔符（与 `_create` 默认逗号不同）。
  - **示例**：`ICsv x=CreateCsv(1)`

## ICsv 成员函数

成员函数调用格式：`variable.Function(arguments)`。以下为函数声明及说明，非直接调用示例。

---

### Separator
```qm
[p]Separator($sep)
[g]$Separator()
```
- **功能**：设置或获取（**QM 2.3.2**）解析和生成 CSV 时的分隔符。
- **参数**：
  - `sep`：分隔符字符串。若为空（`""`），使用控制面板 -> 区域和语言选项 -> 自定义 -> 列表分隔符。
- **备注**：
  - 默认：`_create` 使用逗号，`CreateCsv`（无标志 `1`）使用控制面板设置。
  - Excel 打开/保存 CSV 文件时也使用控制面板分隔符。
- **示例**：`v.Separator=";"`

---

### FromString
```qm
FromString($s)
```
- **功能**：解析 CSV 字符串并在内存中创建表格，由 `ICsv` 变量管理。
- **参数**：`s` - CSV 字符串。
- **错误**：若 CSV 字符串格式错误或分隔符不匹配，抛出错误。

---

### ToString
```qm
ToString(str&so)
```
- **功能**：从内存表格生成 CSV 字符串并存储到 `str` 变量。
- **参数**：`so` - 存储结果的 `str` 变量。

---

### FromFile
```qm
FromFile($file)
```
- **功能**：解析 CSV 文件并在内存中创建表格。
- **参数**：`file` - 文件路径，支持 [宏资源](IDP_RESOURCES.html)（**QM 2.4.1**）和 [exe 资源](IDH_MAKEEXE.html)。
- **错误**：若文件格式错误或分隔符不匹配，抛出错误。

---

### ToFile
```qm
ToFile($file [flags]) ;; flags: 1 append, 0x100 safe, 0x200 safe+backup
```
- **功能**：将内存表格保存为 CSV 文件。
- **参数**：
  - `file` - 文件路径。
  - `flags`：
    - `1`：追加模式。
    - `0x100`（**QM 2.4.0**）：安全保存，写入临时文件并在完成后再重命名，防止断电等导致文件损坏。
    - `0x200`（**QM 2.4.0**）：安全保存并备份，生成备份文件（`file-backup`）。
- **备注**：**QM 2.3.5** 开始，若父文件夹不存在会自动创建。

---

### FromArray
```qm
FromArray(ARRAY(str)&a)
```
- **功能**：从二维 `str` 数组创建内存表格。
- **参数**：`a` - 二维 `str` 数组（第一维为列，第二维为行）。
- **备注**：**QM 2.3.4** 新增。

---

### ToArray
```qm
ToArray(ARRAY(str)&a)
```
- **功能**：将内存表格转换为二维 `str` 数组。
- **参数**：`a` - 存储结果的二维 `str` 数组（第一维为列，第二维为行）。
- **备注**：**QM 2.3.4** 新增。

---

### FromQmGrid
```qm
FromQmGrid(hwnd [flags]) ;; flags: 1 no first column, 2 no empty rows, 4 selected, 8 remove <...>
```
- **功能**：从 [QM_Grid](IDP_QMGRID.html) 控件获取单元格并创建内存表格。
- **参数**：
  - `hwnd` - 控件句柄。
  - `flags`：
    - `1`：不获取第一列。
    - `2`：不获取空行。
    - `4`（**QM 2.3.2**）：仅获取选中或勾选的行（取决于控件样式）。
    - `8`（**QM 2.3.4**）：移除第一列中用于设置行类型的 `<...>`。
- **备注**：不更改 `Separator` 和 `RowDataSize`。

---

### ToQmGrid
```qm
ToQmGrid(hwnd [flags]) ;; flags: 1 only first column, 2 no first column
```
- **功能**：填充 [QM_Grid](IDP_QMGRID.html) 控件。
- **参数**：
  - `hwnd` - 控件句柄。
  - `flags`：
    - `1`：仅填充第一列（CSV 表格需含 1 列，控件可含 1 或多列）。
    - `2`：除第一列外填充（控件需已有第一列单元格，CSV 表格需含控件列数-1）。
    - 无标志：CSV 表格需含控件列数。
- **备注**：若使用 `2`，控件不被清除，需已有第一列单元格。

---

### Clear
```qm
Clear()
```
- **功能**：删除所有行，并将 `ColumnCount` 设为 0。
- **备注**：不更改 `Separator` 和 `RowDataSize`。

---

### RowCount / ColumnCount
```qm
[g]#RowCount()
[g]#ColumnCount()
[p]ColumnCount(count)
```
- **功能**：获取行数或列数，`ColumnCount`（**QM 2.3.2**）也可设置列数。
- **参数**：`count` - 要设置的列数。

---

### Cell
```qm
[g]$Cell(row col)
[p]Cell(row col $value)
```
- **功能**：获取或设置单元格值。
- **参数**：
  - `row` - 0-based 行索引。
  - `col` - 0-based 列索引。
  - `value` - 单元格文本。
- **备注**：
  - “获取”函数返回的字符串为临时，表格修改后失效，需赋给 `str` 变量保存。
  - **QM 2.4.3**：可设置不存在的单元格，若 `col` 超过列数会增加列，若 `row` 等于行数或负数会添加新行（旧版本会报错）。

---

### CellInt / CellHex
```qm
[g]#CellInt(row col)
[p]CellInt(row col value)
[p]CellHex(row col value)
```
- **功能**：获取或设置单元格值，字符串与数字间转换。
- **参数**：
  - `row` - 0-based 行索引。
  - `col` - 0-based 列索引。
  - `value` - 整数值。
- **说明**：
  - “获取”：将单元格文本转换为 `int`，支持十进制或十六进制，含 `|` 的文本返回总和（如 `"1|2|0x4"` 返回 7）。若文本为空或非数字开头，设置 [_hresult](IDP_SPECVAR.html)=1 并返回 0。
  - “设置”：
    - `CellInt`：将 `value` 转换为十进制字符串（如 `"10"`）。
    - `CellHex`：将 `value` 转换为十六进制字符串（如 `"0xA"`）。
- **备注**：**QM 2.4.3** 新增。
- **示例**：
  ```qm
  ICsv x._create
  x.FromString("one,1[]two,2")
  int i=5

  x.CellInt(0 1)=i ;; 等同于 x.Cell(0 1)=F"{i}"
  out x.Cell(0 1) ;; "5"

  x.CellHex(0 1)=i ;; 等同于 x.Cell(0 1)=F"0x{i}"
  out x.Cell(0 1) ;; "0x5"

  i=x.CellInt(0 1) ;; 等同于 i=val(x.Cell(0 1))
  if(_hresult) out "not a number"; else out i
  ```

---

### RemoveRow
```qm
RemoveRow(row)
```
- **功能**：删除指定行。
- **参数**：`row` - 0-based 行索引。

---

### AddRowMS / AddRowLA / AddRowSA
```qm
#AddRowMS(row [nCells] [$cells] [firstCell])
#AddRowLA(row [nCells] [lpstr*cells] [firstCell])
#AddRowSA(row [nCells] [str*cells] [firstCell])
```
- **功能**：添加或插入新行，参见 [AddRow1](#addrow1)、[AddRow2](#addrow2)、[AddRow3](#addrow3)、[AddRowCSV](#addrowcsv)。
- **参数**：
  - `row` - 0-based 行索引，插入位置，负数（如 -1）表示追加到末尾。
  - `nCells` - 添加的单元格数。
  - `cells` - 单元格值，格式依函数而异：
    - `AddRowMS`：`lpstr`，多字符串格式（以空字符分隔，如 `"string1[0]string2[0]string3[0]"`）。
    - `AddRowLA`：`lpstr*`，`lpstr` 数组首地址。
    - `AddRowSA`：`str*`，`str` 数组首地址。
  - `firstCell`（**QM 2.3.2**） - 0-based 列索引，插入单元格的起始位置。
- **备注**：
  - 若 `ColumnCount` 为 0，设为 `nCells+firstCell`。也可用 `ColumnCount` 预设列数。
  - 若省略 `cells` 或 `nCells` 为 0，添加 1 空行，可用 `Cell` 设置值。
  - 超出 `firstCell` 和 `nCells` 范围的单元格设为 `""`。
  - 若 `RowDataSize` 非 0，行数据填充为 0。
  - **QM 2.4.3**：若 `nCells+firstCell` 超过 `ColumnCount` 或 `nCells` 为 0 且 `ColumnCount` 为 0，自动增加列（旧版本会报错）。
- **示例**：
  ```qm
  out
  ICsv x._create
  x.ColumnCount=3

  ; 添加空行并使用 Cell
  int r=x.AddRowMS(-1)
  x.Cell(r 0)="c1"; x.Cell(r 1)="c2"; x.Cell(r 2)="c3"

  ; MS
  lpstr multistring="ms1[0]ms2[0]ms3"
  x.AddRowMS(-1 3 multistring)

  ; LA with array
  str st="a1 a2 a3"
  ARRAY(lpstr) a
  int nt=tok(st a 3 "" 1)
  x.AddRowLA(-1 nt &a[0])

  ; SA with array
  ARRAY(str) as="as1[]as2[]as3"
  x.AddRowSA(-1 as.len &as[0])

  ; LA with local variables
  lpstr s1("s1") s2("s1") s3("s1")
  x.AddRowLA(-1 3 &s1)

  ; SA with local variables
  str ss1("ss1") ss2("ss1") ss3("ss1")
  x.AddRowSA(-1 3 &ss1)

  ; 输出结果
  str s
  x.ToString(s)
  out s
  ```

---

### AddRow1 / AddRow2 / AddRow3
```qm
#AddRow1(row $s1)
#AddRow2(row $s1 [$s2])
#AddRow3(row $s1 [$s2] [$s3])
```
- **功能**：添加或插入含 1、2 或 3 个单元格的行，适合直接传递值而非数组。
- **参数**：
  - `row` - 0-based 行索引，插入位置，负数（如 -1）表示追加到末尾。
  - `s1, s2, s3` - 单元格文本。
- **备注**：
  - `AddRow2`：**QM 2.3.4** 新增。
  - `AddRow1`、`AddRow3`：**QM 2.4.3** 新增。

---

### AddRowCSV / ReplaceRowCSV
```qm
#AddRowCSV(row $s1)
#ReplaceRowCSV(row $s1 [$s2])
```
- **功能**：
  - `AddRowCSV`：添加或插入一行或多行，使用 CSV 字符串指定单元格，返回首个新行索引。
  - `ReplaceRowCSV`：替换一行或多行，使用 CSV 字符串指定单元格，返回首个替换行索引。
- **参数**：
  - `row` - 0-based 行索引，插入/替换位置，负数（如 -1）表示追加到末尾。
  - `s1, s2` - CSV 字符串，含一行或多行任意列数，需正确处理含逗号等的单元格（加引号）。
- **备注**：**QM 2.4.3** 新增。
- **示例**：
  ```qm
  ICsv x._create
  x.FromString("A,B[]C,D")
  out x.AddRowCSV(-1 "E,F")
  x.ToString(_s); out _s
  ```

---

### ReplaceRowMS / ReplaceRowLA / ReplaceRowSA
```qm
#ReplaceRowMS(row [nCells] [$cells] [firstCell])
#ReplaceRowLA(row [nCells] [lpstr*cells] [firstCell])
#ReplaceRowSA(row [nCells] [str*cells] [firstCell])
```
- **功能**：替换指定行的 `nCells` 个单元格，从 `firstCell` 开始，其他单元格不变。若 `row` 不存在，如 `AddRowX` 系列函数添加新行。
- **参数**：同 `AddRowMS/LA/SA`。
- **备注**：**QM 2.3.2** 新增，参见 [Cell](#cell)、[ReplaceRowCSV](#addrowcsv-replacerowcsv)。

---

### GetRowMS
```qm
GetRowMS(row str*cells)
```
- **功能**：将行所有单元格存储到 `str` 变量，格式为多字符串（以空字符分隔）。
- **参数**：
  - `row` - 0-based 行索引。
  - `cells` - 存储结果的 `str` 变量。
- **备注**：
  - **QM 2.3.2** 新增。
  - 可用于 `AddRowMS` 或 `ReplaceRowMS` 添加/替换行。

---

### MoveRow
```qm
MoveRow(row to)
```
- **功能**：移动行到指定索引。
- **参数**：
  - `row` - 要移动的行索引。
  - `to` - 目标行索引。
- **备注**：**QM 2.3.2** 新增。

---

### InsertColumn / RemoveColumn
```qm
InsertColumn(col)
RemoveColumn(col)
```
- **功能**：
  - `InsertColumn`：插入 1 个空列，若 `col` 无效（如 -1）则追加到末尾。
  - `RemoveColumn`：删除 1 列。
- **参数**：`col` - 0-based 列索引。
- **备注**：
  - **QM 2.3.2** 新增。
  - 可用 `ColumnCount` 替代添加或删除列。

---

### RowDataSize / RowData
```qm
[p]RowDataSize(nBytes)
[g]#RowDataSize()
[g]!*RowData(row)
```
- **功能**：
  - `RowDataSize`：设置或获取每行额外内存大小。
  - `RowData`：返回指定行额外内存的地址。
- **参数**：
  - `nBytes` - 额外内存字节数。
  - `row` - 0-based 行索引。
- **备注**：
  - **QM 2.3.2** 新增。
  - 用于在每行存储额外数据，仅存在内存中，简化基于 `ICsv` 的表格类开发。

---

### Sort
```qm
Sort(flags [col]) ;; flags: 0 simple, 1 insens, 2 ling, 3 ling/insens, 4 number/ling/insens, 128 date, 0x100 descending
```
- **功能**：按指定列的文本排序行。
- **参数**：
  - `flags`：
    - `0`：简单，区分大小写，使用 [StrCompare](IDP_QMDLL.html#StrCompare)。
    - `1`：简单，不区分大小写，使用 [StrCompare](IDP_QMDLL.html#StrCompare)。
    - `2`：语言，区分大小写，使用 [StrCmp](IDP_QMDLL.html#StrCmp)。
    - `3`：语言，不区分大小写，使用 [StrCmpI](IDP_QMDLL.html#StrCmpI)。
    - `4`：数字、语言、不区分大小写，使用 [StrCmpLogicalW](IDP_QMDLL.html#StrCmpLogicalW)，数字按值而非字符串比较。
    - `128`（**QM 2.3.3**）：日期。
    - `0x100`：降序排序。
  - `col` - 0-based 列索引。
- **备注**：**QM 2.3.2** 新增。

---

### Find
```qm
#Find($s [flags] [col] [startRow]) ;; flags: 1 insens, 2 wildcard, 4 beginning, 8 end, 16 middle, 32 rx
```
- **功能**：查找行，返回 0-based 行索引，未找到返回 -1。
- **参数**：
  - `s` - 查找的单元格文本。
  - `flags` - 比较方式：`1` 不区分大小写，`2` 通配符，`4` 开头匹配，`8` 结尾匹配，`16` 中间匹配，`32` 正则表达式。
  - `col` - 0-based 列索引。
  - `startRow`（**QM 2.4.3**） - 0-based 起始行索引。
- **备注**：**QM 2.3.4** 新增。

---

## 注意事项

- **`ICsv` 非线程安全**：勿在多线程中同时使用同一变量，可能损坏数据。多线程使用需使用 [lock](IDP_LOCK.html)。