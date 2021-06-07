
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

不使用迭代器，使用回调方式，可以调用映射的 `forEach(callback, opt_thisArg)` 方法并传入回调，依次迭代每个键值对。

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

keys() 和 values() 分别返回以插入顺序生成键和值的迭代器。

键和值在迭代器遍历时是可以修改的，但映射内部的引用则无法修改。

### 选择 Object 还是 Map

1. 内存占用。给定固定大小的内存，Map 大约可以比 Object 多存储 50% 的键值对
2. 插入性能。大量插入操作，Map 性能更佳
3. 查找速度。大量查找操作，Object 更好
4. 删除性能。大量删除操作，Map 性能更好

## WeakMap

ECMAScript 6 新增的 弱映射 是一种新的集合类型，WeakMap 是 Map 的兄弟类型，其 API 也是 Map 的子集。

weak 描述的是 JavaScript 垃圾回收程序对待弱映射中键的方式。

### 基本 API

new 关键字 + WeakMap 构造函数

```javascript
const wm = new WeakMap()
```

弱映射中的键只能是 Object 或者继承自 Object 的类型。其他类型会抛出 TypeError。

```javascript
const key1 = {id: 1},
      key2 = {id: 2},
      key3 = {id: 3}

const wm1 = new WeakMap([
  [key1, 'val1'],
  [key2, 'val2'],
  [key3, 'val3'],
])

console.log(wm1.get(key1)) // val1
console.log(wm1.get(key2)) // val2
console.log(wm1.get(key3)) // val3
```

原始值可以先包装成对象再用作键。

```javascript
const stringKey = new String('key1')
const wm2 = new WeakMap([
  stringKey, 'val1'
])

console.log(wm2.get(stringKey))
```

### 弱键

WeakMap 中 'weak' 表示弱映射的键是'弱弱地拿着'。这些键不属于正式的引用，不会阻止垃圾回收。

注意，弱映射中的引用可不是'弱弱地拿着'，只要键存在，键值对就会存在于映射中，并被当作对值的引用，因此不会被当做垃圾回收。

```javascript
const wm = new WeakMap()

const container = {
  key: {}
}

wm.set(container.key, 'val')

function removeReference() {
  container.key = null
}
```

container 对象维护着一个对弱映射键的引用，因此这个对象键不会成为垃圾回收的目标。如果调用了 removeReference() 就会摧毁键对象的最后一个引用，垃圾回收程序就可以把这个键值对清理掉。

在 Chrome 控制台中无法查看具体的内存占用情况。我们使用 node --expose-gc 命令来执行查看，此模式下可以使用 global.gc() 进行手动触发垃圾回收。

```javascript
// node --expose-gc map.js
// map.js
function usageSize() {
  const used = process.memoryUsage().heapUsed;
  return Math.round((used / 1024 / 1024) * 100) / 100 + "M";
}

global.gc();
console.log(usageSize()); // ≈ 1.79M

let arr = new Array(10 * 1024 * 1024);
const map = new Map();

map.set(arr, 1);
global.gc();
console.log(usageSize()); // ≈ 81.96M

arr = null;
global.gc();
console.log(usageSize()); // ≈ 81.96M
```

```javascript
// node --expose-gc weakmap.js
// weakmap.js
function usageSize() {
  const used = process.memoryUsage().heapUsed;
  return Math.round((used / 1024 / 1024) * 100) / 100 + "M";
}

global.gc();
console.log(usageSize()); // ≈ 1.79M

let arr = new Array(10 * 1024 * 1024);
const map = new Map();

map.set(arr, 1);
global.gc();
console.log(usageSize()); // ≈ 81.96M

arr = null;
global.gc();
console.log(usageSize()); // ≈ 1.96M
```

### 不可迭代键

因为 WeakMap 中键值对随时可能被销毁，所以没有必要提供迭代能力。当然，也不用提供 clear() 一次清除所有键值对的方法。

### 使用弱映射

1. 私有变量
2. DOM 节点元数据

