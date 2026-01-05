# DOM

DOM（Document Object Model）文档对象模型，是 HTML 和 XML 文档的编程接口。它将文档表示为节点树，提供了操作文档结构和内容的方法。

## 节点层次

DOM 将文档表示为节点树，每个节点都是文档的一部分。

### 节点类型

DOM 中定义了 12 种节点类型，主要包括：

| 节点类型常量 | 值 | 说明 |
| --- | --- | --- |
| Node.ELEMENT_NODE | 1 | 元素节点 |
| Node.ATTRIBUTE_NODE | 2 | 属性节点 |
| Node.TEXT_NODE | 3 | 文本节点 |
| Node.CDATA_SECTION_NODE | 4 | CDATA 节点 |
| Node.ENTITY_REFERENCE_NODE | 5 | 实体引用节点 |
| Node.ENTITY_NODE | 6 | 实体节点 |
| Node.PROCESSING_INSTRUCTION_NODE | 7 | 处理指令节点 |
| Node.COMMENT_NODE | 8 | 注释节点 |
| Node.DOCUMENT_NODE | 9 | 文档节点 |
| Node.DOCUMENT_TYPE_NODE | 10 | 文档类型节点 |
| Node.DOCUMENT_FRAGMENT_NODE | 11 | 文档片段节点 |
| Node.NOTATION_NODE | 12 | 记号节点 |

### 节点关系

```javascript
// 获取节点关系
const element = document.getElementById('myElement')

// 子节点
console.log(element.childNodes)          // 所有子节点
console.log(element.children)            // 仅元素子节点
console.log(element.firstChild)          // 第一个子节点
console.log(element.lastChild)           // 最后一个子节点

// 兄弟节点
console.log(element.nextSibling)         // 下一个兄弟节点
console.log(element.previousSibling)     // 上一个兄弟节点

// 父节点
console.log(element.parentNode)          // 父节点
console.log(element.parentElement)       // 父元素节点

// 所有祖先节点
function getAncestors(element) {
  const ancestors = []
  let current = element.parentNode
  while (current) {
    ancestors.push(current)
    current = current.parentNode
  }
  return ancestors
}
```

### 节点操作

```javascript
// 创建节点
const newElement = document.createElement('div')
const newText = document.createTextNode('Hello World')
const newComment = document.createComment('This is a comment')

// 插入节点
const parent = document.getElementById('parent')
const reference = document.getElementById('reference')

// 追加到末尾
parent.appendChild(newElement)

// 插入到指定位置
parent.insertBefore(newElement, reference)

// 替换节点
parent.replaceChild(newElement, reference)

// 删除节点
parent.removeChild(reference)

// 克隆节点
const clonedElement = element.cloneNode(true)    // 深克隆
const shallowClone = element.cloneNode(false)    // 浅克隆
```

## Document 类型

Document 类型表示整个 HTML 页面，提供了操作文档的方法。

### 文档子节点

```javascript
// 文档元素
console.log(document.documentElement)    // <html>
console.log(document.head)               // <head>
console.log(document.body)               // <body>

// 文档类型
console.log(document.doctype)            // <!DOCTYPE html>

// 文档信息
console.log(document.title)              // 页面标题
console.log(document.URL)                // 完整 URL
console.log(document.domain)             // 域名
console.log(document.referrer)           // 来源页面 URL
```

### 查找元素

```javascript
// 通过 ID 获取元素
const element = document.getElementById('myId')

// 通过标签名获取元素
const divs = document.getElementsByTagName('div')
const allElements = document.getElementsByTagName('*')

// 通过类名获取元素
const items = document.getElementsByClassName('item')

// 通过 name 属性获取元素
const radios = document.getElementsByName('gender')

// querySelector 和 querySelectorAll
const firstDiv = document.querySelector('div')
const allDivs = document.querySelectorAll('div')
const specialDiv = document.querySelector('div.special')
const nestedDiv = document.querySelector('div > .item')
```

### 特殊集合

