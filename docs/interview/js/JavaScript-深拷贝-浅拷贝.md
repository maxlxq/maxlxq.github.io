# JavaScript-深拷贝、浅拷贝

区别：
- 浅拷贝只是复制对象属性的引用
- 深拷贝是彻底复制一个对象

## 浅拷贝

```javascript
// 遍历赋值
function simpleCopy(target) {
  const obj = {}
  for(let key in target) {
    obj[key] = target[key]
  }
  return obj
}

// Object.assign 实现
{
  const obj = { a: { a: 'hello', b: 21 } }
  const copyObj = Object.assign({}, obj)
}

// 展开运算符 ...

// Array.prototype.concat

// Array.prototype.slice
```

## 深拷贝

```javascript
function deepClone(target) {
  const map = new WeakMap()

  const isObject = data => (typeof data === 'object' && data) || typeof data === 'function'

  const clone = data => {
    if (!isObject(data)) return data

    if ([Date, RegExp].includes(data.constructor)) {
      return new data.constructor(data)
    }

    if (typeof data === 'function') {
      return new Function('return ' + data.toString())
    }

    const exist = map.get(data)
    if (exist) {
      return exist
    }

    if (data instanceof Map) {
      const result = new Map()
      map.set(data, result)
      data.forEach((val, key) => {
        if (isObject(val)) {
          result.set(key, clone(val))
        } else {
          result.set(key, val)
        }
      })
      return result
    }
    if (data instanceof Set) {
      const result = new Set()
      map.set(data, result)
      data.forEach(val => {
        if (isObject(val)) {
          result.add(clone(val))
        } else {
          result.add(val)
        }
      })
      return result
    }

    const keys = Reflect.ownKeys(data)
    const allDesc = Object.getOwnPropertyDescriptors(data)
    const result = Object.create(Object.getPrototypeOf(data), allDesc)
    map.set(data, result)
    keys.forEach(key => {
      const val = data[key]
      if (isObject(val)) {
        result[key] = clone(val)
      } else {
        result[key] = val
      }
    })
    return result
  }

  return clone(target)
}
```
