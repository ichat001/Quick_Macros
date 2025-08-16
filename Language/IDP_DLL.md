# 声明 DLL 函数（dll）

## 语法

### 语法 1 - 声明单个函数
```qm
dll[-] dllfile [functype]Function [parameters]
```

### 语法 2 - 声明同一 DLL 的多个函数
```qm
dll[-] dllfile
    [functype]Function1 [parameters]
    [functype]Function2 [parameters]
    ...
```

### 声明别名
```qm
dll dllfile [TrueName][functype]AnyName [parameters]
```

### 通过序号声明
```qm
dll dllfile [ordinal][functype]AnyName [parameters]
```

## 参数

- **dllfile**：[DLL 文件名](IDP_SEARCHPATHS.html) 或完整路径。
  - 可加引号或不加。
  - 可使用以 `_DLL_` 开头的命名常量（**QM 2.2.0**）。
  - 若使用 `&` 操作符显式设置地址，可为 `""`。
- **functype**：[返回类型](IDP_TYPESPEC.html)，省略时返回值为 `void`。
- **Function**：函数 [名称](IDP_IDENTIFIERS.html)。
- **parameters**：参数列表。
  - 语法：`[type]name`。
  - 可选参数语法：`[[type]name]`。
  - 默认类型为 `int`。

### 选项
| 选项 | 说明 |
|------|------|
| `-` | 延迟加载（DLL 和函数在运行时首次使用时加载）。若使用 `&` 操作符显式设置地址，也需使用此选项。 |

## 备注

- **功能**：声明 DLL 函数。
- **加载时机**：
  - 默认：在编译时加载 DLL 和查找函数（[exe](IDH_MAKEEXE.html) 中为程序启动时）。若 DLL 或函数未找到，生成错误（exe 中显示错误消息框并结束进程）。
  - 使用 `dll-`（延迟加载）：运行时首次使用时加载，若未找到则抛出运行时错误（参见 [err](IDP_ERR.html)）。
- **A/W 后缀**：部分 DLL 函数有 `A`（ANSI 文本）和 `W`（Unicode UTF-16 文本）版本。`A` 后缀可省略，若函数未找到，QM 自动查找带 `A` 的函数。支持 [Unicode](IDP_UNICODE.html) 需使用 `W` 版本。
- **调用约定**：支持 `__stdcall` 和 `__cdecl`，无需显式指定。
- **可选参数**（**QM 2.2.1**）：用 `[]` 声明，默认值为 0。按值传递的用户定义类型不可为可选。
- **可变参数**（**QM 2.2.1**）：在参数列表末尾加 `...`，调用时参数类型不转换，需匹配预期。
- **无参数声明**：允许不声明参数，调用时可传递任意数量参数，但类型需匹配预期。
- **引用参数**（**QM 2.4.1**）：参数可声明为 [引用](IDH_POINTERS.html)（如 `POINT&p` 等同于 `POINT*p`）。引用和指针参数可省略 `&` 操作符，如 `POINT p; GetCursorPos(p)` 等同于 `GetCursorPos(&p)`。
- **其他声明方式**：DLL 函数可声明在 [引用文件](IDH_SETT_FILES.html) 和 [类型库](IDP_TYPELIB.html) 中，免显式声明。`WINAPI` 和 `WINAPIV` 包含许多声明，部分 Windows 函数默认在 `System\Declarations` 文件夹中声明。
- **DLL 文件路径**：通常无需完整路径，DLL 需位于 QM 文件夹或 System32 文件夹。生成 exe 时，DLL 需在 exe 文件夹或 System32 文件夹（创建 exe 时也需在 QM 文件夹）。

**相关内容**：
- [函数](IDH_FUNCTIONS.html)
- [引用文件](IDP_REF.html)
- [类型库](IDP_TYPELIB.html)
- [声明](IDP_DECLARATION.html)
- [作用域](IDP_IDENTIFIERS.html)

## 示例

```qm
dll user32 #SendMessage hWnd wMsg wParam lParam
dll user32 #FindWindow $lpClassName $lpWindowName
dll user32 #GetCursorPos POINT*lpPoint
dll msvcrt
    ^pow ^x ^y
    [tolower]#ToLower c
    [795]#ToUpper c
dll "qm.exe" ^Round ^number [cDec] ;; cDec 是可选参数
dll msvcrt #sprintf $buffer $format ... ;; 2 个或更多参数
```

**Unicode 示例**：
```qm
dll user32 #SetWindowTextW hWnd @*lpString
dll user32 #GetWindowTextW hWnd @*lpString nMaxCount

SetWindowTextW _hwndqm @"unicode text"

str s; BSTR b
GetWindowTextW(_hwndqm b.alloc(300) 300)
s.ansi(b)
out s
```

**使用 WINAPI 示例**：
```qm
int hdc=WINAPI.CreateCompatibleDC(0)
```

## 显式设置函数地址（使用 `&` 操作符，QM 2.4.1）

### 语法
```qm
&Function=address
```

### 参数
- **Function**：使用 `dll-` 声明的函数名称，可为任意名称。
- **address**：函数地址，可为 DLL 函数、用户定义函数、运行时通过 `__Tcc` 类（C 编译器）编译的函数等。

### 备注
- **功能**：为使用 `dll-` 声明的函数设置地址，便于像调用常规 DLL 函数一样安全、方便地调用。
- **用途**：允许声明任意函数（不仅是 DLL 函数），运行时通过 `GetProcAddress` 等获取地址并绑定。相比 [call](IDP_CALL.html)，此方式更简单且参数类型有定义。
- **dllfile**：在 `dll-` 声明中，`dllfile` 可为 `""`，因 `&` 操作符不使用它。

### 示例
```qm
; 声明用户定义函数为 DLL 函数
dll- "" DlTest x ;; 声明
&DlTest=&Function274 ;; 设置地址
DlTest 100 ;; 调用

; 声明 DLL 函数
dll- "" #MessageBox2 hWnd $lpText $lpCaption uType
&MessageBox2=GetProcAddress(GetModuleHandle("user32") "MessageBoxA")
MessageBox2 0 "text" "caption" 0

; 声明运行时编译的 C 函数
dll- ""
    test_add a b
    test_sub a b
__Tcc+ g_test_tcc
if !g_test_tcc.f
    int* p=g_test_tcc.Compile("" "add[]sub")
    &test_add=p[0]
    &test_sub=p[1]
out test_add(4 5)
out test_sub(4 5)
#ret
int add(int a, int b){return a+b;}
int sub(int a, int b){return a-b;}
```