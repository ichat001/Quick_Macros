# 参考

[语法](IDP_SYNTAX.md) | [编程](IDH_PROGRAMMING.md) | [前20名](IDH_QUICK.md#b_top)

## QM 脚本语言

### 流程控制
- [goto](IDP_GOTO.md)：跳转到代码中的指定标签。
- [if else](IDP_IF.md)：条件语句，根据表达式结果执行或跳过语句。
- [iif](IDP_IIF.md)：内联条件函数，返回两个值之一。
- [sel case](IDP_SEL.md)：多条件选择语句，比较变量与多个值。
- [rep](IDP_REP.md)：循环语句，重复执行指定次数或直到中断。
- [for break continue](IDP_FOR.md)：带计数器的循环，支持中断和继续。
- [foreach](IDP_FOREACH.md)：遍历集合或数组的循环。
- [err](IDP_ERR.md)：处理运行时错误，允许继续执行。
- [ret](IDP_RET.md)：从函数返回一个值。
- [end](IDP_END.md)：终止宏或函数的执行。
- [call](IDP_CALL.md)：调用指定函数。

### 运算符
[运算符](IDH_OPERATORS.md)：
- **赋值与算术**：`= + - * / %`
- **位运算**：`& | ~ ^ >> <<`
- **逻辑运算**：`and or`
- **比较运算**：`= ! < <= > >=`
- **一元运算**：[Unary](IDP_OPUNARY.md)：`! ~ - * & + @`
- **其他**：[优先级](IDP_OPPRIORITY.md)、[精度](IDP_OPTYPE.md)

### 变量与常量
- [变量](IDH_VARIABLES.md)：
  - [声明](IDH_VARIABLES.md)：定义变量的类型和名称。
  - [作用域/存储](IDP_SCOPE.md)：变量的可见性和存储方式。
  - [预定义变量](IDP_SPECVAR.md)：QM 提供的内置变量。
  - [OLE 类型](IDP_OLETYPES.md)：用于 COM 的数据类型。
  - [数组](IDP_OLE_ARRAY.md)：存储多个值的集合。
  - [指针](IDH_POINTERS.md)：引用内存地址的变量。
  - [内存](IDP_MEMORY.md)：直接操作内存的函数。
- [常量](IDP_CONSTANT.md)：
  - [def](IDP_DEF.md)：定义命名常量。

### 函数、类型与库
- [函数](IDH_FUNCTIONS.md)：
  - [function](IDP_FUNCTION.md)：定义用户函数。
  - [dll](IDP_DLL.md)：调用外部动态链接库函数。
  - [type](IDP_TYPE.md)：定义自定义类型。
  - [unions](IDP_UNIONS.md)：联合类型，共享内存。
  - [class](IDP_CLASSES.md)：定义类，支持面向对象编程。
  - [category](IDP_CATEGORIES.md)：函数和类型的分组。
  - [interface](IDP_INTERFACE.md)：COM 接口定义。
  - [typelib](IDP_TYPELIB.md)：COM 类型库。
  - [COM](IDH_COM.md)：组件对象模型支持。
  - [COM 函数](IDP_COM_FUNC.md)：调用 COM 方法。
  - [ref](IDP_REF.md)：引用参数传递。
  - [声明](IDP_DECLARATION.md)：变量、函数等的声明。

### 指令
- [#if #else #endif](IDP_DIR_IF.md)：条件编译指令。
- [#ifdef #ifndef](IDP_DIR_IFDEF.md)：检查宏定义的条件编译。
- [#compile](IDP_DIR_COMPILE.md)：控制编译过程。
- [#set](IDP_DIR_SET.md)：设置编译器变量。
- [#opt](IDP_DIR_OPT.md)：优化选项。
- [#err](IDP_DIR_ERR.md)：生成编译错误。
- [#out #warning #error](IDP_DIR_OUT.md)：输出编译信息或错误。
- [#exe](IDP_DIR_EXE.md)：生成可执行文件。
- [#ret](IDP_DIR_RET.md)：指定返回值。
- [#sub](IDP_DIR_SUB.md)：定义子函数。
- [#region #endregion](IDP_DIR_REGION.md)：代码区域折叠。

### 其他
- [注释](IDP_COMMENT.md)：代码中的说明文本。
- [sizeof](IDP_SIZEOF.md)：获取变量或类型的字节大小。
- [uuidof](IDP_UUIDOF.md)：获取类型的 UUID。

## 函数

### 鼠标
- [lef rig mid dou](IDP_LEF.md)：模拟鼠标左键、右键、中键或双击。
- [mou](IDP_MOU.md)：移动鼠标指针。
- [xm ym](IDP_XMYM.md)：获取鼠标坐标。

### 键盘与文本
- [key](IDP_KEY.md)：模拟按键。
- [paste](IDP_PASTE.md)：粘贴文本。
- [out](IDP_OUT.md)：输出文本到 QM 输出窗口。
- [ifk](IDP_IFK.md)：检测按键状态。

### 对话框
- [mes](IDP_MES.md)：显示消息框。
- [inp](IDP_INP.md)：显示输入对话框。
- [inpp](IDP_INPP.md)：显示高级输入对话框。

### 文件
- [run](IDP_RUN.md)：运行程序或文件。
- [cop ren](IDP_COP.md)：复制或重命名文件。
- [del](IDP_DEL.md)：删除文件。
- [mkdir](IDP_MKDIR.md)：创建目录。
- [zip](IDP_ZIP.md)：压缩或解压文件。

### 窗口
- [act](IDP_ACT.md)：激活窗口。
- [clo](IDP_CLO.md)：关闭窗口。
- [min max res](IDP_MIN.md)：最小化、最大化或还原窗口。
- [mov siz](IDP_MOV.md)：移动或调整窗口大小。
- [hid](IDP_HID.md)：隐藏或显示窗口。
- [ifa](IDP_IFA.md)：检测窗口状态。
- [win wintest](IDP_WIN.md)：查找或测试窗口。

### 控件
- [but](IDP_BUT.md)：点击按钮控件。
- [id](IDP_ID.md)：获取控件 ID。
- [child childtest](IDP_CHILD.md)：查找或测试子控件。
- [acc acctest](IDP_ACC.md)：访问或测试辅助功能对象。
- [htm](IDP_HTM.md)：操作 HTML 元素。
- [men](IDP_MEN.md)：操作菜单。
- [scan](IDP_SCAN.md)：扫描窗口或控件。

### 时间
- [wait](IDP_WAIT.md)：暂停执行指定时间。
- [wait for](IDP_WAIT_FOR.md)：等待特定条件。
- [spe](IDP_SPE.md)：设置执行速度。
- [perf](IDP_PERF.md)：性能计时。
- [tim](IDP_TIM.md)：定时器操作。
- [DATE](IDP_OLE_DATE.md)：日期类型。

### 网络
- [web](IDP_WEB.md)：打开网页。
- [run](IDP_RUN.md)：运行网络相关程序。
- [htm](IDP_HTM.md)：操作 HTML 元素。

### QM
- [mac](IDP_MAC.md)：运行宏。
- [dis](IDP_DIS.md)：显示 QM 窗口。
- [qmitem](IDP_QMITEM.md)：操作 QM 项目。
- [newitem](IDP_NEWITEM.md)：创建新 QM 项目。
- [net](IDP_NET.md)：网络操作。
- [atend](IDP_ATEND.md)：在宏结束时执行。
- [opt](IDP_OPT.md)：设置运行选项。
- [getopt](IDP_GETOPT.md)：获取运行选项。
- [lock](IDP_LOCK.md)：锁定 QM 资源。
- [deb](IDP_DEB.md)：调试工具。

### 其他
- [bee](IDP_BEE.md)：发出蜂鸣声。
- [shutdown](IDP_SHUTDOWN.md)：关闭或重启系统。
- [pixel](IDP_PIXEL.md)：获取或设置屏幕像素。
- [scan](IDP_SCAN.md)：扫描屏幕内容。
- [rset rget](IDP_RGET.md)：操作注册表。
- [string map](IDP_ISTRINGMAP.md)：字符串映射。
- [XML](IDP_IXML.md)：XML 处理。
- [CSV](IDP_ICSV.md)：CSV 文件处理。
- [QM dll 函数和控件](IDP_QMDLL.md)：QM 扩展函数和控件。
- [对话框](IDH_DIALOG_EDITOR.md)：对话框编辑器。

## 字符串函数

### 全局
- [len](IDP_LEN.md)：获取字符串长度。
- [empty](IDP_EMPTY.md)：检查字符串是否为空。
- [val](IDP_VAL.md)：将字符串转换为数字。
- [numlines](IDP_NUMLINES.md)：获取字符串行数。
- [find](IDP_FIND.md)：查找子字符串。
- [findw](IDP_FINDW.md)：查找单词。
- [findt](IDP_FINDT.md)：查找文本。
- [findl](IDP_FINDL.md)：查找行。
- [tok](IDP_TOK.md)：分隔字符串。
- [findc findcr findcs findcn](IDP_FINDC.md)：查找字符。
- [findb](IDP_FINDB.md)：查找字节。
- [findrx](IDP_FINDRX.md)：正则表达式查找。
- [matchw](IDP_MATCHW.md)：匹配单词。

### str
#### 转换
- [lcase ucase](IDP_S_LCASE.md)：转换为小写或大写。
- [unicode ansi](IDP_S_UNICODE.md)：转换为 Unicode 或 ANSI。
- [escape](IDP_S_ESCAPE.md)：转义特殊字符。
- [encrypt decrypt](IDP_S_ENCRYPT.md)：加密或解密字符串。

#### 修改
- [trim ltrim rtrim](IDP_S_TRIM.md)：去除字符串两端或一端的空格。
- [set](IDP_S_SET.md)：设置字符串内容。
- [insert](IDP_S_INSERT.md)：插入字符串。
- [remove](IDP_S_REMOVE.md)：移除字符串部分。
- [replace](IDP_S_REPLACE.md)：替换字符串。
- [findreplace](IDP_S_FINDREPLACE.md)：查找并替换。
- [replacerx](IDP_S_REPLACERX.md)：正则表达式替换。
- [addline](IDP_S_ADDLINE.md)：添加行。

#### 获取
- [left right get geta](IDP_S_GET.md)：获取字符串的左、右或部分内容。
- [gett](IDP_S_GETT.md)：获取文本。
- [getl](IDP_S_GETL.md)：获取行。
- [getpath getfilename](IDP_S_PATH.md)：获取路径或文件名。

#### 格式化
- [from](IDP_S_FROM.md)：从多个字符串构建。
- [fromn](IDP_S_FROMN.md)：从数字格式化字符串。
- [format formata](IDP_S_FORMAT.md)：格式化字符串。

#### 比较
- [运算符](IDH_OPERATORS.md)：`= ~ !`
- [beg begi end endi mid midi](IDP_S_BEG.md)：比较字符串的开头、结尾或中间部分。

#### 其他
- [all](IDP_S_ALL.md)：处理整个字符串。
- [fix](IDP_S_FIX.md)：修复字符串。
- [getwintext setwintext getwinclass getwinexe](IDP_S_WINDOW.md)：获取或设置窗口文本、类名或可执行文件名。
- [getclip setclip getsel setsel](IDP_S_CLIP.md)：操作剪贴板或选择文本。
- [getfile setfile](IDP_S_FILE.md)：读写文件。
- [searchpath expandpath](IDP_S_SEARCHPATH.md)：查找或扩展路径。
- [dospath](IDP_S_DOSPATH.md)：转换为 DOS 路径。
- [getmacro](IDP_S_MACRO.md)：获取宏内容。
- [setmacro](IDP_S_MACROS.md)：设置宏内容。
- [dllerror](IDP_S_DLLERROR.md)：获取 DLL 错误信息。
- [timeformat](IDP_S_TIMEFORMAT.md)：格式化时间。
- [getstruct setstruct](IDP_S_STRUCT.md)：操作结构体。
- [swap](IDP_S_SWAP.md)：交换字符串内容。

## QM 扩展、DLL 函数与命令行工具

本帮助文件仅包含 `qm.exe` 及其 DLL 实现的功能。

许多其他函数和类使用 QM 脚本语言实现，代码位于 QM 系统文件夹和 [论坛](http://www.quickmacros.com/forum/index.php)。在代码编辑器中点击函数名或类名并按 F1，可在 QM 窗口显示其帮助。要搜索所有内容，可使用 QM 窗口中的 [查找帮助、函数、工具](IDH_INTERFACE.md#A5) 字段。另请使用 [代码工具栏对话框、函数列表、状态栏信息、F1](IDH_TYPEINFO.md) 和 [分类](IDH_REFERENCE_EX.md)。

你还可以使用外部函数，例如 Windows API、COM 组件、其他 DLL 或其他语言。参见 [MSDN 库](IDP_MSDN.md)、[API 参考](IDP_REF.md)、[COM 类型库](IDP_TYPELIB.md)、[数学函数](IDP_OPCRT.md) 和 `script` 分类。

你也可以使用 [run](IDP_RUN.md) 或 `RunConsole2` 执行命令行程序（Windows 或其他）。

## 术语与表格
- [语句](IDP_SYNTAX.md)：QM 代码的基本组成单位。
- [表达式](IDP_EXPRESSION.md)：计算产生值的代码。
- [窗口表达式](IDP_WINDOWEXPRESSION.md)：用于查找窗口的表达式。
- [子窗口、顶级窗口、弹出窗口、客户端区域](IDP_WINDOWSTYLES.md)：窗口类型。
- [线程](IDP_THREADS.md)：并行执行的代码单元。
- [标志](IDP_FLAGS.md)：控制行为的参数。
- [触发器编码](IDP_TRIGGER_CODING.md)：定义宏触发方式。
- [QM 键码](IDP_KEYCODES.md)：QM 使用的键盘按键代码。
- [虚拟键码](IDP_VIRTUALKEYS.md)：Windows 虚拟键代码。
- [字符代码](IDP_ASCII.md)：ASCII 和 Unicode 字符代码。
- [Windows 键盘快捷键](IDP_KEYSHORTCUTS.md)：系统快捷键。
- [特殊文件夹](IDP_SEARCHPATHS.md)：系统路径。
- [格式字段](IDP_PRINTF.md)：字符串格式化占位符。
- [正则表达式](IDP_PCRE.md)：模式匹配。
- [错误](IDP_ERRORS.md)：编译和运行时错误。
- [声明](IDP_DECLARATION.md)：变量、函数等的定义。