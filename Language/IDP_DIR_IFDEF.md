# 编译器指令：#ifdef, #ifndef

## 语法

```qm
#if[n]def identifier
statements
[#else
statements]
[#endif]
```

## 参数

- **identifier**：全局标识符（命名常量、类型、函数、全局变量等）。
- **statements**：任意语句。

## 备注

- **功能**：
  - `#ifdef identifier`：若 **identifier** 已定义，编译 `#ifdef` 后的语句，跳过 `#else` 后的语句；否则，跳过 `#ifdef` 后的语句，编译 `#else` 后的语句。
  - `#ifndef identifier`：若 **identifier** 未定义，编译 `#ifndef` 后的语句，跳过 `#else` 后的语句；否则，跳过 `#ifndef` 后的语句，编译 `#else` 后的语句。
- **#endif**：可省略，若省略，则编译（或跳过）后续所有语句直到文件末尾。
- **QM 2.4.1**：
  - 支持 `#if`、 `#ifdef`、 `#ifndef` 在 `#if`、 `#ifdef`、 `#ifndef` 或 `#else` 块中的嵌套。
  - 大多数编译器指令支持制表符缩进。

**相关内容**：
- [#if](IDP_DIR_IF.html)

## 示例

```qm
; 若函数 "MyFunction" 存在，则调用：
#ifdef MyFunction
MyFunction 100
#endif
```