```javascript
// 文档的特殊集合
console.log(document.anchors)        // 包含所有带 name 属性的 <a> 元素
console.log(document.applets)        // 包含所有 <applet> 元素（已废弃）
console.log(document.forms)          // 包含所有 <form> 元素
console.log(document.images)         // 包含所有 <img> 元素
console.log(document.links)          // 包含所有带 href 属性的 <a> 元素
```

### 文档写入

```javascript
// document.write() - 只应在页面加载期间使用
document.write('<h1>Hello World</h1>')
document.write('<p>This is a paragraph</p>')

// document.writeln() - 添加换行符
document.writeln('Line 1')
document.writeln('Line 2')

// innerHTML - 更常用和安全的方法
const div = document.getElementById('content')
div.innerHTML = '<h1>Hello World</h1><p>This is a paragraph</p>'

// outerHTML - 包含元素本身
div.outerHTML = '<section><h1>Hello World</h1></section>'

// textContent - 只设置文本内容
div.textContent = 'Hello World'

// innerText - 类似 textContent，但会考虑样式
div.innerText = 'Hello World'
```

## Element 类型

Element 类型表示 HTML 或 XML 元素，提供了操作元素属性和内容的方法。

### HTML 元素

所有 HTML 元素都继承自 HTMLElement 类型。

```javascript
const div = document.createElement('div')

// 基本属性
console.log(div.tagName)        // 'DIV'
console.log(div.nodeName)       // 'DIV'
console.log(div.nodeType)       // 1 (ELEMENT_NODE)

// 元素特有属性
div.id = 'myDiv'
div.className = 'container'
div.title = 'My Div'
div.lang = 'zh-CN'
div.dir = 'ltr'

// 样式操作
div.style.color = 'red'
div.style.backgroundColor = 'blue'
div.style.cssText = 'color: red; background: blue;'

// 获取计算样式
const computedStyle = window.getComputedStyle(div)
console.log(computedStyle.color)
```

### 获取属性

```javascript
const img = document.getElementById('myImage')

// 使用点号语法
console.log(img.src)
console.log(img.alt)

// 使用 getAttribute()
console.log(img.getAttribute('src'))
console.log(img.getAttribute('alt'))

// 自定义属性
img.setAttribute('data-custom', 'value')
console.log(img.getAttribute('data-custom'))
console.log(img.dataset.custom)    // 'value' (HTML5 dataset API)
```

### 设置属性

```javascript
const input = document.createElement('input')

// 设置属性
input.setAttribute('type', 'text')
input.setAttribute('name', 'username')
input.setAttribute('value', 'default')

// 移除属性
input.removeAttribute('value')

// 检查属性是否存在
console.log(input.hasAttribute('type'))    // true
console.log(input.hasAttribute('disabled')) // false
```

### classList 属性

HTML5 新增的 classList 属性提供了便捷的类操作方法。

```javascript
const div = document.getElementById('myDiv')

// 添加类
div.classList.add('active')
div.classList.add('visible', 'animated')

// 移除类
div.classList.remove('hidden')
div.classList.remove('error', 'warning')

// 切换类
div.classList.toggle('active')      // 如果有就移除，没有就添加
div.classList.toggle('hidden', false) // 强制移除

// 检查类是否存在
console.log(div.classList.contains('active')) // true

// 替换类
div.classList.replace('old-class', 'new-class')

// 获取类名
console.log(div.classList.item(0))   // 第一个类名
console.log(div.classList.length)    // 类数量
```

## 文本节点

文本节点由 Text 类型表示，包含纯文本内容。

### 创建文本节点

```javascript
// 创建文本节点
const textNode = document.createTextNode('Hello World')

// 添加到元素
const div = document.createElement('div')
div.appendChild(textNode)

// 合并相邻文本节点
textNode.appendData('!!!')           // 合并到现有节点
textNode.insertData(5, ' beautiful ') // 在位置5插入
textNode.deleteData(5, 11)           // 删除11个字符从位置5开始
textNode.replaceData(0, 5, 'Hi')    // 替换前5个字符

// 分割文本节点
const newNode = textNode.splitText(5) // 从位置5分割
console.log(textNode.nodeValue)       // 'Hi Wo'
console.log(newNode.nodeValue)        // 'rld!!!'
```

### 文本节点规范化

