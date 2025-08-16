# 重复执行

## 语法

```qm
rep [n]
    statements
    ...
```

也可以写成单行：

```qm
rep([n]) statements
```

## 参数

- **n** - 重复的次数。如果省略，则无限重复。

## 说明

重复执行 **statements**。

使用 `break` 退出循环。使用 `continue` 跳过后续的 **statements**。

**另见**： [for](IDP_FOR.md), [foreach](IDP_FOREACH.md)

## 示例

```qm
rep 10
    bee
    1

rep(10) bee; 1

rep
    i+1
    if(i>10) break
```