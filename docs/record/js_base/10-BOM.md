
# BOM

BOM（Browser Object Model）浏览器对象模型，提供了与浏览器窗口进行交互的对象。BOM 的核心是 window 对象，表示浏览器的实例。

## window 对象

window 对象在浏览器中有两重身份：
1. ECMAScript 中的 Global 对象
2. 浏览器窗口的 JavaScript 接口

### Global 作用域

因为 window 对象被复用为 ECMAScript 的 Global 对象，所以通过 var 声明的所有全局变量和函数都会变成 window 对象的属性和方法。

```javascript
var age = 29
var sayAge = () => alert(this.age)

alert(window.age)    // 29
sayAge()             // 29
window.sayAge()      // 29
```

使用 let 或 const 声明的变量不会添加到 window 对象上。

```javascript
let age = 29
const sayAge = () => alert(this.age)

alert(window.age)    // undefined
sayAge()             // undefined
window.sayAge()      // TypeError: window.sayAge is not a function
```

### 窗口关系

- `window.top`：始终指向最外层窗口，即浏览器窗口本身
- `window.parent`：始终指向当前窗口的父窗口
- `window.self`：始终指向 window 本身

### 窗口位置与像素比

窗口相对于屏幕左侧和顶部的位置，可以通过 `screenLeft` 和 `screenTop` 属性获取。

```javascript
// 获取窗口位置
let leftPos = window.screenLeft
let topPos = window.screenTop
```

移动窗口的方法：
- `moveTo(x, y)`：移动到坐标 (x, y)
- `moveBy(x, y)`：相对当前位置移动 x、y 像素

```javascript
// 移动到屏幕左上角
window.moveTo(0, 0)

// 向下移动 100 像素
window.moveBy(0, 100)
```

**像素比**：CSS 像素是 Web 开发中使用的统一像素单位。物理像素与 CSS 像素之间的转换比率由 `window.devicePixelRatio` 属性提供。

```javascript
// 在 DPI 为 96 的屏幕上，devicePixelRatio 为 1
// 在 DPI 为 192 的屏幕上，devicePixelRatio 为 2
console.log(window.devicePixelRatio)
```

### 窗口大小

获取浏览器窗口大小的属性：
- `outerWidth` / `outerHeight`：返回浏览器窗口自身的大小
- `innerWidth` / `innerHeight`：返回浏览器窗口中页面视口的大小（不包含浏览器边框和工具栏）

```javascript
// 获取页面视口大小
let pageWidth = window.innerWidth
let pageHeight = window.innerHeight

// 兼容性处理
if (typeof pageWidth !== 'number') {
  if (document.compatMode === 'CSS1Compat') {
    pageWidth = document.documentElement.clientWidth
    pageHeight = document.documentElement.clientHeight
  } else {
    pageWidth = document.body.clientWidth
    pageHeight = document.body.clientHeight
  }
}
```

调整窗口大小的方法：
- `resizeTo(width, height)`：调整到指定宽高
- `resizeBy(width, height)`：相对当前大小调整

### 视口位置

文档相对于视口滚动距离的属性：
- `window.pageXOffset` / `window.scrollX`：水平滚动距离
- `window.pageYOffset` / `window.scrollY`：垂直滚动距离

滚动页面的方法：
- `scroll(x, y)` / `scrollTo(x, y)`：滚动到指定坐标
- `scrollBy(x, y)`：相对当前位置滚动

```javascript
// 滚动到页面顶部
window.scrollTo(0, 0)

// 相对当前位置向下滚动 100 像素
window.scrollBy(0, 100)

// 使用 options 参数实现平滑滚动
window.scrollTo({
  left: 0,
  top: 100,
  behavior: 'smooth'  // 平滑滚动
})
```

### 导航与打开新窗口

`window.open()` 方法用于导航到指定 URL 或打开新浏览器窗口。接收 4 个参数：
1. 要加载的 URL
2. 目标窗口名称
3. 特性字符串
4. 表示新窗口在浏览器历史记录中是否替代当前加载页面的布尔值