```javascript
// 规范化文本节点 - 合并相邻的文本节点
const container = document.getElementById('container')
container.normalize()

// 检查是否规范化
function isNormalized(element) {
  for (let child of element.childNodes) {
    if (child.nodeType === Node.TEXT_NODE) {
      // 检查是否有相邻的文本节点
      let sibling = child.nextSibling
      while (sibling) {
        if (sibling.nodeType === Node.TEXT_NODE) {
          return false
        }
        sibling = sibling.nextSibling
      }
    }
  }
  return true
}
```

## Comment 类型

Comment 类型表示 HTML 和 XML 注释。

```javascript
// 创建注释节点
const comment = document.createComment('This is a comment')
document.body.appendChild(comment)

// 获取注释内容
console.log(comment.nodeValue)  // 'This is a comment'
console.log(comment.data)       // 'This is a comment'

// 修改注释内容
comment.data = 'Updated comment'

// 查找注释节点
function findComments(element) {
  const comments = []
  function traverse(node) {
    if (node.nodeType === Node.COMMENT_NODE) {
      comments.push(node)
    }
    for (let child of node.childNodes) {
      traverse(child)
    }
  }
  traverse(element)
  return comments
}
```

## DocumentFragment 类型

DocumentFragment 是轻量级的文档，可以包含和操作节点，但不会影响文档树。

```javascript
// 创建文档片段
const fragment = document.createDocumentFragment()

// 添加节点到片段
for (let i = 0; i < 10; i++) {
  const li = document.createElement('li')
  li.textContent = `Item ${i + 1}`
  fragment.appendChild(li)
}

// 一次性添加到文档
const ul = document.getElementById('myList')
ul.appendChild(fragment)  // 只触发一次重绘

// 文档片段的其他用途
function createList(items) {
  const fragment = document.createDocumentFragment()
  const ul = document.createElement('ul')

  items.forEach(item => {
    const li = document.createElement('li')
    li.textContent = item
    ul.appendChild(li)
  })

  fragment.appendChild(ul)
  return fragment
}
```

## DOM 操作性能优化

### 批量 DOM 操作

```javascript
// 不推荐：多次操作 DOM
const list = document.getElementById('list')
for (let i = 0; i < 100; i++) {
  const li = document.createElement('li')
  li.textContent = `Item ${i}`
  list.appendChild(li)  // 每次都会触发重绘
}

// 推荐：使用文档片段
const list = document.getElementById('list')
const fragment = document.createDocumentFragment()

for (let i = 0; i < 100; i++) {
  const li = document.createElement('li')
  li.textContent = `Item ${i}`
  fragment.appendChild(li)
}

list.appendChild(fragment)  // 只触发一次重绘
```

### innerHTML vs DOM 方法

```javascript
// innerHTML 通常更快
const html = '<ul>' +
  Array.from({length: 100}, (_, i) => `<li>Item ${i}</li>`).join('') +
  '</ul>'

document.getElementById('container').innerHTML = html

// 但要注意 XSS 安全问题
function safeSetInnerHTML(element, html) {
  const template = document.createElement('template')
  template.innerHTML = html
  element.appendChild(template.content.cloneNode(true))
}
```

### 事件委托优化

```javascript
// 不推荐：为每个元素添加事件监听器
const buttons = document.querySelectorAll('button')
buttons.forEach(button => {
  button.addEventListener('click', handleClick)
})

// 推荐：事件委托
document.addEventListener('click', event => {
  if (event.target.matches('button')) {
    handleClick(event)
  }
})
```

## 总结

DOM 是 JavaScript 操作 HTML 和 XML 文档的核心 API：

1. **节点层次**：DOM 将文档表示为节点树，提供了丰富的节点操作方法
2. **Document 类型**：提供了操作整个文档的方法，包括查找元素和文档写入
3. **Element 类型**：提供了操作 HTML 元素的方法，包括属性和样式操作
4. **文本节点和注释**：处理文档中的文本内容和注释
5. **DocumentFragment**：提供高效的批量 DOM 操作

掌握 DOM 操作是前端开发的基础，合理使用可以显著提升页面性能。