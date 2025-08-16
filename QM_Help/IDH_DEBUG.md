# 编译与调试

## 编译
在宏首次运行或编辑后，QM 会先对其进行编译。也可通过菜单“运行 -> 编译”或创建 [EXE](IDH_MAKEEXE.html) 时触发编译。编译后的代码非原生机器代码，但执行速度远快于未编译脚本。

若存在语法错误，编译器将[停止](../Language/IDP_DIR_OPT.html)，在 QM 输出中显示错误信息，并高亮错误语句或部分。

## 测试与调试宏的技巧
调试是指查找并修复错误。

### 有用函数
- [out](../Commands/IDP_OUT.html)：在 QM 输出中显示变量等。
- [mes](../Functions/IDP_MES.html)：显示消息框。
- [deb](../Flow/IDP_DEB.html)：启动调试模式。
- [bee](../Commands/IDP_BEE.html)：播放短音效。
- `LogFile`：写入日志文件。
- [OutWinMsg](../User/IDP_QMDLL.html#OutWinMsg)：显示 Windows 消息名称。
- [Statement](../User/IDP_QMDLL.html#Statement)：获取语句（代码行）和/或函数及其调用者的 ID。
- [GetCallStack](../User/IDP_QMDLL.html#GetCallStack)：获取或显示函数及其调用者的名称和语句。

### 其他技巧
- **快速禁用/启用代码**：右键单击选择栏，禁用/启用单行或选中的多行。
- **运行时错误处理**：使用 [err](../Flow/IDP_ERR.html)。
- **调试与错误处理**：相关函数和变量位于 _debug [类别](../Language/IDP_CATEGORIES.html)。

## 另见
- [常见错误](../Other/IDP_ERRORS.html)