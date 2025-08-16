# if ... else

## 语法

```qm
if expression
    statements
    ...
[else
    statements
    ...]
```

也可以写成单行：

```qm
if(expression) statements
[else statements]
```

或：

```qm
if(expression) statements [else statements]
```

## 参数

- **expression** - 任何 [表达式](IDP_EXPRESSION.md)。

## 说明

如果 **expression** 为真（非 0），则执行 `if` 后的 **statements**，并跳过 `else` 后的 **statements**（如果存在）。否则，跳过 `if` 后的 **statements**，并执行 `else` 后的 **statements**（如果存在）。

`else if` 不需要后续行的双重缩进。参见示例。

**另见**： [运算符](IDH_OPERATORS.md), [ifa](IDP_IFA.md), [ifk](IDP_IFK.md), [iif](IDP_IIF.md), [sel](IDP_SEL.md)

## 示例

```qm
if i=10
    out "i is 10"

if i=10
    out "i is 10"
else
    out "i is not 10"

if i > 0
    out "i is greater than 0"
    if(s.endi(".exe")) ret i; else ret 0
else if i < 0
    out "i is less than 0"
else
    out "i is 0"

if a and b
    out "a is not 0, and b is not 0"
    if c or d or e
        out "c is not 0, or d is not 0, or e is not 0"
```