
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
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
    } catch(error) {
      if (used) return
      used = true
      reject(error)
    }
  } else {
    resolve(x)
  }
}

class MyPromise {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('Promise resolver is not a function')
    }

    this.status = PENDING
    this.value = undefined

    this.onResolvedCallbackArr = []
    this.onRejectedCallbackArr = []

    const resolve = (value) => {
      if (value === this) {
        return rejects(new TypeError('Chaning cycle detected for promise #<Promise>'))
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

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.value = reason
        this.onRejectedCallbackArr.forEach(cb => cb())
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  // then 函数
  then(onResolved, onRejected) {
    onResolved = typeof onResolved === 'function' ? onResovled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e }

    const nextPromise = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let result = onResolved(this.value)
            resolvePromise(nextPromise, result, resolve, reject)
          } catch(e) {
            reject(e)
          }
        }, 0)
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let ressult = onRejected(this.value)
            resolvePromise(nextPromise, result, resolve, reject)
          } catch(e) {
            reject(e)
          }
        }, 0)
      }

      if (this.status === PENDING) {
        this.onResolvedCallbackArr.push(() => {
          setTimeout(() => {
            try {
              let result = onResolved(this.value)
              resolvePromise(nextPromise, result, resolve, reject)
            } catch(e) {
              reject(e)
            }
          }, 0)
        })
        this.onRejectedCallbackArr.push(() => {
          setTimeout(() => {
            try {
              let result = onRejected(this.value)
              resolvePromise(nextPromise, result, resolve, reject)
            } catch(e) {
              reject(e)
            }
          }, 0)
        })
      }
    })

    return nextPromise
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  finally(callback) {
    return this.then((value) => Promise.resolve(callback()).then(() => value), (error) => Promise.resolve(callback()).then(() => { throw error }))
  }

  static resolve(value) {
    if (value instanceof Promise) return value

    return new Promise((resolve, reject) => {
      if (((typeof value === 'object' && value !== null) || typeof value === 'function') && typeof value.then === 'function') {
        process.nextTick(() => {
          try {
            value.then(resolve, reject)
          } catch(error) {
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

      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then((value) => {
          processValue(i, value)
        }, (error) => reject(error))
      }
    })
  }
}

/**
 * 模拟实现 all
 */
function PromiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!promises[Symbol.iterator] || !promises) return reject(new TypeError('类型错误'))
    if (!promises?.length) return resolve([])
    
    let index = 0
    const resultArr = []

    const processValue = (i, value) => {
      resultArr[i] = value
      index++
      if (index === promises.length) {
        resolve(resultArr)
      }
    }

    for(let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then((value) => {
        processValue(i, value)
      }, e => reject(e))
    }
  })
}

/**
 * 模拟实现 race
 */
function PromiseRace(promises) {
  return new Promise((resolve, reject) => {
    for (let item of promises) {
      Promise.resolve(item)
        .then((value) => resolve(value))
        .catch((e) => reject(e))
    }
  })
}

/**
 * 模拟实现 any
 */
function PromiseAny(promises) {
  promises = Array.from(promises)
  const num = promises.length
  const rejectedList = new Array(num)
  let rejectedNum = 0

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => resolve(value))
        .catch((error) => {
          rejectedNum++
          rejectedList[index] = error
          if (rejectedNum === num) {
            reject(rejectedList)
          }
        })
    })
  })
}

/**
 * 模拟实现 allSettled
 */
function PromiseAllSettled(promises) {
  promises = Array.from(promises)
  const num = promises.length
  const settledList = new Array(num)
  let settledNum = 0

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          settledList[index] = formatSettledResult(true, value)
          settledNum++
          if (settledNum === num) {
            resolve(settledList)
          }
        })
        .catch((e) => {
          settledList[index] = formatSettledResult(false, e)
          settledNum++
          if (settledNum === num) {
            reject(settledList)
          }
        })
    })
  })
}

const formatSettledResult = (success, value) => (
  success ? { status: 'fulfilled', value }
  : { status: 'rejected', reason: value }
)

const fetchUrl = (data, time) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    }, time)
  })
}

const tasks = [
  fetchUrl('fetch--1', 3000),
  fetchUrl('fetch--2', 1200),
  fetchUrl('fetch--3', 1500),
  fetchUrl('fetch--4', 2000),
  fetchUrl('fetch--5', 1000),
]
/**
 * 实现 并发限制promise
 */
function PromiseLimited(promises, limited) {
  let i = 0
  const poolLimit = limited
  const len = promises.length
  const ret = []
  const executing = []
  const enqueue = function () {
    // 终止条件
    if (i === len) {
      return Promise.resolve()
    }
    // 取出一个任务
    const task = promises[i++]
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
  console.time('count')
  return enqueue().then(() => Promise.all(ret))
}

PromiseLimited(tasks, 3)