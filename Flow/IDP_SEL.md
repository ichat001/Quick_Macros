# 选择 (Select)

## 语法

```qm
sel expression [flags]
    case a
        statements
        ...
    case b
        statements
        ...
    ...
    [case else
        statements
        ...]
```

**case** 行后可直接跟语句：

```qm
sel expression [flags]
    case a statements
    [case else statements]
```

全部可写成单行：

```qm
sel(expression [flags]) case a statements ... [case else statements]
```

## 参数

- **expression** - 变量或其他 [表达式](IDP_EXPRESSION.md)。类型为整数或字符串。
- **a, b** - 整数或字符串 [常量](IDP_CONSTANT.md)。类型必须与 **expression** 匹配。
  - 可以是括在方括号中的多个值，例如 `case [1,2]`。
- **[flags](IDP_FLAGS.md)** - 字符串比较方式：
  | 标志 | 描述 |
  |------|------|
  | 1 | 不区分大小写。 |
  | 2 | 在 **a**、**b** 等中使用 [通配符](IDP_MATCHW.md)。 |
  | 4 (QM 2.4.1) | 在以 $ 开头的 **a**、**b** 等中使用 [正则表达式](IDP_PCRE.md)。例如，字符串 "$^a\d+$" 被视为正则表达式 "^a\d+$"。不以 $ 开头的字符串按普通字符串或通配符（如果同时使用标志 2）比较。 |
  | 8 (QM 2.4.1) | 如果 **expression** 为 0（空），将其视为 ""。没有此标志，空字符串不匹配 ""。 |

## 说明

如果 **expression** 的值匹配某个 case 常量，则执行该 `case` 后的 **statements**（直到下一个 `case`，如果存在）。否则，执行 `case else` 后的语句（如果存在）。

`case` 关键字后可接冒号。

**另见**： `SelInt`, `SelStr`

## 示例

```qm
;; 如果变量 msg 为 5，显示 1；若为 WM_COMMAND，显示 2 并播放声音；若为 512、513 或 514，显示 3 并播放声音；否则显示 msg：
sel msg
    case 5: out 1
    case WM_COMMAND: out 2; bee
    case [512,513,514]
        out 3
        bee
    case else out msg

;; 根据星期执行不同代码
str weekday.time("%A")
sel weekday
    case "Monday": out 1
    
    case "Tuesday"
        out 2
        out "today is Tuesday"
    
    case ["Sunday","Saturday"]: out 3
    case else out 4

;; 根据窗口名称执行不同代码
str s.getwintext(win("Quick Macros"))
sel s 3 ;;不区分大小写，使用通配符
    case ["*[Macro97]","*[Macro98]": out 1 ;;窗口名称以 [Macro97] 或 [Macro98] 结尾
    case else out 2
```