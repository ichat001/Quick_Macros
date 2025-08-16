# 在其他计算机上运行宏

## 语法

```qm
int net(computer password macro [retval] [a1 ...])
```

## 参数

- **computer** - 远程计算机的名称或 IP 地址（例如 "125.45.245.1"）。
  - 可使用 `computer:port` 语法指定 QM 端口，例如 "125.45.245.1:8177"。
- **password** - 远程计算机上运行宏所需的密码。
  - 这是远程计算机在 QM 选项 -> 网络中设置的密码。
  - 若宏允许无需密码运行，可为 ""。
  - 可加密（在选项 -> 安全中，使用 "net" 作为函数名）。
- **macro** - 远程计算机上的宏或函数名称。
  - 可为 QM 项目路径，例如 "\Mouse\Next" 表示文件夹 "Mouse" 中的宏 "Next"。
- **retval** - 接收宏返回值的 str 变量。宏可返回数字或字符串值。
- **a1 ...** - **macro** 的参数，通过 [function](../Language/IDP_FUNCTION.md) 语句接收。

## 备注

在网络中的其他计算机上启动宏或函数。若使用 **retval**，则等待宏结束。

返回值如下：

| 值 | 描述 |
|----|------|
| 0 | 宏启动成功。若使用 **retval**，宏运行成功，除非被用户终止，此时 **retval** 变量为空或 "0"。 |
| 1 | 未找到计算机。 |
| 2 | 无法连接。可能原因：远程计算机未运行；未连接网络；QM 未运行；QM 未允许其他计算机运行宏（远程计算机的选项 -> 网络 -> 允许... 未勾选）；防火墙问题；指定了不同端口；端口被占用；网络连接问题（尝试禁用/启用或修复）。 |
| 3 | 密码错误，或若 **password** 为 ""，此宏不允许无密码运行。 |
| 4 | 未找到宏。 |
| 5 | 无法启动宏。例如，宏包含错误，或其他宏正在运行。 |
| 6 | 无法发送参数。宏未运行。 |
| 7 | 无法检索返回值。宏运行成功。 |
| 8 | 宏运行时错误。 |

远程计算机上运行的宏的 `_command` 变量包含调用者计算机的 IP 地址。

默认情况下，禁止从其他计算机访问 QM。可在选项 -> 网络中启用。若仅想在其他计算机上运行宏（使用 `net`），无需在本地计算机上启用。

在选项 -> 网络中可查看计算机名称和 IP 地址。在“我的电脑”属性中可更改计算机名称。

两台计算机必须使用相同端口。QM 端口号显示在选项 -> 网络中，默认值为 8177。若与其他应用程序冲突，可更改，建议范围为 5000 到 65000。若远程计算机使用不同端口，可在 **computer** 中指定端口，格式为 `computer:port`，例如 "125.45.245.1:8178"。

虽然 `net` 通常用于局域网，但也可在互联网上使用，需注意防火墙和未知 IP 等问题。

若互联网连接使用防火墙，QM 可能无法从互联网或网络访问。需配置防火墙以允许 QM 端口的传入连接，或在首次启用 QM 网络功能时，在 Windows 安全警报对话框中点击“允许”。

互联网上的计算机 IP 地址与局域网不同。可在选项 -> 网络 -> 计算机信息中查看 IP 地址。IP 可为静态（始终相同）或动态（变化）。

要将本地宏发送到远程计算机，可使用 `NetSendMacro` 函数，在远程计算机上运行 `NewItem` 函数（同 [newitem](../Functions/IDP_NEWITEM.md)）。也可发送和接收文件。见示例。

使用计算机名称时，`net` 可能较慢。若重复调用，建议使用 IP。可使用 `GetIpAddress` 函数获取 IP（较慢，但仅调用一次，之后多次使用 IP 调用 `net`）。

要可视化控制远程计算机，使用远程桌面或其他远程控制软件。

**另见**：[网络设置](../QM_Help/IDH_NETWORK.md)、[共享文件](../QM_Help/IDH_QML.md)、[mac](IDP_MAC.md)、[在计算机间共享文件和文本](http://www.quickmacros.com/forum/viewtopic.php?f=2&t=2068)。

## 示例

```qm
;; 在计算机 John 上运行函数 NetworkMessage，并传递 "Hello!" 作为参数
net "John" "passw555" "NetworkMessage" 0 "Hello!"

;; 函数 NetworkMessage（在计算机 John 上）
function $message
mes message
;; ______________________________________

;; 从另一台计算机获取文件
int r
str s
r=net("123.234.35.1" "pppassw" "net_GetFile" s "$personal$\test.txt")
if(r or !s.len) end "failed"  ;; 远程宏 net_GetFile 未运行或未返回请求的文件
s.setfile("$personal$\test.txt")  ;; 在本地计算机上保存

;; 函数 net_GetFile
function' str $file_
str s.getfile(file_)
ret s
;; ______________________________________

;; 向另一台计算机发送文件
int r
str data.getfile("$personal$\test.txt")
str sr
r=net("123.234.35.1" "pppassw" "net_SetFile" sr "$personal$\test.txt" data)
if(r or sr!="1") end "failed"  ;; 远程宏 net_SetFile 未运行或未返回 1

;; 函数 net_SetFile
function# $file_ str'data
data.setfile(file_)
ret 1
;; ______________________________________

;; 在 Computer3 上发送并运行函数 Function7
str c("Computer3") p("p765") m("Function7")
if(NetSendMacro(c p m)) end "could not send"
if(net(c p m)) end "could not launch"
;; ______________________________________

;; 此宏在多台计算机上升级 QM
str setupfile="$desktop$\quickmac.exe"  ;; QM 安装程序。宏将发送并在每台计算机上运行
str computers="computer1[]computer2[]computer3"  ;; 计算机列表
str password="passw"  ;; 假设所有计算机使用相同密码（选项 -> 网络）
str cmdline="/silent"  ;; 无安装向导，使用上次安装的设置

str c sd.getfile(setupfile)
int r
str sm=
 function str'filedata $cmdline
 str temp="$temp qm$\quickmac.exe"
 filedata.setfile(temp)
 run temp cmdline

foreach c computers
	r=net(c password "NewItem" 0 "NetUpgradeQm" sm "Function" "" "\User\Temp" 17)  ;; 发送接收并运行安装文件的宏
	if(!r) r=net(c password "NetUpgradeQm" 0 sd cmdline)  ;; 若成功，运行该宏
	if(r) out "Cannot upgrade QM on %s (error %i)" c r
	else out "QM upgraded on %s" c
```