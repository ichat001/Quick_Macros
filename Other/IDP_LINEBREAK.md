# 换行符

在 Windows 上，标准换行符由两个 [字符](IDP_ASCII.md) 组成：回车符（CR，ASCII 码 13）后跟换行符（LF，ASCII 码 10）。其他操作系统可能使用不同的换行字符。

QM 中处理行的函数识别 Windows（CR+LF，13+10）和 Unix/Linux（LF，10）换行符。不识别单独的 CR（13）、Unicode 换行符或其他换行符。