# 处理运行时错误

## 语法1 - 发生错误时继续执行

```qm
err[+]
```

## 语法2 - 发生错误时执行代码并继续

```qm
err[+]
    statements
    ...
```

也可以写成单行：

```qm
err[+] statements
```

## 语法3 - err+ 保护代码块的开始

```qm
err-
```

## 参数

### 选项

| 选项 | 描述 |
|------|------|
| 默认 | 处理前一条语句的错误。 |
| + | 处理所有前述语句的错误（或 `err-` 以下的所有前述语句）。 |
| - | 标记由 `err+` 保护的语句块的开始。 |

## 说明

使用 `err` 在发生运行时错误时继续执行宏。

当发生错误时：
- 如果下一语句是 `err` 或 `err+`，则继续执行。
- 如果下方有 `err+`，则从 `err+` 后的语句继续执行。
- 如果使用了 [opt noerrorshere](IDP_OPT.md)，则错误传递给调用者函数。
- 否则，[线程](IDP_THREADS.md) 终止。

**语法2**：发生错误时执行 **statements**。如果没有错误，则跳过 **statements**。

`err` 处理由 QM 函数、用户定义函数（参见 [end](IDP_END.md)）、COM 函数和操作系统（异常）生成的错误。不处理某些不可继续的错误，例如“未编译函数”、“构造函数失败”。不用于处理 [编译时错误](IDP_DIR_ERR.md)。

发生错误时，特殊变量 `_error` 会被填充错误信息。

```qm
type QMERROR ~description code iid source place ~line
```

- **description** - 错误生成且未处理时在 QM 输出中显示的字符串。
- **code** - 可用于识别错误的数值，可能为 0。
- **iid** - 生成错误的 [QM 项 ID](IDP_QMITEM.md)。
- **source** - 错误来源：0 - 无错误，1 - 编译时错误，2 - QM 生成的运行时错误，3 - 通过 [end](IDP_END.md) 生成的运行时错误，4 - 异常。
- **place** - 宏文本中语句的偏移量。在 [子函数](IDP_DIR_SUB.md) 中相对于父文本。
- **line** - 语句（文本）。在 exe 中不可用（为空）。

`_error` 具有 [线程作用域](IDP_SCOPE.md)，即在该线程的所有函数中可访问，包括通过 [atend](IDP_ATEND.md) 注册的在线程结束时运行的函数。在 `atend` 注册的函数中，如果线程因错误终止，`_error` 包含错误信息；如果无错误，则为空（**source** 为 0）。

`err` 仅处理当前宏/函数中生成的错误，不处理从当前宏/函数调用的用户定义函数中生成的错误。但被调用函数可通过以下方式将错误传递给调用者：
1. 在开头添加 `opt noerrorshere 1`（QM 2.3.5 新增）。
2. 在末尾添加 `err+ end _error`（可在 `end` 前添加更多代码）。

要查看可能的错误，请在“运行”菜单 -> 编译器选项 -> 显示可能的运行时错误中勾选。然后，在编译宏（点击“运行”或“编译”按钮）时，会显示可能抛出错误的函数，并在代码编辑器中添加指示器。Alt+点击指示器可在 QM 输出中显示错误。此功能帮助决定在哪里使用 `err`。某些错误不会显示，例如：
- 异常。
- ERR_POINTER（“无效指针”）。
- [OLE 类型](IDP_OLETYPES.md) 自动转换中的类型不匹配错误。
- “显示运行时错误选项”对话框中指定的错误。

**另见**： [常见错误](IDP_ERRORS.md), [opt err, opt noerrorshere, opt nowarningshere](IDP_OPT.md), [错误常量](IDP_SPECVAR.md)

## 示例

```qm
;; 关闭“Notepad”窗口；忽略可能的错误（发生错误时不终止宏）：
clo "Notepad"; err

;; 激活“Notepad”窗口；发生错误时显示错误描述：
act "Notepad"
err
    out _error.description

;; 处理所有前述语句的错误并在调用者中生成：
err+ end _error

__________________________________

;; 循环示例：
out
run "$system$\notepad.exe"
1
int i
for i 0 3
    out "activate Notepad"
    act "Notepad" ;;如果找不到 Notepad 则抛出错误
    err ;;处理错误
        out _error.description
        continue
    out "close Notepad"
    clo "Notepad"

__________________________________

;; 如果宏因错误终止，将错误记录到文件“My Documents\My QM\qm log.txt”：
;; 在需要错误记录的每个宏开头插入：
atend LogErrors

;; 并创建函数 LogErrors：
if(_error.source) ;;宏因错误终止
    str macroname.getmacro(getopt(itemid 3) 1)
    str functionname.getmacro(_error.iid 1)
    LogFile F"Macro {macroname}: error in {functionname}.[]Error description: {_error.description}[]Error line: {_error.line}" 1
```