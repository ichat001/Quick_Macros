# 类型成员对齐与联合

## 结构
- **结构**是指具有成员变量的类型，大多数为[用户定义类型](IDP_TYPE.html)。
- 无成员变量的类型：
  - `byte`：1 字节
  - `word`：2 字节
  - `int`、`lpstr`、指针、接口指针：4 字节
  - `long`、`double`：8 字节

## 默认对齐
- 结构成员按定义顺序在内存中排列。例如：
  ```cpp
  type T1 int'a int'b
  T1 t
  out "%i %i   %i" &t.a-&t &t.b-&t sizeof(t)
  ```
  - 成员 `a` 偏移为 0，`b` 偏移为 4（因 `a` 大小为 4 字节），结构大小为 8 字节。
- 默认对齐规则（假设成员非结构）：
  - 成员偏移量需可被其大小整除。
  - 结构大小需可被最大成员大小整除。
- 因此，成员间及结构末尾可能有填充（1-7 字节未使用）。示例：
  ```cpp
  type T2 byte'a int'b word'c
  T2 t
  out "%i %i %i   %i" &t.a-&t &t.b-&t &t.c-&t sizeof(t)
  ```
  - `a` 偏移为 0，`b` 偏移为 4（`a` 后有 3 字节填充），`c` 偏移为 8，结构大小为 12（末尾 2 字节填充）。

## 非标准对齐
- 某些类型使用非标准成员对齐。在 C/C++ 中使用 `#pragma pack` 设置对齐为 1、2、4 或 8（默认）。成员偏移量需可被其大小或对齐值（取较小者）整除。
- （QM 2.3.2）在类型定义末尾添加 `[pack1]`、 `[pack2]`、 `[pack4]` 或 `[pack8]`（默认）设置对齐。示例：
  ```cpp
  type T3 byte'a int'b word'c [pack1]
  T3 t
  out "%i %i %i   %i" &t.a-&t &t.b-&t &t.c-&t sizeof(t)
  ```

## 显式对齐与联合
- 可显式指定成员偏移量，用于定义联合（成员重叠的不同类型结构）或非标准对齐结构。成员声明前需用方括号指定偏移量（整数）。示例：
  ```cpp
  type LHWORD int'i [0]word'lo [2]word'hi
  LHWORD lh.i=0x00050007
  out "LOWORD 是 %i, HIWORD 是 %i" lh.lo lh.hi
  ;; 输出：LOWORD 是 7, HIWORD 是 5
  ```
- 若偏移量以 `+` 开头，表示相对于前一成员的偏移。空方括号表示与前一成员相同偏移。示例：
  ```cpp
  type LHWORD int'i []word'lo [+2]word'hi
  ```
- 若所有成员偏移显式设置，类型大小也显式确定。示例（大小为 6 字节，正常为 8 字节，因 `i` 在 4 字节偏移）：
  ```cpp
  type TYPE [0]word'w [2]int'i
  ```
- （QM 2.2.0）联合成员（除 `VARIANT` 类型外）不调用隐式或显式的构造函数/析构函数/复制函数，QM 会显示[警告](IDP_DIR_OPT.html)。因 QM 无法判断当时有效的成员，错误清理可能导致严重问题。需显式清理成员，例如：
  - 接口指针：调用其隐藏的 `Release` 函数。
  - `BSTR`：调用 `SysFreeString`。
  - `ARRAY`：调用 `SafeArrayDestroy`。
  - `STGMEDIUM`：调用 `ReleaseStgMedium`。
  - 详见 [MSDN 库](../Other/IDP_MSDN.html)。

## 类型内匿名类型
- 用户定义类型的成员可为其他用户定义类型。示例：
  ```cpp
  type T1 int'a int'b
  type T2 int'x T1'y
  T2 t
  t.y.a=5
  ```
- （QM 2.2.0）支持类型内定义匿名类型，简化 C++ 与 QM 声明转换，常用于复杂联合。匿名类型无类型名和成员名，但可指定偏移，其成员直接访问。使用 `{}` 括住匿名类型成员。示例：
  ```cpp
  type T2 int'x {int'a int'b}
  T2 t
  t.a=5

  type LHWORD int'i []{word'lo word'hi}
  LHWORD lh.i=0x00050007
  out "LOWORD 是 %i, HIWORD 是 %i" lh.lo lh.hi
  ```