# 编译器指令：#compile

## 语法

```qm
#compile[+|*] "macro"
```

## 参数

- **macro**：宏或函数的名称，也可是 [子函数](IDP_DIR_SUB.html)，如 `"sub.SubName"`。

## 选项

| 选项 | 说明 |
|------|------|
| `+` | 表示 **macro** 为文件夹，编译该文件夹中的所有项目。若 **macro** 为 `"sub"`，则编译所有子函数。 |
| `*` | 编译并执行 **macro**：<ul><li>**macro** 必须为用户定义函数或子函数，在编译时于 QM 主线程运行。</li><li>适用于设置全局或环境变量，供当前宏编译时使用（如结合 `#if`）。</li></ul> |

## 备注

- **功能**：对指定 **macro** 进行 [编译](IDH_DEBUG.html)，仅编译不“包含”或调用。若已编译则无操作。通常用于编译包含 [声明](IDP_DECLARATION.html) 的宏或函数。
- **相关内容**：
  - [ref](IDP_REF.html)
  - [CompileAllItems](IDP_QMDLL.html#CompileAllItems)

## 示例

```qm
#compile "toolhelp"
```