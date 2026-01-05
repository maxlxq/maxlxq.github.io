# 动画与 Canvas 图形

Canvas API 提供了一个通过 JavaScript 绘制图形的手段，支持 2D 和 3D 图形。

## Canvas 基础

### 创建 Canvas

```html
<canvas id="canvas" width="400" height="300">
  Your browser does not support the canvas element.
</canvas>
```

```javascript
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// 检查支持性
if (ctx) {
  console.log('Canvas is supported')
} else {
  console.log('Canvas is not supported')
}
```

### 基本属性

```javascript
// Canvas 元素属性
console.log(canvas.width)   // 宽度
console.log(canvas.height)  // 高度

// 修改尺寸（会清除画布内容）
canvas.width = 800
canvas.height = 600

// 样式属性
canvas.style.border = '1px solid black'
canvas.style.backgroundColor = '#f0f0f0'

// 获取设备像素比
const dpr = window.devicePixelRatio || 1

// 设置高分辨率画布
function setupHighDPI(canvas) {
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  canvas.style.width = rect.width + 'px'
  canvas.style.height = rect.height + 'px'

  const ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)
}
```

## 绘制基本图形

### 矩形

```javascript
// 填充矩形
ctx.fillStyle = 'red'
ctx.fillRect(10, 10, 100, 50)

// 描边矩形
ctx.strokeStyle = 'blue'
ctx.lineWidth = 2
ctx.strokeRect(120, 10, 100, 50)

// 清除矩形区域
ctx.clearRect(50, 25, 50, 25)

// 创建矩形路径（不绘制）
ctx.rect(10, 70, 100, 50)
ctx.fill()  // 填充路径
ctx.stroke() // 描边路径
```

### 路径

```javascript
// 开始新路径
ctx.beginPath()

// 移动到起点
ctx.moveTo(50, 50)

// 绘制直线
ctx.lineTo(150, 50)
ctx.lineTo(150, 100)
ctx.lineTo(50, 100)
ctx.closePath()  // 闭合路径

// 设置样式
ctx.fillStyle = 'green'
ctx.strokeStyle = 'black'
ctx.lineWidth = 3

// 填充和描边
ctx.fill()
ctx.stroke()
```

### 圆弧和圆

```javascript
// 绘制圆弧
ctx.beginPath()
ctx.arc(100, 100, 50, 0, Math.PI * 2)  // 圆心x, 圆心y, 半径, 开始角度, 结束角度
ctx.closePath()
ctx.fillStyle = 'orange'
ctx.fill()

// 绘制扇形
ctx.beginPath()
ctx.moveTo(200, 100)
ctx.arc(200, 100, 50, -Math.PI/2, Math.PI/2)
ctx.closePath()
ctx.fillStyle = 'purple'
ctx.fill()

// 绘制弧线
ctx.beginPath()
ctx.arc(300, 100, 40, 0, Math.PI, false)  // 不闭合
ctx.strokeStyle = 'red'
ctx.lineWidth = 3
ctx.stroke()
```

### 贝塞尔曲线

```javascript
// 二次贝塞尔曲线
ctx.beginPath()
ctx.moveTo(50, 200)
ctx.quadraticCurveTo(100, 150, 150, 200)  // 控制点x,y, 结束点x,y
ctx.strokeStyle = 'blue'
ctx.stroke()

// 三次贝塞尔曲线
ctx.beginPath()
ctx.moveTo(200, 200)
ctx.bezierCurveTo(250, 150, 300, 250, 350, 200)  // 控制点1x,y, 控制点2x,y, 结束点x,y
ctx.strokeStyle = 'green'
ctx.stroke()
```

## 样式和颜色

### 填充和描边样式

```javascript
// 颜色
ctx.fillStyle = '#ff0000'        // 红色
ctx.fillStyle = 'rgb(255, 0, 0)' // RGB
ctx.fillStyle = 'rgba(255, 0, 0, 0.5)' // RGBA
ctx.fillStyle = 'hsl(0, 100%, 50%)'     // HSL

// 渐变
const gradient = ctx.createLinearGradient(0, 0, 200, 0)
gradient.addColorStop(0, 'red')
gradient.addColorStop(0.5, 'yellow')
gradient.addColorStop(1, 'green')
ctx.fillStyle = gradient
ctx.fillRect(10, 10, 200, 100)

// 径向渐变
const radialGradient = ctx.createRadialGradient(100, 100, 0, 100, 100, 50)
radialGradient.addColorStop(0, 'white')
radialGradient.addColorStop(1, 'black')
ctx.fillStyle = radialGradient
ctx.fillRect(50, 50, 100, 100)
```

