
# React 16为什么要改变生命周期

## 核心部分

### 虚拟 DOM：核心算法的基石

虚拟 DOM 节点的基本形态已经有所了解。现在需要了解一下虚拟 DOM 在整个 React 工作流中的作用。

组件初始化时，会通过调用生命周期中的 render 方法，生成虚拟 DOM，然后通过调用 ReactDOM.render 方法，实现虚拟 DOM 到真实 DOM 的转换。

组件更新时，会再次通过调用 render 方法，生成新的虚拟 DOM，然后借助 diff 算法定位出两次虚拟 DOM 的差异部分，从而确定发生变化的真实 DOM，作定向更新。

### 组件化：工程化思想在框架中的落地

在 React 中，几乎所有可见或不可见的内容都可以被抽离为各种各样的组件，每个组件既是封闭的，也是开放的。

封闭，指的是 非受控组件，在组件自身的渲染工作流中，每个组件都只处理各自内部的渲染逻辑。没有数据流交互的情况下，组件与组件之间各自为政。

> 渲染工作流：从组件数据改变到组件实际更新发生的过程。

开放，指的是 受控组件，React 允许开发者基于"单向数据流"原则完成组件间通信。组件间通信又会改变双方或某一方内部的数据，进而对渲染结果构成影响。

所以 React 组件，具有高度的可重用性和可维护性。

### 生命周期的本质：组件的"灵魂"与"躯干"

render 方法比作组件的灵魂；render 之外的生命周期方法就可以理解为组件的躯干

## React 15

### 拆解 React 生命周期：从 React 15 说起

React 15 中，有如下生命周期：

```javascript
constructor()
componentWillReceiveProps()
shouldComponentUpdate()
componentWillMount()
componentWillUpdate()
componentDidUpdate()
componentDidMount()
render()
componentWillUnmount()
```

- Mounting 挂载阶段：组件的初始化渲染

挂载过程在组件中只会发生一次，挂载过程中，组件被初始化，渲染到真实 DOM 里，完成所谓的"首次渲染"。

```javascript
// 初始化渲染
constructor()
componentWillMount() // 在 render 方法之前触发，但此处的额外操作可能会带来一些风险。
render()             // 在执行过程中不会去操作真实的 DOM，只是把需要渲染的内容返回出来。真实 DOM 的渲染工作是在挂载阶段由 ReactDOM.render 来承接的。
componentDidMount()  // 真实 DOM 已经挂载到页面，可以执行真实 DOM 相关的操作，也可以执行 异步请求、数据初始化等
```

- Updating 更新阶段：组件的更新

触发更新的方式：1、父组件更新触发的更新；2、组件自身调用自己的 setState 触发的更新。

```javascript
// 组件更新
componentWillReceiveProps()
shouldComponentUpdate()
componentWillUpdate()
render()
componentDidUpdate()
```

**componentWillReceiveProps 并不是由 props 的变化触发的，而是由父组件的更新触发的。**

组件自身 setState 触发的更新。

componentWillUpdate 会在 render 前触发，可以做一些不涉及真实 DOM 的准备工作；

componentDidUpdate 在组件更新完毕之后触发，常用来处理真实 DOM 操作。

shouldComponentUpdate(nextProps, nextState)：render 方法由于伴随着对虚拟 DOM 的构建和对比，所以非常耗时。
很多时候，在 React 中会不经意间调用 render，为了避免不必要的 render 操作带来的性能消耗，React 组件会根据 shouldComponentUpdate 的返回值，来决定是否执行该方法之后的生命周期，进而决定是否 re-render。

shouldComponentUpdate 默认返回值为 true。可以手动填充判断逻辑，或直接引用 PureComponent，实现有条件的 re-render

- Unmounting 卸载阶段：组件卸载

```javascript
componentWillUnmount()
```

组件在父组件中被移除，执行 componentWillUnmount 方法。

组件中设置了 key 属性，父组件更新时发现子组件 key 与上次不一致，移除组件，执行 componentWillUnmount 方法。

## React 16

### 进化的生命周期方法：React 16 生命周期工作流

![React 16.4+ 生命周期](/other/React16_lifecycle.png)

React 16.3- 版本生命周期，getDerivedStateFromProps 由 constructor 和 new props 这两个部分触发。

React 16.4+ 中，getDerivedStateFromProps 在整个 Mounting 和 Updating 阶段都会触发。

- Mounting 阶段

```javascript
constructor()
getDerivedStateFromProps()
render()
componentDidMount()
```

移除了 componentWillMount，新增了 getDerivedStateFromProps。

getDerivedStateFromProps 不是 componentWillMount 的替代品。
设计之初的目的是替换掉 componentWillReceiveProps，因此它有且只有一个功能：使用 props 来派生或更新 state。
直观的从命名方面约束了它的用途。(从 Props 里派生 State)

> Q: 为什么 componentWillMount 被废弃？[见后续]

```javascript
// static getDerivedStateFromProps(props, state)
```

1. getDerivedStateFromProps 是一个静态方法。无法访问 this。
2. 接受两个参数：nextProps 和 prevState，表示 接收到的新 props 和 组件自身的 state。
3. 需要一个对象返回值。返回改变的元素对象，React 根据这个返回值来更新组件的 state。如果没有更新数据，一定要 return null 确保方法的正确性。

