# 类（Classes）

## 概述

**提示**：可通过菜单 `File -> New -> New Class` 创建新类。

**相关内容**： [QM 类教程](IDP_CLASSES_TUTORIAL.html)

类是用户定义的类型，包含成员变量和成员函数。理解类需熟悉 [变量](IDP_VARIABLES.html)、[用户定义类型](IDP_TYPE.html) 和 [用户定义函数](IDH_FUNCTIONS.html)。

在 QM 中，类的定义和功能与 [用户定义类型](IDP_TYPE.html) 相同，仅使用 `class` 关键字而非 `type`，并在 [弹出列表](IDH_TYPEINFO.html) 中使用不同图标（类型为 ![类型图标](type_udt.gif)，类为 ![类图标](class.gif)）。

## 成员函数

### 定义
通过菜单 `File -> New -> New Member Function` 创建成员函数，命名为 `ClassName.FunctionName`（如 `Class.Func`）。参见 [子函数](IDP_DIR_SUB.html)。

### 调用
使用 `var.FunctionName()` 语法调用，其中 `var` 为类类型的变量。

```qm
class Class a b c ;; 定义类 Class
Class var ;; 创建 Class 类型的变量 var
var.Func(arguments) ;; 调用成员函数 Func（QM 项目名称为 Class.Func）
var.a=1; out var.a ;; 访问成员变量
```

### 访问
在成员函数中：
- 使用 `this` 关键字引用调用该函数的变量。
- 访问其他成员变量或函数时，可用 `this.member` 或直接 `member`。
  - 示例：访问成员变量 `c` 可使用 `this.c` 或 `c`。
  - 调用成员函数 `Func2` 可使用 `Func2(arguments)` 或 `this.Func2(arguments)`。

### 注意
- 类定义所在的宏需编译后才能使用。为确保类始终可用，将定义（或 [#compile](IDP_DIR_COMPILE.html)）放入 [init2](IDP_UDF.html) 函数或其他启动时运行的函数（带“QM file loaded”触发器）。
- 可随时创建、删除或重命名成员函数。
- 可为类、其他用户定义类型甚至 QM 内置类型（`str`、`int` 等）添加成员函数，但不可为数组或接口添加。

**相关内容**： [作用域优先级](IDP_SCOPE.html)（当成员名称与非成员名称冲突时）。

## 特殊成员函数

用户定义的类可包含三种特殊函数：构造函数、析构函数和赋值运算符 (`=`)。这些函数不可显式调用，由 QM 项目名称识别。

| 类型 | QM 项目名称 | 描述 |
|------|-------------|------|
| **构造函数** | `Class` | 创建类变量时自动调用，无参数，无返回值。 |
| **析构函数** | `Class.` | 销毁类变量前自动调用（如函数返回时销毁局部变量），无参数，无返回值。 |
| **赋值运算符** | `Class=` | 复制类变量时自动调用（如 `var1=var2` 或 `Function(var)`），需以 `function ClassName&var` 开头，复制 `var` 的成员（`this.member=var.member`），QM 不自动复制成员，无返回值。 |

**示例**：为类 `Abc` 添加析构函数，创建成员函数 `Abc.`。

### 注意
- 全局变量的构造函数和析构函数在 QM 主线程执行：
  - 构造函数在首次声明全局变量的宏编译时调用。
  - 析构函数在 QM 文件卸载时调用（如 QM 退出）。
- 数组元素不可有构造函数。
- 这些函数中避免使用 `end`（除非用于生成警告）或导致未处理的运行时错误。参见 [更多信息](IDP_END.html)。

## 继承

新类可从现有类派生，称为**继承**。派生类继承基类的成员函数和变量，派生类的成员函数可访问基类的非私有成员。派生类中的同名成员覆盖基类成员。

### 定义
在派生类声明中，使用冒号 `:` 后跟基类类型的成员变量。

```qm
class Base a b c
class Derived :Base'x c d e
Derived der
der.a=5 ;; 等同于 der.x.a=5
der.c=5 ;; Derived 的 c
der.x.c=6 ;; Base 的 c
```

- 基类成员可通过 `der.member` 或 `der.x.member` 访问。
- 在成员函数中，基类成员可通过 `this.member`、`this.x.member`、`member` 或 `x.member` 访问。

### QM 2.2.0 特性
可不指定基类成员名称，直接使用基类类型，访问基类成员时使用基类名称。

```qm
class Base a b c
class Derived :Base c d e
Derived der
der.Base.c=6
```

**注意**：若仅使用基类类型，派生类成员函数无法声明基类类型的变量，因基类名称被解析为成员名称而非类型名称（向后兼容性问题，无法修复）。

### 构造函数与析构函数
派生类、基类及其成员均可有构造函数和析构函数。创建派生类变量时：
1. QM 将内存置零。
2. 按定义顺序调用基类构造函数、成员构造函数、派生类构造函数。
3. 析构函数按相反顺序调用。

## 访问权限

- **公共（Public）**：可从任何地方访问。
- **保护（Protected）**：仅限类及其派生类的成员函数访问。
- **私有（Private）**：仅限类的成员函数访问。

默认情况下，类成员为公共。

### 设置方式
- **成员函数**：通过 Properties 对话框或在 QM 项目列表中 Ctrl+右键设置保护或私有。
- **成员变量**：在类定义中用 `-`（保护）或 `--`（私有）前缀。

```qm
class Base a b
class Derived :-Base'base --c d
Derived der
der.d=5 ;; 正确：公共成员
der.c=5 ;; 错误：私有成员
der.b=5 ;; 错误：保护成员
```

### 隐藏成员
- 成员名称以 `__` 开头或函数位于私有文件夹时，不在 [成员弹出列表](IDH_TYPEINFO.html) 中显示，除非编辑成员函数或使用 Ctrl+Shift+.。
- [子函数](IDP_DIR_SUB.html) 可访问父函数所在类的私有/保护成员，即使非成员函数。
- **QM 2.4.3**：名称为 `Class_X` 的 QM 项目可访问类 `Class` 的私有/保护成员，但无法访问基类的私有/保护成员。
  - 示例 1：函数 `Class1_Func` 可访问 `Class1` 的私有/保护成员。
  - 示例 2：类 `Class1_X` 的成员函数可访问 `Class1` 的私有/保护成员。
  - 示例 3：子函数 `#sub Class1_X` 可访问 `Class1` 的私有/保护成员。

## 动态内存中的变量

局部类变量分配在栈上。要在动态内存中分配：
1. 声明指针并调用 [_new](IDP_MEMORY.html) 分配内存并调用构造函数。
2. 使用 [_delete](IDP_MEMORY.html) 调用析构函数并释放内存。

```qm
MyClass* c._new
...
c._delete
```

`_new` 也可用于分配类数组。