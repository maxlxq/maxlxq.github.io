# call和apply模拟实现

## call 原理

`call()` 方法使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数

## apply 原理

`apply()` 方法接受的是一个包含多个参数的数组，语法和作用与 `call()` 类似

## 代码实现

- call

```javascript
Function.prototype.callFn = function(context) {
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
Function.prototype.applyFn = function(ctx, arr) {
  if (typeof this !== 'function') {
    throw new TypeError(this + ' is not a function');
  }

  ctx = ctx || window;
  const key = Symbol();
  ctx[key] = this;

  const res = !arr ? ctx[key]() : ctx[key](arr);

  delete ctx[key];
  return res;
}
```
