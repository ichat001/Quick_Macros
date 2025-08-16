# 生成运行时错误

## 语法

```qm
end [errorstring] [flags] [errorcode]
```

## 参数

- **errorstring** - 错误描述。可以是字符串或 [QMERROR](IDP_ERR.md) 类型的变量。
  - 可包含 QM 输出 [标签](IDP_F1.md)。
  - 使用 [F-string](IDP_FSTRING.md) 插入变量。
- **[flags](IDP_FLAGS.md)**：
  | 标志 | 描述 |
  |------|------|
  | 0-3 | 指定生成错误的位置：<br>0（默认） - 在调用者中。如果没有 [直接调用者](IDP_FUNCTIONCALL.md)，则在此处。<br>1 - 在此处。<br>2 - 在非类成员函数的调用者中（针对 this 变量）。<br>3 - <span class="expand">已废弃</span>。在第一个非私有文件夹函数的调用者中。在 exe 中无效。 |
  | 4 | 不打开宏。也可以在选项中全局设置此项。 |
  | 8 | QM 2.3.3。生成警告而非错误。 |
  | 16 | QM 2.3.5。追加最后一个 DLL 错误字符串。参见 [str.dllerror](IDP_S_DLLERROR.md)。 |
  | 32 | QM 2.3.6。临时警告。在编辑宏后 1 小时内显示。在 exe 中永不显示。标志 8 为可选。 |
- **errorcode** - 与标志 16 一起使用的 DLL 错误代码。如果省略或为 0，则调用 `GetLastError`。

**另见**： [ret](IDP_RET.md), [opt noerrorshere, nowarningshere](IDP_OPT.md)

## 说明

生成运行时错误，如果未被处理，将终止 [线程](IDP_THREADS.md)（正在运行的宏）。

默认情况下，如果在用户定义函数中使用 `end`，错误会在调用者（调用该函数的宏/函数）中生成。

调用者可通过 [err](IDP_ERR.md) 语句处理错误，并可能需要获取错误代码（`_error.code`）。设置错误代码的方法有：
- 使用 [错误常量](IDP_SPECVAR.md) 作为 **errorstring**。
- 在 **errorstring** 前添加代码（某个数字）。使用错误代码 >= 2000。
- 设置 `_error.code` 和 `_error.description`，并使用 `_error` 作为 **errorstring**。

QM 2.3.3。如果使用标志 8，生成警告而非错误。警告不会终止宏，仅在 QM 输出中显示警告消息。标志 0-3 仍然适用。可通过 [opt nowarnings 1](IDP_OPT.md) 禁用此类警告。

在 [函数帮助](IDP_F1.md) 中可查看函数可能生成的错误。QM 显示函数中使用的 `end` 语句的错误，或 [Errors:](IDP_F1.md) 行中明确指定的错误。

仅使用 `end`（无参数）会终止线程而不生成错误。但通常建议使用 [ret](IDP_RET.md)。在某些情况下，使用 [shutdown -7](IDP_SHUTDOWN.md) 更好。不要使用 Windows API 函数（如 `ExitThread`），因为这会导致 QM 无法正确管理线程。

`end` 会立即终止当前函数及其调用者的执行。但 [类析构函数](IDP_CLASSES.md) 和通过 [atend](IDP_ATEND.md) 注册的函数仍会执行。

避免在回调函数（对话框过程、COM 事件函数等）中使用 `end`（除非使用标志 8 生成警告），除非确实必要。同样，避免在这些函数中出现未处理的运行时错误。如果回调函数由 DLL 函数调用，DLL 可能不会释放其分配的内存、临界区等；在某些情况下，DLL 函数下次可能无法正常工作（需要重启 QM）。如果回调函数通过 [call](IDP_CALL.md) 调用，调用者无法通过 `err` 处理错误，错误会在回调函数中生成，而非其调用者中。

不要在 [类构造函数、析构函数和 operator= 函数](IDP_CLASSES.md) 以及通过 [atend](IDP_ATEND.md) 注册的函数中使用 `end`（除非使用标志 8 生成警告）。同样，避免在这些函数中出现未处理的运行时错误。在析构函数和 atend 函数中，`end` 仅终止函数，而非线程。在构造函数和 operator= 中，`end` 总是生成无法处理的错误；如果构造函数失败，析构函数的调用行为未定义。如果析构函数或 atend 函数可能失败，应处理错误（必要时使用 `err`）并在需要时使用带标志 8 的 `end`（警告）。如果构造函数或 operator= 可能失败，应将代码移到必须显式调用的成员函数中（例如 `Class var.Init` 或 `var.Clone(var2)`）。

在 [特殊线程](IDP_THREADS.md)（QM 线程或触发器过滤函数）中，`end` 仅终止回调函数，而非线程。

**另见**： [ret](IDP_RET.md), [#ret](IDP_DIR_RET.md)

## 示例

```qm
end "file not found"
end "2000 my error description" ;;使用错误代码
end ERR_FILE ;;使用错误常量

str filevariable="Z:\file"
end F"{ERR_FILE}: '{filevariable}'"

run "abc"
err
    _error.description + " abc"
    end _error

end ;;终止线程而不生成错误
```