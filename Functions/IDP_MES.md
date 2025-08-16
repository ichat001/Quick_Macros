# 消息框

## 语法

```qm
int mes[-](text [caption] [style])
```

## 参数

- **text** - 消息文本。可以是字符串或数字。支持使用 [F-string](IDP_FSTRING.md) 插入变量，并支持 [链接](IDP_SYSLINK.md)。
- **caption** - 消息框标题。默认值：`""`（显示为“QM Message”）。
- **style** - 消息框样式。详见说明。默认值：`""`（仅显示 OK 按钮）。

### 选项

| 选项 | 描述 |
|------|------|
| - | 点击“取消”或“否”时终止宏。如果只有 OK 按钮，也会终止宏。 |

## 说明

显示标准消息框对话框。返回所选按钮名称的英文首字母（例如，OK 返回 'O'，Yes 返回 'Y' 等）。

### 样式 (style)

**style** 可以是包含一个或多个字符/子字符串的字符串，语法如下：

```qm
"[O|OC|YN|YNC|ARI|RC|CTE][1|2|3][?|!|x|i|q|v][s][a|n][t]"
```

- **按钮**（默认：OK）：
  | 值 | 描述 |
  |----|------|
  | O | OK |
  | OC | OK 取消 |
  | YN | 是 否 |
  | YNC | 是 否 取消 |
  | ARI | 中止 重试 忽略 |
  | RC | 重试 取消 |
  | CTE | 取消 再次尝试 继续 |

- **默认按钮**（默认：1）：
  | 值 | 描述 |
  |----|------|
  | 1 | 第一个按钮为默认 |
  | 2 | 第二个按钮为默认 |
  | 3 | 第三个按钮为默认 |

- **图标**（默认：无图标）：
  | 值 | 描述 |
  |----|------|
  | ? | 问号图标 |
  | ! | 警告（感叹号）图标 |
  | x | 错误（停止标志）图标 |
  | i | 信息（圆圈中的 i）图标 |
  | q | QM 图标（在可执行文件中为程序图标） |
  | v | Vista 及以上版本显示盾牌图标；旧版 Windows 显示静音警告图标（与 !s 相同）。QM 2.2.0 新增。 |

- **其他选项**：
  | 值 | 描述 |
  |----|------|
  | a | 始终激活消息框窗口。 |
  | n | 防止激活消息框窗口。另见 [RtOptions](IDP_QMDLL.md#RtOptions)。 |
  | t | 置顶（始终位于其他窗口之上）。仅在指定了拥有者窗口时使用；否则消息框默认置顶。 |
  | s | 静音。不播放声音。 |

**style** 也可以是整数，使用与 [MessageBox](IDP_MSDN.md) 相同的 MB_x 标志。

**style** 也可以是 `MES` 类型的变量，定义如下：

```qm
type MES ~style x y timeout default hwndowner
```

- **style**：消息框样式，与 `mes` 的 **style** 参数相同。
- **x, y**：消息框坐标。仅在非零时更改。如果为负数，则相对于屏幕右边或顶部边缘。
- **timeout**：消息框显示的最长时间（秒）。
- **default**：默认选择的按钮（例如 `'C'`），或超时时的返回值。值 1-15 映射到 Windows API 标准按钮常量，例如 IDOK 映射到 'O'，IDCANCEL 映射到 'C'。
- **hwndowner**：拥有者窗口句柄。如果属于同一线程，拥有者窗口将被禁用。

可以仅设置需要的成员。

## 示例

```qm
mes- "Click OK button"

mes F"Missing file {path}." "Error" "x"

if(mes("Save?" "" "YN?") != 'Y') ret

MES m
m.style="YNCn"
m.x=100
m.y=1
m.timeout=15
m.default='C'
int i=mes("message" "title" m)
```