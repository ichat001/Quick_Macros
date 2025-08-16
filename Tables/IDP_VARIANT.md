# VARIANT 成员表

以下表格列出了 `VARIANT` 类型的成员、对应的 C 和 QM 类型、名称、变体类型（`vt`）、常量名称及相关注释。

| C 类型 | QM 类型 | 名称 | vt | vt 常量 | 注释 |
|--------|---------|------|----|---------|------|
| - | - | - | 0 | VT_EMPTY | [V][P] 空值，无内容 |
| - | - | - | 1 | VT_NULL | [V][P] SQL 风格的 Null |
| short | word | (p)iVal | 2 | VT_I2 | [V][T][P][S] 2 字节有符号整数 |
| int, long | int | (p)lVal | 3 | VT_I4 | [V][T][P][S] 4 字节有符号整数 |
| float | FLOAT | (p)fltVal | 4 | VT_R4 | [V][T][P][S] 4 字节浮点数 |
| double | double | (p)dblVal | 5 | VT_R8 | [V][T][P][S] 8 字节浮点数 |
| CY | CURRENCY | (p)cyVal | 6 | VT_CY | [V][T][P][S] 货币 |
| DATE | DATE | (p)date | 7 | VT_DATE | [V][T][P][S] 日期/时间 |
| BSTR | BSTR | (p)bstrVal | 8 | VT_BSTR | [V][T][P][S] OLE 自动化字符串 |
| IDispatch* | IDispatch | (p)pdispVal | 9 | VT_DISPATCH | [V][T][P][S] 支持 IDispatch 的接口 |
| SCODE | int | (p)scode | 10 | VT_ERROR | [V][T][P][S] 错误代码 |
| VARIANT_BOOL | word | (p)boolVal | 11 | VT_BOOL | [V][T][P][S] 布尔值，True=-1 (word 中为 0xffff)，False=0 |
| VARIANT* | VARIANT* | pvarVal | 12 | VT_VARIANT | [V][T][P][S] VARIANT 中为指向另一个 VARIANT 的指针，带 VT_BYREF 标志；数组中非指针 |
| IUnknown* | IUnknown | (p)punkVal | 13 | VT_UNKNOWN | [V][T][S] 不支持 IDispatch 的接口 |
| DECIMAL | DECIMAL | (p)decVal | 14 | VT_DECIMAL | [V][T][S] 使用整个 VARIANT |
| char | byte | (p)cVal | 16 | VT_I1 | [V][T][P][S] 1 字节有符号整数 |
| BYTE (unsigned char) | byte | (p)bVal | 17 | VT_UI1 | [V][T][P][S] 1 字节无符号整数 |
| WORD (unsigned short) | word | (p)uiVal | 18 | VT_UI2 | [V][T][P][S] 2 字节无符号整数 |
| DWORD (unsigned long) | int | (p)ulVal | 19 | VT_UI4 | [V][T][P][S] 4 字节无符号整数 |
| __int64 | long | (p)llVal | 20 | VT_I8 | [V][T][P][S] 8 字节有符号整数 |
| unsigned __int64 | long | (p)ullVal | 21 | VT_UI8 | [V][T][P][S] 8 字节无符号整数 |
| int | int | (p)intVal | 22 | VT_INT | [V][T][P][S] 推荐使用 VT_I4 |
| UINT (unsigned int) | int | (p)uintVal | 23 | VT_UINT | [V][T][S] 推荐使用 VT_UI4 |
| void* | byte* | byref | 24 | VT_VOID | [T] C 风格 void |
| - | - | - | 25 | VT_HRESULT | [T] 标准返回类型 |
| - | - | - | 26 | VT_PTR | [T] 指针类型 |
| - | - | - | 27 | VT_SAFEARRAY | [T] 安全数组 |
| - | - | - | 28 | VT_CARRAY | [T] C 风格数组 |
| - | - | - | 29 | VT_USERDEFINED | [T] 用户定义类型 |
| - | - | - | 30 | VT_LPSTR | [T][P] 空终止字符串 |
| - | - | - | 31 | VT_LPWSTR | [T][P] 宽字符空终止字符串 |
| - | - | pvRecord | 36 | VT_RECORD | [V][P][S] 用户定义类型，在 QM 中仅用于数组 |
| - | - | - | 64 | VT_FILETIME | [P] FILETIME |
| - | - | - | 65 | VT_BLOB | [P] 长度前缀字节 |
| - | - | - | 66 | VT_STREAM | [P] 后跟流名称 |
| - | - | - | 67 | VT_STORAGE | [P] 后跟存储名称 |
| - | - | - | 68 | VT_STREAMED_OBJECT | [P] 流包含对象 |
| - | - | - | 69 | VT_STORED_OBJECT | [P] 存储包含对象 |
| - | - | - | 70 | VT_BLOB_OBJECT | [P] Blob 包含对象 |
| - | - | - | 71 | VT_CF | [P] 剪贴板格式 |
| - | - | - | 72 | VT_CLSID | [P] 类 ID |
| - | - | - | 0x1000 | VT_VECTOR | [P] 简单计数数组（标志） |
| - | - | (p)parray | 0x2000 | VT_ARRAY | [V] SAFEARRAY*（标志） |
| - | - | - | 0x4000 | VT_BYREF | [V] 指针（标志） |

## 备注
- 若 `SAFEARRAY*`（QM 中为 `ARRAY`）存储在 `VARIANT` 中，`vt` 为元素类型加 `VT_ARRAY` 标志。
- `(p)`：存在带 `p` 前缀的成员，表示指针，`vt` 带有 `VT_BYREF` 标志。
- `[V]`：可在 `VARIANT` 中使用。
- `[S]`：可在 `SAFEARRAY` 中使用。
- `[P]`：可在 OLE 属性集中使用。
- `[T]`：可在类型库（`TYPEDESC`）中使用。