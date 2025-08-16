# 编译器指令：#if, #else, #endif

## 语法

```qm
#if constexpr
statements
[#else
statements]
[#endif]
```

## 参数

- **constexpr**：常量整数表达式，支持：
  - 整数常量。
  - `int` 类型的全局变量。
  - 返回 `int` 的用户定义函数（在编译时于 QM 主线程执行）。
  - 表达式按从左到右顺序求值，忽略运算符优先级。
- **statements**：任意语句。

## 备注

- **功能**：
  - 若 **constexpr** 不为 0，编译 `#if` 后的语句，跳过 `#else` 后的语句。
  - 若 **constexpr** 为 0，跳过 `#if` 后的语句，编译 `#else` 后的语句。
- **与 `if` 的区别**：与 [if](IDP_IF.html) 不同，编译器指令仅在 [编译时](IDH_DEBUG.html) 求值。
- **#endif**：可省略，若省略，则编译（或跳过）后续所有语句直到文件末尾。
- **QM 2.4.1**：
  - 支持 `#if`、`#ifdef`、`#ifndef` 在 `#if`、`#ifdef`、`#ifndef` 或 `#else` 块中的嵌套。
  - 大多数编译器指令支持制表符缩进。

**相关内容**：
- [#ifdef](IDP_DIR_IFDEF.html)
- [#ret](IDP_DIR_RET.html)
- [预定义变量和常量](IDP_SPECVAR.html)
- [生成 exe](IDH_MAKEEXE.html)

## 示例

```qm
def TEST 5
#if !TEST
out "TEST is 0"
#else
rep 2
    #if TEST>=5
    out "TEST is >= 5"
    #else
    out "TEST is < 5"
    #endif
#endif
```