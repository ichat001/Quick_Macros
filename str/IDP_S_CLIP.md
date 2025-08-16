# 剪贴板、复制、粘贴

## 语法

```
s.getclip([format])
s.setclip([format])
s.getsel([cut] [format] [control])
s.setsel([format] [control])
```

## 参数

- **s** - str 变量。
- **format** - 剪贴板格式。整数（用于预定义格式）或字符串（用于注册格式）。默认或 0：文本。
- **cut** - 如果非零，使用 Ctrl+X（剪切）。默认或 0：使用 Ctrl+C（复制）。
- **control** - 要操作的控件句柄。默认或 0：当前焦点控件。
  - 如果使用，发送消息而非按键。详情见备注。

## 备注

- `getclip` 将剪贴板数据复制到 **s**。默认为文本，除非指定其他格式。
- `setclip` 将 **s** 复制到剪贴板。
- `getsel` 将选中的文本复制到 **s**。
- `setsel` 粘贴 **s**。如果未使用 **format** 和 **control**，等同于 [paste](../Commands/IDP_PASTE.md) (`paste s`)。

所有这些函数都使用剪贴板。在 `getsel` 和 `setsel` 后，QM 会恢复之前的剪贴板内容（仅限文本），除非设置了[运行时选项](../Commands/IDP_OPT.md) `opt clip 1`。

对于 `setsel`，速度取决于 [spe](../Commands/IDP_SPE.md)。

要清空剪贴板，使用空字符串调用 `setclip`：

```cpp
str s.setclip
```

或

```cpp
s.all; s.setclip
```

在 [Unicode 模式](../Other/IDP_UNICODE.md) 下，这些函数自动支持 Unicode 文本。不要使用 CF_UNICODETEXT 格式，除非 **s** 包含 UTF-16 文本。QM 文本格式为 UTF-8（在 Unicode 模式下）或 ANSI。

`str` 变量可以存储文本或二进制数据。这些函数识别剪贴板格式 CF_TEXT、CF_OEMTEXT、CF_UNICODETEXT 和 CF_BITMAP。其他格式的数据直接在剪贴板间传输，不进行处理。也可以使用[注册格式](#)；此时 **format** 必须是格式名称（例如 "HTML Format"）或 `RegisterClipboardFormat` 返回的数值。

以下代码展示当前剪贴板中的格式，带字符串的为注册格式：

```cpp
int f; str s
OpenClipboard 0
rep CountClipboardFormats
    f=EnumClipboardFormats(f)
    s.fix(GetClipboardFormatName(f s s.all(100)))
    out "%i %s" f s
CloseClipboard
```

如果 **format** 为 CF_BITMAP，**s** 必须是图片文件路径。此时不使用 **s** 存储剪贴板数据，而是使用该文件：

- `getclip` 将剪贴板数据保存到文件 **s**。文件必须为 bmp。
- `setclip` 将文件 **s** 复制到剪贴板。文件可以是 bmp、jpg 或 gif。QM 2.3.4：也支持 png。
- `getsel` 将选中的图片保存到文件 **s**。文件必须为 bmp。
- `setsel` 粘贴文件 **s**。文件可以是 bmp、jpg 或 gif。QM 2.3.4：也支持 png。

如果省略或 **control** 为 0，`getsel` 和 `setsel` 使用按键（Ctrl+C、Ctrl+X、Ctrl+V）进行复制/剪切/粘贴。如果 **control** 是子窗口句柄，这些函数会向其发送消息（WM_COPY 等）。大多数编辑和富文本编辑控件支持这些消息。消息可以发送到非活动窗口的控件。

## 示例

```cpp
str s1 = "string1"
str s2
s1.setclip
s2.getclip
 // 现在 s2 是 "string1"

str s.getfile("unicodefile")
s.setsel(CF_UNICODETEXT)

str ss="My Pictures\test.bmp"
ss.setclip(CF_BITMAP)

str s.getclip("HTML Format")
```