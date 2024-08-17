
# React-Hooks 工作机制

使用原则：

- 只在 React 函数中调用 Hook
- 不要在循环、条件或嵌套函数中调用 Hook

目的：

- 确保 Hooks 在每次渲染时都保持同样的执行顺序

从源码调用流程看原理：Hooks 的正常运作，在底层依赖于顺序链表

## 以 useState 为例，分析 React-Hooks 的调用链路

React-Hooks 的调用链路在**首次渲染**和**更新阶段**是不同的。

### 首次渲染过程

```javascript
/**
 *             useState
 *                ||
 *                ||
 *                👇
 * 通过 resolveDispatcher 获取 dispatcher
 *                ||
 *                ||
 *                👇
 *      调用 dispatcher.useState
 *                ||
 *                ||
 *                👇
 *          调用 mountState
 *                ||
 *                ||
 *                👇
 *            返回目标数组
 */
```

初次渲染流程中，useState 触发的操作会落到 mountState 里面。
看一下 mountState 源码

<details>
<summary>
mountState 源码，mountState 的主要工作是初始化 Hooks
</summary>

```typescript
// 进入 mountState 逻辑
function mountState<S>(
  initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
  // 将新的 hook 对象追加进链表底部
  const hook = mountWorkInProgressHook();

  // initialState 可以是一个回调函数，如果是回调，则取回调执行后的值
  if (typeof initialState === 'function') {
    // $FlowFixMe: Flow doesn't like mixed types
    // 对 initialState 重新赋值
    initialState = initialState();
  }

  // memorizedState 存储初始化的 initialState，后期用于记录上次渲染过程中最终获得的 state
  hook.memoizedState = hook.baseState = initialState;

  // 创建 hook 对象的更新队列，这一步主要是为了能够依序保留 dispatch
  const queue = (hook.queue = {
    pending: null,
    interleaved: null,
    lanes: NoLanes,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: (initialState: any),
  });
  // 由 dispatchAction 方法创建 dispatch，内部更新 queue 的 pending [循环链表]、interleaved、lanes
  const dispatch: Dispatch<
    BasicStateAction<S>,
    > = (queue.dispatch = (dispatchAction.bind(
    null,
    currentlyRenderingFiber,
    queue,
  ): any));
  // 返回目标数组，dispatch 其实就是常见的 setXXX 函数
  return [hook.memoizedState, dispatch];
}
```

</details>

<details>
<summary>
mountWorkInProgress 方法道出了 Hooks 背后的数据结构组织形式。
</summary>

```typescript
//
function mountWorkInProgressHook(): Hook {
  // 单个 hook 是以对象的形式存在的
  const hook: Hook = {
    memoizedState: null,

    baseState: null,
    baseQueue: null,
    queue: null,

    next: null,
  };

  if (workInProgressHook === null) {
    // This is the first hook in the list
    // 将 hook 作为链表的头部节点处理
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
  } else {
    // Append to the end of the list
    // 若链表不为空，则将 hook 追加到尾部
    workInProgressHook = workInProgressHook.next = hook;
  }
  // 返回当前的 hook
  return workInProgressHook;
}
```

</details>

hook 相关的所有信息收敛在一个 hook 对象里，而 hook 对象之间以单向链表的形式互相串联。

### 更新过程

```javascript
/**
 *             useState
 *                ||
 *                ||
 *                👇
 * 通过 resolveDispatcher 获取 dispatcher
 *                ||
 *                ||
 *                👇
 *      调用 dispatcher.useState
 *                ||
 *                ||
 *                👇
 *         调用 updateState
 *                ||
 *                ||
 *                👇
 *         调用 updateReducer
 *                ||
 *                ||
 *                👇
 *            返回目标数组
 */
```

首次渲染和更新渲染的区别，在于调用的是 mountState 还是 updateState。

mountState 用来初始化 Hooks。

updateState 要做的就是：按**顺序遍历**之前构建好的链表，取出对应的数据信息进行渲染。

所以，**hooks 的渲染是 通过"依次遍历"来定位每个 hooks 内容的。如果前后两次读到的链表在顺序上出现差异，那么渲染的结果自然是不可控的。**
