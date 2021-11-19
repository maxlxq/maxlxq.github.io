# Fiber 架构下的 Concurrent 模式的实现原理

去认识 Concurrent 模式（异步渲染）下的"时间切片"和"优先级"的实现之前，先了解一下"两棵树"之间的合作模式。

## current 树与 workInProgress 树："双缓冲"模式在 Fiber 架构下的实现

### 什么是"双缓冲"模式

同时准备两套缓冲数据，利用硬件交替读取，可以实现无缝切换，减少了数据准备时间。
在 React 中，双缓冲模式主要能够帮助较大程度地实现 Fiber 节点的复用，从而减少性能方面的开销。

### current 树与 workInProgress 树之间是如何"相互利用"的

当 current 树呈现在用户眼前时，所有的更新都会由 workInProgress 树来承接。
workInProgress 树将会在内存中完成所有改变，直到 current 指针指向它。
此时 commit 阶段已经执行完毕，workInProgress 树变成了那颗呈现在界面上的 current 树。

示例 Demo：

```javascript
import { useState } from 'react'
function App() {
  const [state, setState] = useState(0)
  return (
    <div className="App">
      <div onClick={() => { setState(state + 1) }} className="container">
        <p style={{ width: 128, textAlign: 'center' }}>
          {state}
        </p>
      </div>
    </div>
  )
}

export default App
```

### 挂在后的 Fiber 树

构建 Fiber 树，挂载时的 render 阶段结束后，commit 阶段执行前，两颗 Fiber 树的形态。
```javascript
/**
 *         fiberRoot 对象 （FiberRootNode 实例）
 *         |
 *         ↓ current
 *  ╭-----------------╮                   ╭-----------------╮
 *  |  rootFiber Obj  | ←-- alternate --→ |  rootFiber Obj  |
 *  |  FiberNode Ins  |                   |  FiberNode Ins  |
 *  ╰-----------------╯                   ╰-----------------╯
 *                                                 ↓ child
 *                                              ╭-----╮
 *                                              | App |
 *                                              ╰-----╯
 *                                         return ↑ ↓ child
 *                                              ╭-----╮
 *                                              | div |
 *                                              ╰-----╯
 *                                         return ↑ ↓ child
 *                                              ╭-----╮
 *                                              | div |
 *                                              ╰-----╯
 *                                         return ↑ ↓ child
 *                                              ╭-----╮
 *                                              |  p  |
 *                                              ╰-----╯
 */
```

等待 commit 阶段完成后，右侧的 workInProgress 树对应的 DOM 树就被真正的渲染到了页面上，此时的 current 指针会指向 workInProgress 树：

```javascript
/**
 *             fiberRoot 对象 （FiberRootNode 实例）
 *                                           |
 *                                           ↓ current（变更到这里）
 *  ╭-----------------╮                   ╭-----------------╮
 *  |  rootFiber Obj  | ←-- alternate --→ |  rootFiber Obj  |
 *  |  FiberNode Ins  |                   |  FiberNode Ins  |
 *  ╰-----------------╯                   ╰-----------------╯
 *                                                 ↓ child
 *                                              ╭-----╮
 *                                              | App |
 *                                              ╰-----╯
 *                                         return ↑ ↓ child
 *                                              ╭-----╮
 *                                              | div |
 *                                              ╰-----╯
 *                                         return ↑ ↓ child
 *                                              ╭-----╮
 *                                              | div |
 *                                              ╰-----╯
 *                                         return ↑ ↓ child
 *                                              ╭-----╮
 *                                              |  p  |
 *                                              ╰-----╯
 */
```

由于挂载是一个从无到有的过程，都在不断地创建新节点，所以不存在节点复用一说。

### 第一次更新

更新会调用 beginWork 逻辑中的 createWorkInProgress 方法。

在 createWorkInProgress 方法中，会先取当前节点的 alternate 属性，将其记为 workInProgress 节点。
对于 rootFiber 节点来说，它的 alternate 属性，其实就是上一课 current 树的rootFiber。
当检查到上一棵 current 树的 rootFiber 存在时，React 会直接复用这个节点，让它作为下一棵 workInProgress 的节点存在下去。
如果和目标 workInProgress 节点之间存在差异，直接在该节点上修改属性，使其与目标节点一致，不必再创建新的 Fiber 节点。

