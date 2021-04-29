# Array

> 更新时间：2021/04/29

## 数组使用

### 创建数组
`let fruits = ['Apple', 'Banana']`

### 通过索引访问
`let first = fruits[0]`

### 遍历数组
`fruits.forEach((item, index, array) => console.log(item, index))`

### 尾部添加元素
`let newLength = fruits.push('Orange')`

### 删除尾部元素
`let last = fruits.pop()`

### 添加头部元素
`let newLength = fruits.unshift('Strawberry')`

### 删除头部元素
`let first = fruits.shift()`

### 找到某元素索引
`let pos = fruits.indexOf('Banana')`

### 通过索引删除某元素
`let removedItem = fruits.splice(pos, 1)`

## 属性

### Array.length
Array 构造函数的 length 属性，值为 1，静态属性，不是数组实例的 length 属性

### get Array[@@species]
返回 Array 构造函数

### Array.prototype
通过数组的原型对象可以为所有数组对象添加属性

## 方法

### Array.form()
- 从类数组对象或者可迭代对象中创建一个新的数组实例：`Array.form(arguments)`

- 其他转换数组：`Array.form('foo')`、`Array.from(new Set(['foo', 'bar', 'baz', 'foo']))`

- 克隆数组[浅拷贝]：`Array.form([1,2,3])`

- 克隆数组[深拷贝]：
```javascript
function recursiveClone(val) {
  return Array.isArray(val) ? Array.from(val, recursiveClone) : val;
}
```

<details>
<summary>
Polyfill
</summary>

```javascript
Array.from = (function () {
  var toStr = Object.prototype.toString;
  var isCallable = function (fn) {
    return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
  };
  var toInteger = function (value) {
    var number = Number(value);
    if (isNaN(number)) { return 0; }
    if (number === 0 || !isFinite(number)) { return number; }
    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
  };
  var maxSafeInteger = Math.pow(2, 53) - 1;
  var toLength = function (value) {
    var len = toInteger(value);
    return Math.min(Math.max(len, 0), maxSafeInteger);
  };

  // The length property of the from method is 1.
  return function from(arrayLike/*, mapFn, thisArg */) {
    // 1. Let C be the this value.
    var C = this;

    // 2. Let items be ToObject(arrayLike).
    var items = Object(arrayLike);

    // 3. ReturnIfAbrupt(items).
    if (arrayLike == null) {
      throw new TypeError("Array.from requires an array-like object - not null or undefined");
    }

    // 4. If mapfn is undefined, then let mapping be false.
    var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
    var T;
    if (typeof mapFn !== 'undefined') {
      // 5. else
      // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
      if (!isCallable(mapFn)) {
        throw new TypeError('Array.from: when provided, the second argument must be a function');
      }

      // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
      if (arguments.length > 2) {
        T = arguments[2];
      }
    }

    // 10. Let lenValue be Get(items, "length").
    // 11. Let len be ToLength(lenValue).
    var len = toLength(items.length);

    // 13. If IsConstructor(C) is true, then
    // 13. a. Let A be the result of calling the [[Construct]] internal method
    // of C with an argument list containing the single item len.
    // 14. a. Else, Let A be ArrayCreate(len).
    var A = isCallable(C) ? Object(new C(len)) : new Array(len);

    // 16. Let k be 0.
    var k = 0;
    // 17. Repeat, while k < len… (also steps a - h)
    var kValue;
    while (k < len) {
      kValue = items[k];
      if (mapFn) {
        A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
      } else {
        A[k] = kValue;
      }
      k += 1;
    }
    // 18. Let putStatus be Put(A, "length", len, true).
    A.length = len;
    // 20. Return A.
    return A;
  };
}());
```
</details>

### Array.isArray
判断是否为 Array

```javascript
Array.isArray([1])
Array.isArray(new Array('a', 'b'))
// Array.prototype 也是一个数组 => 很少人知道
Array.isArray(Array.prototype)
```

检测 Array 实例时，优于 instanceof，能检测 iframes

<details>
<summary>
Polyfill
</summary>

```javascript
Array.isArray = function(arg) {
  return Object.prototype.toString.call(arg) === '[object Array]';
};
```
</details>

