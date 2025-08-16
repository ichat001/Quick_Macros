# 优化宏：使其更小巧易读

以下是一些使宏更简洁、易于阅读和编辑的技巧。

## 重用变量

避免为同一窗口或对象重复声明变量。例如，优化以下代码：

```qm
int w=win("Calculator" "CalcFrame")
lef 31 304 w 1 ;; push button '1'
int w1=win("Calculator" "CalcFrame")
lef 68 307 w1 1 ;; push button '2'
int w2=win("Calculator" "CalcFrame")
lef 104 305 w2 1 ;; push button '3'
```

若操作同一窗口，使用单一变量和 `win`：

```qm
int w=win("Calculator" "CalcFrame")
lef 31 304 w 1 ;; push button '1'
lef 68 307 w 1 ;; push button '2'
lef 104 305 w 1 ;; push button '3'
```

若操作不同窗口且后续无需前窗口句柄，可重用同一变量：

```qm
int w=win("Calculator" "CalcFrame")
lef 31 304 w 1 ;; push button '1'
w=win("Calculator" "CalcFrame")
lef 68 307 w 1 ;; push button '2'
w=win("Calculator" "CalcFrame")
lef 104 305 w 1 ;; push button '3'
```

同样，可重用 `Acc` 等由 QM 代码工具栏对话框添加的变量。例如，优化：

```qm
int w=win("Calculator" "CalcFrame")
Acc a.Find(w "PUSHBUTTON" "5" "" 0x1005)
a.DoDefaultAction
...
int w1=win("Calculator" "CalcFrame")
Acc a1.Find(w1 "PUSHBUTTON" "5" "" 0x1005)
a1.DoDefaultAction
```

若为同一对象：

```qm
int w=win("Calculator" "CalcFrame")
Acc a.Find(w "PUSHBUTTON" "5" "" 0x1005)
a.DoDefaultAction
...
a.DoDefaultAction
```

若为不同对象且后续无需前对象：

```qm
int w=win("Calculator" "CalcFrame")
Acc a.Find(w "PUSHBUTTON" "5" "" 0x1005)
a.DoDefaultAction
...
a.Find(w "PUSHBUTTON" "5" "" 0x1005)
a.DoDefaultAction
```

**另见**：[变量](IDH_VARIABLES.md)、[创建变量](IDP_VARIABLES.md)

## 使用循环

对于重复的代码块，使用循环简化。例如，优化：

```qm
int w1=win("Window1")
act w1
key Cc D ;; Ctrl+C Down
int w2=win("Window2")
act w2
key Cv D ;; Ctrl+V Down
act w1
key Cc D ;; Ctrl+C Down
act w2
key Cv D ;; Ctrl+V Down
act w1
key Cc D ;; Ctrl+C Down
act w2
key Cv D ;; Ctrl+V Down
```

使用 [rep](IDP_REP.md) 循环：

```qm
int w1=win("Window1")
int w2=win("Window2")
rep 3
    act w1
    key Cc D ;; Ctrl+C Down
    act w2
    key Cv D ;; Ctrl+V Down
```

对于相似但不完全相同的代码块，也可使用循环。例如，优化：

```qm
int w=win("Calculator" "CalcFrame")
lef 19 17 id(131 w)
0.5
lef 19 17 id(135 w)
0.5
lef 19 17 id(139 w)
0.5
```

使用 [foreach](IDP_FOREACH.md)：

```qm
int w=win("Calculator" "CalcFrame")
str ss="131[]135[]139"
str s
foreach s ss
    lef 19 17 id(val(s) w)
    0.5
```

**示例说明**：原始代码有 3 个相似的 2 行代码块，若有 10 个块将是 100 行，使用 `foreach` 仅需 13 行。

**另见**：[for](IDP_FOR.md)、[foreach](IDP_FOREACH.md)

## 使用函数

对于相似但不完全相同的代码块，可将部分代码移到函数中。例如，优化：

```qm
int w=win("Calculator" "CalcFrame")
lef 1 2 id(131 w)
paste "text1"
lef 3 4 id(132 w)
paste "text2"
lef 5 6 id(133 w)
paste "text3"
```

改为：

```qm
int w=win("Calculator" "CalcFrame")
Function225 1 2 id(131 w) "text1"
Function225 3 4 id(132 w) "text2"
Function225 5 6 id(133 w) "text3"
```

并创建函数 `Function225`（通过 **File -> New**）：

```qm
/
function x y hwnd str's
spe -1
lef x y hwnd
paste s
```

**示例说明**：原始代码有 3 个相似的 2 行代码块，若有 10 个块将是 100 行，使用函数仅需 15 行。

**另见**：[函数技巧](IDH_FUNCTIONTIPS.md)、[关于函数](IDH_FUNCTIONS.md)、[函数声明](IDP_FUNCTION.md)

## 使用数组

当需要多个相关变量（同类型）时，可使用单一数组变量。例如，优化：

```qm
str s0 s1 s2 s3
str s4 s5
s0="zero"
s1="one"
...
s5="five"
```

改为：

```qm
ARRAY(str) a.create(6)
a[0]="zero"
a[1]="one"
...
a[5]="five"
```

数组还能简化其他操作。例如：

```qm
ARRAY(str) a="zero[]one[]...[]five"
int i
for i 0 a.len
    out a[i]
```

**另见**：[ARRAY](IDP_OLE_ARRAY.md)

## 使用用户定义类型

当需要多个不同类型的相关变量时，可使用单一用户定义类型变量。例如，优化：

```qm
int i1 i2
str s
i1=1
i2=2
s="text"
```

改为：

```qm
type MACRO_X_VAR i1 i2 str's
MACRO_X_VAR v
v.i1=1
v.i2=2
v.s="text"
```

`MACRO_X_VAR` 为唯一类型名称。

**另见**：[声明用户定义类型](IDP_TYPE.md)、[使用用户定义类型](IDP_TYPEUSAGE.md)

## 删除未使用的变量声明

通过 **Run -> Compile Options -> [Show unused variables](IDH_MENU_TOOLS.md)** 检查并编译宏，以查找未使用的变量并删除其声明。