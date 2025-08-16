# 类别（Categories）

## 概述

类别用于组织相关函数，可通过 `category.function` 语法访问。输入类别名称后加点号（`.`）即可查看函数列表。

![类别提示](ti_cat_keytext.png)

在宏文本中输入点号（`.`）可查看 [类别列表](IDH_TYPEINFO.html)，类别位于列表顶部，图标为 ![类别图标](category.gif)。

![全局标识符](ti_globals.png)

## 定义类别

类别是使用特殊语法的 [用户定义类型](IDP_TYPE.html)。在声明中，除常规成员变量外，可添加全局标识符（如函数、类等）作为成员。这些标识符并非真正的成员，但支持 `category.identifier` 语法访问，并显示在函数列表中。声明使用 `category` 关键字（而非 `type`），仅影响 [全局标识符弹出列表](IDH_TYPEINFO.html) 的图标和位置。

### 示例：定义和使用类别
```qm
; 定义类别 files
category files :
    run del mkdir
    SetCurDir GetCurDir

; 使用 files 类别中的函数
files.run "abc.exe" ;; 等同于 run "abc.exe"
out files.GetCurDir ;; 等同于 out GetCurDir
```

- `category.identifier` 语法等同于直接使用 `identifier`，标识符与类别无严格绑定，声明中甚至可包含不存在的标识符。
- 类别可包含其他类别，并可从另一类别派生。

### 包含 DLL
类别声明可包含 DLL，自动添加所有已声明的 DLL 函数，DLL 名称需用引号括起。

```qm
category mydll : "dll1" "dll2"
```

### 包含 QM 文件夹
类别可包含 QM 文件夹，自动添加文件夹中除私有子文件夹外的所有函数和类。文件夹名称或路径需以 `>` 开头并用引号括起。

```qm
category internet :
    ">System\Functions\Internet" ">User\Functions\Internet"
    IeWait Ftp Http
```

默认类别声明位于 `\System\Declarations\Categories`，包含 `\System\Functions` 和 `\User\Functions` 文件夹中的内容。若要将自定义函数添加到默认类别：
1. 打开 `\System\Declarations\Categories` 查看用户函数的文件夹定义。
2. 创建相应文件夹（如 `User\Functions\Internet`）。
3. 将函数移至该文件夹。例如，将函数放入 `User\Functions\Internet` 可添加到默认 `internet` 类别。

### 包含类成员（QM 2.3.2 起）
类别可包含类成员，类名及其成员列表需以 `?` 开头并用引号括起。若仅指定类名，则添加该类的所有函数。也可添加其他字符串，如运算符。

```qm
category test :
    "?str getclip getsel setclip setsel"
    "?MyClass"
    Func1 Func2
    "?(operator) + - * / and or"
```

## 相关内容

- [声明](IDP_DECLARATION.html)
- [作用域](IDP_IDENTIFIERS.html)