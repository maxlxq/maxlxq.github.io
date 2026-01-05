# 附录 C JavaScript 库和框架

JavaScript 生态系统中有众多优秀的库和框架。

## 核心库

### jQuery

```javascript
// DOM 操作
$('#element').addClass('active')
$('#element').fadeIn()

// AJAX 请求
$.ajax({
  url: '/api/data',
  method: 'GET',
  success: function(data) {
    console.log(data)
  },
  error: function(xhr, status, error) {
    console.error(error)
  }
})

// 事件处理
$('#button').on('click', function() {
  $(this).toggleClass('clicked')
})
```

### Lodash

```javascript
// 数组操作
const numbers = [1, 2, 3, 4, 5]
const doubled = _.map(numbers, n => n * 2)
const evens = _.filter(numbers, n => n % 2 === 0)

// 对象操作
const user = { name: 'John', age: 30, city: 'NYC' }
const picked = _.pick(user, ['name', 'age'])
const cloned = _.cloneDeep(user)

// 函数式编程
const add = (a, b) => a + b
const addFive = _.partial(add, 5)
console.log(addFive(3))  // 8
```

## 前端框架

### React

```jsx
import React, { useState, useEffect } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `Count: ${count}`
  }, [count])

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}

export default Counter
```

### Vue.js

```javascript
// 单文件组件
<template>
  <div>
    <p>{{ message }}</p>
    <button @click="reverseMessage">Reverse</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Vue!'
    }
  },
  methods: {
    reverseMessage() {
      this.message = this.message.split('').reverse().join('')
    }
  }
}
</script>

<style scoped>
p {
  color: blue;
}
</style>
```

### Angular

```typescript
import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>{{ title }}</h1>
      <input [(ngModel)]="name" placeholder="Enter name">
      <p>Hello {{ name }}!</p>
    </div>
  `,
  styles: [`
    h1 { color: red; }
  `]
})
export class AppComponent {
  title = 'My Angular App'
  name = ''
}
```

## 构建工具

### Webpack

```javascript
// webpack.config.js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    port: 3000
  }
}
```

### Vite

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

## 测试框架

### Jest

```javascript
// sum.test.js
const sum = require('./sum')

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

test('object assignment', () => {
  const data = { one: 1 }
  data.two = 2
  expect(data).toEqual({ one: 1, two: 2 })
})

describe('sum module', () => {
  beforeEach(() => {
    // setup
  })

  afterEach(() => {
    // cleanup
  })

  test('works with negative numbers', () => {
    expect(sum(-1, 1)).toBe(0)
  })
})
```

### Cypress

```javascript
// cypress/integration/sample_spec.js
describe('My First Test', () => {
  it('Visits the app', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Welcome').should('be.visible')
  })

  it('Clicks a button', () => {
    cy.get('.btn-primary').click()
    cy.url().should('include', '/dashboard')
  })

  it('Fills out a form', () => {
    cy.get('input[name="email"]').type('user@example.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('form').submit()
    cy.contains('Login successful').should('be.visible')
  })
})
```

## 状态管理

### Redux

```javascript
// action types
const ADD_TODO = 'ADD_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'

// actions
function addTodo(text) {
  return { type: ADD_TODO, text }
}

function toggleTodo(id) {
  return { type: TOGGLE_TODO, id }
}

// reducer
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { id: Date.now(), text: action.text, completed: false }]
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      )
    default:
      return state
  }
}

// store
import { createStore } from 'redux'
const store = createStore(todos)

// usage
store.dispatch(addTodo('Learn Redux'))
store.dispatch(toggleTodo(1))
console.log(store.getState())
```

## 实用工具库

### Moment.js (日期处理)

```javascript
const moment = require('moment')

// 基本使用
const now = moment()
console.log(now.format('YYYY-MM-DD HH:mm:ss'))

// 日期计算
const tomorrow = moment().add(1, 'days')
const lastWeek = moment().subtract(1, 'weeks')

// 相对时间
console.log(moment('2020-01-01').fromNow())  // "3 years ago"

// 验证日期
console.log(moment('2020-02-30').isValid())  // false
```

### Axios (HTTP 客户端)

```javascript
import axios from 'axios'

// 基本请求
axios.get('/api/users')
  .then(response => console.log(response.data))
  .catch(error => console.error(error))

// POST 请求
axios.post('/api/users', {
  name: 'John',
  email: 'john@example.com'
})
.then(response => console.log(response.data))

// 全局配置
axios.defaults.baseURL = 'https://api.example.com'
axios.defaults.headers.common['Authorization'] = 'Bearer token'

// 拦截器
axios.interceptors.request.use(config => {
  console.log('Request:', config.url)
  return config
})

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      // 处理未授权
    }
    return Promise.reject(error)
  }
)
```

## 选择指南

- **小型项目**: 原生 JavaScript + 实用工具库
- **中型项目**: Vue.js 或 React + 状态管理
- **大型项目**: Angular + 完整的构建工具链
- **快速原型**: Vite + Vue/React
- **企业应用**: React + TypeScript + 完整测试套件

选择框架时考虑团队经验、项目需求和维护成本。
