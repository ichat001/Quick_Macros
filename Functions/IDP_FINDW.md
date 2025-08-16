# 以整词形式在字符串中查找子字符串

## 语法
```
int findw(string substring [from] [delim] [flags])
```

## 参数
- **string** - 要搜索的字符串。
- **substring** - 要查找的单词。
- **from** - 开始搜索的基于 0 的字符索引，默认 0。
- **delim** - [分隔符表](../Other/IDP_TABLEOFDELIM.html)。
- **flags**：
  | 值 | 描述 |
  |----|------|
  | 1 | 不区分大小写。 |
  | 64 | QM 2.3.3：若 **substring** 以分隔符开头或结尾，始终匹配。 |
  | 0x100 | **delim** 为分隔符表。 |
  | 0x200 | QM 2.3.3：向 **delim** 添加空格。 |

## 备注
- 返回 **substring** 在 **string** 中的基于 0 的首字符索引，未找到返回 -1。搜索由 **delim** 中的字符分隔的子字符串。
- **提示**：若 **string** 可能包含多行，需在 **delim** 中包含换行符 (`[]`)，或使用标志 0x200。

**另见**：[findrx](IDP_FINDRX.md)

## 示例
```cpp
str s = "my.exe /p"
int i = findw(s "exe" 0 " .:\/''[]")
out i ;;3
```