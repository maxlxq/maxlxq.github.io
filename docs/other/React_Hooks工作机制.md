
# React-Hooks 工作机制

使用原则：
- 只在 React 函数中调用 Hook
- 不要在循环、条件或嵌套函数中调用 Hook

目的：
- 确保 Hooks 在每次渲染时都保持同样的执行顺序

从源码调用流程看原理：Hooks 的正常运作，在底层依赖于顺序链表

## 以 useState 为例，分析 React-Hooks 的调用链路

React-Hooks 的调用链路在**首次渲染**和**更新阶段**是不同的。

首次渲染过程：
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
mountState 源码
</summary>

```javascript
// 进入 mountState 逻辑
```
</details>
