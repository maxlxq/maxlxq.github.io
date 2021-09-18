# 如何理解 Fiber 架构的迭代动机和设计思想

Stack Reconciler 逐渐显露疲态，为了进一步贯彻"快速响应"原则，React 团队在 16.x 版本中将最核心的 Diff 算法重写，使其以 "Fiber Reconciler" 的全新面貌示人。

所以，Stack Reconciler 有什么局限性？Fiber 架构又是什么？基于 Fiber 实现的调和过程又有什么不同？

## 前置知识：单线程的 JavaScript 与多线程的浏览器

JavaScript 线程和渲染线程必须是互斥的，否则渲染线程刚绘制好的画面，就有可能同时被一段 JavaScript 代码修改的面目全非。

事件线程，浏览器的事件循环机制决定了事件任务是由一个异步队列来维持的。当事件被触发时，会添加到任务队列的末尾，等待 JavaScript 的同步代码执行完成后，在空闲的时间里执行出队。
倘若 JavaScript 线程长时间地占用了主线程，那么渲染层面的更新就不得不长时间地等待，界面长时间不更新，就会给用户带来"卡顿"的体验。哪怕用户点来点去祈求一些响应，但很抱歉，这些点击时间也在等待 JavaScript，难以被响应。

## 为什么会产生"卡顿"这样的困局？

stack Reconciler 所带来的一个无解的问题，正是 JavaScript 对主线程的超时占用问题。

Stack Reconciler 是一个同步递归过程。这个过程不可以被打断，当处理结构相对复杂、体量相对庞大的虚拟 DOM 树时，Stack Reconciler 需要的调和时间会更长，这就意味着 JavaScript 线程长时间地霸占主线程，进而导致渲染卡顿/卡死、长时间无响应等问题。

## 设计思想：Fiber 是如何解决问题的

Fiber 是比纤维还要纤细的一个过程。

从架构角度，Fiber 是对 React 核心算法的重写；
从编码角度，Fiber 是 React 内部所定义的一种数据结构，是 Fiber 树的节点单位，也就是新架构下的"虚拟 DOM"；
从工作流角度，Fiber 节点保存了组件需要更新的状态和副作用，一个 Fiber 同时也对应着一个工作单元。

Fiber 架构实现了"增量渲染"。将一个渲染任务分解为多个渲染任务，然后分散到多个帧里面。目的是实现任务的可中断、可恢复，并给不同的任务赋予不同的优先级，最终达成更加顺滑的用户体验。

## Fiber 架构核心："可中断"、"可恢复"与"优先级"

React 16 之前，React 渲染和更新阶段依赖的是：Reconciler 和 Renderer。

- Reconciler 负责对比出新老虚拟 DOM 之间的变化
- Renderer 负责将变化的部分应用到视图上

这两个过程是严格同步的。

React 16 中，为实现"可中断"和"优先级"，架构变为三层：Scheduler、Reconciler、Renderer

- Scheduler 是调度器，作用是调度更新的优先级。

更新的处理工作流变为：每个更新任务都会被赋予一个优先级，当更新任务抵达调度器时，高优先级的更新任务会更快地被调度进 Reconciler 层；当更高优先级的更新任务进入时，调度器检查后会中断当前处于 Reconciler 的任务，将此任务推入 Reconciler 层。
等任务完成渲染后，新一轮调度开始，之前被中断的任务会被重新推入 Reconciler 层，继续渲染。

以上是对"可中断"、"可恢复"与"优先级"三个核心概念的处理。

## Fiber 架构对生命周期的影响

- render 阶段：纯净且没有副作用，可能会被 React 暂停、终止或重新启动
- pre-commit 阶段：可以读取 DOM
- commit 阶段：可以使用 DOM，运行副作用，安排更新

render 阶段，React 主要在内存中做计算，明确 DOM 输的更新点；
commit 阶段，则负责把 render 阶段生成的更新真正地执行掉；

React 15 中的 递归计算，在 React 16 中被划分为一个个工作单元，由同步转为异步。

React 16 再根据每个工作单元的优先级去实现工作单元的打断和恢复。由于 render 阶段对用户来说是不可见的，所以就算打断再重启，用于也无法感知。
但工作单元的重启将会伴随着部分生命周期的重复执行，这些生命周期有：

- componentWillMount
- componentWillUpdate
- shouldComponentUpdate
- componentWillReceiveProps

## 总结

<details>
<summary>
为什么会出现 Fiber 架构？
</summary>

React 15中不可打断的同步递归问题，造成的卡顿、卡死等问题。所以 React 16 提出新的架构，将调和过程由同步递归，改为异步处理，升级优化。
</details>

<details>
<summary>
Fiber 是什么？
</summary>

从架构角度，Fiber 是对 React 核心算法的重写；
从编码角度，Fiber 是 React 内部所定义的一种数据结构，是 Fiber 树的节点单位，也就是新架构下的"虚拟 DOM"；
从工作流角度，Fiber 节点保存了组件需要更新的状态和副作用，一个 Fiber 同时也对应着一个工作单元。

Fiber 架构实现了"增量渲染"。将一个渲染任务分解为多个渲染任务，然后分散到多个帧里面。目的是实现任务的可中断、可恢复，并给不同的任务赋予不同的优先级，最终达成更加顺滑的用户体验。
</details>

<details>
<summary>
如何理解 Fiber 架构核心："？断"、"可恢复"与"优先级"
</summary>

Fiber 更新的处理工作流变为：每个更新任务都会被赋予一个优先级，当更新任务抵达调度器时，高优先级的更新任务会更快地被调度进 Reconciler 层；当更高优先级的更新任务进入时，调度器检查后会中断当前处于 Reconciler 的任务，将此任务推入 Reconciler 层。
等任务完成渲染后，新一轮调度开始，之前被中断的任务会被重新推入 Reconciler 层，继续渲染。
</details>
