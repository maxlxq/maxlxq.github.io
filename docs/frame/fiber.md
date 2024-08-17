# Fiber 详解
>
> Fiber 是比线程更小的粒度
>
> 在 V16 版本中增加了调度器，引入了 fiber 协程管理，通过异步可中断更新，替换 V15 版本的同步更新，
> Scheduler 判定任务的优先级，通知 Reconciler 何时进行更新；
> V15 的虚拟 dom 树已无法满足这种更新方式，因此使用 fiber 节点树来代替原来的虚拟 dom 树

## Fiber tree VS Virtual tree

Fiber Tree 多了 expirationTime 过期时间，这样可以把每个节点当作一个独立的 task。
当一个节点发生 update 时，通过这个节点的过期时间进行任务调度。
比如 节点发生 update 时，则会一致向上找到 Fiber Root，进行所有的调度更新。
同时这也是 React 不好的地方，这也是为什么要用到 shouldComponentUpdate 进行拦截优化，防止过度更新

## 数据结构

```javascript
function FiberNode(
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode
) {
  // Instance
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // Fiber
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;

  // Effects
  this.flags = NoFlags;
  this.subtreeFlags = NoFlags;
  this.deletions = null;

  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  this.alternate = null;
  // ...
}
```

## 运行原理

Fiber 如何调度任务

- 任务队列：这是一个循环双向链表（每个节点有 previous 和 next 两个属性来分别指向前后两个节点，同时最后一个节点的 next 指向第一个节点）
- Fiber 任务：按优先级排序，expirationTime *过期时间* 计算优先级顺序
- Fiber 利用 **浏览器渲染机制** 来执行任务
  - *理想状态下，每一帧为 1000ms/60FPS = 16.7ms/帧*
  - 当渲染耗时不足 16.7ms 时，剩余的时间即为每一帧的空闲时间
  - 空闲之间内，Fiber 可以处理优先级高的任务，避免占用主线程
  - 若执行完优先级最高的任务后，空闲时间还有剩余，则取到 next 任务接着执行
  - 当时间超过每一帧的时间后，中断执行
  - 主线程继续渲染下一帧，在下一帧的空闲时间内，继续执行上一帧未执行完的任务，如此反复

## requestAnimationFrame 模拟帧
>
> MDN: 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
>
> 若你想在浏览器下次重绘之前继续更新下一帧动画，那么回调函数自身必须再次调用`window.requestAnimationFrame()`
>
> 通常每秒执行 60 次。
>
> 参数为传入的回调函数，回调函数会被传入 DOMHighResTimeStamp 参数，与 performance.now() 的返回值相同。
> 表示开始去执行 requestAnimationFrame() 开始去执行回调函数的时刻。
> > `performance.now()`是浏览器内置的时钟，从页面加载开始计时，返回到当前的总时间，单位`ms`
>
> 返回值是一个 long 整数，请求 ID，是回调列表中的唯一的标识。
> 可以传这个值给 window.cancelAnimationFrame() 用以取消回调函数。

requestAnimationFrame 只有在激活的时候才能使用，可以大大节省 CPU 开销

```javascript
// demo from MDN
const element = document.getElementById('some-element-you-want-to-animate');
let start;

function step(timestamp) {
  if (start === undefined)
    start = timestamp;
  const elapsed = timestamp - start;

  //这里使用`Math.min()`确保元素刚好停在200px的位置。
  element.style.transform = 'translateX(' + Math.min(0.1 * elapsed, 200) + 'px)';

  if (elapsed < 2000) { // 在两秒后停止动画
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
```

## MessageChannel

虽然 requestAnimationFrame 可以模拟实现 requestIdleCallback，但是它占用了**主线程**的渲染，
因此不能在这里执行宏任务，而是通过它计算剩余时间。

同时 Fiber 采用了 MessageChannel 机制来执行任务

> MDN: MessageChannel
> > MessageChannel 接口允许我们创建一个新的消息通道，并通过它的两个 MessagePort 属性发送数据
> 此特性可以在 web worker 中使用
>
> > MessageChannel.port1: OnlyRead
> >
> > MessageChannel.port2: OnlyRead
>
> 构造函数：MessageChannel(), 返回一个带有两个 MessagePort 属性的 MessageChannel 新对象

```javascript
// MDN 示例
var channel = new MessageChannel();
var para = document.querySelector('p');

var ifr = document.querySelector('iframe');
var otherWindow = ifr.contentWindow;

ifr.addEventListener("load", iframeLoaded, false);

function iframeLoaded() {
  otherWindow.postMessage('Hello from the main page!', '*', [channel.port2]);
}

channel.port1.onmessage = handleMessage;
function handleMessage(e) {
  para.innerHTML = e.data;
}
```

## React 17 中，使用 lanes 模型替代 expirationTime 模型

使用 lanes 模型替代 expirationTime 模型

