# 正则表达式

**参考**：[PCRE 参考](IDH_PCRE.md)

正则表达式用于查找、查找替换和拆分字符串。在 QM 中，两个函数支持正则表达式：[findrx](IDP_FINDRX.md) 和 [str.replacerx](IDP_S_REPLACERX.md)。正则表达式还可用于[窗口名称](IDP_WINDOWEXPRESSION.md)、[窗口触发器](IDH_TRIG_WINDOW.md)和查找对话框。

正则表达式是由普通字符（例如字母 `a` 到 `z`）和特殊字符（称为**元字符**）组成的文本模式，用于描述搜索文本时要匹配的一个或多个字符串。它类似于文件搜索中的通配符 `*` 和 `?`，但功能更强大。以下表格列出了一些元字符及其在正则表达式中的行为。

## 元字符表

| 字符 | 描述 |
|------|------|
| `\` | 将后续字符标记为特殊字符、字面字符（去除后续元字符的特殊含义）、反向引用、锚点或八进制/十六进制转义。例如，`t` 匹配字符 `t`，`\t` 匹配制表符，`\\` 匹配 `\`，`\(` 匹配 `(`。 |
| `.` | 匹配除换行符（`\n`）外的任意单个字符。若模式中包含 `(?s)`，则匹配所有字符。**注意**：Windows 换行符为 `\r\n`，`.` 匹配 `\r`，可能导致意外结果，建议使用 `[^\r\n]` 替代。 |
| `[xyz]` | 字符集，匹配括号内任意一个字符。例如，`[abc]` 匹配 `plain` 中的 `a`。**注意**：在 QM 字符串中，`[digits]` 是[转义序列](IDP_CONSTANT.md)，会被替换为字符代码。需用 `[91]` 替代 `[`，例如 `[91]135]` 替代 `[135]`。 |
| `[^xyz]` | 否定字符集，匹配不在括号内的任意字符。例如，`[^abc]` 匹配 `plain` 中的 `p`。 |
| `[a-z]` | 字符范围，匹配指定范围内的任意字符。例如，`[a-z]` 匹配小写字母 `a` 到 `z`。 |
| `[^a-z]` | 否定字符范围，匹配不在指定范围内的字符。例如，`[^a-z]` 匹配非小写字母。 |
| `*` | 匹配前项 0 次或多次。例如，`zo*` 匹配 `z` 或 `zoo`。 |
| `+` | 匹配前项 1 次或多次。例如，`zo+` 匹配 `zo` 或 `zoo`，但不匹配 `z`。 |
| `?` | 匹配前项 0 次或 1 次。例如，`do(es)?` 匹配 `do` 或 `does`。 |
| `{n}` | 精确匹配前项 n 次（n 为非负整数）。例如，`o{2}` 匹配 `food` 中的 `oo`，不匹配 `Bob` 中的 `o`。 |
| `{n,}` | 匹配前项至少 n 次。例如，`o{2,}` 匹配 `foooood` 中的所有 `o`，不匹配 `Bob` 中的 `o`。 |
| `{n,m}` | 匹配前项至少 n 次，至多 m 次。例如，`o{1,3}` 匹配 `fooooood` 中的前三个 `o`。**注意**：逗号与数字间不得有空格。 |
| `?` | 紧跟量词（`*`, `+`, `?`, `{n}`, `{n,}`, `{n,m}`）时，使匹配模式为**非贪婪**，即尽可能少匹配。默认贪婪模式匹配尽可能多。例如，在 `oooo` 中，`o+?` 匹配单个 `o`，而 `o+` 匹配所有 `o`。 |
| `^` | 匹配输入字符串开头。若设置多行标志，`^` 也匹配行开头。 |
| `$` | 匹配输入字符串结尾。若设置多行标志，`$` 也匹配行结尾。 |
| `\b` | 匹配单词边界，即单词与空格（或其他分隔符，如逗号）之间的位置。例如，`er\b` 匹配 `never` 中的 `er`，不匹配 `verb` 中的 `er`。 |
| `\B` | 匹配非单词边界。例如，`er\B` 匹配 `verb` 中的 `er`，不匹配 `never` 中的 `er`。 |
| `(pattern)` | 匹配并捕获 `pattern`（子匹配）。例如，`(.)` 捕获任意字符。若需匹配括号字符，需用 `\(` 或 `\)`。 |
| `(?:pattern)` | 匹配 `pattern` 但不捕获，适用于使用 `|` 组合模式。例如，`industr(?:y|ies)` 比 `industry|industries` 更简洁。 |
| `(?=pattern)` | 正向前向断言，匹配后接 `pattern` 的点，不捕获。例如，`Windows (?=95|98|NT|2000)` 匹配 `Windows 2000` 中的 `Windows`，不匹配 `Windows 3.1` 中的 `Windows`。断言不消耗字符，下一匹配从断言后立即开始。 |
| `(?!pattern)` | 负向前向断言，匹配不后接 `pattern` 的点，不捕获。例如，`Windows (?!95|98|NT|2000)` 匹配 `Windows 3.1` 中的 `Windows`，不匹配 `Windows 2000` 中的 `Windows`。 |
| `x|y` | 匹配 `x` 或 `y`。例如，`z|food` 匹配 `z` 或 `food`，`colo(r|ur)` 匹配 `color` 或 `colour`。 |
| `\cx` | 匹配控制字符，`x` 须为 `A-Z` 或 `a-z`。例如，`\cM` 匹配 Control-M（回车）。若 `x` 无效，`c` 按字面 `c` 处理。 |
| `\d` | 匹配数字字符，等同于 `[0-9]`。 |
| `\D` | 匹配非数字字符，等同于 `[^0-9]`。 |
| `\f` | 匹配换页字符，等同于 `\x0c` 和 `\cL`。 |
| `\n` | 匹配换行字符，等同于 `\x0a` 和 `\cJ`。 |
| `\r` | 匹配回车字符，等同于 `\x0d` 和 `\cM`。 |
| `\s` | 匹配空白字符（空格、制表符、换页、换行、回车、垂直制表符），等同于 `[ \f\n\r\t\v]`。 |
| `\S` | 匹配非空白字符，等同于 `[^ \f\n\r\t\v]`。 |
| `\t` | 匹配制表符，等同于 `\x09` 和 `\cI`。 |
| `\v` | 匹配垂直制表符，等同于 `\x0b` 和 `\cK`。 |
| `\w` | 匹配单词字符（字母、数字、下划线），等同于 `[A-Za-z0-9_]`。 |
| `\W` | 匹配非单词字符，等同于 `[^A-Za-z0-9_]`。 |
| `\xn` | 匹配十六进制转义值 `n`（需精确两位）。例如，`\x41` 匹配 `A`，`\x041` 等同于 `\x04` 后接 `1`。 |
| `\num` | 匹配正整数 `num` 的反向引用。例如，`(.)\1` 匹配两个连续相同字符。 |
| `\n` | 若前面有至少 `n` 个捕获子表达式，则为反向引用；否则，若 `n` 为八进制数字（0-7），为八进制转义值。 |
| `\nm` | 若前面有至少 `nm` 个捕获子表达式，则为反向引用；若有至少 `n` 个捕获，`n` 为反向引用，`m` 为字面字符；否则，若 `n` 和 `m` 为八进制数字（0-7），匹配八进制值 `nm`。 |
| `\nml` | 匹配八进制转义值 `nml`，其中 `n` 为 0-3，`m` 和 `l` 为 0-7。 |

## 教程

以下示例展示如何使用 `findrx` 函数查找和提取文本。

### 基本查找
```qm
int i
i=find("Sunday Monday Tuesday" "Monday") ;; 查找 Monday
out i
i=findrx("Sunday Monday Tuesday" "Monday") ;; 查找 Monday
out i
```

### 使用元字符
`findrx` 支持元字符，允许匹配非精确文本：
```qm
i=findrx("file578.txt" "\d+") ;; 查找数字，\d 匹配数字，+ 表示“一个或多个”
out i
```

### 提取匹配文本
```qm
str s
i=findrx("file578.txt" "\d+" 0 0 s) ;; 第 5 参数为 str 变量，接收匹配内容
out i
out s
```

### 未找到时的处理
```qm
i=findrx("file.txt" "\d+") ;; 未找到返回 -1
if(i<0) out "not found"
```

### 匹配整个字符串
```qm
i=findrx("578" "^\d+$") ;; ^ 和 $ 表示字符串开头和结尾
out i
i=findrx("file578.txt" "^\d+$") ;; 不匹配
out i
```

### 匹配单词边界的数字
```qm
str s
i=findrx("file123 456.txt" "\b\d+\b" 0 0 s) ;; \b 表示单词边界，单词字符为字母、数字和 _
out i
out s
```

### 查找文件名中的日期
```qm
i=findrx("file01-02-2000.txt" "\d{2}-\d{2}-\d{4}" 0 0 s) ;; \d{2} 表示“两个数字”
out i
out s
```

### 提取年份
```qm
i=findrx("file01-02-2000.txt" "\d{2}-\d{2}-(\d{4})" 0 0 s 1) ;; 第 6 参数指定提取子匹配
out i
out s
```

### 提取月、日、年
```qm
ARRAY(str) a
i=findrx("file01-02-2000.txt" "(\d{2})-(\d{2})-(\d{4})" 0 0 a)
out a[0] ;; 整个匹配
out a[1] ;; 子匹配 1（月）
out a[2] ;; 子匹配 2（日）
out a[3] ;; 子匹配 3（年）
```

### 查找特定字符组成的子字符串
```qm
i=findrx("xxx 0x3ea5 yyy" "0x[\dabcdef]+" 0 0 s) ;; [] 指定字符，+ 表示“一个或多个”
out i
out s
```

### 转义元字符
```qm
i=findrx("file.txt" ".+\.txt" 0 0 s) ;; 在元字符前加 \，如 . 变为 \.
out s
i=findrx("xxx file.txt yyy" "\Qfile.txt\E" 0 0 s) ;; 或用 \Q...\E 转义
out s
```

以下示例展示如何使用 `str.replacerx` 函数进行查找替换。

### 基本替换
```qm
str x="Sunday Monday Tuesday"
x.findreplace("Monday" "(here was Monday)")
out x
str y="Sunday Monday Tuesday"
y.replacerx("Monday" "(here was Monday)")
out y
```

### 使用元字符替换
```qm
y="file123 456.txt"
y.replacerx("\d+" "(here was a number)")
out y
```

### 未找到时的处理
```qm
y="file.txt"
int n=y.replacerx("\d+" "(here was a number)") ;; 返回找到的匹配数
if(n=0) out "not found"
```

### 使用子匹配替换
```qm
y="file01-02-2000.txt"
y.replacerx("(\d{2})-(\d{2})-(\d{4})" "$3-$1-$2") ;; $number 用于替换中的子匹配
out y ;; 将日期从 mm-dd-yyyy 转换为 yyyy-mm-dd
```

## 在线资源
- [VBScript 正则表达式教程](http://msdn.microsoft.com/en-us/library/6wzad2b2.aspx)
- [更多正则表达式信息及常用模式](http://www.google.lt/search?q=regular%20expressions)
- [正则表达式工具](http://www.google.lt/search?q=regular%20expressions%20download)

## PCRE
正则表达式支持由 [PCRE 库](http://www.pcre.org/) 提供，PCRE 是由 Philip Hazel 编写的开源软件，由英国剑桥大学版权所有。PCRE 实现与 Perl 相同的语法和语义（基于 Perl 5.8，QM 使用 PCRE 4.4），仅有一些细微差异。

## UTF-8
在 QM 的 Unicode 模式下，文本以 UTF-8 格式存储，非 [ASCII](IDP_ASCII.html) 字符占 2-4 字节。**QM 不支持正则表达式的 UTF-8 模式（`RX_UTF8` 选项）**，非 ASCII 字符被视为 2-4 个独立字节。例如：
- `.` 匹配单个字节，而非整个字符。
- 单词边界（`\b`）、字符类（`\w`、`\s` 等）及大小写无关匹配不识别非 ASCII 字符。

在大多数情况下，这不会造成问题。但若正则表达式或目标字符串包含非 ASCII 字符，需调整模式构建方式，可能需使用 [flag 32](IDP_FINDRX.md)。