# 编译器指令：#err

## 语法

### 语法 1
```qm
#err
```

### 语法 2
```qm
#err nlines
```

### 语法 3
```qm
#err function
```

## 参数

- **nlines**：如果未发生错误，跳过的行数（数字）。
- **function**：用户定义函数的名称。
  - **QM 2.4.3**：可为 [子函数](IDP_DIR_SUB.html)。

## 备注

- **功能**：处理前一语句产生的编译时错误。
- **语法 1**：发生错误时，继续编译，忽略错误语句，不生成错误。
- **语法 2**：发生错误时，编译后续 **nlines** 行；未发生错误时，跳过后续 **nlines** 行。若 **nlines** 为 0，发生错误时停止编译后续代码。
- **语法 3**：发生错误时，调用 **function**（在编译时于 QM 主线程同步运行）。函数返回值决定行为：
  - `0`：正常生成错误。
  - `1`：不生成错误，忽略错误语句（同 `#err`）。
  - `-1`：生成但不显示错误。
  - `-2`：不生成错误，停止编译后续代码（同 `#err 0`）。
- **错误信息**：特殊变量 [_error](IDP_ERR.html) 包含错误信息，**function** 可访问。目前编译时错误的 `code` 始终为 0。

**相关内容**：
- [错误](IDP_ERRORS.html)
- [err](IDP_ERR.html)

## 示例

```qm
dll somedll DllFunctionThatMayBeMissing a b c
#err SayNoFunction

typelib VBScript_RegExp {3F4DACA7-160D-11D2-A8E9-00104B365C9F} 1.0
#err 1
typelib VBScript_RegExp {3F4DACA7-160D-11D2-A8E9-00104B365C9F} 0.0
```