- lanes 优先级管理: 解决了从前的每次只能执行一个任务，到现在可以同时执行多个任务的能力
  - lanes 指定一个连续的优先级区间，如果 update 的优先级在这个区间内，则将位于该区间内的任务生成对应的页面快照
  - lanes 使用 31 位的二进制，其中每个 bit 被称为一个 lane，代表优先级；
  - 某几个 lane 组成的二进制数被称为一个 lanes，代表一批优先级，这样 react 可以分别给 IO 任务、低优先级的任务分配不同的 lane，最后可以并发执行这几种类型的优先级

> 其本质是[**叠加算法**]，多个任务可以叠加表示，用 JS 来表示就是一个状态队列 `{ lanes: [1, 2, 3] }`,
> 表示 fiber 有三个不同的优先级，他们应该被批处理
>
> React 作者 acdlite 觉得操作状态队列不够方便，进而采用了一种"位运算代替状态队列"的方式：
> `{ lanes: 0b10010 }`, 新的 lane 算法中， lanes 是一个二进制数，比如 `10010` 是由 `10000` and `00010` 两个任务叠加而成

## 源码剖析

<details>
<summary>
新的 lane 算法中，lanes 是一个二进制数，
变量只列出 31 位，由于 JS 中位运算都会转成 Int32，最多为 32 位，且最高位是符号位。
所以 除去符号位，最多只有 31 位可以参与运算
</summary>

```javascript
// ReactFiberLane.new.js 部分源码
// 变量只列出 31 位，由于 JS 中位运算都会转成 Int32，最多为 32 位，且最高位是符号位。
// 所以 除去符号位，最多只有 31 位可以参与运算
const TotalLanes = 31;

export const NoLanes: Lanes = /*                        */ 0b0000000000000000000000000000000;
export const NoLane: Lane = /*                          */ 0b0000000000000000000000000000000;

export const SyncLane: Lane = /*                        */ 0b0000000000000000000000000000001;
export const SyncBatchedLane: Lane = /*                 */ 0b0000000000000000000000000000010;

export const InputDiscreteHydrationLane: Lane = /*      */ 0b0000000000000000000000000000100;
const InputDiscreteLanes: Lanes = /*                    */ 0b0000000000000000000000000011000;

const InputContinuousHydrationLane: Lane = /*           */ 0b0000000000000000000000000100000;
const InputContinuousLanes: Lanes = /*                  */ 0b0000000000000000000000011000000;

export const DefaultHydrationLane: Lane = /*            */ 0b0000000000000000000000100000000;
export const DefaultLanes: Lanes = /*                   */ 0b0000000000000000000111000000000;

const TransitionHydrationLane: Lane = /*                */ 0b0000000000000000001000000000000;
const TransitionLanes: Lanes = /*                       */ 0b0000000001111111110000000000000;

const RetryLanes: Lanes = /*                            */ 0b0000011110000000000000000000000;

export const SomeRetryLane: Lanes = /*                  */ 0b0000010000000000000000000000000;

export const SelectiveHydrationLane: Lane = /*          */ 0b0000100000000000000000000000000;

const NonIdleLanes = /*                                 */ 0b0000111111111111111111111111111;

export const IdleHydrationLane: Lane = /*               */ 0b0001000000000000000000000000000;
const IdleLanes: Lanes = /*                             */ 0b0110000000000000000000000000000;

export const OffscreenLane: Lane = /*                   */ 0b1000000000000000000000000000000;

export const NoTimestamp = -1;
```

</details>

<br>

<details>
<summary>
定义优先级任务，数值越大，优先级越高
</summary>

```javascript
// ReactFiberLane.new.js 部分源码， 定义优先级任务，数值越大，优先级越高
export const SyncLanePriority: LanePriority = 15;
export const SyncBatchedLanePriority: LanePriority = 14;

const InputDiscreteHydrationLanePriority: LanePriority = 13;
export const InputDiscreteLanePriority: LanePriority = 12;

const InputContinuousHydrationLanePriority: LanePriority = 11;
export const InputContinuousLanePriority: LanePriority = 10;

const DefaultHydrationLanePriority: LanePriority = 9;
export const DefaultLanePriority: LanePriority = 8;

const TransitionHydrationPriority: LanePriority = 7;
export const TransitionPriority: LanePriority = 6;

const RetryLanePriority: LanePriority = 5;

const SelectiveHydrationLanePriority: LanePriority = 4;

const IdleHydrationLanePriority: LanePriority = 3;
const IdleLanePriority: LanePriority = 2;

const OffscreenLanePriority: LanePriority = 1;

export const NoLanePriority: LanePriority = 0;
```

</details>

<br>

<details>
  <summary>
    getHighestPriorityLanes 方法中进行判断 lanes 是否包含: SyncLane、SyncBatchedLane、InputDiscreteHydrationLane 等等
  </summary>