剩下的节点，由于没有对应的 alternate 节点存在，因此都会走 `workInProgress === null`逻辑。

```javascript
// 这里入参中的 current 传入的是现有树结构中的 rootFiber 对象
function createWorkInProgress(current, pendingProps) {
  var workInProgress = current.alternate
  // ReactDOM.render 触发的首屏渲染将进入这个逻辑
  if (workInProgress === null) {
    // 这是需要你关注的第一个点，workInProgress 是 createFiber 方法的返回值
    workInProgress = createFiber(current.tag, pendingProps, current.key, current.mode)
    workInProgress.elementType = current.elementType
    workInProgress.type = current.type
    workInProgress.stateNode = current.stateNode
    // 这是需要你关注的第二个点，workInProgress 的 alternate 将指向 current
    workInProgress.alternate = current
    // 这是需要你关注的第三个点，current 的 alternate 将反过来指向 workInProgress
    current.alternate = workInProgress
  } else {
    // else 的逻辑此处先不用关注
  }

  // 以下省略大量 workInProgress 对象的属性处理逻辑
  // 返回 workInProgress 节点
  return workInProgress
}
```

调用 createFiber 来创建一个 FiberNode。

第一次更新结束后，得到一个新的 workInProgress 树，current 指针最后会指向这个新的 workInProgress Fiber 树。

```javascript
/**
 *           fiberRoot 对象 （FiberRootNode 实例）
 *             |
 *             ↓ current（变更到这里）
 *  ╭-----------------╮                   ╭-----------------╮
 *  |  rootFiber Obj  | ←-- alternate --→ |  rootFiber Obj  |
 *  |  FiberNode Ins  |                   |  FiberNode Ins  |
 *  ╰-----------------╯                   ╰-----------------╯
 *     child ↓                                    ↓ child
 *        ╭-----╮                              ╭-----╮
 *        | App |      ←-- alternate --→       | App |
 *        ╰-----╯                              ╰-----╯
 *   return ↑ ↓ child                     return ↑ ↓ child
 *         ╭-----╮                             ╭-----╮
 *         | div |     ←-- alternate --→       | div |
 *         ╰-----╯                             ╰-----╯
 *    return ↑ ↓ child                     return ↑ ↓ child
 *         ╭-----╮                             ╭-----╮
 *         | div |     ←-- alternate --→       | div |
 *         ╰-----╯                             ╰-----╯
 *     return ↑ ↓ child                    return ↑ ↓ child
 *         ╭-----╮                             ╭-----╮
 *         |  p  |     ←-- alternate --→       |  p  |
 *         ╰-----╯                             ╰-----╯
 */
```

### 第二次更新

接下来的更新中，current 树中每一个 alternate 属性都不为空。因此每次通过 beginWork 触发 createWorkInProgress 调用时，都会一致地走入 else 逻辑，直接复用现成的节点。

## 更新链路要素拆解

同步模式下的更新链路与挂载链路的 render 阶段基本是一致的，都是通过 performSyncWorkOnRoot 来触发包括 beginWork、completeWork 在内的深度优先搜索过程。

挂载可以理解为一种特殊的更新。在 React 中，ReactDOM.render、setState、useState 等方法都是可以触发更新的，这些方法发起的调用链路很相似，是因为他们最后都会通过创建 update 对象来进入同一套更新工作流。

### update 的创建

示例 Demo 中，点击数字后，首先触发的是 dispatchAction 方法。

dispatchAction 中会完成 update 对象的创建。

```javascript
function dispatchAction(fiber, queue, action) {
  // ...
  var eventTime = requestEventTime()
  var lane = requestUpdateLane(fiber)
  // 这里创建了 update 对象
  var update = {
    lane: lane,
    action: action,
    eagerReducer: null,
    eagerState: null,
    next: null,
  } // append the update to the end of the list

  var pending = queue.pending

  if (pending === null) {
    update.next = update
  } else {
    update.next = pending.next
    pending.next = update
  }
  // ...
  scheduleUpdateOnFiber(fiber, lane, eventTime)
}
```

