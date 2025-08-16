# 编译器指令：#set

## 语法

```qm
#set variable value
```

## 参数

- **variable**：`int` 类型的全局变量。
- **value**：赋值的整数，可以是：
  - 简单数字。
  - `int` 类型的全局变量。
  - 无参数的用户定义函数（在编译时于 QM 主线程运行，子函数也支持）。

## 备注

- **功能**：在编译时设置 `int` 类型全局变量的值，变量必须已存在。
- **相关内容**：[ #compile](IDP_DIR_COMPILE.html)

## 示例

```qm
; 在编译时创建、设置并使用全局变量
int+ g_var
#set g_var GetGVar
#if g_var
```