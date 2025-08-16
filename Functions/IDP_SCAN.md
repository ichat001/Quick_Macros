# 在屏幕上查找图像

## 语法

### 语法 1 - 查找
```
int scan(image [window] [rect] [flags] [colorDiff] [matchIndex|array])
```

### 语法 2 - 等待
```
wait timeS [-]S image [window] [rect] [flags] [colorDiff] [matchIndex|array]
```

## 参数
- **image** - 要查找的图像，可为：
  - QM 2.4.0：[资源](../Other/IDP_RESOURCES.html)名称，格式 `"image:name"` 或 `"resource:<macro>image:name"`，详见备注。
  - 位图[文件](../Other/IDP_SEARCHPATHS.html)，须以 `.bmp` 结尾。
  - 图标文件，任意非 `.bmp` 文件路径，可指定图标索引，如 `"shell32.dll,5"`。
  - QM 2.3.2：单像素[颜色](../Other/IDP_COLOR.html)，格式 `"color:0xBBGGRR"`，变量使用 `F"color:{variable}"`。
  - QM 2.4.3：位图或图标句柄，格式 `"hbitmap:handle"` 或 `"hicon:handle"`，变量使用 `F"hbitmap:{variable}"`。
  - QM 2.4.3：图像或颜色列表，如 `"image:image1[]image:image2[]image:image3"`，详见备注。
  - **过时选项**：
    - QM 2.3.2：包含位图文件数据的宏，格式 `"macro:name"`，现建议使用宏资源。
    - 位图或图标句柄，现使用 `F"hbitmap:{h}"` 或 `F"hicon:{h}"`。
- **window** - [顶层或子窗口](../Other/IDP_WINDOWEXPRESSION.html)。
  - 省略或字面值 0，搜索整个屏幕（所有显示器）。
  - QM 2.4.3：可为可访问对象（`Acc` 或 `IAccessible` 变量）。
  - 另见标志 0x200。
- **rect** - `RECT` 类型变量，默认 0。
  - 存储找到的图像在屏幕中的坐标（相对于主显示器左上角）。
  - 也可限制搜索区域，除非变量为空或使用标志 128，详见备注。
- **flags**：
  | 值 | 描述 |
  |----|------|
  | 1 | 将鼠标移动到图像，不与标志 0x200 和 -S 共用。 |
  | 2 | 图像未找到时报错，不用于 `wait`。 |
  | 4 | 使用图像左上角像素颜色作为透明色。 |
  | 16 | 仅搜索窗口客户区，不用于整个屏幕或位图搜索；当 **window** 为可访问对象时，与 0x100 和 0x1000 配合使用。 |
  | 32 | 当 **image** 为图标文件时，使用大图标（32x32），默认小图标（16x16）。 |
  | 64 | 当 **image** 为句柄或 EXE 资源 ID 时，指定为图标。 |
  | 128 | QM 2.3.2：使用 **rect** 存储结果，但不限制搜索区域。 |
  | 0x100 | QM 2.3.2：直接从窗口获取像素颜色（使用 [PrintWindow](../Other/IDP_MSDN.html)），支持后台或屏幕外窗口（非最小化或隐藏），但某些窗口（如 Windows Store 应用、非客户区、玻璃效果）无效，且高[完整性级别](../Other/IDP_VISTA.html)窗口报错；若窗口为 [DPI 缩放](../Other/IDP_DPI.html) 或与 0x1000 配合且 Aero 启用则忽略。 |
  | 0x200 | QM 2.3.2：搜索内存中位图，**window** 须为位图句柄，**rect** 接收位图中图像坐标，不限制搜索区域。 |
  | 0x400 | QM 2.3.2：找到图像后等待鼠标按钮释放，与 `wait` 和标志 1（移动鼠标）更实用。 |
  | 0x800 | QM 2.4.3：查找 **image** 中所有图像，全部找到返回 1，否则返回 0（或报错，若有标志 2）。 |
  | 0x1000 | QM 2.4.3：使用快速无闪烁方法从窗口获取像素颜色，仅在 Windows Aero 主题启用时有效，忽略 DPI 缩放窗口；支持后台或屏幕外窗口（非最小化或隐藏），但某些窗口无效；Windows 7 可禁用 Aero。 |
