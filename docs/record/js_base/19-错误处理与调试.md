# 错误处理与调试

JavaScript 提供了完善的错误处理和调试机制。

## 错误类型

### Error 类型

```javascript
// 基本 Error
try {
  throw new Error('Something went wrong')
} catch (error) {
  console.log(error.name)    // 'Error'
  console.log(error.message) // 'Something went wrong'
  console.log(error.stack)   // 堆栈跟踪
}
```

### 特定错误类型

```javascript
// ReferenceError
try {
  console.log(undefinedVariable)
} catch (error) {
  console.log(error instanceof ReferenceError) // true
}

// TypeError
try {
  null.toString()
} catch (error) {
  console.log(error instanceof TypeError) // true
}

// RangeError
try {
  new Array(-1)
} catch (error) {
  console.log(error instanceof RangeError) // true
}

// SyntaxError
try {
  eval('invalid syntax {{{')
} catch (error) {
  console.log(error instanceof SyntaxError) // true
}

// URIError
try {
  decodeURIComponent('%')
} catch (error) {
  console.log(error instanceof URIError) // true
}
```

### 自定义错误

```javascript
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.name = 'CustomError'
    this.statusCode = statusCode
  }
}

class ValidationError extends CustomError {
  constructor(field, message) {
    super(`Validation failed for ${field}: ${message}`, 400)
    this.name = 'ValidationError'
    this.field = field
  }
}

// 使用自定义错误
function validateUser(user) {
  if (!user.name) {
    throw new ValidationError('name', 'Name is required')
  }
  if (user.age < 18) {
    throw new ValidationError('age', 'Must be 18 or older')
  }
}

try {
  validateUser({ name: '', age: 16 })
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`Field: ${error.field}, Message: ${error.message}`)
  }
}
```

## 错误处理

### try-catch-finally

```javascript
function riskyOperation() {
  try {
    // 可能出错的代码
    if (Math.random() < 0.5) {
      throw new Error('Random error')
    }
    return 'Success'
  } catch (error) {
    // 处理错误
    console.error('Error occurred:', error.message)
    return 'Error handled'
  } finally {
    // 总是执行的代码
    console.log('Cleanup completed')
  }
}
```

### 错误传播

```javascript
function level1() {
  level2()
}

function level2() {
  level3()
}

function level3() {
  throw new Error('Error from level 3')
}

try {
  level1()
} catch (error) {
  console.log('Caught error:', error.message)
  console.log('Stack trace:', error.stack)
}
```

### 异步错误处理

```javascript
// Promise 错误处理
function asyncOperation() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        reject(new Error('Async operation failed'))
      } else {
        resolve('Success')
      }
    }, 1000)
  })
}

// 方法1：then/catch
asyncOperation()
  .then(result => console.log(result))
  .catch(error => console.error('Promise error:', error))

// 方法2：async/await
async function handleAsync() {
  try {
    const result = await asyncOperation()
    console.log(result)
  } catch (error) {
    console.error('Async error:', error)
  }
}
```

## 调试技术

### console 方法

```javascript
// 基本日志
console.log('Basic log')
console.info('Info message')
console.warn('Warning message')
console.error('Error message')

// 格式化输出
console.log('User: %s, Age: %d', 'John', 25)
console.log('Object:', { name: 'John', age: 25 })

// 表格输出
console.table([
  { name: 'John', age: 25 },
  { name: 'Jane', age: 30 }
])

// 分组输出
console.group('User Details')
console.log('Name: John')
console.log('Age: 25')
console.groupEnd()

// 计时
console.time('operation')
setTimeout(() => {
  console.timeEnd('operation')  // 输出执行时间
}, 1000)

// 断言
console.assert(1 + 1 === 2, 'Math is broken')
console.assert(1 + 1 === 3, 'This should fail')
```

### debugger 语句

```javascript
function debugFunction(value) {
  console.log('Entering function with value:', value)

  debugger  // 浏览器会在此处暂停执行

  const result = value * 2
  console.log('Result:', result)

  return result
}
```

