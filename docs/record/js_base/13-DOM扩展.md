# DOM 扩展

DOM 扩展是对核心 DOM API 的增强，主要包括选择符 API、元素遍历 API，以及 HTML5 对 DOM 的扩展。

## Selectors API

Selectors API 为基于 CSS 选择符获取 DOM 元素定义了几个方法。

### querySelector() 方法

```javascript
// 获取匹配的第一个元素
const myDiv = document.querySelector('#myDiv')
const firstParagraph = document.querySelector('p')
const specialItem = document.querySelector('.item.special')
const nestedDiv = document.querySelector('div > .nested')

// 在特定元素范围内查找
const container = document.getElementById('container')
const firstChild = container.querySelector('div:first-child')
```

### querySelectorAll() 方法

```javascript
// 获取匹配的所有元素
const allDivs = document.querySelectorAll('div')
const errorBoxes = document.querySelectorAll('.error')
const checkboxes = document.querySelectorAll('input[type="checkbox"]')

// 返回 NodeList（不是数组）
console.log(allDivs instanceof NodeList)  // true
console.log(Array.isArray(allDivs))       // false

// 转换为数组
const divArray = Array.from(allDivs)
const divArray2 = [...allDivs]

// 在特定元素范围内查找
const container = document.getElementById('container')
const allItems = container.querySelectorAll('.item')
```

### matches() 方法

```javascript
// 检查元素是否匹配选择符
const div = document.getElementById('myDiv')

console.log(div.matches('#myDiv'))         // true
console.log(div.matches('.container'))     // true/false
console.log(div.matches('div:first-child')) // true/false

// 浏览器兼容性处理
function matchesSelector(element, selector) {
  if (element.matches) {
    return element.matches(selector)
  } else if (element.matchesSelector) {
    return element.matchesSelector(selector)
  } else if (element.webkitMatchesSelector) {
    return element.webkitMatchesSelector(selector)
  } else if (element.msMatchesSelector) {
    return element.msMatchesSelector(selector)
  } else if (element.mozMatchesSelector) {
    return element.mozMatchesSelector(selector)
  }
  return false
}
```

## Element Traversal API

Element Traversal API 为 DOM 元素添加了额外的属性，可以在忽略空白文本节点的情况下遍历 DOM 元素。

### 子元素属性

```javascript
const parent = document.getElementById('parent')

// 传统方式（包含所有节点）
console.log(parent.childNodes.length)      // 包含文本节点
console.log(parent.firstChild)             // 可能返回文本节点
console.log(parent.lastChild)              // 可能返回文本节点

// Element Traversal API（只包含元素节点）
console.log(parent.children.length)        // 只包含元素节点
console.log(parent.childElementCount)      // 子元素数量
console.log(parent.firstElementChild)      // 第一个子元素
console.log(parent.lastElementChild)       // 最后一个子元素
```

### 兄弟元素属性

```javascript
const element = document.getElementById('myElement')

// 传统方式
console.log(element.nextSibling)           // 可能返回文本节点
console.log(element.previousSibling)       // 可能返回文本节点

// Element Traversal API
console.log(element.nextElementSibling)    // 下一个兄弟元素
console.log(element.previousElementSibling) // 上一个兄弟元素
```

### 实用函数

```javascript
// 获取所有兄弟元素
function getSiblings(element) {
  const siblings = []
  let sibling = element.parentNode.firstElementChild

  while (sibling) {
    if (sibling !== element) {
      siblings.push(sibling)
    }
    sibling = sibling.nextElementSibling
  }

  return siblings
}

// 获取元素索引
function getElementIndex(element) {
  let index = 0
  let sibling = element.previousElementSibling

  while (sibling) {
    index++
    sibling = sibling.previousElementSibling
  }

  return index
}

// 深度优先遍历所有子元素
function traverseElements(element, callback) {
  callback(element)

  let child = element.firstElementChild
  while (child) {
    traverseElements(child, callback)
    child = child.nextElementSibling
  }
}
```

