# 事件循环：高性能到底是如何做到的？

必考点：事件循环原理

版本：Node.js 10+

区别：与浏览器原理不同。

Node.js 虽然运行结果上与浏览器一直，但两者在原理上，一个是基于浏览器，一个是基于 libuv 库。
浏览器核心的是宏任务和微任务，Node.js 在有阶段性任务执行阶段。

## Node.js 事件循环

事件循环通俗来说是一个 无限的 while 循环。

以下疑问：
- 谁来启动的这个循环过程，循环条件是什么？
- 循环的到底是什么任务？
- 循环的任务是否有优先级？
- 什么进程或者县城来执行这个循环？
- 无限循环有没有终点？

## Node.js 循环原理

核心流程图
```javascript
/**
 *      ┌-------------------------┐
 *  ┌-->|         timers          |
 *  |   └-----------┬-------------┘
 *  |   ┌-----------┴-------------┐
 *  |   |     pending callbacks   |
 *  |   └-----------┬-------------┘
 *  |   ┌-----------┴-------------┐
 *  |   |      idle, prepare      |
 *  |   └-----------┬-------------┘      ┌-----------------┐
 *  |   ┌-----------┴-------------┐      |    incoming     |
 *  |   |          poll           | <--- |   connections   |
 *  |   └-----------┬-------------┘      |    data, etc.   |
 *  |   ┌-----------┴-------------┐      └-----------------┘
 *  |   |         check           |
 *  |   └-----------┬-------------┘
 *  |   ┌-----------┴-------------┐
 *  └---|     close callbacks     |
 *      └-------------------------┘
 */
```

六个阶段：
1. timers：本阶段执行已经被 setTimeout() 和 setInterval() 调度的回调函数，简单理解为由这两个函数启动的回调函数
2. pending callbacks：本阶段执行某些系统操作的回调函数
3. idle、prepare：仅系统内部使用
4. poll：检索新的 I/O 事件，执行与 I/O 相关的回调，其他情况 Node.js 将在适当的时候在此阻塞。这也是最复杂的一个阶段，所有的事件循环以及回调处理都在这个阶段执行。
5. check：setImmediate() 回调函数在这里执行，setImmediate 并不是立马执行，而是当事件循环 poll 中没有新的事件处理时就执行该部分。如下：
```javascript
const fs = require('fs')
setTimeout(() => {
  console.log('1')
}, 0)
setImmediate(() => {
  console.log('setImmediate 1')
})
// 将在 poll 阶段执行
fs.readFile('./test.conf', { encoding: 'utf-8' }, (err, data) => {
  if (err) throw err
  console.log('read file success')
})
// 该部分将会在首次事件循环中执行
Promise.resolve().then(() => {
  console.log('poll callback')
})
// 首次事件循环执行
console.log('2')
```

在这段代码中，神奇的地方在于 setImmediate 会在 setTimeout 之后输出。原因如下：
- setTimeout 如果不设置事件或者设置为 0，会默认为 1ms
- 主流程执行完成后，超过1ms时，会将 setTimeout 回调函数逻辑插入到待执行回调函数 poll 队列中
- 由于当前 poll 队列中存在可执行回调函数，因此需要先执行完，待完全执行完成后，才会执行 check：setImmediate

因此，会先执行回调函数，再执行 setImmediate。

6. close callbacks：执行一些关闭的回调函数，如 socket.on('close', ...)

### 运行起点

事件循环的起点是 timers，如下：
```javascript
setTimeout(() => {
  console.log('1')
}, 0)
console.log('2')
```

当 Node.js 启动后，会初始化事件循环。

Node.js 事件循环的发起点有 4 个：
- Node.js 启动后
- setTimeout 回调函数
- setInterval 回调函数
- 也可能是一次 I/O 后的回调函数

以上回答了，`谁来启动的这个循环过程，循环条件是什么？`

### Node.js 事件循环

> 循环的是什么任务？

核心流程中真正需要关注循环执行的就是 poll 这个过程。
在 poll 过程中，主要处理的是 异步 I/O 的回调函数，以及其他几乎所有的回调函数。

异步 I/O 又分为 网络 I/O 和 文件 I/O。

事件循环的主要包括微任务和宏任务。

- 微任务：Node.js 中微任务包含两种 --- process.nextTick 和 Promise。并且 process.nextTick 优先级高于 Promise。
- 宏任务：Node.js 中宏任务包含四种 --- setTimeout、setInterval、setImmediate、I/O。

在同一个事件循环周期内，如果既存在微任务，又存在宏任务，优先清空微任务，在执行宏任务队列。

以上，回答了问题3，`循环的任务是否有优先级？`

