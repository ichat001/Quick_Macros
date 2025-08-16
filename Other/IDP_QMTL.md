# 解锁计算机

某些触发器（调度器、文件、事件日志、进程）可能在 QM 未在当前活动用户会话/桌面运行时启动宏。例如，计算机可能被锁定（手动或通过安全屏幕保护程序）、用户未登录、用户被切换、或使用自定义桌面。此时，宏在后台运行，无法使用键盘、鼠标及其他一些函数。

## 配置

为确保宏仅在正常条件下运行，勾选 **Properties -> Macro properties -> "Don't run in background"**，这还会关闭非安全屏幕保护程序。

若同时勾选 **"If computer locked, unlock"**，QM 会在宏启动时解锁计算机（如果已锁定），并关闭屏幕保护程序。宏结束时，QM 可重新锁定计算机。此功能在 [便携式 QM](IDP_PORTABLE.md) 中不可用。

首次使用此功能需配置。点击 **"How to unlock computer..."** 按钮打开配置对话框，输入 Windows 用户账户密码。若密码更改，需在此更新。可设置按键及其他选项。

## 解锁按键

QM 使用配置对话框中指定的按键进行解锁，按键格式与 [key](IDP_KEY.md) 相同。例如：`T` 表示 Tab，`Y` 表示 Enter，`Au` 表示 Alt+U，`(1.0)` 表示 1 秒延迟，`"Text"` 表示按简单文本输入等。部分 `key` 功能（如 `VK_` 和 `(#n)`）不支持。使用 `(USERNAME)` 和 `(PASSWORD)` 输入配置对话框中指定的用户名和密码。

**示例**：

1. **Windows XP**（显示用户名和密码字段的对话框）：

```
Au (USERNAME) Ap (PASSWORD) Y
```

2. **Windows XP 欢迎界面**（初始显示密码字段）：

```
(PASSWORD) Y
```

3. **Windows XP 欢迎界面**（初始不显示密码字段，用户 1、2、3 示例）：

```
TT (PASSWORD) Y
TTD (PASSWORD) Y
TTDD (PASSWORD) Y
```

4. **Windows Vista/7**（用户 1、2、3 示例）：

```
V (1.0) B (PASSWORD) Y
R V (1.0) B (PASSWORD) Y
RR V (1.0) B (PASSWORD) Y
```

5. **Windows Vista/7**（初始显示密码字段）：

```
(PASSWORD) Y
```

6. **Windows 8/8.1**：

```
Z (0.5) Z (1.5) (PASSWORD) Y
```

7. **Windows 10**：

```
Z (1.5) (PASSWORD) Y
```

8. **Windows 11**：

```
Z (PASSWORD)
```

## 替代方法（QM 2.3.5+）

可使用程序解锁计算机，从宏创建该程序。程序可执行任意操作（如评估条件、发送按键、点击、等待、使用窗口和可访问对象函数等），失败时返回非零值。示例：

```qm
Acc a.Find(win "TEXT" "" "class=Edit" 0x1005) ;; 查找密码字段
err
    key Y
    2
    a.Find(win "TEXT" "" "class=Edit" 0x1005)
    err
        LogFile "no password field" 0 "qmtul.log"
        ret 1 ;; 错误
act child(a) ;; 设置焦点
key "password" Y

;; 注意：out 不起作用，使用 LogFile
```

## 注意事项

1. 配置对话框中的选项对所有宏通用。
2. 此功能对安全性影响最小，密码加密保存。临时解锁期间，键盘和鼠标被禁用，无法访问计算机。按 Ctrl+Alt+Delete 会立即锁定计算机。
3. QM 仅在计算机锁定（手动或通过安全屏幕保护程序）时尝试解锁。若未登录、其他用户活动或使用其他桌面，宏不会运行。
4. 计算机临时解锁期间，勾选“不在后台运行”的宏无法运行，需等待重新锁定并解锁（若勾选“若锁定，临时解锁”）或不运行。
5. 日志文件可用于查找问题，无大小限制。
6. 可使用 [EnsureLoggedOn](IDP_QMDLL.md#EnsureLoggedOn) 函数。
7. 不支持 [Unicode](IDP_UNICODE.md)。用户名、密码、按键和文件名必须为 ANSI。
8. 在 Windows XP 上，以下情况解锁失败：
   - 切换到其他用户并注销后。
   - 通过远程桌面锁定。
9. 在 Windows Vista 及更高版本，若修改安全设置，可能无法发送 Ctrl+Alt+Delete。修复方法：运行 `gpedit.msc`，打开 **Computer Config -> Admin Templates -> Win Components -> Win Logon Options -> Disable or Enable Software SAS**，启用 **Ease of Access Apps**。
10. 在 Windows XP、Vista、7、8、8.1、10、11 上测试，可能不适用于更高版本。

## 测试解锁宏

```qm
shutdown 6 ;; 锁定
wait 10
int unlocked=EnsureLoggedOn(1)
out "unlocked=%i" unlocked ;; 应为 2
if(!unlocked and fileExists("$qm$\qmtul.log")) run "$system$\notepad.exe" "$qm$\qmtul.log"
```