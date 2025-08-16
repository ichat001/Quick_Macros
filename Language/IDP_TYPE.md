# 定义变量类型

## 语法（简化版）
```
type typename members
```

成员可在一行或多行定义：
```
type typename
	 member1
	 member2
	 ...
```

- 代替 `type` 关键字，可使用 [class](IDP_CLASSES.html) 或 [category](IDP_CATEGORIES.html)。

## 参数
- **typename** - 新类型的[名称](../Other/IDP_IDENTIFIERS.html)。
- **members** - 成员列表：
  - 成员语法：`[membertype]membername`
  - `int` 类型成员可省略 `membertype`。

## 备注
- QM 提供 7 种内置[变量](IDH_VARIABLES.html)类型：`int`、`byte`、`word`、`long`、`double`、`lpstr`、`str`，以及 [7 种 OLE 类型和其他类型](../_COM/IDP_OLETYPES.html)。通过 `type` 语句可组合多种类型创建用户定义类型（也称结构或记录），用于存储多个相关信息。定义后，可像内置类型一样使用 `typename` 创建变量，类型定义在 QM 退出或打开其他文件前有效。
- 用户定义类型可包含任意类型的成员变量，包括其他用户定义类型。
- 支持嵌入一维数组，元素数量需在成员名后用方括号指定：`[membertype]membername[numelem]`。嵌入字符串（非 `lpstr` 或 `str`）需声明为字节数组，无法直接用作 `lpstr` 或指针，需用 `&` 运算符获取数组地址并赋给 `lpstr` 或指针变量。示例：`lpstr s = &var.array`。数组名不带 `[]` 时表示首元素。
- 支持非标准成员对齐、成员偏移（如定义联合）和类型内匿名类型，详见 [unions](IDP_UNIONS.html)。
- 支持基类型（[继承](IDP_CLASSES.html)）。
- 可添加全局标识符，常用于定义 [category](IDP_CATEGORIES.html)。语法：
  ```
  type typename [members] [: globals]
  ```
- 用户定义类型可定义在[引用文件](../QM_Help/IDH_SETT_FILES.html)或[类型库](../_COM/IDP_TYPELIB.html)中，无需显式定义即可使用。许多声明在 `WINAPI` 和 `WINAPIV` 引用文件中。使用示例：
  ```cpp
  WINAPI.PARAFORMAT p
  ```
- 部分 Windows 类型默认定义，部分由 QM 定义（见 [OLE 类型](../_COM/IDP_OLETYPES.html)），其他在 System\Declarations 文件夹。
- 某些 Windows 类型并非用户定义类型，而是其他类型或指针的别名。例如，句柄类型（`HWND`、`HANDLE`、`HMODULE`、`HICON` 等）在 QM 中用 `int`，指针类型（通常为 `LPTYPENAME`）用 `TYPENAME*`，字符串类型（`LPSTR` 等）用 `lpstr`。
- （QM 2.3.0）支持注释，需以 `;;` 开头，注释行可单独存在。见示例。

**另见**：[使用](IDP_TYPEUSAGE.html)、[联合](IDP_UNIONS.html)、[类](IDP_CLASSES.html)、[类别](IDP_CATEGORIES.html)、[声明](IDP_DECLARATION.html)、[作用域](../Other/IDP_IDENTIFIERS.html)

## 示例
```cpp
type RECT left top right bottom
type PAINTSTRUCT hdc fErase RECT'rcPaint fRestore fIncUpdate !r[32]
type MY @w !b ~s i[4] ~*sp RECT*rp[10]
type MY2 word'w byte'b str's int'i[4] str*sp RECT*rp[10]
type MY3 ;; 与上例相同，但使用多行定义
	word'w byte'b str's ;; 等同于 @w !b ~s
	int'i[4] ;; 嵌入数组
	str*sp ;; 指针
	RECT*rp[10] ;; 嵌入指针数组（10 个指针）
type ARR2 ARRAY(str)a ARRAY(int)b
```