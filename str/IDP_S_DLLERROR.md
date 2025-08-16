# 获取 DLL 错误描述

## 语法

```
s.dllerror([message] [dll] [errorcode])
```

## 参数

- **s** - str 变量。
- **message** - 要前置的字符串。默认值：""。
- **dll** - 搜索错误描述的位置。默认值：""。可能的值：
  | 值 | 描述 |
  |----|------|
  | "" 或省略 | 在 Windows 系统 DLL 中搜索（最常用）。 |
  | DLL 文件名或完整路径 | 在指定的 DLL 中搜索。 |
  | "C" | 获取 C 运行时库 (MSVCRT) 错误描述。 |
- **errorcode** - 数字错误代码。如果省略或为 0，调用 `GetLastError`；它获取当前线程中最后调用的 DLL 函数（或通过 `SetLastError` 显式设置）的错误代码。

## 备注

许多 Windows DLL 函数和其他函数在失败时会设置一个错误代码（一个整数）。如果查看函数文档，通常会提到“如果函数失败...调用 GetLastError。”。其他函数在失败时返回非零值，通常是错误代码。许多错误代码是已知的并有文本描述。此函数获取描述（调用 `FormatMessage`）。如果未找到描述，返回 ""。

## 示例

```cpp
if CopyFile("nosuchfile" "tonosuchfile" 1) = 0
    str s.dllerror("Last dll error: ")
    out s
 // 输出：
 // Last dll error: The system cannot find the file specified.
```