## Set

ECMAScript 6 新增的 一种新集合类型。

### 基本 API

new 关键字 + Set 构造函数 创建一个空集合。

初始化，可以给 构造函数传入一个可迭代对象。

```javascript
const s1 = new Set(['val1', 'val2', 'val3'])

console.log(s1.size)

const s2 = new Set({
  [Symbol.iterator]: function*() {
    yield 'val1'
    yield 'val2'
    yield 'val3'
  }
})

console.log(s2.size)
```

add() 接受一个参数，用来增加元素数据，返回集合的实例。

has() 接受一个参数，查询是否存在。

size 取得元素数量

delete() 接受一个参数，删除对应元素，并返回一个布尔值，存在这个值时，返回 true 并删除；不存在则返回 false

clear() 销毁集合实例中所有值

### 顺序与迭代

Set 会维护值插入时的顺序，因此支持顺序迭代。

集合实例提供一个迭代器，能以插入顺序生成集合内容。可以通过 values() 方法及其别名方法 keys() 取得这个迭代器。

Symbol.iterator 属性，引用 values()。

```javascript
const s = new Set(['val1', 'val2', 'val3'])

console.log(s.values === s[Symbol.iterator]) // true
console.log(s.keys === s[Symbol.iterator]) // true
```

values() 是默认迭代器，可以对集合实例使用扩展操作，把集合转换为数组。

集合的 entries() 方法返回一个迭代器，可以按照插入顺序产生包含两个元素的数组，两个元素是每个值的重复出现。

```javascript
const s = new Set(['val1', 'val2', 'val3'])

for (let pair of s.entries()) {
  console.log(pair)
}

// ['val1', 'val1']
// ['val2', 'val2']
// ['val3', 'val3']
```

### 定义正式集合操作

```javascript
class XSet extends Set {
  union(...sets) {
    return XSet.union(this, ...sets)
  }

  intersection(...sets) {
    return XSet.intersection(this, ...sets)
  }

  difference(set) {
    return XSet.difference(this, set)
  }

  symmetricDifference(set) {
    return XSet.symmetricDifference(this, set)
  }

  cartesianProduct(set) {
    return XSet.cartesianProduct(this, set)
  }

  powerSet() {
    return XSet.powerSet(this)
  }

  // 返回两个或多个集合的并集
  static union(a, ...bSets) {
    const unionSet = new XSet(a)
    for(const b of bSets) {
      for(const bValue of b) {
        unionSet.add(bValue)
      }
    }
    return unionSet
  }

  // 返回两个或更多集合的交集
  static intersection(a, ...bSets) {
    const intersectionSet = new XSet(a)
    for(const aValue of intersectionSet) {
      for(const bValue of bSets) {
        if (!b.has(aValue)) {
          intersectionSet.delete(aValue)
        }
      }
    }
    return intersectionSet
  }

  // 返回两个集合的差集
  static difference(a, b) {
    const differenceSet = new XSet(a)
    for(const bValue of b) {
      if (a.has(bValue)) {
        differenceSet.delete(bValue)
      }
    }
    return differenceSet
  }

  // 返回两个集合的对称差集
  static symmetricDifference(a, b) {
    return a.union(b).difference(a.intersection(b))
  }

  // 返回两个集合的笛卡尔积
  // 必须返回数组集合，笛卡尔积可能包含相同值的对
  static catesianProduct(a, b) {
    const cartesianProductSet = new XSet()
    for(const aValue of a) {
      for(const bValue of b) {
        cartesianProductSet.add([aValue, bValue])
      }
    }
    return cartesianProductSet
  }

  // 返回一个集合的幂集
  static powerSet(a) {
    const powerSet = new XSet().add(new XSet())
    for(const aValue of a) {
      for(const set of new XSet(powerSet)) {
        powerSet.add(new XSet(set).add(aValue))
      }
    }
    return powerSet
  }
}
```

## WeakSet

ECMAScript 6 新增的 弱集合。

类比 WeakMap
