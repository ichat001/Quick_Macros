# 定义命名常量（def）

## 语法

```qm
def name value
```

## 参数

- **name**：常量 [名称](IDP_IDENTIFIERS.html)。
- **value**：常量值，可以是任意类型的 [常量值](IDP_CONSTANT.html)（如数字、字符串）或任何 [表达式](IDP_EXPRESSION.html)，可包含非常量（如全局变量、函数）。

## 备注

- **功能**：定义命名常量，用有意义的名称替代数字、字符串或其他表达式。类似于变量，但不可修改。
- **作用域**：命名常量具有全局作用域，可在任何宏中使用。
- **其他来源**：
  - 命名常量也可定义在 [引用文件](IDH_SETT_FILES.html) 和 [类型库](IDP_TYPELIB.html) 中。
  - QM 在 `WINAPI` 等引用文件中定义了许多 Windows 常量，可直接使用或以 `WINAPI.` 前缀访问。

**示例**：
```qm
out WINAPI.ERROR_BAD_PATHNAME
```

**相关内容**：
- [预定义/特殊常量和变量](IDP_SPECVAR.html)
- [声明](IDP_DECLARATION.html)
- [作用域](IDP_IDENTIFIERS.html)
- [如何在启动时定义常量](http://www.quickmacros.com/forum/viewtopic.php?f=1&t=5692)

## 示例

```qm
def MAX_PATH 260
def GMEM_SHARE 0x2000
def dblconst -1.25
def strconst "String constant"
def GPTR GMEM_FIXED|GMEM_ZEROINIT
def A10 A + 10
def IID_IShellFolder uuidof("{000214E6-0000-0000-C000-000000000046}")
```