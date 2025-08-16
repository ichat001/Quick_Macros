# 设置宏速度（自动延迟）

## 语法1 - 设置速度

```qm
spe [timeMS]
```

## 语法2 - 获取速度

```qm
int spe([context])
```

## 参数

- **timeMS** - 自动延迟时间（毫秒）。范围为 0 到 60000。默认值：0。
  - 若为 -1，则继承调用者的延迟。若无 [直接调用者](../Other/IDP_FUNCTIONCALL.md)，则使用宏的默认自动延迟（见备注）。
  - 若为 -2，则使用宏的默认自动延迟。
- **context** - 若省略或为 0，返回当前宏/函数的速度。若为 -1 或 -2，返回调用者或全局速度（见上文）。

## 备注

### 语法1

更改后续命令的自动延迟。

自动延迟是在宏命令后自动添加的短暂等待时间。它使宏更可靠，因为目标窗口有更多时间处理输入，但会使宏运行变慢。

自动延迟适用于以下命令：

`lef`, `rig`, `mid`, `dou`, `mou` (/4), `key`, `paste`/`outp`, `str.setsel`, `run`, `act`, `clo`, `min`, `max`, `res`, `siz`, `mov`, `hid`, `men`, `but`, `web`, `wait` WT, `MouseWheel`, `MouseButtonX`, `ArrangeWindows`, `RestoreMultiWinPos`, `CloseWindowsOf`, `Acc.Mouse`, `Acc.CbSelect`, `Htm.Mouse`, `Htm.ClickAsync`, `WindowText.Mouse`。

在宏、菜单、工具栏和自动文本项目中，默认（初始）自动延迟为 100 毫秒，或通过 [RtOptions](../User/IDP_QMDLL.md#RtOptions) 设置。在函数和成员函数中，初始自动延迟为 0。

`spe` 仅更改当前函数或宏的自动延迟，不影响其调用的函数。若用户定义的函数希望使用调用者的速度，可在函数开头插入：`spe -1`。

**提示**：为用户定义的函数添加自动延迟功能，可在函数末尾添加 `wait -2`。

### 语法2

返回当前自动延迟（不更改）。也可使用 [getopt](../Functions/IDP_GETOPT.md) 函数。

**另见**：[opt](IDP_OPT.md), [getopt](../Functions/IDP_GETOPT.md), [window](../Other/IDP_WINDOWEXPRESSION.md)。

## 示例

```qm
;; 设置宏速度（宏命令后等待 50 毫秒）：
spe 50
;; 设置最大速度：
spe
```