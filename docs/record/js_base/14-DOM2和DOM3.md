# DOM2 和 DOM3

DOM2 和 DOM3 对 DOM 进行了重大扩展，包括样式操作、遍历和范围等高级功能。

## 样式操作

DOM2 Styles 为操作元素样式提供了 API。

### 访问元素样式

```javascript
const div = document.getElementById('myDiv')

// 内联样式（只返回 style 属性中设置的样式）
console.log(div.style.color)           // 'red'
console.log(div.style.backgroundColor) // 'blue'

// 计算样式（包含所有应用的样式）
const computedStyle = window.getComputedStyle(div)
console.log(computedStyle.color)           // 'rgb(255, 0, 0)'
console.log(computedStyle.backgroundColor) // 'rgb(0, 0, 255)'

// 伪元素样式
const beforeStyle = window.getComputedStyle(div, ':before')
console.log(beforeStyle.content)

// 浏览器兼容性处理
function getStyle(element, property) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(element)[property]
  } else {
    return element.currentStyle[property]
  }
}
```

### 操作样式

```javascript
const div = document.getElementById('myDiv')

// 设置单个样式
div.style.color = 'red'
div.style.backgroundColor = 'blue'
div.style.border = '1px solid black'

// 设置多个样式
div.style.cssText = 'color: red; background: blue; border: 1px solid black'

// 使用 CSS 自定义属性
div.style.setProperty('--primary-color', 'green')
div.style.setProperty('--font-size', '16px')

// 获取属性值
console.log(div.style.getPropertyValue('--primary-color')) // 'green'
console.log(div.style.getPropertyPriority('--primary-color')) // '' 或 'important'

// 移除属性
div.style.removeProperty('--primary-color')
```

### 样式属性名转换

```javascript
// CSS 属性名转换为驼峰命名
function camelize(property) {
  return property.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
}

// 驼峰命名转换为 CSS 属性名
function hyphenate(property) {
  return property.replace(/[A-Z]/g, match => '-' + match.toLowerCase())
}

// 使用示例
div.style[camelize('background-color')] = 'red'
div.style[hyphenate('borderRadius')] = '5px'
```

## 元素尺寸

DOM API 提供了获取元素尺寸的方法。

### 偏移尺寸

```javascript
const div = document.getElementById('myDiv')

// 元素在屏幕上占用的空间
console.log(div.offsetWidth)   // 边框+内边距+内容宽度
console.log(div.offsetHeight)  // 边框+内边距+内容高度
console.log(div.offsetLeft)    // 元素左边框到包含元素左边框的距离
console.log(div.offsetTop)     // 元素上边框到包含元素上边框的距离

// 获取相对文档的偏移
function getElementOffset(element) {
  let left = 0
  let top = 0

  while (element) {
    left += element.offsetLeft
    top += element.offsetTop
    element = element.offsetParent
  }

  return { left, top }
}
```

### 客户端尺寸

```javascript
// 元素内部空间（不包含边框）
console.log(div.clientWidth)   // 内边距+内容宽度
console.log(div.clientHeight)  // 内边距+内容高度

// 获取视口尺寸
console.log(window.innerWidth)
console.log(window.innerHeight)

// 兼容性处理
function getViewportSize() {
  if (window.innerWidth !== undefined) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  } else if (document.compatMode === 'CSS1Compat') {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  } else {
    return {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    }
  }
}
```

### 滚动尺寸

```javascript
// 元素滚动信息
console.log(div.scrollWidth)   // 内容总宽度（可能超过 clientWidth）
console.log(div.scrollHeight)  // 内容总高度（可能超过 clientHeight）
console.log(div.scrollLeft)    // 水平滚动距离
console.log(div.scrollTop)     // 垂直滚动距离

// 检测元素是否滚动到底部
function isScrolledToBottom(element) {
  return element.scrollTop + element.clientHeight >= element.scrollHeight
}

// 平滑滚动到顶部
function scrollToTop(element) {
  element.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// 获取滚动条宽度
function getScrollbarWidth() {
  const div = document.createElement('div')
  div.style.width = '100px'
  div.style.height = '100px'
  div.style.overflow = 'scroll'
  div.style.position = 'absolute'
  div.style.top = '-9999px'

  document.body.appendChild(div)
  const scrollbarWidth = div.offsetWidth - div.clientWidth
  document.body.removeChild(div)

  return scrollbarWidth
}
```

