# call和apply模拟实现

## call 原理
`call()` 方法使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数

## apply 原理
`apply()` 方法接受的是一个包含多个参数的数组，语法和作用与 `call()` 类似

## 代码实现
- call
```javascript
Function.prototype.call = function(context) {
  context = context ? Object(context) : window
  var fn = Symbol()
  context[fn] = this

  let args = [...arguments].slice(1)
  let result = context[fn](...args)

  delete context[fn]
  return result
}
```

- apply
```javascript
Function.prototype.apply = function(context, arr) {
  context = context ? Object(context) : window
  context.fn = this

  var result
  if (!arr) {
    result = context.fn()
  } else {
    var args = []
    for(var i = 0, len = arr.length; i < len; i++) {
      args.push(`arr[${i}]`)
    }
    result = eval(`context.fn(${args})`)
  }

  delete context.fn
  return result
}
```

