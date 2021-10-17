# 面试

## 前端基础

### 前端知识
0. [JS 运行原理 by Philip Roberts](https://www.bilibili.com/video/av37759434/)
1. [JS 继承方式](../base/JavaScript-继承.md)
2. [JS 异步解决方案的发展历程以及优缺点](./JS异步解决方案.md)
3. [JS 作用域相关问题](../base/JavaScript-作用域链.md)
4. [浏览器输入URL之后发生的故事](../base/性能优化-浏览器输入URL到页面展示发生了什么.md)
5. [ES5/ES6的继承除了写法意外有什么区别](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/20)
6. [介绍回流、重绘 以及 如何优化](../base/性能优化-重绘和回流.md)。标准判断：[CSS Triggers](https://csstriggers.com/)
7. [Http发展，Http2的多路复用](../more/HTTP发展.md)
8. [TCP 三次握手和四次挥手的理解，详细](../more/三次握手和四次挥手.md)
9. [TCP 稳定连接后，服务端无预警掉线重启，描述客户端和服务端的状态变换](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/21#issuecomment-518486351)
10. [React 中 setState 什么时候是同步，什么时候是异步？](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/17#issuecomment-610288316)
11. npm 模块安装机制，yarn呢？
12. 介绍 观察者模式 和 订阅发布模式 的区别，分别适合什么场景
13. 介绍 Redux 设计思想
14. 介绍 浏览器 和 Node 事件循环的区别
15. 介绍 模块化发展历程：`IIFE、AMD、CMD、CommonJS、UMD、webpack、ES Module、<script type="modlue">`
16. [cookie 和 token 都存放在 header 中，为什么不会劫持 token？](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/31#issuecomment-581009641)
17. [浏览器缓存读取规则](https://www.jianshu.com/p/54cc04190252)
18. Virtual DOM 真的比操作原生 DOM 快吗？
19. `a == 1 && a == 2 && a == 3`，如何设置 a，让判断为 `true`
20. 介绍 BFC 及其应用
21. div 水平垂直居中
22. 分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景

### 手撕代码
1. [模拟实现 new](../base/JavaScript-new模拟实现.md)
2. [模拟实现 apply](../base/JavaScript-apply和call.md)
3. [模拟实现 call](../base/JavaScript-apply和call.md)
4. [模拟实现 bind](../base/JavaScript-bind原理.md)
5. [模拟实现 instanceof](../base/JavaScript-instanceof原理.md)
6. [模拟实现 requestIdleCallback](requestIdleCallback模拟实现.md)
7. [模拟实现 promise](https://juejin.cn/post/6844904111821815816)
8. 模拟实现 防抖 debounce 和节流 throttle
9. [模拟实现 深拷贝、浅拷贝](../base/JavaScript-深拷贝-浅拷贝.md))
10. 模拟实现 flatten [递归｜迭代]
11. 模拟实现 sleep，从 Promise、Generator、Async/Await
12. 实现 (5).add(3).minus(2) 功能

### 算法知识
1. 广度优先遍历、深度优先遍历、先序遍历、中序遍历、后序遍历
2. 排序算法，时间复杂度，稳定性，实现 冒泡排序及优化，快速排序
3.

### 常考题目
1. 合并两个有序数组为一个有序数组
2. for 循环下打印 0-9 的所有写法

### 项目相关
1. [大文件上传](./JS大文件上传.md)

### 前端框架

React
1. Mixin => HOC => Hooks 发展
2. React 生命周期
3. 虚拟 DOM 和 DOM 节点
4. Diff 算法
5. Fiber 节点和 Fiber 树
6. React 16 和 React 17 区别
7. React 调度、调和过程
8. this.setState 同步异步问题，源码解析
9. React 源码解读

React-Native
1. React-Native 跨端原理
2. JS 与原生通信流程
3. 如何编写一个 原生方法给 JS 使用
4. 如何实现热更新
5. metro 分包机制
6. 原生与 RN 页面跳转方案
7. 动画和手势操作的演示
8. 双端的脚本打包
9. fastlane 一键发布

Vue
1. 与 React 的区别
2. MVVM 框架原理

## 设计模式

# 编程题

[编程题](./编程题.md)


### HTTP/HTML/浏览器
0. [说一下 HTTP 和 HTTPS](../better/0_http_https.md)
1. [TCP 三次握手，概括介绍；详细介绍；四次挥手呢](../better/1_tcp_3_hands.md)
2. [TCP 和 UDP 的区别](../better/2_tcp_udp.md)
3. WebSocket 的实现和应用
4. [HTTP 请求的方式，HEAD 方式](../better/4_http_request.md)
5. 一个图片 URL 访问后直接下载怎样实现
6. 说一下 web Quality（无障碍）
7. 几个很实用的 BOM 属性对象方法
8. 说一下 HTML5 Drag API
9. 说一下 HTTP2.0，HTTP 发展史
10. 补充 400 和 401、403 状态码，状态码介绍
11. fetch 发送 2 次请求的原因
12. Cookie、sessionStorage、localStorage 区别
13. 说一下 web worker
14. 对 HTML 语义化标签的理解
15. iframe 是什么？有什么缺点
16. Doctype 作用？严格模式与混杂模式如何区分？有何意义？
17. Cookie 如何防范 XSS 攻击
18. 强缓存、协商缓存
19. 介绍 RESTFUL
20. 讲一讲 viewport 和移动端布局
21. click 在 ios 上有 300ms 延迟，原因和解决方法
22. addEventListener 介绍
23. 画一个三角形 CSS
24. HTML5 新增元素
25. 输入一个 URL，完整流程
26. 常见的 HTTP 头部
27. cache-control 的值有哪些
28. 完整的页面渲染过程
29. CSRF 和 XSS 的网络攻击及防范

### CSS
0. CSS 盒模型介绍
1. 画一条 0.5px 的线
2. link 标签 和 import 标签的区别
3. transition 和 animation 的区别
4. flex 布局介绍
5. BFC，产生原因，作用
6. 垂直居中的几种方式
7. JS 动画 和 CSS3 动画的差异性
8. 说一下 块元素和行元素
9. 多行元素的文本省略号
10. 双边距重叠问题
11. position 属性比较
12. 浮动清除的方法
13. CSS3 新特性
14. CSS 选择器有哪些，优先级
15. CSS3 对溢出的处理
16. float 的元素，display 是什么
17. 三栏布局的实现方式
18. calc 属性
19. 重排和重绘
20. overflow 原理
21. box-sizing 的语法和基本用处
22. display: none 和 visibility: hidden
23. CSS 预处理器

### JavaScript
0. get 请求传参长度的误区
1. get、post 在缓存方面的区别
2. 闭包
3. 类的创建和继承，继承方法
4. 解决异步毁掉地狱
5. 事件流
6. 如何设置事件先冒泡后捕获
7. 事件委托
8. 图片的懒加载和预加载
9. mouseover 和 mouseenter 的区别
10. new 操作符原理
11. 改变函数内部 this 指针的指向函数
12. JS 位置判断，如何监听元素是否显示在可视区域。例如：clientHeight、scrollHeight、offsetHeight，scrollTop、offsetTop、clientTop
13. JS 拖拽功能的实现
14. 异步加载 JS
15. 节流和防抖
16. 垃圾回收机制
17. 前端模块化
18. CommonJS、AMD、CMD
19. [深拷贝](https://blog.csdn.net/cc18868876837/article/details/114918262)、浅拷贝
20. 手写 promise
21. 监听对象属性的改变
22. setTimeout、setInterval、requestAnimationFrame 的区别
23. 实现一个两列等高布局
24. bind、call、apply 手写
25. JS 控制一次加载一张图片，完成后再加载下一张
26. 代码的执行顺序
27. 如何实现 sleep 效果
28. Function.\_\_proto\_\_ / getPrototypeOf 是什么
29. node 的 Events 模块
30. 箭头函数中 this 指向问题，箭头函数特性
31. JS 类型判断，typeof、instanceof
32. 数组常用方法
33. 数组去重
34. 判断一个数组
35. 跨域
36. 暂时性死区
37. 事件模型
38. async/await
39. promise + Generator + async
40. JS 加载阻塞，解决方法
41. 实现一个轮播效果
42. 事件循环
43. arguments
44. 箭头函数 和 function 的区别

## 前端进阶

### 工程化
0. babel 原理
1. 如何实现一个 babel 插件
2. git 工作流描述
3. rebase 和 merge 的区别
4. git reset、git revert、git checkout 描述
5. webpack 和 gulp 的区别，模块化与流的区别

### Vue
0. 对 Vue 的理解
1. 优缺点
2. Vue 与 React 的区别
3. 虚拟 DOM
4. vue 生命周期
5. vue 如何监听键盘事件
6. watch 怎么深度监听对象变化
7. 删除数组使用 delete 和 Vue.delete 有什么区别
8. watch 和计算属性 区别
9. vue 双向绑定原理
10. v-model 是什么，如何使用
11. 3.0 为什么使用 Proxy API 替代 defineProperty API
12. 3.0 优化了什么
13. 3.0 新特性，Composition API
14. 权限管理如何做
15. created 和 mounted 两个生命周期中请求数据有什么区别
16. 对 proxy 的理解

### React
0. React 生命周期
1. 如何划分业务组件、技术组件
2. 性能优化
3. 虚拟 DOM 为什么提高性能
4. diff 算法描述
5. flux 思想
6. redux 中间件，saga、thunk
7. redux 缺点
8. React 解决了什么问题，为什么选用
9. React 协议
10. shouldComponentUpdate
11. 类组件和函数组件区别
12. 状态和属性 区别
13. 高阶组件
14. React 中使用箭头函数优点
15. 为什么建议传给 setState 的参数是一个 callback 而不是一个对象
16. 除了在构造函数中绑定 this，还有其他方式吗
17. 如何阻止组件渲染
18. 列表 key 如何设置。目的为何
19. 什么是 JSX

