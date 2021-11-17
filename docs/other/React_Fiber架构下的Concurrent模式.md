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

从 update 对象到 scheduleUpdateOnFiber

scheduleUpdateOnFiber 会调度 update。
