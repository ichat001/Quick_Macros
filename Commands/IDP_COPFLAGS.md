# cop、ren 和 del 的标志

另见：[标志](../Other/IDP_FLAGS.md)。

## 标志列表

| 标志 | 值 | 描述 |
|------|------|------|
| FOF_MULTIDESTFILES | 0x1 | **to** 指定多个目标文件（每个源文件对应一个目标文件），而非单一目标目录。 |
| FOF_SILENT | 0x4 | 不显示进度对话框。 |
| FOF_RENAMEONCOLLISION | 0x8 | 若目标文件名已存在，为复制或移动的文件生成新名称（如“Copy #1 of...”）。 |
| FOF_NOCONFIRMATION | 0x10 | 对任何弹出的对话框自动选择“是全部”。 |
| FOF_ALLOWUNDO | 0x40 | 尽可能保留撤销信息。用于 `del` 时，将文件移至回收站。 |
| FOF_FILESONLY | 0x80 | 若使用通配符（如 *.*），仅操作文件。 |
| FOF_SIMPLEPROGRESS | 0x100 | 显示进度对话框，但不显示文件名。 |
| FOF_NOCONFIRMMKDIR | 0x200 | 若操作需创建新目录，不确认创建。 |
| FOF_NOERRORUI | 0x400 | 不显示错误界面。 |
| FOF_NOCOPYSECURITYATTRIBS | 0x800 | 不复制文件安全属性。 |
| FOF_NORECURSION | 0x1000 | 仅在指定目录操作，不递归处理子目录。 |
| FOF_NO_CONNECTED_ELEMENTS | 0x2000 | 不将关联文件（如 HTML 文件及其图片）作为一个整体移动，仅移动指定文件。 |
| FOF_WANTNUKEWARNING | 0x4000 | 删除操作时若文件被销毁（而非回收），发送警告。部分覆盖 FOF_NOCONFIRMATION。 |

## 默认标志

| 命令 | 默认标志 |
|------|------|
| `cop`, `ren` | FOF_ALLOWUNDO \| FOF_FILESONLY \| FOF_NOCONFIRMMKDIR。若设置 `opt err 1`，添加 FOF_NOERRORUI。 |
| `cop+`, `ren+` | 同 `cop`/`ren`，并添加 FOF_NOCONFIRMATION \| FOF_RENAMEONCOLLISION。 |
| `cop-`, `ren-` | 同 `cop`/`ren`，并添加 FOF_NOCONFIRMATION。 |
| `del` | FOF_FILESONLY \| FOF_NOCONFIRMATION \| FOF_SILENT \| FOF_NOERRORUI \| FOF_ALLOWUNDO。 |
| `del-` | 同 `del`，移除 FOF_ALLOWUNDO。 |

## 备注

若指定 **flags**，将替换默认标志，但 `+` 或 `-` 选项添加或移除的标志不受影响。