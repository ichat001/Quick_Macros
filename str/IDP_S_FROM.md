# 从多个部分创建字符串

## 语法

```
s.from(s1 [s2 ...])
```

## 参数

- **s** - str 变量。
- **s1**, **s2**, **...** - 字符串或数值。

## 备注

`str` 不支持表达式 `s = s1 + s2` 来连接字符串。为此目的使用 `from` 函数。

### 提示
要将其他字符串追加到 **s** 的开头或结尾，可使用操作符 + 或 -。见示例。

另见：[str.format](IDP_S_FORMAT.md)、[str.fromn](IDP_S_FROMN.md)、[str.addline](IDP_S_ADDLINE.md)、[包含变量的字符串](../Language/IDP_FSTRING.md)。

## 示例

```cpp
str s("notepad") ss
ss.from(s ".exe") ;;现在 ss 是 "notepad.exe"
ss=s; ss+".exe" ;;同上
```