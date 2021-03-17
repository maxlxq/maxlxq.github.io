(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{411:function(_,v,t){"use strict";t.r(v);var a=t(27),s=Object(a.a)({},(function(){var _=this,v=_.$createElement,t=_._self._c||v;return t("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[t("h1",{attrs:{id:"浏览器输入url系列"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#浏览器输入url系列"}},[_._v("#")]),_._v(" 浏览器输入URL系列")]),_._v(" "),t("p",[t("code",[_._v("在浏览器中输入一个 URL 连接，会发生什么？")])]),_._v(" "),t("p",[_._v("这是一道常见的面试题，如何回答的标准且覆盖全面是本文关注的重点。")]),_._v(" "),t("h2",{attrs:{id:"浏览器读取缓存"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#浏览器读取缓存"}},[_._v("#")]),_._v(" 浏览器读取缓存")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2019/1/5/1681c21e04552f77?w=2213&h=948&f=png&s=311173",alt:"浏览器缓存机制 - by InfoQ 浪里行舟"}})]),_._v(" "),t("ul",[t("li",[_._v("当浏览器根据缓存机制，能从本地读取有效缓存显示页面时，则优先读取本地缓存。")]),_._v(" "),t("li",[_._v("若缓存信息失效，则需要进行 HTTP 请求获取新数据。")]),_._v(" "),t("li",[_._v("即使从服务器请求到有效数据，若返回状态码为"),t("code",[_._v("304")]),_._v("则依旧使用本地缓存并更新缓存信息。")])]),_._v(" "),t("h2",{attrs:{id:"dns解析"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dns解析"}},[_._v("#")]),_._v(" DNS解析")]),_._v(" "),t("ul",[t("li",[_._v("缓存失效或无缓存，则准备进行 HTTP 请求")]),_._v(" "),t("li",[_._v("查找本地 hosts 文件，检查是否存在对应域名和IP关系")]),_._v(" "),t("li",[_._v("再去 DNS 服务器查找，从本地 DNS 服务器查询")]),_._v(" "),t("li",[_._v("转发到根域名服务器进行递归+迭代查询")]),_._v(" "),t("li",[_._v("本地服务器向根域名服务器查询一般使用 "),t("code",[_._v("迭代查询")]),_._v("：根域名服务器提供所知道的顶级域名服务器，顶级域名服务器提供知道的权限域名服务器")]),_._v(" "),t("li",[t("code",[_._v("递归查询")]),_._v("：客户端向本地DNS服务器查询")]),_._v(" "),t("li",[_._v("期间一旦找到对应的IP地址即立即作为响应报文发给客户端")])]),_._v(" "),t("h2",{attrs:{id:"ip-地址解析"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#ip-地址解析"}},[_._v("#")]),_._v(" IP 地址解析")]),_._v(" "),t("p",[t("code",[_._v("ARP 地址解析协议：实现由 IP 地址到 MAC 地址的转换")])]),_._v(" "),t("p",[_._v("每个主机都有一个 "),t("code",[_._v("APR 高速缓存")]),_._v("，里面有本局域网上的个主机和路由器的IP地址到MAC地址的映射表")]),_._v(" "),t("h2",{attrs:{id:"建立-tcp-连接"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#建立-tcp-连接"}},[_._v("#")]),_._v(" 建立 TCP 连接")]),_._v(" "),t("p",[t("code",[_._v("直到服务器的 MAC 地址后，开始进行 TCP 连接")])]),_._v(" "),t("h3",{attrs:{id:"三次握手"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#三次握手"}},[_._v("#")]),_._v(" 三次握手")]),_._v(" "),t("ul",[t("li",[_._v("第一次：客户端发送带有 SYN 标志的数据包，并生成一个序号 x，即："),t("code",[_._v("SYN = 1, seq = x")]),_._v(", 进入 SYN_SEND")]),_._v(" "),t("li",[_._v("第二次：服务端接收到客户端发送的数据包，并生成一个对应的数据包返回给客户端，内容包括："),t("code",[_._v("SYN = 1, ACK = 1, seq = y, ack = x + 1")]),_._v("，并变为SYN_RCVD状态")]),_._v(" "),t("li",[_._v("第三次：客户端接收到服务端的响应数据包，进入 ESTABLISHED 状态，生成数据包："),t("code",[_._v("ACK = 1, ack = y + 1")]),_._v(", 服务端收到确认信息后即进入 ESTABLISHED 状态")])]),_._v(" "),t("p",[_._v("第三次握手可以传递数据，若不传递数据，则不消耗序号。")]),_._v(" "),t("h2",{attrs:{id:"http-请求"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#http-请求"}},[_._v("#")]),_._v(" HTTP 请求")]),_._v(" "),t("p",[t("code",[_._v("TCP连接建立之后，即可处理HTTP请求")])]),_._v(" "),t("p",[_._v("请求报文包括：通用首部、请求首部、实体首部")]),_._v(" "),t("h2",{attrs:{id:"服务响应"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#服务响应"}},[_._v("#")]),_._v(" 服务响应")]),_._v(" "),t("p",[_._v("服务器接收到 HTTP 请求，进行端口转发处理请求，操作数据库等操作后，返回对应结果")]),_._v(" "),t("h3",{attrs:{id:"协商缓存"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#协商缓存"}},[_._v("#")]),_._v(" 协商缓存")]),_._v(" "),t("p",[_._v("响应中包含 304 状态吗，则表示资源文件未变化，使用浏览器原有缓存并更新缓存有效信息")]),_._v(" "),t("h2",{attrs:{id:"关闭-tcp-连接"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#关闭-tcp-连接"}},[_._v("#")]),_._v(" 关闭 TCP 连接")]),_._v(" "),t("p",[_._v("四次握手")]),_._v(" "),t("ul",[t("li",[_._v("第一次：客户端发起断开连接请求："),t("code",[_._v("FIN = 1, seq = x")]),_._v("，进入 FIN_WAIT_1 状态，"),t("strong",[_._v("客户端不再发送请求，但可以接受数据")])]),_._v(" "),t("li",[_._v("第二次：服务端接收到请求数据包，返回："),t("code",[_._v("ACK = 1, ack = x + 1")]),_._v(", 并进入 CLOSE_WAIT 状态，客户端收到后进入 FIN_WAIT_2 状态")]),_._v(" "),t("li",[_._v("第三次：服务端等待最后的响应数据包发送，使用最后的序号，返回："),t("code",[_._v("FIN = 1, seq = y")]),_._v(", 并进入 LAST_ACK 状态，"),t("strong",[_._v("服务端不再发送数据")])]),_._v(" "),t("li",[_._v("第四次：客户端接收到服务器的关闭请求，返回："),t("code",[_._v("ACK = 1, ack = y + 1")]),_._v(", 等待2个最大报文时间后进入 CLOSED 状态，"),t("strong",[_._v("客户端无法发送数据")]),_._v("，服务端收到关闭响应后直接进入 CLOSED 状态，"),t("strong",[_._v("服务端无法接受数据")])])]),_._v(" "),t("h2",{attrs:{id:"浏览器解析html"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#浏览器解析html"}},[_._v("#")]),_._v(" 浏览器解析HTML")]),_._v(" "),t("p",[_._v("todo")]),_._v(" "),t("h2",{attrs:{id:"布局渲染"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#布局渲染"}},[_._v("#")]),_._v(" 布局渲染")]),_._v(" "),t("p",[_._v("todo")])])}),[],!1,null,null,null);v.default=s.exports}}]);