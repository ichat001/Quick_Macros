# 获取窗口文本、类名、程序，或设置窗口文本

## 语法

```
s.getwintext(window)
s.setwintext(window)
s.getwinclass(window)
s.getwinexe(window [full])
```

## 参数

- **s** - str 变量。
- **window** - [顶级或子窗口](../Other/IDP_WINDOWEXPRESSION.md)，通常为窗口句柄。
- **full** - 若为 0，获取文件名（如 "notepad"），否则获取完整路径（如 "C:\Windows\notepad.exe"）。默认值：0。

## 备注

- `getwintext` 将 **window** 的文本填充到 **s** 中，可以是窗口标题、按钮标签、编辑控件文本、静态控件文本等。
- `setwintext` 设置 **window** 的文本。
- `getwinclass` 将 **window** 的类名填充到 **s** 中。
- `getwinexe` 将 **window** 的可执行文件名或完整路径填充到 **s** 中。无法获取以其他用户身份运行的进程的完整路径。

另见：[GetProcessExename](../User/IDP_QMDLL.md#GetProcessExename)。

## 示例

```cpp
int h
str s
h=win("Notepad")
s.getwintext(h)
h=id(15 "Notepad")
s.setwintext(h)
```