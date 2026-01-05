# 工作者线程

工作者线程（Web Workers）允许在后台运行 JavaScript 代码，不会阻塞主线程。

## 基本工作者线程

### 创建工作者线程

```javascript
// main.js (主线程)
const worker = new Worker('worker.js')

// 向工作者线程发送消息
worker.postMessage({ type: 'start', data: [1, 2, 3, 4, 5] })

// 接收工作者线程的消息
worker.onmessage = function(event) {
  console.log('Received from worker:', event.data)
}

// 错误处理
worker.onerror = function(event) {
  console.error('Worker error:', event.message)
}

// 终止工作者线程
worker.terminate()
```

```javascript
// worker.js (工作者线程)
self.onmessage = function(event) {
  const { type, data } = event.data

  if (type === 'start') {
    // 执行耗时操作
    const result = data.reduce((sum, num) => sum + num, 0)

    // 发送结果回主线程
    self.postMessage({ type: 'result', data: result })
  }
}

// 工作者线程的全局对象是 self
console.log('Worker started')
```

### 消息传递

```javascript
// 传递复杂数据
const complexData = {
  array: [1, 2, 3],
  object: { name: 'John', age: 30 },
  date: new Date(),
  regex: /test/i
}

worker.postMessage(complexData)

// 工作者线程接收
self.onmessage = function(event) {
  const data = event.data
  console.log(data.array)  // [1, 2, 3]
  console.log(data.object) // { name: 'John', age: 30 }
}

// 传递 ArrayBuffer
const buffer = new ArrayBuffer(1024)
worker.postMessage(buffer, [buffer])  // 转移所有权

// 工作者线程接收 ArrayBuffer
self.onmessage = function(event) {
  const buffer = event.data
  const view = new Uint8Array(buffer)
  // 现在主线程无法再访问这个 buffer
}
```

## 专用工作者线程

### 计算密集型任务

```javascript
// main.js
function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

const worker = new Worker('fib-worker.js')

worker.onmessage = function(event) {
  console.log('Fibonacci result:', event.data)
  document.getElementById('result').textContent = event.data
}

function calculateFib() {
  const n = parseInt(document.getElementById('number').value)
  worker.postMessage(n)
}
```

```javascript
// fib-worker.js
function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

self.onmessage = function(event) {
  const n = event.data
  const result = fibonacci(n)
  self.postMessage(result)
}
```

### 文件处理

```javascript
// main.js
const fileInput = document.getElementById('fileInput')
const worker = new Worker('file-worker.js')

worker.onmessage = function(event) {
  const { type, data } = event.data
  if (type === 'progress') {
    console.log(`Processing: ${data}%`)
  } else if (type === 'result') {
    console.log('File processed:', data)
  }
}

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0]
  worker.postMessage({ file })
})
```

```javascript
// file-worker.js
self.onmessage = function(event) {
  const { file } = event.data

  const reader = new FileReader()

  reader.onload = function(e) {
    const text = e.target.result
    const lines = text.split('\n')

    // 模拟处理进度
    for (let i = 0; i < lines.length; i++) {
      // 处理每一行
      const processedLine = lines[i].toUpperCase()

      // 报告进度
      const progress = Math.round((i / lines.length) * 100)
      self.postMessage({ type: 'progress', data: progress })
    }

    self.postMessage({ type: 'result', data: lines.length })
  }

  reader.readAsText(file)
}
```

## 共享工作者线程

```javascript
// 创建共享工作者线程
const sharedWorker = new SharedWorker('shared-worker.js')

// 连接到工作者线程
const port = sharedWorker.port
port.start()

// 发送消息
port.postMessage('Hello from main thread')

// 接收消息
port.onmessage = function(event) {
  console.log('Received from shared worker:', event.data)
}
```

