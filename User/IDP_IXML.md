# IXml 和 IXmlNode 接口

## 概述
`IXml` 和 `IXmlNode` 接口用于处理 [XML](http://www.w3.org/XML/) 数据。XML 是一种文本文件格式，适合存储表格或层次数据结构（树）。相比 [CSV](IDP_ICSV.html) 或 `Sqlite`，XML 更适合复杂层次数据。有关 XML 的更多信息可参考网络资源。

### XML 示例
```xml
<note>
    <to>Tove</to>
    <from>Jani</from>
    <heading>Reminder</heading>
    <body>Don't forget me this weekend!</body>
</note>
```

- **文件搜索**：在 Windows 上按 `Win+F` 搜索 `*.xml` 文件可找到许多程序使用的 XML 示例。
- **与 MSXML 对比**：
  - MSXML 是 Windows 的 COM 组件，功能更丰富，但速度慢、占用内存多，且不同 Windows 版本的 MSXML 版本不同。
  - `IXml` 速度快、内存占用低、无需加载 DLL，支持所有 Windows 版本，但仅提供基本 XML 功能，不支持命名空间、DTD、模式、XPath（部分支持）等高级功能，仍可解析和生成包含这些特性的文档。

- **新增版本**：**QM 2.3.0**。
- **创建**：使用 `CreateXml` 或 `_create`（**QM 2.3.4**）。
- **操作**：通过 `IXml` 和 `IXmlNode` 接口。

### 示例
#### 加载和添加节点
```qm
out
IXml x._create
x.FromFile("$qm$\test.xml") ;; 加载 XML 文件
err out "Error: %s" x.XmlParsingError; ret ;; 文件损坏报错
IXmlNode my=x.RootElement.Add("myelement") ;; 在根元素下添加新元素
my.Add("mysubelement" "text of my subelement") ;; 添加子元素
my.Add("mysubelement2" "some text").SetAttribute("a" "my attribute") ;; 添加子元素和属性
str s
x.ToString(s) ;; 生成 XML 字符串
out s
```

#### 创建新 XML 文档
```qm
out
IXml x._create
x.Add("?xml") ;; 添加 XML 声明（可选）
IXmlNode re=x.Add("rootelem") ;; 添加根元素（必须且唯一）
re.Add("child" "text").SetAttribute("a" "10") ;; 添加子元素和属性
IXmlNode e=re.Add("elem2") ;; 添加另一子元素
e.Add("cc" "text of cc") ;; 添加子节点的子节点
e=e.Add("cc2") ;; 添加另一子节点
e.SetAttribute("a" "AAA") ;; 添加属性
e.SetAttribute("b" "BBB") ;; 添加另一属性
str v1=re.ChildValue("child") ;; 获取子节点值
e=x.Path("rootelem/elem2/cc2/@b") ;; 按路径查找节点
str v2=e.Value ;; 获取其值
out v1
out v2
out "-----"
str s
x.ToString(s) ;; 生成 XML 字符串
out s
```

#### 显示所有 XML 节点
```qm
function IXml&xml [withAttr]
;; 显示所有 XML 节点及其属性
;; 示例：IXml x=CreateXml; x.FromFile("$my qm$\test.xml"); XmlOut x 1
lpstr st="root[]el[]a[]text[]xml[]DOC[]PI[]CD[]comm"
ARRAY(str) at=st
ARRAY(IXmlNode) a; int i
xml.Root.GetAll(withAttr!=0 a)
for(i 0 a.len)
    XMLNODE xi; a[i].Properties(&xi)
    out "%-15s %-4s F=0x%X L=%i V='%s'" xi.name at[xi.xtype] xi.flags xi.level xi.value
```

## XML 节点类型
以下是 XML 文档中支持的节点类型及其属性：

| 节点类型            | 常量 (xtype) | 示例                                                                 | 名称          | 值                                                                 | 可有子节点 | 可有属性 | 可为根节点         | 可为非根节点 |
|---------------------|--------------|----------------------------------------------------------------------|---------------|--------------------------------------------------------------------|------------|----------|--------------------|--------------|
| 虚拟根节点         | XT_Root 0    | 不存在于 XML 中                                                     |               |                                                                    | 是         |          |                    |              |
| 元素               | XT_Element 1 | `<elem>text</elem>`, `<example></example>`, `<empty />`, `<s1 u="1">Tabs</s1>` | 元素名称      | 标签间文本，`<elem />` 或 `<elem></elem>` 或有子节点时为空          | 是         | 是       | 是（仅 1 个）      | 是           |
| 属性               | XT_Attribute 2 | `a="1"`, `encoding="utf-8"`                                         | 属性名称      | 引号中的文本                                                       |            |          |                    |              |
| 文本               | XT_Text 3    | `text`, `line1`, `line2`                                            |               | 文本（含空格和换行），仅当父元素有其他子节点时作为单独节点         |            |          |                    | 是           |
| XML 声明           | XT_XmlDeclaration 4 | `<?xml version="1.0" encoding="utf-8" ?>`                     | ?xml          |                                                                    |            | 是       | 是（1 个，首个）   |              |
| DOCTYPE            | XT_DocumentType 5 | `<!DOCTYPE example >`                                         | !DOCTYPE      | `<!DOCTYPE` 和 `>` 间的文本（不含首尾空格），QM 不解析             |            |          | 是（1 个，根元素前） |              |
| 处理指令           | XT_ProcessingInstruction 6 | `<?xml-stylesheet type="text/xsl" href="example.xsl"?>` | ?name         | `<?instructionname` 和 `?>` 间的文本（不含首尾空格），QM 不解析    |            |          | 是                 | 是           |
| CDATA              | XT_CDATA 7   | `<![CDATA[can contain < & etc]]>`                             | ![            | `<![CDATA[` 和 `]]>` 间的文本（含空格）                            |            |          |                    | 是           |
| 注释               | XT_Comment 8 | `<!--this is an example xml-->`                              | !-            | `<!--` 和 `-->` 间的文本（含空格）                                 |            |          | 是                 | 是           |

- **注意**：XML 的“结束标签”和“空白”类型由 QM 自动管理，不作为独立节点。

## 接口说明
- **`IXml`**：表示整个 XML 文档，负责加载、保存、解析和生成 XML，管理节点并提供访问函数。
- **`IXmlNode`**：表示 XML 文档中的单个节点，提供获取/设置节点值、属性、查找节点、添加子节点等功能。

## 全局函数

### CreateXml
```qm
IXml'CreateXml [flags] ;; flags: 1 normalize newlines, 2 enable UserData, 4 ignore encoding, 8 auto save, 0x100 safe save, 0x200 safe save+backup
```
- **功能**：创建 XML 对象并返回 `IXml` COM 接口指针。
- **参数**：
  - `flags`：同 `Flags` 函数（见下文）。
- **备注**：**QM 2.3.4** 支持 `_create` 替代。

## IXml 成员函数

### Flags
```qm
[p]Flags(flags) ;; 1 normalize newlines, 2 enable UserData, 4 ignore encoding, 8 auto save, 0x100 safe save, 0x200 safe save+backup
[g]#Flags()
```
- **功能**：设置或获取其他函数的行为标志。
- **参数**：
  - `flags`：
    - `1`：解析时将换行符（`[]`, `[13]`）替换为 `[10]`（XML 标准），生成时使用 `[]`；未设置时不处理换行。
    - `2`：启用 `IXmlNode.UserData`（默认禁用）。
    - `4`：解析时忽略 XML 声明中的 `encoding` 属性（见“XML 编码”）。
    - `8`：自动保存，`FromFile` 成功后，在销毁 `IXml` 对象前自动保存到同一文件（调用 `FromString` 后失效）。
    - `0x100`（**QM 2.4.0**）：安全保存，添加到 `ToFile` 标志。
    - `0x200`（**QM 2.4.0**）：安全保存并备份，添加到 `ToFile` 标志。

### Root
```qm
[g]IXmlNode'Root()
```
- **功能**：获取虚拟根节点（XML 中不存在，用于作为 XML 声明、DOCTYPE、根元素等的父节点）。

### RootElement
```qm
[g]IXmlNode'RootElement()
```
- **功能**：获取根元素（如 `<elem>text</elem>` 中的 `elem`）。

### Path
```qm
IXmlNode'Path($path [ARRAY(IXmlNode)&allMatching])
```
- **功能**：按路径获取节点（`IXmlNode` 接口也有此函数）。

### Add
```qm
IXmlNode'Add($name [$value])
```
- **功能**：在根节点添加节点，自动将 XML 声明和 DOCTYPE 放在正确位置（`IXmlNode` 接口也有此函数）。

### Delete
```qm
Delete(IXmlNode&node)
```
- **功能**：删除节点（`node` 为 `IXmlNode` 类型变量），若为元素则删除其属性、文本和子节点，也可删除属性。

### Clear
```qm
Clear()
```
- **功能**：删除所有节点。

### XmlParsingError
```qm
[g]$XmlParsingError
```
- **功能**：若 `FromString` 或 `FromFile` 解析失败，返回错误处的 XML 子字符串。

### Count
```qm
[g]#Count()
```
- **功能**：返回 XML 中节点总数（包括属性）。

### FromString
```qm
IXmlNode'FromString($s)
```
- **功能**：解析 XML 字符串并在内存中创建节点树，返回根元素。

### ToString
```qm
ToString(str&so)
```
- **功能**：从节点树生成 XML 字符串。

### FromFile
```qm
IXmlNode'FromFile($file [$defaultXML])
```
- **功能**：解析 XML 文件并创建节点树，返回根元素。
- **参数**：
  - `file`：文件路径，支持 [宏资源](IDP_RESOURCES.html)（**QM 2.4.1**）和 [EXE 资源](IDH_MAKEEXE.html)。
  - `defaultXML`：若文件不存在，初始化对象（如 `FromString`），需至少包含根元素（如 `"<r/>"`）。
- **备注**：成功后记录 `file`，用于自动保存（标志 `8`）和 `ToFile`；`FromString` 或失败的 `FromFile` 会清除记录。

### ToFile
```qm
ToFile([$file] [flags]) ;; flags: 0x100 safe, 0x200 safe+backup
```
- **功能**：保存到 XML 文件。
- **参数**：
  - `file`：省略或空时使用 `FromFile` 的文件。
  - `flags`（**QM 2.4.0**）：
    - `0x100`：安全保存，写入临时文件后重命名，防止断电等损坏。
    - `0x200`：安全保存并备份，生成 `<file>-backup`。
- **备注**：可通过 `Flags` 或 `CreateXml` 设置 `0x100` 或 `0x200` 用于自动保存；**QM 2.3.5** 创建不存在的父文件夹。

## IXmlNode 成员函数

### XmlDoc
```qm
[g]IUnknown'XmlDoc()
```
- **功能**：获取父 `IXml` 对象。

### Parent, Prev, Next, FirstChild, LastChild
```qm
[g]IXmlNode'Parent()
[g]IXmlNode'Prev()
[g]IXmlNode'Next()
[g]IXmlNode'FirstChild()
[g]IXmlNode'LastChild()
```
- **功能**：获取父节点、兄弟节点或子节点，`Parent`、`Prev`、`Next` 也适用于属性节点。

### Child
```qm
[g]IXmlNode'Child($name [index])
```
- **功能**：按名称和/或索引获取子节点，建议用 `ChildValue` 获取值。
- **参数**：
  - `name`：子节点名称，`"*" `匹配任意名称，支持 [通配符](IDP_MATCHW.html)（**QM 2.3.5**）和过滤表达式（见 `Path`）。
  - `index`：基于 1 的匹配索引，`"*" `时为所有子节点索引，否则为匹配 `name` 的子节点索引，省略或 `0`/`1` 获取首个匹配。

### Attribute
```qm
[g]IXmlNode'Attribute($name)
```
- **功能**：获取属性节点，`"*" `获取首个属性，`""` 获取最后一个，建议用 `AttributeValue` 获取值。

### Path
```qm
IXmlNode'Path($path [ARRAY(IXmlNode)&allMatching] [flags])
```
- **功能**：按路径获取节点。
- **参数**：
  - `path`：节点路径（如 `"rootElement/itsChild/theNode"`），非完整 XPath，但支持部分特性：
    - `IXml.Path` 从 XML 树根开始。
    - `IXmlNode.Path` 从当前节点（不含自身）开始，除非路径以 `/` 开头。
    - 支持路径：`"node"`、`"elem/node"`、`"elem/@a"`、`"*" `、`"elem/*"`、`"elem/@*"`、`"*/node"`、`"../node"`、`"/*/node"`（**QM 2.3.5**）、`".//node"`（**QM 2.3.5**，任意后代，若为 `"//node"` 从根搜索）。
  - `allMatching`：接收所有匹配节点的数组，可为 `0`。
  - `flags`（**QM 2.3.5**）：
    - `1`：搜索所有匹配路径（如 XPath，`"elem1/elem2"` 搜索所有 `elem1` 中的 `elem2`）。
    - `2`：路径末尾为 `"*"` 时仅获取元素节点。
- **过滤表达式**：
  - 格式：`elem[expression]`，如 `"elem[='abc']"`（值等于 `"abc"`）、`"elem[@id='abc']"`（属性 `id` 等于 `"abc"`）。
  - 操作符：`= `（字符串不区分大小写或整数，**QM 2.3.5**）、`*=`（通配符匹配）、`!`（逻辑非，如 `!=`）、`>`、`<`、`>=`、`<=`、`&`（**QM 2.3.5**，整数比较）。
  - 示例：`"elem1[@id='abc']/elem2"`、`"elem[@id*='ab*']"`、`"elem[node]"`（**QM 2.3.5**，有子节点 `node`）。
- **备注**：使用 [F 字符串](IDP_FSTRING.html) 或 [str.format](IDP_S_FORMAT.html) 动态构造路径。

### Name
```qm
[g]$Name()
```
- **功能**：获取节点名称，也适用于属性。

### Value
```qm
[g]$Value()
[p]Value($value)
```
- **功能**：获取或设置节点值，也适用于属性。
- **错误**：设置 CDATA 值含 `]]>` 或注释值含 `--` 时抛出错误，元素和属性值支持任意字符（特殊字符转义为 XML 转义序列）。

### ValueBinaryGet, ValueBinarySet
```qm
ValueBinaryGet(str&value)
ValueBinarySet(str&value [flags]) ;; flags: 1 compress, 2 hex
```
- **功能**：
  - `ValueBinarySet`：设置节点值，`value` 可含二进制数据，XML 中转换为文本。
  - `ValueBinaryGet`：获取由 `ValueBinarySet` 设置的值。
- **参数**：
  - `flags`：
    - `1`：压缩。
    - `2`：使用 Hex 编码（快速编码/解码，编码后大 100%），否则使用 Base64（快速编码，慢解码，大 33%）。

### Type
```qm
[g]#Type()
```
- **功能**：返回节点类型（`XT_Root` 等，见节点类型表），也适用于属性。

### UserData
```qm
[g]#UserData()
[p]UserData(userdata)
```
- **功能**：附加或获取节点的数值，仅内存中使用，不保存到 XML，默认禁用，需用 `CreateXml` 标志 `2` 启用，也适用于属性。

### Properties
```qm
Properties(XMLNODE&xi)
```
- **功能**：获取节点所有属性，`xi` 为 `XMLNODE` 类型变量，也适用于属性。
- **XMLNODE 结构**：
  ```qm
  type XMLNODE $name $value @level !xtype !flags userdata
  ```
  - `name`, `value`, `xtype`, `userdata`：见上文。
  - `level`：节点在 XML 层次中的级别（根节点为 `0`，子节点为 `1`，依此类推）。
  - `flags`：
    - `1`：元素有文本。
    - `2`：元素有子节点（不能同时有文本和子节点）。
    - `4`：元素或 XML 声明有属性。
    - `128`：属性在 XML 声明中。

### ChildValue
```qm
[g]$ChildValue($name [index])
```
- **功能**：获取子节点值，等效于 `Child("name").Value`，参数同 `Child`。

### AttributeValue, AttributeValueInt
```qm
[g]$AttributeValue($name)
[g]#AttributeValueInt($name)
```
- **功能**：
  - `AttributeValue`：获取属性值，等效于 `Attribute("name").Value`。
  - `AttributeValueInt`：获取属性值并转换为整数。

### Add
```qm
IXmlNode'Add($name [$value])
```
- **功能**：添加子节点并可选设置值，添加到子节点列表末尾，不替换同名节点（用 `SetChild`），不用于添加属性（用 `SetAttribute`）。

### Insert
```qm
IXmlNode'Insert(IXmlNode'iafter $name [$value])
```
- **功能**：同 `Add`，但在 `iafter`（子节点，`IXmlNode` 类型）后插入，`iafter` 为 `0` 时插入开头。

### SetChild
```qm
IXmlNode'SetChild($name $value)
```
- **功能**：添加或替换子节点，若存在则设置值（如 `Value`），否则添加（如 `Add`）。

### SetAttribute, SetAttributeInt
```qm
IXmlNode'SetAttribute($name $value)
IXmlNode'SetAttributeInt($name value)
```
- **功能**：
  - `SetAttribute`：添加或替换属性，确保无重复属性。
  - `SetAttributeInt`：同上，`value` 为整数。

### Move
```qm
Move(IXmlNode'parent IXmlNode'iafter)
```
- **功能**：移动元素到新位置，仅限元素。
- **参数**：
  - `parent`：新父元素，`0` 表示同一父节点内移动。
  - `iafter`：插入后的节点，`0` 表示插入开头。

### GetAll
```qm
GetAll(flags ARRAY(IXmlNode)&a)
```
- **功能**：获取所有后代节点（直接子节点及其后代）。
- **参数**：
  - `flags`：
    - `1`：包含属性。
    - `2`：仅获取直接子节点。
  - `a`：接收节点数组。
- **备注**：对虚拟根节点调用获取整个 XML 所有节点，特定节点用 `Path`（如 `x.Path(".//name" a)`）。

### ChildCount
```qm
[g]#ChildCount()
```
- **功能**：返回直接子节点数量，特定子节点数用 `Path` 和数组长度。

### DeleteChild
```qm
DeleteChild($name)
```
- **功能**：删除匹配 `name` 的所有子节点。
- **参数**：
  - `name`：子节点名称，`"*" `删除所有子节点，支持 [通配符](IDP_MATCHW.html) 和过滤表达式（见 `Path`）。
- **备注**：无匹配节点不报错，设置 `_hresult=1`（**QM 2.4.0**）。

### DeleteAttribute
```qm
DeleteAttribute($name)
```
- **功能**：删除属性，无属性不报错，设置 `_hresult=1`（**QM 2.4.0**）。

## 注意事项

### XML 编码
- **支持格式**：`IXml` 支持 ANSI 和 Unicode（UTF-8 或 UTF-16）XML 文件。
- **UTF-16**：加载时转换为 UTF-8。
- **ANSI（Unicode 模式）**：若 XML 声明的 `encoding` 为 `ISO-8859-x` 或 `Windows-125x`，转换为 UTF-8（除非用标志 `4` 或系统不支持该编码）。
- **输出**：`ToFile` 和 `ToString` 始终生成 UTF-8 格式。
- **ANSI 模式**：忽略 `encoding` 属性，不转换 UTF-8 到 ANSI。
- **建议**：在 ANSI 模式下若 XML 含非 [ASCII](IDP_ASCII.html) 字符且用于其他程序，添加 XML 声明和 `encoding` 属性；在 Unicode 模式下无需，因 QM 和 XML 默认编码均为 UTF-8。

### XML 验证和错误
- **验证**：加载 XML 或添加节点/设置值时严格验证，不合规（如格式错误、名称/值无效）抛出错误，部分情况自动更正。
- **获取节点**：节点不存在不抛出错误，返回 `0` 并设置 `_hresult=1`。

### 其他
- **线程安全**：函数非线程安全，同一变量不可多线程同时使用，需用 [lock](IDP_LOCK.html) 保护。
- **IXmlNode 引用**：
  - 不使用引用计数，父 `IXml` 销毁、清空或节点删除后，`IXmlNode` 变量不可用。
  - `IXmlNode` 变量需在 `IXml` 变量后声明，否则可能引发异常或数据损坏。