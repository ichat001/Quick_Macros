# 输入框

## 语法
```
int inp[-](var [text] [caption] [default] [checkvar] [checktext] [func] [hwndowner])
```

## 参数
- **var** - 接收输入的变量，须为非指针的内置类型（除 `lpstr`）。
- **text** - 编辑框上方的文本，字符串，默认 `""`（空），支持[链接](../Other/IDP_SYSLINK.html)。
- **caption** - 输入框标题，字符串，默认 `""`（"QM Input"）。
- **default** - 编辑框默认文本，字符串，默认 `""`（空）。
- **checkvar** - 整数变量，设置并接收复选框状态（0 或 1），默认 0（隐藏复选框）。
- **checktext** - 复选框文本，字符串，默认 `""`。
- **func** - 用户定义函数名，在文本更改时调用，函数须以 `function# str&s` 开头，**s** 为输入框编辑框文本，函数可修改 **s**，应返回 0，或返回 1（按 OK）/2（按 Cancel），默认 0。
- **hwndowner** - （QM 2.2.1）拥有者窗口句柄，输入框显示在该窗口上，若同线程则禁用拥有者窗口，默认 0。

### 选项
| 选项 | 描述 |
|------|------|
| - | 点击“Cancel”时终止宏。 |

## 备注
- 显示输入对话框，若用户选择“OK”，将输入值存入 **var** 并返回 1，否则返回 0。
- 若 **default** 以 `"*"` 开头，文本隐藏（用于密码）；若以 `"[]"`（换行符）开头，文本支持多行。
- **提示**：需更多输入字段时，使用[对话框](../User/IDH_DIALOG_EDITOR.html)。
- **另见**：`InputBox`

## 示例
```cpp
int i
inp i

str p
int rem = 1
inp- p "Password" "" "*" rem "Remember"
if(p = "p11") ret rem
else mes- "x" "Password incorrect" ""
```