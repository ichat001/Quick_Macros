# 鼠标点击

## 语法

```
lef[+|-] [x y] [window] [flags]
rig[+|-] [x y] [window] [flags]
mid[+|-] [x y] [window] [flags]
dou [x y] [window] [flags]
```

## 参数

- **x y** - 鼠标指针[坐标](../Other/IDP_PIXELS.md)。若省略，鼠标指针不移动。
- **window** - [顶级或子窗口](../Other/IDP_WINDOWEXPRESSION.md)。若省略或为字面值 0，坐标相对于屏幕左上角。
- **flags**：
  | 值 | 描述 |
  |----|------|
  | 1 | 坐标相对于窗口客户区的左上角。若 **window** 为字面值 0，则相对于工作区。 |
  | 2 | 不激活 **window**，若坐标 **x y** 不属于 **window** 或其顶级父窗口，不报错。 |
  | 4 | QM 2.3.0：操作后将鼠标指针恢复到原位置。 |

### 选项

| 选项 | 描述 |
|------|------|
| + | 按下鼠标按钮（不释放）。 |
| - | 释放鼠标按钮（不按下）。 |

## 备注

- `lef`：点击鼠标左键。
- `rig`：点击鼠标右键。
- `mid`：点击鼠标中键。
- `dou`：双击鼠标左键。

### 当使用 **window** 时：
- 恢复最小化的窗口。
- 激活非活动窗口（取决于 **flags** 和窗口样式）。
- 若坐标属于另一顶级窗口，可能报错（取决于 **flags**）。

### 其他
- 点击速度取决于 [spe](IDP_SPE.md) 和 [opt slowmouse](IDP_OPT.md)。
- 可使用 `BlockInput` 函数阻止宏运行期间的键盘和鼠标输入，示例：`BlockInput 1`。若需手动终止宏，先按 Ctrl+Alt+Delete。

另见：`MouseButtonX` 及其他[鼠标类别函数](../Language/IDP_CATEGORIES.md)。

## 示例

```cpp
lef ;;鼠标左键点击
lef+ ;;鼠标左键按下
lef- ;;鼠标左键释放
lef 100 200 ;;在屏幕 (100, 200) 像素处点击左键
lef 50 30 "Notepad" ;;在“Notepad”窗口 (50, 30) 像素处点击左键
lef 10 10 id(131 "Calc") ;;在“Calc”窗口 id=131 的按钮 (10, 10) 像素处点击左键
lef 0.5 0.5 "Notepad" ;;在“Notepad”窗口中心点击左键

// 在“Notepad”窗口点击，x=100（相对于“Notepad”），y 不变
int w = win("Notepad")
lef 100 ym(0 w) w
```