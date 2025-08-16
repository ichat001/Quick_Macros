# 防止多线程同时执行代码

## 语法

### 语法 1 - 加锁
```
lock [name] [mutex] [timeoutMS]
```

### 语法 2 - 解锁
```
lock- [name]
```

## 参数

- **name** - 锁的[变量名称](../Other/IDP_IDENTIFIERS.md)，无需引号，用于在多个函数（或宏等）中标识同一锁。若锁仅用于当前函数，可省略或使用字面值 0。
- **mutex** - 互斥锁名称，字符串，区分大小写，除 `\` 外可包含任意字符。可带 "Global\" 或 "Local\" 前缀，详见备注。
- **timeoutMS** - 等待其他线程释放锁的最大时间（毫秒），整数。超时会抛出可由 [err](../Flow/IDP_ERR.md) 处理的错误。若省略或为 -1，无限等待；若为 0，仅检查是否加锁。

### 选项

| 选项 | 描述 |
|------|------|
| - | 解锁 |

## 备注

- 自 QM 2.2.0 起支持。
- [线程](../Other/IDP_THREADS.md) 是运行中的函数或宏，多个线程可同时运行，可能会同时执行同一代码块。`lock` 防止这种情况，例如避免多线程同时写文件（如 `str.setfile`）或修改全局变量导致错误。

### 语法 1
锁定从 `lock` 到 `lock-` 或函数结束的代码块，确保同一时间只有一个线程执行。若线程 2 尝试执行已由线程 1 锁定的代码，线程 2 会等待线程 1 完成。

### 语法 2
解锁由 `lock` 锁定的代码块。通常无需显式解锁，函数退出时 QM 会自动解锁。若使用 **name** 加锁，解锁时需使用相同的 **name**。若未执行 `lock-`（如使用 `goto` 跳出），代码保持锁定。

### 注意事项
- 同一 **name** 可用于多个函数，确保使用相同锁的代码不会同时执行。
- 避免多次 `lock` 而不使用 `lock-`。`lock` 增加锁计数，`lock-` 和函数退出减少锁计数。若函数退出时锁计数大于 1，该锁对象锁定的代码保持锁定，需在其他地方执行 `lock-` 或重启 QM 重置。
- 小心死锁。例如，线程 1 执行锁定代码并向线程 2 的窗口发送消息，线程 2 尝试执行同一锁定的代码，导致线程 1 在 `SendMessage` 中等待，线程 2 在 `lock` 中等待。需重启 QM 重置。
- `lock` 等待期间，线程不处理消息，即使设置了 `opt waitmsg 1`。
- 若省略 **mutex** 或为 ""，锁仅同步当前进程（QM 或 exe）的线程。使用 **mutex** 可同步多个进程的线程（例如“Run in separate process”，见 [exe](../QM_Help/IDH_MAKEEXE.md)）。互斥锁名称需唯一，如 "QM_mutex_macroname_8469"。若系统中存在同名其他类型的内核对象，会报错。带 "Global\" 前缀的互斥锁可用于多用户会话的进程。使用互斥锁时，`lock` 速度约慢 8 倍。更多信息见 [MSDN 同步对象](http://www.google.com/search?q=site%3Amicrosoft.com synchronization objects)。

## 示例

```cpp
lock
str s="test"
s.setfile("$desktop$\test.txt")
lock-

lock 0 "QM_mutex_test1"
...
lock-

lock 0 "" 1000; err end "the code is locked more than 1 s"
...
lock-

lock shared_lock_object
...
lock- shared_lock_object
```