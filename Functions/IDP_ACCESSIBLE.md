# 可访问对象

**另见**：[acc](IDP_ACC.md)

## 概述
除了操作窗口，还可以操作窗口中的用户界面（UI）对象。大多数 UI 对象是子窗口（控件），可通过句柄识别，使用 [id](IDP_ID.md) 或 [child](IDP_CHILD.md) 函数获取句柄。但并非所有对象都是子窗口，例如网页中的链接等对象无法通过 `id` 或 `child` 找到。此时，可使用可访问对象。

## 可访问对象与 Acc 类
可访问对象是可以通过 [COM 接口](../_COM/IDH_COM.md) `IAccessible` 操作（查找、点击等）的 UI 对象（如按钮、链接等），由 Microsoft® Active Accessibility® (MSAA) 提供支持。

QM 使用 `Acc` 类存储可访问对象的引用，定义如下：
```cpp
class Acc IAccessible'a elem
```
- **a**：指向对象 `IAccessible` 接口的指针。
- **elem**：子元素 ID，通常为 0，用于简单元素对象（如列表项）。

`Acc` 类变量可完全标识可访问对象，无论是完整对象还是简单元素。

## 函数
- **查找对象**：使用 `Acc.Find` 或 [acc](IDP_ACC.md) 初始化 `Acc` 变量，配合“Find Accessible Object”对话框生成代码。
- **操作对象**：`Acc` 类提供函数操作对象，使用“Accessible Object”对话框生成代码。通用语法：
  ```cpp
  [result = ]a.Function([parameters])
  ```
  示例：
  ```cpp
  int w=win("QM TOOLBAR" "QM_toolbar")
  Acc a.Find(w "PUSHBUTTON" "Windows, controls" "class=ToolbarWindow32[]id=9999" 0x1005)
  err ret ;;若未找到则返回。若无标志 0x1000，改用：if(!a.a) ret
  str name=a.Name
  a.DoDefaultAction
  ...
  ```
- **错误处理**：函数失败时抛出错误，需了解[错误处理](../Flow/IDP_ERR.md)。不同类型的可访问对象支持的函数不同，需调用支持的函数或处理错误。
- **IAccessible 接口**：可通过 `Acc` 变量的 `a` 成员调用 `IAccessible` 接口函数，必要时使用 `elem`。示例：
  ```cpp
  Acc a.Find("Quick Macros" "MENUITEM" "Tools" "class=ToolbarWindow32")
  out a.a.KeyboardShortcut(a.elem)
  ```

## “Find Accessible Object”对话框提示
### 捕获对象
1. 拖动“Drag”工具，释放到目标对象上。拖动时可右键切换窗口。
2. 右键“Drag”工具，选择“Capture when Shift pressed”，将鼠标移到对象上，按 Shift 键。

### 测试与调整
- 捕获后点击 Test 按钮。若提示“Object not found”，调整对话框中的值。
- 若找到错误对象，尝试捕获附近对象，测试后勾选 Navigate，输入[后导航字符串](IDP_ACC.md)（如 `pa n2 c15 f`，表示获取父对象、向前导航两次、获取第 15 个子对象、获取第一个子对象）。
- 若搜索时间过长，尝试勾选“in reverse order”或“as Firefox node”。
- 坐标 (x, y) 为窗口客户区坐标。
- 对话框底部显示对象树，展示窗口中的可访问对象、属性和关系，默认不显示不可见和无用对象（不可见对象显示为灰色）。
- 可通过 Ctrl+Alt+Shift+W 打开对话框（热键可在 Options 中修改）。若当前窗口为置顶样式，对话框也置顶。
- 在 Windows 8 全屏窗口中捕获对象，需将对话框设为置顶（用 Ctrl+Alt+Shift+W 打开或右键“Drag”工具），QM 需以 Administrator 或 uiAccess 权限运行（在 Options 中设置），或使用 Shift 捕获。

## 在网页中使用
支持 Internet Explorer、Firefox、Chrome 和 Opera 的网页可访问对象。

### Chrome 和 Opera
- 默认禁用可访问对象，QM 会在需要时尝试启用。若失败，可尝试：
  - 在 QM Options 勾选“Enable Chrome acc when it starts”（仅在 Chrome 进程启动时 QM 运行有效）。
  - 使用命令行 `--force-renderer-accessibility` 启动 Chrome。
  - 在 exe 中无法使用第一个选项，可参考[论坛实现](http://www.quickmacros.com/forum/viewtopic.php?f=2&t=7168)。
- 当前 Opera 版本与 Chrome 一致。

### Firefox
- 默认禁用可访问对象，程序尝试获取时 Firefox 会启用。可能需重启 Firefox 或在 Firefox Options 中禁用多进程模式。

### 注意事项
- 启用浏览器可访问对象可能减慢大型网页加载速度。
- 浏览器更新可能引入新功能或错误，导致 QM 函数失效。建议：
  - 下载最新 QM 版本。
  - 在[论坛](http://www.quickmacros.com/forum/index.php)报告错误。
  - QM 修复后，需用新版本重建 exe 文件。
- 浏览器可访问对象实现可能有错误，如对象位置不正确，或某些对象被较大对象遮挡无法捕获。此时可尝试：
  - 正常捕获一次。
  - 在“Drag”工具右键菜单勾选“Capture smallest”，再次捕获。

### 替代方案
- **Internet Explorer 及基于 IE 的浏览器**：使用 [htm](IDP_HTM.md) 查找 HTML 元素，通常更快。
- **Firefox、Chrome、Opera**：在“Find Accessible Object”对话框勾选“as Firefox node”（Chrome 和 Opera 需安装相同位数的 Firefox）。
- 若以上均无效，可使用 `scan`（查找图像）。

## Java 窗口
QM 2.4.2 起，`acc` 和 `Acc` 类函数支持使用非 Windows 控件的 Java 应用程序（如 OpenOffice、LibreOffice、NetBeans、jEdit、控制面板中的 Java）的可访问对象。

### 前提条件（除 OpenOffice 和 LibreOffice 外）
- Java 版本 7.6 或更高。
- 启用 Java Access Bridge (JAB)，默认禁用。
- 旧版 Java (<7.6) 需单独下载 JAB，安装较复杂。

### 启用 JAB
- 运行 `JavaEnableJAB` 函数（每台电脑/账户一次）。
- 或运行 `jabswitch.exe -enable`。
- 或在控制面板 -> 轻松访问 中启用。
- 启用后需重启 Java 应用程序，安装 Java 后可能需重启 QM。

### OpenOffice 和 LibreOffice
- 当前版本无需 JAB。
- 旧版本需启用 JAB，并在 Options -> Accessibility 中勾选“Support assistive technology tools”。

### 64 位 Java 注意事项
- 若仅安装 64 位 Java，JAB 默认无效，因缺少 `C:\Windows\SysWOW64\WindowsAccessBridge-32.dll`。
- 解决方法：
  - 安装 32 位 Java（可与 64 位 Java 共存）。
  - 获取 `WindowsAccessBridge-32.dll`（仅 JAB 2.0.2 可单独下载）并放入 SysWOW64 或 QM 文件夹。

### JAB 限制
- 部分功能不稳定，如获取焦点对象常失效，某些窗口无法通过 x y 获取对象。
- 捕获此类窗口对象时，在“Find Accessible Object”对话框右键“Drag”工具，勾选“Capture smallest”。
- QM 不支持 Java 窗口的 JAB 可访问对象触发器。