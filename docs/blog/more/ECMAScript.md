# ECMAScript

## 2021
- `String.prototype.replaceAll`: 展示 'hello world'.replaceAll('l', 'L') // 'heLLo worLd'
- `Promise.any`: 返回第一个获得的 `promise` 或 `AggregateError`
```javascript
try {
  const first = await Promise.any(promises);
  // Any of the promises was fulfilled.
} catch (error) {
  // All of the promises were rejected.
}
```

| 名称               	| 描述                  | 备注              |
| ------------------- | -------------------- | ----------------- |
| Promise.allSettled  | 不短路                | 在 ES2020 中添加 ✅ |
| Promise.all         | 输入值被拒绝时发生短路   | 在 ES2015 中添加 ✅ |
| Promise.race        | 输入值稳定后发生短路     | 在 ES2015 中添加 ✅ |
| Promise.any         | 满足输入值时发生短路     | 这个建议 🆕 预定于 ES2021 |

- [WeakRefs](https://github.com/tc39/proposal-weakrefs): 弱引用，不会阻止垃圾回收进行
- [Logical Assignment Operators](https://github.com/tc39/proposal-logical-assignment): 结合逻辑运算符和赋值表达式
```javascript
a ||= b
a || (a = b)

a &&= b
a && (a = b)

a ??= b
a ?? (a = b)
```
- `Numeric separators`: `1_000_000_000`, `1_123_123_321.38`

## 2020
- `String.prototype.matchAll`: 结合 `Array.from` 使用
- import(): 动态导入
- BigInt: `9213817878187189378912737189738912n`
- [Promise.allSettled](https://github.com/tc39/proposal-promise-allSettled): 不在乎成功或失败
```javascript
const promises = [fetch('index.html'), fetch('https://does-not-exist/')]

const results = await Promise.allSettled(promises);
const errors = results
  .filter(p => p.status === 'rejected') // 收集错误的回调
  .map(p => p.reason);
```
- [globalThis](https://github.com/tc39/proposal-global): 未理解
- for-in mechanics:
- Optional Chaining: 可选链，`a?.b?.c?.d`, `a?.b?.()`
- Nullish coalescing Operator: a = b ?? 'default string' // b 为 `null` or `undefined` 时有效，对`空字符串`和`0`不作处理
- [`import.meta`](https://github.com/tc39/proposal-import-meta): 未理解，未实践
