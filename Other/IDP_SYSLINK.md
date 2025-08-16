# 在 `mes`、`inp` 等对话框中使用链接

自 QM 2.4.1 起，标准对话框函数（`mes`、`inp`、`inpp`、`InputBox`、`ListDialog`、`MsgBoxAsync`、`ErrMsg`）支持在静态文本中添加链接。链接可用于显示更多信息/帮助、运行文件、打开网页、在 `inp` 中显示菜单、在 `mes` 中添加更多选项等。

## 启用链接

静态文本需以 `"<>"` 开头以启用链接。支持两种链接标签：

- `<a id="retVal">link text</a>`：点击关闭对话框，函数返回 `retVal`（非零数字）。在 `mes` 中，值 1-15 映射为 Windows API 标准按钮字符，例如 `IDOK` 映射为 `'O'`，`IDCANCEL` 映射为 `'C'`。
- `<a href="callbackAddress">link text</a>` 或 `<a href="callbackAddress params">link text</a>`：点击调用指定的回调函数 `callbackAddress`。

## 回调函数

回调函数需以以下形式定义：

```qm
function# hwnd $params
```

- **hwnd**：对话框窗口句柄。
- **params**：`callbackAddress` 后跟空格的标签文本。

若回调函数返回非零值，对话框关闭，对话框函数（`mes` 等）返回该值。

## 显示方式

默认情况下，对话框文本显示在 Static 控件中，含链接的文本显示在 SysLink 控件中。注意：SysLink 在无清单的 exe 中不可用。

## 示例

### 在消息框中添加更多选项

```qm
sel mes("<>Question.[][]Other choices:[]<a id='1000'>Maybe</a>" "" "YN?")
    case 'Y' out "Yes"
    case 'N' out "No"
    case 1000 out "Maybe"
```

### 在输入框中添加弹出菜单

```qm
str s
if(!inp(s F"<> <a href=''{&sub.inp_link}'>select</a>")) ret
out s

#sub inp_link
function# hwnd $params
str items=
 one
 two
 three
int i=ShowMenu(items hwnd 0 2)
if(!i) ret
str si.getl(items i-1)
EditReplaceSel hwnd 4 si 3
```