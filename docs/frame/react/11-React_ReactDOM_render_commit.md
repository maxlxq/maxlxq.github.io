# ReactDOM.render 调用栈 —— commit 阶段

render 阶段从 beginWork 切入，摸索出了 Fiber 节点的创建链路和 Fiber 树的构建链路。

这里从 completeWork 切入，寻找 Fiber 树和 DOM 树之间的关联。

## completeWork —— 将 Fiber 节点映射为 DOM 节点

从 performUnitOfWork 到 completeWork，中间的调用链路为：

```javascript
/**
 *       performUnitOfWork
 *               |
 *       completeUnitOfWork
 *               |
 *          completeWork
 */
```

<details>
<summary>
performUnitOfWork 是如何调用 completeUnitOfWork 的
</summary>

```javascript
function performUnitOfWork(unitOfWork) {
  // ...
  var current = unitOfWork.alternate
  var next
  if (xxx /* xxx 条件 */) {
    // ... 额外操作
    // 创建当前节点的子节点
    next = beginWork$1(current, unitOfWork, subtreeRenderLanes)
    // ... 额外操作
  } else {
    // 创建当前节点的子节点
    next = beginWork$1(current, unitOfWork, subtreeRenderLanes)
  }
  // ...
  if (next === null) {
    // 调用 completeUnitOfWork
    completeUnitOfWork(unitOfWork)
  } else {
    // 将当前节点更新为新创建出的 Fiber 节点
    workInProgress = next
  }
  // ...
}
```

</details>

performUnitOfWork 每次会尝试调用 beginWork 来创建当前节点的子节点，若创建出的子节点为空，则说明当前节点是一个叶子节点。
按照深度优先遍历的原则，当遍历到叶子节点时，需要回归。此时，就会调用 completeUnitOfWork ，执行当前节点对应的 completeWork 逻辑。

## completeWork 工作原理

<details>
<summary>
提取 completeWork 的源码结构和主体逻辑
</summary>

```javascript
function completeWork(current, workInProgress, renderLanes) {
  // 取出 Fiber 节点的属性值，存储在 newProps 里
  var newProps = workInProgress.pendingProps

  // 根据 workInProgress 节点的 tag 属性的不同，决定要进入哪段逻辑
  switch (workInProgress.tag) {
    case Other/* ...... */:
      return null
    case ClassComponent:
      {
        // .....
      }
    case HostRoot:
      {
        // ......
      }
    // h1 节点的类型属于 HostComponent，因此这里为你讲解的是这段逻辑
    case HostComponent:
      {
        popHostContext(workInProgress)
        var rootContainerInstance = getRootHostContainer()
        var type = workInProgress.type
        // 判断 current 节点是否存在，因为目前是挂载阶段，因此 current 节点是不存在的
        if (current !== null && workInProgress.stateNode != null) {
          updateHostComponent$1(current, workInProgress, type, newProps, rootContainerInstance)
          if (current.ref !== workInProgress.ref) {
            markRef$1(workInProgress)
          }
        } else {
          // 这里首先是针对异常情况进行 return 处理
          if (!newProps) {
            if (!(workInProgress.stateNode !== null)) {
              {
                throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.")
              }
            }
            return null
          }

          // 接下来就为 DOM 节点的创建做准备了
          var currentHostContext = getHostContext()
          // _wasHydrated 是一个与服务端渲染有关的值，这里不用关注
          var _wasHydrated = popHydrationState(workInProgress)

          // 判断是否是服务端渲染
          if (_wasHydrated) {
            // 这里不用关注，请你关注 else 里面的逻辑
            if (prepareToHydrateHostInstance(workInProgress, rootContainerInstance, currentHostContext)) {
              markUpdate(workInProgress)
            }
          } else {
            // 这一步很关键， createInstance 的作用是创建 DOM 节点
            var instance = createInstance(type, newProps, rootContainerInstance, currentHostContext, workInProgress)
            // appendAllChildren 会尝试把上一步创建好的 DOM 节点挂载到 DOM 树上去
            appendAllChildren(instance, workInProgress, false, false)
            // stateNode 用于存储当前 Fiber 节点对应的 DOM 节点
            workInProgress.stateNode = instance

            // finalizeInitialChildren 用来为 DOM 节点设置属性
            if (finalizeInitialChildren(instance, type, newProps, rootContainerInstance)) {
              markUpdate(workInProgress)
            }
          }
          // ......
        }
        return null
      }
    case HostText:
      {
        // ......
      }
    case SuspenseComponent:
      {
        // ......
      }
    case HostPortal:
      // ......
      return null
    case ContextProvider:
      // ......
      return null
    // ......
  }
  {
    {
      throw Error("Unknown unit of work tag (" + workInProgress.tag + "). This error is likely caused by a bug in React. Please file an issue.")
    }
  }
}
```

