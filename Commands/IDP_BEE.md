# 播放声音

## 语法

### 语法 1 - 播放标准 Windows 声音
```
bee [sound]
```

### 语法 2 - 播放 WAV 文件
```
bee [+] wavefile
```

### 语法 3 - PC 扬声器声音
```
bee frequency duration
```

## 参数

- **sound** - 控制面板中指定的标准 Windows 声音：
  | 值 | 描述 |
  |----|------|
  | 0（默认） | 默认提示音 |
  | 1 | 严重错误（Critical Stop） |
  | 2 | 询问（Question，在最新 Windows 版本中默认禁用） |
  | 3 | 警告（Exclamation） |
  | 4 | 信息（Asterisk） |
  | -1 | 简单提示音，若无声卡则使用扬声器 |
- **wavefile** - 声音文件[路径](../Other/IDP_SEARCHPATHS.md)。
- **frequency** - 频率，37 - 32767 Hz。
- **duration** - 持续时间，毫秒。

### 选项
| 选项 | 描述 |
|------|------|
| 默认 | 异步播放（宏立即继续执行） |
| + | 同步播放（等待声音播放结束） |

## 备注

### 语法 2
- 仅支持 .wav 文件。
- 若 **wavefile** 未找到，播放默认声音。
- 若 **wavefile** 为 ""，停止当前播放的声音。
- 支持 [宏资源](../Other/IDP_RESOURCES.html)（QM 2.4.1）和 [exe 资源](../QM_Help/IDH_MAKEEXE.html)（QM 2.3.4）。
- 默认情况下，`bee` 不等待声音播放完成。在 exe 中，exe 进程结束时声音即停止。

### 语法 3
- 在 Windows 7 上使用声卡而非 PC 扬声器。
- 在 Windows Vista 上无效。
- 在旧版 Windows 上，若无 PC 扬声器，则使用声卡或无效。

另见：`Play` 函数（支持任意格式的音频文件）。

## 示例

```cpp
bee ;;默认声音
bee 1 ;;播放标准声音（0 到 4）
bee "c:\m\moo.wav" ;;播放文件
bee "$windows$\Media\chimes.wav" ;;播放 Windows 媒体文件夹中的文件
bee "" ;;停止当前声音
```