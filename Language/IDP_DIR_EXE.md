# 编译器指令：#exe

## 语法

```qm
#exe option value [resId] [resType]
```

## 参数

| 选项 | 值 | 描述 |
|------|------|------|
| `addfunction` | 函数名称 | 添加用户定义函数。通常自动添加所需函数，但在某些情况下（如使用 [mac](IDH_REFERENCE.html#mac) 时函数名为变量）QM 无法确定需添加的函数，会显示警告，此时需使用 `#exe`。 |
| `addtextof` | QM 项目名称 | 添加宏、函数等项目的文本。通常自动添加，但在某些情况下（如 [str.getmacro](IDP_S_GETMACRO.html) 的宏名为变量）需手动指定。自动添加的项目包括：<ul><li>[ShowDialog](IDP_UDF.html#ShowDialog) 使用的对话框或菜单定义。</li><li>脚本函数使用的项目。</li><li>[scan](IDH_REFERENCE.html#scan) 的 `macro:...` 项目（含位图）。</li><li>[wait](IDH_REFERENCE.html#wait) 的 `S "macro:..."` 项目等。</li></ul>**QM 2.3.5**：自动添加形如 `"macro:MacroName"` 的字符串中的项目，支持多项目（如 `_s="macro:Macro1[]macro:Macro2"`）。若值为 `"<script>"`，添加调用者的文本（如 [VbsExec](IDP_UDF.html#VbsExec) `""`）。 |
| `addactivex` | ActiveX 控件类，格式为 `Typelib.Class` | 添加 [ActiveX 控件](IDH_DIALOG_EDITOR.html) 类的信息。通常自动添加对话框中的 ActiveX 控件，仅在以下情况需手动添加：<ul><li>通过 [CreateWindowEx](IDP_QMDLL.html#CreateWindowEx) 或 [CreateControl](IDP_UDF.html#CreateControl) 创建控件（窗口类为 `"ActiveX"`）。</li><li>运行时创建对话框定义。</li><li>**QM 2.2.0**：窗口名称仅为 `Typelib.Class`（不含 `{clsid}`）。</li></ul> |
| `addfile` | 文件路径（完整或相对 exe 创建文件夹） | **QM 2.2.0**：将文件添加到 exe 资源。<ul><li>**resId**：资源 ID（1 到 0xFFFF，需唯一，**QM 2.4.0** 支持字符串）。</li><li>**resType**（**QM 2.3.4**）：资源类型（整数 1 到 0xFFFF，如 `RT_BITMAP`，或字符串，如 `"WAVE"`，默认 `RT_RCDATA`）。</li><li>运行时可通过 [ExeExtractFile](IDP_QMDLL.html#ExeExtractFile) 提取文件，或用 [ExeGetResourceData](IDP_QMDLL.html#ExeGetResourceData) 获取数据，或使用支持资源的 Windows API。</li><li>**QM 2.3.0**：可用 `":resourceid filepath"` 语法替代（参见 [详情](IDH_MAKEEXE.html#a3)），或用 [str.getfile](IDP_S_FILE.html) 获取数据。</li><li>**QM 2.4.1**：支持添加 [宏资源](IDP_RESOURCES.html)。</li></ul> |

## 备注

- **功能**：显式将函数、文本、ActiveX 控件类或文件添加到 [exe](IDH_MAKEEXE.html)。在 QM 中运行宏时忽略。可在任何位置使用。
- **禁用警告**：使用 [#opt nowarnings 1](IDP_DIR_OPT.html)。

## 示例

```qm
#exe addfunction "Function5"
#exe addtextof "Macro5"
#exe addactivex "Typelib.Class"
#exe addfile "$my qm$\copy.bmp" 10 RT_BITMAP
#exe addfile "resource:app.ico" 10 RT_GROUP_ICON
```

**相关代码**：参见 [ExeQmGridDll](IDP_UDF.html#ExeQmGridDll) 函数，展示如何将 DLL 添加到 exe 并在运行时提取/加载。