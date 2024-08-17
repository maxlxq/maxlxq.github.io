# new模拟实现

## `new` 操作符做了什么

1. 创建了一个新对象
2. 新对象被执行[[Prototype]]链接
3. 新对象绑定到函数调用的`this`
4. 通过`new`创建的每个对象将最终被[[Prototype]]链接到这个函数的`prototype`上
5. 函数若没有返回对象类型`Object`，那么 `new` 表达式中的函数调用会自动返回这个新的对象

## 代码实现一

```javascript
function newOperator() {
  let Constructor = [].shift.apply(arguments)
  if (typeof Constructor !== 'function') {
    throw 'newOperator function the first param must be a function'
  }
  // 重点
  let newObj = Object.create(Constructor.prototype)
  let res = Constructor.apply(newObj, arguments)

  const isObject = typeof res === 'object' && res !== null
  const isFunction = typeof res === 'function'

  return (isObject || isFunction) ? res : newObj
}
```

## 代码实现二

```javascript
function newFunc() {
  let Constructor = [].shift.apply(arguments)
  if (typeof Constructor !== 'function') {
    throw 'newOperator function the first param must be a function'
  }
  let obj = {}
  obj.__proto__ === Constructor.prototype
  let res = Constructor.apply(obj, arguments)
  const isObject = typeof res === 'object' && res !== null
  const isFunction = typeof res === 'function'

  return (isObject || isFunction) ? res : obj
}
```