```javascript
// 打开新窗口
let newWindow = window.open(
  'https://www.example.com/',
  'newWindow',
  'height=400,width=400,top=10,left=10,resizable=yes'
)

// 调整新窗口大小
newWindow.resizeTo(500, 500)

// 移动新窗口位置
newWindow.moveTo(100, 100)

// 关闭新窗口
newWindow.close()
```

新创建的 window 对象有一个 `opener` 属性，指向打开它的窗口。

```javascript
alert(newWindow.opener === window)  // true
```

### 定时器

JavaScript 是单线程语言，允许使用定时器指定在某个时间之后或每隔一段时间执行相应的代码。

**setTimeout()**：指定在一定时间后执行某些代码

```javascript
// 1 秒后执行
let timeoutId = setTimeout(() => {
  alert('Hello world!')
}, 1000)

// 取消定时器
clearTimeout(timeoutId)
```

**setInterval()**：指定每隔一段时间执行某些代码

```javascript
// 每隔 1 秒执行
let intervalId = setInterval(() => {
  alert('Hello world!')
}, 1000)

// 取消定时器
clearInterval(intervalId)
```

> 注意：所有超时执行的代码都会在全局作用域中的一个匿名函数中运行，因此函数中的 this 值在非严格模式下始终指向 window，在严格模式下是 undefined。

### 系统对话框

浏览器通过 `alert()`、`confirm()` 和 `prompt()` 方法调用系统对话框向用户显示消息。

```javascript
// 警告框
alert('Hello world!')

// 确认框，返回 true 或 false
if (confirm('Are you sure?')) {
  alert('确定')
} else {
  alert('取消')
}

// 提示框，返回用户输入的值或 null
let result = prompt('What is your name?', 'default value')
if (result !== null) {
  alert('Welcome, ' + result)
}
```

还有两个异步显示的对话框：`find()` 和 `print()`。

```javascript
// 显示查找对话框
window.find()

// 显示打印对话框
window.print()
```

## location 对象

location 是最有用的 BOM 对象之一，提供了当前窗口中加载文档的信息，以及通常的导航功能。它既是 window 的属性，也是 document 的属性。

### URL 解析

假设当前 URL 是：`http://user:pass@www.example.com:80/path/page.html?q=javascript#contents`

| 属性 | 值 | 说明 |
| --- | --- | --- |
| location.hash | "#contents" | URL 散列值（井号后面的字符） |
| location.host | "www.example.com:80" | 服务器名及端口号 |
| location.hostname | "www.example.com" | 服务器名 |
| location.href | 完整 URL | 当前加载页面的完整 URL |
| location.pathname | "/path/page.html" | URL 中的路径 |
| location.port | "80" | 端口号 |
| location.protocol | "http:" | 协议 |
| location.search | "?q=javascript" | 查询字符串 |
| location.username | "user" | 域名前指定的用户名 |
| location.password | "pass" | 域名前指定的密码 |
| location.origin | "http://www.example.com:80" | URL 的源地址（只读） |

### 查询字符串

URLSearchParams 提供了一组标准 API 方法来检查和修改查询字符串。

```javascript
let qs = '?q=javascript&num=10'
let searchParams = new URLSearchParams(qs)

alert(searchParams.toString())    // "q=javascript&num=10"
alert(searchParams.has('num'))    // true
alert(searchParams.get('num'))    // "10"

searchParams.set('page', '3')
alert(searchParams.toString())    // "q=javascript&num=10&page=3"

searchParams.delete('q')
alert(searchParams.toString())    // "num=10&page=3"

// 迭代查询参数
for (let param of searchParams) {
  console.log(param)
}
```

### 操作地址

修改浏览器地址的方法：

```javascript
// 以下三种方式效果相同
location.assign('http://www.example.com')
window.location = 'http://www.example.com'
location.href = 'http://www.example.com'

// 修改 location 的各个属性也会修改当前加载的页面
location.hash = '#section1'
location.search = '?q=javascript'
location.hostname = 'www.example.com'
location.pathname = '/path'
location.port = 8080
```

修改 hash 外的任何属性都会导致页面重新加载。

**replace()** 方法：导航到新 URL，但不会在历史记录中增加新记录。