</details>

1. completeWork 的核心逻辑是一段体量巨大的 switch 语句，在这段 switch 语句中，completeWork 将根据 workInProgress 节点的 tag 属性的不同，进入不同的 DOM 节点的创建、处理逻辑
2. completeWork 中的 current、workInProgress 分别对应的是通过 alternate 连接的 Fiber 树

其中 workInProgress 树代表的是 当前正在 render 中的树，而 current 树则代表已经存在的树

workInProgress 节点和 current 节点 之间通过 alternate 属性相互连接。

在组件挂载阶段，current 树只有一个 rootFiber 节点，并没有其他内容。此时 workInProgress 节点对应的 current 节点是 null。

总结，关于 completeWork：

1. completeWork 工作内容：负责处理 Fiber 节点到 DOM 节点的映射处理。
2. completeWork 内部有三个 关键动作：
   1. 创建 DOM 节点 CreateInstance
   2. 将 DOM 节点插入到 DOM 树中 AppendAllChildren
   3. 为 DOM 节点设置属性 FinalizeInitialChildren
3. 创建好的 DOM 节点会被赋值给 workInProgress 节点的 stateNode 属性。所以定位一个 Fiber 对应的 DOM 节点时，访问它的 stateNode 属性就可以了。
4. 将 DOM 节点插入到 DOM 树的操作是通过 appendAllChildren 函数来完成的。

说是将 DOM 节点插入到 DOM 树里去，实际上是将子 Fiber 节点所对应的 DOM 节点挂载到其父 Fiber 节点所对应的 DOM 节点里去。

> Q: 那么如果执行 appendAllChildren 时，父级的 DOM 节点还不存在怎么办？
>
> A: 比如 h1 节点作为第一个进入 completeWork 的节点，它的父节点 div 对应的 DOM 就尚不存在。
> 其实不存在也没关系，反正 h1 DOM 节点被创建后，会作为 h1 Fiber 节点的 stateNode 属性存在，丢不掉的。
> 当父节点 div 进入 appendAllChildren 逻辑后，会逐个向下查找并添加自己的后代节点，
> 这时候，h1 就会被它的父级 DOM 节点“收入囊中”啦~

## completeUnitOfWork —— 开启收集 EffectList 的 "大循环"

completeUnitOfWork 的作用是开启一个大循环，重复做下面三件事：

1. 针对传入的当前节点，调用 completeWork
2. 将当前节点的副作用链 EffectList 插入到其父节点对应的副作用链 EffectList 中
3. 以当前节点为起点，循环遍历其兄弟节点及其父节点。当遍历到兄弟节点时，将 return 掉当前调用，触发兄弟节点对应的 performUnitOfWork 逻辑；而遍历到父节点时，则会直接进入下一轮循环，重复1、2逻辑

## completeUnitOfWork 开启下一轮循环的原则

步骤三 相关源码

```javascript
do {
  // ...
  // 获取当前节点的兄弟节点
  var siblingFiber = completedWork.sibling

  // 若兄弟节点存在
  if (siblingFiber !== null) {
    // 将 workInProgress 赋值为当前节点的兄弟节点
    workInProgress = siblingFiber
    // 将正在进行的 completeUnitOfWork 逻辑 return 掉
    return
  }

  // 若兄弟节点不存在，则 completeWork 会被赋值为 returnFiber，也就是当前节点的父节点
  completedWork = returnFiber
  // workInProgress 与 completedWork 保持一致
  workInProgress = completedWork
} while (completedWork !== null)
```