### Array.of()
接收任意个参数，按顺序称为返回数组中的元素
`Array.of(7) // [7]`
`Array.of(1,2,3) // [1,2,3]`

`Array(7) // [ , , , , , , ]`
`Array(1,2,3) // [1,2,3]`

<details>
<summary>
兼容旧环境
</summary>

```javascript
Array.of = function() {
  return Array.prototype.slice.call(arguments);
};
```
</details>

## 修改器方法

### Array.prototype.copyWithin() // 实验特性
在数组内部，将一段元素序列拷贝到另一段元素序列上，覆盖原有值

`[1,2,3,4,5].copyWithin(0, 3, 4) // [4,5,3,4,5]`
`[1,2,3,4,5].copyWithin(0, 3, 4) // [4,2,3,4,5]`

> arr.copyWithin(target[, start[, end]])

<details>
<summary>
Polyfill
</summary>

```javascript
Array.prototype.copyWithin = function(target, start/*, end*/) {
  // Steps 1-2.
  if (this == null) {
    throw new TypeError('this is null or not defined');
  }

  var O = Object(this);

  // Steps 3-5.
  var len = O.length >>> 0;

  // Steps 6-8.
  var relativeTarget = target >> 0;

  var to = relativeTarget < 0 ?
    Math.max(len + relativeTarget, 0) :
    Math.min(relativeTarget, len);

  // Steps 9-11.
  var relativeStart = start >> 0;

  var from = relativeStart < 0 ?
    Math.max(len + relativeStart, 0) :
    Math.min(relativeStart, len);

  // Steps 12-14.
  var end = arguments[2];
  var relativeEnd = end === undefined ? len : end >> 0;

  var final = relativeEnd < 0 ?
    Math.max(len + relativeEnd, 0) :
    Math.min(relativeEnd, len);

  // Step 15.
  var count = Math.min(final - from, len - to);

  // Steps 16-17.
  var direction = 1;

  if (from < to && to < (from + count)) {
    direction = -1;
    from += count - 1;
    to += count - 1;
  }

  // Step 18.
  while (count > 0) {
    if (from in O) {
      O[to] = O[from];
    } else {
      delete O[to];
    }

    from += direction;
    to += direction;
    count--;
  }

  // Step 19.
  return O;
};
```
</details>

### Array.prototype.fill() // 实验特性
将数组中指定区间的所有元素的值，都替换成某个固定的值

> arr.fill(value[, start[, end]])

`[1,2,3].fill(4) // [4,4,4]`
`[1,2,3].fill(4, 1) // [1,4,4]`
`[1,2,3].fill(4, 1, 2) // [1,4,3]`
`[1,2,3].fill(4, 3, 3) // [1,2,3]`
`[1,2,3].fill(4, -3, -2) // [1,2,3].fill(4, 0, 1) [4,2,3]`

<details>
<summary>
Polyfill
</summary>

```javascript
Object.defineProperty(Array.prototype, 'fill', {
  value: function(value) {

    // Steps 1-2.
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    var O = Object(this);

    // Steps 3-5.
    var len = O.length >>> 0;

    // Steps 6-7.
    var start = arguments[1];
    var relativeStart = start >> 0;

    // Step 8.
    var k = relativeStart < 0 ?
      Math.max(len + relativeStart, 0) :
      Math.min(relativeStart, len);

    // Steps 9-10.
    var end = arguments[2];
    var relativeEnd = end === undefined ?
      len : end >> 0;

    // Step 11.
    var final = relativeEnd < 0 ?
      Math.max(len + relativeEnd, 0) :
      Math.min(relativeEnd, len);

    // Step 12.
    while (k < final) {
      O[k] = value;
      k++;
    }

    // Step 13.
    return O;
  }
});
```
</details>

### Array.prototype.pop()
删除数组最后一个元素，并返回该元素的值。更改数组长度。
`[1,2,3].pop() // 3`
`[].pop() // undefined`

### Array.prototype.push()
讲一个或多个元素添加到数组的末尾，并返回更新后该数组的长度
`[1,2,3].push(4) // 4 // [1,2,3,4]`
`[1,2,3].push(4,5,6) // 6 // [1,2,3,4,5,6]`

