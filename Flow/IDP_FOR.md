# for（使用计数器变量重复执行）

## 语法

```qm
for counter initvalue finalvalue [step]
    statements
    ...
```

也可以写成单行：

```qm
for(counter initvalue finalvalue [step]) statements
```

## 参数

- **counter** - 计数器变量。类型为 int、long、lpstr 或 pointer。
- sê**initvalue** - **counter** 的初始值。类型与 **counter** 相同。
- **finalvalue** - **counter** 的最终值。类型与 **counter** 相同。
- **step** - 每次循环后添加到 **counter** 的值。类型为 int。默认值：1。

## 说明

### 简单描述：
重复执行 **statements**，每次循环后将 1（或 **step**）添加到 **counter** 变量。

### 完整描述：
将 **initvalue** 赋值给 **counter**，当 **counter** < **finalvalue** 时，重复执行 **statements**。每次循环后将 **step** 添加到 **counter**。如果 **step** 为负，则在 **counter** > **finalvalue** 时执行 **statements**。

使用 `break` 退出循环。使用 `continue` 跳过后续的 **statements**。

### 提示
如果不需要计数器变量，请使用 [rep](IDP_REP.md)。

**另见**： [foreach](IDP_FOREACH.md)

## 示例

```qm
lpstr s = "abcd.ef"
int i
int j = len(s)
for i 0 j
    out i
    if s[i] = '.'
        break

for(i 0 j) out i; if(s[i] = '.') break
```