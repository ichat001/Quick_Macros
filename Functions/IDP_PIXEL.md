# 获取像素颜色

## 语法

```qm
int pixel(x y [window] [flags])
```

## 参数

- **x y** - [坐标](IDP_PIXELS.md)。
- **window** - [顶级或子窗口](IDP_WINDOWEXPRESSION.md)。如果省略或为 0，**x y** 为屏幕坐标。
- **[flags](IDP_FLAGS.md)**：
  | 标志 | 描述 |
  |------|------|
  | 1 | **x y** 相对于窗口客户端区域或工作区域的左上角。 |
  | 2 | 不激活 **window**。如果 **x y** 不属于 **window** 或其顶级父窗口，不报错。 |
  | 0x1000 (QM 2.4.3) | 直接从 **window** 获取像素颜色，而不是从屏幕。等同于 [scan](IDP_SCAN.md) 的 0x1000 标志。速度更快，不激活 **window**。如果 **x y** 不属于 **window** 或其客户端区域，返回 -1。忽略此标志的情况：未使用 **window**、Windows Aero 主题未启用，或 **window** 是 [DPI 缩放](IDP_DPI.md) 的窗口。 |

## 说明

返回像素的 [颜色](IDP_COLOR.md)。

当使用 **window** 时：
- 恢复最小化的窗口。
- 激活非活动窗口（取决于 **flags** 和窗口样式）。
- 如果点属于其他顶级窗口，报错（取决于 **flags**）。

不建议使用此函数搜索像素，因为速度较慢。建议使用 [scan](IDP_SCAN.md)（可搜索一个或多个像素颜色或图像）。

**另见**： [wait for color](IDP_WAIT_FOR.md), [scan](IDP_SCAN.md)。

## 示例

```qm
int w=win("Quick Macros" "QM_Editor")
int color=pixel(100 100 w 1|0x1000)
int r g b
ColorToRGB(color &r &g &b)
out F"color=0x{color} red={r} green={g} blue={b}"

;; 将鼠标指针位置的颜色存储到剪贴板：
str s=F"0x{pixel(xm ym)}"
s.setclip
```