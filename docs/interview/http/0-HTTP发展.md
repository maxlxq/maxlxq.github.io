# HTTP 发展

[HTTP 灵魂拷问](https://mp.weixin.qq.com/s/V1cl76Tv12VQpLTpJOjBYQ)

## HTTP/0.9 单行协议

HTTP/0.9 是于1991 年提出，主要用来在网络之间传递 HTML 超文本的内容，所以被称为**超文本传输协议**.

### 请求流程

- 因为 HTTP 都是基于 TCP 协议的，所以客户端先要根据 IP 地址、端口和服务器建立 TCP 连接，建立连接的过程就是 TCP 协议的三次握手
- 建立好连接后发送一个 GET 请求行的信息，如 GET /index.html 用来获取 index.html
- 服务端接收请求信息之后，读取对应的文件，并将数据以 ASCII 字符流返回给客户端
- HTML 文档传输完成后，断开连接

整个流程：

服务端：正确建立 TCP 连接后，接收客户端请求，处理数据，返回响应信息

客户端：构建请求 => DNS 解析查找 IP => 建立 TCP 连接 => 发起请求 => 接收响应 => 断开 TCP 连接

### HTTP/0.9 特点

- 只有一个请求行，并没有 HTTP 请求头和请求体
- 服务器也没有返回头信息，只返回数据
- 返回的文件内容是以 ASCII 字符流来传输的，因为都是 HTML 格式文件，所以 ASCII 字节码来传输比较合适

## HTTP/1.0 构建可扩展性

1994 年拨号上网出现，万维网不再局限于学术交流。随之而来的是万维网联盟 W3C 和 HTTP 工作组 HTTP-WG 的创建，致力于发展和改进 HTTP

增强内容

- 增加了 HEAD、POST 等新方法
- 增加了响应状态码，标记可能的错误原因
- 引入了协议版本号概念
- 引入了 HTTP Header （头部）的概念，让 HTTP 处理请求和响应更加灵活
- 传输的数据不再仅限于文本

浏览器中展示的文件不再只是 HTML 文件类型了，还包括了 JavaScript、CSS、图片、音频、视频等不同类型的文件。

因此**需要一个新的协议来支持多种类型的文件下载**，这也是 HTTP/1.0 的核心诉求，而且文件格式不仅仅局限于 ASCII 编码，还有很多其他编码文件

### 如何实现多种类型文件下载

HTTP/1.0 引入了请求头和相应头，它们都是以 Key-Value 形式保存的，在发送请求时会带上请求头信息，服务器返回数据时会先返回响应头信息。

### HTTP/1.0 如何通过请求头和响应头来支持多种不同类型数据

要支持多种类型的文件，我们就需要解决以下几个问题：

- 浏览器需要知道服务器返回的数据是什么类型，然后根据不同类型做针对性的处理
- 单个文件越来越大，需要减轻传输性能问题，服务器会对数据进行压缩后再传输，所以浏览器需要知道服务器压缩的方法
- 万维网是支持全球范围的，所以需要提供国际化支持，服务器对不同地区提供不同的语言版本，需要浏览器告知服务器需要什么语言版本的页面
- 由于增加了不同类型的文件，每种文件的编码形式可能又不一样，为了能准确地读取文件，浏览器需要知道文件的编码类型

基于以上问题，HTTP/1.0 的方案是通过请求头和响应头来进行协调，发起请求时会通过 HTTP 请求头告诉服务器需要什么类型的文件、采取什么形式的压缩、提供什么语言的文件以及文件的具体编码。
最终发送的请求头如下：

```markdown
accept: text/html // 返回 html 类型文件
accept-encoding: gzip, deflate, br // 使用 gzip、deflate、br 之一的压缩方法
accept-Charset: ISO-8859-1,utf-8 // 文件编码为 UTF-8 或 ISO-8859-1
accept-language: zh-CH,zh // 优先语言为中文
```

服务器接收到浏览器发送过来的请求头信息之后，会根据请求头的信息来准备相应数据。服务器会根据支持的压缩方法，返回匹配的响应信息。

```markdown
content-encoding: br // 服务器仅支持 br 压缩方式
content-type: text/html; charset=UTF-8 // 文件类型 html，文件编码 UTF-8
```

以上就是 HTTP/1.0 支持多文件的一个基本流程

### HTTP/1.0 特点

- 有些请求服务器无法处理或处理错误，需要告诉浏览器处理该请求的情况，所以引入了**状态码**。通过响应行的方式来通知浏览器
- 减轻服务器的压力，在 HTTP/1.0 中提供了 **Cache** 机制，用来缓存已经下载过的数据
- 服务器需要统计客户端的基础信息，所以还在请求头中加入了**用户代理**的字段

## HTTP/1.1 标准化协议

随着技术的继续发展，需求也在不断迭代更新，这就出现了 HTTP/1.1

主要变更点

- 增加了 PUT、DELETE 等新的方法
- 增加了缓存管理和控制
- 明确了连接管理，允许持久连接
- 允许响应数据分块，利于传输大文件
- 强制要求 Host 头，让互联网主机托管成为可能

### HTTP/1.1 改进点

#### 1、改进持久连接

HTTP/1.0 每进行一次 HTTP 通信，都会经历 **建立 TCP 连接、传输 HTTP 数据和断开 TCP 连接** 这三个阶段。

随着浏览器的普及，单个页面中的图片文件越来越多，有时一个页面可能包含几百个外部资源，如果每个请求都经历以上三个阶段，那会增加大量无用的开销

HTTP/1.1 中增加了持久连接的方法，在一个 TCP 连接上可以传输多个 HTTP 请求，只要浏览器或服务器没有明确断开连接，那么该 TCP 连接会一直保持。

持久连接在 HTTP/1.1 中是默认开启的，如果不需要采用持久连接，需要在 HTTP 请求头中加上 Connection: close。

目前浏览器中对于同一个域名，默认允许同时建立 **6 个** TCP 持久连接。

#### 2、不成熟的 HTTP 管线化

持久连接减少了 TCP 的建立和断开次数，但是需要按顺序等待前面的请求返回之后才能进行下一次请求。
如果某个请求没有及时返回，就会阻塞后面所有请求，这就是**队头阻塞**问题

HTTP/1.1 试图用管线化技术来解决队头阻塞。
HTTP/1.1 中的管线化是指将多个 HTTP 请求整批提交给服务器的技术，虽然可以整批发送，但是服务器仍然需要根据请求顺序来回复浏览器的请求

#### 3、提供虚拟主机的支持

同一个 IP 下可能绑定了多个虚拟主机，每个虚拟主机都有自己的域名。

HTTP/1.1 的请求头重增加了 **Host** 字段，用来表示当前的域名地址，服务器根据不同的 Host 值进行不同处理。

#### 4、对动态生成的内容提供完美的支持

HTTP/1.0 中，需要在响应头中设置完整的数据大小，如 Content-Length: 901，
随着服务器端的发展，很多内容都不再是固定大小，很多页面都是动态生成的，因此在传输数据之前并不知道最终的数据大小，浏览器不知道何时会接收完所有的文件数据。

HTTP/1.1 通过引入 Chunk transfer 机制来解决这个问题，服务器会将数据分割成若干个数据块，每个数据块发送时会附带上上个数据块的长度，最后使用一个零长度的块作为发送数据完成的标志。

这样就提供了对动态内容的支持。

#### 5、客户端 Cookie、安全机制

HTTP/1.1 引入了客户端 Cookie 机制和安全机制。

### HTTP/1.1 最核心的三种

- 增加了持久连接
- 浏览器为每个域名最多维护 6 个 TCP 连接
- 使用 CDN 的实现域名分片机制

如果单个 TCP 的持久连接，下载 100 个资源所需要花费的时间是 100 *n* RTT，通过引入 CDN，就可以把整个时间缩短为 100 *n* RTT / (6 * CDN 个数)。

### HTTP/1.1 主要问题

对带宽的利用率不高

- TCP 的慢启动
  > 慢启动是 TCP 减少网络拥塞的一种策略，不能改变；

- 同时开启了多条 TCP 连接，那么这些连接会竞争固定的贷款
  > 多个 TCP 连接下载文件时，无法协商优先级，导致关键资源下载缓慢

- HTTP/1.1 队头阻塞
  > 当管道中当前请求没有技术之前，后续的请求只能处于阻塞状态；我们不能随意在一个管道中发送请求和接收内容。
  >
  > 这种等待过程中，CPU 被白白浪费了。
  >
  > 队头阻塞不能并行请求数据，所以很不利于浏览器优化。

## HTTP/2 为了更有益的表现

特点

- 二进制协议，不再是纯文本
- 可发起多个请求，废弃了 1.1 里的管道
- 允许专用算法压缩头部，减少数据传输量
- 允许服务器主动向服务器推送数据
- 增强了安全性，"事实上"要求加密通信

### HTTP/2 多路复用

慢启动和 TCP 连接之间相互竞争带宽，是由于 TCP 本身的机制导致的，而队头阻塞是由于 HTTP/1.1 的机制导致的

如何解决这些问题？

1、HTTP/2 的思路就是一个域名只使用一个 TCP 长连接来传输数据，这样整个页面只会进行一次慢启动，同时也避免了多个 TCP 连接竞争带宽所带来的问题。

2、队头阻塞的问题，在 HTTP/2 中需要实现资源的并行请求，任何时候都可以将请求发送给服务器，并不需要等待其他请求地完成；服务器也可以随时返回处理好的请求资源给浏览器

### HTTP/2 解决方案总结

- 一个域名只使用一个 TCP 长连接
- 消除队头阻塞问题

多路复用机制

每个请求都有一个对应的 ID，浏览器端可以随时将请求发送给服务器。
服务器接收到这些请求后，会根据自己的喜好来决定优先处理返回哪些内容。
因为每份数据都有对应的 ID，浏览器接收到之后会筛选出相同 ID 的内容，将其拼接为完整的 HTTP 响应数据。

当收到一个优先级高的请求时，服务器可以暂停之前的请求来优先处理关键资源的请求。

### 多路复用的实现

- 浏览器准备好请求数据，包括：请求行、请求头等信息，POST 请求还需有 请求体
- 数据经过二进制分帧层处理之后，会被转换成一个个带有请求 ID 编号的帧，通过协议栈将这些帧发送给服务器
- 服务器接收所有的帧之后，将所有相同 ID 的帧合并为一条完整的请求信息
- 服务器处理该请求，并将处理的响应行、响应头和响应体分别发送至二进制分帧层
- 二进制分帧层对响应数据进行相同处理，经过协议栈发送给浏览器
- 浏览器接收到响应帧之后，会根据 ID 编号将帧的数据提交给对应的请求

以上，通过引用二进制分帧层，就实现了 HTTP 的多路复用技术

## 后 HTTP/2 进化

多路复用 是 HTTP/2 的最核心功能，实现了资源的并行传输。
基于二进制分帧层，HTTP/2 还有很多其他特性：

### 1、可以设置请求的优先级

浏览器根据资源类型，在发起请求时自动向 HTTP/2 的 PRIORITY 帧中追加优先级信息，对前端开发者来说是不透明的。

一般来说，优先级：HTML > CSS > Blocking Script > Font >= Image >= Async Script

- [优先级问题，详见链接🔗](https://blog.cloudflare.com/better-http-2-prioritization-for-a-faster-web/)

### 2、服务器推送

HTTP/2 还可以直接将数据提前推送到浏览器。

用户请求一个 HTML 文件时，服务器知道 HTML 页面会用到几个重要的 JS 文件和 CSS 文件，那么在接收到 HTML 请求之后，附带将要使用的 CSS 和 JS 文件一并发送给浏览器，对首次打开页面的速度起到了关键的作用。

### 3、头部压缩

HTTP/2 对请求头和响应头进行了压缩。

目的：在传输的过程中，简化消息内容，降低消息大小

压缩算法介绍：
通信双方各自维护一本字典，记录着某些字符对应的文本内容。

1. header 里的字段列表视为 Key-Value 的有序集合，分别使用 8位字节表示 name 和 value
2. 当字段被编码/解码时，对应的字典会不断扩充
3. 在编码形式中，header 字段可以直接表示，也可以使用 header field tables 中对应的引用。
4. 文字值要么直接编码，要么使用静态 huffman 代码
5. 编码器负责决定在标题字段表中插入哪些标题字段作为新条目。解码器执行对编码器规定的报文字段表的修改，重建处理中的报头字段列表

### HTTP/2 缺陷

#### 1、TCP 的队头阻塞

在 TCP 传输过程中，由于单个数据包的丢失而造成的阻塞称为 TCP 上的队头阻塞

HTTP/2 中，多个请求时跑在同一个 TCP 管道中的，如果其中任意一路数据出现丢包，那么就会阻塞该 TCP 连接中的所有请求。

#### 2、TCP 建立连接的延时

网络延迟又称为 RTT（Round Trip Time）。
从浏览器发送一个数据包到服务器，再从服务器返回数据包到浏览器的整个往返时间称为 RTT。

HTTP/1 和 HTTP/2 都是使用 TCP 协议来传输的，如果使用 HTTPS 的话，还需要使用 TLS 协议来进行安全传输，而 TLS 也需要一个握手过程，这样就有两个握手延迟过程。

1. 建立 TCP 连接的时候，需要和服务器进行三次握手来确认连接成功，需要 1.5 个 RTT
2. 进行 TLS 连接，TLS 有两个版本 1.2 和 1.3，连接所花费时间不同，大概需要 1～2 个 RTT

传输数据之前，需要花费 3～4 个 RTT。若是服务器相隔比较远，那么一个 RTT 可能会有 100 ms 以上，那整个握手过程就需要 300～400 ms，那么用户就能明显感觉到"慢"了

#### 3、TCP 协议僵化

TCP 协议存在队头阻塞和建立连接延迟等缺点，却无法通过修改 TCP 协议来解决。

1. 中间设备僵化。
2. 操作系统僵化

## HTTP/3 未来

HTTP/2 存在一些比较严重的与 TCP 协议相关的缺陷，但由于 TCP 协议僵化，几乎不可能通过修改 TCP 协议自身来解决这些问题。

解决思路：绕过 TCP 协议，发明一个 TCP 和 UDP 之外的新的传输协议。但因为中间设备僵化，这些设备只认 TCP 和 UDP，新协议不能被很好地支持。
所以 HTTP/3 选择了一个折中协议——UDP 协议。

基于 UDP 实现了类似于 TCP 的多路数据流、传输可靠性等功能，这套功能称为 QUIC 协议。

### QUIC 协议

- 实现了类似 TCP 的流量控制、传输可靠性的功能。提供数据包重传、拥塞控制以及其他一些 TCP 中存在的特性。
- 继承了 TLS 加密功能。使用 TLS1.3，减少了握手所花费的时间。
- 实现了 HTTP/2 中的多路复用。和 TCP 不同，QUIC 实现了在同一物理连接上可以有多个独立的逻辑数据流。实现了数据流的单独传输，就解决了 TCP 中队头阻塞的问题。
- 实现快速握手功能。QUIC 是基于 UDP 的，所以 QUIC 可以实现使用 0-RTT 或 1-RTT 来建立连接，意味着 QUIC 可以使用最开的速度来发送和接收数据，大大提高首次打开页面的速度。

### HTTP/3 的挑战

1. 目前来看，服务器和浏览器端都没有对 HTTP/3 提供完整的支持。
2. 部署 HTTP/3 也存在着非常大的问题。系统内核对于 UDP 的优化远没有达到 TCP 的优化程度。
3. 中间设备僵化。这些设备对 UDP 的优化程度远远低于 TCP，有很大的丢包率。
