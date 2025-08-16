# Unicode 和 UTF-8

## 概述

Unicode 是一种支持多语言文本显示的字符集，包含超过 10 万个字符，适用于中文、日文、韩文、阿拉伯文、俄文等语言。相比之下，ANSI 字符集仅包含 [256 个字符](IDP_ASCII.md)。

自 QM 2.3.0 起，Quick Macros 支持 Unicode，可在宏、触发器、窗口名称、文件名等中使用任意字符。

## Unicode 和 ANSI 模式

QM 支持两种模式：
- **ANSI 模式**：默认模式，与早期版本相同。
- **Unicode 模式**：在 **Options** 中勾选启用。对 [对话框](IDH_DIALOG_EDITOR.md#L18)，需在对话框编辑器的 **Options** 中单独启用。

QM 使用 UTF-8 编码（而非 UTF-16）来实现 Unicode：
- ASCII 字符（0-127）在两种模式下相同，占 1 字节。
- 非 ASCII 字符在 UTF-8 中占 2-4 字节，在 ANSI 模式下占 1 字节。

**建议**：推荐使用 Unicode 模式，特别是在系统字符集为多字节（如简体中文）时，因 ANSI 模式处理多字节字符效果不佳。

## 切换 Unicode 模式的注意事项

切换到 Unicode 模式后，需重新输入所有非 ASCII 字符（包括宏、触发器和 QM 界面），或使用转换器（见下文）。原因如下：
- 在 Unicode 模式下，文本按 UTF-8 编码解释，原 ANSI 模式输入的非 ASCII 字符会变成无效字符，显示为黑色矩形中的十六进制代码。
- 需重新输入字符串中的 [转义序列](IDP_CONSTANT.md)。
- 包含非 ASCII 字符的加密内容需重新加密。
- 若切换回 ANSI 模式，Unicode 模式输入的非 ASCII 字符也会失效，因其编码为多字节。

QM 不自动转换数据，但提供 **ANSI 到 Unicode 转换器**：
- 切换到 Unicode 模式后，在 **Options** 中点击 Unicode 复选框旁的小箭头按钮，列出包含非 ASCII 字符的项目。
- 点击输出中的项目名称打开项目，再次点击转换。
- **注意**：
  - QM 无法判断项目是否已转换，若可能已转换，会显示警告。
  - 不同电脑上创建的宏因 ANSI 字符集不同（控制面板 -> 区域 -> 高级/管理 -> 非 Unicode 程序语言）可能转换失败。
  - 无 Unicode 到 ANSI 转换器。

切换模式后，需检查在其他模式下创建的宏，某些函数在 ANSI 和 Unicode 模式下行为不同（搜索帮助中的“UTF-8”或“Unicode”）。

若未使用非 ASCII 字符，切换模式无需修改即可正常工作。

## Unicode 支持限制

并非所有 QM 函数和功能完全支持 Unicode，部分支持或需调整代码的限制在帮助文档中说明。

## 字符串长度处理

在支持指定字符串长度（或字符偏移、字符数等）的函数中，长度始终以字节数计算：
- 在 Unicode 模式下，非 ASCII 字符占多字节，字节数不等于字符数。
- 某些函数支持以 UTF-8 字符数而非字节数指定，需谨慎操作。
- 若在多字节字符中间拆分字符串，可能导致无效字符串。

## 检查多字节字符

以下宏可查看哪些字符在 UTF-8 中占多字节：

```qm
;; 显示 Unicode 字符代码、字符及 UTF-8 字节数（需在 Unicode 模式下运行）
out
int i
for i 1 0x10000
    str s=UnicodeCharToString(i)
    out "%i %s    [%i]" i s s.len
```

**函数 UnicodeCharToString**：

```qm
/
function~ ch

;; 将 Unicode 字符转换为字符串。
;; 在 Unicode 模式下，字符串为 UTF-8 编码。
;; 在 ANSI 模式下，无法转换为 ANSI 的 Unicode 字符将变为 ?。

if(ch&0xffff0000) end ES_BADARG

str s
lpstr ss=+&ch
s.ansi(ss)

ret s
```

**说明**：
- 字符代码 > 0xFFFF 的 Unicode 字符较少使用，在 UTF-8 中占 4 字节，在 UTF-16 中占 2 个字（4 字节）。
- 0 到 0xFFFF 的字符在 UTF-8 中占 1-3 字节。

## 外部文本转换

从外部来源（如文件）获取的 ANSI 文本若包含非 ASCII 字符，需转换为 UTF-8 以兼容 QM 函数。反之亦然。使用以下方法：
- `str` 函数 `ConvertEncoding`
- [str.unicode/ansi](IDP_S_UNICODE.md)
- `LoadUnicodeFile`

通常无需显式转换，因 QM 函数会自动处理已知格式的外部文本（如窗口/控件/对象名称、文件名等）。

## UTF-16 和其他编码

- **UTF-16**：常用于存储 Unicode 文本，所有字符占 2 字节（少数占 4 字节），如 `BSTR` 类型变量。UTF-16 字符长度固定，某些场景下处理更简单，但占用空间更大，且在 QM 等程序中难以使用。
- **UTF-8**：将 Unicode 字符编码为类似 ANSI 的字符串，非 UTF-8 感知程序可处理，UTF-8 感知程序（如 Unicode 模式的 QM）可显示所有 Unicode 字符。

## 字符编码示例

| 字符 | ANSI | UTF-16 | UTF-8 字节数 |
|------|------|--------|--------------|
| A    | 65   | 65 (2 字节: 65 0) | 1（0-127 范围字符） |
| ©    | 169  | 169 (2 字节: 169 0) | 2（128-255 范围字符） |
| β    | -    | 0x03B2 (2 字节) | 2（256-0x7FF 范围字符） |
| 岸   | -    | 0x5CB8 (2 字节) | 3（0x800-0xFFFF 范围字符） |

## 更多信息

可在互联网上查找有关 Unicode 和 UTF-8 的详细信息。

**另见**：
- [str.unicode/ansi](IDP_S_UNICODE.md)
- [_unicode 变量](IDP_SPECVAR.md)
- [Unicode 对话框](IDH_DIALOG_EDITOR.md#L18)
- [Unicode DLL 函数](IDP_DLL.md)