### 从 update 对象到 scheduleUpdateOnFiber

上述代码的逻辑，React 里 updateContainer 函数中有相同的行为。
```javascript
var update = createUpdate(eventTime, lane)

update.payload = {
  element: element,
}
callback = callback === undefined ? null : callback

if (callback !== null) {
  {
    if (typeof callback !== 'function') {
      // error
    }
  }
  update.callback = callback
}

enqueueUpdate(current$1, update)
scheduleUpdateOnFiber(current$1, lane, eventTime)
```

以 enqueueUpdate 为界：
1. enqueueUpdate 之前：创建 update
2. enqueueUpdate 调用：将 update 入队。每个 Fiber 节点都会有一个属于自身的 updateQueue，用于存储多个更新，updateQueue 以链表形式存在。在 render 阶段，updateQueue 的内容会成为 render 阶段计算 Fiber 节点的新 state 的依据
3. scheduleUpdateOnFiber：调度 update。这个方法之后会紧跟 performSyncWorkOnRoot 所触发的 render 阶段。

再看 dispatchAction 的逻辑，里面依然有上述三步处理过程。

有一点需要注意的是，dispatchAction 调度的是当前触发更新的节点。和过载过程不太一致。挂载过程中，updateContainer 会直接调度根节点。
但对于更新这种场景来说，大部分更新的动作都不是由根节点触发的，而 render 阶段的起点则是根节点。

因此，在 scheduleUpdateOnFiber 中，有 markUpdateLaneFromFiberToRoot 这样一个方法。
```javascript
function scheduleUpdateOnFiber(fiber, lane, eventTime) {
  checkForNestedUpdates()
  // ...
  // 这里
  var root = markUpdateLaneFromFiberToRoot(fiber, lane)

  if (root === null) {
    // ...
    return null
  }

  markRootUpdated(root, lane, eventTime)

  if (root === workInProgressRoot) {
    // ...
  }
  // ...
}
```

markUpdateLaneFromFiberToRoot 会从当前 Fiber 节点开始，向上遍历直至根节点，并将根节点返回。

### scheduleUpdateOnFiber 如何区分同步还是异步？

之前的 同步渲染链路分析中，有如下代码：
```javascript
if (lane === SyncLane) { // 同步
  if (
    (executionContext & LegacyUnbatchedContext) !== NoContext &&
    (executionContext & (RenderContext | CommitContext)) === NoContext) {
    schedulePendingInteractions(root, lane)
    performSyncWorkOnRoot(root) // 开启同步的 redner 逻辑
  } else {
    ensureRootIsScheduled(root, eventTime) // 决定如何开启当前更新所对应的 render 阶段。
    schedulePendingInteractions(root, lane)

    if (executionContext === NoContext) {
      resetRenderTimer()
      flushSyncCallbackQueue()
    }
  }
} else {
  // ...
}
```

在 ensureRootIsScheduled 中，有这样一段逻辑：
```javascript
if (newCallbackPriority === SyncLanePriority) {
  // 同步更新的 render 入口
  newCallbackNode = scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root))
} else {
  // 将当前任务的 lane 优先级转换为 scheduler 可理解的优先级
  var schedulerPriorityLevel = lanePriorityToSchedulerPriority(newCallbackPriority)
  // 异步更新的 render 入口
  newCallbackNode = scheduleCallback(schedulerPriorityLevel, performConcurrentWorkOnRoot.bind(null, root))
}
```

performSyncWorkOnRoot 是 同步更新模式下的 render 阶段入口
performConcurrentWorkOnRoot 是 异步模式下的 render 阶段入口

所以，React 会议当前更新任务的优先级类型为依据，决定接下来调度 performSyncWorkOnRoot 还是 performConcurrentWorkOnRoot。
调度任务分别用到 scheduleSyncCallback 和 scheduleCallback，两个函数内部都是通过调用 unstable_scheduleCallback 方法来执行任务调度的。

