# 关闭窗口

## 语法

```
clo [window]
```

## 参数

- **window** - [顶级或子窗口](../Other/IDP_WINDOWEXPRESSION.md)。默认值：活动窗口。

## 备注

- 窗口可能拒绝关闭请求，例如窗口挂起或显示“是否保存？”消息框。QM 不会等待窗口关闭，也不会因窗口未关闭而报错。
- 若窗口不存在，会报错，可使用 [err](../Flow/IDP_ERR.md) 继续执行宏。
- 关闭速度取决于 [spe](IDP_SPE.md)。
- 若窗口属于其他程序或线程，`clo` 会根据窗口类型和状态发送 WM_SYSCOMMAND/SC_CLOSE 或/和 WM_CLOSE 消息。某些窗口可能无法正常关闭，可直接发送这些消息代替 `clo`，见示例。
- 对于当前线程的窗口，可使用 `clo` 或 `DestroyWindow`。使用 `clo` 时，窗口会收到 WM_CLOSE 消息，若为带取消按钮的对话框，相当于点击取消按钮。使用 `DestroyWindow` 时，窗口不会收到 WM_CLOSE 消息，但无论哪种方式都会收到 WM_DESTROY 消息。不要使用 `DestroyWindow` 销毁模态对话框。

另见：[shutdown](IDP_SHUTDOWN.md)、`ShutDownProcess`、`CloseWindowsOf`。

## 示例

```cpp
clo "Notepad" ;;关闭“Notepad”窗口
clo ;;关闭活动窗口
clo win("Notepad" "Notepad"); err ;;关闭“Notepad”，若不存在不报错

// 发送消息
int h=win("Notepad" "Notepad")
PostMessage h WM_SYSCOMMAND SC_CLOSE 0
// 或
PostMessage h WM_CLOSE 0 0
```