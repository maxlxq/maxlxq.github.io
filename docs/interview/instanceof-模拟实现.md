# instanceof-模拟实现

## 手写 instanceof
```javascript
// R 的原型 存在于 L 的原型链上
function instanceofFn(L, R) {
  // 基本数据类型则返回
  const baseType = ['string', 'number', 'boolean', 'undefined', 'symbol', 'bigint']
  if (baseType.includes(typeof L)) return false

  let RP = R.prototype // 取 R 显示原型
  L = L.__proto__ // 取 L 隐式原型
  while(true) {
    if (L === null) { // 已经找到顶层 Object
      return false
    }
    if (L === RP) { // 严格相等
      return true
    }
    L = L.__proto__ // 逐级向上查找
  }
}
```

## JS 中寻找属性的方式
- 链式调用：a.b
- for...in...
- instanceof
- hasOwnPrototype
