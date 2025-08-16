# 命令行参数

Quick Macros (QM) 支持通过命令行参数、快捷方式、任务计划程序或发送消息来运行宏。以下详细说明相关功能。

## 1. <a name="command-line"></a>命令行

其他程序可通过命令行参数运行 QM 宏。在 **Properties** 对话框中点击 **Cmdline** 按钮生成当前宏的命令行。

### 命令行语法

```qm
[V] [E] [S] [Q c] [T] [N "networkfile"] [L[I] "file"] [M[S] "macro" ["command"]] [[C command] | [A[(sep)] arguments]]
```

- **灰色符号**（`[]` 和 `|`）仅用于表示语法：
  - `[]`：可选参数。
  - `|`：逻辑“或”。
- 引号（`""`）必须使用，参数内不可包含引号。
- 参数顺序任意，除 `C` 和 `A` 需在最后。
- 使用 `qmcl.exe`（而非 `qm.exe`）传递命令行，`qmcl.exe` 快速启动、传递参数后立即退出。`qm.exe` 支持部分参数（`MS`、`N`、`T` 仅限 `qmcl.exe`）。

### 参数说明

| 参数 | 描述 |
|------|------|
| `V` | 显示 QM 窗口。 |
| `E` | 宏结束后若 QM 未运行则退出 QM。**提示**：可将宏转为 exe 并用命令行运行。 |
| `S` | 表示 QM 在 Windows 启动时运行，用于“Windows 启动”触发器。 |
| `Q c` | 使用字符 `c` 替代 `"` 括住字符串，例如 `Q ^ M ^Macro^` 等价于 `M "Macro"`。 |
| `L "file"` | 打开指定的 [QM 文件](IDH_QML.md)。<ul><li>`LI`：导入文件。</li><li>参考 [SilentImport](IDP_QMDLL.md#SilentImport)。</li><li>若为 `LI` 或文件不在近期文件列表（**File** 菜单），在文件查看器中打开。</li></ul> |
| `M "macro" "command"` | 运行宏。<ul><li>`macro`：宏名称或 [GUID](IDP_GUID.md)。</li><li>`command`：传递给宏的字符串，存储在 [_command](IDP_SPECVAR.md) 变量。</li><li>`MS`：同步运行，`qmcl.exe` 等待宏运行结束并返回 [ret](IDP_RET.md) 值。</li><li>QM 2.4.0：不支持与 `L` 或 `LI` 一起使用。</li></ul> |
| `C command` | 替代方式传递宏命令，`command` 不需引号，可包含引号。 |
| `A arguments` | 传递宏参数，通过 [function](IDP_FUNCTION.md) 语句接收。用空格分隔参数，含空格的参数需用引号或括号括住。参数不可包含引号（括号括住除外）或括号（引号括住除外）。整数参数支持数字、命名常量、全局变量及带运算符的表达式（从左到右计算，忽略运算符优先级）。 |
| `A(sep) arguments` | 替代方式传递参数，`sep` 为分隔符，参数可包含任何字符（如 `"` 和 `()`）。 |
| `T` | 用于计划任务。 |
| `N "networkfile"` | 等待网络上的文件（`networkfile`）可用（最多 5 分钟），文件可用后启动 QM。若 QM 已运行或等待期间启动，`qmcl.exe` 退出且不传递命令行。 |

### 示例

```qm
M "Macro"
M "Macro" "some string"
M "Macro" C some string
M "Macro" A "some string" 1 55.5
M "Macro" A(,,) some string,,1,,55.5
```

- 整个命令行可为宏或文件：
  - 非 `.qml` 文件作为 [文件链接](IDH_ITEMS.md) 添加并在 QM 中打开（QM 2.3.0 起）。
  - 不支持特殊文件夹。
  - 可包含多个路径（空格分隔）。
  - 示例：

    ```qm
    "Macro10"
    "c:\program files\qm\list3.qml"
    c:\Users\G\Desktop\test.txt
    ```

- 禁用项无法通过命令行触发器运行。

## 2. <a name="shortcut"></a>快捷方式

- 在 **Properties** 或 **Icons** 对话框中点击 **Shortcut** 按钮创建运行当前宏的快捷方式。
- 可为快捷方式分配热键，即使 QM 未运行，热键也生效（启动 QM）。

## 3. <a name="task-scheduler"></a>任务计划程序

- QM 无内置调度程序，使用 Windows 任务计划程序服务运行宏（即使 QM 未运行，宏将启动 QM）。
- 在 **Properties** 对话框中点击 **Schedule** 按钮创建或编辑运行当前宏的计划任务。
- 计划时间显示在宏列表中，尽管为外部触发器。
- 另见：[解锁计算机](IDP_QMTL.md)。

## 4. <a name="sendmessage"></a>SendMessage

其他程序或脚本可通过向 QM 主窗口发送消息更高效地运行宏。语法：

```qm
SendMessage(hwndQM, WM_SETTEXT, mode, commandline)
```

- **commandline**：QM 命令行字符串，需包含引号。
- **mode**：

  | 值 | 描述 |
  |----|------|
  | 1 | 异步运行宏或其他项，QM 启动宏后返回控制权。 |
  | 2 | 同步运行函数或宏，`SendMessage` 返回函数返回值（[ret](IDP_RET.md)）。即使项禁用或 QM 命令行触发器禁用，也强制运行。 |
  | 3 | 同模式 2，但函数在 QM 主线程运行，速度更快（无需创建新线程）。可用于宏调用需在主线程运行的函数。注意：避免使用等待命令或长时间运行的代码，否则 QM 可能无响应。 |

- **注意**：
  - 不使用 `PostMessage` 或 `wParam=0`。
  - 可使用 `SendMessageTimeout`。
  - 使用 `FindWindow("QM_Editor", 0)` 获取 QM 窗口句柄。
  - 支持全 Unicode 字符需使用 `SendMessageW` 和 UTF-16 字符串。

### 示例

#### QM 示例

运行宏 `func`，传递参数 `5` 和 `"text ą"`：

```qm
str macro="func"
int arg1=5
str arg2="text ą"
int qm=FindWindow("QM_Editor" 0); if(qm=0) ret
SendMessageW(qm WM_SETTEXT 2 @F"Q ` M `{macro}` A(~~) {arg1}~~{arg2}")
```

目标函数 `func`：

```qm
function i str's
out F"{i} {s}"
```

#### C# 示例（使用 Au.dll 库）

```csharp
string macro = "func";
int arg1 = 5;
string arg2 = "text a";
wnd qm = wnd.findFast(cn: "QM_Editor"); if (qm.Is0) return;
qm.Send(0xC, 2, $"Q ` M `{macro}` A(~~) {arg1}~~{arg2}");
```