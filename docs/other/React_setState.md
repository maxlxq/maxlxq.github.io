
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

