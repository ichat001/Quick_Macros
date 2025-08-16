# GUID - 全局唯一标识符

**全局唯一标识符**（或**通用唯一标识符**，GUID）用于标识 COM 接口、COM 类、类型库等，相当于一个全局唯一的名称。GUID 可以存储为 `GUID` 类型的变量，或以字符串形式表示，如 `{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}`，其中 X 为十六进制数字 0 到 F。在编程中，GUID 有时被称为 IID（接口）、CLSID（类）、REFIID 等。

## 操作

- 使用 [uuidof](IDP_UUIDOF.md) 获取 COM 接口或类的 GUID 指针，或将 GUID 字符串转换为变量。
- 使用 `str.FromGUID` 将 GUID 变量转换为字符串。
- 使用 `str.Guid` 或 `CoCreateGuid` 创建新的 GUID。

## QM 项目 GUID

在 QM 2.4.0 及更高版本中，[QM 项目](IDH_ITEMS.md) 也具有 GUID。QM 可以通过名称或 GUID 字符串查找项目，支持 [QM 命令行](IDH_TRIG_COMMANDLINE.md)、[qmitem](IDP_QMITEM.md) 等函数。GUID 字符串后可跟任意文本（被忽略）。例如：

```qm
int iid=qmitem("{a138af76-23b1-4ef8-a4e1-7f459f948dbd}Macro1")
```

### 使用 GUID 的优势

使用 QM 项目 GUID 而非名称（例如在命令行中）的主要原因是：即使项目重命名，包含 GUID 的命令行仍有效。若仅使用名称，重命名后需修改命令行。

### 注意事项

不同 [QM 文件](IDH_QML.md) 中同名的项目通常具有不同的 GUID，仅在复制的文件中可能具有相同的 GUID。QM 项目 GUID 不可更改。