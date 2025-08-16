# 使用通配符比较字符串

## 语法

```qm
int matchw(string pattern [flags])
```

## 参数

- **string** - 要比较的字符串。
- **pattern** - 包含通配符的字符串模式。
- **[flags](IDP_FLAGS.md)**：
  | 标志 | 描述 |
  |------|------|
  | 1 | 不区分大小写。 |

## 说明

如果 **string** 匹配 **pattern**，返回 1；否则返回 0。

### 通配符

- `?` 匹配任意单个字符。注意：在 [Unicode](IDP_UNICODE.md) 模式下，单个字符可能超过 1 个字节，因为非 ASCII 字符可能由多个字节组成。
- `*` 匹配 0 个或多个字符。
- `?*` 匹配 1 个或多个字符。
- `**` 匹配 `*`。
- `*?` 匹配 `?`。

**另见**： [findrx](IDP_FINDRX.md), [StrCompare](IDP_QMDLL.md#StrCompare)。

## 示例

```qm
str s="file.txt"
if(matchw(s "*.txt"))
    ...
```