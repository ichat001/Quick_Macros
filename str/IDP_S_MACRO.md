# 获取宏文本或其他属性

## 语法

```
s.getmacro([macro] [what])
```

## 参数

- **s** - str 变量。
- **macro** - [QM 项](../QM_Help/IDH_ITEMS.md)名称（完整名称，不区分大小写）或[id](../Functions/IDP_QMITEM.md)（整数）。
  - 如果省略或为 ""，则为当前在代码编辑器中打开的 QM 项。
  - 可以是 QM 项路径。例如，"\Mouse\Next" 表示文件夹 "Mouse" 中的宏 "Next"。
  - 如果是[子函数](../Language/IDP_DIR_SUB.html)，QM 使用其父函数。要获取当前子函数的名称，使用 [getopt](../Functions/IDP_GETOPT.md)。
- **what** - 要获取的内容：
  | 值 | 描述 |
  |----|------|
  | 0  | 文本。 |
  | 1  | 名称。另见 [getopt itemname](../Functions/IDP_GETOPT.md)。 |
  | 2  | 触发器。为[编码](../Other/IDP_TRIGGER_CODING.md)的触发器字符串，包含触发器（可能带转义序列）、程序和触发器过滤函数。要获取解析的组件或描述，使用 [qmitem](../Functions/IDP_QMITEM.md)。 |
  | 3-8 | 已弃用，使用 [qmitem](../Functions/IDP_QMITEM.md) 代替。 |
  | 3  | 类型。**s** 将为 "0"（宏）、"1"（函数）、"2"（菜单）、"3"（工具栏）、"4"（T.S.菜单）、"5"（文件夹）、"6"（成员函数）、"7"（文件链接）。 |
  | 4  | 禁用状态。**s** 将为 "1"（已禁用）或 "0"（未禁用）。 |
  | 5  | 加密状态。**s** 将为 "1"（已加密）或 "0"（未加密）。 |
  | 6  | 共享状态。**s** 将为 "1"（在共享文件夹中）或 "0"（不在共享文件夹中）。 |
  | 7  | id。 |
  | 8  | 只读状态。**s** 将为 "0"（非只读）、"2"（已加密）、"1"（在只读文件夹中且未加密）。 |

## 备注

获取 QM 项的文本或其他属性。

运行时如果 **macro** 无效，会报错。

某些功能在 [exe](../QM_Help/IDH_MAKEEXE.md#a4) 中不可用。

## 示例

```cpp
str s ss
s.getmacro("Untitled")
ss.getmacro("\Folder\Macro")

int i = qmitem("Untitled")
_s.getmacro(i)
```