# JSON

JSON（JavaScript Object Notation）是一种轻量级的数据交换格式。

## JSON 语法

### 基本语法

```javascript
// 对象
const person = {
  "name": "John Doe",
  "age": 30,
  "isStudent": false,
  "hobbies": ["reading", "coding", "gaming"],
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "country": "USA"
  }
}

// 数组
const numbers = [1, 2, 3, 4, 5]
const mixed = [1, "two", true, null, { "key": "value" }]
```

### 值类型

```javascript
// 字符串 - 必须使用双引号
"string value"
"with \"quotes\" and \\backslashes"

// 数字 - 不支持十六进制和八进制
42
3.14
-100
1.23e10

// 布尔值
true
false

// null
null

// 对象和数组
{ "key": "value" }
[1, 2, 3]
```

## JSON 序列化

### JSON.stringify()

```javascript
const obj = {
  name: 'John',
  age: 30,
  hobbies: ['reading', 'coding'],
  address: {
    city: 'New York',
    country: 'USA'
  },
  date: new Date(),
  func: function() { return 'hello' },
  undefined: undefined,
  symbol: Symbol('test')
}

// 基本序列化
const json = JSON.stringify(obj)
console.log(json)
// {"name":"John","age":30,"hobbies":["reading","coding"],"address":{"city":"New York","country":"USA"}}

// 注意：Date、function、undefined、Symbol 会被忽略或转换

// 自定义序列化
const customJson = JSON.stringify(obj, (key, value) => {
  if (key === 'age') return value + 1
  if (key === 'func') return value.toString()
  if (typeof value === 'symbol') return value.toString()
  return value
})

// 格式化输出
const prettyJson = JSON.stringify(obj, null, 2)
console.log(prettyJson)
// {
//   "name": "John",
//   "age": 30,
//   ...
// }

// 指定属性
const partialJson = JSON.stringify(obj, ['name', 'age'])
console.log(partialJson)
// {"name":"John","age":30}
```

### toJSON() 方法

```javascript
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
    this.birthDate = new Date()
  }

  toJSON() {
    return {
      name: this.name,
      age: this.age,
      birthYear: this.birthDate.getFullYear()
    }
  }

  greet() {
    return `Hello, I'm ${this.name}`
  }
}

const person = new Person('Alice', 25)
const json = JSON.stringify(person)
console.log(json)
// {"name":"Alice","age":25,"birthYear":2023}

// Date 对象的 toJSON
const date = new Date()
console.log(JSON.stringify(date))
// "2023-12-07T10:30:00.000Z"
```

## JSON 解析

### JSON.parse()

```javascript
const jsonString = '{"name":"John","age":30,"hobbies":["reading","coding"]}'

// 基本解析
const obj = JSON.parse(jsonString)
console.log(obj.name)    // "John"
console.log(obj.age)     // 30
console.log(obj.hobbies) // ["reading","coding"]

// 自定义解析
const customObj = JSON.parse(jsonString, (key, value) => {
  if (key === 'age') return value * 2
  if (key === 'hobbies' && Array.isArray(value)) {
    return value.map(hobby => hobby.toUpperCase())
  }
  return value
})

console.log(customObj.age)     // 60
console.log(customObj.hobbies) // ["READING","CODING"]
```

### 解析日期字符串

```javascript
// 手动处理日期
const jsonWithDate = '{"name":"John","birthDate":"1993-05-15T00:00:00.000Z"}'

const obj = JSON.parse(jsonWithDate, (key, value) => {
  if (key === 'birthDate') {
    return new Date(value)
  }
  return value
})

console.log(obj.birthDate instanceof Date) // true
console.log(obj.birthDate.getFullYear())   // 1993
```

## 安全考虑

### JSON 注入攻击

```javascript
// 不安全的做法
function unsafeParse(input) {
  return eval('(' + input + ')')
}

// 安全的做法
function safeParse(input) {
  try {
    return JSON.parse(input)
  } catch (e) {
    throw new Error('Invalid JSON')
  }
}

// 验证输入
function validateAndParse(input) {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string')
  }

  if (input.length > 10000) {
    throw new Error('Input too large')
  }

  return JSON.parse(input)
}
```

### 原型污染防护

```javascript
// 检查并防止原型污染
function safeParse(jsonString) {
  const obj = JSON.parse(jsonString)

  // 检查是否包含原型链属性
  function hasPrototypePollution(obj, path = []) {
    if (typeof obj !== 'object' || obj === null) return false

    for (let key in obj) {
      const currentPath = [...path, key]

      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        throw new Error(`Prototype pollution detected at: ${currentPath.join('.')}`)
      }

      if (hasPrototypePollution(obj[key], currentPath)) {
        return true
      }
    }

    return false
  }

  hasPrototypePollution(obj)
  return obj
}
```

## 高级用法

### 深拷贝

```javascript
// 使用 JSON 进行深拷贝
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

