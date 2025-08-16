# 注册表和 INI 文件函数

## 注册表函数

注册表是 Windows 和应用程序存储设置的数据库。宏也可以在此存储设置。

### 语法

```qm
int rset(data [name] [key] [hive] [options|datatype])
int rget(variable [name] [key] [hive] [default] [datatype])
```

### 参数

- **data** - 要存储到注册表的数据，可以是变量或其他表达式。
- **variable** - 接收注册表中存储数据的变量。
- **name** - 注册表值名称。使用 `""` 表示“(Default)”。
- **key** - 注册表键。
  - 默认（或 `""`）：`"Software\GinDi\QM2\User"`。
  - 如果以 `\` 开头，解释为默认键的子键。
  - 不得以 `"HKEY_CURRENT_USER\"` 或类似形式开头。
  - QM 2.3.0 起：可以是已打开的键句柄。
- **hive** - HKEY_... 常量之一（整数）。
  - 默认（或 0）：`HKEY_CURRENT_USER`。
  - 如需 64 位键，添加标志 `HKEY_64BIT`（例如 `HKEY_LOCAL_MACHINE|HKEY_64BIT`）。
- **default** - 如果值不存在时的默认值。字符串默认 `""`，数值变量默认 0。不可用于用户定义类型。
- **options**：
  | 值 | 描述 |
  |----|------|
  | 0（默认） | 写入数据。 |
  | -1 | 删除值。**data** 未使用，可为 0 或 `""`。 |
  | -2 | 删除子键。**data** 未使用，可为 0 或 `""`；**name** 为子键名称，**key** 为父键。QM 2.3.5 起：可仅使用 **key**，例如 `rset "" "" "ParentKey\KeyToDelete" 0 -2`。 |
  | -3 | 删除子键，仅当其不包含子键时。 |
  | -4 (QM 2.2.0) | 删除子键，仅当其为空（无子键和值）时。 |
- **datatype** - 注册表数据类型，仅用于字符串。可以是 REG_... 常量（如 `REG_BINARY`）。默认：`REG_SZ`。

### 说明

- **rset**：将 **data** 写入注册表。如果指定键不存在，则创建。也可用于删除值或键。
- **rget**：从注册表读取数据并存储到 **variable** 中。

函数成功时返回非零值：
- 对于字符串，返回字符串长度+1。
- 对于其他类型数据，返回注册表数据长度。
- 失败时（例如键/值不存在、访问被拒绝等）返回 0，可使用 [str.dllerror](IDP_S_DLLERROR.md) 获取错误描述。
- 删除时，`rset` 成功返回 1，失败返回 0。如果值或键不存在，返回 0，且 `GetLastError=ERROR_FILE_NOT_FOUND` 为真，除非因其他原因（如访问被拒绝 `ERROR_ACCESS_DENIED`）失败。

**警告**：除非确定不会造成损害，否则不要使用 `rset`。`rget` 是安全的。使用默认键（省略 **key**、`""` 或以 `\` 开头）是相对安全的，因为它仅操作 QM 宏专用键。

`HKEY_CURRENT_USER`（默认）用于当前用户设置，其他 hive 用于所有用户共享的设置。

**UAC**：在非管理员模式下，`rset` 无法写入除 `HKEY_CURRENT_USER` 外的其他 hive（参见 [UAC](IDP_VISTA.md)）。

#### 注册表数据格式

| 表达式/变量类型 | 注册表数据格式 |
|-----------------|----------------|
| str, lpstr | REG_SZ 或 **datatype** |
| int, byte, word | REG_DWORD |
| 其他 | REG_BINARY |

QM 2.3.0 起：若 **variable** 为 `str` 且 **datatype** 为 `REG_SZ`、0 或省略，`rget` 即使注册表数据类型非 `REG_SZ` 也能成功。`REG_EXPAND_SZ` 字符串会自动扩展，`REG_MULTI_SZ` 字符串也能正确检索，`REG_DWORD` 和 `REG_QWORD` 值会转换为字符串，其他非字符串类型数据直接复制到 `str` 变量。旧版 QM 中，若注册表数据类型非字符串类型，`rget` 会失败。字符串类型包括 `REG_SZ`、`REG_MULTI_SZ` 和 `REG_EXPAND_SZ`。

若 **variable** 为 `str` 且指定了非 0 或 `REG_SZ` 的 **datatype**，若注册表值的数据类型不同，`rget` 失败。对于其他类型变量，注册表数据类型也必须匹配。

不可使用除 `str` 外的复合类型变量（如 `ARRAY`、`BSTR`、`VARIANT`、接口指针或包含这些类型或 `str` 的类型）。`rget` 也不支持指针和 `lpstr`。包含 `str` 的类型可通过 [str.getstruct/str.setstruct](IDP_S_STRUCT.md) 转换后使用。

`rset` 和 `rget` 可仅使用一个参数，此时参数必须是变量（简单形式，无 `.` 或 `[]` 等），变量名用作注册表值名称。例如，`rset v` 等同于 `rset v "v"`。

#### 提示

若宏有许多设置，建议使用 `__Settings` 类，便于管理并可在网格控件中显示，供用户修改。

### 示例

```qm
;; 从 HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer 检索值 "Logon User Name"
str s
if(rget(s "Logon User Name" "Software\Microsoft\Windows\CurrentVersion\Explorer"))
    out s