当前节点处理完成之后，寻找下一个可以处理的节点。

值得注意的是，completeUnitOfWork 中处理兄弟节点和父节点的顺序是：先检查兄弟节点是否存在，若存在则优先处理兄弟节点；
确认没有待处理的兄弟节点后，才转而处理父节点。这意味着，completeWork 的执行是严格自底向上的，子节点的 completeWork 总会先于父节点执行。

## 副作用链 effectList 的设计与实现

无论是 beginWork 还是 completeWork，应用对象都是 workInProgress 树上的节点。
render 阶段是一个递归过程，递归的对象就是这个 workInProgress 树。

**render 阶段的工作目标是 找出界面中需要处理的更新。**

并非是所有的节点上都会产生需要处理的更新。
比如在 挂载阶段，React 会发现实际只需要对 App 节点执行一个挂载操作即可；

更新阶段与挂载阶段的主要区别在于 更新阶段的 current 树不为空。

> 怎么才能让渲染器又快又好地定位到真正需要更新的节点？

commit 只负责实现更新，而不负责寻找更新。此时，副作用链 effectList 的价值体现出来了。

副作用链 effectList 可以理解为 render 阶段 工作成果的集合：
每个 Fiber 节点都维护者一个属于它自己的 effectList，effectList 在数据结构上以链表的形式存在，
链表内的每一个元素都是一个 Fiber 节点。这些 Fiber 节点需要满足两个共性：

1. 都是当前 Fiber 节点的后代节点
2. 都有待处理的副作用

Fiber 节点的 effectList 里记录的并非它自身的更新，而是其需要更新的后代节点。

因为 completeWork 是自底向上执行的，所以每次处理到一个节点，都将当前节点的 effectList 插入到其父节点的 effectList 中。
那么当所有节点的 completeWork 都执行完毕时，在 rootFiber 上，拿到了一个存储了当前 Fiber 树所有 effect Fiber 的 effectList。

把所有需要更新的 Fiber 节点单独串成一串链表，方便后续有针对性地对它们进行更新，这就是所谓的 收集副作用 的过程。

effectList 链表在 Fiber 节点是通过 firstEffect 和 lastEffect 来维护的。
其中 firstEffect 表示 effectList 的第一个节点，lastEffect 记录最后一个节点。

effectList 的创建，为 firstEffect 和 lastEffect 各赋值一个引用即可。
completeUnitOfWork 源码中提取相关逻辑如下：

```javascript
// 若副作用类型的值大于“PerformedWork”，则说明这里存在一个需要记录的副作用
if (flags > PerformedWork) {
  // returnFiber 是当前节点的父节点
  if (returnFiber.lastEffect !== null) {
    // 若父节点的 effectList 不为空，则将当前节点追加到 effectList 的末尾去
    returnFiber.lastEffect.nextEffect = completedWork
  } else {
    // 若父节点的 effectList 为空，则当前节点就是 effectList 的 firstEffect
    returnFiber.firstEffect = completedWork
  }

  // 将 effectList 的 lastEffect 指针后移一位
  returnFiber.lastEffect = completedWork
}
```

## commit 阶段工作流简析

commit 会在 performSyncWorkOnRoot 中被调用。

commit 共分为 3 个阶段：before mutation、mutation、layout

- before mutation 阶段，这个阶段 DOM 节点还没有被渲染到界面上去，过程会触发 getSnapshotBeforeUpdate，也会处理 useEffect 钩子相关的调度逻辑。
- mutation 阶段，负责 DOM 节点的渲染。遍历 effectList，根据 flags 的不同，执行不同的 DOM 操作。
- layout 阶段，处理 DOM 渲染完毕之后的收尾逻辑。比如 调用 componentDidMount/componentDidUpdate，调用 useLayoutEffect 钩子函数的回调等。除此之外，还会把 fiberRoot 的 current 指针指向 workInProgress Fiber 树。

commit 阶段 是一个 绝对同步的过程。render 阶段可以同步也可以异步。