const original = {
  name: 'John',
  nested: {
    value: 42,
    array: [1, 2, 3]
  }
}

const copy = deepClone(original)
copy.nested.value = 100

console.log(original.nested.value) // 42 (不受影响)
console.log(copy.nested.value)     // 100
```

### 对象比较

```javascript
// 简单对象比较（不考虑顺序）
function areEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

console.log(areEqual({a:1, b:2}, {b:2, a:1})) // true
console.log(areEqual({a:1, b:2}, {a:1, c:2})) // false

// 更健壮的比较（考虑 undefined 和函数）
function deepEqual(a, b) {
  if (a === b) return true

  if (a == null || b == null) return false

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false
    }
    return true
  }

  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)

    if (keysA.length !== keysB.length) return false

    for (let key of keysA) {
      if (!keysB.includes(key)) return false
      if (!deepEqual(a[key], b[key])) return false
    }

    return true
  }

  return false
}
```

### 存储和传输

```javascript
// localStorage 存储
const userSettings = {
  theme: 'dark',
  language: 'zh-CN',
  notifications: true
}

localStorage.setItem('userSettings', JSON.stringify(userSettings))

// 读取设置
const savedSettings = JSON.parse(localStorage.getItem('userSettings') || '{}')

// AJAX 请求
async function saveUserData(userData) {
  const response = await fetch('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })

  return response.json()
}

// WebSocket 通信
const ws = new WebSocket('ws://example.com')

ws.onmessage = (event) => {
  const data = JSON.parse(event.data)
  console.log('Received:', data)
}

function sendMessage(type, payload) {
  ws.send(JSON.stringify({
    type,
    payload,
    timestamp: Date.now()
  }))
}
```

## JSON Schema 验证

```javascript
// 简单的 JSON Schema 验证器
function validateJSON(data, schema) {
  const errors = []

  function validateValue(value, schema, path = '') {
    // 类型检查
    if (schema.type && typeof value !== schema.type) {
      errors.push(`${path}: Expected ${schema.type}, got ${typeof value}`)
      return
    }

    // 字符串验证
    if (schema.type === 'string') {
      if (schema.minLength && value.length < schema.minLength) {
        errors.push(`${path}: String too short`)
      }
      if (schema.maxLength && value.length > schema.maxLength) {
        errors.push(`${path}: String too long`)
      }
      if (schema.pattern && !new RegExp(schema.pattern).test(value)) {
        errors.push(`${path}: String doesn't match pattern`)
      }
    }

    // 数字验证
    if (schema.type === 'number') {
      if (schema.minimum !== undefined && value < schema.minimum) {
        errors.push(`${path}: Number below minimum`)
      }
      if (schema.maximum !== undefined && value > schema.maximum) {
        errors.push(`${path}: Number above maximum`)
      }
    }

    // 数组验证
    if (schema.type === 'array' && Array.isArray(value)) {
      if (schema.minItems && value.length < schema.minItems) {
        errors.push(`${path}: Array too short`)
      }
      if (schema.maxItems && value.length > schema.maxItems) {
        errors.push(`${path}: Array too long`)
      }
      if (schema.items) {
        value.forEach((item, index) => {
          validateValue(item, schema.items, `${path}[${index}]`)
        })
      }
    }

    // 对象验证
    if (schema.type === 'object' && typeof value === 'object' && !Array.isArray(value)) {
      if (schema.required) {
        for (let prop of schema.required) {
          if (!(prop in value)) {
            errors.push(`${path}: Missing required property ${prop}`)
          }
        }
      }

      if (schema.properties) {
        for (let prop in value) {
          if (schema.properties[prop]) {
            validateValue(value[prop], schema.properties[prop], `${path}.${prop}`)
          }
        }
      }
    }
  }

  validateValue(data, schema, 'root')
  return errors
}

// 使用示例
const userSchema = {
  type: 'object',
  required: ['name', 'email'],
  properties: {
    name: { type: 'string', minLength: 2, maxLength: 50 },
    email: { type: 'string', pattern: '^[^@]+@[^@]+\\.[^@]+$' },
    age: { type: 'number', minimum: 0, maximum: 150 }
  }
}

const user = { name: 'John', email: 'john@example.com', age: 30 }
const errors = validateJSON(user, userSchema)
console.log(errors) // []
```

## 总结

JSON 是现代 Web 开发中最重要的数据交换格式：

1. **语法**：基于 JavaScript 对象字面量的轻量级格式
2. **序列化/解析**：JSON.stringify() 和 JSON.parse()
3. **安全考虑**：防止注入攻击和原型污染
4. **高级用法**：深拷贝、对象比较、数据存储和传输
5. **验证**：JSON Schema 进行数据结构验证

JSON 的简单性和普遍支持使其成为 API 通信的标准格式。
