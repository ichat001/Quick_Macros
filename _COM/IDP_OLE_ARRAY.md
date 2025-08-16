# 变量类型 ARRAY

## 概述

`ARRAY` 是一种由任意数量相同类型元素组成的变量，可通过索引访问。QM 支持以下数组类型：
- **Safe Array**：本文讨论的动态、可调整大小、多维（1-10 维）且兼容 OLE-Automation 的数组。
- [指针数组](IDH_POINTERS.html)
- [嵌入式数组](IDP_TYPE.html)
- [字符串映射](IDP_ISTRINGMAP.html)
- [CSV](IDP_ICSV.html)

## 声明语法

```qm
ARRAY(type) var
```

### 参数
- **type**：元素类型，支持除 `ARRAY` 外的任何 [类型](IDH_VARIABLES.html)。
- **var**：变量名称。

## 访问元素

```qm
arr[i1 [i2 ...]]
```

### 参数
- **arr**：`ARRAY` 类型的变量。
- **i1**：最左维（第一维）的元素索引。
- **i2**：第二维的元素索引，依此类推。

**注意**：若索引无效（元素不存在），会抛出错误。

## 添加元素

可通过以下方式添加元素：
- 使用 `[]` 添加单个元素。
- 使用 `create`、`createlb`、`redim` 或 `insert` 函数（见下文）。
- 赋值为多行字符串（仅限 `str` 或 `BSTR` 数组）。

### 示例：声明与访问
```qm
ARRAY(str) a ;; 声明字符串数组
a.create(10) ;; 创建 10 个空元素
a[0]="first element" ;; 设置第一个元素
str s
s=a[0] ;; 将第一个元素值赋给变量
out s

ARRAY(str) am.create(3 10) ;; 2 维数组，第 1 维 3 个元素，第 2 维 10 个元素
int i j
for i 0 am.len(2) ;; 遍历第 2 维
    for j 0 am.len(1) ;; 遍历第 1 维
        am[j i].from(j " " i)
        out am[j i]
```

### 示例：使用 `[]` 添加元素
```qm
int i
ARRAY(int) a
for(i 0 10) a[]=i ;; 添加并设置 1 个元素
for(i 0 a.len) out a[i]

ARRAY(str) b
for(i 0 10) b[].from("element " i) ;; 添加并设置 1 个元素
for(i 0 b.len) out b[i]

ARRAY(str) c
for(i 0 10)
    str& s=c[] ;; 添加 1 个元素并获取引用
    s.from("element " i)
    s+" in array c"
for(i 0 c.len) out c[i]

ARRAY(POINT) d
for(i 0 10)
    POINT& p=d[] ;; 添加 1 个元素并获取引用
    p.x=i; p.y=i*2
for(i 0 d.len)
    &p=d[i]
    out F"{p.x} {p.y}"
```

### 示例：多行字符串赋值
```qm
ARRAY(str) a="zero[]one[]two"
int i
for(i 0 a.len) out "%i %s" i a[i]

str s=a
out s
```

## 释放数组

`ARRAY` 变量会自动释放。若需显式清除所有元素，可赋值为 `0` 或调用 `redim` 无参数：
```qm
a=0
; 或
a.redim
```

## 详细信息

- **用户定义类型**：`ARRAY` 可用于用户定义类型，但不可用于嵌入式数组。
  ```qm
  type ABC int'x ARRAY(BSTR)'a
  ```
- **函数传递**：
  - 用户定义函数：默认复制整个数组，除非按引用传递（传递 `ARRAY` 变量地址）。
  - 非用户定义函数：不复制数组。
  - COM 函数：通常接受 `SAFEARRAY*`，可直接传递 `ARRAY` 变量。
  - DLL 函数：通常需传递数组数据的直接指针，如 `&arr[0]`。
- **内存管理**：`ARRAY` 变量实际是指向数组描述符（`SAFEARRAY` 类型，4 字节）的指针，包含数据指针等属性，内存由 QM 自动 [管理](IDP_VARTABLE.html)。
- **与 VB 兼容**：`ARRAY` 兼容 Visual Basic 动态数组，但多维数组存储顺序与 C/Pascal 相反。例如，`ARRAY(int) a.create(x y)` 相当于 C 的 `int a[y][x]`。
- **赋值**：
  - 数组间赋值：完整复制数组及关联数据。
  - 字符串到数组：将多行字符串赋给 `str` 或 `BSTR` 数组，生成一维字符串数组，每行一个元素。
  - 数组到字符串：一维字符串数组赋给 `str` 或 `BSTR`，生成多行字符串；多维数组则将所有元素连接为字符串。
  - 数组到 `VARIANT`：可赋值给 `VARIANT` 变量，销毁或类型改变时释放数组；使用 `=` 复制数组，使用 `attach` 将数组移入 `VARIANT` 并清空原数组。
