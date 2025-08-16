# QM 文件管理函数、宏设置和资源

## 概述
在 Quick Macros (QM) 中，可通过 `_qmfile` 特殊变量调用函数管理 [宏资源](IDP_RESOURCES.html) 和当前 [QM 文件](IDH_QML.html) 的其他数据。**不可用于 EXE**。大多数函数在 **QM 2.4.0** 新增，部分在 **QM 2.4.1**。

- **错误处理**：所有函数在失败时抛出错误（如宏或资源不存在）。`Get` 函数在资源或设置不存在时抛出错误，可用 [err](IDP_ERR.html) 捕获。`Delete` 和 `Enum` 函数在无匹配资源或设置时不报错。`Add` 函数添加或替换资源/设置。
- **子函数**：[子函数](IDP_DIR_SUB.html) 不能拥有资源和设置，但可使用父 QM 项目的资源和设置。

## 宏资源管理函数
用于管理 [宏资源](IDP_RESOURCES.html)。

```qm
ResourceAdd($macro $resName !*data nBytes)
ResourceGet($macro $resName str&data [flags])
ResourceDelete($macro $resNameWildcard)
ResourceRename($macro $oldName $newName)
ResourceEnum($macro $resNameWildcard ARRAY(str)&aName [ARRAY(str)&aData])
```

### 参数
- **macro**：要管理的 QM 项目，可为：
  - [QM 项目](IDH_ITEMS.html) 名称（全名，不区分大小写）、`+id`（整数，参见 [qmitem](IDP_QMITEM.html)）、项目路径或 [GUID](IDP_GUID.html) 字符串。
  - `0`：文件资源（不附属于宏）。
  - `+-1`：调用文件管理函数的 QM 项目。
  - `+-2`：调用文件管理函数的 QM 项目（函数）的调用者。
  - `+-3` 或 `""`：当前在代码编辑器中打开的 QM 项目。
- **resName**：资源名称（如 `"image:bird"` 或 `"cut.ico"`）。
  - `ResourceGet` 支持格式 `"resource:<macro>name"`（忽略 `macro` 参数）或 `"resource:name"`。
  - 不能包含 `"'<>\n` 字符，需区分大小写。
- **data, nBytes**（`ResourceAdd`）：资源数据的指针和大小。
- **data**（`ResourceGet`）：接收资源数据的 `str` 变量。
- **flags**（`ResourceGet`）：
  - `1`：若 `macro` 无该资源，从调用栈中的调用者查找。
  - `2`：若 `macro` 无该资源但同一 QM 文件的其他项目有同名资源，在 QM 输出中显示提示。
- **resNameWildcard**（`ResourceDelete`, `ResourceEnum`）：资源名称，支持 [SQLite GLOB](IDP_WILDCARD.html) 通配符，`""` 或 `"*"` 表示全部。
- **oldName, newName**（`ResourceRename`）：当前和新资源名称。
- **aName**（`ResourceEnum`）：接收匹配资源名称的数组。
- **aData**（`ResourceEnum`）：可选，接收匹配资源数据的数组。

### 示例
```qm
str s1 s2
; 从文件导入图像资源
s1.getfile("$my qm$\test.bmp")
s1.encrypt(32) ;; LZO 压缩
_qmfile.ResourceAdd("Macro2193" "image:test" s1 s1.len)

; 导出图像资源到文件
_qmfile.ResourceGet("Macro2193" "image:test" s2)
err out "resource not found"; ret
s2.decrypt(32) ;; LZO 解压
s2.setfile("$my qm$\test2.bmp")
```

## 宏设置管理函数
宏设置用于存储宏的配置数据，保存在主 QM 文件中（包括共享文件中的宏设置），不用于临时 QM 项目（Temp 文件夹）。与注册表（[rset, rget](IDP_RGET.html)）或文件相比，QM 文件设置特定于该文件，QM 自身也用此存储工具栏位置等设置。**不可用于 EXE**。

```qm
SettingAddB($macro $settName !*data nBytes)
SettingAddS($macro $settName $data)
SettingAddI($macro $settName data)
SettingGetB($macro $settName !*data nBytes)
$SettingGetS($macro $settName [str&data])
#SettingGetI($macro $settName)
SettingDelete($macro $settName)
```

