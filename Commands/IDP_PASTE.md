# 粘贴文本

## 语法1

```qm
paste[+] expression
```

## 语法2

```qm
paste[+] formatstring ...
```

## 语法3 - paste 关键字可选

```qm
"text"
"formatstring" ...
```

## 参数

- **expression** - 任何表达式（字符串、数字、变量等）。
- **formatstring** - 包含 [格式字段](../Tables/IDP_PRINTF.md) 的字符串，类似于 [str.format](../str/IDP_S_FORMAT.md)。不能是变量。
- **...** - 用于替换 **formatstring** 中格式字段的变量或其他值。必须是 [基本类型](../Language/IDH_VARIABLES.md)。

## 选项

| 选项 | 描述 |
|------|------|
| 默认 | 通过剪贴板粘贴。 |
| + | QM 2.3.3 版本引入的混合粘贴。如果文本较短，则发送按键而非使用剪贴板。详情见下文。 |

## 备注

`paste` 关键字在 QM 2.3.3 中引入，与 `outp` 功能相同，可用于向后兼容。

`paste` 将文本存储到剪贴板并发送 Ctrl+V 按键。

`paste+`（混合粘贴）仅在文本长度 >100 或包含换行符时使用剪贴板，否则通过发送按键实现，类似于 `key "text"`。发送按键时速度很快，等同于 [opt](IDP_OPT.md) 设置为 `keysync 1`, `keychar 1`, `keymark 1`, `slowkeys 0`。

在“选项 -> 常规”设置中，可以启用混合粘贴，适用于菜单、工具栏和自动文本列表中省略 `paste` 关键字（语法3）的情况，例如 `:"text"`。

如果 **expression** 或 **formatstring** 是双引号括起来的简单文本，可以省略 `paste` 关键字（语法3）。

除非设置了 [运行时选项](IDP_OPT.md) `opt clip 1`，否则会恢复之前的剪贴板内容（仅限文本）。

在控制台窗口中使用不同的粘贴方法，因为 Ctrl+V 不起作用。

粘贴速度取决于 [spe](IDP_SPE.md) 设置。

**另见：** [str.setsel, str.getsel, str.getclip, str.setclip](../str/IDP_S_CLIP.md), [key](IDP_KEY.md), [字符串中的变量](../Language/IDP_FSTRING.md), [转义特殊字符](../Language/IDP_CONSTANT.md), [UAC](../Other/IDP_VISTA.md)

## 示例

```qm
paste "text"  ;; 粘贴简单文本
"text"  ;; 与上面相同
paste x  ;; 粘贴变量 x
paste "%i[]" x  ;; 粘贴整型变量 x 和换行符
paste F"{x}[]"  ;; 粘贴变量 x 和换行符
```