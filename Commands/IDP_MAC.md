# 运行宏

## 语法

### 作为语句
```
mac[+|-] [macro] [command] [a1 ...]
```

### 作为函数
```
int mac([macro] [command] [a1 ...])
```

## 参数

- **macro** - [QM 项目](../QM_Help/IDH_ITEMS.md)名称（完整，不区分大小写）或 [id](../Functions/IDP_QMITEM.md)（整数）。
  - 若省略或为 ""，运行代码编辑器中当前打开的 QM 项目。
  - 可为 QM 项目路径，如 "\Mouse\Next" 表示文件夹 "Mouse" 中的宏 "Next"。
  - 可为[子函数](../Language/IDP_DIR_SUB.md)，如 "sub.SubFunctionName"，但不可为变量。
- **command** - 字符串或数字，解释方式取决于项目类型，默认值：""。
  | 项目类型 | command 解释 |
  |----------|--------------|
  | 宏或函数 | 存储到 [_command 变量](../Language/IDP_SPECVAR.md)。 |
  | [工具栏](../QM_Help/IDH_TOOLBAR.md) | 关联的窗口，可为窗口名称或句柄。若窗口不存在，不报错，工具栏不创建。 |
  | 菜单 | 菜单项标签，直接执行该项而非显示菜单。 |
  | 其他 | 未使用。 |
- **a1 ...** - 传递给 **macro** 的参数，通过 [function 语句](../Language/IDP_FUNCTION.md) 接收。

### 选项

| 选项 | 描述 |
|------|------|
| 默认 | 运行 **macro**。 |
| + | 在编辑器中打开 **macro**（不运行）。 |
| - | 结束当前[线程](../Other/IDP_THREADS.md)并运行 **macro**。 |

## 备注

- 启动 **macro**，与[函数调用](https://quickmacros.com/help/Commands/..%5CLanguage%5CIDH_FUNCTIONS.html)不同，**macro** 在独立的[线程](../Other/IDP_THREADS.md)中异步运行。
- **注意**：部分功能在 [exe](../QM_Help/IDH_MAKEEXE.md#a4) 中不可用。
- 若 **macro** 不存在，执行 `mac` 语句时会报错；若为[子函数](../Language/IDP_DIR_SUB.md)，则在编译时报错。
- 支持的 [QM 项目](../QM_Help/IDH_ITEMS.md) 类型：除文件夹和成员函数外的所有类型。
- 作为函数时，`mac` 的返回值取决于项目类型：
  | 项目类型 | 返回值 |
  |----------|--------|
  | 宏或函数 | 线程句柄，可用于 [wait](IDP_WAIT_FOR.md) 等待线程结束（见示例），不要关闭句柄。 |
  | 工具栏 | 工具栏窗口句柄，详见[工具栏说明](../QM_Help/IDH_TOOLBAR.md)。 |
  | 菜单 | 若以函数形式调用（如 `variable=mac("menu")`），等待菜单关闭，返回非零值（若点击菜单项）或 0（未点击），详见[菜单说明](../QM_Help/IDH_POPUP.md)。若以语句形式调用（如 `mac "menu"`），不等待。 |
  | 文件链接 | 具有该文件类型“file link run”触发器的函数的线程句柄。 |
  | 其他 | 0 |
- 若 **macro** 和当前线程均为[宏](../QM_Help/IDH_MACRO.md)（非函数等）且未启用“Run simultaneously”选项，**macro** 在当前线程结束后启动，此时 `mac` 返回 0。
- `mac` 不等待新线程结束。在 exe 中，主线程结束时其他线程也会终止，可使用 `wait 0 H` 或 `WaitForThreads` 等待。

### 提示
- 可通过拖放快速插入 `mac` 语句。

另见：[函数](https://quickmacros.com/help/Commands/..%5CLanguage%5CIDH_FUNCTIONS.html)、[net](IDP_NET.md)、`EndThread`、`RunTextAsFunction`、[wait for thread](IDP_WAIT_FOR.md)、[查找宏](../Functions/IDP_QMITEM.md)、[创建宏](../Functions/IDP_NEWITEM.md)。

## 示例

```cpp
mac "Macro5" ;;运行宏“Macro5”
mac "\Folder\Macro5" ;;运行文件夹“Folder”中的“Macro5”
mac- "Macro5" "a" ;;结束当前宏并运行“Macro5”，传递字符串“a”作为 command
mac "Func" "" "some string" 1 55.5 ;;运行函数“Func”，传递三个参数
mac "sub.Sub1" ;;在独立线程中运行子函数 Sub1

// 获取“Macro5”的 id 并运行
int i = qmitem("Macro5")
mac i

// 若“Notepad”窗口存在，创建工具栏“TB”并关联
mac "TB" win("Notepad")

// 在独立线程中运行函数“Function1”并等待其结束
int hThread=mac("Function1")
wait 0 H hThread

// 调用函数 Function1（不创建新线程）
Function1
```