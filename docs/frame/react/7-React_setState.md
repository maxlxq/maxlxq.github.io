
# setState 到底是同步的，还是异步的

## 从一道面试题说起

```javascript
import React from 'react'

import './styles.css'

export default class App extends React.Component{
  state = {
    count: 0
  }

  increment = () => {
    console.log('increment setState前的count', this.state.count)
    this.setState({
      count: this.state.count + 1
    })
    console.log('increment setState后的count', this.state.count)
  }

  triple = () => {
    console.log('triple setState前的count', this.state.count)
    this.setState({
      count: this.state.count + 1
    })
    this.setState({
      count: this.state.count + 1
    })
    this.setState({
      count: this.state.count + 1
    })
    console.log('triple setState后的count', this.state.count)
  }

  reduce = () => {
    setTimeout(() => {
      console.log('reduce setState前的count', this.state.count)
      this.setState({
        count: this.state.count - 1
      })
      console.log('reduce setState后的count', this.state.count)
    },0)
  }

  render() {
    return <div>
      <button onClick={this.increment}>点我增加</button>
      <button onClick={this.triple}>点我增加三倍</button>
      <button onClick={this.reduce}>点我减少</button>
    </div>
  }
}
```

- 点击第一个按钮，触发 `increment` 方法，打印
```javascript
// 0
// 0
```

- 点击第二个按钮，触发 `triple` 方法，打印
```javascript
// 点完第一个之后，count 为 1
// 1
// 1
```

- 点击第三个按钮，触发 `reduce` 方法，打印
```javascript
// 点完第一个之后，count 为 2，因为批量更新，多个 setState 只会保留最后一次逻辑。
// 2
// 1
```

### 异步的动机和原理：批量更新

setState 之后会触发一套完整的更新流程，涉及到包括 re-render 在内的多个步骤。

re-render 本身涉及对 DOM 的操作，会带来较大的性能开销。

避免频繁的 re-render。

在实际的 React 运行时中，每来一个 setState，就把它塞进一个队列里"攒起来"。等时机成熟，再把"攒起来"的 state 结果做合并，最后只针对最新的 state 值走一次更新流程。
这个过程，叫做"批量更新"。

只要我们的同步代码还在执行，"攒起来"这个动作就不会停止。
所以，在同一个方法中多次 setState 的合并动作并不是单纯地将更新累加，而是多次 setState，对于相同属性的设置，只会保留最后一次的更新。

### 从源码角度看 setState 工作流

接下来理解 setState 中出现的 同步现象。

```javascript
reduce = () => {
  setTimeout(() => {
    console.log('reduce setState前的count', this.state.count)
    this.setState({
      count: this.state.count - 1
    })
    console.log('reduce setState后的count', this.state.count)
  }, 0)
}
```

这段代码，打印结果为：2、1。跟之前理解的异步现象有所区别。

为什么 setTimeout 可以将 setState 的执行顺序从异步变为同步？

结论：并不是 setTimeout 改变了 setState，而是帮助 setState 脱离了 React 的控制。只要在 React 管理下的 setState，一定是异步的。

### 解读 setState 工作流

setState => enqueueSetState => enqueueUpState => isBatchingUpdates?

isBatchingUpdates 为 true 时，组件进入 dirtyComponents。

isBatchingUpdates 为 false 时，循环更新 dirtyComponents 里所有组件。

```javascript
ReactComponent.prototype.setState = function (partialState, callback) {
  this.updater.enqueueSetState(this, partialState)
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState')
  }
}
```

```javascript
enqueueSetState: function enqueueSetState(publicInstance, partialState) {
  // 根据 this 拿到对应的组件实例
  var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setState');
  // 这个 queue 对应的就是一个组件实例的 state 数组
  var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = []);
  queue.push(partialState);
  //  enqueueUpdate 用来处理当前的组件实例
  enqueueUpdate(internalInstance);
}
```

enqueueSetState 做了两件事：
- 将新的 state 放进组件的状态队列里
- 用 enqueueUpdate 来处理将要更新的实例对象

```javascript
function enqueueUpdate(component) {
  ensureInjected();
  // 注意这一句是问题的关键，isBatchingUpdates标识着当前是否处于批量创建/更新组件的阶段
  if (!batchingStrategy.isBatchingUpdates) {
    // 若当前没有处于批量创建/更新组件的阶段，则立即更新组件
    batchingStrategy.batchedUpdates(enqueueUpdate, component);
    return;
  }
  // 否则，先把组件塞入 dirtyComponents 队列里，让它“再等等”
  dirtyComponents.push(component);
  if (component._updateBatchNumber == null) {
    component._updateBatchNumber = updateBatchNumber + 1;
  }
}
```

enqueueUpdate 引出了 batchingStrategy 对象，该对象中的 isBatchingUpdates 属性直接决定了当下是要走更新流程还是应该排队等待；
其中 batchedUpdates 方法更是能够直接发起更新流程。

所以，可以推测，batchingStrategy 或许就是 React 内部专门用于管理批量更新的对象。

