
## Map

ECMAScript 6 以前，在 JavaScript 中实现 键值对 式存储可以使用 Object。

这种实现并非没有问题，于是 TC39 委员会专门为 键值对 存储定义了一个规范。

Map 是 ECMAScript 6 新增的一个集合类型。

### 基本 API

new 关键字和 Map 构造函数创建空映射

```javascript
const m = new Map()
```

创建时初始化，给 Map 构造函数传入一个可迭代对象，需要包含键值对数组。

```javascript
// 使用嵌套数组初始化
const m1 = new Map([
  ['key1', 'val1'],
  ['key2', 'val2'],
  ['key3', 'val3'],
])
console.log(m1.size) // 3

// 使用自定义迭代器初始化
const m2 = new Map({
  [Symbol.iterator]: function*() {
    yield ['key1', 'val1']
    yield ['key2', 'val2']
    yield ['key3', 'val3']
  }
})
console.log(m2.size) // 3

// 映射期待的键值对
const m3 = new Map([[]])

console.log(m3.has(undefined)) // true
console.log(m3.get(undefined)) // undefined
```

set() 接受两个参数，添加键值对

get() 查找，接受一个参数，返回找到的值，没找到返回 undefined

has() 查询，接受一个参数，返回布尔类型，找到返回 true，否则返回 false

size 返回实例中键值对数量

delete() 接受一个字符串参数，删除对应的键值对

clear() 无参数，清空当前映射实例所有键值对

#### 与 Object 的区别一

Object 只能使用数值、字符串、符号当做键，Map 可以使用任何 JavaScript 数据类型作为键。

Map 内部使用 SameValueZero 比较操作，基本上相当于使用严格对象相等的标准检查键的匹配性。

### 顺序与迭代

#### 与 Object 区别二

Map 实例会维护键值对的插入顺序，可以根据插入顺序执行迭代操作。

映射实例可以提供一个迭代器，能以插入顺序生成 [key, value] 形式的数组。

使用 entries() 方法 取得这个迭代器。 `Symbol.iterator` 属性引用了 entries()

因为 entries() 是默认迭代器，所以可以直接对映射实例使用扩展操作，转换成数组。

```javascript
const m = new Map([
  ['key1', 'val1'],
  ['key2', 'val2'],
  ['key3', 'val3'],
])
console.log(m.entries === m[Symbol.iterator]) // true

console.log([...m]) // [[key1, valu1], [key2, val2], [key3, val3]]
```

不适用迭代器，使用回调方式，可以调用映射的 forEach(callback, opt_thisArg) 方法并传入回调，依次迭代每个键值对。

```javascript
const m = new Map([
  ['key1', 'val1'],
  ['key2', 'val2'],
  ['key3', 'val3'],
])

m.forEach((val, key) => console.log(`${key} -> ${val}`))
// key1 -> val1
// key2 -> val2
// key3 -> val3
```


