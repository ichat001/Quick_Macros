# 用户定义类型变量使用

## 语法
访问用户定义类型（UDT）变量的成员：
```
var.member
```
- **var**：用户定义类型的变量名。
- **member**：成员名。
- 当 **var** 为指针时，也使用此语法。

## 备注
- 对于单一成员的 UDT 变量，可直接使用 **var** 访问成员，[OLE 自动化类型](../_COM/IDP_OLETYPES.html)除外。
- UDT 可包含其他 UDT。例如，若变量 `a` 有成员 `b`，`b` 有成员 `c`，则使用 `a.b.c` 访问 `c`。若 `b` 是 `a` 的[基类](IDP_CLASSES.html)，可直接使用 `a.c`。
- 在成员函数中，可直接访问调用对象的成员，或使用 `this.member`（`this` 为仅限成员函数使用的特殊变量）。
- UDT 变量通常较大，为避免在函数传递时复制整个变量，函数通常接受指针或引用。传递给期望指针的函数时，需在变量前加 `&` 运算符取地址。

## 示例
```cpp
;; 声明 RECT 类型变量（假设 RECT 定义为：type RECT left top right bottom）
RECT r
;; 使用成员
r.left = 100
r.right = r.left + 180
;; 复制 r 到 rr
RECT rr=r
;; 将 r 的地址传递给函数
GetWindowRect(win("Quick") &r)
;; 定义类型 MY
type MY word'w RECT'r byte'arr[32]
;; 声明 MY 类型变量 m 并使用成员
MY m
m.r.left = 100
int i = m.arr[4]
lpstr s=&m.arr; out s
;; 指针和引用
MY* mp = &m
i = mp.r.top
MY& mr = &m
i = mr.r.top
```