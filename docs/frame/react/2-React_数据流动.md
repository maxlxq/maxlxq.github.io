
# 数据是如何在 React 组件之间流动的

React 的核心特征是 **数据驱动视图**。

```javascript
UI = Fn(Data)
```

## 组件间通信

React 数据流解决方案

### 基于 props 的单向数据流

父组件中的 state 以 props 的形式，流向子组件。

这种基于 props 传参的形式，可以实现 父-子/子-父组件通信、兄弟组件通信。

#### 父-子组件通信

原理：React 的数据流是单向的，所以父组件可以直接将 自身的 state 作为 props 传递给子组件

#### 子-父组件通信

原理：父组件将一个绑定了自身上下文的函数传递给子组件，子组件调用该函数，间接实现数据从子组件流向父组件。

#### 兄弟组件通信

原理：兄弟组件共享同一个父组件，可以通过 父-子组件通信 + 子-父组件通信，将兄弟组件通信实现。

### 为什么不推荐用 props 解决其它场景的问题

React 单向数据流的特性，导致多层组件使用 props 传参的场景会产生很深的嵌套结构。
当顶层组件想要跟底层组件通信时，要通过中间所有组件一层层传递下去，这个过程污染了中间组件的属性结构。

所以，不要层层传递 props。

## 利用"发布-订阅"模式驱动数据流

发布-订阅模式，即观察者模式，优点在于，监听事件的位置和触发事件的位置是不受限制的。

设计思路：事件的监听和事件的触发

- on(): 负责注册事件的监听器，指定事件触发时的回调函数
- emit(): 负责触发事件，可以通过传参使其在触发的时候携带数据
- off(): 负责监听器的删除

编码实现

```javascript
class customEventEmitter {
  constructor() {
    this.eventMap = {}
  }

  on = (type, handler) => {
    if (!(handler instanceof Function)) {
      throw new Error('need a function parameter')
    }
    if (!this.eventMap[type]) {
      this.eventMap[type] = []
    }
    this.eventMap[type].push(handler)
  }

  emit = (type, payload) => {
    if (this.eventMap[type]) {
      this.eventMap[type].forEach((handler, index) => {
        handler(payload)
      })
    }
  }

  off = (type, handler) => {
    if (this.eventMap[type]) {
      const idx = this.eventMap[type].indexOf(handler)
      if (idx >= 0) {
        this.eventMap[type].splice(this.eventMap[type].indexOf(handler) >>> 0, 1)
      }
    }
  }
}
```

测试

```javascript
const e = new customEventEmitter()

const fn1 = p => console.log('fn1:', p)
const fn2 = p => console.log('fn2:', p)

e.on('one', fn1)
e.on('one', fn2)

e.emit('one', 123)
// fn2: 123
// fn1: 123

e.off('one', fn2)

e.emit('one', 123)
// fn1: 123
```

## 使用 Context API 维护全局状态

React 16.4+ 之后，Context API：React.createContext、Provider、Consumer

编码角度认识 API

React.createContext 创建一个 context 对象，可以选择性的传入一个 defaultValue

```javascript
const AppContext = React.createContext(defaultValue)
```

从创建出来的 AppContext 读取 Provider、Consumer

```javascript
const { Provider, Consumer } = AppContext
```

**Provider** 提供者，使用 Provider 对组件树中的根组件进行包裹，然后传入 value 属性，这个 value 就是后续在组件树中流动的数据，它可以被 Consumer 消费。

```javascript
// App Root Component
<Provider value={{ title: 'provider', content: 'content' }}>
  <Title />
  <Content />
</Provider>
```

**Consumer** 消费者，使用 Consumer 包裹一个函数，消费 value

```javascript
<Consumer>
  {value => <div>{value.title}</div>}
</Consumer>
```

也可以使用 Hook 写法，使用 useContext

```javascript
const Child = () => {
  const context = useContext(AppContext)
  return (
    <div>
      <div>{context.title}</div>
      <div>{context.content}</div>
    </div>
  )
}
```

## 第三方数据流框架"课代表"：初探 Redux

> Redux 是 JavaScript 状态容器，它提供可预测的状态管理

Redux 是如何帮助 React 管理数据的

Redux 主要由三部分组成：store、reducer、action。

- store：单一数据源，只读
- action：对变化的描述
- reducer：函数，负责对变化进行分发和处理，将新的数据返回给 store

触发逻辑：组件派发 action，action 会被 reducer 读取，进而根据 action 内容的不同对数据进行修改，生成新的 state，这个新的 state 会更新到 store 对象中，驱动视图修改。

Redux 通过提供一个统一的状态容器，使得数据能够自由而有序地在任意组件之间穿梭。

编码角度理解 Redux 工作流

1. 使用 createStore 来完成 store 对象的创建

```javascript
// 引入 redux
import { createStore } from 'redux'

const store = createStore(
  reducer,
  initial_state,
  applyMiddleware(middleware1, middleware2, ...)
)
```

createStore 方法接收三个入参：

- reducer
- 初始状态内容
- 指定中间件：如 saga、logger

2. reducer 的作用是将新的 state 返回给 state

reducer 是一个纯函数，可以有各种内在逻辑，必须返回一个 state。

3. action 的作用是通知 reducer 让改变发生

action 本身是一个对象，需要执行 派发 action 才能让 reducer 感知到 action，这个派发动作是由 store.dispatch 完成的。

```javascript
import { createStore } from 'redux'

const reducer = (state, action) => {
  // action 判断 type，分发各种逻辑，返回一个 state
  return new_state
}

const store = createStore(reducer)

const action = {
  type: 'ADD_ITEM',
  payload: '<li>text</li>'
}

store.dispatch(action)
```

总结流程：首先根据 reducer 创建 store，store 提供了 dispatch 方法，由视图中某些操作使用 dispatch 触发 action 行为，传入 reducer 进行逻辑处理，将返回后的新 state 传递给 store 对象做更新。