```javascript
/**

 * batchingStrategy源码

**/



var ReactDefaultBatchingStrategy = {
  // 全局唯一的锁标识
  isBatchingUpdates: false,

  // 发起更新动作的方法
  batchedUpdates: function(callback, a, b, c, d, e) {
    // 缓存锁变量
    var alreadyBatchingStrategy = ReactDefaultBatchingStrategy. isBatchingUpdates
    // 把锁“锁上”
    ReactDefaultBatchingStrategy. isBatchingUpdates = true

    if (alreadyBatchingStrategy) {
      callback(a, b, c, d, e)
    } else {
      // 启动事务，将 callback 放进事务里执行
      transaction.perform(callback, null, a, b, c, d, e)
    }
  }
}
```

可以认为 batchingStrategy 对象是一个 "锁管理器"。

锁 指的是 isBatchingUpdates 变量。false 表示 未进行任何批量更新操作；true 表示 正处于批量更新过程。

当锁被锁上时，任何需要更新的组件需要进入 dirtyComponents 里排队等候下一次的批量更新。

### 理解 React 中的 Transaction 机制

```javascript
transaction.perform(callback, null, a, b, c, d, e)
```

```javascript
/* <pre>
 *                       wrappers (injected at creation time)
 *                                      +        +
 *                                      |        |
 *                    +-----------------|--------|--------------+
 *                    |                 v        |              |
 *                    |      +---------------+   |              |
 *                    |   +--|    wrapper1   |---|----+         |
 *                    |   |  +---------------+   v    |         |
 *                    |   |          +-------------+  |         |
 *                    |   |     +----|   wrapper2  |--------+   |
 *                    |   |     |    +-------------+  |     |   |
 *                    |   |     |                     |     |   |
 *                    |   v     v                     v     v   | wrapper
 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
 * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | +---+ +---+   +---------+   +---+ +---+ |
 *                    |  initialize                    close    |
 *                    +-----------------------------------------+
 * </pre>
 */
```

Transaction 就像是一个壳子，首先会讲目标函数用 wrapper 封装一层，同时使用 Transaction 类暴露的 perform 方法去执行它。

### 同步现象的本质

ReactDefaultBatchingStrategy 是一个批量更新策略事务，它的 wrapper 有两个：
- FLUSH_BATCHED_UPDATES
- RESET_BATCHED_UPDATES

```javascript
var RESET_BATCHED_UPDATES = {
  initialize: emptyFunction,

  close: function () {
    ReactDefaultBatchingStrategy.isBatchingUpdates = false;
  }
};
var FLUSH_BATCHED_UPDATES = {
  initialize: emptyFunction,
  close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
};
var TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];
```

在 callback 执行完之后，RESET_BATCHED_UPDATES 将 isBatchingUpdates 设为 false，FLUSH_BATCHED_UPDATES 执行 flushBatchedUpdates， 然后里面会循环所有 dirtyComponent，调用 updateComponent 来执行所有的生命周期方法，最后实现组件的更新。

那么，为什么 setState 会表现同步？
- 因为 batchedUpdates 这个方法，不仅仅会在 setState 之后才被调用。

```javascript
// ReactMount.js
_renderNewRootComponent: function _renderNewRootComponent(nextElement, container, shouldReuseMarkup, context) {
  // 实例化组件
  var componentInstance = instantiateReactComponent(nextElement);

  // 初始渲染直接调用 batchedUpdates 进行同步渲染
  ReactUpdates.batchedUpdates(
    batchedMountComponentIntoNode,
    componentInstance,
    container,
    shouldReuseMarkup,
    context
  );
  //...
}
```

首次渲染组件是会执行的一个方法 _renderNewRootComponent，内部调用了一次 batchedUpdates。
因为在组件的渲染过程中，会按照顺序调用各个生命周期函数。而在生命周期函数中可能会调用 setState。
因此，需要开启 batch 来确保所有的更新都能够进入 dirtyComponents 里去，进而确保厨师渲染流程中所有的 setState 都是生效的。

下面是 React 时间系统中的代码，组件上绑定事件后，也可能触发 setState，为确保每一次 setState 都有效，React 同样会在此处手动开启批量更新。
```javascript
// ReactEventListener.js
dispatchEvent: function dispatchEvent(topLevelType, nativeEvent) {
  // ...
  try {
    // 处理事件
    ReactUpdates.batchedUpdates(handleTopLevelImpl, bookKeeping);
  } finally {
    TopLevelCallbackBookKeeping.release(bookKeeping);
  }
}
```

综上，isBatchingUpdates 这个变量，在 React 的生命周期函数以及合成事件执行前，已经被 React 悄悄修改为了 true。
此时 setState 操作自然不会立刻生效。当函数执行完毕后，事务的 close 方法会再把 isBatchingUpdates 改为 false。

## 总结

setState 并不是单纯同步/异步的，它的表现会因调用场景的不同而不同：
- 在 React 钩子函数及合成事件中，表现为异步
- 在 setTimeout、setInterval 等函数中，包括在 DOM 原生事件中，都表现为 同步

这种差异，本质上是由于 React 事务机制和批量更新机制的工作方式来决定的。
