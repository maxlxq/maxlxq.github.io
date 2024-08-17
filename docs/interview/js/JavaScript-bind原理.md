# bind模拟实现

## 原理
>
> `bind()` 方法会创建一个新函数，当这个新函数被调用时，它的 `this` 值传递给 `bind()` 的第一个参数，传入 bind 方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数。
>
> bind 返回的绑定函数也能使用 `new` 操作符创建对象

四点特性

- 可以指定 this   // 使用 call/apply 指定 this
- 返回一个函数     // 使用 return 返回一个函数
- 可以穿入参数     // 使用 arguments 获取参数数组并作为 self.apply() 的第二个参数
- 柯里化          // 获取返回函数的参数，同第三点的参数合并成一个参数数组，并作为 self.apply() 的第二个参数

## 代码实现

```javascript
Function.prototype.bind2 = function(context) {
  if (typeof this !== 'function') {
    throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
  }

  var self = this
  var args = Array.prototype.slice.call(arguments, 1)

  var fNOP = function() {}

  var fBound = function() {
    var bindArgs = Array.prototype.slice.call(arguments)
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    )
  }

  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()
  return fBound
}
```