```javascript
function getHighestPriorityLanes(lanes: Lanes | Lane): Lanes {
  if ((SyncLane & lanes) !== NoLanes) {
    return_highestLanePriority = SyncLanePriority;
    return SyncLane;
  }
  if ((SyncBatchedLane & lanes) !== NoLanes) {
    return_highestLanePriority = SyncBatchedLanePriority;
    return SyncBatchedLane;
  }
  if ((InputDiscreteHydrationLane & lanes) !== NoLanes) {
    return_highestLanePriority = InputDiscreteHydrationLanePriority;
    return InputDiscreteHydrationLane;
  }
  const inputDiscreteLanes = InputDiscreteLanes & lanes;
  if (inputDiscreteLanes !== NoLanes) {
    return_highestLanePriority = InputDiscreteLanePriority;
    return inputDiscreteLanes;
  }
  if ((lanes & InputContinuousHydrationLane) !== NoLanes) {
    return_highestLanePriority = InputContinuousHydrationLanePriority;
    return InputContinuousHydrationLane;
  }
  const inputContinuousLanes = InputContinuousLanes & lanes;
  if (inputContinuousLanes !== NoLanes) {
    return_highestLanePriority = InputContinuousLanePriority;
    return inputContinuousLanes;
  }
  if ((lanes & DefaultHydrationLane) !== NoLanes) {
    return_highestLanePriority = DefaultHydrationLanePriority;
    return DefaultHydrationLane;
  }
  const defaultLanes = DefaultLanes & lanes;
  if (defaultLanes !== NoLanes) {
    return_highestLanePriority = DefaultLanePriority;
    return defaultLanes;
  }
  if ((lanes & TransitionHydrationLane) !== NoLanes) {
    return_highestLanePriority = TransitionHydrationPriority;
    return TransitionHydrationLane;
  }
  const transitionLanes = TransitionLanes & lanes;
  if (transitionLanes !== NoLanes) {
    return_highestLanePriority = TransitionPriority;
    return transitionLanes;
  }
  const retryLanes = RetryLanes & lanes;
  if (retryLanes !== NoLanes) {
    return_highestLanePriority = RetryLanePriority;
    return retryLanes;
  }
  if (lanes & SelectiveHydrationLane) {
    return_highestLanePriority = SelectiveHydrationLanePriority;
    return SelectiveHydrationLane;
  }
  if ((lanes & IdleHydrationLane) !== NoLanes) {
    return_highestLanePriority = IdleHydrationLanePriority;
    return IdleHydrationLane;
  }
  const idleLanes = IdleLanes & lanes;
  if (idleLanes !== NoLanes) {
    return_highestLanePriority = IdleLanePriority;
    return idleLanes;
  }
  if ((OffscreenLane & lanes) !== NoLanes) {
    return_highestLanePriority = OffscreenLanePriority;
    return OffscreenLane;
  }
  if (__DEV__) {
    console.error('Should have found matching lanes. This is a bug in React.');
  }
  // This shouldn't be reachable, but as a fallback, return the entire bitmask.
  return_highestLanePriority = DefaultLanePriority;
  return lanes;
}
```

</details>

```javascript
// 分离出最高优先级
function getHighestPriorityLane(lanes: Lanes) {
  return lanes & -lanes;
}
```

通过 `lanes & -lanes` 可以分离出所有比特位中最右边的 `1` ，具体解释如下：

1. 假如 `lanes(InputDiscreteLanes) = 0b0000000000000000000000000011000`
2. 那么 `-lanes = 0b1111111111111111111111111101000`
3. 所以 `lanes & -lanes = 0b0000000000000000000000000001000`
4. 至此，分离出了最右边的 1
5. 通过 lanes 的定义，数字越小的优先级越高，所以此方法可以获取最高优先级

```javascript
// 分离出最低优先级
function getLowestPriorityLane(lanes: Lanes): Lane {
  // This finds the most significant non-zero bit.
  // const clz32 = Math.clz32 ? Math.clz32 : clz32Fallback;
  // clz32(lanes)返回一个数字在转换成 32 无符号整形数字的二进制形式后, 前导 0 的个数
  const index = 31 - clz32(lanes);
  return index < 0 ? NoLanes : 1 << index;
}
```

1. 假设 `lanes(InputDiscreteLanes) = 0b0000000000000000000000000011000`
2. 那么 `clz32(lanes) = 27`, 源码中被书写成 31 位，但转换成标准 32 位后获取前导 0 的个数是 27 个
3. `index = 31 - clz32(lanes) = 4`
4. 最后 `1 << index = 0b0000000000000000000000000010000`
5. 相比最初的 `InputDiscreteLanes`, 分离出来了最左边的`1`
6. 通过 `lanes` 的定义，数字越小的优先级越高，所以此方法可以获取最低优先级的 `lane`

## 调度

## 协调

## 渲染