- Updating 阶段：组件更新

```javascript
getDerivedStateFromProps()
shouldComponentUpdate()
render()
getSnapshotBeforeUpdate()
componentDidUpdate()
```

> Q: 为什么要用 getDerivedStateFromProps 代替 componentWillReceiveProps？
>
> A: getDerivedStateFromProps 与 componentDidUpdate 一起使用时，覆盖过时的 componentWillReceiveProps 的所有用例。

getDerivedStateFromProps 对于早期的 componentWillReceiveProps 来说，做了合理的减法，只做一件事：**使用 props 来派生或更新 state**。
避免了如：fetch()、setState()[导致死循环] 可能带来带来的副作用的一些操作。确保生命周期函数的行为更加可控，从根源上杜绝不合理的编程方式，避免生命周期滥用。
同时，也在为新的 Fiber 架构铺路。

移除了 componentWillUpdate，新增了 getSnapshotBeforeUpdate。

```javascript
getSnapshotBeforeUpdate(prevProps, prevState) {
  // ...
}
```

getSnapshotBeforeUpdate 的返回值会作为 componentDidUpdate 的第三个参数。
执行时机在 render 之后，真实 DOM 更新之前。
这个生命周期中，可以同时获取到未更新的 真实 DOM、更新前后的 props 和 state。

getSnapshotBeforeUpdate 设计初衷：为了与 componentDidUpdate 一起，涵盖过时的 componentWillUpdate 的所有用例。

- Unmounting 阶段：组件卸载

与之前完全一致。

## React 16 为何两次改变

### Fiber 架构简析

上面介绍过程中，讲到部分生命周期为了给 Fiber 让路而替换为新的生命周期函数。那么什么是 Fiber？

Fiber 是 React 16 对 React 核心算法的一次重写。[TP: 什么是 Fiber？]

先知道，Fiber 会使原本同步的渲染过程变成异步的。

React 16 之前，每一次触发组件的更新，都会构建一个新的虚拟 DOM 树，通过与上一次的虚拟 DOM 树进行 diff，实现 DOM 的定向更新。
这个过程是递归的，调用栈很深的情况下，只有最底层的调用返回了，整个渲染过程才会逐层放回。
这个过程 漫长且不可打断；同步渲染一旦开始，就会占据主线程，直到递归结束；整个过程中，浏览器无法处理任何渲染之外的事情，进入一种无法交互的状态。所以，渲染时间稍微长一些，就能感觉到明显的卡顿，甚至卡死。

引入 Fiber 架构，恰好就能解决这个风险：Fiber 会将一个大的更新任务拆解为许多个小任务。每当执行完一个小任务，渲染线程都会把主线程交还，观察是否有优先级更高的任务要处理，避免同步渲染带来的卡顿。
而且，渲染线程是可以被打断的。

换个角度看生命周期工作流

Fiber 架构的重要特征就是 可以被打断的异步渲染模式。

![React 16 左侧阶段划分](/other/React16_lifecycle.png)

- render 阶段： 纯净且没有副作用，可能会被 React 暂停、终止或重新启动
- pre-commit 阶段：可以读取 DOM
- commit 阶段：可以使用 DOM，运行副作用，安排更新

总的来说，render 阶段在执行过程中允许被打断，commit 阶段总是同步执行。

> render 阶段的操作对 用户来说 是不可见的，所以打断再启动，对用户来说是零感知的。而 commit 阶段已经涉及到 真实 DOM 的渲染，这个过程必须用同步渲染来求稳。

### 细说生命周期"废旧立新"背后的思考

在 Fiber 机制下，render 阶段是允许暂停、终止和重启的。当一个任务执行到一半被打断后，下一次渲染线程抢回主动权时，这个任务被重启的形式是"重复执行一遍整个任务"，而非继续上次中断位置。

所以，render 阶段的生命周期都是有可能被重复执行的。

这个结论下，React 16 打算废弃如下生命周期：
- componentWillMount
- componentWillReceiveProps
- componentWillUpdate

原因：
1. setState 或 异步请求，真实 DOM 操作，完全可以转移到其他生命周期。

异步请求可以放在 componentDidMount 中。componentWillMount 中使用 异步请求，并不会比 React 中同步的生命周期快。首次渲染依旧会在数据返回之前执行。

2. 在 Fiber 带来的异步渲染机制下，可能会导致非常严重的 bug。

比如一个 付款请求 在 componentWillxxx 中触发，由于 render 阶段里的生命周期都可以重复执行，在 componentWillxxx 被打断和重启多次后，就会触发多个付款请求。

3. 即使没有开启异步，React 15 下也会有不少的死循环

比如在 componentWillReceiveProps 和 componentWillUpdate 里滥用 setState 导致重复渲染而发生死循环的。

总的来说，React 16 的改造生命周期的主要动机是：为了配合 Fiber 架构带来的异步渲染机制。

确保了 Fiber 机制下数据和视图的安全性；也确保了生命周期方法的行为更加纯粹、可控、可预测。
