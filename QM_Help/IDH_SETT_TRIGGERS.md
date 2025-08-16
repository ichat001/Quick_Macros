# 选项：触发器

触发器是启动宏的事件（如热键）。

## 活跃触发器

**Active triggers**：设置 QM 在“启用”状态（蓝色托盘图标）和“禁用”状态（灰色托盘图标）时启用的触发器类型。

- [QM 事件](IDH_TRIG_QM.md) 类型的触发器始终启用。
- 若取消勾选 **Autotext lists**，所有 [自动文本列表](IDH_TSM.md) 将无效，无论触发器如何。

## 使用低级钩子

**Use low-level hook**：通常提高触发器可靠性，并使触发器在所有 Windows 版本的控制台窗口中生效。

- **Keyboard**：用于 [键盘](IDH_TRIG_KEY.md) 触发器，允许抢占 Windows（Win+F 等）或应用程序的热键。但可能与使用直接输入或原始输入的 QM 扩展不兼容。
- **Mouse**：用于 [鼠标](IDH_TRIG_MOUSE.md) 触发器。若鼠标指针偶尔停止移动，可取消勾选。
- **Other**：用于 [窗口](IDH_TRIG_WINDOW.md) 和 [可访问对象](IDH_TRIG_ACC.md) 触发器。通常不勾选。若发现与某些应用程序不兼容，可尝试勾选，但“销毁”触发器可能不可靠。

## 鼠标灵敏度

**Mouse sensitivity**：调整鼠标移动触发器所需的幅度和速度。

## 系统

**System**：打开系统 **Mouse Properties** 对话框。

- **推荐设置**：鼠标指针和硬件设置为中或高速度，无加速或低加速，中或高采样率。

## 自动文本列表：附加非分隔符字符

**Autotext list: additional non-delimiter characters**：为 [自动文本列表](IDH_TSM.md) 指定额外的非分隔符字符。

- 默认字符为所有字母数字字符。
- 示例：若需添加 `_` 和 `#`，在此字段输入 `_#`。