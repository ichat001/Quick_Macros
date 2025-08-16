# IStringMap 接口

## 概述
`IStringMap` 接口用于管理字符串映射对象，即键值对数组。键是唯一的字符串，用于访问关联的值；值是与键关联的字符串。相比简单数组，字符串映射优化了查找速度，即使包含百万条目也能快速定位。适用于内存中的字典数据（如语言 A 的单词为键，语言 B 的单词为值）或存储唯一字符串列表（无需关联值）。

- **创建**：使用 `CreateStringMap` 函数或 `_create`（**QM 2.3.4**）。
- **操作**：通过 `IStringMap` 接口的成员函数。

### 示例
```qm
IStringMap m._create
lpstr s=
 key1 value1
 key2 value2
 key3 value3
m.AddList(s)

lpstr v=m.Get("key2")
if(v) out v
else out "not found"
```

## 全局函数

### CreateStringMap
```qm
dll "qm.exe" IStringMap'CreateStringMap flags ;; flags: 1 case insens., 2 exists - do nothing, 4 exists - replace, 8 exists - add new, 16 exists - compare
```
- **功能**：创建字符串映射对象并返回 `IStringMap` COM 接口指针。
- **参数**：
  - `flags`：同 `Flags` 函数（见下文）。
- **备注**：**QM 2.3.4** 支持 `_create` 替代。

## IStringMap 成员函数
成员函数调用格式：`variable.Function(arguments)`。以下为函数声明及说明，非直接调用示例。

---

### Flags
```qm
[p]Flags(flags) ;; 1 case insens., 2 exists - do nothing, 4 exists - replace, 8 exists - add new, 16 exists - compare
[g]#Flags()
```
- **功能**：设置或获取其他函数的行为标志。
- **参数**：
  - `flags`：
    - `1`：不区分大小写（如 `Get("a")` 可匹配 `"a"` 或 `"A"`）。
    - `2, 4, 8, 16`：处理 `Add`、`AddList` 或 `Rename` 添加已存在键时的行为：
      - **默认**：抛出错误。
      - `2`：不添加新键。
      - `4`：替换旧值（类似 `Set`）。
      - `8`：添加新条目（允许重复键，`Get`、`Get2`、`Set`、`Rename`、`Remove` 访问最先添加的键，`GetAll`、`GetAllOf`、`EnumNext` 按 FIFO 顺序，若结合 `4` 则按 LIFO）。
      - `16`：比较新旧值，相等则无操作，不同则按其他标志处理。
    - 评估顺序：`16` -> `8` -> `4` -> `2`.
- **错误**：映射非空时设置标志抛出错误。
- **示例**：
  ```qm
  IStringMap m._create; m.Flags=1
  ```

---

### Add
```qm
Add($k $v)
```
- **功能**：添加键值对，`v` 可为空（`""` 或 `0`，存为 `""`）。
- **错误**：键存在时抛出错误，除非使用 `Flags` 或 `CreateStringMap` 的标志 `2-16`。

---

### AddList
```qm
AddList($s $sep)
```
- **功能**：添加多组键值对，`s` 每行包含一个键值对，键值由 `sep` 分隔。
- **参数**：
  - `s`：键值对列表。
  - `sep`：分隔字符集（默认 `" [9]"`，空格和制表符）。若为空行或以分隔符开头则忽略，仅含键时值为空（`""`）。用 `"[]"` 作为 `sep` 可添加无值的键列表。
  - 若 `sep="csv"`（**QM 2.3.3**），`s` 解析为 [CSV](IDP_ICSV.html)，支持多行条目，`sep` 第 4 个字符指定分隔符（如 `"csv="` 用 `=`，默认 `,`），CSV 需含 1 或 2 列。
- **错误**：键存在时抛出错误，除非使用标志 `2-16`。

---

### Get
```qm
$Get($k)
```
- **功能**：返回键 `k` 关联的值。
- **备注**：
  - 若键不存在，返回 `0`，并设置 `_hresult=1`。
  - 返回值为指向内部数据的 `lpstr`，修改映射后失效，需赋给 `str` 变量保存。
  - 非线程安全（其他线程可能修改映射），但用于检查键存在（如 `if(m.Get("key"))`）始终安全。
  - 若键存在但值为空（`""`），返回 `""`，在 `if` 中为真。

---

