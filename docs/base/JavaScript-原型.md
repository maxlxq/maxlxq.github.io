# JavaScript原型

## 原型
1. 每个引用类型都具有对象的特征，即 可自由拓展属性
   ```javascript
   const obj = {}
   const arr = []
   const fn = function () {}

   obj.a = 1
   arr.a = 1
   fn.a = 1

   console.log(obj.a) // 1
   console.log(arr.a) // 1
   console.log(fn.a)  // 1
   ```

2. 引用类型，都具有一个`__proto__`属性
   ```javascript
   console.log('obj.__proto__', obj.__proto__);
   console.log('arr.__proto__', arr.__proto__);
   console.log('fn.__proto__', fn.__proto__);
   ```

3. 隐式原型`__proto__`的属性值，指向它的构造函数的显式原型`prototype`属性
   ```javascript
   obj.__proto__ == Object.prototype // true
   arr.__proto__ === Array.prototype // true
   fn.__proto__ == Function.prototype // true
   ```

4. 当试图去寻找一个对象的属性时，如果对象本身没有这个属性，那么它会去它的隐式原型`__proto__` (即它的构造函数的显式原型`prototype`) 中寻找
   ```javascript
   const obj = { a: 1 }
   obj.toString
   // ƒ toString() { [native code] }
   ```

引用类型：Object、Array、Function、Date、RegExp

```javascript
function Persion(name) {
  this.name = name
  return this // 默认返回 this，可省略
}

var dan = new Persion('dan')
dan.toString
// ƒ toString() { [native code] }
```

## 原型链

分析：`dan` 是`Person`构造函数生成的实例，而`Person`的`prototype`并没有`toString`方法，为什么`dan`能找到`toString`方法？

实例`dan`从自身查找，未找到`toString`方法，则往上寻找，到`Person`中的`prototype`属性中寻找，然而还是没找到，继续向上寻找。因为`Person`的构造函数的`prototype`是一个对象，所以对象的构造函数是`Object`，因此找到`Object.prototype`下的`toString`方法

在这个寻找的过程中，由实例自身逐级向上搜索得到的链式关系就是原型链

`instanceof` 运算符可以用于测试构造函数的`prototype`属性是否出现在对象原型链的任何位置。

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

## 总结

原型就像是原型链上的一个个节点，由多个原型构建而成的链式关系就是原型链。
