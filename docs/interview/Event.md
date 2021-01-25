# 事件

## 理解事件流

事件流描述了页面接受事件的顺序。

IE事件流被称为事件冒泡，因为事件被定义从最具体的元素开始触发，然后向上传播至没有那么具体的元素「`document`」。

所有现代浏览器都支持事件冒泡。

事件捕获的意思是最不具体的节点应该最先收到事件，而最具体的节点应该最后收到事件。

事件捕获实际上是为了在事件达到最终目标前拦截事件。
如：`点击事件click首先由` `document` 元素捕获，然后沿 DOM 树依次向下传播，直到到达实际的目标元素 `<div>` 。

实际上，所有浏览器都是从 `window` 对象开始捕获事件，而 DOM2 Events 规范规定的是从 `document` 开始。

因为旧版本浏览器不支持，所以实际当中几乎不会使用事件捕获，建议使用事件冒泡，特殊情况下才考虑使用事件捕获。

DOM2 Events 规范规定事件流分为3个阶段：**事件捕获、到达目标和事件冒泡**。

## 使用事件处理程序

为响应事件而调用的函数被称为事件处理程序。

HTML事件处理程序，即标签中定义的如 onclick 事件，包含局部变量 event。

DOM0 事件处理程序，JS中取得操作对象的引用，再去添加属性 onclick。

DOM2 事件处理程序，定义了两个方法：`addEventListener()` 和 `removeEventListener()` 。接收3个参数：事件名、事件处理函数和一个布尔值。

true 表示再捕获阶段调用事件处理函数，false 表示在冒泡阶段调用事件处理函数。

```javascript
// 事件冒泡阶段，可以绑定多个
let btn = document.getElementById('btn')
const handler = () => {
  console.log(this.id)
}
btn.addEventListener('click', handler, false)
// removeEnentListerer 第二个参数，应使用同一个 handler
btn.removeEventListener('click', handler, false)

```

IE 事件处理程序，IE 实现了与 DOM 类似的方法，即 `attachEvent()` 和 `detachEvent()`。接受两个参数。
添加多个 `attachEvent()` 时，触发顺序为先声明后调用。

跨浏览器事件处理程序，整合 DOM0、DOM2和IE处理方式。

事件对象，Event 对象。

DOM 事件对象的公共属性和方法：
bubbles                     Boolean   表示事件是否冒泡

cancelable                  Boolean   表示是否可以取消事件的默认行为

currentTarget               element   当前事件处理程序所在的元素

defaultPrevented            Boolean   true 表示已经调用 perventDefault() 方法（DOM3 新增）

detail                      Number    事件相关的其他信息

eventPhase                  Number    调用事件处理程序的阶段：1 捕获阶段、2 到达目标、3 冒泡阶段

preventDefault()            Function  取消事件的默认行为。只有cancelable为true 才可以调用这个方法

stopImmediatePropagation()  用于取消所有后续事件捕获或事件冒泡，并阻止调用任何后续事件处理程序（DOM3 新增）

stopPropagation()           用于取消所有后续事件捕获或事件冒泡。只有 bubbles 为true才可以调用这个方法。

target                      事件目标

trusted                     true 表示事件是由浏览器生成的。false 表示事件是开发者通过JS创建的（DOM3 新增）

type                        被触发的事件类型

View                        与事件相关的抽象视图。等于事件所发生的 window 对象。


事件处理的内部，this 对象始终等于 currentTarget 的值。


## 了解不同类型的事件

用户界面事件：load、unload、abort、error、select、resize、scroll。

焦点事件：blur、DOMFocusIn、focus、focusin、focusout。

鼠标事件：click、dblclick、mousedown、mouseenter、mouseleave、mousemove、mouseout、mouseover、mouseup。

滚轮事件：同上

输入事件：keydown、keypress、keyup

键盘事件：同上

合成事件：compositionstart、compositionupdate、compositionend


HTML5 事件

contextmenu

beforeunload

DOMContentLoaded

readystatechange：文档或元素状态加载的信息，属性 readyState：uninitialized、loading、loaded、interactive、complete。

hashchange：URL#后面部分发生变化时通知开发者。

设备事件

orientationchange

deviceorientation

devicemotion


触摸及手势事件

触摸事件：touchstart、touchmove、touchend、touchcancel。

手势事件：gesturestart、gesturechange、gestureend


## 内存与性能

过多事件处理程序的解决方案是使用事件委托，利用事件冒泡，只使用一个处理程序来管理一种类型的事件。

删除事件处理程序

## 模拟事件
