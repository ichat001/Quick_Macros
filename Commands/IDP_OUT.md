# 在 QM 输出中显示文本和变量

## 语法1

```qm
out expression
```

## 语法2

```qm
out formatstring ...
```

## 语法3 - 清除输出

```qm
out
```

## 参数

- **expression** - 任意表达式（字符串、数字、变量等）。
- **formatstring** - 包含 [格式字段](../Tables/IDP_PRINTF.md) 的字符串，类似于 [str.format](../str/IDP_S_FORMAT.md)。不可为变量。
- **...** - 替换 **formatstring** 中格式字段的变量或其他值，必须为 [内在类型](../Language/IDH_VARIABLES.html)。

## 备注

将文本发送到 QM 输出。适用于 [调试宏](../QM_Help/IDH_DEBUG.md)、学习/测试函数或向用户显示信息（当消息框等不合适时）。

常用格式字段：
- `%i` - 整数
- `%s` - 字符串
- `%1.6f` - 双精度浮点数
- `%c` - 字符
- `%x` - 十六进制整数
- `%I64i` - 长整数

QM 2.3.0：支持 [标签](../Other/IDP_F1.html) 用于颜色、链接等。需以 `<>` 开头显示带标签的文本。

**另见**：
- [字符串中的变量](../Language/IDP_FSTRING.html)
- [转义特殊字符](../Language/IDP_CONSTANT.html)
- [mes](../Functions/IDP_MES.md)（消息框）
- `ShowText`（文本框）
- `OnScreenDisplay`
- [RedirectQmOutput](../User/IDP_QMDLL.md#RedirectQmOutput)
- `ExeOutputWindow`

## 示例

```qm
;; 简单文本：
out "text"

;; 两行：
out "Line1[]Line2"

;; 变量 a：
int a = 10
out a

;; 变量 a 和 b 的和：
out a + b

;; 调用函数 len 并显示返回值：
lpstr s = "String"
out len(s)

;; 变量 i 以十进制显示，j 以十六进制显示：
out "%i 0x%X" i j

;; 同上：
out F"{i} 0x{j}"
```