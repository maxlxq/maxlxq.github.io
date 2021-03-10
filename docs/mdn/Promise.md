# Promise

> Promise 对象用于表示一个异步操作的最终完成/失败及其结果值。

### 三个状态
- Pending：处于等待状态，可以转移至执行态或拒绝态
- Fulfilled：处于执行状态，不能继续转移状态，必须拥有一个不可变的终值
- rejected：处于拒绝状态，不能继续转移状态，必须拥有一个不可变的据因

### Then 方法
一个 promise 必须提供一个 then 方法以访问其当前值、终值和据因

`promise.then(onFulfilled, onRejected)`