### Get2
```qm
$Get2($k str&v)
```
- **功能**：同 `Get`，但将值存储到 `str` 变量 `v`，始终线程安全。
- **备注**：比 `Get` 略慢，适合多线程环境。

---

### Set
```qm
Set($k $v)
```
- **功能**：更改键 `k` 的值。
- **错误**：键不存在时抛出错误。

---

### Rename
```qm
Rename($k $newname)
```
- **功能**：更改键名。
- **错误**：键不存在时抛出错误。

---

### Remove
```qm
Remove($k)
```
- **功能**：移除键值对。
- **备注**：键不存在时不抛出错误，但设置 `_hresult=1`。

---

### RemoveAll
```qm
RemoveAll()
```
- **功能**：移除所有条目。

---

### Count
```qm
#Count()
```
- **功能**：返回条目数。

---

### GetAll
```qm
GetAll(ARRAY(str)&ak ARRAY(str)&av)
```
- **功能**：获取所有键和/或值，存储到 `ak`（键数组）和 `av`（值数组），可为 `0`（不存储）。
- **示例**：
  ```qm
  ARRAY(str) ak av
  m.GetAll(ak av)
  int i
  for(i 0 ak.len)
      out "%s %s" ak[i] av[i]
  ```

---

### GetAllOf
```qm
#GetAllOf($k ARRAY(str)&av)
```
- **功能**：获取匹配键 `k` 的所有值，存储到 `av`（可为 `0`）。
- **返回值**：匹配键的数量，无匹配返回 `0` 并设置 `_hresult=1`。
- **备注**：适用于标志 `8`（允许重复键）。

---

### GetList
```qm
GetList(str&s $sep)
```
- **功能**：将所有条目写入 `str` 变量 `s`，每行一个键值对，键值由 `sep` 分隔（默认 `" "`）。
- **备注**：若 `sep="csv"`（**QM 2.3.3**），生成 [CSV](IDP_ICSV.html) 字符串，`sep` 第 4 个字符指定分隔符（如 `"csv="` 用 `=`，默认 `,`），CSV 包含 2 列。

---

### EnumBegin
```qm
EnumBegin()
```
- **功能**：开始枚举条目。

---

### EnumNext
```qm
#EnumNext(str&k str&v)
```
- **功能**：获取下一个条目，存储键到 `k`，值到 `v`（可为 `0`）。
- **返回值**：成功返回 `1`，无更多条目返回 `0`。
- **示例**：
  ```qm
  str sk sv
  m.EnumBegin
  rep
      if(!m.EnumNext(sk sv)) break
      out "%s %s" sk sv
  ```

---

### EnumEnd
```qm
EnumEnd()
```
- **功能**：结束枚举（若枚举未完成所有条目，建议调用，但非必须）。

---

### IntAdd
```qm
IntAdd($k v)
```
- **功能**：同 `Add`，但 `v` 为整数（内部存储为字符串）。
- **备注**：简化数字值添加（相比 `Add` 需先转换为字符串）。

---

### IntGet
```qm
#IntGet($k int&v)
```
- **功能**：获取键 `k` 的值作为整数，存储到 `v`。
- **返回值**：键存在返回 `1`，否则返回 `0`。
- **备注**：简化数字值获取（相比 `Get` 等需用 `val` 转换）。

---

### IntSet
```qm
IntSet($k v)
```
- **功能**：同 `Set`，但 `v` 为整数。

## 注意事项
- **获取所有条目**：
  - `GetAll`：较慢，占用内存多，适合小映射。
  - `GetList`：生成字符串格式。
  - `EnumBegin`/`EnumNext`/`EnumEnd`：适合大映射，但不可在多线程中同时调用。
  - 条目按排序顺序返回。
- **线程安全**：
  - 除 `Get`（非线程安全，除检查键存在）和 `EnumX`（不可多线程同时调用），其他函数线程安全，可多线程同时使用同一映射对象。
- **错误处理**：
  - 错误描述为 `"The parameter is incorrect"`，常见于添加已存在键。
  - 解决方法：
    1. 使用 `Get` 检查键存在：
       ```qm
       if(!m.Get("key2"))
           m.Add("key2" "new value")
       else
           out "already exists"
       ```
    2. 使用 `err`（更快）：
       ```qm
       m.Add("key2" "new value")
       err
           out "already exists"
       ```
    3. 使用标志 `2-16`（`Flags` 或 `CreateStringMap`）。