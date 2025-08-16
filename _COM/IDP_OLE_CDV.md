# CURRENCY、DECIMAL、VARIANT 变量类型

## 概述

- **CURRENCY**：存储为 8 字节整数，按 10000 缩放，得到固定点数，左侧 15 位，右侧 4 位。范围为 922337203685477.5807 至 -922337203685477.5808。适用于货币计算或需要高精度的固定点计算。
- **DECIMAL**：存储为 12 字节整数，按 10 的幂缩放。
- **VARIANT**：可存储 int、byte、word、double、long、BSTR、DATE、FLOAT、CURRENCY、DECIMAL、数组、接口指针等多种类型。其第一个成员（vt）存储[类型信息](../Tables/IDP_VARIANT.md)，接下来的三个字用于 DECIMAL，随后是 8 字节联合体，可存储其他支持类型的值。联合体是一种变量类型，其成员可为不同类型但共享同一内存。VARIANT 变量在超出作用域时会自动[清除](../Tables/IDP_VARTABLE.md)。

所有这些类型支持赋值运算符 `=` 和[一元运算符](../Language/IDP_OPUNARY.md)。可直接赋值包含数字的字符串，无需 [val](../Functions/IDP_VAL.md)。若无法从其他类型转换会报错。

## 函数

以下函数适用于 CURRENCY、DECIMAL 和 VARIANT 类型，提供比运算符更精确的结果。通用语法：

```
var.function(parameters)
```

**var** 为 CURRENCY、DECIMAL 或 VARIANT 类型变量。参数可为任意类型，但在计算前会转换为 **var** 的类型。大多数函数返回 **var** 本身。

---

### var.add([left] right)

将 **left** 和 **right** 相加（var = left + right）。若省略 **left**，使用 **var**（var = var + right）。

---

### var.sub([left] right)

相减（var = left - right）。

---

### var.mul([left] right)

相乘（var = left * right）。

---

### var.div([left] right)

相除（var = left / right）。

---

### var.round([number] [cDec])

将 **number** 四舍五入到小数点后 **cDec** 位。**cDec** 默认值为 0，**number** 默认值为 **var**。

---

### var.fix([number])

获取 **number** 的整数部分。**number** 默认值为 **var**。

---

### int var.cmp(numberorstring [flags])

比较 **var** 和 **numberorstring**。返回 -1（**var** 小于 **numberorstring**）、0（相等）或 1（**var** 大于 **numberorstring**）。

QM 2.3.5：添加 **flags**。标志 1 表示不区分大小写。

---

### var.attach(a) （仅 VARIANT）

**a** 为 ARRAY、BSTR、VARIANT 或接口指针类型的变量。

将 **a** 存储到 **var** 中，不复制关联数据（与运算符 `=` 不同）。清除 **a**。

## 示例

```cpp
VARIANT a
a.add(10 0.45)
 // 现在 a 是 10.45
a.sub(a.mul(5 10) 0.45)
 // 现在 a 是 49.55
a.round(2.52)
 // 现在 a 是 3
a.round(2.52 1)
 // 现在 a 是 2.5
a.fix(2.52)
 // 现在 a 是 2
a = -a
 // 现在 a 是 -2
a = "string1"
a.add(" string2")
 // 现在 a 是 "string1 string2"
```