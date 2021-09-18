# ReactDOM.render 是如何串联渲染链路的？


## ReactDOM.render 调用栈的逻辑分层

```javascript
import React from 'react'
import ReactDOM from 'react-dom'

function App() {
  return (
    <div>
      <div>
        <h1>title</h1>
        <p>p</p>
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

运行 Demo 案例，并通过 Chrome 的 Performance 面板，记录页面调用栈。

以 scheduleUpdateOnFiber 和 commitRoot 两个方法为界，把 ReactDOM.render 的调用栈划分为 三个阶段：
1. 初始化阶段
2. render 阶段
3. commit 阶段

## 初始化阶段

任务：完成 Fiber 树中基本实体的创建。

首先是 legacyRenderSubtreeIntoContainer 方法。

```javascript
return legacyRenderSubtreeIntoContainer(null, element, container, false, callback)
```

<details>
<summary>
legacyRenderSubtreeIntoContainer 主要逻辑及解析
</summary>

```javascript
function legacyRenderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {
  // container 对应的是我们传入的真实 DOM 对象
  var root = container._reactRootContainer
  // 初始化 fiberRoot 对象
  var fiberRoot
  // DOM 对象本身不存在 _reactRootContainer 属性，因此 root 为空
  if (!root) {
    // 若 root 为空，则初始化 _reactRootContainer，并将其值赋值给 root
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate)
    // legacyCreateRootFromDOMContainer 创建出的对象会有一个 _internalRoot 属性，将其赋值给 fiberRoot
    fiberRoot = root._internalRoot

    // 这里处理的是 ReactDOM.render 入参中的回调函数，你了解即可
    if (typeof callback === 'function') {
      var originalCallback = callback
      callback = function () {
        var instance = getPublicRootInstance(fiberRoot)
        originalCallback.call(instance)
      }
    } // Initial mount should not be batched.
    // 进入 unbatchedUpdates 方法
    unbatchedUpdates(function () {
      updateContainer(children, fiberRoot, parentComponent, callback)
    })
  } else {
    // else 逻辑处理的是非首次渲染的情况（即更新），其逻辑除了跳过了初始化工作，与楼上基本一致
    fiberRoot = root._internalRoot
    if (typeof callback === 'function') {
      var _originalCallback = callback
      callback = function () {
        var instance = getPublicRootInstance(fiberRoot)
        _originalCallback.call(instance)
      }
    } // Update

    updateContainer(children, fiberRoot, parentComponent, callback)
  }
  return getPublicRootInstance(fiberRoot)
}
```
</details>

总结一下首次渲染过程中 legacyRenderSubtreeIntoContainer 方法的主要逻辑链路：
1. 调用 legacyRenderSubtreeIntoContainer 创建 container._reactRootContainer 对象，并赋值给 root
2. 将 root 上的 _internalRoot 属性赋值给 fiberRoot
3. 将 fiberRoot 与方法入参一起，传入 updateContainer 方法，形成回调
4. 将 updateContainer 回调作为参数传入，调用 unbatchedUpdates

在这个流程中，root 对象上有一个 _internalRoot 属性，这个属性也就是 fiberRoot。
fiberRoot 对象是一个 FiberRootNode 对象，其中包含一个 current 属性，current 正是一个 FiberNode 实例。
而 FiberNode 是 Fiber 节点对应的对象类型。current 对象是一个 Fiber 节点，还是当前 Fiber 树的头部节点。

所以，fiberRoot 对象 是 FiberRootNode 的实例。rootFiber 对象 是 FiberNode 的实例。
其中，fiberRoot 的关联对象是 真实 DOM 的容器节点；rootFiber 则作为虚拟 DOM 的根节点存在。这两个节点，是后续整个 Fiber 树构建的起点。

fiberRoot 将和 ReactDOM.render 方法的其他入参一起，被传入 updateContainer 方法。这个方法是 unbatchedUpdates 的入参。

<details>
<summary>
unbatchedUpdates 主体逻辑
</summary>

```javascript
function unbatchedUpdates(fn, a) {
  // 这里是对上下文的处理，不必纠结
  var prevExecutionContext = executionContext
  executionContext &= ~BatchedContext
  executionContext |= LegacyUnbatchedContext
  try {
    // 重点在这里，直接调用了传入的回调函数 fn，对应当前链路中的 updateContainer 方法
    return fn(a)
  } finally {
    // finally 逻辑里是对回调队列的处理，此处不用太关注
    executionContext = prevExecutionContext
    if (executionContext === NoContext) {
      // Flush the immediate callbacks that were scheduled during this batch
      resetRenderTimer()
      flushSyncCallbackQueue()
    }
  }
}
```
</details>


在 unbatchedUpdates 函数体中，直接调用了传入的回调 fn。即 updateContainer。

<details>
<summary>
updateContainer 主体代码
</summary>

```javascript
function updateContainer(element, container, parentComponent, callback) {
  // other code

  // 这是一个 event 相关的入参，此处不必关注
  var eventTime = requestEventTime()

  // other code

  // 这是一个比较关键的入参，lane 表示优先级
  var lane = requestUpdateLane(current$1)
  // 结合 lane（优先级）信息，创建 update 对象，一个 update 对象意味着一个更新
  var update = createUpdate(eventTime, lane)

  // update 的 payload 对应的是一个 React 元素
  update.payload = {
    element: element
  }

  // 处理 callback，这个 callback 其实就是我们调用 ReactDOM.render 时传入的 callback
  callback = callback === undefined ? null : callback
  if (callback !== null) {
    {
      if (typeof callback !== 'function') {
        error('render(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callback)
      }
    }
    update.callback = callback
  }

  // 将 update 入队
  enqueueUpdate(current$1, update)
  // 调度 fiberRoot
  scheduleUpdateOnFiber(current$1, lane, eventTime)
  // 返回当前节点（fiberRoot）的优先级
  return lane
}
```
</details>

总结 updateContainer 的逻辑：
1. 请求当前 Fiber 节点的 lane
2. 结合 lane，创建当前 Fiber 节点的 update 对象，并将其入队
3. 调度当前节点

在 ReactDOM.render 发起的首次渲染链路中，渲染过程是同步的。

在 scheduleUpdateOnFiber 代码中，有 performSyncWorkOnRoot 执行根节点同步任务，即将开启一个同步过程。

那么，Fiber 架构带来的异步渲染是 React 16 的亮点，为什么分析到现在，发现 ReactDOM.render 触发的首次渲染还是一个同步过程？

在 React 16，包括 React 17 小版本中，React 都有三种启动方式：

- legacy 模式：`ReactDOM.render(<App />, rootNode)`，当前 React 使用的模式，等 concurrent 模式稳定后会停止更新新特性
- blocking 模式：`ReactDOM.createBlockingRoot(rootNode).render(<App />)`，是一个 legacy 到 concurrent 的过度模式
- concurrent 模式：`ReactDOM.createRoot(rootNode).render(<App />)`，未来作为 React 默认模式

concurrent 模式下，ReactDOM.createRoot 代码跟 ReactDOM.render 都是准备性质的初始化工作，所以会有大量的重复方法使用。
主要区别在 scheduleUpdateOnFiber 这个判断中。

异步渲染模式下，由于请求到的 lane 不再是 SyncLane，所以不会走到 performSyncWorkOnRoot 这个调用。

<details>
<summary>
React 如何知道当前处于哪个模式？
</summary>

```javascript
function requestUpdateLane(fiber) {
  // 获取 mode 属性
  var mode = fiber.mode
  // 结合 mode 属性判断当前的
  if ((mode & BlockingMode) === NoMode) {
    return SyncLane
  } else if ((mode & ConcurrentMode) === NoMode) {
    return getCurrentPriorityLevel() === ImmediatePriority$1 ? SyncLane : SyncBatchedLane
  }
  // ......
  return lane
}
```

通过修改 mode 属性为不同的值，来标识单签处于哪个渲染阶段；在执行过程中，也是通过判断这个属性，来区分不同的渲染模式。
</details>

<details>
<summary>
Fiber 架构一定是异步渲染吗？
</summary>

在 React 16，包括已发布的 React 17 中，不管是否是 concurrent，整个数据结构层面的设计、包括贯穿整个渲染链路的处理逻辑，已经完全用 Fiber 重构了一遍。
所以，它是一种 同时兼容了同步渲染与异步渲染的设计。
</details>
