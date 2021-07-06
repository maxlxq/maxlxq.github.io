
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