```javascript
// shared-worker.js
const connections = new Set()

self.onconnect = function(event) {
  const port = event.ports[0]
  connections.add(port)

  port.onmessage = function(event) {
    console.log('Message from main thread:', event.data)

    // 广播消息给所有连接
    for (let connection of connections) {
      connection.postMessage('Message received: ' + event.data)
    }
  }

  port.start()
}
```

## 服务工作者线程

```javascript
// 注册服务工作者
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => {
      console.log('Service Worker registered:', registration.scope)
    })
    .catch(error => {
      console.error('Service Worker registration failed:', error)
    })
}
```

```javascript
// sw.js (服务工作者)
self.addEventListener('install', event => {
  console.log('Service Worker installing')
  // 预缓存资源
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/',
        '/styles.css',
        '/script.js'
      ])
    })
  )
})

self.addEventListener('fetch', event => {
  // 拦截网络请求
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 返回缓存的响应或发起网络请求
        return response || fetch(event.request)
      })
  )
})

self.addEventListener('activate', event => {
  console.log('Service Worker activating')
  // 清理旧缓存
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== 'v1') {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})
```

## 工作者线程管理

### 工作者线程池

```javascript
class WorkerPool {
  constructor(size, workerScript) {
    this.size = size
    this.workerScript = workerScript
    this.workers = []
    this.taskQueue = []
    this.availableWorkers = []

    this.initialize()
  }

  initialize() {
    for (let i = 0; i < this.size; i++) {
      const worker = new Worker(this.workerScript)
      worker.id = i

      worker.onmessage = (event) => {
        this.handleWorkerResponse(worker, event.data)
      }

      worker.onerror = (error) => {
        console.error('Worker error:', error)
        this.handleWorkerError(worker)
      }

      this.workers.push(worker)
      this.availableWorkers.push(worker)
    }
  }

  executeTask(taskData) {
    return new Promise((resolve, reject) => {
      const task = { data: taskData, resolve, reject }

      if (this.availableWorkers.length > 0) {
        this.assignTask(task)
      } else {
        this.taskQueue.push(task)
      }
    })
  }

  assignTask(task) {
    const worker = this.availableWorkers.pop()
    worker.currentTask = task
    worker.postMessage(task.data)
  }

  handleWorkerResponse(worker, result) {
    const task = worker.currentTask
    task.resolve(result)

    // 清理
    delete worker.currentTask

    // 检查队列中是否有等待的任务
    if (this.taskQueue.length > 0) {
      const nextTask = this.taskQueue.shift()
      this.assignTask(nextTask)
    } else {
      this.availableWorkers.push(worker)
    }
  }

  handleWorkerError(worker) {
    const task = worker.currentTask
    if (task) {
      task.reject(new Error('Worker execution failed'))
      delete worker.currentTask
    }

    // 重新初始化出错的工作者
    const index = this.workers.indexOf(worker)
    if (index !== -1) {
      worker.terminate()
      const newWorker = new Worker(this.workerScript)
      this.workers[index] = newWorker
      this.availableWorkers.push(newWorker)
    }
  }

  terminate() {
    this.workers.forEach(worker => worker.terminate())
    this.workers = []
    this.availableWorkers = []
    this.taskQueue = []
  }
}

// 使用工作者线程池
const pool = new WorkerPool(4, 'compute-worker.js')

async function runTasks() {
  const tasks = [1, 2, 3, 4, 5, 6, 7, 8].map(n => pool.executeTask({ number: n }))

  try {
    const results = await Promise.all(tasks)
    console.log('All results:', results)
  } catch (error) {
    console.error('Task execution failed:', error)
  } finally {
    pool.terminate()
  }
}

runTasks()
```

## 总结

工作者线程为 JavaScript 提供了并发执行能力：

1. **专用工作者线程**：处理计算密集型任务
2. **共享工作者线程**：多个页面间共享
3. **服务工作者线程**：离线应用和网络代理
4. **工作者线程池**：管理工作者线程集合

合理使用工作者线程可以显著提升应用性能和响应性。
