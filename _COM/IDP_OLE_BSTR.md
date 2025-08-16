# BSTR 变量类型

BSTR 类型通常用于 COM 函数，是 [Unicode](../Other/IDP_UNICODE.md) UTF-16 格式的字符串。

BSTR 类型支持赋值运算符 `=`，可将内置类型（str、int 等）或其他 OLE 类型（VARIANT、DATE 等）自动转换为 BSTR。BSTR 变量本身也可赋值给 str 或其他变量。详见 [转换为/从 UTF-16](IDP_S_UNICODE.md)。

## 函数

以下函数中，**var** 为 BSTR 类型变量。若未指定返回值，函数返回 **var** 本身。

---

### var.add([left] right)

将 **left** 和 **right** 连接（var = left + right）。参数可以是任意类型。若省略 **left**，使用 **var**（var = var + right）。

---

### int var.cmp(string [flags])

比较 **var** 和 **string**。返回 -1（**var** 小于 **string**）、0（相等）或 1（**var** 大于 **string**）。

“小于”表示在排序列表中 **var** 在 **string** 之前。

QM 2.3.5：添加 **flags**。标志 1 表示不区分大小写。其他标志较少使用，与 [VarBstrCmp](https://learn.microsoft.com/en-us/windows/win32/api/oleauto/nf-oleauto-varbstrcmp) 相同，详见 MSDN。

---

### var.alloc(nchar)

为 **nchar** 个字符的字符串分配内存，并追加 [终止空字符](../str/IDH_STRINGS.md)。

若变量为空（QM 2.3.0），将分配内存的第一个字符设为 0，其余部分未初始化。

若变量非空，保留字符串，但不超过 **nchar** 个字符，其余部分未初始化。

---

### var.free

释放字符串内存。

---

### int var.len

返回字符串长度，为 2 字节字符数，不包括终止空字符。

也可使用 [len](../Functions/IDP_LEN.md)（QM 2.3.0）或 `wcslen` 获取 UTF-16 字符串长度。这些函数通过查找终止空字符计算长度，若字符串包含二进制数据（中间有空字符），可能返回不同值。

## 示例

```cpp
BSTR a = "string1"
BSTR b.add(a " string2")
 // 现在 b 是 "string1 string2"
str s = a
a = s
```