# 从完整路径获取路径或文件名

## 语法

```
s.getpath([file] [append])
s.getfilename([file] [ext])
```

## 参数

- **s** - str 变量。
- **file** - 文件或文件夹的完整路径。默认值：**s**。
- **append** - 要追加的字符串。使用 "" 移除 "\"。
- **ext** - 如果非零，获取包含扩展名的文件名。

## 备注

- `getpath` 从 **file** 中提取路径部分。
- `getfilename` 从 **file** 中提取文件名部分。

QM 2.3.4：支持文件流，如 "c:\a\b.txt:stream1:$DATA"。

### 提示
许多 Windows API 函数可用于处理路径和 URL，例如 `PathFindExtension`。详见 [MSDN Library](http://www.google.com/search?q=Shell Path Handling Functions)。

## 示例

```cpp
str s1.getpath("c:\folder\test.txt")
str s2.getfilename("c:\folder\test.txt")
str s3.getfilename("c:\folder\test.txt" 1)
 // 现在 s1 是 "c:\folder\", s2 是 "test", s3 是 "test.txt"
```