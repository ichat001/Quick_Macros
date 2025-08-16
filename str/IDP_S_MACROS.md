# 替换宏文本

注意：在 [exe](../QM_Help/IDH_MAKEEXE.md) 中不可用。

## 语法

```
s.setmacro([macro])
```

## 参数

- **s** - str 变量。
- **macro** - [QM 项](../QM_Help/IDH_ITEMS.md)名称（完整名称，不区分大小写）或[id](../Functions/IDP_QMITEM.md)（整数）。
  - 如果省略或为 ""，则为当前在代码编辑器中打开的 QM 项。
  - 可以是 QM 项路径。例如，"\Mouse\Next" 表示文件夹 "Mouse" 中的宏 "Next"。
  - 如果是[子函数](../Language/IDP_DIR_SUB.html)，QM 使用其父函数。

## 备注

替换 QM 项的文本。

该项不得为只读。

如果该项当前已打开（在“打开项”列表中），用户可以撤销操作。

另见：[getmacro](IDP_S_MACRO.md)、[newitem](../Functions/IDP_NEWITEM.md)。