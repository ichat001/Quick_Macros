# 函数、参数等的类型声明

在声明函数、参数、类型成员等时，必须指定其类型。类型名称通常置于参数或成员名称之前，中间无空格，使用 `'` 分隔。例如：

```qm
str'a
```

## 指针和引用

对于指针或引用类型，不使用 `'` 分隔。示例：

```qm
str*a    ;; 指针
str&a    ;; 引用
str**a   ;; 双重指针
str***a  ;; 三重指针
str*&a   ;; 指针引用
```

## 数组

对于 `ARRAY` 类型，`'` 是可选的。示例：

```qm
ARRAY(str)a
ARRAY(str)'a
```

## 类型声明字符

某些类型可用类型声明字符代替类型名称。支持的类型和字符如下：

| 类型      | 字符         |
|-----------|--------------|
| byte      | `!`          |
| word      | `@`          |
| int       | `#` 或省略   |
| long      | `%`          |
| double    | `^`          |
| lpstr     | `$`          |
| str       | `~`          |
| VARIANT   | ``` ` ``` (QM 2.3.3+) |

对于 `int` 类型，可省略类型名称。例如：

```qm
a  ;; 等价于 int a
```

## 函数返回类型

用户定义函数的返回类型需在 `function` 关键字后指定，使用 `'` 分隔，除非使用类型声明字符。示例：

```qm
function'int
function#
```

若函数不返回值，则不指定类型。

## 示例（完整声明）

```qm
;; 函数 SetCursorPos 的返回类型为 int，参数类型为 int
dll user32 #SetCursorPos x y

;; 函数返回类型为 word 指针，参数类型为 int、lpstr、str 引用、POINT 指针
function'word* int'i lpstr'a str&sr POINT*pp
;; 或使用类型声明字符
function@* i $a ~&sr POINT*pp

;; 类型 PAINTSTRUCT 的 rcPaint 成员为 RECT，r 为 byte 数组，其他成员为 int
type PAINTSTRUCT hdc fErase RECT'rcPaint fRestore fIncUpd !r[32]
```