而 unstable_scheduleCallback 正是 Scheduler 调度器 中导出的一个核心方法。

## Scheduler —— 时间切片 与 优先级 的幕后推手

Fiber 架构下的异步渲染（即 Concurrent 模式）的核心特征分别是 是时间切片和优先级调度。

### 结合 React 调用栈，理解时间切片现象

同步渲染模式下的 render 阶段是一个同步的、深度优先搜索的过程。

这个过程是不可中断的，浏览器的刷新频率是 60Hz，每 16.6ms 就会刷新一次。这 16.6ms 内，除了 JS 线程外，渲染线程也是需要处理工作的。
但是 同步渲染模式下可能有个很长的 Task 工作任务，不可中断，占用了渲染线程的时间，进而引起掉帧问题。

如果是将 ReactDOM.render 改为 createRoot 调用，就会开启 Concurrent 模式。

Task 任务会被切分为多个断断续续的小任务，每个 小 Task 任务切片占用很少的处理时间，总的处理工作量与同步模式下的 Task 一致。但是小 Task 留出了时间空隙，让浏览器能及时处理其他事情。

### 时间切片是如何实现的？

同步渲染中，循环创建 Fiber 节点、构建 Fiber 树的过程是由 workLoopSync 函数来触发的。

在 workLoopSync 中，只要 workInProgress 不为空，while 循环就不会结束，触发的是一个同步的 performUnitOfWork 循环调用的过程。

而 异步渲染下，这个循环是由 workLoopConcurrent 开启的。workLoopConcurrent 和 workLoopSync 仅仅在循环判断上有一处不同。

```javascript
function workLoopConcurrent() {
  while(workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress)
  }
}
```

shouldYield 表示 需要让出。当 shouldYield() 调用返回为 true 时，就说明当前需要对祝线程进行让出了，此时 while 不再循环。

shouldYield 是什么？
```javascript
var Scheduler_shouldYield = Scheduler.unstable_shouldYield
// ......
var shouldYield = Scheduler_shouldYield
```

shouldYield 的本体其实是 Scheduler.unstable_shouldYield

```javascript
{
  exports.unstable_shouldYield = function () {
    return exports.unstable_now() >= deadline
  }
}
```

unstable_now() 实际上取 performance.now() 的值，即**当前时间**。
deadline 是 **当前时间切片的到期时间**。[计算过程在 Schedule 包中的 performWorkUnitOfDeadline 方法中]

所以 时间切片的实现原理：React 会根据浏览器的频率，计算出时间切片的大小，并结合当前时间计算出每一个时间切片的到期时间。
在 workLoopConcurrent 中，while 循环每次执行前，会调用 shouldYield 函数来询问当前时间切片是否到期，若已到期，则结束循环、让出主线程的控制权。

## 优先级调度是如何实现的

无论是通过 scheduleSyncCallback 还是 scheduleCallback，最终都是通过调用 unstable_scheduleCallback 来发起调用的。

unstable_scheduleCallback 是 Scheduler 导出的一个核心方法，将结合任务的优先级信息为其执行不同的调度逻辑。

