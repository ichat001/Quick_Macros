# 触发器：用户定义

Quick Macros (QM) 支持扩展新的触发器类型。本文档为程序员提供创建用户定义触发器的指导。用户定义触发器可完全通过用户定义函数实现，或部分通过 DLL 或 COM 组件实现，并可集成到 **Properties** 对话框，方便其他 QM 用户下载、导入并像内置触发器一样使用。

## 创建触发器

用户定义触发器可通过以下方式实现：
- **Windows API**：使用 Windows API 函数接收事件通知，参考 [MSDN Library](IDP_MSDN.md)。
- **定时检查**：使用 [rep](IDP_REP.md) 和 [wait](IDP_WAIT.md) 每隔一段时间（如 1 秒）检查条件。
- **COM 组件**：利用互联网上的 [COM 组件](IDH_COM.md) 接收 [COM 事件](IDP_COM_EVENTS.md)，如 WMI 提供的通知。

### 主触发器函数
- 主触发器函数应在 QM 文件加载时启动并持续运行。
- 可通过以下方式启动：
  - 设置“QM file loaded”触发器（需取消勾选“Run synchronously”）。
  - 从触发器管理函数使用 [mac](IDP_MAC.md) 启动。
- 在启动宏前，需调用 [dis](IDP_DIS.md) 检查宏和用户定义触发器是否启用，例如：

  ```qm
  if(dis(macro) or dis&16) ret
  ```

### 实现方式
- **DLL**：某些触发器需使用 DLL，因为通知函数在其他进程上下文中调用。
- **QM 函数**：大多数通知可通过 QM 用户定义函数实现，QM 语言足以创建无需 DLL 或驱动程序的触发器。

## 与 QM 集成

通过创建触发器管理函数并分配“Trigger management”触发器，可将用户定义触发器集成到 QM，方便用户使用。

### 触发器字符串格式

触发器字符串显示在工具栏的 **Trigger** 字段，格式为：

```qm
^Trigger_type trigger_data
```

- **Trigger_type**：触发器管理函数名称。
- **trigger_data**：触发器定义的字符串，可选，仅由触发器引擎使用。

### 触发器管理函数

触发器管理函数格式：

```qm
function# unused1 unused2 action UDTRIGGER&p
```

- **unused1, unused2**：始终为 0。
- **action**：数值，表示调用目的。
- **p**：`UDTRIGGER` 类型变量，用于交换信息。

#### QM 调用触发器管理函数的场景

1. **选择触发器类型（action=1）**
   - **p.iid**：[QM 项 ID](IDP_QMITEM.md)。
   - **p.hwnd**：**Properties** 对话框中“Trigger”属性页的窗口句柄。
   - **p.tdata**：旧触发器数据字符串（若宏无此类型触发器则为空，为 `""` 表示无触发器数据）。
   - **功能**：创建并初始化触发器属性页，返回其窗口句柄。属性页需为模态对话框，`p.hwnd` 的子窗口，使用 `ShowDialog(x x x p.hwnd 1 WS_CHILD)`。若无属性页，返回 0，QM 提供默认页面输入触发器数据字符串。

2. **关闭 Properties 对话框（OK，action=2）**
   - 仅当触发器引擎提供属性页时调用。
   - **p.iid**：QM 项 ID。
   - **p.hwnd**：action 1 返回的属性页句柄。
   - **p.tdata**：空。
   - **功能**：从属性页控件收集数据，格式化新触发器数据字符串并存入 `p.tdata`，暂不应用更改。返回：
     - 0：触发器设置成功。
     - 1：未设置触发器。
     - 2：不关闭 **Properties** 对话框。

3. **验证新触发器字符串（action=3）**
   - 在添加或更改触发器后调用。
   - **p.iid**：QM 项 ID。
   - **p.hwnd**：0。
   - **p.tdata**：新触发器数据字符串。
   - **功能**：验证触发器数据字符串，可修改字符串，暂不应用更改。返回：
     - 1：字符串有效。
     - 0：字符串无效。

4. **应用所有此类型触发器（action=4）**
   - 在文件打开、触发器添加/更改/删除、宏删除等情况下调用。
   - **p.iids**：包含此触发器类型的宏 ID 数组。
   - **p.niids**：数组元素数量。
   - **功能**：移除旧触发器，应用 `p.iids` 中宏的触发器（如重建内部触发器表）。使用 [str.getmacro](IDP_S_MACRO.md) 或 [qmitem](IDP_QMITEM.md) 获取触发器字符串。

5. **显示触发器类型图标（action=5）**
   - **功能**：返回图标句柄或 0，QM 销毁图标。

6. **用户请求帮助（action=6）**
   - **功能**：提供帮助（如显示消息框或打开网页），返回 0。

7. **QM 或项启用/禁用（action=7/8）**
   - **action**：7（启用）或 8（禁用）。
   - **p.iid**：QM 项 ID 或 0。
   - **功能**：通常返回 0。若需重建触发器表，返回 1，QM 将稍后以 action=4 调用。

#### 要求
- 必须实现 action 3 和 4，其他 action 可返回 0。
- 函数在 QM 主线程运行，若启动触发器引擎，需使用 [mac](IDP_MAC.md) 创建新线程，避免在 QM 主线程运行触发器，以免影响 QM 稳定性。
- 函数自身被更改（禁用、启用、删除、触发器添加/移除/更改）时不被调用。
- 若函数禁用，不被调用且不出现在 **Properties** 对话框，但其触发器类型不会自动禁用。

## 示例

参考 [QM 论坛](http://www.quickmacros.com/forum/viewtopic.php?f=2&t=3368) 中的用户定义触发器示例。