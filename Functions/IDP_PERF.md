# 获取精确时间（性能计数器）

## 语法

```qm
long perf
```

## 说明

返回自 Windows 启动以来的微秒数。适用于测量代码执行速度。

当不需要高精度时，可使用 [GetTickCount](IDP_QMDLL.md#GetTickCount)（约 15 毫秒精度）或 [timeGetTime](IDP_QMDLL.md#timeGetTime)（2 毫秒精度），它们返回自 Windows 启动以来的毫秒数。

测量代码速度时，建议重复执行多次。您的线程可能会被中断以将 CPU 时间分配给其他程序或线程。例如，移动鼠标时，操作系统需要时间移动鼠标指针。此外，代码速度取决于 CPU 和其他硬件特性。

**注意**：
- 根据计算机速度，`perf` 本身可能需要 1 或几微秒。
- 返回值类型为 `long`（64 位），而非 `int`（32 位）。格式化显示结果时需小心：
  - 先将差值赋给 `int` 变量；
  - 或在格式化字符串中使用 `%I64i` 而非 `%i`；
  - 或使用 F-string。

**另见**： [PerfFirst, PerfNet, PerfOut](IDP_QMDLL.md#PerfFirst)

## 示例

```qm
;; 测量代码运行时间
long t1=perf ;; 获取开始时间
int i j
for i 0 1000
    j=5
long t2=perf ;; 获取结束时间
out t2-t1 ;; 显示时间差
```