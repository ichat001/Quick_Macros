# 编译器指令：#out, #warning, #error

## 语法

```qm
#out "text"
#warning "text"
#error "text"
```

## 备注

- **功能**：在编译宏时将 **text** 显示在输出窗口。
- **#out**：仅显示文本。
- **#warning**：将文本显示为警告。
- **#error**：生成编译时错误。

**相关内容**：
- [#if](IDP_DIR_IF.html)

## 示例

```qm
#if EXE
#warning "this function is unavailable in exe"
#else
...
#endif
```