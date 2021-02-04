# React

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

Fiber 相见文章：[Fiber详解](https://blog.ahulib.com/blog/Fiber详解)

## 17 版本特点
使用 lanes 模型替代 expirationTime 模型
> 在 V16 版本中，以 expirationTime 的大小来衡量优先级，expirationTime 越大，则优先级越高，但如果有一个

### 生命周期变更

### Hook 是什么？常用的 API，最佳实践。

### Fiber 是什么？

### 一次渲染流程

### 一次更新流程

## 源码解析