## HTML5 扩展

HTML5 对 DOM 进行了大量扩展，提供了新的 API 和属性。

### getElementsByClassName() 方法

```javascript
// 获取具有指定类名的所有元素
const elements = document.getElementsByClassName('important')
const multipleClasses = document.getElementsByClassName('important error')

// 在特定元素范围内查找
const container = document.getElementById('container')
const items = container.getElementsByClassName('item')

// 返回 HTMLCollection
console.log(elements instanceof HTMLCollection) // true

// 实时更新
const newElement = document.createElement('div')
newElement.className = 'important'
document.body.appendChild(newElement)

console.log(elements.length) // 长度会自动更新
```

### classList 属性

```javascript
const div = document.getElementById('myDiv')

// 添加类
div.classList.add('active')
div.classList.add('visible', 'animated')

// 移除类
div.classList.remove('hidden')
div.classList.remove('error', 'warning')

// 切换类
div.classList.toggle('active')        // 如果有就移除，没有就添加
div.classList.toggle('hidden', false) // 强制移除

// 检查类是否存在
console.log(div.classList.contains('active')) // true

// 替换类
div.classList.replace('old-class', 'new-class')

// 获取类名
console.log(div.classList.item(0))     // 第一个类名
console.log(div.classList.length)      // 类数量

// 遍历类名
for (let className of div.classList) {
  console.log(className)
}
```

### 焦点管理

```javascript
// 检查元素是否获得焦点
const button = document.getElementById('myButton')
console.log(document.activeElement === button)

// 主动聚焦
button.focus()

// 失去焦点
button.blur()

// 检查是否可以聚焦
console.log(button.tabIndex)  // -1 表示不可聚焦

// HTML5 新增属性
button.autofocus = true  // 页面加载时自动聚焦
```

### HTMLDocument 扩展

```javascript
// readyState 属性
console.log(document.readyState) // 'loading' | 'interactive' | 'complete'

// readystatechange 事件
document.addEventListener('readystatechange', event => {
  console.log(document.readyState)
})

// 兼容性检查
function isDocumentReady() {
  return document.readyState === 'complete' ||
         (document.readyState !== 'loading' && !document.documentElement.doScroll)
}
```

### 字符集属性

```javascript
// 字符集相关属性
console.log(document.charset)        // 文档字符集
console.log(document.defaultCharset) // 默认字符集

// 设置字符集
document.charset = 'UTF-8'

// 检测字符集支持
function isCharsetSupported(charset) {
  try {
    return !!new TextDecoder(charset)
  } catch (e) {
    return false
  }
}
```

### 自定义数据属性

```javascript
// HTML: <div id="myDiv" data-app-id="12345" data-role="admin"></div>
const div = document.getElementById('myDiv')

// 传统方式
console.log(div.getAttribute('data-app-id'))  // '12345'

// HTML5 dataset API
console.log(div.dataset.appId)    // '12345'
console.log(div.dataset.role)     // 'admin'

// 设置自定义数据
div.dataset.appId = '67890'
div.dataset.userRole = 'moderator'

// 遍历所有数据属性
for (let key in div.dataset) {
  console.log(`${key}: ${div.dataset[key]}`)
}

// 转换为 JSON
const data = JSON.parse(div.dataset.config || '{}')
```

### 插入标记

```javascript
const div = document.getElementById('myDiv')

// innerHTML
div.innerHTML = '<p>This is <strong>HTML</strong> content</p>'

// outerHTML
div.outerHTML = '<section><h1>Title</h1></section>'

// insertAdjacentHTML
div.insertAdjacentHTML('beforebegin', '<p>Before</p>')
div.insertAdjacentHTML('afterbegin', '<p>After begin</p>')
div.insertAdjacentHTML('beforeend', '<p>Before end</p>')
div.insertAdjacentHTML('afterend', '<p>After</p>')

// insertAdjacentText
div.insertAdjacentText('beforeend', 'Plain text')

// insertAdjacentElement
const newElement = document.createElement('span')
newElement.textContent = 'New element'
div.insertAdjacentElement('beforeend', newElement)
```