### 图案

```javascript
// 创建图案
const img = new Image()
img.onload = function() {
  const pattern = ctx.createPattern(img, 'repeat')  // repeat, repeat-x, repeat-y, no-repeat
  ctx.fillStyle = pattern
  ctx.fillRect(0, 0, 400, 300)
}
img.src = 'pattern.png'
```

### 阴影

```javascript
// 设置阴影
ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
ctx.shadowOffsetX = 5
ctx.shadowOffsetY = 5
ctx.shadowBlur = 10

// 绘制带阴影的图形
ctx.fillStyle = 'blue'
ctx.fillRect(50, 50, 100, 100)
```

## 文本

### 绘制文本

```javascript
// 设置字体
ctx.font = 'bold 24px Arial'
ctx.fillStyle = 'black'

// 填充文本
ctx.fillText('Hello Canvas', 50, 50)

// 描边文本
ctx.strokeStyle = 'red'
ctx.lineWidth = 1
ctx.strokeText('Hello Canvas', 50, 100)

// 文本对齐
ctx.textAlign = 'left'    // left, center, right
ctx.textBaseline = 'top'  // top, middle, bottom, alphabetic, hanging

// 获取文本度量
const metrics = ctx.measureText('Hello Canvas')
console.log(metrics.width)  // 文本宽度
```

### 文本样式

```javascript
// 字体样式
ctx.font = 'italic small-caps bold 24px/30px Georgia, serif'

// 文本方向（实验性）
ctx.direction = 'ltr'  // ltr, rtl, inherit
```

## 变换

### 基本变换

```javascript
// 保存和恢复状态
ctx.save()
ctx.fillStyle = 'red'
ctx.fillRect(10, 10, 50, 50)

ctx.restore()  // 恢复之前的状态
ctx.fillStyle = 'blue'
ctx.fillRect(70, 10, 50, 50)

// 平移
ctx.save()
ctx.translate(100, 100)
ctx.fillRect(0, 0, 50, 50)  // 实际绘制在 (100, 100) 位置
ctx.restore()

// 旋转
ctx.save()
ctx.rotate(Math.PI / 4)  // 45度
ctx.fillRect(50, 50, 50, 50)
ctx.restore()

// 缩放
ctx.save()
ctx.scale(2, 0.5)  // x轴放大2倍，y轴缩小为原来的一半
ctx.fillRect(100, 100, 50, 50)
ctx.restore()
```

### 变换矩阵

```javascript
// 重置变换矩阵
ctx.resetTransform()

// 设置变换矩阵
ctx.setTransform(1, 0, 0, 1, 0, 0)  // 重置为单位矩阵

// 变换相乘
ctx.transform(1, 0, 0, 1, 50, 50)  // 平移变换
ctx.transform(Math.cos(Math.PI/4), Math.sin(Math.PI/4),
              -Math.sin(Math.PI/4), Math.cos(Math.PI/4), 0, 0)  // 旋转变换
```

## 图像

### 绘制图像

```javascript
const img = new Image()
img.onload = function() {
  // 绘制完整图像
  ctx.drawImage(img, 10, 10)

  // 绘制缩放后的图像
  ctx.drawImage(img, 10, 10, 200, 150)

  // 绘制图像的一部分
  ctx.drawImage(img, 100, 100, 200, 150, 10, 10, 200, 150)
}
img.src = 'image.jpg'
```

### 图像数据

```javascript
// 获取图像数据
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
console.log(imageData.data)  // Uint8ClampedArray，RGBA 值

// 修改像素数据
for (let i = 0; i < imageData.data.length; i += 4) {
  // 反转颜色
  imageData.data[i] = 255 - imageData.data[i]       // R
  imageData.data[i + 1] = 255 - imageData.data[i + 1] // G
  imageData.data[i + 2] = 255 - imageData.data[i + 2] // B
  // imageData.data[i + 3] 是 Alpha 通道
}

// 放回图像数据
ctx.putImageData(imageData, 0, 0)
```

