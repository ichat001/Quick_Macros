# 线程

线程是运行中的宏或函数，其调用的所有函数在同一线程中执行。

## 线程概述

线程是操作系统分配 CPU 时间的基本单位，用于执行代码。多个线程可同时运行，操作系统通过时间片（约 20 毫秒）分配 CPU 时间，当前线程时间片结束后暂停，切换到其他线程。若有多个 CPU，线程可能在不同 CPU 上同时运行。了解更多可参考 [Wikipedia](http://en.wikipedia.org/wiki/Thread_(computing%29)。

QM 为用户、触发器、[mac](IDP_MAC.md) 或 [tim](IDP_TIM.md) 启动的每个宏或函数创建新线程，菜单/工具栏/自动文本项目也创建新线程。除非宏未启用“Run simultaneously”选项，多个线程可同时运行，同一函数的多个线程也可同时运行。

## 查看运行线程

所有当前运行的线程（特殊线程除外）显示在 **Running Items** 列表中，通过 **Run -> View Active Items** 查看。私有线程默认隐藏。可通过 QM 托盘菜单查看线程，无需打开 QM 窗口。

**另见**：[EnumQmThreads](IDP_QMDLL.md#EnumQmThreads)、[IsThreadRunning](IDP_QMDLL.md#IsThreadRunning)、`EndThread`

## 特殊线程

以下两个线程始终运行：

1. **QM 主线程**：
   - 运行全局变量构造函数/析构函数、工具栏钩子函数、编译期间执行的函数及其他特定函数。
   - 宏或其他应用程序可通过 [消息](IDH_TRIG_COMMANDLINE.md) 在主线程中运行函数。

2. **过滤器函数线程**：
   - 所有键盘、鼠标和窗口触发器的 [过滤器函数](IDH_TFF.md) 在此线程中运行。

这些线程的 [线程变量](IDP_SCOPE.md) 在卸载 [QM 文件](IDH_QML.md) 时销毁，早于全局变量销毁。

某些 DLL 函数（如 `CreateThread`）可能显式或隐式创建线程，应尽量避免，因 QM 无法销毁此类线程的线程变量或释放其分配的内存。

在所有特殊线程中，不要使用 [atend](IDP_ATEND.md)。

## 注意事项

线程结束前，执行以下步骤：

1. **QM 2.3.4+**：该线程的所有顶级窗口接收 `WM_QM_ENDTHREAD` 消息，需调用 `DestroyWindow` 销毁自身并释放分配的数据，避免内存泄漏。
2. 调用通过 [atend](IDP_ATEND.md) 注册的函数。
3. 销毁线程主函数的局部变量。
4. 销毁线程变量。