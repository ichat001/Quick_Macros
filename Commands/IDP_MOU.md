# 鼠标移动

## 语法1 - 绝对移动

```qm
mou [x y] [window] [flags]
```

## 语法2 - 相对移动

```qm
mou (+|-) x y
```

## 语法3 - 相对移动，用于紧凑录制

```qm
mou "recorded unreadable text"
```

## 语法4 - 恢复鼠标位置

```qm
mou
```

## 参数

- **x y** - 鼠标指针 [坐标](../Other/IDP_PIXELS.md)。
- [**window**](../Other/IDP_WINDOWEXPRESSION.md) - 顶级或子窗口。若省略，坐标相对于屏幕左上角。
- **flags**：
  - 1 - 坐标相对于窗口客户区或工作区（若 **window** 为 0）的左上角。默认值：0。

### 选项

| 选项 | 描述 |
|------|------|
| + | 坐标相对于当前鼠标指针位置。 |
| - | 坐标相对于上一次鼠标移动怎么办

System: 移动/点击命令的坐标。 |

## 备注

### 语法4

恢复当前宏中第一次鼠标移动/点击命令前的鼠标指针位置。

### 速度

移动速度取决于 [spe](IDP_SPE.md) 和 [opt slowmouse](IDP_OPT.md)。

## 示例

```qm
;; 将鼠标指针移动到屏幕坐标 500, 300
mou 500 300

;; 将鼠标指针移动到 "Notepad" 窗口坐标 100, 150
mou 100 150 "Notepad"

;; 从当前位置移动鼠标指针 20, -10 像素
mou + 20 -10

;; 恢复当前宏中第一次鼠标移动/点击命令前的鼠标指针位置
mou

;; 在 "Notepad" 窗口中移动鼠标指针，x=100（相对于 "Notepad"），y 不变
int w = win("Notepad")
mou 100 ym(0 w) w

;; 获取鼠标指针位置，...，恢复鼠标指针位置
int px(xm) py(ym)
...
mou px py
```