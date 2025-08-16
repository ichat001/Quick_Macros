# F1 帮助与提示/输出面板

## 代码编辑器中的 F1
在代码编辑器中输入或点击标识符（函数、类型等）后按 F1，QM 会显示相关帮助。下表说明 QM 的帮助查找和显示方式：

| 标识符 | 按 F1 时的行为 |
|--------|----------------|
| QM 内置函数、类型等 | 打开 QM 帮助中的相关主题。 |
| 用户定义函数 | 在提示面板显示函数的帮助部分。 |
| API（DLL 函数、类型、常量、接口） | <ul><li>若在类型库中声明，打开其帮助文件（若存在）。</li><li>否则，查找声明宏中以 `/?` 开头的行（非引用文件中声明），若有则打开该宏；若有 `/? macro name`，在提示面板显示该宏。</li><li>否则，在提示面板显示帮助搜索链接。</li></ul> |
| 类名 | 查找名为 `classname help` 的宏并在提示面板显示。若无，则按 API 处理 `/?`。 |
| 未知（当前未声明） | 在提示面板显示帮助搜索链接。 |

## 函数的帮助部分
用户定义函数可在 `function` 语句开头或下方包含注释，作为**帮助部分**：
```cpp
function x y ;; 此行显示在 QM 状态栏
;; 以下为帮助部分，包含 'function...' 行，结束于空行后接代码
;; 点击函数名并按 F1 时在提示面板显示
;; 首行注释显示在状态栏和注解（菜单 -> 帮助 -> 注解）
```

- 创建帮助部分：代码工具栏 -> 更多工具 -> 函数帮助编辑器。
- 提示面板可显示函数、宏及其他 [QM 项目](../QM_Help/IDH_ITEMS.html)：
  - 函数：仅显示帮助部分。
  - 宏：所有文本视为帮助部分，`EXAMPLES` 行以下代码无需注释。
  - 其他项目：所有文本视为代码。
- 显示帮助：使用 F1 或 `QmHelp` 函数。
- 帮助部分可包含标签和特殊行，用于提示面板中的文本格式化。

## 帮助部分的特殊行
特殊行用于格式化提示面板中的文本（如代码着色、粗体/斜体标题等）：

| 特殊行 | 格式化 |
|--------|--------|
| `EXAMPLE` / `EXAMPLES` | 以下文本显示为代码（着色）。<ul><li>其他文本中插入代码：使用 `<code>...</code>`。</li></ul> |
| `See also:` | 此行中 `<Function>` 格式的函数名生成帮助链接。<ul><li>其他文本中生成链接：使用 `<help>Function</help>`。</li></ul> |
| `param - ...` / `param (...` / `param:` / `param, ...` | 参数高亮显示。 |
| `Errors:` / `ERRORS` | 此行或以下的错误常量（如 `ERR_FAILED`）生成错误字符串链接。<ul><li>无此行时，QM 从代码提取 [end](../Flow/IDP_END.html) 语句使用的错误值（非加密代码）。</li><li>添加其他函数的错误：包含 `<Function>` 格式的函数名。</li><li>添加本函数错误：使用空 `<>`。</li><li>QM 2.3.5：用 `<.>` 添加调用的函数错误，用 `<..>` 添加本函数及调用函数的错误。</li><li>示例：`Errors: <>, <Func1>, <Func2>`</li></ul> |
| `UPPERCASE` | 粗体文本，如 `REMARKS` 显示为 **Remarks**。 |
| `Returns:` / `Errors:` / `See also:` / `Version:` / `Added in:` / `Author:` | 行首为此文本时，文本显示为斜体。 |

- 除 `EXAMPLE(S)` 和 `See also:` 外，其他特殊行在 QM 2.3.3 引入。
- 示例：
  ```cpp
  /
  function# $s flags [str&so]
  ;; 功能描述...
  Returns: ...
  ;; 参数
  s - ...
  flags:
    1 - ...
    2 - ...
  so (v2.5) - ...
  REMARKS
  ;; 备注...
  EXAMPLE
  str s
  FunctionName "abc" 1 s
  out s
  ```

## 帮助部分和输出文本中的标签
标签可用于用户定义函数和宏的帮助部分，插入方式：代码工具栏 -> 更多工具 -> 函数帮助编辑器。标签在提示面板显示帮助时（如按 F1）替换为链接、颜色等。

- QM 2.3.0：标签可用于 [out](../Commands/IDP_OUT.html)（文本以 `<>` 开头）及 [end](../Flow/IDP_END.html)（无需 `<>`）。
- QM 2.3.3：标签可用于 `OutStatusBar`。
- 标签也可用于 API 帮助搜索链接（右键提示面板编辑）。
- 标签语法：
  ```cpp
  <tag>text</tag>
  <tag "attribute">text</tag>
  <tag "attribute /more info">text</tag>
  ```
- 属性可包含 [QM 转义序列](../Language/IDP_CONSTANT.html)，如用两个 `'` 表示 `"`。单词属性可不加引号（QM 2.4.1）。

