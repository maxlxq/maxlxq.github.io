# JavaScript-Promise

## 介绍

Promise 是一个对象，代表了一个异步操作的最终完成或者失败。

Promise 必须为以下三种状态之一：Pending、Fulfilled、Rejected。

Pending 可以转换成 Fulfilled 或 Rejected 状态。
Fulfilled、Rejected 不能再转移到其他状态。

## 基本过程

1. 初始化 Promise 状态（Pending）
2. 立即执行 Promise 中传入的 fn 函数，将 Promise 内部 resolve、reject 函数作为参数传递给 fn，按事件机制时机处理
3. 执行 then 注册回调处理数组
4. Promise 里的关键是，then 方法中的参数 onFulfilled、onRejected 必须在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。微任务队列

## 链式调用

## resolve

## reject

## 异常处理

## finally 方法

```javascript
function Promise(fn) {
  // ...
  this.catch = function (onError) {
    this.then(null, onError)
  }
  this.finally = function (onDone) {
    this.then(onDone, onDone)
  }
  // ...
}
```

## Promise.all

```javascript
function PromiseAll(arr) {
  let args = Array.prototype.slice.call(arr)
  return new Promise(function(resolve, reject) {
    if (args.length === 0) return resolve([])
    let remaining = args.length

    function res(i, val) {
      try {
        if (val && ['object', 'function'].includes(typeof val)) {
          let then = val.then
          if (typeof then === 'function') {
            then.call(val, function(val) {
              res(i, val)
            }, reject)
            return
          }
        }
        args[i] = val
        if (--remaining === 0) {
          resolve(args)
        }
      } catch(e) {
        reject(e)
      }
    }
    for(let i = 0; i < args.length; i++) {
      res(i, args[i])
    }
  })
}
```

```javascript
function race(iterator) {
  if (!Array.isArray(iterator)) return
  let count = 0
  let res = []
  return new Promise((resolve, reject) => {
    for(let item of iterator) {
      Promise.resolve(item)
        .then(data => {
          res[count++] = data
          if (count === iterator.length) {
            resolve(res)
          }
        })
        .catch(e => reject(e))
    }
  })
}
```

## Promise.race

```javascript
function race(iterator) {
  return new Promise((resolve, reject) => {
    for(let item of iterator) {
      Promise.resolve(item)
        .then(data => {
          resolve(data)
        })
        .catch(e => reject(e))
    }
  })
}
```

## Promise.any

```javascript
function any(iterators) {
  const promises = Array.from(iterators)
  const num = promises.length
  const rejectedList = new Array(num)
  let rejectedNum = 0

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(data => resolve(data))
        .catch(e => {
          rejectedList[index] = e
          if (++rejectedNum === num) {
            reject(rejectedList)
          }
        })
    })
  })
}
```

## Promise.allSettled

```javascript
const formatSettledResult = (success, value) => (
  success
    ? { status: 'fulfilled', value }
    : { status: 'rejected', reason: value }
)

function allSettled(iterators) {
  const promises = Array.from(iterators)
  const num = promises.length
  const settledList = new Array(num)
  let settledNum = 0

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          settledList[index] = formatSettledResult(true, value)
          if (++settledNum === num) {
            resolve(settledList)
          }
        })
        .catch(error => {
          settledList[index] = formatSettledResult(false, error)
          if (++settledNum === num) {
            reject(settledList)
          }
        })
    })
  })
}
```

## 并发限制

```javascript
const fetchUrl = (data, time) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    }, time)
  })
}

const tasks = [
  fetchUrl('fetch--1', 1000),
  fetchUrl('fetch--2', 1200),
  fetchUrl('fetch--3', 2500),
  fetchUrl('fetch--4', 2000),
  fetchUrl('fetch--5', 1000),
]

function promiseLimit(tasks) {
  let i = 0
  const poolLimit = 2
  const len = tasks.length
  const ret = []
  const executing = []
  const enqueue = function () {
    // 终止条件
    if (i === len) {
      return Promise.resolve()
    }
    // 取出一个任务
    const task = tasks[i++]
    // 放入 promises 数组
    ret.push(task)
    // 执行完成后从 executing 数组中删除
    const e = Promise.resolve(task).then(data => {
      console.log('data:', data)
      executing.splice(executing.indexOf(e), 1)
      if (executing.length === 0) {
        console.timeEnd('count')
      }
    })
    // 插入 executing 数组，表示正在执行的 promise
    executing.push(e)
    // 使用 Promise.race, 每当 executing 数组中 promise 数量低于 poolLimit，就实例化新的 promise 并执行
    let r = Promise.resolve()
    if (executing.length >= poolLimit) {
      r = Promise.race(executing)
    }
    // 递归，遍历所有的 task
    return r.then(data => {
      enqueue()
    })
  }
  return enqueue().then(() => Promise.all(ret))
}

console.time('count')
promiseLimit(tasks)
```