- **colorDiff** - （QM 2.3.2）屏幕图像的最大允许颜色/亮度差异（0-255，建议尽量小），用于查找非完全匹配的图像。
- **matchIndex** - （QM 2.3.2）基于 1 的匹配图像索引，0 等同 1，用于搜索区域有多个匹配图像时选择非首个。
- **array** - （QM 2.3.3）`ARRAY(RECT)` 类型变量，接收所有匹配图像的坐标。
- **timeS** - （`wait`）最大等待时间（秒），超时报错，若 ≤0 则无限等待。
- **S** - 字面值 S。
  - 若为 -S，等待图像消失。
  - 若为 -S 且 **image** 为 `""`，等待窗口或矩形区域发生变化。

## 备注
- `scan` 在屏幕上搜索指定图像，找到返回 1，未找到返回 0（或报错，若设置标志 2）。
- `wait` 等待屏幕上出现指定图像，与 `scan` 参数和行为基本相同，以下“`scan`”或“函数”指代 `scan` 和 `wait`。
- 使用“Find Image”对话框捕获/保存图像并生成代码，图像可保存为宏资源或 `.bmp` 文件。
- 默认情况下，对话框将捕获的图像保存为当前宏的[资源](../Other/IDP_RESOURCES.html)，名称如 `"image:hFBDB67A2"` 或 `"image:button1"`，在宏中使用如 `scan "image:button1" 0 0 1|2`。运行时，`scan` 从宏资源或调用栈中调用者的资源获取图像。
- 可选择现有资源，支持以 `"image:"` 开头或以 `.bmp`、`.png`、`.ico` 结尾的资源，也可使用其他宏的资源，如 `scan "resource:<macro1>image:button1" 0 0 1|2`。
- 创建 [EXE](../QM_Help/IDH_MAKEEXE.html) 时，QM 将宏资源添加到 EXE 资源，`scan` 在 EXE 中使用这些资源。若使用图像文件，文件须在 EXE 运行位置可用，或可将文件[添加到 EXE 资源](#添加文件到-exe-资源)。
- **多图像支持**（QM 2.4.3）：
  - 无 0x800 标志：搜索任一图像，返回首个找到的图像的基于 1 索引（首个返回 1，第二个返回 2，依次类推），未找到返回 0（或报错，若有标志 2）。若使用 **array**，存储所有找到的图像实例坐标，数组可能与指定列表不匹配（每图像可找到 0、1 或多个实例）。
  - 有 0x800 标志：搜索所有图像，全部找到返回 1，否则返回 0（或报错）。若使用 **array**，存储每图像首个找到的坐标（数组与指定列表匹配）。
  - 示例：`scan "image:h43312EF0[]image:h65F5BD95[]image:h2FC19D26" w 0 1|2|16`
- **优化速度**：
  - 始终指定 **window**，控件或可访问对象更佳，可在“Find Image”对话框中按 Test 测量搜索时间。
  - 使用 **rect**（`RECT` 类型变量）限制搜索区域，坐标须相对于 **window** 定义的搜索区域（屏幕、窗口/控件、客户区（标志 16）或可访问对象）。
  - 若仅用于结果而非限制搜索区域，**rect** 须初始化为空（所有成员为 0）或使用标志 128。
  - 速度还取决于硬件、Windows 版本、Aero 启用状态及视频驱动程序，标志 0x100 和 0x1000 依赖窗口。
- 除非使用标志 0x100、0x1000 或 0x200，函数仅查找屏幕上可见图像。若指定 **window**，确保窗口未被覆盖，可用 `act` 激活窗口。函数不验证图像是否属于窗口。
- 函数仅查找与指定图像完全匹配的屏幕图像，使用 **colorDiff** 可查找颜色/亮度略不同的图像，无法查找形状不同的图像。
- Windows 主题、配色方案、皮肤等变化可能导致查找失败，因背景色可能改变。使用标志 4 可忽略图像左上角像素颜色（通常为背景色），提高鲁棒性。显示颜色分辨率、[DPI](../Other/IDP_DPI.html)（文本大小）、字体平滑（若图像含文本）或窗口阴影变化也可能导致失败。
- 使用图标时，建议始终设置 **colorDiff** 为 8，因图标显示颜色可能与文件略有不同。
- **位图/图标句柄**：可通过 [LoadImage](../Other/IDP_MSDN.html)、[LoadPictureFile](../User/IDP_QMDLL.html#LoadPictureFile)、[GetFileIcon](../User/IDP_QMDLL.html#GetFileIcon)、[GetWindowIcon](../User/IDP_QMDLL.html#GetWindowIcon)、`CaptureImageOnScreen`、`CaptureImageOrColor` 获取句柄，之后需用 [DeleteObject](../Other/IDP_MSDN.html)（位图）或 [DestroyIcon](../Other/IDP_MSDN.html)（图标）释放。
- **标志 0x200**（QM 2.3.2）：搜索内存中位图，**window** 须为位图句柄（通过 [LoadPictureFile](../User/IDP_QMDLL.html#LoadPictureFile) 等加载，之后用 [DeleteObject](../Other/IDP_MSDN.html) 释放），不得选入设备上下文，搜索速度快于从屏幕或窗口获取像素。
- **错误情况**：
  - 文件未找到、资源不存在或无法提取图像。
  - 窗口未找到。
  - 图像未找到（仅当设置标志 2）。
  - 意外错误（如无效句柄或内存不足）。
  - 超时（`wait`）。
- **RECT 类型**：
  ```cpp
  type RECT left top right bottom
  ```
  - **left**, **top**：矩形左上角坐标。
  - **right**, **bottom**：矩形右下角坐标（实际在矩形外），宽度为 `right-left`，高度为 `bottom-top`。

**另见**：[wait for image or color](../Commands/IDP_WAIT_FOR.html)、[pixel](IDP_PIXEL.html)、[id](IDP_ID.html)、[child](IDP_CHILD.html)、[acc](IDP_ACC.html)、[htm](IDP_HTM.html)

## 添加文件到 EXE 资源
1. 在“Make exe”对话框中勾选“Auto add files...”。
2. 在代码中使用资源 ID 作为文件路径。
   示例：
   ```cpp
   scan "A.bmp" 0 0 1|2
   // ...
   scan "B.bmp" 0 0 1|2
   // ...
   scan "B.bmp" 0 0 1|2
   ```
   添加资源 ID：
   ```cpp
   scan ":1 A.bmp" 0 0 1|2
   // ...
   scan ":2 B.bmp" 0 0 1|2
   // ...
   scan ":2 B.bmp" 0 0 1|2
   ```
   A.bmp 和 B.bmp 将添加到 EXE 资源，EXE 中使用资源图像；在 QM 中运行时使用文件（忽略 `:1` 部分）。

## 示例
```cpp
// 在 "Abc" 窗口查找图像（存储在资源中），若找到则点击，否则报错
scan "image:example" "Abc" 0 1|2
lef

// 最多等待 10 秒直到图像（存储在文件）出现
wait 10 S "example.bmp" "Abc"

// 在窗口查找图像并获取其位置
RECT r
if(scan("image:example" "Abc" r))
	out "x=%i y=%i 宽度=%i 高度=%i" r.left r.top r.right-r.left r.bottom-r.top
else out "未找到"

// 在指定矩形区域查找图像并获取其位置
RECT r; r.left=100; r.top=100; r.right=300; r.bottom=300
if(scan("image:example" 0 r))
	out "x=%i y=%i 宽度=%i 高度=%i" r.left r.top r.right-r.left r.bottom-r.top
else out "未找到"
```