### scrollIntoView() 方法

```javascript
const element = document.getElementById('target')

// 滚动元素到视口
element.scrollIntoView()

// 平滑滚动
element.scrollIntoView({
  behavior: 'smooth',
  block: 'start',    // 'start', 'center', 'end', 'nearest'
  inline: 'nearest'  // 'start', 'center', 'end', 'nearest'
})
```

## 专有扩展

### children 属性

```javascript
const parent = document.getElementById('parent')

// children 属性（所有浏览器支持）
console.log(parent.children)        // HTMLCollection
console.log(parent.children.length) // 子元素数量

// 转换为数组
const childrenArray = Array.from(parent.children)

// 过滤特定类型的子元素
const divChildren = childrenArray.filter(child => child.tagName === 'DIV')
```

### contains() 方法

```javascript
const parent = document.getElementById('parent')
const child = document.getElementById('child')

// 检查包含关系
console.log(parent.contains(child))  // true

// 比较运算符（DOM Level 3）
console.log(parent.compareDocumentPosition(child) & 16) // 16 = CONTAINS

// 检查相等性
console.log(parent.isEqualNode(child))     // 结构和内容都相同
console.log(parent.isSameNode(child))      // 同一个节点
```

### 插入文本

```javascript
const div = document.getElementById('myDiv')

// innerText（IE 专有，后成为标准）
div.innerText = 'This is <strong>text</strong>'

// textContent（标准）
div.textContent = 'This is <strong>text</strong>'

// 区别
// innerText: 'This is text'（解析 HTML 实体）
// textContent: 'This is <strong>text</strong>'（保留 HTML 标签）

// outerText（移除元素并替换为文本）
div.outerText = 'Replacement text'
```

## 性能优化

### 批量 DOM 操作

```javascript
// 使用 DocumentFragment
function createList(items) {
  const fragment = document.createDocumentFragment()

  items.forEach(item => {
    const li = document.createElement('li')
    li.textContent = item
    fragment.appendChild(li)
  })

  return fragment
}

const list = createList(['Item 1', 'Item 2', 'Item 3'])
document.getElementById('container').appendChild(list)
```

### 选择符优化

```javascript
// 优化选择符性能
// 1. ID 选择符最快
document.getElementById('myId')

// 2. 标签选择符快
document.getElementsByTagName('div')

// 3. 类选择符较慢
document.getElementsByClassName('myClass')

// 4. querySelector 解析成本高
document.querySelector('.container .item')

// 优化策略
function getElements(selector) {
  // 优先使用最快的查找方式
  if (selector.startsWith('#')) {
    return [document.getElementById(selector.slice(1))].filter(Boolean)
  }
  if (!selector.includes(' ') && !selector.includes('>') && !selector.includes('+')) {
    if (selector.startsWith('.')) {
      return Array.from(document.getElementsByClassName(selector.slice(1)))
    }
    if (/^[a-zA-Z]+$/.test(selector)) {
      return Array.from(document.getElementsByTagName(selector))
    }
  }
  // 复杂选择符使用 querySelectorAll
  return Array.from(document.querySelectorAll(selector))
}
```

## 总结

DOM 扩展为 DOM 操作提供了更便捷和高效的方法：

1. **Selectors API**：提供了 querySelector() 和 querySelectorAll() 等现代选择符方法
2. **Element Traversal API**：简化了元素遍历，忽略了空白文本节点
3. **HTML5 扩展**：包括 classList、焦点管理、自定义数据属性等新功能
4. **专有扩展**：浏览器特定的便捷方法

合理使用这些扩展可以显著提升代码的可读性和性能。