### Array.prototype.reverse()
将数组中元素的位置颠倒，并返回该数组。
`[1,2,3].reverse() // [3,2,1]`

### Array.prototype.shift()
删除第一个元素，并返回该元素的值。更改数组长度
`[1,2,3].shift() // 1`
`[].shift() // undefined`

### Array.prototype.unshift()
在数组首部添加一个或多个元素，并返回该数组的新长度
`[4,5,6].unshift(1,2,3) // [1,2,3,4,5,6]`

### Array.prototype.sort()
使用原地算法对数组的元素进行排序，并返回数组。
> 默认排序顺序时将元素转为字符串，然后比较 UTF-16 代码的单元值序列。

> arr.sort([compareFunction])

<details>
<summary>
比较函数：compareFunction(firstEl, secondEl)
</summary>

1. 升序结果, 比较函数
```javascript
function compare(a, b) {
  if (a < b ) {
    return -1;
  }
  if (a > b ) {
    return 1;
  }
  return 0;
}
```

2. 数字比较，升序结果
```javascript
function compareNumbers(a, b) {
  return a - b;
}
```

3. 对非 ASCII 字符排序
```javascript
function compare(a, b) {
  return a.localeCompare(b)
}
```

4. 复杂排序，首先使用映射将实际比较结果保存在数据中，排序后再恢复

</details>

### Array.prototype.splice()
通过删除、或替换现有元素、或原地添加新元素来修改数组，并以数组形式返回被修改的内容。修改数组长度

> array.splice(start[, deleteCount[, item1[, ...]]])

`[1,2,3].splice(1,1) // [2] // [1,3]`
`[1,2,3].splice(1,0,4) // [] // [1,4,2,3]`
`[1,2,3].splice(1,1,4) // [2] // [1,4,3]`
`[1,2,3].splice(1,1,4,5,6) // [2] // [1,4,5,6,3]`
`[1,2,3].splice(1) // [2,3] // [1]`

## 访问方法

### Array.prototype.concat()
返回一个由当前数组和其他若干个数组或者若干个非数组值组合而成的新数组

### Array.prototype.includes() // 实验
判断当前数组是否包含某指定的值；返回 `true or false`

### Array.prototype.join()
连接所有数组元素，组合成一个字符串

### Array.prototype.slice()
抽取当前数组的一段元素组成一个新数组

### Array.prototype.toSource() // ⚠️
返回一个表示当前数组字面量的字符串

### Array.prototype.toString()
返回一个由所有数组元素组合而成的字符串。屏蔽原型链上的 Object.prototype.toString() 方法

### Array.prototype.toLocaleString()
返回一个由所有数组元素组合而成的本地化后的字符串。屏蔽原型链上的 Object.prototype.toLocaleString() 方法

### Array.prototype.indexOf()
返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1

### Array.prototype.lastIndexOf()
返回数组中最后一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1

## 迭代方法

### Array.prototype.forEach()
为数组中每个元素执行一次回调函数

### Array.prototype.entries() // 实验
返回一个数组迭代器对象，该迭代器会包含所有数组元素的键值对

### Array.prototype.every()
如果数组中的每个元素都满足测试函数，则返回 true，反之 false

### Array.prototype.some()
如果数组中至少有一个元素满足测试函数，则返回 true, 反之 false

### Array.prototype.filter()
将所有在过滤函数中返回 true 的数组元素放进一个新数组并返回

### Array.prototype.find()
找到第一个满足测试函数的元素，并返回那个元素的值，如果找不到就返回 undefined

### Array.prototype.findIndex()
找到第一个满足测试函数的元素并返回那个元素的索引，如果找不到，就返回 -1

### Array.prototype.keys()
返回一个数组迭代器对象，该迭代器会包含所有数组元素的键

### Array.prototype.map()
返回一个由回调函数的返回值组成的新数组

### Array.prototype.reduce()
**从左到右**为每一个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。

### Array.prototype.reduceRight()
**从右到左**为每一个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。

### Array.prototype.values()
返回一个数组迭代器对象，该迭代器会包含所有数组元素的值

### Array.prototype[@@iterator]\()
与上个 values() 方法是同一个函数，认知即可
