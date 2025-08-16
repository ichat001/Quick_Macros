# 错误

**另见**：[编译和调试](../QM_Help/IDH_DEBUG.html)、[err](../Flow/IDP_ERR.html)、[#err](../Language/IDP_DIR_ERR.html)

## 编译时错误
编译时错误在[编译](../QM_Help/IDH_DEBUG.html)包含语法错误的宏时生成。宏在执行前编译，若存在语法错误则无法运行。首个语法错误会在 QM 输出中显示为“Error in Macro: 错误描述”。在[EXE](../QM_Help/IDH_MAKEEXE.html)中不生成编译时错误，因宏已预编译。

常见编译时错误及原因/解决方法：
- **unknown identifier（未知标识符）**：
  1. 未[声明变量](../Language/IDP_VARIABLES.html)或其他标识符，[声明](../Language/IDP_DECLARATION.html)需在使用前。
  2. 字符大小写不匹配，例如函数 `MyFunc` 错误写为 `Myfunc`。
  3. 字符串参数（如窗口标题、文件路径）未用 `""` 括起。
  4. 函数/类型等在当前 QM 版本不可用（可能是他人编写的宏），需升级 QM。
- **unexpected identifier（意外标识符）**：
  1. 此类标识符在此处不可用。
- **unexpected character（意外字符）**：
  1. 变量或其他标识符名称需由字母、数字、下划线组成，且不能以数字开头。
  2. 语法错误。
- **missing parts（缺少部分）**：
  1. 遗漏命令/函数等的参数或其他部分。
- **too many parts（过多部分）**：
  1. 字符串参数未用 `""` 括起。
  2. 同一行多语句后遗漏 `;`。
  3. 复杂函数参数表达式（如 `a.r[i].right-a.r[i].left`）需用括号括起。
- **missing ( after function name, or ; after statement（缺少函数名后的 ( 或语句后的 ;）**：
  1. 同上原因。
  2. 函数名后需紧跟 `(`，正确：`Func(...)`，错误：`Func (...)`。
- **else without if（无 if 的 else）**：
  1. `else` 的缩进（Tab 数）需与对应 `if` 匹配。
- **case without sel（无 sel 的 case）**：
  1. `case` 的缩进需比对应 `sel` 多一个 Tab。
- **expected numeric (or string) expression（预期数字/字符串表达式）**：
  1. 数字值处使用了字符串，或反之。
  2. 遗漏参数。
- **expected int, integer constant, etc（预期 int、整数常量等）**：
  1. 同上原因。
- **expected int*, etc（预期 int* 等）**：
  1. 需传递变量地址（如 `Function(&var)` 而非 `Function(var)`），变量类型需匹配，可用[运算符 +](../Language/IDP_OPUNARY.html)进行类型转换。
- **... already exists or is declared（已存在或已声明）**：
  1. 重复声明变量或其他标识符，或与已有声明冲突。
  2. 同一函数中多次声明局部变量。
- **expected x (to y) arguments（预期 x 到 y 个参数）**：
  1. 遗漏参数，调用函数时参数数量需与函数声明（`function`、`dll` 等）中的参数数量匹配。
- **syntax（语法错误）**：
  1. 其他语法错误。
- **Exception while compiling（编译时异常）**：
  1. QM 内部错误，尝试重启 QM。
- 若 QM 报告错误但代码看似正确（可能为 QM 错误），尝试重启 QM。

## 运行时错误
运行时错误在宏执行期间生成，宏将终止，QM 输出中显示“Error (RT) in Macro: 错误描述”。

运行时错误分三类：
1. **QM 生成的错误**：如“窗口未找到”、“文件未找到”等，可用 [err](../Flow/IDP_ERR.html) 处理。少数致命错误（如未编译的函数包含语法错误）无法处理。
2. **通过 end 语句生成的错误**：可用 [err](../Flow/IDP_END.html) 处理。
3. **操作系统或组件生成的异常**：通常由错误编程引起（如无效指针、除以 0、无限递归等），可用 `err` 处理，但应尽量避免。

常见运行时错误及原因/解决方法：
- **Window not found（窗口未找到）**：
  1. 窗口名称需大小写匹配。
  2. 窗口隐藏：使用 `opt hidden 1` 或使用类名。
  3. 窗口名称部分（如文档名）与录制时不同，使用部分名称。
- **Menu item or button not found（菜单项或按钮未找到）**：
  1. 下划线字符需前加 `&`，可通过键盘（Alt+...）展开菜单查看。
  2. 非标准菜单。
  3. 按钮类名不含“Button”或“Btn”，勿用 `but name [window]`，改用 `id` 或 `child` 函数。
  4. 按钮具有“owner-draw”样式，无法通过文本查找，尝试 `id`、`child(x y)` 或 `scan` 函数。
- **0x80020003, Member not found（成员未找到，与可访问对象相关）**：
  1. 可访问对象不支持此功能。
  2. 窗口未激活，使用 `act` 激活。
- **object not found（对象未找到）及其他**：
  1. 宏运行过快，插入 [wait](../Commands/IDP_WAIT.html) 或调整宏速度（[spe](../Commands/IDP_SPE.html)）。
- **cannot paste（无法粘贴）**：
  1. 焦点控件不可编辑。
  2. 焦点控件不支持 Ctrl+V，某些控件使用 Shift+Insert。
  3. 焦点控件不支持此剪贴板格式。
  4. 窗口被禁用或挂起。
  5. 窗口具有更高[完整性级别](IDP_VISTA.html)，如 QM 以用户身份运行，目标程序以管理员身份运行。