### 图像合成

```javascript
// 全局合成操作
ctx.globalCompositeOperation = 'source-over'  // 默认值
// 其他值：source-atop, source-in, source-out, destination-over, destination-atop 等

// 全局透明度
ctx.globalAlpha = 0.5

// 绘制半透明图像
ctx.drawImage(img, 10, 10)
```

## 动画

### 基本动画循环

```javascript
let x = 0
let direction = 1

function animate() {
  // 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 绘制物体
  ctx.fillStyle = 'red'
  ctx.fillRect(x, 100, 50, 50)

  // 更新位置
  x += direction * 2

  // 边界检查
  if (x > canvas.width - 50 || x < 0) {
    direction *= -1
  }

  // 下一帧
  requestAnimationFrame(animate)
}

// 开始动画
animate()
```

### 缓动动画

```javascript
// 缓动函数
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

function animateValue(start, end, duration, callback) {
  const startTime = Date.now()

  function update() {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = easeInOutQuad(progress)
    const currentValue = start + (end - start) * easedProgress

    callback(currentValue)

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  update()
}

// 使用示例
animateValue(0, 300, 1000, (value) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = 'blue'
  ctx.fillRect(value, 100, 50, 50)
})
```

### 精灵动画

```javascript
class Sprite {
  constructor(imageSrc, frameWidth, frameHeight, frameCount) {
    this.image = new Image()
    this.image.src = imageSrc
    this.frameWidth = frameWidth
    this.frameHeight = frameHeight
    this.frameCount = frameCount
    this.currentFrame = 0
    this.x = 0
    this.y = 0
  }

  update() {
    this.currentFrame = (this.currentFrame + 1) % this.frameCount
  }

  draw(ctx) {
    const sx = this.currentFrame * this.frameWidth
    ctx.drawImage(
      this.image,
      sx, 0, this.frameWidth, this.frameHeight,  // 源位置和尺寸
      this.x, this.y, this.frameWidth, this.frameHeight  // 目标位置和尺寸
    )
  }
}

// 使用精灵
const sprite = new Sprite('sprite.png', 32, 32, 8)

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  sprite.update()
  sprite.draw(ctx)
  requestAnimationFrame(animate)
}

sprite.image.onload = animate
```

## 性能优化

### 离屏渲染

```javascript
// 创建离屏画布
const offscreenCanvas = document.createElement('canvas')
offscreenCanvas.width = 400
offscreenCanvas.height = 300
const offscreenCtx = offscreenCanvas.getContext('2d')

// 在离屏画布上绘制复杂图形
function createComplexGraphic() {
  // 复杂的绘制操作
  offscreenCtx.fillStyle = 'red'
  for (let i = 0; i < 1000; i++) {
    offscreenCtx.fillRect(Math.random() * 400, Math.random() * 300, 2, 2)
  }
  return offscreenCanvas
}

// 主画布上绘制
const graphic = createComplexGraphic()
ctx.drawImage(graphic, 0, 0)
```

### 分层渲染

```javascript
// 背景层
function drawBackground() {
  ctx.fillStyle = '#f0f0f0'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

// UI层
function drawUI() {
  ctx.fillStyle = 'black'
  ctx.font = '20px Arial'
  ctx.fillText('Score: 100', 10, 30)
}

// 游戏对象层
function drawGameObjects(objects) {
  objects.forEach(obj => {
    ctx.fillStyle = obj.color
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height)
  })
}

// 分层绘制
function render() {
  drawBackground()
  drawGameObjects(gameObjects)
  drawUI()
}
```

## 总结

Canvas API 提供了强大的 2D 图形绘制能力：

1. **基本图形**：矩形、圆弧、路径、贝塞尔曲线
2. **样式设置**：颜色、渐变、图案、阴影
3. **文本绘制**：字体、样式、对齐方式
4. **变换操作**：平移、旋转、缩放、矩阵变换
5. **图像处理**：绘制图像、像素操作、合成模式
6. **动画技术**：requestAnimationFrame、缓动函数、精灵动画

合理使用 Canvas 可以创建丰富的视觉效果和交互体验。