```javascript
location.replace('http://www.example.com/')
```

**reload()** 方法：重新加载当前页面。

```javascript
// 重新加载，可能从缓存加载
location.reload()

// 强制从服务器重新加载
location.reload(true)
```

## navigator 对象

navigator 对象用于标识浏览器，包含了浏览器和系统的相关信息。

### 常用属性

| 属性 | 说明 |
| --- | --- |
| appCodeName | 浏览器代码名称 |
| appName | 浏览器全名 |
| appVersion | 浏览器版本 |
| cookieEnabled | 是否启用 cookie |
| language | 浏览器主语言 |
| onLine | 浏览器是否联网 |
| platform | 浏览器所在的系统平台 |
| userAgent | 浏览器用户代理字符串 |
| vendor | 浏览器开发商信息 |

### 检测插件

通过 `navigator.plugins` 数组检测浏览器安装的插件。

```javascript
// 检测插件（非 IE）
function hasPlugin(name) {
  name = name.toLowerCase()
  for (let plugin of navigator.plugins) {
    if (plugin.name.toLowerCase().indexOf(name) > -1) {
      return true
    }
  }
  return false
}

// 检测 Flash
alert(hasPlugin('Flash'))
```

### 注册处理程序

`navigator.registerProtocolHandler()` 方法可以把一个网站注册为处理某种特定类型信息应用程序。

```javascript
// 注册为处理 mailto 协议的应用
navigator.registerProtocolHandler(
  'mailto',
  'http://www.example.com?cmd=%s',
  'Some Mail Client'
)
```

## screen 对象

screen 对象保存的是客户端显示器的信息。

| 属性 | 说明 |
| --- | --- |
| availHeight | 屏幕像素高度减去系统组件高度 |
| availWidth | 屏幕像素宽度减去系统组件宽度 |
| colorDepth | 屏幕颜色的位数 |
| height | 屏幕像素高度 |
| width | 屏幕像素宽度 |
| pixelDepth | 屏幕位深 |
| orientation | 返回 Screen Orientation API 中屏幕的朝向 |

```javascript
// 获取屏幕尺寸
console.log(screen.width)       // 屏幕宽度
console.log(screen.height)      // 屏幕高度
console.log(screen.availWidth)  // 可用宽度
console.log(screen.availHeight) // 可用高度
```

## history 对象

history 对象表示当前窗口首次使用以来用户的导航历史记录。出于安全考虑，这个对象不会暴露用户访问过的 URL，但可以通过它在不知道实际 URL 的情况下前进和后退。

### 导航

```javascript
// 后退一页
history.go(-1)

// 前进一页
history.go(1)

// 前进两页
history.go(2)

// 简写方法
history.back()     // 后退一页
history.forward()  // 前进一页

// 历史记录条目数量
console.log(history.length)
```

### 历史状态管理

HTML5 为 history 对象增加了方便的状态管理特性。

**pushState()** 方法：创建新的历史记录条目。

```javascript
// 参数：state 对象、新状态的标题、相对 URL（可选）
history.pushState({ page: 1 }, 'title 1', '/page1')
```

**replaceState()** 方法：更新当前状态。

```javascript
history.replaceState({ page: 2 }, 'title 2', '/page2')
```

**popstate 事件**：点击后退按钮时触发。

```javascript
window.addEventListener('popstate', (event) => {
  let state = event.state
  if (state) {
    // 处理状态变化
    processState(state)
  }
})
```

> 使用 HTML5 状态管理时，要确保通过 pushState() 创建的每个"假" URL 背后都对应着服务器上一个真实的物理 URL。否则，单击"刷新"按钮会导致 404 错误。

## 总结

BOM 提供了与浏览器窗口交互的能力：

1. **window 对象**：BOM 的核心，既是 ECMAScript 的 Global 对象，也是浏览器窗口的接口
2. **location 对象**：提供当前页面的 URL 信息和导航功能
3. **navigator 对象**：提供浏览器的相关信息
4. **screen 对象**：提供客户端显示器的信息
5. **history 对象**：提供浏览器历史记录的访问能力

