# 禁用/启用触发器

**注意**：在 [exe](../QM_Help/IDH_MAKEEXE.md) 中不可用。

## 语法

### 语法 1 - 设置状态
```
dis[+|-] [macro] [flags]
```

### 语法 2 - 获取状态
```
int dis([macro] [flags])
```

## 参数

- **macro** - [QM 项目](../QM_Help/IDH_ITEMS.md)名称（完整，不区分大小写）或 [id](../Functions/IDP_QMITEM.md)（整数）。
  - 可为 QM 项目路径，例如 "\Mouse\Next" 表示文件夹 "Mouse" 中的宏 "Next"。
  - 可为项目列表（多行）。
  - 若为[子函数](../Language/IDP_DIR_SUB.md)，QM 使用其父函数。
- **flags**：
  | 值 | 描述 |
  |----|------|
  | 0 | **macro** 不是文件夹。 |
  | 1 | **macro** 是文件夹。 |
  | 2 | **macro** 为文件夹或非文件夹。 |

### 选项

| 选项 | 描述 |
|------|------|
| 默认 | 切换启用/禁用状态。 |
| + | 禁用。 |
| - | 启用。 |

## 备注

### 语法 1
禁用或启用 **macro** 的触发器。

- 若省略 **macro**，禁用/启用 QM（等同于菜单 [Run -> Disable Triggers](../QM_Help/IDH_MENU_TOOLS.md)）。
- 若 **macro** 为 ""，禁用/启用当前文件。

### 语法 2
返回禁用/启用状态：
- 对于项目：返回 0（启用）、1（禁用）、2（启用但位于禁用文件夹或文件中）。
- 对于 QM：返回表示禁用触发器类型的标志组合：
  - 1：键盘
  - 2：鼠标
  - 4：窗口
  - 8：命令行
  - 16：用户定义
  - 32：文件
  - 64：事件日志
  - 128：QM 处于“禁用”状态（灰色图标）
  - 0x100：进程
  - 0x200：可访问对象
- 若 **macro** 为 ""，返回 1（当前文件禁用）或 0（启用）。

## 示例

```cpp
dis ;;禁用或启用 QM
dis+ "Macro" ;;禁用宏
dis+ "\Folder\Macro"
dis "Folder1[]Folder2" 1 ;;禁用或启用两个文件夹

int i = qmitem("Macro139")
dis i
if(dis(i)) out "disabled"; else out "enabled"

if(dis&128) ret ;;若 QM 禁用，退出
if(dis&16) ret ;;若用户定义触发器禁用，退出
```