## 遍历

DOM2 Traversal and Range API 定义了遍历 DOM 的方法。

### NodeIterator

```javascript
// 创建 NodeIterator
const iterator = document.createNodeIterator(
  document.body,           // 根节点
  NodeFilter.SHOW_ELEMENT, // 过滤器
  null,                    // 自定义过滤函数
  false                    // 是否扩展实体引用
)

// 遍历节点
let node = iterator.nextNode()
while (node) {
  console.log(node.tagName)
  node = iterator.nextNode()
}

// 反向遍历
let prevNode = iterator.previousNode()
while (prevNode) {
  console.log(prevNode.tagName)
  prevNode = iterator.previousNode()
}

// 自定义过滤器
function ElementFilter(node) {
  return node.tagName === 'DIV'
    ? NodeFilter.FILTER_ACCEPT
    : NodeFilter.FILTER_SKIP
}

const filteredIterator = document.createNodeIterator(
  document.body,
  NodeFilter.SHOW_ELEMENT,
  ElementFilter,
  false
)
```

### TreeWalker

```javascript
// 创建 TreeWalker
const walker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_ELEMENT,
  null,
  false
)

// 当前节点
console.log(walker.currentNode)

// 移动到第一个子节点
walker.firstChild()

// 移动到下一个兄弟节点
walker.nextSibling()

// 移动到上一个兄弟节点
walker.previousSibling()

// 移动到父节点
walker.parentNode()

// 深度优先遍历
function traverseWithWalker(root) {
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_ELEMENT,
    null,
    false
  )

  let node = walker.currentNode
  do {
    console.log(node.tagName)
    node = walker.nextNode()
  } while (node)
}
```

## 范围

DOM2 Range API 定义了在文档中选择 DOM 结构的方法。

### 创建范围

```javascript
// 创建范围
const range = document.createRange()

// 设置范围边界
const startElement = document.getElementById('start')
const endElement = document.getElementById('end')

// 方法1：使用节点和偏移量
range.setStart(startElement, 0)
range.setEnd(endElement, endElement.childNodes.length)

// 方法2：选择整个节点
range.selectNode(startElement)
range.selectNodeContents(startElement)

// 方法3：使用现有选择
const selection = window.getSelection()
if (selection.rangeCount > 0) {
  const existingRange = selection.getRangeAt(0)
  // 使用 existingRange
}
```

### 操作范围

```javascript
// 范围信息
console.log(range.startContainer)  // 开始节点
console.log(range.startOffset)     // 开始偏移量
console.log(range.endContainer)    // 结束节点
console.log(range.endOffset)       // 结束偏移量
console.log(range.collapsed)       // 是否折叠（开始和结束位置相同）

// 克隆范围
const clonedRange = range.cloneRange()

// 比较范围位置
console.log(range.compareBoundaryPoints(Range.START_TO_START, otherRange))

// 提取内容
const fragment = range.extractContents()  // 移除并返回内容
const clonedFragment = range.cloneContents() // 克隆但不移除

// 包围内容
const span = document.createElement('span')
span.style.backgroundColor = 'yellow'
range.surroundContents(span)

// 插入内容
range.insertNode(document.createTextNode('inserted text'))

// 删除内容
range.deleteContents()

// 折叠范围
range.collapse(true)  // 折叠到开始位置
range.collapse(false) // 折叠到结束位置
```

### 范围在表单控件中的应用

```javascript
// 文本输入框中的范围选择
const input = document.getElementById('textInput')

// 设置选择范围
input.setSelectionRange(2, 5)  // 选择第3到第6个字符

// 获取选择范围
console.log(input.selectionStart)  // 选择开始位置
console.log(input.selectionEnd)   // 选择结束位置

// 选择全部文本
function selectAllText(element) {
  if (element.select) {
    element.select() // 表单控件方法
  } else if (window.getSelection) {
    const range = document.createRange()
    range.selectNodeContents(element)
    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
  }
}
```

## DOM3 新增内容

### 验证 API

