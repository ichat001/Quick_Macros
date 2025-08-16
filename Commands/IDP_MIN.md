# 最小化、最大化、恢复窗口

## 语法1 - 设置状态

```qm
min [window]
max [window]
res [window]
```

## 语法2 - 获取状态

```qm
int min([window])
int max([window])
int res([window])
```

## 参数

- [**window**](../Other/IDP_WINDOWEXPRESSION.md) - 顶级或 [子窗口](../Other/IDP_WINDOWSTYLES.md)。默认值：活动窗口。

## 备注

### 语法1

- `min` - 最小化窗口。
- `max` - 最大化窗口。
- `res` - 恢复窗口，类似于窗口系统菜单中的“恢复”项：
  - 若窗口已最小化，恢复到之前的状态（正常或最大化）。
  - 若窗口已最大化，恢复为正常状态。
  - 若仅需在最小化时恢复，可使用 `if min`（见示例）或 [act](IDP_ACT.md)（若最小化则恢复）。

速度取决于 [spe](IDP_SPE.md)。

### 语法2

返回 1 若窗口处于以下状态，否则返回 0：
- `min` - 窗口已最小化。
- `max` - 窗口已最大化。
- `res` - 窗口为正常状态。

## 示例

```qm
;; 最小化 "Notepad" 窗口
min "Notepad"

;; 若 "Notepad" 窗口已最小化，恢复到之前状态
int w=win("Notepad")
if(min(w)) res w
```