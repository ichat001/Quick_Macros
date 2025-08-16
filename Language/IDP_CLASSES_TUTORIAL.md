# 类教程

## 概述

大多数编程语言支持类。类是包含成员函数的 [用户定义类型](IDP_CLASSES.html)。理解类需熟悉 [变量](IDP_VARIABLES.html)、[用户定义类型](IDP_TYPE.html) 和 [用户定义函数](IDH_FUNCTIONS.html)。

**相关内容**： [类定义](IDP_CLASSES.html)

## 创建和使用类

**注意**：可通过菜单 `File -> New -> New Class` 创建新类，本教程未使用此方法。

### 定义简单矩形类
类定义包括类名和成员变量。以下为 `CRect` 类的定义：

```qm
class CRect
    double'm_width
    double'm_height
```

将此定义放入宏并编译或运行，使 QM 识别新类。为确保类始终可用，可将定义放入启动时运行的函数（如 [init2](IDP_UDF.html)）。

### 添加成员函数
通过菜单 `File -> New -> New Member Function` 创建成员函数，命名格式为 `ClassName.FunctionName`。

#### 成员函数 `CRect.Init`
初始化对象：
```qm
function double'width double'height
; 初始化对象
m_width=width
m_height=height
```

#### 成员函数 `CRect.Area`
计算矩形面积：
```qm
function'double
; 计算矩形面积
ret m_width*m_height
```

#### 成员函数 `CRect.Hypotenuse`
计算矩形对角线长度：
```qm
function'double
; 计算矩形对角线长度（两对角点间距离）
ret _hypot(m_width m_height)
```

### 使用类
声明 `CRect` 类型变量并使用 `variable.Function(arguments)` 语法调用函数：

```qm
CRect r.Init(10 20)
out r.Area
out r.Hypotenuse

CRect r2.Init(11 19)
if(r2.Area>r.Area) out "r2 is bigger"
else out "r is bigger"
```

## 类继承

可创建继承现有类成员变量和函数的新类。以下为继承 `CRect` 的 `CColorRect` 类：

```qm
class CColorRect :CRect
    m_color
```

### 成员函数 `CColorRect.Init`
```qm
function double'width double'height color
this.CRect.Init(width height)
m_color=color
```

### 成员函数 `CColorRect.GetColor`
```qm
function#
ret m_color
```

### 示例：使用派生类
```qm
CColorRect r3.Init(10 20 0xffff)
out "0x%X" r3.GetColor ;; 调用 CColorRect 函数
out r3.Area ;; 调用继承自 CRect 的函数
```

## 类成员访问控制

默认情况下，成员变量和函数为公共，可通过 `variable.member` 访问：

```qm
CRect r
r.m_width=15
```

### 保护和私有成员
为限制外部访问，在类定义中为成员变量添加前缀：
- `-`：保护成员，仅限类及其派生类的成员函数访问。
- `--`：私有成员，仅限类的成员函数访问。

```qm
class CRect
    -double'm_width ;; 保护，仅限 CRect 和派生类函数访问
    --double'm_height ;; 私有，仅限 CRect 函数访问
```

此时，`r.m_width=15` 会报错。

成员函数的访问权限可在函数的 Properties 对话框中设置。

### 隐藏成员
为隐藏成员（不限制访问），可：
- 让变量/函数名称以 `__` 开头（如 `__m_hidden` 或 `CRect.__Hidden`）。
- 将函数放入标记为“private functions”的文件夹（在 Folder Properties 对话框中设置）。

## 从成员函数访问变量

成员函数总是与类变量一起调用：

```qm
CRect r1 r2
...
r1.Func
r2.Func
```

在成员函数中使用 `this` 引用调用该函数的变量：

#### 成员函数 `CRect.Func`
```qm
out this.m_width ;; 等同于 out m_width
out this.Area ;; 等同于 out Area
out &this ;; 变量地址
```

## 特殊函数

类可包含构造函数、析构函数和赋值运算符，通过特定 QM 项目名称定义。

### 构造函数
成员函数 `CRect`（与类名相同）：
```qm
out "This function is called when the variable is created."
m_width=1
m_height=1
```

### 析构函数
成员函数 `CRect.`（类名加 `.`）：
```qm
out "This function is called before destroying the variable."
```

### 赋值运算符
成员函数 `CRect=`（类名加 `=`）：
```qm
function CRect&source
out "This function is called when you assign one variable to another variable, both of CRect type."
this.m_width=source.m_width
this.m_height=source.m_height
```

### 测试特殊函数
```qm
CRect r1 r2
r1.Init(5 5)
out r1.Area
out r2.Area
r2=r1
out r1.Area
out r2.Area
```