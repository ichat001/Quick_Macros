# 获取运行时选项

## 语法
```
int|lpstr getopt(option [context])
```

## 参数
- **option** - 可通过 [opt](../Commands/IDP_OPT.html) 设置的选项，或以下选项之一：
  | 选项 | 描述 |
  |------|------|
  | speed | 宏速度（自动延迟），单位毫秒。可局部设置（[spe](../Commands/IDP_SPE.html)）或全局设置（[RtOptions](../User/IDP_QMDLL.html#RtOptions)）。 |
  | itemid | [QM 项目 ID](IDP_QMITEM.html)。 |
  | itemname | QM 项目名称，返回类型为 `lpstr`（字符串），其他选项为 `int`。另见 context 6。 |
  | nargs | 传递的参数数量，适用于带可选参数的函数。 |
  | nthreads | 当前运行的线程数（不包括[特殊线程](../Other/IDP_THREADS.html)）。若 **context** 为 4，返回总线程数；否则返回由 **context** 指定的函数启动的线程数。另见 [IsThreadRunning](../User/IDP_QMDLL.html#IsThreadRunning)。 |
- **context** - 以下值之一，默认 0：
  | 值 | 描述 |
  |----|------|
  | 0 | 获取当前 QM 项目（调用此函数的项目）的选项。 |
  | 1 | 获取[直接调用者](../Other/IDP_FUNCTIONCALL.html)的选项（当前项目为函数且由其他项目调用）。 |
  | 2 | 获取回调入口函数或线程入口函数的选项。 |
  | 3 | 获取线程入口函数（启动执行的宏或函数）的选项。 |
  | 4 | 获取全局选项，仅对 `speed` 和 `nthreads` 有效。 |
  | 5 | QM 2.3.3：获取此函数或调用栈中最近非 0 选项的函数的选项，若全为 0 则返回 0。例如：F1→F2→F3，F3 中 `getopt` 返回 1 若 F3、F2 或 F1 的选项为 1。 |
  | 6 | QM 2.4.1：获取当前[子函数](../Language/IDP_DIR_SUB.html)的父项目的选项，若不在子函数中同 0。 |
  | <0 | QM 2.3.5：获取调用栈中第 -**context** 级调用者的选项（如 -2 为调用者的调用者），无此级别调用者返回 0。另见 [GetCallStack](../User/IDP_QMDLL.html#GetCallStack)。 |

## 备注
- 若指定上下文中选项不可用，返回 0。
- 更新记录：
  - QM 2.2.1：添加 `slowmouse`、`slowkeys`、`keymark`、`keysync`。
  - QM 2.3.0：添加 `hungwindow`。
  - QM 2.3.3：添加 `nowarnings`。
  - QM 2.3.5：添加 `nowarningshere`、`noerrorshere`。
  - QM 2.4.1：添加 `itemname`。

## 示例
```cpp
// 显示传递的参数数量
int na=getopt(nargs)
out na
```