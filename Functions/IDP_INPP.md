# 密码对话框

## 语法

### 语法 1
```
inpp password [text] [caption] [flags] [hwndowner]
```

### 语法 2
```
int inpp(password [text] [caption] [flags] [hwndowner])
```

## 参数
- **password** - 用户需输入的密码，可加密（在 Options -> Security 中，使用 "inpp" 作为函数名）。
- **text** - 密码输入框上方的文本，默认 `""`（"Password:"），支持[链接](../Other/IDP_SYSLINK.html)。
- **caption** - 对话框标题，默认 `""`（"QM - Password"）。
- **flags**：
  | 值 | 描述 |
  |----|------|
  | 1 | 密码不区分大小写。 |
- **hwndowner** - （QM 2.2.1）拥有者窗口句柄，对话框显示在该窗口上方，若同线程则禁用拥有者窗口，默认 0。

## 备注
- 显示密码输入对话框。若输入的密码错误或点击“Cancel”，宏将终止。
- 若使用语法 2（作为函数），不终止宏，密码正确返回 1，错误或取消返回 0。
- **提示**：可在 Options -> Security 中加密宏。

## 示例
```cpp
// 要求输入密码，若非 "55hH7pKJ" 则终止宏
inpp "55hH7pKJ"

// 要求输入密码（加密为 "[*E12073E7509E09F804*]"），若非 "bnfg" 则抛出错误
if(!inpp("[*E12073E7509E09F804*]" "" "" 1)) end "密码错误"
```