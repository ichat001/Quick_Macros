# 变量存储和作用域（续）

## 概述
除常规 QM 变量外，还可使用其他介质存储数据。

## 环境变量
- QM 启动时接收系统环境变量的副本，也可创建和使用自定义环境变量。环境变量为字符串，存在直到 QM 退出（不同于全局变量，后者在加载其他文件或重新加载当前文件时销毁）。
- 使用函数 `GetEnvVar` 和 `SetEnvVar` 获取、设置或删除环境变量。
- QM 文件命令、`dll`、菜单、工具栏等自动[扩展环境变量](../Other/IDP_SEARCHPATHS.html)。另见 [str.expandpath](../str/IDP_S_SEARCHPATH.html)。
- 环境变量通常从父进程继承，但不总是如此。

## 窗口属性
- 可使用窗口属性关联窗口与某些值（数值类型，如 `int`、指针或 `lpstr`），通过 [SetProp](../Other/IDP_MSDN.html)、[GetProp](../Other/IDP_MSDN.html) 和 [RemoveProp](../Other/IDP_MSDN.html) 设置、获取或删除。
- 示例：
  ```cpp
  RECT* r
  r._new
  SetProp(hwnd "ra" r)
  // ...
  r=+GetProp(hwnd "ra")
  // ...
  RemoveProp(hwnd "ra")
  r._delete
  ```
- 建议在窗口销毁时（例如处理 `WM_NCDESTROY` 消息）调用 `RemoveProp` 清理属性。

## 注册表
- 使用 [rget](../Functions/IDP_RGET.html) 和 [rset](../Functions/IDP_RGET.html) 函数在注册表中存储变量。

## 其他进程内存
- 使用 `__ProcessMemory` 类在其他进程上下文中分配、写入和读取内存。

## DLL 变量
- 某些 DLL 导出变量，可声明为 DLL 函数，但不可直接作为变量使用，需通过引用或指针变量间接访问。
- 示例：
  ```cpp
  dll adll #_variable
  int+& _var = &_variable
  ;; 现在 _var 可作为 DLL 变量 _variable 使用
  ```