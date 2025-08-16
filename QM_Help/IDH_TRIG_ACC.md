# 触发器：可访问对象

可访问对象触发器在指定的 [可访问对象](IDP_ACCESSIBLE.md) 生成事件时启动宏。通过 [Properties](IDH_PROPERTIES.md) 对话框分配此触发器。

## 概述

可访问对象是窗口中的用户界面元素，如按钮、文本框、列表项、链接、菜单等，也包括非窗口部分的元素，如顶级窗口、插入符号（文本光标）、鼠标指针、声音和警报。可用于触发宏的事件包括：
- 对象创建或销毁
- 对象获得焦点
- 对象状态或位置变化
- 对象属性变化

## 事件日志记录

使用可访问对象事件日志记录来发现事件和对象属性：
1. 右键点击输出面板，选择 **Log -> Acc. events**。
2. 在日志选项对话框中设置过滤器，排除某些事件或对象类型。
3. 日志输出格式为索引字符串，包含：
   ```
   i. event, idObject, idChild
      ow: object window class, id and text
      pw: top-level parent window class and name
      ao: accessible object properties
   ```
   - 若对象为 [顶级窗口](IDP_WINDOWSTYLES.md)，无父窗口，`pw` 行不显示。
   - 在 **Properties** 对话框中，对应字段留空。

## 设置触发器

在 **Properties** 对话框：
- 左侧选择事件类型。
- 右侧输入其他属性：
  - **必需**：至少指定对象窗口类（`ow class`）或/和 ID，以及父窗口类（`pw class`），若类不唯一，需指定父窗口名称。
  - **可选**：对象窗口文本、可访问对象属性（慢于其他字段，仅在必要时使用）。
  - **idChild**：用于标识可访问对象，非子窗口 ID。若为非零值，考虑勾选 **Any nonzero**，因为其值可能不固定。
- 类名需完整或使用通配符（QM 2.3.4 起）；其他字符串可部分匹配，勾选 **Use *** 时需完整或使用 [通配符](IDP_MATCHW.md)。
- 空字段不评估，匹配空字符串使用单个 `*`。

## 调试

若触发器未按预期工作：
1. 在 **Properties** 对话框勾选 **Debug**，点击 **OK**。
2. 重现触发条件，输出面板将显示第一个不匹配的属性（当事件类型、`idObject`、`idChild`、`ow class` 和 `pw class` 匹配时）。

## 接收触发器信息

关闭 **Properties** 对话框时，QM 询问是否插入代码以接收触发器信息：
- `hwnd`：对象窗口句柄。若为子窗口，可用 `int h=GetAncestor(hwnd 2)` 获取顶级父窗口句柄。
- 使用 `Acc` 类的 `ObjectFromEvent` 函数获取可访问对象。

## 注意事项

- **安全性**：记录事件前保存所有程序工作，某些对象的事件可能导致程序崩溃。QM 尝试处理异常以避免崩溃，但不保证成功。特に当获取可访问对象属性时易发生异常，因此除非必要，避免在触发器中使用属性。勾选 **don't get ao properties** 可提高日志记录安全性。
- **限制**：64 位 Windows 上，“destroy”和“hide”事件不可靠。
- **技术基础**：基于 Microsoft Active Accessibility 和 WinEvents，参考 [MSDN](IDP_MSDN.md)（搜索“WinEvents”或“Event Constants”）。

## 示例：Internet Explorer 网页完全加载触发器

**目标**：在 Internet Explorer (IE) 打开并完全加载网页时触发宏。

1. **记录事件**：
   - 打开 IE，切换到 QM，右键输出面板，选择 **Log -> Acc. events**，点击 **OK**。
   - 在 IE 中打开网页（如 Google），切换回 QM，停止日志记录（再次点击菜单项）。
   - 查找适合触发的事件，例如（可能因 IE 版本不同）：
     ```
     .... CREATE, WINDOW, 0
     ow: class="Internet Explorer_Server", id=0
     pw: class="IEFrame", name="Google - Microsoft Internet Explorer"
     ao: role=PANE, state=0x100040, name="Google", value="http://www.google.com/"
     ```

2. **设置触发器**：
   - 打开 **Properties** 对话框，选择 **Accessible object**，事件为 **CREATE**。
   - 输入：
     - 对象窗口类：`Internet Explorer_Server`
     - 父窗口类：`IEFrame`
     - 父窗口名称（可选）：`Internet Explorer`
     - 角色：选择 **PANE**（在 **Role** 下拉框）
     - 除非仅针对特定网页，`Name` 和 `Value` 留空。
   - 点击 **OK**，选择插入触发器属性代码。

3. **编写宏代码**：
   - 取消第二行代码的注释（删除行首空格）。
   - 使用 `Acc` 类的 `ObjectFromEvent` 获取可访问对象，`Value` 属性包含网页 URL。
   - 使用 **Accessible Object Actions** 对话框插入获取 `Value` 的代码。示例：

     ```qm
     function hwnd idObject idChild
     Acc a.ObjectFromEvent(hwnd idObject idChild)
     str value=a.Value
     out value
     ```