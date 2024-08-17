
# 特别的事件系统：React 事件与 DOM 事件有何不同

React 有着自成一派的事件系统。

> React 版本为 16.13.x

## 回顾原生 DOM 下的事件流

一个页面会绑定很多的事件，而页面接收事件的顺序，就是事件流。

W3C 标准约定，一个事件传播需要经过3个阶段：

1. 事件捕获阶段
2. 目标阶段
3. 事件冒泡阶段

首先经历捕获过程，事件从最外层逐层进入到内层元素，持续到事件抵达目标元素为止；
此时事件流进入到 目标阶段，事件被目标元素所接收；
然后事件会被回弹，进入到冒泡阶段，再从内部一层一层走回去。

## DOM 事件流下的性能优化思路：事件委托

在原生 DOM 中，事件委托也是一种重要的性能优化手段。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <ul id="poem">
    <li>床前明月光</li>
    <li>疑是地上霜</li>
    <li>举头望明月</li>
    <li>低头思故乡</li>
    <li>one more</li>
    <li>锄禾日当午</li>
    <li>汗滴禾下土</li>
    <li>谁知盘中餐</li>
    <li>粒粒皆辛苦</li>
  </ul>
</body>
</html>
```

> 问：在这段 HTML 渲染出的界面里，我希望做到点击每一个 li 元素，都能输出它内在的文本内容。你会怎么做？

```javascript
// 获取 li 列表
var liList = document.getElementsByTagName('li')
// 逐个安装监听函数
for (var i = 0; i < liList.length; i++) {
  liList[i].addEventListener('click', function (e) {
    console.log(e.target.innerHTML)
  })
}
```

上述方法为每个 li 元素绑定了点击事件，开销很大。使用 事件冒泡，在 ul 元素上处理。
ul 元素通过事件对象中的 target 属性，拿到实际触发事件的元素，针对这个元素分发事件处理的逻辑。

```javascript
var ul = document.getElementById('poem')
ul.addEventListener('click', function(e){
  console.log(e.target.innerHTML)
})
```

e.target 这个属性，它指的是触发事件的具体目标，它记录着事件的源头。不管监听函数在哪一层执行，只要拿到 e.target，就相当于拿到了真正触发的那个元素。

利用事件的冒泡特性，把多个子元素的同一类型的监听逻辑，合并到父元素上通过监听函数来管理行为，就是事件委托。

> 通过事件委托，可以减少内存开销、简化注册步骤，提高开发效率。

## React 事件系统是如何工作的

React 的事件系统沿用了事件委托的思想。除少数不可冒泡的事件无法被事件系统处理外，绝大多数事件都统一被绑定在页面的 document 上。
当事件在具体的 DOM 节点上被触发后，最终都会冒泡到 document 上，document 上所绑定的统一事件处理程序会将事件分发到具体的组件实例。

在分发事件之前，React 首先会对事件进行包装，把原生 DOM 事件包装成合成事件。

## 认识 React 合成事件

合成事件是 React 自定义的事件对象，符合 W3C 规范，在底层抹平了不同浏览器的差异，在上层面向开发者暴露统一的、稳定的、与 DOM 原生事件相同的事件接口。

合成事件保存了原生 DOM 事件的引用，当需要访问原生 DOM 事件对象时，可以通过合成事件对象的 e.nativeEvent 属性获取。

## React 事件系统工作流拆解

### 事件的绑定

事件的绑定是在组件挂载过程中完成的，即 `completeWork` 中完成的。

completeWork 有三个关键动作：创建 DOM 节点、将 DOM 节点插入到 DOM 树中、为 DOM 节点设置属性。

其中 **为 DOM 节点 设置属性** 环节，会遍历 `FiberNode` 的 props key。
当遍历到事件相关的 `props` 时，就会触发事件的注册链路。

工作流：

`completeWork` -> `createInstance` 创建 DOM 节点，`appendAllChildren` 将 DOM 节点插入 DOM 树 ->

`finalizeInitialChildren` 设置 DOM 节点的属性 -> `setInitialProperties` ->

`setInitialDOMProperties` 设置 DOM 节点的初始化属性 -> `ensureListeningTo` 进入事件监听的注册逻辑 ->

判断是捕获还是冒泡 -> **捕获**：`trapCapturedEvent` / **冒泡**：`trapBubbleEvent` ->
`addTrappedEventListener` 将事件注册到 `document` 上

所以 事件的注册过程是由 `ensureListeningTo` 函数开启的。在 `ensureListeningTo` 中，尝试获取当前 DOM 结构中的根节点（document 对象），
然后通过调用 `legacyListenToEvent`，将统一的事件监听函数注册到 `document` 上面。

`legacyListenToEvent` 实际上是通过调用 `legacyListenToTopLevelEvent` 来处理事件和 `document` 之间的关系的。
`legacyListenToTopLevelEvent` 函数中有一个 `listenerMap` 来记录 当前 `document` 已经监听了哪些事件。
会使用 `listenerMap.has(topLevelType)` 判断是否继续执行。

因此，多次调用同一个事件的监听，也只会在 `document` 上注册一次。并且最终注册到 `document` 上的并不是某一个 DOM 节点上对应的具体回调逻辑，而是一个统一的事件分发函数。

`addEventListener` 是原生 DOM 里专门用来注册事件监听器的接口。

```javascript
addEventListener(eventType, listener, false) // 第三个参数为 false 表示在冒泡阶段执行
```

`eventType` 表示事件类型；
`listener` 表示最终注册到 `document` 上的一个统一的事件分发函数；

`listener` 可能为下面三个函数之一：

- `dispatchDiscreteEvent`
- `dispatchUserBlockingUpdate`
- `dispatchEvent`

不过最后都是通过调用 `dispatchEvent` 来执行事件分发的。

### 事件的触发

本质上是对 `dispatchEvent` 函数的调用。

核心工作流：

事件触发，冒泡至 `document` -> 执行 `dispatchEvent` -> 创建事件对应的合成事件对象（`SyntheticEvent`）->
收集事件在捕获阶段所波及的回调函数和对应的节点实例 -> 收集事件在冒泡阶段所波及的回调函数和对应的节点实例 ->
将收集回来的回调按顺序执行，执行时 `SyntheticEvent` 会作为如惨被传入每个回调

### 事件回调的收集与执行

收集过程对应的源码为 `traverseTwoPhase` 函数，

```javascript
function traverseTwoPhase(inst, fn, arg) {
  // 定义一个 path 数组
  var path = [];

  while (inst) {
    // 将当前节点收集进 path 数组
    path.push(inst);
    // 向上收集 tag===HostComponent 的父节点
    inst = getParent(inst);
  }
  var i;
  // 从后往前，收集 path 数组中会参与捕获过程的节点与对应回调
  for (i = path.length; i-- > 0;) {
    fn(path[i], 'captured', arg);
  }

  // 从前往后，收集 path 数组中会参与冒泡过程的节点与对应回调
  for (i = 0; i < path.length; i++) {
    fn(path[i], 'bubbled', arg);
  }
}
```

1. 循环收集符合条件的父节点（即 DOM 节点），存进 path 数组中
2. 模拟事件在捕获阶段的传播顺序，收集捕获阶段相关的节点实例与回调函数
3. 模拟事件在冒泡阶段的传播顺序，收集冒泡阶段相关的节点实例与回调函数

> 需要注意的是，当前事件对应的 SyntheticEvent 实例有且仅有一个，
> 因此在模拟捕获和模拟冒泡这两个过程中，
> 收集到的实例会被推入同一个 SyntheticEvent._dispatchInstances，
> 收集到的事件回调也会被推入同一个 SyntheticEvent._dispatchListeners。

## 总结

React 事件系统的设计动机是什么？

1. 合成事件符合W3C规范，在底层抹平了不同浏览器的差异，在上层面向开发者暴露统一的、稳定的、与 DOM 原生事件相同的事件接口。开发者们由此便不必再关注烦琐的底层兼容问题，可以专注于业务逻辑的开发。
2. 自研事件系统使 React 牢牢把握住了事件处理的主动权.

对 React 来说，事件委托主要的作用应该在于帮助 React 实现了对所有事件的中心化管控。
