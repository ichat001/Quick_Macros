# 查找 HTML 元素或获取文档接口

## 语法

### 语法 1 - 查找 HTML 元素
```
IDispatch htm(tag name [html] [window] [frame] [index] [flags] [waitS] [navig])
```

### 语法 2 - 获取网页的 IHTMLDocument2 接口
```
IDispatch htm(hwnd)
```

### 语法 3 - 从可访问对象获取 HTML 元素
```
IDispatch htm(acc)
```

## 参数
- **tag** - HTML 标签，例如 `"A"`。
- **name** - 文本，视 **flags** 可为某属性，允许为空字符串 `""`。
- **html** - 外部 HTML，例如 `"<A href=\"http://www.x.com\">Name</A>"`，默认 `""`（任意）。
- **window** - 包含网页的[窗口](../Other/IDP_WINDOWEXPRESSION.html)（`"Internet Explorer_Server"` 控件）。
  - 若省略或为 0，搜索首个（按 [Z 序](http://www.wikipedia.org/wiki/Z-order)）可见的 Internet Explorer 窗口（类名 `"IEFrame"`）或其他兼容 IE 的浏览器窗口（需通过 [RtOptions](../User/IDP_QMDLL.html#RtOptions) 指定类名）。
- **frame** - 基于 1 的框架/iframe 索引，或路径（如 `"2/3"`）。
  - `"0"` 表示元素不在框架/iframe 中。
  - 默认 `""`（元素可位于任何位置）。
  - 在多框架页面中，指定 **frame** 可加速 `htm`。
- **index** - 在 **tag** 类型元素集合中的索引。
  - 指定 **index** 可显著加速 `htm`。
  - 若页面结构变化，**index** 可能不精确，导致 `htm` 变慢。
  - 若 **tag** 为 `""`，**index** 为所有元素集合中的索引。
  - 默认 0。
- **flags**：
  | 值 | 描述 |
  |----|------|
  | 1 | **name** 为完整或含[通配符](IDP_MATCHW.md) (*?)，`"*"` 匹配无名称元素；不设置时 **name** 可为部分匹配；不可与标志 2 共用。 |
  | 2 | **name** 为[正则表达式](../RegExp/IDP_PCRE.html)。 |
  | 4 | **html** 为完整或含通配符；不可与标志 8 共用。 |
  | 8 | **html** 为正则表达式。 |
  | 16 | **window** 为 `"Internet Explorer_Server"` 子窗口句柄；默认为主窗口，仅搜索首个可见 `"Internet Explorer_Server"` 控件。 |
  | 32 | 未找到元素时报错。 |
  | 0x100-0xA00 | **name** 为属性：0x100 - id, 0x200 - name, 0x300 - alt, 0x400 - value, 0x500 - type, 0x600 - title, 0x700 - href, 0x800 - onclick, 0x900 - src, 0xA00 - classid。 |
- **waitS** - 等待元素出现的时间（秒）。
- **navig** - 正或负数，用于获取相邻元素。
- **hwnd** - 窗口句柄（语法 2），若为字面值 0，使用首个匹配窗口。
- **acc** - [可访问对象](IDP_ACC.md)（语法 3）。

## 备注
- 查找 HTML 元素或获取网页文档接口。
- 返回值：
  - 语法 1 和 3：`MSHTML.IHTMLElement` 接口指针，未找到返回 0，可赋给 `Htm` 类型变量，用于操作元素（点击、获取/设置文本等）。
  - 语法 2：`MSHTML.IHTMLDocument2` 接口指针，表示网页（HTML 元素容器）。
- HTML 元素是网页中的对象（链接、按钮、文本等），比可访问对象更快、更精确，但仅适用于 Internet Explorer 或显示在 `"Internet Explorer_Server"` 控件中的窗口。
- **语法 1**：查找 HTML 元素，仅搜索首个匹配窗口和首个可见 `"Internet Explorer_Server"` 控件。若需搜索其他窗口或控件（如隐藏标签页），先用 [win](IDP_WIN.md) 或 [child](IDP_CHILD.md) 查找窗口或控件句柄，传给 **window**。
- **语法 2**：获取 **hwnd** 中网页的 `MSHTML.IHTMLDocument2` 接口。
  - **提示**：从 HTML 元素获取文档接口，调用元素的 `document` 属性；获取 `MSHTML.IHTMLWindow2`，调用文档的 `parentWindow` 属性。
- **语法 3**：获取对应于可访问对象 **acc** 的 HTML 元素。
  - **提示**：反向转换可使用 [acc](IDP_ACC.md)。
  - **提示**：从坐标获取 HTML 元素，使用 `acc`：`Acc am=acc(x y hwnd); Htm hm=htm(am)`，适用于部分元素（如链接、图像、输入框），对简单文本无效。

## 对话框
- 使用“Find Html Element”对话框插入 `htm` 函数：拖动图片到网页对象上，自动填充优化性能的值。
- 若网页频繁更新，元素索引可能变化，导致找到其他相似元素。建议：
  - 使用 Test 按钮测试不同 **index**（如 0 和 10000）。
  - 若找到错误元素，调整参数，或查找相邻元素并用 **navig**（正或负数）导航到目标元素。
  - **index** 不匹配时搜索时间较长，元素数量越多越慢，考虑查找元素较少的 **tag** 类型元素后导航。
- 对话框中“Index in all”字段为页面或框架中所有元素的索引，通常不用于 `htm`，可通过箭头查看相邻元素，或输入索引并按 ! 更新。
- 操作 HTML 元素（点击、获取/设置文本等）使用“Html Element”对话框，或在变量名后输入 `.`，从下拉列表选择函数。

## 示例
```cpp
Htm el=htm("INPUT" "id" "" "Internet Explorer" 0 0 0x221)
el.Click
// 或
el.el.click
// 或
MSHTML.IHTMLElement el=htm("INPUT" "id" "" "Internet Explorer" 0 0 0x221)
el.click
```