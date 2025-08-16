# COM 对象创建函数

在声明接口指针变量时，其初始值为 0，即不指向任何对象。在调用 COM 对象函数之前，需要创建新对象或获取现有对象。本主题描述了用于此目的的函数，通用语法为：

```qm
ip.function(parameters)
```

其中 **ip** 是接口指针变量。每个函数返回 **ip** 本身。

## 函数

### ip._create([class] [dll])

创建指定 **class** 类型的新 COM 对象，并将对象的地址填充到 **ip** 中。

- **class**：如果省略或为 0，则使用 **ip** 的类（如果可能，从类型库中查找）。**class** 可以是对象的 CLSID 或 ProgID，可以是：
  - GUID*（参见 [uuidof](IDP_UUIDOF.md)）；
  - GUID 字符串，如 `"{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}"`；
  - ProgID 字符串，如 `"Application.Class"`。
- **dll**（QM 2.3.4 起）：如果 COM 组件位于 DLL 文件中，可以指定 **dll**，无需注册组件。但并非所有组件都支持此方式。如果 DLL 未找到，会尝试创建已注册的组件。在可执行文件中，如果 **dll** 以 `"$qm$"` 开头，则在可执行文件目录中搜索 DLL；如果未找到，且 QM 已安装，则在 QM 目录中搜索。

QM 2.3.5 起：可使用清单和 `__ComActivator` 类创建无需注册的 COM 组件，也支持 .NET COM 组件。

除非使用 **dll** 或 `__ComActivator`，COM 组件必须 [注册](IDP_COM_USAGE.md)。否则，QM 会尝试自动注册组件，但仅建议在测试新组件时使用。自动注册需要管理员权限，因此在非管理员模式下运行 QM 时无效，也不可用于 [可执行文件](IDH_MACRO.md)。有关安装/注册和使用 COM 组件的详细信息，参见 [此处](IDP_COM_USAGE.md)。

若要在对话框运行期间保持对象存在，请在对话框过程的 `WM_INITDIALOG` 下将变量声明为线程变量（带 `-`），例如 `Typelib.Class-obj._create`。或者，在调用 `ShowDialog` 前声明。如果在对话框过程中声明为局部变量（不带 `-`），则会因对话框过程多次调用而迅速销毁。线程变量在线程结束（宏结束）时销毁，而非对话框销毁时。如果需要在对话框关闭时立即删除对象，在 `WM_DESTROY` 下将变量赋值为 0，例如 `obj=0`。

并非所有 COM 类都支持使用此函数创建对象。假设类型库中有 Class1 和 Class2，若无法创建 Class2 对象，可尝试创建 Class1 对象，然后通过 Class1 的函数获取 Class2 对象。

此函数不用于创建对话框中的 [ActiveX 控件](IDH_DIALOG_EDITOR.md)，但可用于创建不显示但提供有用功能的 ActiveX 控件。

QM 2.2.1 起：某些使用此函数创建的 ActiveX 控件可能不再工作，建议将其放入对话框中。其他控件可能表现更佳。

QM 2.3.4 起：支持 QM 接口 `IStringMap`、`ICsv` 和 `IXml`，无需参数。

---

### ip._getactive([class] [flags] [moniker])

获取当前活动的 **class** 类型对象，并将对象的地址填充到 **ip** 中。

- **class**：对象的类（参见 `_create`）。如果省略或为 0，则使用 **ip** 的类。
- **[flags](IDP_FLAGS.md)**：
  | 标志 | 描述 |
  |------|------|
  | 0（默认） | 如果没有活动对象，生成错误。 |
  | 1 | 如果没有活动对象，创建新对象。 |
  | 16 | 显示所有运行对象的单体名称（moniker）。示例：`IUnknown u._getactive(0 16 "."); err` |
- **moniker**（QM 2.2.0 起）：系统运行对象表（ROT）中的对象名称。
  - 可包含 [通配符](IDP_MATCHW.md)。
  - 例如，对于文档对象，其单体名称可能是文件路径。
  - QM 2.3.3 修复：当使用通配符时，可能返回错误类型的对象。例如，无法使用 **moniker** `"*"`。

此函数可能因 [UAC](IDP_VISTA.md) 而失败，参见 [解决方法](IDP_VISTA.md)。

---

### ip._getfile(file [class])

从 **file** 获取对象，并将对象的地址填充到 **ip** 中。

- 如果未指定 **class**（省略或为 0），使用 `CoGetObject`，启动关联应用程序并打开文件。如果文件已打开，则获取打开文件对象的指针（类似 `_getactive`）。
  - **file** 也可以是单体名称字符串，例如使用 `"winmgmts:"` 获取 WMI 服务。
  - 使用 **ip** 的类（参见 `_create`）。
- 如果指定 **class**，使用不同方法：创建 **class** 类型的对象（类似 `_create`），并使用 `IPersistFile.Load` 加载文件，不尝试获取已打开文件对象的指针。

---

### ip._getcontrol(hwndcontrol)

检索由对话框中的 **hwndcontrol** 托管的 ActiveX 控件对象。ActiveX 控件由类名为 `"ActiveX"` 的子窗口托管，因此 **hwndcontrol** 必须是该子窗口的句柄。可使用 `id` 函数获取，例如控件 ID 为 3 时，使用 `id(3 hDlg)`。通常，此 ID 不是 QM 状态栏中显示的 ID，因为 ActiveX 控件会创建覆盖宿主子窗口的子窗口。ID 显示在对话框定义中（绿色行中带有 `"ActiveX"` 的第一个数字）。此函数在对话框编辑器中点击“事件”按钮时自动插入。

---

### ip._setevents([eventfolder] [flags])

激活或停用对象的 [事件](IDP_COM_EVENTS.md)。

---

## 其他创建/获取 COM 对象的方式

- 使用通用或专用 API 函数（参见示例 4）。
- 不可外部创建的对象通常通过其他对象的属性（函数）获取（参见示例 3）。
- `acc`、`htm` 和 `web` 函数也返回接口指针。

## 示例

```qm
;; 1. 创建 Excel Application 对象并使窗口可见：
typelib Excel {00020813-0000-0000-C000-000000000046} 1.2
Excel.Application a._create
a.Visible=TRUE; err

;; 2. 可以指定类，尽管通常不需要。以下是指定类的几种方式：
Excel.Application b c d
b._create("Excel.Application")
c._create(uuidof(Excel.Application))
d._create("{00024500-0000-0000-C000-000000000046}")

;; 3. 从文件获取 Excel Workbook 对象；获取其他接口的指针；使窗口和文档可见：
Excel.Workbook x._getfile("$desktop$\Book5.xls")
Excel.Application a=x.Application
a.Visible=TRUE; err
Excel.Windows ws=a.Windows
Excel.Window w=ws.Item(1)
w.Visible=TRUE

;; 4. 使用 DLL 函数获取接口指针：
IAccessible a
if(AccessibleObjectFromWindow(hwnd 0 uuidof(IAccessible) &a)) ret
out a.accName(0)
```