# 发送按键和文本

## 语法

### 语法 1
```
key[+|-] keys
```

### 语法 2
```
'keys
```

## 备注

`key` 命令生成（模拟）键盘事件，效果如同手动按下键盘按键。按键事件发送到具有焦点的窗口或使用全局热键的应用程序。

可使用“Text”和“Keys”对话框生成 `key` 命令的代码。

**keys** 可包含以下类型的任意组合：

1. **无引号和括号的部分**：使用 [QM 键码](../Tables/IDP_KEYCODES.md) 发送按键。
   - 非文本键（如 Ctrl、Enter、F2、数字键盘键）使用大写字母。
     - 示例：`key TT Y F2 N3 ;;Tab Tab Enter F2 Num3`
   - 文本键使用小写字母或其他字符。
     - 示例：`key a/2 ;;A / 2`
     - 特殊字符 `;"{}()` 需使用 `:'[]90` 替代，或用双引号括起来。
   - 修饰键（Ctrl、Shift、Alt、Win）放在被修饰键之前。
     - 示例：`key Wf CSF2 ;;Win+F Ctrl+Shift+F2`
     - 若修饰多个键，用 `{}` 括起来，如 `key A{ev} ;;Alt+E+V`

2. **双引号中的文本**：发送键入该文本的按键。
   - 示例：`key "Text" ;;键入 Text（发送 Shift+T E X T）`
   - 支持[转义序列](../Language/IDP_CONSTANT.md)，如 `key "a[][9]b" ;;A Enter Tab B`
   - 支持[F-string](../Language/IDP_FSTRING.md)，如 `int x=5; key F"x={x}" ;;x=5`
   - 目标窗口接收的按键消息取决于 [opt keychar](IDP_OPT.md)。

3. **括号中的字符串表达式（如变量）**：键入文本，类似情况 2。
   - 示例：`str s="Text[]more text"; key (s)`
   - 非字符串变量需转换为字符串，如 `int x=5; str s=x; key (s)`，或使用 F-string。

4. **括号中的 Windows [虚拟键码](../Tables/IDP_VIRTUALKEYS.md)**：发送指定按键。
   - 示例：`key (VK_VOLUME_UP)`
   - 示例：`int vk='A'; key (vk)`

5. **括号中的扫描码**：发送指定按键。
   - 使用标志 0x10000，若为扩展键，添加 0x20000。
   - 示例：`key (0x30000|0x38) ;;Right Alt（扫描码 0x38，扩展键）`

6. **括号中的 Unicode 字符码**：键入指定字符。
   - 使用标志 0x40000。
   - 示例：`key (0x3A3|0x40000) ;;Σ`
   - 在 [Unicode 模式](../Other/IDP_UNICODE.md) 下，可直接在双引号文本中使用 Unicode 字符（情况 2）。

7. **括号中的双精度浮点表达式**：插入延迟。
   - 示例：`key a (1.0) b ;;A，等待 1 秒，B`
   - 示例：`double d=0.5; key a (d) b`

8. **括号中的标志（QM 2.2.1）**：
   - 0x01000000：等同于选项 `+`。
   - 0x02000000：等同于选项 `-`。
   - 0x03000000：移除上述标志及 `+`、`-` 选项。

9. **括号中的按键重复次数（QM 2.3.3）**：以 `#` 前缀指定。
   - 示例：`key T(#10) ;;按 Tab 10 次`
   - 示例：`int i=5; key a(#i) ;;按 A i 次`

### 选项

| 选项 | 描述 |
|------|------|
| + | 按下按键但不释放 |
| - | 释放按键，不按下 |

选项及标志 0x01000000 和 0x02000000 可用于情况 1、4 和 5。

### 语法 2
使用单引号 `'` 使宏更简洁，与 `key` 等效。

### 其他备注
- 速度取决于 [spe](IDP_SPE.md) 和 [opt slowkeys](IDP_OPT.md)。
- QM 2.2.1：`key` 可作为函数使用，不发送按键，而是返回虚拟键码。返回类型为 `ARRAY(KEYEVENT)`，`KEYEVENT` 定义如下：
  ```
  KEYEVENT !vk !flags @sc [0]wt
  ```
  - **vk**：虚拟键码。
  - **flags**：`KEYEVENTF_x` 标志，或 0x80（表示下一元素为等待时间）。
  - **sc**：扫描码或 Unicode 字符，取决于标志。
  - **wt**：等待时间（毫秒），与 [union](../Language/IDP_UNIONS.md) 中的其他成员共用。与 `SendInput`、[keybd_event、PostMessage(WM_KEYDOWN/WM_KEYUP)](../Other/IDP_MSDN.html) 兼容。
  - 示例：`KeyPostToControl key(abc) id(15 "Notepad")`
  - 函数 `KeyPostToControl` 示例：
    ```cpp
    /
    function ARRAY(KEYEVENT)'a hwnd
    ...
    ```

### 提示
- 使用 `BlockInput` 函数可阻止宏运行期间的键盘和鼠标输入。若需手动终止宏，先按 Ctrl+Alt+Delete。
- 若未使用[低级别键盘钩子](../QM_Help/IDH_SETT_TRIGGERS.html)，用户按下的键可能插入到 `key` 发送的键之间。可使用 [opt keymark 1](IDP_OPT.md) 避免此问题。

另见：[Windows 键盘快捷键](../Tables/IDP_KEYSHORTCUTS.md)、[opt slowkeys/keysync/hungwindow](IDP_OPT.md)、[转义特殊字符](../Language/IDP_CONSTANT.md)、[UAC](../Other/IDP_VISTA.md)。

## 示例

```cpp
key ab c F12 T Y ;;A, B, C, F12, Tab, Enter
key Ca ;;Ctrl+A
key CSf A{ec} Wd ;;Ctrl+Shift+F, Alt+E+C, Win+D
key "Send Keys" ;;键入 "Send Keys"
key SsendVSkeys ;;使用 QM 键码键入 "Send Keys"
key (s) ;;键入字符串变量 s
key F"{x}" ;;键入非字符串变量 x
key (VK_F2) ;;F2（使用虚拟键码常量）
key A(44) ;;Alt+PrintScreen（使用虚拟键码）
key a (0.5) b ;;A，等待 0.5 秒，B
key Skeys "Keys" A(44) AT (0.5) Cv A{fa} Y
'AT ;;Alt+Tab（等同于 key AT）

// Ctrl+Shift+点击
key+ CS
lef
key- SC
```