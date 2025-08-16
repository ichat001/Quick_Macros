# `tok` 和基于指针的数组

函数 [tok](IDP_TOK.md) 用于分割字符串并将令牌（字符串的子部分）存储到数组 **arr** 中。**arr** 可以是安全数组（`ARRAY(str)` 或 `ARRAY(lpstr)`）或 [基于指针的数组](IDH_POINTERS.md)。使用安全数组更简单，而使用基于指针的数组使 `tok` 运行更快。

## 说明

- **arr** 可以是 `lpstr` 数组（最快）或 `str` 数组：
  - 如果是 `lpstr` 数组，`tok` 将令牌的指针（指向 **string** 内的位置）存储到数组中。
  - 如果是 `str` 数组，`tok` 将令牌的副本存储到数组中。
- 使用基于指针的数组时，`tok` 不知道数组的元素数量，因此 **n** 必须小于或等于数组的元素数。如果所需令牌数量未知，建议使用安全数组。
- 如果 **n** 为负数，`tok` 填充 **-n** 个数组元素，但会解析整个 **string**，返回的令牌数可能超过 **-n**。

数组可以通过多种方式创建，例如：

1. **安全数组**：
   ```qm
   ARRAY(str) arr.create(50)
   tok somestring &arr[0] 50
   ```

2. **声明 n 个局部变量**：
   ```qm
   str s0 s1 s2 s3
   tok somestring &s0 4 " "
   ```

3. **定义包含嵌入数组的变量类型**：
   ```qm
   type STRARRAY50 str's[50]
   LPSTRARRAY50 a
   tok somestring &a 50
   ```

也可以使用内存分配函数创建数组。

## 示例

### 示例 1

```qm
str s = "one two three"
ARRAY(str) arr.create(20)
int nt = tok(s &arr[0] arr.len)
for(int'i 0 nt) out arr[i]
;; 输出：
;; one
;; two
;; three
```

### 示例 2

```qm
type TOK50 $s[50] ~ss[50]
TOK50 t
str s = "func1(57 func2(a b) hoo) ''Some string'' r.top"
int nt = tok(s &t 10 "" 1|4|8 &t.ss)
for int'i 0 nt
    out "'%s' '%s'" t.s[i] t.ss[i]
;; 输出：
;; 'func1' '('
;; '57 func2(a b) hoo' ') "'
;; 'Some string' '" '
;; 'r' '.'
;; 'top' ''
```