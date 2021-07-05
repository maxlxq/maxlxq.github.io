
# ByteDance

[推荐阅读：每日面试题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues "每日面试问题")

## 1.RandomString

<details>

<summary>
实现一个 randomString 函数，返回一个数组，
该数组内有一千个字符串，
每串字符串为6位数0-9的随机验证码，不可重复。
</summary>


```javascript
const MAX_LENGTH = 1000

function randomString() {
  const resObj = {}
  let count = 0
  while(count < MAX_LENGTH) {
    const str = parseInt(Math.random() * 1000000, 10).toString().padStart(6, '0')
    if (!resObj[str]) {
      resObj[str] = true
      count++
    }
  }
  return Object.keys(resObj)
}
```

</details>

## 2.异步相加

<details>

<summary>
实现一个 sum 函数，接收一个 arr，
累加 arr 的项，只能使用 add 方法，
该方法接收两个数，
模拟异步请求后端返回一个相加后的值
</summary>

```javascript
function add(a, b) {
  return Promise.resolve(a + b)
}

// 从前往后依次累加
function sum(arr) {
  console.time('sum')
  const res = new Promise(resolve => {
    arr.reduce((p, n) => p.then(val => add(val, n)), Promise.resolve(0)).then(resolve)
  })
  console.timeEnd('sum')
  return res
}

/*
变种：如果后端设置了并发限制，
一次不能请求超过三个，怎么办？
*/

// 设置等待队列，queue。
// 当并发数达到3个时，其余请求进入队列进行保存。
// 每释放一个请求时，自动读取下一个请求。
// 当并发请求数量为0并且等待队列为空时，返回结果

```

</details>
