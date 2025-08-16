# 获取接口或 COM 类的 GUID

## 语法

```qm
GUID* uuidof(identifier)
```

## 参数

- **identifier** - 以下之一：
  - 接口或 COM 类的名称。
  - 接口指针变量。
  - GUID 字符串，格式为 `"{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}"`。
  - ProgId，格式为 `"Application.Class"`。

## 说明

返回与 **identifier** 关联的 [全局唯一标识符（GUID）](IDP_GUID.md) 的指针。这是一个编译时函数。

## 示例

```qm
isfd.BindToObject(pidl 0 uuidof(IShellFolder) &isf)
```