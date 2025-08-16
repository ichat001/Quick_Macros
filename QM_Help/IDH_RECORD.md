# 录制

Quick Macros 支持录制键盘按键、鼠标点击和鼠标移动。

## 开始和结束录制

- **开始录制**：点击工具栏上的 **Record** 按钮，或按 **Ctrl+Shift+Alt+R**。
- **结束录制**：在 **QM Recording** 窗口中点击 **Insert** 或 **...** 按钮。

## QM Recording 窗口的录制选项

### 复选框

- **Keys**：录制键盘事件（生成 [key](IDP_KEY.md) 命令）。
- **Mouse**：录制鼠标点击（生成 [lef](IDP_LEF.md)、[rig](IDP_RIG.md)、[mid](IDP_MID.md)、[dou](IDP_DOU.md) 命令）。
- **Drag**：录制鼠标按下时的移动（生成 [mou](IDP_MOU.md) 命令）。
- **Move**：录制鼠标未按下时的移动（生成 [mou](IDP_MOU.md) 命令，排除首个和最后一个其他事件前的移动）。
- **"text"**：将文本键码转换为字符。例如，输入 "New York" 录制为 `"New York"`，未勾选则录制为键码 `SnewVSyork`（`S` 为 Shift，`V` 为空格）。注意：某些情况下可能录制错误字符，因活动窗口对按键的解释不同。
- **Images**：录制鼠标点击时捕获截图（小图像），在代码编辑器中显示。详情见 [Options](IDH_SETT_GENERAL.md)。

### 鼠标坐标相对位置

选择录制坐标的参照：
- 窗口（通常为客户区坐标，较可靠）
- 控件（子窗口）
- 屏幕

### 速度

- **Fast**：不录制暂停，宏运行可靠，但有时需插入 [wait](IDP_WAIT.md) 或调整宏速度（[spe](IDP_SPE.md)）。
- **Slow**：与 **Fast** 相同，但添加 [opt slowkeys 和 opt slowmouse](IDP_OPT.md)，宏运行较慢。
- **Real**：录制暂停（除大多数按键间暂停外）。
- **Variable**：录制暂停（同 **Real**），乘以变量 `F`。可调整 `F` 改变宏速度，例如 `F=0.25` 使宏运行快 4 倍。

### Insert 和 ... 按钮

- **Insert**：将录制代码插入当前宏的当前位置。
- **Replace all text**：用录制代码替换当前宏文本。
- **Create new macro**：创建包含录制代码的新宏。
- **Replace text of macro "temp"**：打开或创建名为 "temp" 的宏，并用录制代码替换其文本，可用于录制临时宏。

## 快速录制单一命令

无需进入录制模式，可通过以下方式插入单一命令：

- **Ctrl+Shift+Alt+W**：全局热键（可在 **Options** 中更改），录制 [win](IDP_WIN.md)、[child](IDP_CHILD.md)/[id](IDP_ID.md)、[wait](IDP_WAIT.md)、[act](IDP_ACT.md) 或 [lef](IDP_LEF.md)，从鼠标位置获取窗口/控件/坐标。
- **菜单命令 ([men](IDP_MEN.md))**：点击 **Tools -> Record Menu**，然后点击要录制的菜单项。
- **文件路径或网络链接 ([run](IDP_RUN.md), [web](IDP_WEB.md))**：从桌面、开始菜单、文件夹窗口或浏览器拖放。
- **运行宏命令 ([mac](IDP_MAC.md))**：从列表拖放 QM 项目（宏、菜单等）。