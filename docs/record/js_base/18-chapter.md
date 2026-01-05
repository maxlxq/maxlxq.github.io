# JavaScript API

JavaScript API 提供了浏览器环境的各种功能接口。

## Atomics 和 SharedArrayBuffer

```javascript
// 创建 SharedArrayBuffer
const buffer = new SharedArrayBuffer(16)
const array = new Uint32Array(buffer)

// Atomics 操作
Atomics.store(array, 0, 123)        // 存储值
console.log(Atomics.load(array, 0)) // 读取值

// 原子操作
Atomics.add(array, 0, 1)             // 原子加法
Atomics.exchange(array, 0, 456)      // 原子交换
Atomics.compareExchange(array, 0, 456, 789) // 比较并交换

// 等待和通知
// Atomics.wait(array, 0, 0)          // 等待
// Atomics.notify(array, 0, 1)        // 通知
```

## 跨上下文消息

```javascript
// 窗口间消息传递
const popup = window.open('popup.html', 'popup')

// 发送消息
popup.postMessage('Hello from parent', '*')

// 接收消息
window.addEventListener('message', (event) => {
  console.log('Received:', event.data)
  console.log('Origin:', event.origin)
})

// iframe 间消息传递
const iframe = document.getElementById('iframe')
iframe.contentWindow.postMessage('Hello from parent', '*')
```

## Encoding API

```javascript
// TextEncoder
const encoder = new TextEncoder()
const uint8Array = encoder.encode('Hello World')
console.log(uint8Array)  // Uint8Array

// TextDecoder
const decoder = new TextDecoder()
const text = decoder.decode(uint8Array)
console.log(text)  // 'Hello World'

// 处理编码
const decoderGBK = new TextDecoder('gbk')
const decoderUTF8 = new TextDecoder('utf-8', { ignoreBOM: true })
```

## File 和 Blob API

```javascript
// 创建 Blob
const blob = new Blob(['Hello World'], { type: 'text/plain' })

// 从文件输入创建 Blob
const fileInput = document.getElementById('fileInput')
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0]
  console.log(file.name, file.size, file.type)

  // 读取文件
  const reader = new FileReader()
  reader.onload = () => console.log(reader.result)
  reader.readAsText(file)
})

// Blob URL
const url = URL.createObjectURL(blob)
const link = document.createElement('a')
link.href = url
link.download = 'hello.txt'
link.click()

// 清理 Blob URL
URL.revokeObjectURL(url)
```

## 拖放 API

```javascript
const dropZone = document.getElementById('dropZone')

// 拖拽事件
dropZone.addEventListener('dragenter', (event) => {
  event.preventDefault()
  dropZone.classList.add('dragover')
})

dropZone.addEventListener('dragleave', (event) => {
  event.preventDefault()
  dropZone.classList.remove('dragover')
})

dropZone.addEventListener('dragover', (event) => {
  event.preventDefault()
})

dropZone.addEventListener('drop', (event) => {
  event.preventDefault()
  dropZone.classList.remove('dragover')

  const files = event.dataTransfer.files
  for (let file of files) {
    console.log('Dropped file:', file.name)
  }
})

// 拖拽开始
const draggable = document.getElementById('draggable')
draggable.draggable = true

draggable.addEventListener('dragstart', (event) => {
  event.dataTransfer.setData('text/plain', draggable.id)
})
```

## Notifications API

```javascript
// 请求权限
Notification.requestPermission().then(permission => {
  console.log('Permission:', permission)
})

// 创建通知
function showNotification(title, options = {}) {
  if (Notification.permission === 'granted') {
    const notification = new Notification(title, {
      body: options.body || '',
      icon: options.icon || '',
      tag: options.tag || '',
      requireInteraction: options.requireInteraction || false
    })

    // 点击通知
    notification.onclick = () => {
      console.log('Notification clicked')
      notification.close()
    }

    // 自动关闭
    setTimeout(() => notification.close(), 3000)
  }
}

// 使用示例
showNotification('Hello!', {
  body: 'This is a notification',
  icon: 'icon.png'
})
```

## Streams API

```javascript
// 可读流
async function readStream(stream) {
  const reader = stream.getReader()

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      console.log('Chunk:', value)
    }
  } finally {
    reader.releaseLock()
  }
}

// 可写流
async function writeToStream(stream, data) {
  const writer = stream.getWriter()

  try {
    await writer.write(data)
    await writer.close()
  } finally {
    writer.releaseLock()
  }
}

// 转换流
class UpperCaseTransformer {
  transform(chunk, controller) {
    controller.enqueue(chunk.toUpperCase())
  }
}

const transformStream = new TransformStream(new UpperCaseTransformer())
```

## 定时器

```javascript
// setTimeout
const timeoutId = setTimeout(() => {
  console.log('Timeout executed')
}, 1000)

clearTimeout(timeoutId)

// setInterval
const intervalId = setInterval(() => {
  console.log('Interval executed')
}, 1000)

clearInterval(intervalId)

// requestAnimationFrame
function animate() {
  console.log('Animation frame')
  requestAnimationFrame(animate)
}

const animationId = requestAnimationFrame(animate)
cancelAnimationFrame(animationId)

// requestIdleCallback
const idleCallbackId = requestIdleCallback((deadline) => {
  console.log('Time remaining:', deadline.timeRemaining())
  // 执行低优先级任务
})

cancelIdleCallback(idleCallbackId)
```

## URL API

```javascript
// 创建 URL 对象
const url = new URL('https://example.com/path?query=value#hash')

console.log(url.href)       // 完整 URL
console.log(url.protocol)   // 'https:'
console.log(url.host)       // 'example.com'
console.log(url.pathname)   // '/path'
console.log(url.search)     // '?query=value'
console.log(url.hash)       // '#hash'

// 修改 URL
url.searchParams.set('newParam', 'newValue')
console.log(url.href)       // 更新后的 URL

// URLSearchParams
const params = new URLSearchParams('a=1&b=2&c=3')

params.append('d', '4')
params.set('a', 'updated')

console.log(params.get('a'))        // 'updated'
console.log(params.getAll('a'))     // ['updated']
console.log(params.has('b'))        // true
console.log(params.toString())      // 'a=updated&b=2&c=3&d=4'
```
