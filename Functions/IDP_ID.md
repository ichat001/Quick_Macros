# 查找子窗口（获取句柄）

## 语法
```
int id(id [window] [flags])
```

## 参数
- **id** - 子窗口的 ID，整数，可在 QM 状态栏查看。
- **window** - [父窗口](../Other/IDP_WINDOWEXPRESSION.html)，省略时使用活动窗口，仅搜索首个匹配窗口。
- **flags**：
  | 值 | 描述 |
  |----|------|
  | 1 | 仅搜索直接子窗口，默认 0（搜索所有子窗口及其后代）。 |

## 备注
- 查找指定窗口中的[子窗口（控件）](../Other/IDP_WINDOWSTYLES.html)，返回其句柄，未找到返回 0。若父窗口不存在，报错。
- 与 [child](IDP_CHILD.html) 不同，优先搜索直接子窗口，且不优先考虑可见子窗口。
- 常用于[对话框](../User/IDH_DIALOG_EDITOR.html)中获取控件句柄，也适用于其他窗口。
- 窗口 ID 通常由开发者设置，运行时不变，通常为 0-65535。可能存在多个子窗口具有相同 ID，通常这些子窗口不接收用户输入或为其他子窗口的子节点。有时 ID 在运行时随机设置，不在 0-65535 范围内。

**另见**：[child](IDP_CHILD.html)、[acc](IDP_ACC.html)、[htm](IDP_HTM.html)

## 示例
```cpp
int h = id(15 "Notepad")
act id(306 "Calculator")
```