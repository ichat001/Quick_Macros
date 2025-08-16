# 激活窗口或设置焦点

## 语法

### 作为语句
```
act [window] [flags]
```

### 作为函数
```
int act([window] [flags])
```

## 参数

- **window** - [窗口或子窗口](../Other/IDP_WINDOWEXPRESSION.md)。
- **flags** (QM 2.3.2) - [标志](../Other/IDP_FLAGS.md)：
  | 值 | 描述 |
  |----|------|
  | 1 | 若激活同一线程的其他窗口，不报错。用于 `act` 激活正确窗口但约 1 秒后抛出错误的情况。 |

## 备注

- 若 **window** 为顶级窗口，则激活该窗口。
- 若 **window** 为[子窗口](../Other/IDP_WINDOWSTYLES.md)，则激活其父窗口并设置焦点。
- 若省略 **window**，激活上一个窗口，类似按 Alt+Tab。
- 作为函数时，`act` 激活窗口并返回窗口句柄。
- 速度取决于 [spe](IDP_SPE.md)。
- 若激活失败，会报错。

### 提示
若 `act` 无法正常工作，可尝试在选项中勾选“禁用 Windows 前台锁定功能”。

## 示例

```cpp
act "Notepad" ;;激活“Notepad”窗口
act "+IEFrame" ;;激活类名为“IEFrame”的窗口
act ;;激活下一个窗口
act win(100 200) ;;激活屏幕坐标 (100, 200) 处的窗口
act id(142 "Calc") ;;激活“Calc”中 id 为 142 的子窗口（设置焦点）
```