# C 运行时库数学函数

## 概述
C 运行时库（msvcrt.dll）包含许多实用数学函数，参考资料见 [MSDN 库](../Other/IDP_MSDN.html)。在使用这些 DLL 函数前，需通过 [DLL 声明](IDP_DLL.html) 进行定义。QM 已为部分数学函数声明，归入 [math 类别](IDP_CATEGORIES.html)。

## 示例函数
- **fmod**：计算浮点余数。
  - 示例：`double rem=fmod(x y)`
- **pow**：计算 x 的 y 次幂。
  - 示例：`double pw=pow(x y)`
- **sqrt**：计算 x 的平方根。
  - 示例：`double sq=sqrt(x)`

## 声明示例
若 MSDN 库中函数定义为：
```c
double fmod(double x, double y);
```
则 QM 声明为：
```cpp
dll msvcrt ^fmod ^x ^y
```

## 示例
```cpp
double angleDegrees=30
def PI 3.1415926535897932384626433832795
double s=sin(angleDegrees*PI/180) ;; 度转弧度并计算正弦
double a=asin(s)*180/PI ;; 计算反正弦并转回度
out s
out a
```