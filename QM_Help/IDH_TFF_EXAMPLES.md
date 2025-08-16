# 过滤器函数示例

以下示例展示如何使用 Quick Macros (QM) 的过滤器函数来控制宏的触发行为，基于 [过滤器函数](IDH_TFF.md) 的机制。

## 示例 1：限制宏仅在 Quick Macros 窗口中运行

**需求**：宏 `Macro` 使用触发器 `Ctrl+B`（Cb），仅在 Quick Macros 窗口中生效。

### 步骤

1. 打开宏的 [Properties](IDH_PROPERTIES.md) 对话框，点击 **FF** 按钮。
2. 在 **Filter Function** 对话框中，点击 **Copy**，从下拉列表选择模板 `FFT_Window`，点击 **OK**，再点击 **OK**。
3. 创建新过滤器函数 `FF_Macro`，初始代码为：

   ```qm
   /
   function# iid FILTER&f

   if(wintest(f.hwnd "WindowName" "WindowClass")) ret iid
   ```

4. 编辑代码：
   - 将 `"WindowName"` 替换为 `"Quick Macros"`。
   - 将 `"WindowClass"` 替换为 `"QM_Editor"`（可在 QM 状态栏查看窗口名称和类，鼠标悬停在窗口上时显示）。
   - 推荐仅使用窗口类（除非类不唯一），将不需要的字符串设为空（`""`）。
   - 修改后的代码：

     ```qm
     /
     function# iid FILTER&f

     if(wintest(f.hwnd "" "QM_Editor")) ret iid
     ```

### 结果

过滤器函数允许在 Quick Macros 窗口按 `Ctrl+B` 时运行 `Macro`，其他窗口中则忽略触发。

## 示例 2：根据窗口选择运行不同宏

**需求**：宏 `M1` 在记事本窗口按 `F12` 时运行，宏 `M2` 在 Internet Explorer 窗口按 `F12` 时运行。

### 步骤

1. 不为 `M1` 和 `M2` 分配触发器，而是创建新过滤器函数并为其分配 `F12` 触发器。
2. 创建过滤器函数：
   - 点击 **File -> New -> Templates -> Filter Functions -> FF_Window_Dispatcher**。
   - 打开 **Properties** 对话框，为新函数分配 `F12` 触发器。
   - 在 **Filter Function** 对话框中点击 **Use**，选择新创建的函数，点击 **OK**，再点击 **OK**。
3. 新函数具有 `F12` 触发器和自身作为过滤器函数，初始代码为：

   ```qm
   /
   function# iid FILTER&f

   sel wintest(f.hwnd "Window1[]Window2[]Window3" "" "" 16)
       case 1 ret "Macro1"
       case 2 ret "Macro2"
       case 3 ret "Macro3"
   ```

4. 编辑代码：
   - 将窗口名称替换为 `"Notepad[]Internet Explorer"`。
   - 将宏名称替换为 `"M1"` 和 `"M2"`。
   - 修改后的代码：

     ```qm
     /
     function# iid FILTER&f

     sel wintest(f.hwnd "Notepad[]Internet Explorer" "" "" 16)
         case 1 ret "M1"
         case 2 ret "M2"
     ```

### 结果

按 `F12` 时，过滤器函数根据活动窗口选择运行：
- 在记事本窗口运行 `M1`。
- 在 Internet Explorer 窗口运行 `M2`。