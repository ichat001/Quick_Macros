# 加密、解密

## 语法1 - BlowFish

```
s.encrypt(1 src key [flags])
s.decrypt(1 src key)
```

## 语法2 - MD5

```
s.encrypt(2 [src] [src2] [flags])
```

## 语法3 - Base64

```
s.encrypt(4 [src] [""] [flags])
s.decrypt(4 [src])
```

## 语法4 - Hex

```
s.encrypt(8 [src] [""] [flags])
s.decrypt(8 [src])
```

## 语法5 - 解密密码

```
s.encrypt(16 password function [flags])
s.decrypt(16 password key [flags])
```

## 语法6 - LZO 压缩

```
s.encrypt(32 [src])
s.decrypt(32 [src])
```

## 参数

- **s** - str 变量，接收结果。
- **1,2,4,8,16,32** - 加密算法。还可以是 1|4 (BlowFish+Base64)、1|8 (BlowFish+Hex)、2|4 (MD5+Base64)、2|8 (MD5+Hex)、32|4 (LZO+Base64) 和 32|8 (LZO+Hex)。
- **src** - 要加密或解密的字符串。如果 **src** 是 str 变量，可以包含二进制数据。默认值：**s** 本身。
- **key** - 加密密钥，长度为 1 到 56 个字符的字符串。
- **src2** - 与 **src** 一起进行哈希的第二个字符串，可选。
- **password** - 要加密或解密的密码。
- **function** - 传递密码的函数名称，字符串。
- **[flags](../Other/IDP_FLAGS.md)** - 见备注。

## 备注

使用标准算法加密或解密字符串或二进制数据。不同算法用于不同目的，可在互联网上找到更多信息。

---

### 语法1 - BlowFish (算法 1, 1|4, 1|8)

使用 BlowFish 算法加密/解密 **src**。

BlowFish 用于安全目的加密数据。

使用加密密钥。解密时需使用与加密时相同的密钥。

如果 **src** 或 **key** 无效且无法加密或解密，会报错。

默认结果为二进制。如果算法为 1|4 或 1|8，则转换为 Base64 或 Hex 格式的文本。

---

### 语法2 - MD5 (算法 2, 2|4, 2|8)

`encrypt` 使用 MD5 算法生成 **src** 的哈希（“摘要”或“校验和”）。

MD5 用于检查两个字符串（或文件、密码等数据）是否相同，而无需直接比较字符串。比较它们的 MD5 哈希值即可。哈希值为 16 字节，不同数据生成不同哈希值，且无法解密。

其目的与 [Crc32](../User/IDP_QMDLL.md#Crc32) 类似，Crc32 生成 4 字节值。MD5 更可靠，速度相似。

默认结果为二进制。如果算法为 2|4 或 2|8，则转换为 Base64 或 Hex 格式的文本。

**flags**：
| 值 | 描述 |
|----|------|
| 0x100 (QM 2.3.2) | **src** 是文件。如果无法打开文件会报错，可调用 GetLastError 或 _s.dllerror 获取错误信息。 |

---

### 语法3 - Base64 (算法 4)

使用 Base64 算法编码/解码 **src**。

Base64 用于将二进制数据转换为文本。

编码时，生成约 **src** 长度 4/3 的字符串，包含字母数字和其他几个字符。

**flags**（适用于 `encrypt`）：
| 值 | 描述 |
|----|------|
| 1  | 不添加填充（默认：如果编码数据不是 4 的倍数，添加 1 到 3 个 = 字符）。 |
| 2  | 不添加换行符（默认：如果编码数据足够长，添加换行符）。 |

这些标志也适用于涉及 Base64 的算法：1|4、2|4 和 32|4。

---

### 语法4 - Hex (算法 8)

使用 Hex 算法编码/解码 **src**。

Hex 用于将二进制数据转换为文本。比 Base64 快，但结果更大。

编码时，生成 **src** 长度 * 2 的字符串，包含十六进制字符（0-9、A-F）。

**flags**（适用于 `encrypt`）：
| 值 | 描述 |
|----|------|
| 1  | 添加空格分隔字节，如 "AA BB CC DD"。 |
| 2, 4, 8, 16, 32, 64 | 添加换行符，数字表示每行的字节数。 |

---

### 语法5 - 解密密码 (算法 16)

`decrypt` 解密密码。

加密密码的格式为 "[*XXXXXXXXXXXXXXXXXX*]"。也可以是包含一个或多个加密密码的字符串，例如 "pwd=[*0123456789ABCDEF*];"。

如果 **password** 不包含加密密码，则简单将 **password** 赋值给 **s**。但如果使用标志 1，则会生成错误。不生成其他错误。

密码可在 [选项->安全](../QM_Help/IDH_SETT_SECURITY.md) 中加密，或使用算法 16 的 `encrypt` 加密。[了解更多](../QM_Help/IDH_FUNCTIONTIPS.md)。

语法5 在 exe 中不可用，使用会引发运行时错误。

---

### 语法6 (QM 2.3.2) - LZO 压缩 (算法 32, 32|4, 32|8)

使用 LZO 压缩/解压缩（[http://www.oberhumer.com/opensource/lzo/](http://www.oberhumer.com/opensource/lzo/)）。

压缩速度快，解压缩极快，但压缩率不高。适用于未压缩的图像（bmp、ico）。

默认结果为二进制。如果算法为 1|4 或 1|8，则转换为 Base64 或 Hex 格式的文本。

---

另见：[str.escape](IDP_S_ESCAPE.md)、[str.ansi](IDP_S_UNICODE.md)、[inpp](../Functions/IDP_INPP.md)、[Crc32](../User/IDP_QMDLL.md#Crc32)。

## 示例

```cpp
// 设置密码。以 MD5 加密形式保存到注册表。
str s
if(!inp(s "New password:" "" "*")) ret
s.encrypt(10)
rset s "Password11" "\Test"
// ____________________________________

// 请求之前保存在注册表中的 MD5 加密密码。
str ss sss
if(rget(ss "Password11" "\Test"))
    if(!inp(sss "Password:" "" "*")) ret
    sss.encrypt(10)
    if(sss!=ss) mes- "Password is incorrect" "" "!"
mes "OK"
```