else
    out "the value or the key does not exist"

;; 从 HKEY_CLASSES_ROOT\mp3file\shell\play\command 检索默认值
str s
if(rget(s "" "mp3file\shell\play\command" HKEY_CLASSES_ROOT))
    out s

;; 在 HKEY_CURRENT_USER\software\gindi\qm2\user\MyFunctionSettings 设置值 "test"
rset "data" "test" "\MyFunctionSettings"

;; 从 HKEY_CURRENT_USER\software\gindi\qm2\user\MyFunctionSettings 检索值 "test"
str s
rget s "test" "\MyFunctionSettings"
out s

;; 在 HKEY_CURRENT_USER\software\gindi\qm2\user 设置值 "test"
int test = 100
rset test

;; 从 HKEY_CURRENT_USER\software\gindi\qm2\user 检索值 "test"
int test
rget test
out test

;; 删除 HKEY_CURRENT_USER\software\gindi\qm2\user\MyFunctionSettings 中的值 "test"
rset "" "test" "\MyFunctionSettings" 0 -1

;; 删除 HKEY_CURRENT_USER\software\gindi\qm2\user 中的键 "MyFunctionSettings"
rset "" "MyFunctionSettings" "" 0 -2
```

---

## INI 文件函数

INI 文件可用于存储设置，但不推荐使用，因为其限制较多（不支持 Unicode、部分字符不可用、无层级结构等）。建议使用注册表存储小型设置，或使用 [XML](IDP_IXML.md)、[CSV](IDP_ICSV.md) 或 `Sqlite` 存储较大设置和其他数据。

### 语法

```qm
int rset(data name section inifile [options])
int rget(variable name section inifile [default])
```

### 参数

- **data** - 要存储到 INI 文件的数据，可以是变量或其他表达式。
- **variable** - 接收 INI 文件中存储数据的变量。
- **name** - INI 值名称（也称为 *key*）。与注册表相同。
- **section** - INI 节名称，在 INI 文件中以 `[ ]` 括起来。
- **inifile** - INI [文件](IDP_SEARCHPATHS.md)。默认：`"$my qm$\User.ini"`。
- **default** - 如果值不存在时的默认值，与注册表相同。
- **options**：
  | 值 | 描述 |
  |----|------|
  | 0（默认） | 写入数据。 |
  | -1 | 删除值。**data** 未使用，可为 `""`。 |
  | -2 | 删除节。**data** 和 **name** 未使用，可为 `""`。 |

### 说明

- **rset**：将 **data** 写入 INI 文件。如果文件或节不存在，则创建。
- **rget**：从 INI 文件读取数据并存储到 **variable** 中。

函数成功返回 1，失败返回 0。若 `rset` 失败，可使用 [str.dllerror](IDP_S_DLLERROR.md) 获取错误描述。

### 示例

```qm
;; 写入 INI 文件
rset "data" "a" "section" "$desktop$\test.ini"
```