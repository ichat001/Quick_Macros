# DPI 缩放窗口

## 概述
在 Windows Vista 及更高版本中，可通过“控制面板 -> 显示”调整文本和其他项目的缩放比例（例如 125%、150%），称为 **DPI 缩放**。当 DPI 缩放非 100% 且不使用 XP 风格缩放时，部分窗口会被拉伸并略显模糊，称为 **DPI 缩放窗口**。

DPI 缩放窗口对自动化程序（如 QM）存在挑战。QM 内部函数已解决大多数问题，本主题介绍仍可能遇到的 DPI 缩放窗口问题。

## Windows Vista、7 和 8.0
- 在这些系统上，DPI 缩放窗口的 Windows API 函数使用**逻辑坐标**（非缩放窗口坐标，小于可见窗口），而可见的拉伸窗口使用**物理坐标**。
- QM 2.3.6 及更高版本对 DPI 缩放窗口使用物理坐标（可见坐标），效果良好。早期版本多使用逻辑坐标，效果不佳。若在旧版 QM 中创建的宏使用逻辑坐标（x、y、宽、高），在新版 QM 中需改为物理坐标。
- 若宏中使用 Windows API 函数，为兼容 DPI 缩放窗口，建议替换为类似的 QM 函数。QM 对话框及其他 QM 窗口不可 DPI 缩放，因此可安全使用 Windows API 函数。
- 替换建议：

  | Windows API 函数 | QM 函数 |
  |-----------------|---------|
  | `GetCursorPos` | [xm](../Functions/IDP_XMYM.html) |
  | `GetWindowRect`, `GetClientRect` | `DpiGetWindowRect` |
  | `ScreenToClient` | `DpiScreenToClient` |
  | `ClientToScreen` | `DpiClientToScreen` |
  | `MapWindowPoints` | `DpiMapWindowPoints` |
  | `MoveWindow`, `SetWindowPos` | [mov, siz](../Commands/IDP_MOV.html) |

## Windows 8.1 和 10
- 这些系统上，大多数 Windows API 函数对所有窗口使用物理坐标。因此，`DpiGetWindowRect` 等 QM 函数在此不再转换物理/逻辑坐标，但仍可使用以确保跨系统兼容。
- QM 在 DPI 缩放窗口上的问题：
  - 大多数可访问对象报告的坐标不准确。
  - 对于使用不同 DPI 缩放的监视器上的窗口（如非主监视器），QM 可能效果不佳，例如“窗口文本”函数使用错误坐标。
  - DPI 缩放更改后，QM 在注销/登录前可能效果不佳。
  - 其他潜在问题。
- 可在程序文件属性对话框的“兼容性”选项卡中禁用 DPI 缩放，或在“控制面板 -> 显示”选择“统一缩放”并设为 125%，旧系统可选择 XP 风格。

## QM DpiX 函数
（QM 2.3.6 引入）这些函数适用于所有窗口，使用物理坐标（可见坐标）。

### DpiIsWindowScaled
```cpp
#DpiIsWindowScaled hwnd ;; 若 hwnd 为 1，获取是否启用缩放
```
- **功能**：检查窗口是否为 DPI 缩放。
- **参数**：
  - **hwnd**：窗口句柄。若为 1，返回是否启用 DPI 缩放（1 为启用，0 为禁用）。
- **返回值**：1（窗口为 DPI 缩放），0（非 DPI 缩放）。
- **用法**：常用于条件判断，如：
  ```cpp
  if(DpiIsWindowScaled(w)) ... DpiScale(...)
  ```
  在 Windows 8.1 及更高版本，若相关 API 使用物理坐标，可禁用此代码：
  ```cpp
  if(_winver<0x603 and DpiIsWindowScaled(w)) ... DpiScale(...)
  ```
  关于 [_winver 和 0x603](../Language/IDP_SPECVAR.html)。

### DpiGetWindowRect
```cpp
#DpiGetWindowRect hwnd RECT*r [flags] ;; flags: 4 客户端区域, 8 客户端区域在屏幕坐标
```
- **功能**：获取窗口在屏幕中的矩形、客户端区域矩形或客户端区域在屏幕中的矩形。
- **参数**：
  - **hwnd**：窗口句柄。
  - **r**：接收物理矩形坐标的变量地址。
