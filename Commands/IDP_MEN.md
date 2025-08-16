# 点击菜单项或获取状态

## 语法

### 语法 1 - 点击
```
men[+] menuid|menupath [window]
```

### 语法 2 - 获取状态
```
int men(menuid|menupath [window])
```

## 参数

- **window** - 包含菜单的[顶级窗口](../Other/IDP_WINDOWEXPRESSION.md)。默认值：活动窗口。
- **menuid** - 菜单项标识符（整数）。
- **menupath** - 菜单项路径，如 "&File\&Open"。
  - 路径中的菜单项标签可为部分文本，但需从开头开始。
  - 下划线字符需前缀 &，可通过键盘（如 Alt）显示菜单以查看下划线字符。

### 选项

| 选项 | 描述 |
|------|------|
| + | 系统菜单（右键窗口标题栏显示的菜单） |

## 备注

### 语法 1
模拟菜单点击，发送 WM_COMMAND 或 WM_SYSCOMMAND 消息。通常即使窗口未激活或隐藏也能工作。但对大多数非标准菜单（尤其是使用 **menupath** 时）无效。

可录制菜单命令以获取菜单项 ID：点击菜单 Tools -> Record Menu 启动录制。并非所有菜单都可录制，若无法录制，则 `men` 无法用于该菜单。

点击速度取决于 [spe](IDP_SPE.md)。

### 语法 2
返回菜单项状态，为 [MF_... 标志](../Other/IDP_FLAGS.md) 的组合（如 MF_CHECKED），详见 [MSDN 文档](../Other/IDP_MSDN.md)。菜单项状态通常在显示菜单前更新，因此需先通过 `key` 临时显示菜单，再调用 `men` 获取准确状态。

## 示例

```cpp
// 在“Notepad”窗口中点击 ID 为 3 的菜单项
men 3 "Notepad"

// 在“Notepad”窗口中点击“Select All”菜单
men "&Edit\Sel" "Notepad"

// 在类名为“HH Parent”的窗口中点击 Options->Font->Large 菜单
men "&Options\&Font\&Large" "+HH Parent"
```