### 性能分析

```javascript
// 性能标记
console.time('app-init')

// 应用初始化代码
initializeApp()

console.timeEnd('app-init')

// 性能测量
performance.mark('start')
doSomething()
performance.mark('end')
performance.measure('operation', 'start', 'end')

console.log(performance.getEntriesByName('operation')[0])
```

## 错误监控

### 全局错误处理

```javascript
// 同步错误
window.onerror = function(message, source, lineno, colno, error) {
  console.error('Global error:', message, source, lineno, colno, error)
  // 发送错误报告到服务器
  reportError({
    message,
    source,
    lineno,
    colno,
    stack: error ? error.stack : null
  })
}

// Promise 拒绝处理
window.onunhandledrejection = function(event) {
  console.error('Unhandled promise rejection:', event.reason)
  event.preventDefault()  // 阻止默认处理
}

// 资源加载错误
window.addEventListener('error', (event) => {
  if (event.target !== window) {
    console.error('Resource load error:', event.target.src || event.target.href)
  }
}, true)
```

### 错误报告

```javascript
class ErrorReporter {
  constructor(endpoint) {
    this.endpoint = endpoint
    this.queue = []
    this.flushInterval = setInterval(() => this.flush(), 5000)
  }

  report(error, context = {}) {
    const report = {
      message: error.message,
      stack: error.stack,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      context
    }

    this.queue.push(report)

    // 立即发送严重错误
    if (this.isSevereError(error)) {
      this.flush()
    }
  }

  isSevereError(error) {
    return error.name === 'TypeError' || error.message.includes('undefined')
  }

  async flush() {
    if (this.queue.length === 0) return

    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.queue)
      })
      this.queue = []
    } catch (e) {
      console.error('Failed to send error report:', e)
    }
  }
}

// 使用错误报告器
const reporter = new ErrorReporter('/api/errors')

// 在错误处理中使用
window.onerror = function(message, source, lineno, colno, error) {
  reporter.report(error || new Error(message), {
    source,
    lineno,
    colno
  })
}
```

## 测试和调试工具

### 断言库

```javascript
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed')
  }
}

// 使用断言
function divide(a, b) {
  assert(b !== 0, 'Division by zero')
  assert(typeof a === 'number' && typeof b === 'number', 'Arguments must be numbers')
  return a / b
}
```

### 单元测试框架

```javascript
class TestSuite {
  constructor(name) {
    this.name = name
    this.tests = []
  }

  test(name, fn) {
    this.tests.push({ name, fn })
  }

  async run() {
    console.group(`Running test suite: ${this.name}`)

    let passed = 0
    let failed = 0

    for (let test of this.tests) {
      try {
        await test.fn()
        console.log(`✓ ${test.name}`)
        passed++
      } catch (error) {
        console.error(`✗ ${test.name}: ${error.message}`)
        failed++
      }
    }

    console.log(`\nResults: ${passed} passed, ${failed} failed`)
    console.groupEnd()
  }
}

// 使用测试框架
const suite = new TestSuite('Math functions')

suite.test('Addition', () => {
  assert(1 + 1 === 2, '1 + 1 should equal 2')
})

suite.test('Division by zero', () => {
  try {
    divide(1, 0)
    assert(false, 'Should have thrown an error')
  } catch (error) {
    assert(error.message === 'Division by zero', 'Wrong error message')
  }
})

suite.run()
```

## 总结

错误处理和调试是 JavaScript 开发的重要组成部分：

1. **错误类型**：Error 及其子类（ReferenceError、TypeError 等）
2. **错误处理**：try-catch-finally、异步错误处理
3. **调试技术**：console 方法、debugger 语句、性能分析
4. **错误监控**：全局错误处理、错误报告
5. **测试工具**：断言、单元测试框架

良好的错误处理可以提升应用稳定性和用户体验。
