# 声明（创建）和初始化变量

## 最简单语法 - 创建初始值为 0 或空的局部变量
```
type var
```

## 完整语法
```
type[scope][ptr][&] var[(expression)] [var2[(expression)] ...] [= expression]
```

## 参数
- **type** - 变量[类型](IDH_VARIABLES.html)名称。
- **var** - 变量[名称](../Other/IDP_IDENTIFIERS.html)。
- **scope** - 变量[存储和作用域](IDP_SCOPE.html)，可为以下符号之一，默认 `var` 为局部变量：
  | 符号 | 描述 |
  |------|------|
  | `+` | `var` 为全局变量。 |
  | `-` | `var` 为[线程](../Other/IDP_THREADS.html)变量，当前线程的所有函数共享。 |
  | `--` | `var` 为线程变量，仅在当前函数中私有。 |
- **ptr** - 最多三个 `*` 字符，用于声明[指针](IDH_POINTERS.html)变量。
- **&** - 声明[引用](IDH_POINTERS.html)变量。
- **expression** - 初始值，[表达式](../Other/IDP_EXPRESSION.html)，默认为 0 或空。

## 备注
- 用于创建单个或多个[变量](IDH_VARIABLES.html)。
- `ARRAY` 变量需指定元素类型：`ARRAY(type) var`。
- 声明语句中可调用成员函数：`type var.member(args)`。
- 局部变量可内联声明，语法：`type'var`，见下方 `for` 示例。

## 示例
```cpp
int a ;; 声明局部 int 类型变量 a
byte b c d ;; 声明 3 个局部 byte 类型变量 b、c、d
int i = 5 ;; 声明局部 int 类型变量 i，i=5
int e(10) f(20) ;; 声明 2 个局部 int 类型变量 e、f，e=10，f=20
int+ hwnd = win("Notepad") ;; 声明全局 int 类型变量 hwnd，hwnd=win("Notepad")
double d1 ;; 声明局部 double 类型变量 d1
double d2 = d1 + (0.45 * i) ;; 声明局部 double 类型变量 d2，d2 = d1 + (0.45 * i)
str S1 = "Little Alien" ;; 声明局部 str 类型变量 S1，S1="Little Alien"
str S2.from("Little " "Alien") ;; 声明局部 str 类型变量 S2，S2.from("Little " "Alien")
str* sp = &S1 ;; 声明局部 str* 类型变量 sp（str 类型的指针），sp=&S1（S1 的地址）
str& sr = &S2 ;; 声明局部 str& 类型变量 sr（str 类型的引用），sr 是 S2 的别名
str& sr = S2 ;; 同上，& 可省略
str*& spr = &sp ;; 声明局部 str*& 类型变量 spr，spr 是 sp 的引用
str** spp = &sp ;; 声明局部 str** 类型变量 spp（str 类型的指针的指针），spp=&sp（sp 的地址）
str*** sppp = &spp ;; 声明局部 str*** 类型变量 sppp（str 类型的指针的指针的指针），sppp=&spp（spp 的地址）
POINT point ;; 声明局部用户定义类型 POINT 的变量 point
function word'w int**i str&s ;; 声明函数参数（局部变量 w、i、s）
for(int'j 0 len(S1)) out S1[j] ;; 内联声明 j，等同于 int j; for(j 0 len(S1)) out S1[j]
inp str's ;; 等同于 str s; inp s
ARRAY(str) a.create(10) ;; 创建局部安全数组，10 个 str 类型元素
Excel.Application b._create ;; 创建 Excel.Application 类型对象（类型 Application 定义于 Excel 类型库）
```