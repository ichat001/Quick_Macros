# 查找子窗口（获取句柄）或比较属性

## 语法

### 语法 1 - 指定子窗口
```
int child(text [class] [window] [flags] [propCSV] [matchindex|array])
int childtest(hwnd text [class] [window] [flags] [propCSV])
```
**注**：QM 2.3.4 前使用以下语法（现已废弃，推荐使用 `propCSV`）：
```
int child(text [class] [window] [flags] [x y] [matchindex|array])
int childtest(hwnd text [class] [window] [flags] [x y])
```
或带控件 ID：
```
int child(id [text] [class] [window] [flags] [x y] [matchindex|array])
int childtest(hwnd id [text] [class] [window] [flags] [x y])
```

### 语法 2 - 从点获取子窗口
```
int child(x y [window] [flags2])
int childtest(hwnd x y [window] [flags2])
```

### 语法 3 - 从鼠标位置获取子窗口
```
int child(mouse) [flags2]
int childtest(hwnd mouse) [flags2]
```

### 语法 4 - 从可访问对象获取子窗口
```
int child(acc)
int childtest(hwnd acc)
```

### 语法 5 - 获取焦点子窗口
```
int child
```

## 参数
- **text** - 子窗口文本。
  - 默认可为部分文本，区分大小写。
  - 下划线字符需前缀 `&`。
  - 空字符串 ("") 匹配任意文本。
- **class** - 子窗口类名。
  - 需完整或含通配符 (*?)，不区分大小写（QM 2.3.4 前需标志 0x800 使用通配符）。
  - 默认：""（任意）。
  - 可在 QM 状态栏查看类名。
- **window** - [父窗口](../Other/IDP_WINDOWEXPRESSION.md)。
  - 若省略或为 ""，使用活动窗口。
  - 仅搜索首个匹配的窗口。
- **flags**：
  | 值 | 描述 |
  |----|------|
  | 1 | **text** 为完整文本或含[通配符](IDP_MATCHW.md) (*?)，"*" 匹配无文本窗口。 |
  | 2 | **text** 不区分大小写。 |
  | 4 | 使用替代方法获取文本，适用于 Edit 等控件获取错误文本时。 |
  | 16 | 仅搜索直接子窗口，否则搜索所有子窗口及其后代。 |
  | 0x200 | **text** 为[正则表达式](../RegExp/IDP_PCRE.html)。 |
  | 0x400 | 要求子窗口可见。 |
- **propCSV** - 其他属性列表，格式为 [CSV](../User/IDP_ICSV.html) 字符串 `"name1=value1[]name2=value2[]..."`，分隔符为 `=`，默认：""。
  | 名称 | 值 |
  |------|------|
  | id | 控件 [id](IDP_ID.md)。 |
  | accName | 可访问对象的 Name 属性，需完整或含通配符，不区分大小写，适用于从旁边的 Static 控件获取名称的控件。 |
  | wfName | Windows Forms (.NET) 控件名称，需完整或含通配符，不区分大小写，适用于类名形如 "WindowsForms10.xxx.xxx" 的控件（不要用 id，非固定值，可在 QM 状态栏查看或录制）。 |
  | xy | 子窗口须包含的窗口客户区[坐标](../Other/IDP_PIXELS.html)，如 `"xy=100 50"` 或 `"xy=0.9 0.1"`（靠近右上角）。 |
  | callback | [回调函数地址](../Other/IDP_ENUMWIN.html)，可选后接传递值，如 `F"callback={&Function} {aValue}"`。 |
  | 其他 | 支持 style、exStyle、cClass、cText、cId、cFlags、GetProp，与 [win](IDP_WIN.md) 相同。 |
- **matchindex** - （QM 2.2.0）基于 1 的匹配子窗口索引，用于区分父窗口中多个匹配的子窗口（基于 **text**、**class** 等）。
- **array** - （QM 2.2.1）`ARRAY(int)` 类型变量，接收所有匹配子窗口的句柄。
- **x y** - 父窗口或屏幕（若 **window** 为 0 或使用标志 32）的[点坐标](../Other/IDP_PIXELS.html)，子窗口须包含该点（已废弃，推荐使用 `propCSV` 的 `xy`）。
- **flags2**（语法 2 和 3）：
  | 值 | 描述 |
  |----|------|
  | 1 | QM 2.3.4：若无子窗口，获取顶级窗口（仅语法 3 支持）。 |
  | 8 | **x y** 为窗口客户区坐标。 |
  | 16 | 仅获取直接子窗口。 |
  | 32 | **x y** 为屏幕坐标。 |
  | 8\|32 | **x y** 为工作区坐标。 |
- **mouse** - 字面值 `mouse`，表示鼠标指针位置。
- **acc** - [可访问对象](IDP_ACC.md)，`Acc` 或 `IAccessible` 类型变量。
- **hwnd** - (`childtest`) 要测试的子窗口句柄。

### 已废弃参数（QM 2.3.4 前）
- **x y** - 多用途，取决于标志，默认子窗口须包含该点。
- **flags**（额外标志）：
  | 值 | 描述 |
  |----|------|
  | 8 | **x y** 为窗口客户区坐标。 |
  | 32 | **x y** 为屏幕坐标。 |
  | 8\|32 | **x y** 为工作区坐标。 |
  | 128 | **x** 为样式。 |
  | 0x100 | **y** 为扩展样式。 |
  | 0x8000 | **x y** 指定回调函数地址及传递值。 |

## 备注
- 查找指定窗口中的[子窗口（控件）](../Other/IDP_WINDOWSTYLES.html)，返回其句柄，未找到返回 0。若父窗口不存在，报错。
- **语法 1**：查找文本及其他属性匹配的子窗口。
- **语法 2**：从父窗口中的指定点获取子窗口句柄。若 **window** 省略或为 ""，使用活动窗口；若为字面值 0，父窗口可为任意窗口（**x y** 为屏幕坐标）。
- **语法 3**：从鼠标指针位置获取子窗口句柄（除不可见窗口）。
- **语法 4**：获取匹配或包含可访问对象 **acc** 的子窗口或顶级窗口句柄。
- **语法 5**：获取具有焦点的子窗口句柄。若需当前线程的焦点窗口，使用 `GetFocus`。
- `childtest` 比较子窗口 (**hwnd**) 属性，返回 1（匹配）或 0（不匹配）。若省略 **window** 或为字面值 0，不比较父窗口。

**另见**：[id](IDP_ID.md)、[acc](IDP_ACC.md)、[htm](IDP_HTM.md)、[WinTest](../User/IDP_QMDLL.html#WinTest)

## 示例
```cpp
act child("Hex" "Button" "Calculator")
if child("The text*" "Static" "Notepad" 1)
	bee
int h = child(100 100 "Notepad")
h = child(mouse)
if(childtest(h "OK" "Button")) but h
```