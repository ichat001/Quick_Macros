# 打开网页

## 语法

```qm
web url [flags] [window] [url2] [geturl2] [gethwnd]
```

## 参数

- **url** - 网页地址。可为浏览器地址栏可接受的任意字符串（如 "http://..."、"javascript:..." 等），或以下特殊值：
  - "Back"、"Forward"、"Home"、"Refresh"、"Search"、"Stop"、"Quit"
  - 本地文件或 Internet 快捷方式
  - 若为 ""，不打开新页面，但对当前页面应用其他功能（如等待）。
- [**flags**](../Other/IDP_FLAGS.md)：

| 标志 | 描述 |
|------|------|
| 1 | 等待网页加载完成且浏览器不忙碌。 |
| 2 | 在现有窗口打开，若未找到兼容窗口则报错。无此标志且未找到窗口时，启动新浏览器实例。若指定 **window**，此标志无效（窗口必须存在）。 |
| 4 | 在新弹出窗口打开。 |
| 8 | 在新的 Internet Explorer 实例打开。使用 "" 打开 "about:blank"。 |
| 12 (4\|8) | QM 2.2.0：在新标签页打开（Internet Explorer 7 及以上）。 |
| 16 | **url2**（最终 URL）为完整地址或包含 [通配符](../Functions/IDP_MATCHW.md) (*?)。 |
| 32 | 获取 "Internet Explorer_Server" 子窗口句柄，而非主窗口句柄。 |
| 64 | QM 2.2.0：若打开新窗口或标签页，不激活它。 |
| 128 | QM 2.2.0：在 Vista 上，若需打开新 IE 窗口，关闭保护模式。若 QM 无法判断是否需关闭保护模式（如使用 `web("" 8)`），使用此标志。在 [exe](../QM_Help/IDH_MAKEEXE.md) 以管理员或低权限运行时，此标志被忽略，IE 以与 exe 相同的权限启动。 |
| [高位字](../Other/IDP_HIWORD.md) | 最大等待时间（秒）。默认：无限。 |

- [**window**](../Other/IDP_WINDOWEXPRESSION.md) - 在指定窗口打开网页。若省略或为 ""，使用默认浏览器。若默认浏览器非 Internet Explorer 但兼容 IE（包含 "Internet Explorer_Server" 控件），需通过 [RtOptions](../User/IDP_QMDLL.md#RtOptions) 指定其窗口类。
- **url2** - 最终 URL 必须包含此字符串。若设置标志 1，等待浏览器不忙碌后检查 URL，若不包含 **url2** 则报错。若未设置标志 1，即使浏览器不忙碌也等待 **url2**。可用 "*" 表示最终 URL 必须与 **url** 相同。URL 从文档获取，某些情况下（如错误页面）可能与浏览器 URL 不同。默认：""（任意）。
- **geturl2** - 接收最终 URL 的 `str` 变量。默认：0。
- **gethwnd** - 接收主窗口句柄的 `int` 变量。若设置标志 32，则接收 "Internet Explorer_Server" 子窗口句柄。默认：0。

## 备注

打开网页，直接从浏览器当前页面导航。比 [run](IDP_RUN.md) 提供更多控制：
- 可等待网页加载完成
- 检查/获取最终 URL
- 在当前页面运行 "javascript:..."
- 导航 Back 等
- 在特定窗口打开
- 始终在当前窗口导航
- 始终在新窗口打开
- 访问浏览器对象模型

仅适用于 Internet Explorer 及包含 "Internet Explorer_Server" 控件的窗口。若仅使用 **url**，网页在默认浏览器中打开（无论是否为 IE）。某些非 IE 的兼容浏览器可能不支持特殊字符串（如 "Quit"）。

作为函数时，`web` 返回 `IDispatch` 接口，可赋给 `SHDocVw.WebBrowser`（或 `IWebBrowser2`）类型的变量。

速度取决于 [spe](IDP_SPE.md)。

### 其他打开网页的方式

1. `run url` - 在默认浏览器打开网页。
2. `run browser url` - 在指定浏览器打开网页。
3. 使用 [htm](../Functions/IDP_HTM.md) 或 [acc](../Functions/IDP_ACC.md) 查找网页中的链接或按钮并程序化点击。
4. 使用 `WebBrowser` 或 `IHTMLWindow2` 接口的函数，如 `WebBrowser` 的 `Navigate` 可在特定框架中打开网页。
5. 使用 `System\Functions\Internet` 文件夹中的函数下载网页而不打开。

### 注意事项

在 Windows Vista 及以上，若 IE 保护模式开启，某些功能可能失效，尤其在 exe 中。若使用 `_create` 创建 `WebBrowser` 对象，可能打开两个 IE7 实例等，建议使用 `web`。在不同区域的 URL 导航时，可能启动另一 IE7 实例。IE8 表现更好，标签页与主 IE 框架窗口可能属于不同进程。

**提示**：拖放链接或 Internet 快捷方式到宏文本或工具栏可插入 `web` 函数。

## 示例

```qm
;; 打开网页并等待加载完成
web "http://msdn.microsoft.com/en-us/library/default.aspx" 1

;; 获取当前网页的 URL
SHDocVw.WebBrowser b=web("")
out b.LocationURL
```