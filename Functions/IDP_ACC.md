# 查找[可访问对象](../IDP_ACCESSIBLE.md)或比较属性

**注意**：在 QM 2.3.3 及以上版本中，推荐使用 `Acc` 类的函数替代 `acc`/`acctest`，更简单易用。若需兼容旧版 QM 或获取更多信息，可继续使用 `acc`/`acctest`。`Acc.Find` 调用 `acc`，因此参数类似。

## 语法

### 语法 1 - 获取指定对象
```
Acc acc(name [role] [window] [class] [value] [flags] [x y] [navig] [waitS] [matchindex])
int acctest(object name [role] [window] [class] [value] [flags] [x y])
```

### 语法 2 - 从点获取对象
```
Acc acc(x y [window] [flags2])
int acctest(object x y [window] [flags2])
```

### 语法 3 - 从鼠标指针位置获取对象
```
Acc acc(mouse)
int acctest(object mouse)
```

### 语法 4 - 从窗口句柄获取对象
```
Acc acc(hwnd)
int acctest(object hwnd)
```

### 语法 5 - 获取焦点对象
```
Acc acc
int acctest(object)
```

### 语法 6 - 获取相邻对象
```
Acc acc(object navig)
```

### 语法 7 - 从 HTML 元素获取对象
```
Acc acc(htmlelement)
```

## 参数

- **name** - 对象名称。
  - 默认可为部分名称，不区分大小写。
  - 空字符串 ("") 匹配任意名称。
  - 通常为对象显示的文本或前置文本，部分对象无名称。
- **role** - 对象类型，支持 `Acc.Role` 返回的所有角色类型：
  - 标准角色常量（如 `ROLE_SYSTEM_PUSHBUTTON`）。
  - 字符串，匹配 `ROLE_SYSTEM_` 后的部分（如 "PUSHBUTTON"）。
  - 角色描述字符串（如 "push button"）。
  - 默认：0 或 ""（任意）。
- **window** - [容器窗口（顶级或子窗口）](../Other/IDP_WINDOWEXPRESSION.md)。
  - 若省略或为 ""，使用活动窗口。
  - 仅搜索首个匹配的顶级窗口。
  - 在 `acc` 中，也可为 `Acc` 或 `IAccessible` 类型的可访问对象。
- **class** - 直接容器窗口的类名，通常为 **window** 的[子窗口](../Other/IDP_WINDOWSTYLES.md)。
  - 需完整类名或含通配符（QM 2.3.4 起），不区分大小写。
  - 可包含控件 ID，格式为 "[id=digits] [classname]"。
  - 默认：""（任意）。
  - 若 **window** 为可访问对象，则忽略。
- **value** - 对象值。
  - 示例：编辑控件的文本、链接的 URL、树视图项的层级。多数对象无值。
  - 默认可为部分值，不区分大小写。
  - 空字符串 ("") 匹配任意值。
- **flags**：
  | 值 | 描述 |
  |----|------|
  | 1 | **name** 为完整名称或含[通配符](IDP_MATCHW.md) (*?)，"*" 匹配无名称对象，不可与标志 2 共用。 |
  | 2 | **name** 为[正则表达式](../RegExp/IDP_PCRE.md)，默认区分大小写（除非含 (?i)）。 |
  | 4 | **value** 为完整值或含通配符，"*" 匹配无值对象。 |
  | 8 | **value** 为正则表达式，默认区分大小写（除非含 (?i)）。 |
  | 16 | 搜索不可见对象及其后代。 |
  | 32 | 搜索无用对象及其后代（滚动条、抓手、不可见标题栏、分隔符）。 |
  | 64 | 仅搜索直接子对象（当 **window** 为可访问对象时有用）。 |
  | 128 | 逆序搜索（从底部开始），仅应用于 **class** 子窗口中的对象，子窗口搜索顺序不变，仅 `acc` 支持。 |
  | 0x1000 | 若对象未找到，报错，仅 `acc` 支持。 |
  | 0x2000 | QM 2.3.3：仅搜索网页活动标签（加快 `acc` 速度，忽略 **class**，**window** 须为浏览器窗口，非控件或可访问对象），支持 IE、Firefox、Chrome、Thunderbird，仅 `acc` 支持。 |
  | 0x4000 | QM 2.3.3：**value** 为 CSV 格式的属性，详见 `Acc.Find`。 |
  | 0x10000 | QM 2.4.3：消除 Firefox 某些网页 1-2 秒延迟（用于 DOCUMENT 始终为 "busy" 状态的页面，需与 0x2000 共用，建议结合 **waitS**）。 |
- **x y** - 对象所在[坐标](../Other/IDP_PIXELS.md)，默认 0 0（任意）。
  - 语法 1：需为对象左上角坐标。
  - 语法 2：`acc` 获取包含该点的对象。
  - 语法 1 中已废弃，推荐使用标志 0x4000 的 CSV 指定。
