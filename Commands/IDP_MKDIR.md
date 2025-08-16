# 创建新文件夹

## 语法

```qm
int mkdir(folder [parent])
```

## 参数

- **folder** - 新文件夹的名称。若未使用 **parent** 或 **parent** 为 ""，则 **folder** 必须为完整路径。
- **parent** - 父文件夹或驱动器。若 **folder** 包含完整路径，则不使用 **parent**。默认值：""。

## 备注

创建新文件夹。

- 返回值：
  - 1：成功创建文件夹。
  - 0：文件夹已存在。
  - 若失败则报错。

若需要，也会创建父文件夹。例如，`mkdir "x:\a\b\c"` 会创建文件夹 a、b 和 c（如果它们不存在）。

**另见**：`ChangeFileSecurity`。

## 示例

```qm
;; 在桌面创建 "New Folder" 文件夹
mkdir "$Desktop$\New Folder"

;; 同上
mkdir "New Folder" "$Desktop$"
```