### 链接
```cpp
<link "http://www.quickmacros.com">打开网页</link>
<link "mailto:abc@def.gh?subject=test%20qm%20links&body=test%0Aqm%0Alinks">创建邮件</link>
<link "notepad.exe">运行文件 notepad.exe</link>
<link "notepad.exe /$desktop$\test.txt">运行 notepad 并带命令行参数</link>
<macro "MyMacro">运行宏 MyMacro</macro>
<macro "MyMacro /abc">运行宏 MyMacro，_command 变量为 "abc"</macro>
<open "MyMacro">打开宏 MyMacro</open>
<open "MyMacro /10">打开宏 MyMacro 并定位到位置 10</open>
<open "MyMacro /L10">打开宏 MyMacro 并定位到第 10 行（从 1 开始）</open> ;; QM 2.3.2
<open "MyMacro:Sub">打开宏 MyMacro 并定位到子函数 Sub</open> ;; QM 2.4.1
<help "::/qm_help/IDH_QUICK.html">打开 QM 帮助主题</help>
<help "#IDH_QUICK">打开 QM 帮助主题</help> ;; QM 2.4.1
<help "#IDP_QMDLL#PerfOut">带锚点的帮助</help> ;; QM 2.4.1
<help "qm2help.chm">打开帮助文件 qm2help.chm</help>
<help "qm2help.chm::/qm_help/IDH_QUICK.html>main">打开帮助文件中的主题，窗口类型为 "main"</help>
<help>MyFunction</help> ;; QM 2.3.3，显示函数帮助
<tip "E_IF">显示 $qm$\tips.txt 中的提示</tip>
<tip "#MyMacro">在提示面板显示宏或函数（仅帮助部分）</tip>
<google "quick macros">Google 搜索 'quick macros'</google> ;; QM 2.3.3
<google "quick macros /&start=10&lr=lang_de">带参数的 Google 搜索</google> ;; QM 2.3.3
<mes "text">显示消息框</mes> ;; QM 2.3.4
<out "text">在 QM 输出中显示文本</out> ;; QM 2.3.4
```
- 可省略属性，用文本作为属性：
  ```cpp
  <link>http://www.quickmacros.com</link>
  ```
- QM 2.3.2：`<tip>#MyMacro</tip>` 可简化为 `<tip>MyMacro</tip>`。
- QM 2.3.3：`<help>` 可用于任何函数或其他标识符，效果等同于在代码编辑器按 F1：
  ```cpp
  <help>MyFunction</help> <help>act</help> <help>SetTimer</help> <help>WM_TIMER</help> <help>str.replacerx</help> <help>My Macro</help>
  ```

### 样式
```cpp
<b>粗体</b> <i>斜体</i> <u>下划线</u>
<c "0x00ff00">绿色文本</c>
<b><i><c "0xff">嵌套标签</c></i></b>
<c 0x8000>嵌套<c 0xff0000>标签</c>再次</c>
<z "0xff">红色背景</z> ;; QM 2.3.3
<Z "0xff">整行红色背景</Z> ;; QM 2.3.3
<hidden>不可见但可复制或通过 Scintilla API 获取</hidden> ;; QM 2.4.1
```

### 代码
- 宏或函数：
  ```cpp
  <code>
  int i
  for(i 0 5) out 1
  </code>
  ```
- 菜单：
  ```cpp
  <code "1">
  abc :run "abc.exe" * icon.ico
  abc :run "abc.exe" * icon.ico
  </code>
  ```
- 自动文本列表：
  ```cpp
  <code "2">
  abc :key "abc"
  abc :key "abc"
  </code>
  ```

### 图像（QM 2.4.1）
图像显示在包含图像标签的文本行下方：
```cpp
<image "resource:<My Macro>image:Name"></image> ;; 宏资源中的图像
<image "resource:<>image:Name"></image> ;; 文件资源中的图像
<image "image:Name"></image> ;; 同上
<image "c:\planets\venus.bmp"></image> ;; 图像文件（bmp、png、jpg、gif）
<image "$my qm$\small.ico"></image> ;; 16x16 图标
<image "&big.ico"></image> ;; $my qm$ 文件夹中的 32x32 图标
<image "$system$\shell32.dll,5"></image> ;; DLL、EXE 或 ICL 文件中的图标
<image "c:\MyArrow.cur"></image> ;; 32x32 光标（cur、ani）
<image "c:\file.html"></image> ;; 任意文件的 shell 图标
<image "resource:<My Macro>Name.png"></image> ;; 支持 bmp、png、jpg、gif、ico、cur、ani
```
- 示例：
  ```cpp
  out
  Dir d
  foreach(d "$program files$\*.png" FE_Dir 4)
  	str path=d.FullPath
  	out F"<><image ''{path}''>{path}</image>"
  	ifk(C) break ;; 按 Ctrl 结束
  ```
- 添加图像到宏资源：使用 `_qmfile.ResourceAdd`，若首个参数为 0 则添加到文件资源。

### 普通文本（忽略标签）
```cpp
<_>包含 <b>标签</b> 的文本，<u>被忽略</u>。</_>
```

### 替换
F1 按下的单词，仅用于 API 帮助搜索链接：
```cpp
<keyword>
<macro "MyMacro /<keyword>">运行宏 MyMacro，_command 变量包含 F1 单词</macro>
```