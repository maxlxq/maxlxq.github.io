
# React 栈调和过程是怎样的

从 React 15 入手，理解 栈调和 算法

## 调和过程与 Diff 算法

调和（Reconciliation），又译为 协调。

> 通过如 ReactDOM 等类库使之与 真实 DOM 同步。
> 这一过程叫做协调（调和）。

调和指的是将虚拟 DOM 映射到真实 DOM 的过程，Diff 过程只是其中一个环节。

React 源码结构佐证了这一点：React 从大的板块上将源码划分为 Core、Renderer、Reconciler 三部分。

其中 Reconciler 调和器所做的工作是一系列的，包括组件的挂载、卸载、更新等过程，其中更新过程涉及对 Diff 算法的调用。

所以，`调和 !== Diff`。

