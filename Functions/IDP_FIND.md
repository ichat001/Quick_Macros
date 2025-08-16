# 在字符串中查找子字符串

## 语法
```
int find(string substring [from] [flags])
```

## 参数
- **string** - 要搜索的字符串。
- **substring** - 要查找的子字符串。
- **from** - 开始搜索的基于 0 的字符索引，默认 0。
- **flags**：
  | 值 | 描述 |
  |----|------|
  | 1 | 不区分大小写。 |

## 备注
- 返回 **substring** 在 **string** 中的基于 0 的首字符索引，未找到返回 -1。

### 提示
- 需更精确的搜索，可使用 [findw](IDP_FINDW.md) 或 [findrx](IDP_FINDRX.md)。

## 示例
```cpp
str s = "Notepad.exe"
int i = find(s ".exe")
// 此时 i 为 7
```