执行阶段主要处理三个核心逻辑：
- 同步代码
- 将异步任务插入微任务队列或者宏任务队列中
- 执行微任务或者宏任务的回调函数。在主线程处理回调函数的同事，也需要判断是否插入微任务和宏任务。

分析如下例子：
```javascript
const fs = require('fs')
// 首次事件循环执行
console.log('start')
// 将会在新的事件循环中的 poll 阶段执行
fs.readFile('./test.conf', { encoding: 'utf-8' }, (err, data) => {
    if (err) throw err
    console.log('read file success')
})
setTimeout(() => { // 新的事件循环的起点
    console.log('setTimeout')
}, 0)
// 该部分将会在首次事件循环中执行
Promise.resolve().then(() => {
    console.log('Promise callback')
})
// 执行 process.nextTick
process.nextTick(() => {
    console.log('nextTick callback')
})
// 首次事件循环执行
console.log('end')
```

分析：
1. 第一个事件循环主线程发起，先执行同步代码，所以输出 `start`，然后输出 `end`
2. 从上向下分析，遇到微任务，插入微任务队列，遇到宏任务，插入宏任务队列。微任务：Promise.resolve 和 process.nextTick；宏任务：fs.readFile 和 setTimeout。
3. 限制性微任务，根据优先级，优先执行 process.nextTick，再执行 Promise callback。先输出 `nextTick callback`，再输出 `Promise callback`。
4. 再执行宏任务队列，根据插入队列的先后顺序，先执行 fs.readFile 再执行 setTimeout。注意：先执行 fs.readFile，但它执行需要时间肯定大于 1ms，所以虽然 fs.readFile 先于 setTimeout 执行，但是 setTimeout 回调时间更短、执行更快，所以先输出 `setTimeout` ，最后输出 `read file success`。

所以得到结果：

```javascript
/**
 * start
 * end
 * nextTick callback
 * Promise callback
 * setTimeout
 * read file success
 */
```

当微任务和宏任务又产生新的微任务和宏任务时，举例：
```javascript
const fs = require('fs')
setTimeout(() => { // 新的事件循环的起点
    console.log('1')
    fs.readFile('./config/test.conf', {encoding: 'utf-8'}, (err, data) => {
        if (err) throw err
        console.log('read file sync success')
    })
}, 0)
// 回调将会在新的事件循环之前
fs.readFile('./config/test.conf', {encoding: 'utf-8'}, (err, data) => {
    if (err) throw err
    console.log('read file success')
})
// 该部分将会在首次事件循环中执行
Promise.resolve().then(()=>{
    console.log('poll callback')
})
// 首次事件循环执行
console.log('2')
```

分析：
1. 优先执行主线程的第一个事件循环过程，先执行同步逻辑，输出 `2`
2. 接下来执行微任务，输出 `poll callback`
3. 再执行宏任务中的 fs.readFile 和 setTimeout，由于 readFile 优先极高，先执行 fs.readFile。处理时间大于 1ms，所以会先执行 setTimeout 的回调函数，输出 `1`。这个阶段中又产生了新的宏任务 fs.readFile，插入宏任务队列。
4. 最后只剩下宏任务队列 fs.readFile，执行并等待处理完成后的回调，输出 `read file sync success`


所以得到结果：

```javascript
/**
 * 2
 * poll callback
 * 1
 * read file success
 * read file sync success
 */
```

主线程是否会被阻塞？

```javascript
const fs = require('fs');
setTimeout(() => { // 新的事件循环的起点
  console.log('1')
  sleep(10000)
  console.log('sleep 10s')
}, 0)
/// 将会在 poll 阶段执行
fs.readFile('./test.conf', {encoding: 'utf-8'}, (err, data) => {
  if (err) throw err;
  console.log('read file success')
})
console.log('2')
/// 函数实现，参数 n 单位 毫秒
function sleep ( n ) {
  var start = new Date().getTime()
  while ( true ) {
    if ( new Date().getTime() - start > n ) {
      // 使用  break  实现；
      break
    }
  }
}
```

阻塞现象是：当每次事件循环结束后，才会执行 fs.readFile 毁掉函数。
但 发现 fs.readFile 其实已经处理完成，并且通知回调到了主线程，但主线程处理时被阻塞了，无法处理 fs.readFile 的回调。

所以，主线程会因为回调函数的执行而被阻塞。

## 实践分析

Node.js 不善于处理 CPU 密集型的业务。

> Node.js 是单线程还是多线程的？
>
> 主线程是单线程执行的，但是 Node.js 存在多线程执行，多线程包括 setTimeout 和 异步 I/O 事件。
> 其实 Node.js 还存在其他的线程，包括 垃圾回收、内存优化等。
