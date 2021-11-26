# ReactDOM.render 调用栈 —— render 阶段

performSyncWorkOnRoot 标志着 render 阶段的开始，finishSyncRender 标志着 render 阶段结束。

render 阶段包含大量的 beginWork、completeWork 调用栈，它们串联起的是一个"模拟递归"的过程。

栈调和中讲过，React 15 的调和过程是一个递归的过程。
而 Fiber 架构下的调和过程，虽然并不是依赖递归来实现的，但在 RenderDOM.render 触发的同步模式下，它仍然是一个深度优先搜索的过程。
**在这个过程中，beginWork 将创建新的 Fiber 节点，而 completeWork 则负责将 Fiber 节点映射为 DOM 节点。**

## workInProgress 节点的创建（WIP)

performSyncWorkOnRoot 是 render 阶段的起点。
它调用了 renderRootSync，然后是 prepareFreshStack。

prepareFreshStack 的作用是重置一个新的堆栈环境，关注其中对 createWorkInProgress 的调用。

<details>
<summary>
createWorkInProgress 主逻辑
</summary>

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
</details>

- createWorkInProgress 调用 createFiber，workInProgress 是 createFiber 的返回值
- workInProgress 的 alternate 指向 current
- current 的 alternate 反过来指向 workInProgress

createFiber 创建了一个 FiberNode 实例，是一个 Fiber 节点类型。所以 WorkInProgress 就是一个 Fiber 节点。
```javascript
var createFiber = function (tag, pendingProps, key, mode) {
  return new FiberNode(tag, pendingProps, key, mode);
};
```
同时，workInProgress 的创建入参其实来源于 current。
```javascript
workInProgress = createFiber(current.tag, pendingProps, current.ken, current.mode)
```
所以 workInProgress 节点其实就是 current 节点的副本。

再结合 current 指向 rootFiber 对象，以及 current 和 workInProgress 通过 alternate 互相连接这些信息。

完成上述过程后，就会进入 workLoopSync 的逻辑。
```javascript
function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress)
  }
}
```
performUnitOfWork 函数将触发对 beginWork 的调用，实现对新 Fiber 节点的创建。
若新创建的 Fiber 节点不为空，则 performUnitOfWork 会用这个新的 Fiber 节点来更新 WorkInProgress 的值，为下一次循环作准备。

当 workInProgress 终于为空时，整棵 Fiber 树构建完成。

## beginWork 开启 Fiber 节点创建过程

<details>
<summary>
beginWork 相关逻辑提取
</summary>

```javascript
function beginWork(current, workInProgress, renderLanes) {
  // ...
  //  current 节点不为空的情况下，会加一道辨识，看看是否有更新逻辑要处理
  if (current !== null) {
    // 获取新旧 props
    var oldProps = current.memoizedProps
    var newProps = workInProgress.pendingProps
    // 若 props 更新或者上下文改变，则认为需要"接受更新"
    if (oldProps !== newProps || hasContextChanged() || (
     workInProgress.type !== current.type )) {
      // 打个更新标
      didReceiveUpdate = true
    } else if (xxx) {
      // 不需要更新的情况 A
      return A
    } else {
      if (`需要更新的情况 B`) {
        didReceiveUpdate = true
      } else {
        // 不需要更新的其他情况，这里我们的首次渲染就将执行到这一行的逻辑
        didReceiveUpdate = false
      }
    }
  } else {
    didReceiveUpdate = false
  }
  // ...
  // 这坨 switch 是 beginWork 中的核心逻辑，原有的代码量相当大
  switch (workInProgress.tag) {
    // ...
    // 这里省略掉大量形如"case: xxx"的逻辑
    // 根节点将进入这个逻辑
    case HostRoot:
      return updateHostRoot(current, workInProgress, renderLanes)
    // dom 标签对应的节点将进入这个逻辑
    case HostComponent:
      return updateHostComponent(current, workInProgress, renderLanes)
    // 文本节点将进入这个逻辑
    case HostText:
      return updateHostText(current, workInProgress)
    // ...
    // 这里省略掉大量形如"case: xxx"的逻辑
  }
  // 这里是错误兜底，处理 switch 匹配不上的情况
  {
    {
      throw Error(
        "Unknown unit of work tag (" +
          workInProgress.tag +
          "). This error is likely caused by a bug in React. Please file an issue."
      )
    }
  }
}

```
</details>

1. beginWork 的入参是一对用 alternate 连接起来的 workInProgress 和 current 节点
2. beginWork 的核心逻辑是根据 fiber 节点的 tag 属性的不同，调用不同节点创建函数

tag 的值会对应进入相应的 update* 逻辑。
update + 类型名 函数共同特点为：通过调用 reconcileChildren 方法，生成当前节点的子节点。

```javascript
function reconcileChildren(current, workInProgress, nextChildren, renderLanes) {
  // 判断 current 是否为 null
  if (current === null) {
    // 若 current 为 null，则进入 mountChildFibers 的逻辑
    workInProgress.child = mountChildFibers(workInProgress, null, nextChildren, renderLanes)
  } else {
    // 若 current 不为 null，则进入 reconcileChildFibers 的逻辑
    workInProgress.child = reconcileChildFibers(workInProgress, current.child, nextChildren, renderLanes)
  }
}
```

reconcileChildren 做逻辑分发，具体实现为 mountChildFibers 和 reconcileChildFibers。

