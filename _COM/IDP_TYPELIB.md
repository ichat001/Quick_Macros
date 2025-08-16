# 声明 COM 类型库

## 语法

### 语法 1 - 通过 GUID 声明类型库
```
typelib libname guid vermajor.verminor [lcid] [flags]
```

### 语法 2 - 通过文件名声明类型库
```
typelib libname file [flags]
```

### 语法 3 - 使用先前声明的类型库
```
typelib libname
```

## 参数

- **libname** - 类型库的[名称](../Other/IDP_IDENTIFIERS.md)，可自定义，用于后续代码中标识类型库。
- **guid** - 类型库的[全局唯一标识符](../Other/IDP_GUID.md)。
- **vermajor.verminor** - 主版本号和次版本号，均为数字。
- **lcid** - 区域标识符，整数常量。默认值：0（中性）。
- **flags** - [标志](../Other/IDP_FLAGS.md)：
  | 值 | 描述 |
  |----|------|
  | 1  | 按需加载，类型库仅在需要时加载到内存。 |
  | 2  | 全局作用域，类型库中的标识符可在任何地方使用，无需指定 **libname**。 |
- **file** - [类型库文件](../Other/IDP_SEARCHPATHS.md)。默认使用文件中第一个资源，若需其他资源，追加 \ 和资源索引（如 "c:\abc.dll\2"）。

## 备注

可通过菜单 Tools -> COM Libraries 使用 [COM 库对话框](IDP_COM_USAGE.md) 插入此语句。

### 语法 1
声明已注册的类型库。

### 语法 2
从 **file** 声明类型库。

### 语法 3
使先前声明的类型库的标识符在当前宏或函数中可用，无需指定 **libname**。若类型库尚未加载，此语句会加载。

类型库通常包含一个或多个 COM 类（coclasses）及其关联接口的信息，也可能包含其他声明（如 DLL 函数、常量、类型），简化编程，无需手动声明（`type`、`def`、`dll`、`interface` 语句）。类型库可以是独立文件（.tlb、.olb）或组件的一部分（.dll、.exe、.ocx）。支持 OLE 自动化的应用程序和 ActiveX 组件通常提供类型库。

### 访问类型库中的标识符
若类型库声明为全局作用域（标志 2），其标识符（类型、常量等）可在任何地方直接使用，无需特殊语法。否则，使用 `libname.identifier` 语法，除非类型库在同一宏/函数中声明。使用 `libname.identifier` 语法时，标识符在输入或打开宏时会自动声明并高亮。

另见：[子函数属性 r](../Language/IDP_DIR_SUB.md)、[应用程序文件夹](../QM_Help/IDH_FOLDERPROP.md)。

### 错误
若类型库无法加载（文件未找到、未注册等），会生成错误并停止编译。若不确定组件是否在用户系统上存在，可使用 [#err](../Language/IDP_DIR_ERR.md) 屏蔽错误，编译替代代码或调用用户定义函数。即使设置了标志 1（按需加载），`#err function` 仍有效：若函数返回非零值，不显示错误。

### 提示
可下载并安装类型库浏览器（如 Microsoft 的 OLE Object Viewer，免费）查看类型库内容。

另见：[ref](../Language/IDP_REF.md)、[声明](../Language/IDP_DECLARATION.md)、[作用域](../Other/IDP_IDENTIFIERS.md)。

## 示例

```cpp
typelib Word {00020905-0000-0000-C000-000000000046} 8.0 0x409
typelib mytypelib "c:\type libraries\mytl.tlb"

Word.Application wa
int i = mytypelib.MyFunction(0)
```