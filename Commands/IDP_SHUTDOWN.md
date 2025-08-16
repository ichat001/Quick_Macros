# 关闭 Windows、QM、宏等

## 语法

```qm
shutdown action [flags] [computer|command|threadname] [wait_|threadid] [message]
```

## 参数

- **action** - 以下值之一：

| 值 | 描述 |
|----|------|
| 0 | 注销 Windows。 |
| 1 | 关闭 Windows。 |
| 2 | 重启 Windows（重新启动）。 |
| 3 | 关闭并断电。 |
| 4 | 休眠。 |
| 5 | 待机（睡眠、待机）。 |
| 6 | 锁定计算机或切换用户。 |
| -1 | 退出 Quick Macros。在 [exe](../QM_Help/IDH_MAKEEXE.md) 中，退出 exe 进程（QM 2.2.0）。 |
| -2 | 重启 Quick Macros。 |
| -3 | 隐藏 Quick Macros。 |
| -4 | 显示 Quick Macros。 |
| -5 | 重新加载当前 [QM 文件](../QM_Help/IDH_QML.md)。 |
| -6 | 结束当前运行的宏或指定的 [线程](../Other/IDP_THREADS.md)。详情见下文。 |
| -7 | 温和结束当前线程。详情见下文。 |

动作 -2、-3、-4 和 -5 在 exe 中不可用，使用时会引发运行时错误。

- **flags** - 见下表。取决于 **action**。对于其他动作，应为 0 或省略。默认值：0。

| action | flags | 描述 |
|--------|-------|------|
| 0 - 5 | 0 | 允许应用程序取消操作。例如，若应用程序显示“保存？”消息框，可点击取消以停止关闭。 |
| 0 - 5 | 1 | 不允许取消。用于动作 0 - 3 时，强制终止所有应用程序，可能导致数据丢失。若计算机被锁定，也应使用此值。 |
| 0 - 3 | 2 | 仅强制终止挂起的应用程序。 |
| -6 | 1-8 | 见备注。 |
| -7 | 1 | 立即结束线程。详情见备注。 |

- **computer** - 计算机名称。默认值：""（本机）。用于动作 1 和 2。
  - 关闭其他计算机时，用户账户需在该计算机上具有管理员权限。
- **wait_** - 等待时间（秒）。显示关闭对话框或其他通知。默认值：0（无对话框）。
  - 提示：使用函数 `AbortSystemShutdown` 可取消关闭。
- **message** - 关闭对话框中显示的文本。默认值：""。
- **command** - [QM 命令行](../QM_Help/IDH_TRIG_COMMANDLINE.md)。用于动作 -2（重启 QM）。例如，可为 `"V"` 以可见方式重启。
- **threadname** - QM 项目名称或 [id](../Functions/IDP_QMITEM.md)。用于动作 -6（结束线程）。详情见备注。
- **threadid**（QM 2.2.0） - 线程句柄、ID 或唯一 ID（取决于 **flags**）。用于动作 -6（结束线程）。详情见备注。

## 备注

此命令是异步的。它指示 QM 执行指定动作，但不等待动作完成。对于许多动作，应为宏中的最后一个命令。

使用动作 -6 结束 [线程](../Other/IDP_THREADS.md)。[展开查看详情](#e1)。

<div id="e1">

QM 2.3.3 起，可使用函数 `EndThread` 代替，功能与 `shutdown -6` 相同。

**flags**：

| 值 | 描述 |
|----|------|
| 0 | QM 2.2.0。**threadid** 为线程句柄。详情见下文。 |
| 1 | QM 2.2.0。**threadid** 为线程 ID。 |
| 2 | QM 2.2.0。**threadid** 为线程唯一 ID。 |
| 4 | QM 2.3.2。若函数为该线程设置了“结束线程”触发器，则运行该触发器。 |
| 8 | QM 2.3.2。同步等待线程结束。 |

若 **threadname** 和 **threadid** 未使用（省略、0 或 ""），则结束当前运行的宏。若仅使用 **threadname**，则结束该函数的所有线程（所有运行实例）。若使用 **threadid**，仅结束该实例（若使用 **threadname**，也必须匹配）。若线程未运行，不会报错。无法结束 [特殊线程](../Other/IDP_THREADS.md)。无法关闭工具栏（使用 `clo` 代替）。不要用此命令结束当前线程；应使用 `ret`、`end`、`shutdown -7` 等。

要获取线程句柄、ID 或唯一 ID，使用 [mac](IDP_MAC.md)、[EnumQmThreads](../User/IDP_QMDLL.md#EnumQmThreads) 或 [GetQmThreadInfo](../User/IDP_QMDLL.md#GetQmThreadInfo)。不要使用 `GetCurrentThread` 或 `DuplicateHandle`。线程句柄仅在线程运行时有效。3 秒后，同一值可能被新线程重用。线程 ID 也可能被重用。唯一线程 ID 不会被重用。

若为 [子函数](../Language/IDP_DIR_SUB.md)，**threadname** 可为 "ParentName:SubName" 格式。

</div>

使用动作 -7 结束当前线程，适用于不知是否拥有窗口的情况。与 [end](../Flow/IDP_END.md) 不同，它会关闭线程的所有窗口，允许释放分配的内存等。`shutdown` 返回时，窗口已被销毁。若 **flags** 为 1，销毁窗口后立即结束线程。若为 0，则给予 0.5 秒（或 **wait_** 毫秒，若使用）自然结束。此动作可用于不知如何正确结束当前线程的函数。

根据操作系统、硬件和安全设置，某些功能可能无效。

## 示例

```qm
shutdown 3  ;; 关闭并断电；允许取消
shutdown 2 1  ;; 重启；不允许取消
shutdown 1 0 "" 30 "QM"  ;; 30 秒后关闭
shutdown -1  ;; 退出 QM
shutdown -6  ;; 结束当前运行的宏
shutdown -6 0 "Func"  ;; 结束函数 Func 的所有线程（运行实例）
```