```javascript
function unstable_scheduleCallback(priorityLevel, callback, options) {
  // 获取当前时间
  var currentTime = exports.unstable_now()
  // 声明 startTime，startTime 是任务的预期开始时间
  var startTime
  // 以下是对 options 入参的处理
  if (typeof options === 'object' && options !== null) {
    var delay = options.delay

    // 若入参规定了延迟时间，则累加延迟时间
    if (typeof delay === 'number' && delay > 0) {
      startTime = currentTime + delay
    } else {
      startTime = currentTime
    }
  } else {
    startTime = currentTime
  }
  // timeout 是 expirationTime 的计算依据
  var timeout
  // 根据 priorityLevel，确定 timeout 的值
  switch (priorityLevel) {
    case ImmediatePriority:
      timeout = IMMEDIATE_PRIORITY_TIMEOUT
      break
    case UserBlockingPriority:
      timeout = USER_BLOCKING_PRIORITY_TIMEOUT
      break
    case IdlePriority:
      timeout = IDLE_PRIORITY_TIMEOUT
      break
    case LowPriority:
      timeout = LOW_PRIORITY_TIMEOUT
      break
    case NormalPriority:
    default:
      timeout = NORMAL_PRIORITY_TIMEOUT
      break
  }
  // 优先级越高，timout 越小，expirationTime 越小
  var expirationTime = startTime + timeout

  // 创建 task 对象
  var newTask = {
    id: taskIdCounter++,
    callback: callback,
    priorityLevel: priorityLevel,
    startTime: startTime,
    expirationTime: expirationTime,
    sortIndex: -1
  }

  {
    newTask.isQueued = false
  }
  // 若当前时间小于开始时间，说明该任务可延时执行(未过期）
  if (startTime > currentTime) {
    // 将未过期任务推入 "timerQueue"
    newTask.sortIndex = startTime
    push(timerQueue, newTask)

    // 若 taskQueue 中没有可执行的任务，而当前任务又是 timerQueue 中的第一个任务
    // peek 函数 取出小顶堆堆顶元素
    if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
      // ......
          // 那么就派发一个延时任务，这个延时任务用于检查当前任务是否过期
      requestHostTimeout(handleTimeout, startTime - currentTime)
    }
  } else {
    // else 里处理的是当前时间大于 startTime 的情况，说明这个任务已过期
    newTask.sortIndex = expirationTime
    // 过期的任务会被推入 taskQueue
    push(taskQueue, newTask)
    // ......

    // 执行 taskQueue 中的任务
    requestHostCallback(flushWork)
  }
  return newTask
}
```

unstable_scheduleCallback 的主要工作是针对当前任务创建一个 task，然后结合 startTime 信息将这个 task 推入 timerQueue 或 taskQueue，
最后根据 timerQueue 和 taskQueue 的情况，执行延时任务或即时任务。

几个概念：
- startTime：任务的开始时间
- expirationTime: 与优先级相关，值越小，优先级越高
- timerQueue：一个 以 startTime 为排序依据的小顶堆，存储的是 startTime 大于当前时间的任务[待执行]
- taskQueue：一个 以 expirationTime 为排序依据的小顶堆，存储的事 startTime 小于当前时间的任务[已过期]

若判断当前任务是待执行任务，那么该任务会在 sortIndex 属性被赋值为 startTime 后，被推入 timerQueue。

取出 taskQueue 堆顶元素，若为空，则当前没有已过期任务。在没有已过期任务的情况下会判断 timerQueue 未过期任务队列中的情况。

timerQueue 作为一个小顶堆，排序依据为 sortIndex 属性的大小。这里的 sortIndex 属性取值为 startTime，意味着小顶堆的堆顶任务一定是整个 timerQueue 堆结构里 startTime 最小的任务，也就是需要最早被执行的未过期任务。

若 newTask 得到的是 timerQueue 中需要最早被执行的未过期任务，那么 unstable_scheduleCallback 会通过调用 requestHostTimeout，为当前任务发起一个延时调用。

这个延时调用（handleTimeout）并不会直接调度执行当前任务，而是在当前任务到期后，从 timerQueue 中取出，加入到 taskQueue 中，然后触发对 flushWork 的调用。
真正的调度过程是在 flushWork 中进行的。flushWork 中将调用 workLoop，workLoop 会逐一执行 taskQueue 中的人物，直到调度过程被暂停（时间片用尽）或任务全部被清空。

与 timerQueue 不同的是，taskQueue 是一个以 expirationTime 为 sortIndex 排序依据的小顶堆。
对于已过期任务，React 在将其推入 taskQueue 后，会通过 requestHostCallback(flushWork) 发起一个针对 flushWork 的即时任务，而 flushWork 会执行 taskQueue 中过期的任务。

当前 React 17 发起 Task 调度的姿势有两个：setTimeout、MessageChannel。在宿主环境不支持 MessageChannel 的情况下，会降级到 setTimeout。都是异步任务。

因此，requestHostCallback 发起的即时任务，最早也要等到下一次时间循环才能够执行。
