# 选项：安全

## 加密宏

**Encrypt macro**：加密或解密当前项目的文本。解密需使用加密时设置的相同密码。

- **All containing text**：若勾选，加密或解密包含指定文本的所有项目。文本须为完整的注释行（以空格或分号开头），输入时不包含空格/分号。解密时，仅解密使用相同密码加密的项目。
- **注意 1**：若加密包含 [对话框](IDH_DIALOG_EDITOR.md) 定义的宏，对话框将无法工作，除非对话框定义赋值给变量并传递给 `ShowDialog`。
- **注意 2**：在代码编辑器中点击函数名并按 [F1](IDP_F1.md)，可查看加密函数的参数和帮助部分（代码上方的注释）。
- **注意 3**：QM 默认创建备份文件，可能包含加密宏的未加密旧版本。缺点是若不删除备份，别人可能看到宏内容；优点是丢失密码时可从备份恢复未加密版本。备份文件通常最终会被 QM 删除，详见 [Options -> Files](IDH_SETT_FILES.md)。

## 加密函数密码

**Encrypt the password to use with a function**：为支持加密密码的函数加密密码。详情见 [函数提示](IDH_FUNCTIONTIPS.md)。

## 相关内容

- [文件查看器、共享文件](IDH_QML.md)
- [禁用文件夹或文件](IDH_FOLDERPROP.md)
- [锁定工具栏](IDH_TOOLBAROPTIONS.md)