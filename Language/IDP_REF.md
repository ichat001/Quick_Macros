# 声明引用文件或宏

## 语法

### 语法 1 - 声明引用文件
```
ref refname file [flags]
```

### 语法 2 - 使用已声明的引用文件
```
ref refname
```

## 参数
- **refname** - 用于标识引用文件的[名称](../Other/IDP_IDENTIFIERS.html)。
- **file** - 包含声明的文件或 QM 项目（如宏）。
- **flags**：
  | 值 | 描述 |
  |----|------|
  | 1 | 按需加载，仅在实际需要时加载。 |
  | 2 | 全局作用域，文件中的标识符无需指定 **refname** 即可在任何地方使用。 |
  | 4 | 低优先级，QM 在其他引用文件后搜索低优先级引用中的声明。 |
  | 8 | 始终在主[弹出列表](../QM_Help/IDH_TYPEINFO.html)显示成员，首次使用或在编辑器查看时自动声明成员，与标志 2 一起使用，标志 1 无效。 |

## 备注

### 语法 1
声明 QM 搜索声明的文件或宏，可在任意位置声明，不必在使用的宏中。

### 语法 2
使某处声明的引用文件或宏的标识符在当前宏中无需指定 **refname** 即可使用。若文件尚未加载，则加载。

### 通用说明
- 引用文件/宏可包含类型（[type](IDP_TYPE.html)、`class`、`category`）、常量（[def](IDP_DEF.html)）、DLL 函数（[dll](IDP_DLL.html)）、COM 接口（[interface](../_COM/IDP_INTERFACE.html)）和类型库（[typelib](../_COM/IDP_TYPELIB.html)）的声明，格式为 QM 格式，每条声明从行首开始。
- 与[类型库](../_COM/IDP_TYPELIB.html)或 [#compile](IDP_DIR_COMPILE.html) 类似，`ref` 用于声明常量、DLL 函数、类型等，省去重复声明。区别在于：
  - 引用文件仅限 QM 使用。
  - `ref` 不编译整个文件/宏，DLL 仅在需要时加载，而 `#compile` 会立即加载 DLL。
- （QM 2.2.0）引用文件/宏（称为 file1）可包含对其他引用文件/宏（file2）的引用，QM 在 file2 中查找 file1 中使用的但未声明的标识符。在 file1 中添加 `ref refname` 行，并使用语法 1 声明 file2（可在 file1 声明前后）。
- 引用文件/宏中的声明后可接注释（下一行，格式为单空格加双分号 ` ;;`），显示在 QM 状态栏，声明行内不可有注释。

### 访问引用文件中的标识符
- 若引用文件声明为全局作用域（标志 2），其标识符可直接使用，无需特殊语法。
- 否则，使用 `refname.identifier` 语法，除非引用文件在同一宏/函数中声明。使用此语法时，标识符在输入或打开宏时自动声明并高亮显示。

### 现有引用文件
- **WINAPI**：包含常用的 Windows XP API 声明，使用标志 2（全局作用域），无需前缀 `WINAPI.` 即可使用 Windows API，声明显示在 QM 状态栏。QM 2.3.0 更新，使用 Vista SDK v6.0（WINVER 0x0502, _WIN32_IE 0x0603）。旧版本文件（QM 2.2.0-2.2.1）名为 `winapiqm.txt`，新文件为 `winapi.txt`。
- **WINAPIV**：Windows Vista 特定声明，非全局，需使用 `WINAPIV.Function` 访问，QM 2.3.0 添加，使用 Vista SDK v6.0（WINVER 0x0600, _WIN32_IE 0x0700）。
- **WINAPI7**：Windows 7 特定声明，非全局，需使用 `WINAPI7.Function` 访问，QM 2.3.1 添加，使用 Windows 7 SDK v7.0（WINVER 0x0601, _WIN32_IE 0x0800）。
- 以上文件包含以下头文件的声明：
  ```c
  #define NOCRYPT // 不包含加密，218 KB
  #include "crt.h" // msvcrt.dll 的多数头文件
  #include <windows.h>
  #include <winternl.h>
  #include <winioctl.h> // QM 2.3.0
  #include <shlobj.h> // 包含 <commctrl.h>
  #include <shlwapi.h>
  #include <richedit.h>
  #include <olectl.h>
  #include <oleacc.h>
  #include <htmlhelp.h>
  #include <pdh.h>
  #include <tlhelp32.h>
  #include <winsock2.h>
  #include <wtsapi32.h> // QM 2.2.0.3
  #include <mstask.h>
  #include <msterr.h>
  #include <dbt.h>
  #include <psapi.h>
  #include <uxtheme.h>
  #include <wininet.h> // QM 2.3.0
  ```
- 可[下载](http://www.quickmacros.com/download.html) `WINAPI2` 文件，包含更多声明。

### 分发宏时的注意事项
- 分发宏时，避免使用引用文件中的标识符，除非确保接收者有相同引用文件。例如，`WINAPI` 在 QM 2.2.0 和 2.3.0 更新，若使用其标识符，其他版本用户可能遇到“未知标识符”错误。建议从引用文件提取声明放入宏中。编译为 [EXE](../QM_Help/IDH_MAKEEXE.html) 时无需考虑此问题。

### 提取和记录声明
- 提取单个声明：编辑器中键入或点击标识符（如函数名），然后：
  1. Ctrl+点击标识符，从输出复制声明。
  2. 从状态栏复制声明，或按 Alt+F8 转移到输出。
  3. 按 F2 从文件复制声明。
- 提取多个声明（非宏）：使用菜单 Run -> Compile Options -> Show declarations from ref files，首次使用或以 `refname.identifier` 语法显示时，输出中显示引用文件中的声明。

### 声明错误处理
- 若引用文件中的声明失败（如缺少 DLL 或类型库），文件会打开并高亮错误语句。可在声明后立即添加 `#err function`，指定用户定义函数处理错误。若函数返回非零值，不显示错误并停止编译；若返回负值，也不显示“未知标识符”错误。

**另见**：[声明](IDP_DECLARATION.html)、[作用域](../Other/IDP_IDENTIFIERS.html)、[#err](IDP_DIR_ERR.html)、[子函数属性 r](IDP_DIR_SUB.html)、[应用文件夹](../QM_Help/IDH_FOLDERPROP.html)

## 示例
```cpp
ref MyRef "MyRefFile.txt" 1
ref MyRef2 "MyRefMacro"
```