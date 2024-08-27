# React 解读

> 转载自掘金文章：[React17 源码分析](https://juejin.cn/post/6898635086657224717)
> author: [xfz](https://juejin.cn/user/1415826705485128)

## 15 版本特点

React 15 的架构分为两层

- Reconciler 协调器：用于收集需要更新的组件、patch Vnode 更新标识
- Renderer 渲染器：将变化后的组件进行 dom-diff => 渲染到页面上

> 15版本的reconciler 是 stack-reconciler。采用递归方式工作，同步进行，在生成虚拟dom树并diff的时候无法中断。
>
> 当组件层级过深时，会造成线程一直被占用，浏览器无法布局和绘制，造成丢帧、卡顿

## 16 版本特点

React 16 的架构分为三层

- Scheduler 调度器：调度任务的优先级，高优先级的优先进入 Reconciler 阶段
- Reconciler 协调器：收集需要更新的组件：fiber root 构建 - patch - Vnode 标识
- Renderer 渲染器：将变化后的组件进行 dom-diff => 渲染到页面上

## 17 版本特点

> 在 V16 版本中，以 expirationTime 的大小来衡量优先级，expirationTime 越大，则优先级越高，
> 但如果有一个高优先级异步 IO 任务（比如 Suspense，等待接口返回再执行后续操作）
> 和低优先级的任务（比如 cpu 任务），那么按照目前的模型，高优先级任务会始终阻塞低优先级任务
> 低优先级任务需要等待，直至高优先级 IO 任务执行完毕才会被执行，
> 这样是不合理的，如何更好的处理高优先级和低优先级任务？

使用 lanes 模型替代 expirationTime 模型

- lanes 优先级管理: 解决了从前的每次只能执行一个任务，到现在可以同时执行多个任务的能力
  - lanes 指定一个连续的优先级区间，如果 update 的优先级在这个区间内，则将位于该区间内的任务生成对应的页面快照
  - lanes 使用 31 位的二进制，其中每个 bit 被称为一个 lane，代表优先级；
  - 某几个 lane 组成的二进制数被称为一个 lanes，代表一批优先级，这样 react 可以分别给 IO 任务、低优先级的任务分配不同的 lane，最后可以并发执行这几种类型的优先级

> 其本质是[**叠加算法**]，多个任务可以叠加表示，用 JS 来表示就是一个状态队列 `{ lanes: [1, 2, 3] }`,
> 表示 fiber 有三个不同的优先级，他们应该被批处理
>
> React 作者 acdlite 觉得操作状态队列不够方便，进而采用了一种"位运算代替状态队列"的方式：
> `{ lanes: 0b10010 }`, 新的 lane 算法中， lanes 是一个二进制数，比如 `10010` 是由 `10000` and `00010` 两个任务叠加而成

Fiber 及相关源码处理 详见文章：[Fiber详解](https://blog.ahulib.com/blog/Fiber详解)

### 生命周期变更

![React 16.4 以上生命周期](https://blog-1251891330.cos.ap-shanghai.myqcloud.com/image/interview/react_lifestyle.png)

#### 挂载阶段

- constructor
- static getDerivedStateFromProps
- render
- componentDidMount

#### 更新阶段

- static getDerivedStateFromProps
- shouldComponentUpdate
- render
- getSnapshotBeforeUpdate
- componentDidUpdate

#### 卸载阶段

- componentWillUnmount

#### 错误处理

- static getDerivedStateFromError
- componentDidCatch

### Hook 是什么？常用的 API，最佳实践

### Fiber 是什么？

### 一次渲染流程

### 一次更新流程

## 源码解析
