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
