# 虚拟键代码

以下表格列出了 Windows 虚拟键代码（Virtual-Key Codes），可用于 [key](IDP_KEY.html) 函数、Windows API 函数以及键盘触发器。表格包括常量名称、十六进制值、QM 键代码及对应的键或鼠标按钮。

| 常量名称 | 值 | QM 键代码 | 键或鼠标按钮 |
|----------|------|----------|--------------|
| VK_LBUTTON | 0x01 | - | 鼠标左键 |
| VK_RBUTTON | 0x02 | - | 鼠标右键 |
| VK_CANCEL | 0x03 | - | Ctrl+Pause (Control-break) |
| VK_MBUTTON | 0x04 | - | 鼠标中键 |
| VK_XBUTTON1 | 0x05 | - | 鼠标 X1 键 |
| VK_XBUTTON2 | 0x06 | - | 鼠标 X2 键 |
| - | 0x07 | - | 未定义 |
| VK_BACK | 0x08 | B | 退格键 (Backspace) |
| VK_TAB | 0x09 | T | Tab 键 |
| - | 0x0A-0x0B | - | 保留 |
| VK_CLEAR | 0x0C | - | Clear 键 (Shift+Num5) |
| VK_RETURN | 0x0D | Y | 回车键 (Enter) |
| - | 0x0E-0x0F | - | 未定义 |
| VK_SHIFT | 0x10 | S | Shift 键 |
| VK_CONTROL | 0x11 | C | Ctrl 键 |
| VK_MENU | 0x12 | A | Alt 键 |
| VK_PAUSE | 0x13 | G | Pause 键 |
| VK_CAPITAL | 0x14 | K | Caps Lock 键 |
| VK_KANA, VK_HANGUEL, VK_HANGUL | 0x15 | - | IME Kana/Hanguel/Hangul 模式 |
| - | 0x16 | - | 未定义 |
| VK_JUNJA | 0x17 | - | IME Junja 模式 |
| VK_FINAL | 0x18 | - | IME Final 模式 |
| VK_HANJA, VK_KANJI | 0x19 | - | IME Hanja/Kanji 模式 |
| - | 0x1A | - | 未定义 |
| VK_ESCAPE | 0x1B | Z | Esc 键 |
| VK_CONVERT | 0x1C | - | IME 转换 |
| VK_NONCONVERT | 0x1D | - | IME 非转换 |
| VK_ACCEPT | 0x1E | - | IME 接受 |
| VK_MODECHANGE | 0x1F | - | IME 模式切换请求 |
| VK_SPACE | 0x20 | V | 空格键 |
| VK_PRIOR | 0x21 | P | Page Up 键 |
| VK_NEXT | 0x22 | Q | Page Down 键 |
| VK_END | 0x23 | E | End 键 |
| VK_HOME | 0x24 | H | Home 键 |
| VK_LEFT | 0x25 | L | 左箭头键 |
| VK_UP | 0x26 | U | 上箭头键 |
| VK_RIGHT | 0x27 | R | 右箭头键 |
| VK_DOWN | 0x28 | D | 下箭头键 |
| VK_SELECT | 0x29 | - | Select 键 |
| VK_PRINT | 0x2A | - | Print 键 |
| VK_EXECUTE | 0x2B | - | Execute 键 |
| VK_SNAPSHOT | 0x2C | - | Print Screen 键 |
| VK_INSERT | 0x2D | I | Insert 键 |
| VK_DELETE | 0x2E | X | Delete 键 |
| VK_HELP | 0x2F | - | Help 键 |
| - | 0x30-0x39 | 0-9 | 数字键 0-9 |
| - | 0x3A-0x40 | - | 未定义 |
| - | 0x41-0x5A | a-z | 字母键 A-Z |
| VK_LWIN | 0x5B | W | 左 Windows 键 |
| VK_RWIN | 0x5C | - | 右 Windows 键 |
| VK_APPS | 0x5D | M | 应用程序键 (Context Menu) |
| - | 0x5E | - | 保留 |
| VK_SLEEP | 0x5F | - | 电脑睡眠键 |
| VK_NUMPAD0 | 0x60 | N0 | 数字小键盘 0 |
| VK_NUMPAD1 | 0x61 | N1 | 数字小键盘 1 |
| VK_NUMPAD2 | 0x62 | N2 | 数字小键盘 2 |
| VK_NUMPAD3 | 0x63 | N3 | 数字小键盘 3 |
| VK_NUMPAD4 | 0x64 | N4 | 数字小键盘 4 |
| VK_NUMPAD5 | 0x65 | N5 | 数字小键盘 5 |
| VK_NUMPAD6 | 0x66 | N6 | 数字小键盘 6 |
| VK_NUMPAD7 | 0x67 | N7 | 数字小键盘 7 |
| VK_NUMPAD8 | 0x68 | N8 | 数字小键盘 8 |
| VK_NUMPAD9 | 0x69 | N9 | 数字小键盘 9 |
| VK_MULTIPLY | 0x6A | N* | 数字小键盘 * 键 |
| VK_ADD | 0x6B | N+ | 数字小键盘 + 键 |
| VK_SEPARATOR | 0x6C | - | 数字小键盘 分隔符键 |
| VK_SUBTRACT | 0x6D | N- | 数字小键盘 - 键 |
| VK_DECIMAL | 0x6E | N. | 数字小键盘 . 键 |
| VK_DIVIDE | 0x6F | N/ | 数字小键盘 / 键 |
| VK_F1 | 0x70 | F1 | F1 键 |
| VK_F2 | 0x71 | F2 | F2 键 |
| VK_F3 | 0x72 | F3 | F3 键 |
| VK_F4 | 0x73 | F4 | F4 键 |
| VK_F5 | 0x74 | F5 | F5 键 |
| VK_F6 | 0x75 | F6 | F6 键 |
| VK_F7 | 0x76 | F7 | F7 键 |
| VK_F8 | 0x77 | F8 | F8 键 |
| VK_F9 | 0x78 | F9 | F9 键 |
| VK_F10 | 0x79 | F10 | F10 键 |
| VK_F11 | 0x7A | F11 | F11 键 |
| VK_F12 | 0x7B | F12 | F12 键 |
| VK_F13 | 0x7C | F13 | F13 键 |
| VK_F14 | 0x7D | F14 | F14 键 |
| VK_F15 | 0x7E | F15 | F15 键 |
| VK_F16 | 0x7F | F16 | F16 键 |
| VK_F17 | 0x80 | F17 | F17 键 |
| VK_F18 | 0x81 | F18 | F18 键 |
| VK_F19 | 0x82 | F19 | F19 键 |
| VK_F20 | 0x83 | F20 | F20 键 |
| VK_F21 | 0x84 | F21 | F21 键 |
| VK_F22 | 0x85 | F22 | F22 键 |
| VK_F23 | 0x86 | F23 | F23 键 |
| VK_F24 | 0x87 | F24 | F24 键 |
| - | 0x88-0x8F | - | 未分配 |
| VK_NUMLOCK | 0x90 | O | Num Lock 键 |
| VK_SCROLL | 0x91 | J | Scroll Lock 键 |
| - | 0x92-0x96 | - | OEM 特定 |
| - | 0x97-0x9F | - | 未分配 |
| VK_LSHIFT | 0xA0 | - | 左 Shift 键 |
| VK_RSHIFT | 0xA1 | - | 右 Shift 键 |
| VK_LCONTROL | 0xA2 | - | 左 Ctrl 键 |
| VK_RCONTROL | 0xA3 | - | 右 Ctrl 键 |
| VK_LMENU | 0xA4 | - | 左 Alt 键 |
| VK_RMENU | 0xA5 | - | 右 Alt 键 |
| VK_BROWSER_BACK | 0xA6 | - | 浏览器后退键 |
| VK_BROWSER_FORWARD | 0xA7 | - | 浏览器前进键 |
| VK_BROWSER_REFRESH | 0xA8 | - | 浏览器刷新键 |
| VK_BROWSER_STOP | 0xA9 | - | 浏览器停止键 |
| VK_BROWSER_SEARCH | 0xAA | - | 浏览器搜索键 |
| VK_BROWSER_FAVORITES | 0xAB | - | 浏览器收藏键 |
| VK_BROWSER_HOME | 0xAC | - | 浏览器主页键 |
| VK_VOLUME_MUTE | 0xAD | - | 音量静音键 |
| VK_VOLUME_DOWN | 0xAE | - | 音量减小键 |
| VK_VOLUME_UP | 0xAF | - | 音量增大键 |
| VK_MEDIA_NEXT_TRACK | 0xB0 | - | 下一曲键 |
| VK_MEDIA_PREV_TRACK | 0xB1 | - | 上一曲键 |
| VK_MEDIA_STOP | 0xB2 | - | 停止媒体键 |
| VK_MEDIA_PLAY_PAUSE | 0xB3 | - | 播放/暂停媒体键 |
| VK_LAUNCH_MAIL | 0xB4 | - | 启动邮件键 |
| VK_LAUNCH_MEDIA_SELECT | 0xB5 | - | 选择媒体键 |
| VK_LAUNCH_APP1 | 0xB6 | - | 启动应用程序 1 键 |
| VK_LAUNCH_APP2 | 0xB7 | - | 启动应用程序 2 键 |
| - | 0xB8-0xB9 | - | 保留 |
| VK_OEM_1 | 0xBA | : | 杂项字符，US 标准键盘为 `;:` 键 |
| VK_OEM_PLUS | 0xBB | + 或 = | + 键（任意国家/地区） |
| VK_OEM_COMMA | 0xBC | , 或 < | , 键（任意国家/地区） |
| VK_OEM_MINUS | 0xBD | - 或 _ | - 键（任意国家/地区） |
| VK_OEM_PERIOD | 0xBE | . 或 > | . 键（任意国家/地区） |
| VK_OEM_2 | 0xBF | / 或 ? | 杂项字符，US 标准键盘为 `/?` 键 |
| VK_OEM_3 | 0xC0 | ` 或 ~ | 杂项字符，US 标准键盘为 `` `~ `` 键 |
| - | 0xC1-0xD7 | - | 保留 |
| - | 0xD8-0xDA | - | 未分配 |
| VK_OEM_4 | 0xDB | [ | 杂项字符，US 标准键盘为 `[{` 键 |
| VK_OEM_5 | 0xDC | \ 或 | | 杂项字符，US 标准键盘为 `\|` 键 |
| VK_OEM_6 | 0xDD | ] | 杂项字符，US 标准键盘为 `]}` 键 |
| VK_OEM_7 | 0xDE | ' | 杂项字符，US 标准键盘为单引号/双引号键 |
| VK_OEM_8 | 0xDF | - | 杂项字符，依键盘而定 |
| - | 0xE0 | - | 保留 |
| - | 0xE1 | - | OEM 特定 |
| VK_OEM_102 | 0xE2 | - | RT 102 键键盘的角括号或反斜杠键 |
| - | 0xE3-0xE4 | - | OEM 特定 |
| VK_PROCESSKEY | 0xE5 | - | IME 处理键 |
| - | 0xE6 | - | OEM 特定 |
| VK_PACKET | 0xE7 | - | 用于传递 Unicode 字符，模拟按键 |
| - | 0xE8 | - | 未分配 |
| - | 0xE9-0xF5 | - | OEM 特定 |
| VK_ATTN | 0xF6 | - | Attn 键 |
| VK_CRSEL | 0xF7 | - | CrSel 键 |
| VK_EXSEL | 0xF8 | - | ExSel 键 |
| VK_EREOF | 0xF9 | - | Erase EOF 键 |
| VK_PLAY | 0xFA | - | Play 键 |
| VK_ZOOM | 0xFB | - | Zoom 键 |
| VK_NONAME | 0xFC | - | 保留供未来使用 |
| VK_PA1 | 0xFD | - | PA1 键 |
| VK_OEM_CLEAR | 0xFE | - | Clear 键 |

## 列说明
1. **常量名称**：可在 [key](IDP_KEY.html) 函数中使用，例如 `key (VK_TAB)`。
2. **值**：十六进制格式，可在 `key` 函数中使用，例如 `key (0x9)`。
3. **QM 键代码**：QM 特定的键代码，可在 `key` 函数中使用，例如 `key T`。
4. **键或鼠标按钮**：对应的键盘按键或鼠标按钮。

## 备注
- 这些常量和值也可用于 Windows API 函数。
- 字母数字键的虚拟键代码与对应大写字符的 [字符代码](IDP_ASCII.html) 匹配。例如，`'A'` 是 A 键的虚拟键代码。
- 相关函数：[key](IDP_KEY.html)、[QmKeyCodeFromVK](IDP_QMDLL.html#QmKeyCodeFromVK)、[QmKeyCodeToVK](IDP_QMDLL.html#QmKeyCodeToVK)。