```javascript
var reconcileChildFibers = ChildReconciler(true)
var mountChildFibers = ChildReconciler(false)
```

## ChildReconciler 才是最终处理 Fiber 节点的幕后函数。

<details>
<summary>
ChildReconciler 关键逻辑
</summary>

```javascript
function ChildReconciler(shouldTrackSideEffects) {
  // 删除节点的逻辑
  function deleteChild(returnFiber, childToDelete) {
    if (!shouldTrackSideEffects) {
      // Noop.
      return
    }
    // 以下执行删除逻辑
  }

  // ......

  // 单个节点的插入逻辑
  function placeSingleChild(newFiber) {
    if (shouldTrackSideEffects && newFiber.alternate === null) {
      newFiber.flags = Placement
    }
    return newFiber
  }

  // 插入节点的逻辑
  function placeChild(newFiber, lastPlacedIndex, newIndex) {
    newFiber.index = newIndex
    if (!shouldTrackSideEffects) {
      // Noop.
      return lastPlacedIndex
    }
    // 以下执行插入逻辑
  }

  // ......
  // 此处省略一系列 updateXXX 的函数，它们用于处理 Fiber 节点的更新

  // 处理不止一个子节点的情况
  function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) {
    // ......
  }
  // 此处省略一堆 reconcileXXXXX 形式的函数，它们负责处理具体的 reconcile 逻辑
  function reconcileChildFibers(returnFiber, currentFirstChild, newChild, lanes) {
    // 这是一个逻辑分发器，它读取入参后，会经过一系列的条件判断，调用上方所定义的负责具体节点操作的函数
  }
  // 将总的 reconcileChildFibers 函数返回
  return reconcileChildFibers
}
```

[查看具体文件](https://github.com/facebook/react/blob/56e9feead0f91075ba0a4f725c9e4e343bca1c67/packages/react-reconciler/src/ReactChildFiber.old.js#L253)
</details>

1. 关键入参 shouldTrackSideEffects，意为"是否需要追踪副作用"。reconcileChildFibers 和 mountChildFibers 的不同之处
2. 定义了大量对 Fiber 节点的创建、增加、删除、修改等动作，将直接或间接地被 reconcileChildFibers 调用
3. ChildReconciler 的返回值为一个 reconcileChildFibers 的函数，这个函数是一个逻辑分发器，将根据入参的不同，执行不同的 Fiber 节点操作，最终返回不同的目标 Fiber 节点

> Q：对副作用的处理不同，到底是哪里不同？
>
> A：shouldTrackSideEffects 若为 false，会直接返回。若为 true，会给 Fiber 节点搭上一个叫 "flags" 的标记。
```javascript
newFiber.flags = Placement
```

> flags 是什么
>
> React v17.0.0 版本中，属性名已经变更为 flags，早一些的版本中，更常见的是 effectTag。
>
> Placement 这个 flags 的意义，是在渲染器执行时，也就是真实 DOM 渲染时，告诉渲染器：这里需要新增 DOM 节点。
> flags 记录的是副作用的类型，所谓的副作用，React 给出的定义是"数据获取、订阅或者修改 DOM"等动作。

## Fiber 节点创建过程梳理

```javascript
/**
 *                      beginWork
 *                          ｜
 *      updateHostRoot, 进入 rootFiber 节点的处理逻辑
 *                          ｜
 *   调用 reconcileChildren 分发当前节点（此处为 rootFiber 节点）
 *           的子节点（此处为 App 节点）的创建逻辑
 *                          ｜
 *    Current 不为 null，逻辑因此被分发进 reconcileChildFibers，
 *    reconcileChildFibers 是 ChildReconciler(true) 的返回值，
 *                这意味着副作用将被追踪
 *                          ｜
 *    reconcileChildRibers 将子节点的创建逻辑分发给 reconcileSingleElement，
 *                   得到 App FiberNode
 *                          ｜
 *       调用 placeSingleChild，为 App FiberNode 打上
 *                    Placement 的标识
 *                          ｜
 *       App FiberNode 作为 rottFiber 的 child 的属性，与现有
 *               workInProgress Fiber 树建立关联
 */
```

**循环创建新的 Fiber 节点。**

```javascript
function workLoopSync() {
  while(workInProgress !== null) {
    performUnitOfWork(workInProgress)
  }
}
```

workLoopSync 循环地调用 performUnitOfWork，performUnitOfWork 主要工作是通过 调用 beginWork，来实现新 Fiber 节点的创建；
次要工作是把新创建的这个 Fiber 节点的值更新到 workInProgress 变量中。

```javascript
next = beginWork$1(current, unitOfWork, subtreeRenderLanes)
if (next === null) {
  completeUnitOfWork(unitOfWork)
} else {
  workInProgress = next
}
```

这样便能够确保每次 performUnitOfWork 执行完毕后，当前的 WorkInProgress 都存储着下一个需要被处理的节点，从而为下一次的 workLoopSync 循环做准备。

**Fiber 节点间是如何连接的**

不同的 Fiber 节点之间，将通过 child、return、sibling 这三个属性建立关系，
其中 child、return 记录的是父子节点关系，而 sibling 记录的是兄弟节点关系。

FiberNode 实例中，return 指向的是当前 Fiber 节点的父节点，而 sibling 指向的是当前节点的第一个兄弟节点。

此时的 Fiber 树本质上已经从树变成了链表。
