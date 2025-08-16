# 检查字符串是否为空

## 语法
```
int empty(s)
```

## 参数
- **s** - 字符串，可为 `lpstr`、`str`、`BSTR`、`word*` 或 `VARIANT` 类型。

## 备注
- 返回 1 表示 **s** 为空，0 表示非空。
- QM 2.3.0 起添加。
- 各类型判空条件：
  | 类型 | 判空条件 |
  |------|----------|
  | lpstr | [null](../str/IDH_STRINGS.html) 或 ""。 |
  | str | `len` 属性为 0。 |
  | BSTR | `len` 属性为 0。 |
  | word* | null 或 L""。 |
  | VARIANT | `vt` 为 `VT_BSTR` 且 `bstrVal` 的 `len` 为 0，或 `vt` 为 `VT_EMPTY` 或 `VT_NULL`。其他类型始终返回 1，即使值为 0。 |

### 提示
- 不要使用 `if(s="")` 检查 **s** 是否为空，因其对 `null` 或非 `str` 类型的 **s** 无效。应使用 `if(empty(s))`。

**另见**：[len](IDP_LEN.md)

## 示例
```cpp
// 检查字符串是否为空
function lpstr's

if(empty(s)) ret ;;若 s 为空（"" 或 0），退出函数
...
```