```javascript
const input = document.getElementById('emailInput')

// 检查有效性
console.log(input.validity.valid)          // 是否有效
console.log(input.validity.valueMissing)   // 是否为空
console.log(input.validity.typeMismatch)   // 类型不匹配
console.log(input.validity.tooShort)       // 太短
console.log(input.validity.tooLong)        // 太长

// 自定义验证消息
input.setCustomValidity('This email is already taken')

// 检查表单有效性
const form = document.getElementById('myForm')
console.log(form.checkValidity())

// 实时验证
input.addEventListener('input', () => {
  if (input.validity.typeMismatch) {
    input.setCustomValidity('Please enter a valid email')
  } else {
    input.setCustomValidity('')
  }
})
```

### 焦点管理

```javascript
// 检查元素是否可以聚焦
console.log(element.tabIndex)  // -1 表示不可聚焦

// 设置焦点
element.focus()

// 失去焦点
element.blur()

// 检查当前焦点元素
console.log(document.activeElement)

// HTML5 新增属性
element.autofocus = true  // 自动聚焦

// 焦点事件
element.addEventListener('focus', event => {
  console.log('Element focused')
})

element.addEventListener('blur', event => {
  console.log('Element blurred')
})

element.addEventListener('focusin', event => {
  console.log('Focus entering')
})

element.addEventListener('focusout', event => {
  console.log('Focus leaving')
})
```

### 文本选择 API

```javascript
// 获取选择对象
const selection = window.getSelection()

// 检查是否有选择
console.log(selection.rangeCount)

// 获取选择范围
if (selection.rangeCount > 0) {
  const range = selection.getRangeAt(0)
  console.log(range.toString())  // 选中的文本
}

// 选择特定范围
function selectText(element, start, end) {
  const range = document.createRange()
  range.setStart(element.firstChild, start)
  range.setEnd(element.firstChild, end)

  const selection = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)
}

// 清除选择
selection.removeAllRanges()

// 选择整个元素内容
function selectElementContents(element) {
  const range = document.createRange()
  range.selectNodeContents(element)

  const selection = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)
}
```

### 鼠标事件扩展

```javascript
// 获取鼠标位置（相对于视口）
element.addEventListener('click', event => {
  console.log(event.clientX, event.clientY)  // 视口坐标
  console.log(event.pageX, event.pageY)     // 页面坐标
  console.log(event.screenX, event.screenY) // 屏幕坐标
})

// 获取鼠标按键信息
element.addEventListener('mousedown', event => {
  switch (event.button) {
    case 0:
      console.log('Left button')
      break
    case 1:
      console.log('Middle button')
      break
    case 2:
      console.log('Right button')
      break
  }
})

// 滚轮事件
element.addEventListener('wheel', event => {
  console.log(event.deltaX, event.deltaY, event.deltaZ)
  console.log(event.deltaMode)  // 0: 像素, 1: 行, 2: 页
})
```

## 性能优化

### 样式操作优化

```javascript
// 避免频繁访问 computedStyle
function getMultipleStyles(element) {
  const computed = window.getComputedStyle(element)
  return {
    color: computed.color,
    backgroundColor: computed.backgroundColor,
    fontSize: computed.fontSize
  }
}

// 使用类切换而不是直接修改样式
function toggleHighlight(element) {
  element.classList.toggle('highlight')  // 推荐
  // element.style.backgroundColor = 'yellow'  // 不推荐
}
```

### 遍历优化

```javascript
// 使用现代遍历方法
const elements = document.querySelectorAll('.item')

// 传统方式
for (let i = 0; i < elements.length; i++) {
  processElement(elements[i])
}

// 现代方式
elements.forEach(processElement)

// 或使用 for...of
for (let element of elements) {
  processElement(element)
}
```

### 范围操作优化

```javascript
// 批量 DOM 操作使用范围
function wrapWordsInSpans(textElement) {
  const words = textElement.textContent.split(' ')
  const fragment = document.createDocumentFragment()

  words.forEach(word => {
    const span = document.createElement('span')
    span.textContent = word + ' '
    span.className = 'word'
    fragment.appendChild(span)
  })

  textElement.innerHTML = ''
  textElement.appendChild(fragment)
}
```

## 总结

DOM2 和 DOM3 为 DOM 操作提供了强大的扩展功能：

1. **样式操作**：getComputedStyle()、样式属性操作等
2. **元素尺寸**：offset、client、scroll 尺寸获取
3. **遍历 API**：NodeIterator 和 TreeWalker
4. **范围 API**：精确的 DOM 范围选择和操作
5. **DOM3 新增**：验证 API、焦点管理、文本选择等

这些高级 API 为复杂的 DOM 操作提供了便利，同时也需要注意性能优化。