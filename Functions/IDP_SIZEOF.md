# 获取类型大小

## 语法

```qm
int sizeof(typename)
```

## 参数

- **typename** - 用户定义类型或内置类型的名称。

## 说明

返回 **typename** 类型变量的大小（字节数）。这是一个编译时函数。

## 示例

```qm
type POINT x y
int ts = sizeof(POINT)
;; 现在 ts 为 8
```