- **navig** - 后导航字符串，详见备注。
- **waitS** - 等待对象出现的时间（秒）。
- **matchindex** - （QM 2.2.0）基于 1 的匹配对象索引，用于区分窗口中多个匹配的对象（基于 **name**、**role**、**class**、**value**、**flags**、**x**、**y**）。
- **flags2**：
  | 值 | 描述 |
  |----|------|
  | 0 | 默认，屏幕坐标（若 **window** 为 0）或窗口客户区坐标。 |
  | 1 | **x y** 为窗口客户区坐标。 |
  | 2 | **x y** 为屏幕坐标。 |
  | 3 | **x y** 为屏幕工作区坐标。 |
- **hwnd** - 窗口句柄（子窗口或顶级窗口）。
- **mouse** - 字面值 `mouse`，表示鼠标指针位置。
- **object** - `Acc` 类型的可访问对象变量。
- **htmlelement** - [HTML 元素](IDP_HTM.md)，`Htm` 或 `IHTMLElement` 类型变量。

### 已废弃标志
以下标志不用于 `Acc` 类函数，推荐使用标志 0x4000 的 CSV 指定：
| 值 | 描述 |
|----|------|
| 0x100 | **x y** 为窗口客户区坐标，若 **window** 为可访问对象则忽略，需为屏幕坐标。 |
| 0x200 | **x y** 为屏幕坐标。 |
| 0x300 | **x y** 为屏幕工作区坐标。 |
| 0x400 | **value** 为描述。 |
| 0x800 | 检查对象状态，**x** 为状态，**y** 为状态掩码（需匹配的状态标志为 1，其余为 0；若 **y** 为 -1，需完全匹配），状态常量见 [MSDN](../Other/IDP_MSDN.md)（如 `STATE_SYSTEM_READONLY`）。 |
| 0x8000 | 使用[回调函数](../Other/IDP_ENUMWIN.md)。 |

## 备注

- **语法 1**：查找名称及其他属性匹配的可访问对象。
- **语法 2**：从窗口中的指定点获取对象。若 **window** 省略或为 ""，使用活动窗口；若为字面值 0，坐标为屏幕坐标，搜索任意窗口。
- **语法 3**：从鼠标指针位置获取对象。
- **语法 4**：获取窗口（**hwnd**）自身的可访问对象（子窗口或顶级窗口）。可用 [child](IDP_CHILD.md) 获取窗口句柄。
- **语法 5**：获取焦点可访问对象。
- **语法 6**：获取相邻对象。
- **语法 7**：获取与 HTML 元素 **htmlelement** 匹配的可访问对象。

- `acc` 需赋值给 [Acc 类型](../IDP_ACCESSIBLE.md) 变量。若对象未找到，变量为空，可用 `if(a.a=0) out "not found"` 检查，或使用标志 0x1000（未找到报错）结合 [err](../Flow/IDP_ERR.md)。若窗口不存在，总是报错。
- `acctest` 比较可访问对象属性，返回 1（匹配）或 0（不匹配）。若省略 **window** 或为字面值 0，不比较窗口。
- 使用“Find Accessible Object”对话框捕获对象并生成代码。自 QM 2.3.3 起，生成代码形如 `Acc a.Find(...)`，其调用 `acc`，参数类似。

### 后导航（navig）
**navig** 字符串用于获取相邻对象（后导航）。`acc` 找到指定对象后，根据 **navig** 导航到目标对象。支持以下单词或缩写：
| 单词 | 描述 |
|------|------|
| **u**p, **d**own, **le**ft, **r**ight | 空间导航（多数对象不支持）。 |
| **n**ext, **pr**evious | 下一个或上一个兄弟对象。 |
| **pa**rent | 父对象。 |
| **f**irst, **la**st | 第一个或最后一个子对象。 |
| **c**hild | 指定子对象，需附加基于 1 的子对象索引。 |

每个单词可后接数字表示导航次数，如 "next3" 等同于 "next next next"。示例："pa n2 c15 f" 表示获取父对象、向前导航两次、获取第 15 个子对象、获取第一个子对象。

后导航适用于无法唯一标识的对象（无名称等），可先找到附近对象，再导航至目标对象，也可减少搜索时间。使用“Find Accessible Object”对话框查看对象关系。导航并非所有方向都有效，部分不可见对象可能被跳过（除 parent 和 child）。若窗口或网页结构稳定，可通过导航顶级对象（如 PANE 或 DOCUMENT）快速定位目标对象。

### 其他
- `acc` 比 `id` 和 `child` 函数慢得多。若结构稳定，使用后导航可显著减少搜索时间。
- 常用于网页。对于 IE 及基于 IE 的浏览器，可用 [htm](IDP_HTM.md) 查找 HTML 元素，通常更快。在 Firefox 和 Chrome 中，可尝试“Find Accessible Object”对话框中的“as Firefox node”选项。

## 示例

```cpp
Acc a=acc("Google Search" "PUSHBUTTON" " Internet Explorer" "Internet Explorer_Server" "" 0x1001)
a.DoDefaultAction
```