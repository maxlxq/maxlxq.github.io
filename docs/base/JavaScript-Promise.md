# JavaScript-Promise

## 介绍

Promise 是一个对象，代表了一个异步操作的最终完成或者失败。

1. Promise 必须为以下三种状态之一：Pending、Fulfilled、Rejected。
2. new Promise 时，需要传递一个 executor() 执行器，执行器立即执行。
3. executor 接受两个参数，resolve 和 reject。
4. promise 的默认状态是 pending。
5. promise 有一个 value 保存成功状态的值，可以是 undefined/thenable/promise。
6. promise 有一个 reason 保存失败状态的值。
7. promise 只能从 pending 到 rejected，或者从 pending 到 fulfilled。状态转换之后就不会再改变。
8. promise 必须有一个 then 方法，then 接受两个参数，分别是 promise 成功的回调 onFulfilled，和 promise 失败的回调 onRejected。
9. 如果调用 then 时，promise 已经成功，则执行 onFulfilled，参数是 promise 的 value。
10. 如果调用 then 时，promise 已经失败，则执行 onRejected，参数是 promise 的 reason。
11. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个 then 的失败的回调 onRejected。

## 基本过程

1. 初始化 Promise 状态（Pending）
2. 立即执行 Promise 中传入的 fn 函数，将 Promise 内部 resolve、reject 函数作为参数传递给 fn，按事件机制时机处理
3. 执行 then 注册回调处理数组
4. Promise 里的关键是，then 方法中的参数 onFulfilled、onRejected 必须在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。微任务队列

## Promise 基本框架

```javascript
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class Promise {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('Promise resolver is not a function')
    }

    this.status = PENDING
    this.value = undefined

    this.onResolvedCallbackArr = []
    this.onRejectedCallbackArr = []

    const resolve = value => {
      if (value === this) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
      }

      if (value instanceof Promise) {
        return value.then(resolve, reject)
      }

      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.onResolvedCallbackArr.forEach(cb => cb())
      }
    }

    const reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.value = reason
        this.onRejectedCallbackArr.forEach(cb => cb())
      }
    }

    try {
      executor(resolve, reject)
    } catch(e) {
      reject(e)
    }
  }

  then(onResolved, onRejected) {
    onResolved = typeof onResolved === 'function' ? onResolved : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : e => throw e

    const nextPromise = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let result = onResolved(this.value)
            resolvePromise(nextPromise, result, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let result = onRejected(this.value)
            resolvePromise(nextPromise, result, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }

      if (this.status === PENDING) {
        this.onResolvedCallbackArr.push(() => {
          try {
            let result = onResolved(this.value)
            resolvePromise(nextPromise, result, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
        this.onRejectedCallbackArr.push(() => {
          try {
            let result = onRejected(this.value)
            resolvePromise(nextPromise, result, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
    })
  }
}

const resolvePromise = (nextPromise, promiseResult, resolve, reject) => {
  // todo
}
```

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

## Promise.race

## Promise.any

## Promise.allSettled

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
