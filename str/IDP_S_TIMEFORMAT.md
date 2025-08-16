# 格式化日期/时间字符串

## 语法

```
s.timeformat([frm] [time] [locale] [dateFlags] [timeFlags])
```

## 参数

- **s** - str 变量。
- **frm** - 格式控制字符串。
  - 如果省略或为 ""，使用 "{D} {T}"（短日期/时间，如 "08/09/2009 2:25 PM"）。
- **time** - [DATE, SYSTEMTIME 或 FILETIME](../_COM/IDP_OLE_DATE.md) 类型的变量，包含日期和/或时间。
  - 如果省略或为 0，使用当前本地时间。
  - QM 2.3.4：也可为 `DateTime` 类型变量，或 `long` 类型的 `FILETIME` 格式。
- **locale** - 区域标识符，参见 [区域标识符表](https://learn.microsoft.com/en-us/windows/win32/intl/language-identifiers)。若省略或为 0，使用 LOCALE_USER_DEFAULT。
- **dateFlags** - [GetDateFormat](https://learn.microsoft.com/en-us/windows/win32/api/datetimeapi/nf-datetimeapi-getdateformat) 标志。
- **timeFlags** - [GetTimeFormat](https://learn.microsoft.com/en-us/windows/win32/api/datetimeapi/nf-datetimeapi-gettimeformat) 标志。

## 备注

自 QM 2.3.1 添加。旧版本可使用 [str.time](IDP_S_TIME.md)。

此函数将 **frm** 复制到 **s**，将 {} 内的部分替换为日期或时间。括号内的特定字符控制日期/时间格式，字符需区分大小写。

**frm** 可包含以下类型部分：

| 部分 | 描述 |
|------|------|
| {D} | 短日期，如 "08/09/2009" |
| {DD} | 长日期，如 "August 9, 2009" |
| {T} | 不带秒的时间，如 "15:59" 或 "3:59 PM" |
| {TT} | 带秒的时间，如 "15:59:30" 或 "3:59:30 PM" |

自定义日期格式可使用以下字符序列，需在 **frm** 的 {} 内，与 [GetDateFormat](https://learn.microsoft.com/en-us/windows/win32/api/datetimeapi/nf-datetimeapi-getdateformat) 一致：

| 序列 | 插入内容 | 示例 |
|------|----------|------|
| d | 月中的日，数字 | 5 |
| dd | 月中的日，单数字补零 | 05 |
| ddd | 星期缩写 | Sun |
| dddd | 星期全称 | Sunday |
| M | 月份，数字 | 4 |
| MM | 月份，单数字补零 | 04 |
| MMM | 月份缩写 | Apr |
| MMMM | 月份全称 | April |
| y | 年份后两位，少于 10 不补零 | 9 |
| yy | 年份后两位，少于 10 补零 | 09 |
| yyyy | 四位年份 | 2009 |
| gg | 时代/时期字符串 | A.D. |

自定义时间格式可使用以下字符序列，需在 **frm** 的 {} 内，与 [GetTimeFormat](https://learn.microsoft.com/en-us/windows/win32/api/datetimeapi/nf-datetimeapi-gettimeformat) 一致：

| 序列 | 插入内容 |
|------|----------|
| h | 12 小时制小时，单数字不补零 |
| hh | 12 小时制小时，单数字补零 |
| H | 24 小时制小时，单数字不补零 |
| HH | 24 小时制小时，单数字补零 |
| m | 分钟，单数字不补零 |
| mm | 分钟，单数字补零 |
| s | 秒，单数字不补零 |
| ss | 秒，单数字补零 |
| t | 单字符时间标记，如 A 或 P |
| tt | 多字符时间标记，如 AM 或 PM |

此函数无法格式化毫秒。可使用 `DateTime` 类或 Windows API 函数（如 `GetTickCount`、`timeGetTime`、`GetLocalTime`）处理毫秒，见示例。

如果有 `DateTime` 变量，可调用其 `ToStr` 或 `ToStrFormat` 函数（支持毫秒等）。

默认使用控制面板 -> 区域设置的日期/时间格式和语言。仅在需要其他语言/格式时使用 **locale**。区域标识符是一个包含主语言和子语言常量的数字，例如：

```cpp
out _s.timeformat("{DD} {TT}" 0 WINAPI.LANG_FRENCH|(WINAPI.SUBLANG_FRENCH_CANADIAN<<10))
```

此函数不报错。如果 **frm** 中的部分或序列不正确，会尝试找到最接近的匹配（例如 yyy -> yyyy），或保持不变。如果 **locale** 不支持，使用当前区域（LOCALE_USER_DEFAULT）。如果因参数值错误等原因替换失败，括号部分将为空，并将 [_hresult](../Language/IDP_SPECVAR.md) 设为 1；成功替换所有部分时设为 0。

可通过代码工具栏的“文本”对话框创建此函数的代码。

在 [F 字符串](../Language/IDP_FSTRING.md) 中，日期/时间部分使用 {{}}，因为 {} 用于变量，见示例。

## 示例

```cpp
str s
s.timeformat ;;等同于 s.timeformat("{D} {T}")
s.timeformat("{D} {TT}")
s.timeformat("当前日期为 {DD}")
s.timeformat("当前日期为 {MMM dd yyyy}, {HH '小时' mm} 分钟")
s.timeformat("" 0 WINAPI.LANG_ENGLISH|WINAPI.SUBLANG_ENGLISH_US)

DATE d.getclock ;;获取当前时间
d=d+1 ;;增加 1 天
s.timeformat("{DD} {TT}" d)

SYSTEMTIME st
GetLocalTime &st
s.format("%02i:%02i:%02i.%03i" st.wHour st.wMinute st.wSecond st.wMilliseconds)

int var=5
s.timeformat(F"{var}. {{DD}}") ;;在 F 字符串中使用 {{}} 表示日期/时间部分
```