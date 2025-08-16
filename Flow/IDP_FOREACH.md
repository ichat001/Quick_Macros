# 遍历集合中的每个项目

## 语法

```qm
foreach item coll [function] [arguments]
    statements
    ...
```

也可以写成单行：

```qm
foreach(item coll [function] [arguments]) statements
```

## 参数

- **item** - 每次循环中接收 **coll** 集合中下一个项目的变量。类型取决于其他参数。
- **coll** - 通常是某种类型的集合。
- **function** - 用户定义的函数，用于填充 **item** 变量。
- **arguments** - 为 **function** 提供的额外参数。

## 说明

`foreach` 类似于 [rep](IDP_REP.md) 和 [for](IDP_FOR.md)。它简化了对各种集合中项目的枚举，为集合中的每个项目执行 **statements**。

当前支持两种预定义的集合类型，可与 `foreach` 一起使用（无需 **function**）。

### 1. 遍历字符串中的每一行
如果 **coll** 是字符串，则每次循环提取下一行并存储到 **item** 变量中。**item** 变量也必须是字符串类型（str 或 lpstr）。

### 2. 遍历 COM 集合中的每个项目
如果 **coll** 是 COM 集合接口，则每次循环提取下一个项目并存储到 **item** 变量中。变量类型必须与集合元素类型匹配，或者可以是 VARIANT。COM 接口应在类型库中定义。

可以通过用户定义函数扩展 `foreach`，例如枚举窗口、文件等。[了解更多](#扩展foreach)。

### 扩展 foreach

为此目的使用用户定义的函数（**function**）。`foreach` 在每次循环开始时执行该函数。函数从 **coll** 集合中获取下一个项目并将其赋值给 **item** 变量。**coll** 可以是任何内容（字符串、数组、用户定义类型的变量，或根本不使用）。

函数必须具有两个或更多参数。前两个参数接收 **item** 和 **coll**，可以是适合函数目的的任意类型，但第一个参数应为引用类型。其他可选参数接收 **arguments**。

函数必须返回：
- 1 - 提取到一个项目；
- 0 - 没有更多项目（中断 `foreach` 循环）；
- -1 - 表示提取到最后一个项目。

虽然函数被重复执行，但它在整个 `foreach` 循环中保留相同的局部变量（包括参数）。例如，可以使用局部变量进行内部索引或一次性初始化。

示例函数 FE_Char：

```qm
/ ;;获取字符串中的字符
function int&character $s

int i
if(s=0 or s[i]=0) ret
character=s[i]
i+1
ret 1
```

使用示例：

```qm
int c
foreach c "ABC" FE_Char
    out c
```

使用 `break` 退出循环。使用 `continue` 跳过后续的 **statements**。

`foreach` 可以嵌套在其他块中（例如 `if`、`for` 等）。

## 示例

```qm
;; 遍历每一行：
str s
str lines="line1[]line2[][]line3"
foreach s lines
    if(!s.len) continue
    out s

;; 遍历 COM 对象（枚举环境变量）：
Wsh.WshShell shell._create
VARIANT v
foreach v shell.Environment
    out v
```