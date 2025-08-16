# 获取光标（鼠标指针）位置

## 语法

```qm
int xm([pp] [window] [client])
int ym([pp] [window] [client])
```

## 参数

- **pp** - `POINT` 类型变量。如果使用，每个函数会将 x 和 y 坐标存储到此变量中。默认：0。
- **window** - [顶级或子窗口](IDP_WINDOWEXPRESSION.md)。如果省略或为字面值 0，坐标相对于屏幕左上角。
- **client** - 若为 1，坐标相对于窗口客户区左上角；若 **window** 为字面值 0，则相对于工作区域。默认：0。

## 说明

- `xm` 返回光标 x 坐标（以 [像素](IDP_PIXELS.md) 为单位）。
- `ym` 返回光标 y 坐标。
- 使用 **pp** 参数可以通过任一函数一次性获取 x 和 y 坐标。

`POINT` 类型用于指定坐标：

```qm
type POINT x y
```

## 示例

```qm
int x = xm

lef 100 ym(0 "Notepad") "Notepad"

POINT p
xm p "Quick"
out "Cursor coordinates relative to window 'Quick' are:[]x=%i y=%i" p.x p.y
```