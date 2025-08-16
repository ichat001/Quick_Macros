# 共享内存

> **注意**：此函数在 QM 2.3.4 中已移除，建议使用 `__ProcessMemory` 类替代。如果您有来自 QM 论坛的代码包含此函数，请参考 [此处](http://www.quickmacros.com/forum/viewtopic.php?f=2&t=3368) 获取新版本。
>
> 在 [可执行文件](IDH_MAKEEXE.md) 中不可用。

## 语法

```qm
int* share([window])
```

## 参数

- **window** - 顶级或 [子窗口](IDP_WINDOWSTYLES.md)，属于将使用共享内存的应用程序。

## 说明

直接使用 [SendMessage](IDP_QMDLL.md#SendMessage) 函数向非 QM 应用程序传递指针或字符串数据通常无效，且可能导致应用程序崩溃或数据损坏，因为指针在 QM 的地址空间中有效，但在其他应用程序的地址空间中无效。解决方法是使用共享内存。

QM 提供 1 KB 共享内存供宏使用。`share` 函数返回其地址：
- 不带 **window** 参数调用时，返回 QM 上下文中的共享内存地址。
- 带 **window** 参数调用时，返回目标应用程序上下文中的共享内存地址（尽管物理内存相同，但应用程序使用不同地址访问）。

使用时：
- 使用 QM 上下文的地址（可能加偏移）来获取或设置数据。
- 将目标应用程序上下文的地址（可能加偏移）传递给该应用程序，通常作为 [SendMessage](IDP_QMDLL.md#SendMessage) 的 `lParam` 参数。

始终使用 `lock _share` 保护共享内存操作，以防止多 [线程](IDP_THREADS.md) 同时访问。参见示例和 [lock](IDP_LOCK.md)。

## 示例

```qm
;; 传递用户定义类型变量的地址
lock _share
VARIABLETYPE* variable=+share
memset(variable 0 sizeof(VARIABLETYPE))
variable.member1=value1
variable.member2=value2
SendMessage(hwnd message wparam share(hwnd))
out variable.member1
lock- _share

;; 设置状态栏文本
int hwnd=child("" "msctls_statusbar32" "Notepad" 0x1)
str text="text from QM"
lock _share
strcpy(+share text)
SendMessage(hwnd SB_SETTEXT 0 share(hwnd))
lock- _share

;; 获取工具栏按钮文本
int hwnd=child("Notification Area" "ToolbarWindow32" "+Shell_TrayWnd" 0x1)
int buttonID=0
lock _share
SendMessage(hwnd TB_GETBUTTONTEXT buttonID share(hwnd))
str s.get(+share 0)
lock- _share
out s

;; 获取 SysListView32 控件项目文本
int hwnd=child("FolderView" "SysListView32" "My QM" 0x1)
int item=0
lock _share
LVITEM* lip=share ;; 在 QM 上下文中
LVITEM* lip2=share(hwnd) ;; 在 hlv 上下文中
memset(lip 0 sizeof(LVITEM))
int stringoffset=sizeof(LVITEM)+20
lip.pszText=+(lip2+stringoffset) ;; 在 hlv 上下文中
lip.cchTextMax=260
lip.mask=LVIF_TEXT
SendMessage(hwnd LVM_GETITEMTEXT item lip2)
str s.get(+lip stringoffset)
lock- _share
out s
```