# 调用用户定义函数

[函数](IDH_FUNCTIONS.md) 可以通过以下几种方式调用：

## 1. 直接调用

直接调用的函数以同步方式运行。调用者宏或函数会等待被调用函数返回。

**示例**：

```qm
;; 全局函数
fileRename a b
x=GetAttr(c)

;; 成员函数
Tray t
t.AddIcon(a b)
```

特殊情况：与 [foreach](IDP_FOREACH.md) 一起使用的函数。

**另见**：[子函数](IDP_DIR_SUB.md)

## 2. 作为回调函数

将函数 A 的地址传递给函数 B，函数 B 随后可通过该地址调用函数 A。对于某些 QM 内置函数，可以使用函数名称或其他属性代替地址。

- 函数 A 可以是用户定义函数或 DLL 函数，但不能是成员函数、COM 函数或 QM 内置函数。
- 函数 B 可以是任意函数。

函数 B 可以立即调用函数 A（例如 `EnumWindows`），或设置稍后调用（例如 `SetTimer`）。COM [事件](IDP_COM_EVENTS.md) 函数也是回调函数。此外，有些函数运行在特殊 [线程](IDP_THREADS.md) 中（如触发器过滤函数或在 QM 主线程运行的函数）。

使用 [call](IDP_CALL.md) 可以通过地址或名称调用用户定义函数。

**示例**：

```qm
EnumWindows &enum_proc 0

SetTimer hDlg 1 1000 &MyTimerProc

x=ShowDialog("Dialog55" &Dialog55)

int fa=&my_callback_func
call fa 10 20

str fn="my_callback_func"
call fn 10 20

atend my_atend_func ;; 某些 QM 内置函数需使用函数名称而非 &
```

## 3. 特殊类成员函数

构造函数、析构函数和 `operator=` 是隐式调用的类成员函数，以同步方式运行。

## 4. [线程](IDP_THREADS.md) 入口函数

线程入口函数是通过“运行”按钮、触发器、[mac](IDP_MAC.md) 或其他创建新线程的方式启动的宏或函数。通过 `mac` 启动的函数以异步方式运行，包含 `mac` 的宏或函数不会等待，除非明确编程为等待。