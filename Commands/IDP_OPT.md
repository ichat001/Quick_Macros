# 设置本地运行时选项

## 语法1 - 设置选项

```qm
opt option [value]
```

## 语法2 - 保存/恢复选项

```qm
opt save|restore
```

## 参数

- **option** - 表中指定的一个关键字。
- **value** - 表中指定的一个值。
  - 使用 **value** -1 可继承 [直接调用者](../Other/IDP_FUNCTIONCALL.md)（宏或函数）的选项。
  - 若指定的值不受支持，会报错。
  - QM 2.4.1 起，**value** 为可选，默认值为 1。

| 选项 | 使用场景 | 值 0 | 其他值 |
|------|----------|------|--------|
| hidden | 当宏命令仅指定窗口名称（未指定类）时。 | 仅搜索可见窗口。 | 1 - 搜索所有窗口。若指定了类或使用 `hid`-，始终搜索隐藏窗口。 |
| clip | 剪贴板命令（`paste`/`outp`, str.getsel, str.setsel）。 | 保留（恢复）剪贴板文本。 | 1 - 不保留剪贴板文本。 |
| err | 运行时错误时。 | 结束宏，显示错误。 | 1 - 继续宏，不显示错误。 |
| waitmsg | 等待时（`wait`、自动延迟等）。详见备注。 | 完全阻塞线程执行。 | 1 - 允许接收 Windows 消息和 COM 事件。<br>2 - 同 1，但为此线程设置此选项（不仅限于当前函数）。 |
| waitcpu | [自动延迟](IDP_SPE.md)。 | 仅应用简单自动延迟。 | 1 - 还等待 CPU。见 [RtOptions](../User/IDP_QMDLL.md#RtOptions) 的 waitcpu_time 和 waitcpu_threshold。详见备注。 |
| slowmouse | 鼠标命令（`mou`, `lef`, `rig`, `mid`, `dou`）。 | 立即移动鼠标。 | 1 - 缓慢移动鼠标。速度取决于宏速度（`spe`）和距离。 |
| slowkeys | `key` | 按键间不等待。 | 1 - 每个按键事件后稍作等待。速度取决于宏速度（`spe`）。 |
| keymark (QM 2.2.0) | `key`。详见备注。 | 使用正确扫描码。 | 1 - 使用修改后的扫描码。<br>QM 2.3.3：在自动文本列表中为默认值。 |
| keysync (QM 2.2.1) | `key`。用于提高速度或可靠性。 | 使用默认同步方法。<br>宏等待目标窗口实际接收按键，因无法完全可靠判断，仅等待有限时间，同时等待窗口繁忙。此方法在大多数情况下快速且可靠，但在某些条件下可能较慢。<br>在 [exe](../QM_Help/IDH_MAKEEXE.md) 中，使用方法 2，因等待目标窗口接收按键在 exe 中成本过高（使用 dll 中的钩子）。<br>“在 exe 中”指“若 QM 未运行的 exe”。若 QM 运行，exe 中的所有同步方法与 QM 相同。<br>若目标窗口属于同一线程，使用特殊同步方法。 | 1 - 不使用同步。按键发送后不等待窗口接收。最快。若未使用 [低级钩子](../QM_Help/IDH_SETT_TRIGGERS.md)（除非在 exe 中），可能导致键盘触发器问题，不建议使用。<br>2 - 最小同步。exe 中的默认方法。仅等待目标窗口繁忙。在某些窗口或压力条件下（低内存、CPU 繁忙等）同步效果不佳（按键可能发送过快）。通常最慢（约 20-100%）。若未使用低级钩子（除非在 exe 中），可能导致键盘触发器问题，不建议使用。<br>3 - 最大同步。等待按键被目标窗口接收。因无法完全可靠判断，某些情况下可能无限等待。不建议用于需在任意窗口运行的宏。exe 使用方法 2。 |
| hungwindow (QM 2.3.0) | 使用 `key` 和剪贴板函数时，若活动窗口挂起。 | 窗口挂起时，等待并显示带“中止”和“忽略”按钮的消息框。中止则宏结束（错误）。忽略则宏继续（不等待）。 | 1 - 窗口挂起时等待。<br>2 - 中止，等同用户点击“中止”。<br>3 - 忽略，等同用户点击“忽略”。 |
| keychar (QM 2.3.3) | 使用 [key](IDP_KEY.md) 时，处理 "text" 或字符串变量。用于精确输入文本。 | 发送普通按键。活动窗口接收带有常规 [虚拟键码](../Tables/IDP_VIRTUALKEYS.md) 的 WM_KEYx 消息。在某些情况下，因键盘状态影响，输入文本可能与宏中不完全一致。 | 1 - 以字符形式发送按键。活动窗口接收虚拟键码为 VK_PACKET 的 WM_KEYx 消息。输入文本始终与宏一致，但在某些窗口可能无效。 |
| nowarnings (QM 2.3.3) | 运行时警告。由某些 QM 函数和用户定义函数（[end](../Flow/IDP_END.md)）生成。 | 显示警告。 | 1 - 不显示警告。 |
| nowarningshere (QM 2.3.5) | 运行时警告。 | 正常显示警告。 | 1 - 将警告传递给调用者。警告文本中的链接指向调用者，而非当前函数。 |
| noerrorshere (QM 2.3.5) | 运行时错误。 | 正常显示错误。 | 1 - 将错误传递给调用者。未处理的错误归于调用者，而非当前函数。<br>仅在有 [直接调用者](../Other/IDP_FUNCTIONCALL.md) 时有效。<br>另一种传递错误方法：使用 [err](../Flow/IDP_ERR.md) 处理错误并通过 [end](../Flow/IDP_END.md) 重新抛出：`err+ end _error`。适用于所有 QM 版本。 |

## 备注

### 语法1

局部更改运行时选项（仅对当前运行的函数或宏实例有效）。

若作为函数使用，`opt` 等同于 [getopt](../Functions/IDP_GETOPT.md)（返回当前值）。

初始所有选项为 0，除自动文本中的 keymark 外。部分初始选项可通过 [RtOptions](../User/IDP_QMDLL.md#RtOptions) 更改。

`opt waitmsg 1` 应在拥有窗口（或对话框）的线程（运行宏）中使用 `wait` 命令（显式或隐式，如自动延迟或剪贴板命令）时使用。等待时，窗口需处理消息，否则无法处理消息，可能导致窗口无响应等异常。此选项在处理 COM 事件时通常也必要。

包含 `opt waitcpu 1` 的宏可能运行极慢，因某些程序持续占用 CPU。可通过 Windows 任务管理器或 perfmon.exe 查看 CPU 使用率，也可使用 [GetCPU](../User/IDP_QMDLL.md#GetCPU) 函数。

关于 `opt keymark 1`：为支持键盘触发器等功能，QM 使用键盘钩子拦截键盘事件。QM 对 QM 按下的（注入的）按键与用户按下的（真实）按键处理不同。例如，宏无法通过 `key` 命令触发热键宏。但若用户在 `key` 命令执行时同时按下或释放按键，QM 将按键事件视为 `key` 命令生成（无可靠方法区分真实与注入按键，除非使用低级钩子）。若为触发键，触发器将失效；若为等待键（`wait 0 K`），宏将不会停止等待；用户按下的键可能插入 QM 按下的键之间。避免这些问题的方法有两种：1. 使用 [低级键盘钩子](../QM_Help/IDH_SETT_TRIGGERS.md)。2. 在 `key` 前插入 `opt keymark 1`，但某些窗口的某些按键可能无法按预期工作。使用低级键盘钩子时，`opt keymark 1` 无影响（无论是否使用均正常工作）。

QM 2.4.1 增加语法2，用于保存/恢复当前 `opt` 和 [spe](IDP_SPE.md) 设置：
- `opt save` 保存当前设置（添加到内部堆栈）。
- `opt restore` 恢复保存的设置（从堆栈获取并移除）。

QM 2.4.3 禁用 opt end。若使用不会报错，但无效果。

**另见**：[getopt](../Functions/IDP_GETOPT.md)、[RtOptions](../User/IDP_QMDLL.md#RtOptions)、[err](../Flow/IDP_ERR.md)、[end](../Flow/IDP_END.md)、[Errors](../Other/IDP_ERRORS.md)、[wait](IDP_WAIT.md)、[wait for](IDP_WAIT_FOR.md)、[key](IDP_KEY.md)、[paste](IDP_PASTE.md)、[str.getsel](../str/IDP_S_CLIP.md)。

## 示例

```qm
;; 设置本地运行时选项“搜索隐藏窗口”
opt hidden 1

;; 保存/更改/恢复本地运行时选项
opt save
opt slowkeys 1; spe 10
out "%i %i" getopt(slowkeys) spe
opt restore
out "%i %i" getopt(slowkeys) spe
```