### 参数
- **macro**：同资源管理函数的 `macro`。
- **settName**：设置名称，需区分大小写，`SettingDelete` 支持通配符。
- **data, nBytes**（`SettingAddB`）：数据指针和大小。
- **data**（`SettingAddS`）：字符串值。
- **data**（`SettingAddI`）：整数值。
- **data, nBytes**（`SettingGetB`）：接收数据的内存缓冲区和最大字节数，若数据大小小于 `nBytes` 抛出错误。
- **data**（`SettingGetS`）：接收数据的 `str` 变量，函数返回字符串。
- **data**（`SettingGetI`）：返回整数值。

### 示例
```qm
str s1 s2; int i1 i2; POINT p1 p2
; 添加或更新设置
s1="string value1"
_qmfile.SettingAddS("Macro2201" "name1" s1)

i1=100
_qmfile.SettingAddI("Macro2201" "name2" i1)

p1.x=10; p1.y=20
_qmfile.SettingAddB("Macro2201" "name3" &p1 sizeof(p1))

; 获取设置
_qmfile.SettingGetS("Macro2201" "name1" s2)
err out "setting not found"; ret
out s2
; 或
out _qmfile.SettingGetS("Macro2201" "name1" _s)

i2=_qmfile.SettingGetI("Macro2201" "name2")
out i2

_qmfile.SettingGetB("Macro2201" "name3" &p2 sizeof(p2))
out F"{p2.x} {p2.y}"
```

## 使用 Sqlite 类直接管理 QM 文件
QM 文件是 SQLite 数据库，可通过 `Sqlite` 类管理（如创建自定义表）。避免修改 QM 表（`items`, `texts`, `resources`, `xFind`, `xSett`, `xTags`）。以下函数用于访问当前加载的 QM 文件（主文件和共享文件），其他文件使用 `Sqlite.Open`。

```qm
!*SqliteBegin([iid])
SqliteEnd()
#SqliteItemProp($macro [int&rowid] [GUID&guid])
```

- **SqliteBegin**：返回当前加载的主 QM 文件的 SQLite 数据库引用，`iid`（QM 项目 ID）指定包含该项目的文件数据库。
- **SqliteEnd**：释放数据库访问，期间数据库被锁定，QM 或其他宏需等待。若未调用，数据库锁定至线程结束。
- **SqliteItemProp**：获取 QM 项目在数据库中的特定属性（无法通过 [qmitem](IDP_QMITEM.html) 或 [str.getmacro](IDP_S_MACRO.html) 获取）。
  - **macro**：同资源管理函数的 `macro`。
  - **rowid**：数据库中项目的行 ID（唯一，表中的 `id` 列，非 QM 项目 ID）。
  - **guid**：全局唯一标识符（表中的 `guid` 列）。
  - 返回 QM 项目 ID。

### 示例
```qm
; 获取包含 Macro2202 的数据库引用
Sqlite& x=_qmfile.SqliteBegin(qmitem("Macro2202")) ;; 注意：Sqlite& x，非 Sqlite x

; 使用 Sqlite 函数
str sql=
 CREATE TABLE IF NOT EXISTS myTable(a INT, b TEXT);
 INSERT INTO myTable VALUES(1, 'one'),(2, 'two');
x.Exec(sql)
SqliteStatement p.Prepare(x "SELECT b FROM myTable")
rep
    if(!p.FetchRow) break
    out p.GetText(0)

; SqliteItemProp 示例
int iid rowid; GUID guid
iid=_qmfile.SqliteItemProp("Macro2202" rowid guid)
out "%i %i %s" iid rowid _s.FromGUID(guid)

; 释放数据库
_qmfile.SqliteEnd
```

## 其他函数

### FullSave
```qm
FullSave()
```
- **功能**：等同于 QM 窗口的“保存”按钮，应用并保存所有更改，包括注册表设置、工具栏位置等，并将临时 `.qml-wal` 文件的更改转移到 `.qml` 文件（检查点）。可用于自定义备份。QM 在关闭文件、隐藏窗口等情况下内部调用。
- **示例**：
  ```qm
  _qmfile.FullSave
  ```

### GetLoadedFiles
```qm
GetLoadedFiles(ARRAY(str)&aFiles)
```
- **功能**：获取当前加载的 [QM 文件](IDH_QML.html) 路径。
- **参数**：`aFiles` - 接收路径字符串的数组，首个元素为主文件，其余为共享文件，不包括内存数据库（Temp、Deleted）。
- **示例**：
  ```qm
  ARRAY(str) a
  _qmfile.GetLoadedFiles(a)
  out a[0] ;; 主文件路径
  ```