## 实现一个 PromiseA+ 规范的 Promise 模型

```javascript

const PENDING = 'PENDING'
const REJECTED = 'REJECTED'
const RESOLVED = 'RESOLVED'

const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    // ES6 规范写法 无法通过Promise/A+测试
    // return reject('[TypeError: Chaining cycle detected for promise #<Promise>]')
    // Promise/A+ 规范写法
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }

  let used

  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      const { then } = x
      if (typeof then === 'function') {
        then.call(x, (y) => {
          if (used) return
          used = true
          resolvePromise(promise2, y, resolve, reject)
        }, (e) => {
          if (used) return
          used = true
          reject(e)
        })
      } else {
        resolve(x)
      }
    } catch (error) {
      if (used) return
      used = true
      reject(error)
    }
  } else {
    resolve(x)
  }
}

class Promise {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError(`Promise resolver ${executor} is not a function`)
    }

    this.status = PENDING
    this.value = undefined

    this.onResolvedCallbackArr = []
    this.onRejectedCallbackArr = []

    const resolve = (value) => {
      // resolve中使用模板字符串，无法通过Promise/A+测试
      // console.log(`${value}`)
      if (value === this) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
      }

      if (value instanceof Promise) {
        return value.then(resolve, reject)
      }

      // resolve解析thenable对象是ES6的功能，无法通过Promise/A+测试
      // if (((typeof value === 'object' && value !== null) || typeof value === 'function') &&
      //     typeof value.then === 'function') {
      //     return process.nextTick(() => {
      //         try {
      //             value.then(resolve, reject)
      //         } catch (error) {
      //             reject(error)
      //         }
      //     })
      // }

      if (this.status === PENDING) {
        this.value = value
        this.status = RESOLVED
        this.onResolvedCallbackArr.forEach((cb) => cb())
      }
    }

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.value = reason
        this.status = REJECTED
        this.onRejectedCallbackArr.forEach((cb) => cb())
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onResolved, onRejected) {
    onResolved = typeof onResolved === 'function' ? onResolved : (value) => value
    onRejected = typeof onRejected === 'function' ? onRejected : (error) => { throw error }

    const promise2 = new Promise((resolve, reject) => {
      if (this.status === RESOLVED) {
        setTimeout(() => {
          try {
            const x = onResolved(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }

      if (this.status === PENDING) {
        this.onResolvedCallbackArr.push(() => {
          setTimeout(() => {
            try {
              const x = onResolved(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
        this.onRejectedCallbackArr.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    })
    return promise2
  }

  //= =============以下非 Promise/A+ 规范中的内容==================
  catch(onRejected) {
    return this.then(null, onRejected)
  }

  finally(callback) {
    return this.then((value) => Promise.resolve(callback()).then(() => value), (error) => Promise.resolve(callback()).then(() => { throw error }))
  }

  static resolve(value) {
    if (value instanceof Promise) return value

    return new Promise((resolve, reject) => {
      if (((typeof value === 'object' && value !== null) || typeof value === 'function')
        && typeof value.then === 'function') {
        process.nextTick(() => {
          try {
            value.then(resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else {
        resolve(value)
      }
    })
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  static all(promises) {
    return new Promise((resolve, reject) => {
      if (promises === undefined || promises === null || !promises[Symbol.iterator]) {
        const preReason = promises === undefined ? `${promises}` : `${typeof promises} ${promises}`
        return reject(new TypeError(`${preReason} is not iterable (cannot read property Symbol(Symbol.iterator))`))
      }

      if (promises.length === 0) return resolve([])

      let index = 0
      const resultArr = []

      const processValue = (i, value) => {
        resultArr[i] = value
        index += 1
        if (index === promises.length) {
          return resolve(resultArr)
        }
      }
      for (let i = 0; i < promises.length; i += 1) {
        Promise.resolve(promises[i]).then((value) => {
          processValue(i, value)
        }, (error) => reject(error))
      }
    })
  }

  static race(promises) {
    return new Promise((resolve, reject) => {
      if (promises === undefined || promises === null || !promises[Symbol.iterator]) {
        const preReason = promises === undefined ? `${promises}` : `${typeof promises} ${promises}`
        return reject(new TypeError(`${preReason} is not iterable (cannot read property Symbol(Symbol.iterator))`))
      }

      if (promises.length === 0) return

      for (let i = 0; i < promises.length; i += 1) {
        Promise.resolve(promises[i]).then((value) => resolve(value), (error) => reject(error))
      }
    })
  }
}

Promise.deferred = () => {
  const dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

Promise.defer = Promise.deferred

module.exports = Promise
```
