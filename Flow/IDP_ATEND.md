# 注册宏结束时运行的函数

## 语法

```
atend function [argument]
```

## 参数

- **function** - 用户定义函数或 DLL 函数的名称，可以是[子函数](../Language/IDP_DIR_SUB.md)。
- **argument** - 传递给函数的值。函数可以选择性地有一个 int 或指针类型的参数。默认值：0。

## 备注

有时需要在宏结束时执行特定代码，例如宏因错误终止。`atend` 语句注册 **function**，以在当前宏结束时运行。

**function** 在注册它的[线程](../Other/IDP_THREADS.md)中运行。运行时，当前线程入口函数的局部变量仍然存在。如果宏正常结束，[_error](IDP_ERR.md) 变量为空；如果宏失败，则包含错误信息。

注册的函数按 LIFO（后进先出）顺序运行。对于同一 **function**，如果 **argument** 值相同，多次调用 `atend` 不会重复注册。

不要在特殊[线程](../Other/IDP_THREADS.md)或 DLL 函数创建的线程中使用 `atend`。

在 **function** 中不要使用 `end`（除非用于生成警告），并避免未处理的运行时错误，详见 [更多信息](IDP_END.md)。

## 示例

```cpp
atend RestoreCapsLock
int* p=malloc(10); atend free p
...
```