- **全局变量与指针**：
  ```qm
  ARRAY(str) as ;; 字符串数组
  ARRAY(int)+ ai ;; 全局整数数组
  ARRAY(VARIANT) av ;; VARIANT 数组（元素类型可不同）
  ARRAY(RECT) ar ;; RECT 数组
  ARRAY(RECT*) arp ;; RECT 指针数组
  ARRAY(int)* pai = &ai ;; 整数数组指针
  ```

## 函数

以下函数操作 `ARRAY` 变量 `var`，未指定返回值时返回 `var` 本身。

### `var.create([n1] [n2 ...])`
创建并初始化数组。
- **n1, n2, ...**：各维元素数量（1-10 维）。
- 每维下界为 0。
- 可用于调整数组大小（不保留原有内容）。
- 无参数时，仅创建数组描述符，不分配元素内存。

### `var.createlb(n1 lb1 [n2 lb2 ...])`
同 `create`，但可指定每维下界。
- **lb1, lb2, ...**：各维下界，可为负数。

### `int var.redim([n] [lb])`
调整最右维大小，未创建时生成一维数组。
- **n**：新元素数量，负值表示添加 `-n` 个元素。
- **lb**：新下界，省略时不更改。
- 数组增大时返回最右维首个新增元素的索引，缩小时返回值未定义。
- 保留新旧数组共有的元素。
- 无参数时释放数组，等同于 `var=0`。

### `int var.insert(index)`
插入一个空元素，未创建时生成一维数组。
- **index**：插入位置，若为最后一个元素索引 +1，则添加到末尾。
- 返回 `index`。
- QM 2.3.2 起支持多维数组，操作最右维（如二维数组插入整行）。

### `var.remove(index)`
删除指定元素。
- **index**：元素索引。
- QM 2.3.2 起支持多维数组，删除最右维（如二维数组删除整行）。
- **注意**：在 `for` 循环中删除元素时，从末尾开始：
  ```qm
  ARRAY(str) a="a[]b[]c[]d[]e"
  int i; for(i a.len-1 -1 -1) if(i&1) a.remove(i)
  out a
  ```

### `int var.len([dim])`, `int var.lbound([dim])`, `int var.ubound([dim])`
- `len`：返回元素数量。
- `lbound`：返回首个元素索引。
- `ubound`：返回最后一个元素索引。
- **dim**：基于 1 的维度索引，默认操作最右维。

### `int var.ndim`
返回维度数量。

### `var.sort([flags] [sortfunction] [param])`
排序数组元素。
- **flags**：[标志](IDP_FLAGS.html)：
  | 值 | 说明 |
  |----|------|
  | 1 | 降序排序（也适用于自定义排序函数）。 |
  | 2 | 不区分大小写（用于 `str` 和 `lpstr` 数组）。 |
  | 4 | QM 2.3.2，语言排序，使用 [StrCmp](IDP_QMDLL.html#StrCmp)。 |
  | 8 | QM 2.3.2，数字、语言、不区分大小写，使用 [StrCmpLogicalW](IDP_QMDLL.html#StrCmpLogicalW)，将字符串中的数字按数值比较。 |
  | 0x100 | QM 2.3.3，日期排序，将字符串转为 `DATE` 比较，若无法转换则按普通字符串比较。 |
  - 标志 2、4、8 仅用于 `str` 和 `lpstr` 数组且无 `sortfunction` 时。若无标志 4 和 8，使用 [StrCompare](IDP_QMDLL.html#StrCompare)。
- **sortfunction**：用户定义回调函数名称，仅对非 `str`、`lpstr`、`int`、`byte`、`word`、`double`、`long` 类型元素需指定。
- **param**：传递给排序函数的值，默认 0。
- QM 2.3.2 起支持多维数组，排序最右维，比较每组最右维的首个元素。

**回调函数模板**（可从菜单 File -> New -> Templates 获取）：
```qm
function# param TYPE&a TYPE&b
```
- **param**：`sort` 的 `param`，可声明为任意类型的指针或引用，传递变量 [地址](IDP_OPUNARY.html)。
- **TYPE**：数组元素类型。
- **a, b**：两个待比较的元素。
- 返回值：
  - `-1`：`a` 在 `b` 前。
  - `1`：`a` 在 `b` 后。
  - `0`：无差异。

**示例：排序多行字符串**
```qm
str s="zero[]one[]TWO[]THREE"
ARRAY(str) a=s
a.sort(2) ;; 不区分大小写排序
s=a
out s
```

**示例：多维数组排序**
```qm
function# param str&a str&b
    &a=&a+(2*sizeof(a)) ;; 调整到第 2 列
    &b=&b+(2*sizeof(b))
    ;; 比较逻辑...
```

### `var.shuffle`
随机打乱数组元素。
- QM 2.3.2 起支持多维数组，打乱最右维。

## 注意事项

- `ARRAY` 函数非线程安全，多个线程同时操作同一变量可能损坏数据。需使用 [lock](IDP_LOCK.html) 保护多线程访问。