- **返回值**：2（窗口为 DPI 缩放），1（非 DPI 缩放），0（失败）。

### DpiClientToScreen / DpiScreenToClient
```cpp
#DpiClientToScreen hwnd POINT*p [flags] ;; flags: 16 窗口坐标, 0x100 RECT
#DpiScreenToClient hwnd POINT*p [flags] ;; flags: 16 窗口坐标, 0x100 RECT
```
- **功能**：将窗口客户端区域坐标转换为屏幕坐标，或反之。若 flags 为 16，则转换窗口坐标与屏幕坐标。
- **参数**：
  - **hwnd**：窗口句柄。
  - **p**：包含物理点坐标的变量地址。若 flags 为 `0x100`，则为 `RECT` 变量地址。
- **返回值**：2（窗口为 DPI 缩放），1（非 DPI 缩放），0（失败）。

### DpiMapWindowPoints
```cpp
DpiMapWindowPoints hwnd1 hwnd2 POINT*p n [flags]
```
- **功能**：将 n 个点从一个窗口的客户端区域坐标转换为另一个窗口的客户端区域坐标。
- **参数**：
  - **hwnd1**：转换前坐标所在窗口句柄，0 表示屏幕。
  - **hwnd2**：转换后坐标所在窗口句柄，0 表示屏幕。
  - **p**：包含物理坐标的一个或多个 `POINT` 或 `RECT` 变量地址。
  - **n**：转换点数，单 `POINT` 变量为 1，单 `RECT` 变量为 2（如 `+&r`）。
- **备注**：以上四个函数可使用 flags：1（已知非 DPI 缩放），2（已知 DPI 缩放），加速执行。

### DpiScale
```cpp
DpiScale POINT*p n ;; n: >0 缩放, <0 反缩放
```
- **功能**：将一个或多个点的坐标从逻辑坐标转换为物理坐标，或反之。
- **参数**：
  - **p**：包含坐标的一个或多个 `POINT` 或 `RECT` 变量地址。
  - **n**：转换点数，单 `POINT` 变量为 1，单 `RECT` 变量为 2（如 `+&r`）。若 n < 0，从物理到逻辑坐标。
- **备注**：简单乘以坐标。例如，文本大小为 125%，`p.x` 为 100，若 `n` > 0 则变为 125，若 `n` < 0 则变为 80。始终有效，不受系统 DPI 设置或版本影响。在 Windows 8.1 及更高版本，使用主监视器 DPI。

### DpiGetDPI
```cpp
#DpiGetDPI
```
- **功能**：返回进程启动时主监视器的 DPI（96 为 100%）。
- **备注**：Windows 8.1 及更高版本支持多监视器不同 DPI。

### DpiGetMonitorDPI
```cpp
#DpiGetMonitorDPI hmonitor [flags]
```
- **功能**：返回指定监视器的 DPI。
- **参数**：
  - **hmonitor**：监视器句柄，见 [MonitorFromIndex](../User/IDP_QMDLL.html#MonitorFromIndex)。
  - **flags**：1（支持 Windows 8.1 及 Windows 10.1607 之前的每监视器 DPI）。
- **返回值**：若 `hmonitor` 无效、系统早于 Windows 8.1 或无 flags 1 且早于 Windows 10.1607，返回与 `DpiGetDPI` 相同值。
- **备注**：使用 Windows API `GetDpiForMonitor`。QM 2.4.11 引入。

### DpiGetWindowDPI
```cpp
#DpiGetWindowDPI hwnd [flags]
```
- **功能**：返回指定窗口的 DPI。
- **参数**：
  - **hwnd**：窗口句柄。
  - **flags**：1（支持 Windows 8.1 及 Windows 10.1607 之前的每监视器 DPI）。
- **返回值**：若 `hwnd` 无效、系统早于 Windows 8.1 或无 flags 1 且早于 Windows 10.1607，返回与 `DpiGetDPI` 相同值。
- **备注**：
  - Windows 10.1607 及更高版本使用 `GetDpiForWindow`。
  - Windows 8.1 及 Windows 10.1607 之前使用 `MonitorFromWindow`/`GetDpiForMonitor`，可靠性较低。
  - QM 2.4.11 引入。