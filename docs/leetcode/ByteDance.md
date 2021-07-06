
# ByteDance

[推荐阅读：每日面试题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues "每日面试问题")

[The Daily Byte](https://thedailybyte.dev/?ref=kevin)

## 121. 买卖股票的最佳时机

给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。

你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  const len = prices.length
  let min = prices[0], max = prices[0], dp = [0]
  for (let i = 1; i < len; i++) {
    if (prices[i] < min) {
      min = prices[i]
      dp[i] = 0
    } else if (prices[i] > max) {
      max = prices[i]
      dp[i] = prices[i] - min
    } else {
      dp[i] = prices[i] - min
    }
  }
  return Math.max(...dp)
};
```

## RandomString

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

## 异步相加

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
