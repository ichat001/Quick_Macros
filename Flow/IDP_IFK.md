# 如果按下按键

## 语法

```qm
ifk[-] keycode [toggled]
    statements
    ...
[else
    statements
    ...]
```

也可以写成单行：

```qm
ifk[-](keycode [toggled]) statements
[else statements]
```

## 参数

- **keycode** - [QM 按键代码](IDP_KEYCODES.md)。
  - 也可以是括号中的 [虚拟按键代码](IDP_VIRTUALKEYS.md)。
  - 也可以是括号中的鼠标按钮：(1) 左键，(2) 右键，(4) 中键，(5) X1，(6) X2。
  - 可以是两个按键，检查两者是否同时按下。
  - 对于逗号，使用 `<`，而不是 `,`。
- **toggled** - 如果非零，检查按键是否处于切换状态。

### 选项

| 选项 | 描述 |
|------|------|
| - | 非（按键未按下）。 |

## 说明

类似于 [if](IDP_IF.md)。

如果指定的按键被按下，则执行 `ifk` 后的 **statements**，并跳过 `else` 后的 **statements**（如果存在）。否则，跳过 `ifk` 后的 **statements**，并执行 `else` 后的 **statements**（如果存在）。

并非所有按键和组合都能正确检测。例如，在某些操作系统上无法测试 Pause 键。

[UAC](IDP_VISTA.md)：如果活动窗口的完整性级别高于当前程序（例如 QM 为标准用户，窗口为管理员），`ifk` 仅对部分按键有效：修饰键（Ctrl、Shift、Alt、Win）、锁定键（CapsLock、NumLock、ScrollLock）、Back、Tab、Enter、Esc 和鼠标按钮。

`ifk` 仅能可靠检查锁定键的切换状态。其他按键的切换状态特定于进程或线程。

`ifk` 内部使用 QM 函数 [RealGetKeyState](IDP_QMDLL.md#RealGetKeyState)，您可以直接使用该函数代替 `ifk`。

QM 2.3.3 起，可用作函数。如果按键被按下，返回 1；否则返回 0。

**另见**： [GetMod](IDP_QMDLL.md#GetMod)

## 示例

```qm
ifk(F2) bee ;;如果按下 F2 键，发出蜂鸣声
ifk(K 1) key K ;;如果 CapsLock 处于切换状态，按 CapsLock
ifk((1)) bee ;;如果按下鼠标左键，发出蜂鸣声

;; 重复执行代码；按下 F12 键时停止
rep
    ...
    ifk(F12) break

;; RealGetKeyState 示例
if RealGetKeyState(VK_SHIFT) and RealGetKeyState(VK_LBUTTON)
    out "Pressed Shift key and mouse left button"

;; 用作函数
if(ifk(C) and !ifk(S) and ifk(J 1)) out "Ctrl pressed, Shift not, ScrollLock toggled"
```