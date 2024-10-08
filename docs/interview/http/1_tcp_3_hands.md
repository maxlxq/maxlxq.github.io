
# TCP 三次握手

目的：确认双方均具有发送和接收数据的能力

- 第一次，客户端发送连接请求，标志位 SYN = 1，序号 seq = x，并进入 SYN_SEND 状态，[客户端发送能力]
- 第二次，服务端接收到客户端的连接请求，发送确认包，标志位 SYN = 1，ACK = 1，序号 seq = y，ack = x + 1，并进入 SYN_RECEIVED 状态；[服务端接收能力和发送能力]
- 第三次，客户端接收到服务端的应答请求，发送确认包，标志位 SYN = 0，ACK = 1，序号 ack = y + 1，并进入 ESTABLISHED 状态，服务器端接收到这个包时，也进入 ESTABLISHED 状态。[客户端具有接收能力]

至此，TCP 握手结束。

「TP：欠一个手绘流程图：三次握手」

## 四次挥手

目的：确认双方均失去发送和接收数据的能力

- 第一次，客户端发起断开连接请求，标志位 FIN = 1，序号 seq = x，并进入 FIN_WAIT_1 状态。[客户端失去发送能力]
- 第二次，服务端接收到断开连接请求，发送确认包，标志位 ACK = 1，序号 ack = x + 1，并进入 CLOSE_WAIT 状态。
- 第三次，服务端发送断开连接请求，标志位 FIN = 1，序号 seq = y，并进入 LAST_ACK 状态，等待来自客户端最后一个 ACK。[服务端失去发送能力]
- 第四次，客户端接收到断开连接请求，发送确认包，并进入 TIME_WAIT 状态，等待可能出现的重传 ACK 包。服务端接收到这个确认包之后，关闭连接，进入 CLOSED 状态。[服务端失去接收能力]

客户端等待两个最大生命周期 2MSL 之后，没有收到服务端的 ACK，认为服务器端已正常关闭，于是也关闭连接，进入 CLOSED 状态。[客户端失去接收能力]

「TP：再欠一个手绘流程图：四次挥手」

## 补充

SYN 攻击

在三次握手过程中，服务器半连接状态下，需要收到 ACK 包才能进入 ESTABLISHED 状态。

SYN 攻击是指，攻击客户端 在短时间内伪造大量不存在的 IP 地址，向服务器不断地发送 SYN 包，服务器会不断回复确认包，并等待客户端的确认。因为源地址是伪造的、不存在的，所以服务器会不断的重发直至超时，这些伪造的 SYN 包将长时间占用未连接队列，正常的 SYN 请求就可能会被丢弃，导致目标系统运行缓慢，严重者甚至引起网络堵塞、系统瘫痪。

SYN 攻击是一种典型的 DDoS 攻击。

检测 SYN 攻击的方法

当看到服务器上有大量的半连接状态，特别是源 IP 地址随机分布，基本上可以断定是一次 SYN 攻击。

防御 SYN 攻击的方法

- 缩短 超时时间
- 增加最大半连接数
- 过滤网关防护
- SYN cookies 技术

## TCP KeepAlive

基本原理：隔一段时间给连接对端发送一个探测包，如果收到对方回应的 ACK，则认为连接依旧存活；在超过一定重试次数之后还是没有收到对方的回应，则丢弃该 TCP 连接。
