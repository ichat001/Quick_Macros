# DATE 变量类型

## 概述

`DATE` 类型用于存储日期和时间。

**注意**：在大多数情况下，建议使用 `DateTime` 类型，其功能与 `DATE` 相同，但支持更多功能（如毫秒）。仅在需要 `DATE` 类型的场景（如 COM 函数）使用。

`DATE` 类型使用浮点数（`double`）实现。日期以 1899 年 12 月 30 日午夜为起点，用整数部分表示天数，时间用小数部分表示，精度为 1 秒。可表示仅日期（小数部分为 0）或仅时间（整数部分为 0）。

要移除 `DATE` 变量的时间部分（仅保留日期），可将其赋值给 `int` 变量，但可能会向上取整。为避免取整，使用成员变量 `date`，见示例。

`DATE` 支持赋值运算符 `=`，可将包含日期的字符串（`str`、`lpstr`、`BSTR`、`VARIANT`）转换为 `DATE`，或反向转换。

格式化日期/时间字符串使用 [str.timeformat](../str/IDP_S_TIMEFORMAT.md)。

常用于存储日期和时间的其他类型包括 `SYSTEMTIME` 和 `FILETIME`：

```cpp
type SYSTEMTIME @wYear @wMonth @wDayOfWeek @wDay @wHour @wMinute @wSecond @wMilliseconds
type FILETIME dwLowDateTime dwHighDateTime
```

## 函数

以下函数中，**var** 为 `DATE` 类型变量。若未指定返回值，函数返回 **var** 本身。

---

### var.getclock

获取当前时间。

---

### var.fromsystemtime(st)
### var.tosystemtime(st)

将 `SYSTEMTIME` 转换为 `DATE` 类型，或反向转换。**st** 为 `SYSTEMTIME` 类型变量。

---

### var.fromfiletime(ft)
### var.tofiletime(ft)

将 `FILETIME` 转换为 `DATE` 类型，或反向转换。**ft** 为 `FILETIME` 类型变量。

---

### 过时函数

建议使用 `DateTime` 类代替。若需要 `DATE` 类型，可通过 `DateTime` 的 `FromDATE` 和 `ToDATE` 函数进行转换。也可使用时间类别中的其他函数，如 `TimeSpanGetPartsTotal`。

#### var.add(diff)

将 **diff** 添加到 **var**。**diff** 为日期跨度变量，在 `DATE` 函数中为 `SYSTEMTIME` 类型。

用于复杂日期跨度计算。简单加减天数可使用运算符 `+` 或 `-`，例如 `var=var-2` 减去 2 天，`var=var+(4/24.0)` 增加 4 小时。

#### var.sub(diff)

从 **var** 减去 **diff**。

#### double var.diff(date2 [diff] [part])

返回 **var** 和 **date2** 之间的差值。若 **var** 小于 **date2**，返回负值；相等返回 0；大于返回正值。

**diff** 可为 0 或 `SYSTEMTIME` 类型变量，接收日期跨度（始终为正）。

默认返回天数差。若 **part** 为 1，返回小时差；2，返回分钟差；3，返回秒差。始终返回整数。

要获取精确差值，使用运算符 `-`，例如 `diff=var-date2`。

## 示例

```cpp
DATE d="4/1/2003"
// 增加 2 天
d=d+2
out d

// 移除时间部分
DATE d=10.55
int i=d
out i ;;11（向上取整）
i=d.date
out i ;;10（正确）
```