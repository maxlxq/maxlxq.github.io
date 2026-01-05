# 附录 B 严格模式

严格模式（strict mode）是 ECMAScript 5 引入的一种限制性 JavaScript 变体。

## 启用严格模式

```javascript
// 脚本级严格模式
'use strict'

function strictFunction() {
  // 函数内也是严格模式
}

// 或
function strictFunction() {
  'use strict'
  // 只有这个函数是严格模式
}
```

## 严格模式的变化

### 变量声明

```javascript
// 非严格模式：自动创建全局变量
function nonStrict() {
  undeclaredVariable = 'global'  // 创建全局变量
}

// 严格模式：抛出 ReferenceError
function strict() {
  'use strict'
  undeclaredVariable = 'global'  // ReferenceError
}
```

### this 绑定

```javascript
// 非严格模式：this 绑定到全局对象
function nonStrict() {
  return this  // window 或 global
}

// 严格模式：this 为 undefined
function strict() {
  'use strict'
  return this  // undefined
}
```

### 函数参数

```javascript
// 非严格模式：允许重复参数名
function nonStrict(a, a, b) {
  return a + b  // 最后一个 a 的值
}

// 严格模式：SyntaxError
function strict(a, a, b) {  // SyntaxError
  'use strict'
  return a + b
}
```

### eval 和 arguments

```javascript
// 严格模式下 eval 有自己的作用域
'use strict'
eval('var x = 1')
console.log(x)  // ReferenceError

// arguments 对象不可变
function strict(args) {
  'use strict'
  arguments[0] = 'modified'  // 无效
  return args === arguments[0]  // false
}
```

### 其他限制

```javascript
'use strict'

// 不能删除变量
var x = 1
delete x  // SyntaxError

// 不能删除不可配置属性
delete Object.prototype  // TypeError

// 对象字面量不能有重复属性
const obj = { a: 1, a: 2 }  // SyntaxError

// 不能使用 with 语句
with (Math) {  // SyntaxError
  console.log(PI)
}

// 不能给原始值添加属性
true.property = 'value'  // TypeError
```

## 严格模式的优势

1. **消除语法错误**：防止意外创建全局变量
2. **提高性能**：引擎可以进行更多优化
3. **安全**：限制危险操作
4. **未来兼容**：为未来 ECMAScript 版本做准备

## 最佳实践

```javascript
// 在文件顶部启用严格模式
'use strict'

// 或在函数级别启用
function myFunction() {
  'use strict'
  // 函数代码
}

// 避免在已有代码中全局启用
// 应该逐步迁移或在函数级别启用

// 检查是否在严格模式
function isStrictMode() {
  return (function() { return !this })()
}

console.log(isStrictMode())  // true in strict mode
```
