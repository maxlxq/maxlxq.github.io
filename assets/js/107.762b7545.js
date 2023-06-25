(window.webpackJsonp=window.webpackJsonp||[]).push([[107],{480:function(v,_,l){"use strict";l.r(_);var t=l(27),i=Object(t.a)({},(function(){var v=this,_=v.$createElement,l=v._self._c||_;return l("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[l("h1",{attrs:{id:"http协议"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#http协议"}},[v._v("#")]),v._v(" HTTP协议")]),v._v(" "),l("p",[v._v("OSI 网络七层模型的 应用层")]),v._v(" "),l("p",[v._v("OSI 网络七层模型：")]),v._v(" "),l("ul",[l("li",[v._v("应用层：DNS、FTP、SNMP、HTTP")]),v._v(" "),l("li",[v._v("表示层")]),v._v(" "),l("li",[v._v("会话层")]),v._v(" "),l("li",[v._v("传输层：TCP、UDP")]),v._v(" "),l("li",[v._v("网络层：IP、ICMP、RIP、OSPF、BGP、ICMP")]),v._v(" "),l("li",[v._v("数据链路层：ARP、PARP")]),v._v(" "),l("li",[v._v("物理层")])]),v._v(" "),l("h2",{attrs:{id:"总结"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[v._v("#")]),v._v(" 总结")]),v._v(" "),l("h3",{attrs:{id:"get-和-post-请求的区别"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#get-和-post-请求的区别"}},[v._v("#")]),v._v(" GET 和 POST 请求的区别")]),v._v(" "),l("ul",[l("li",[v._v("GET 是一个幂等操作，不会对服务器资源产生影响；POST 一般会对服务器资源产生影响；")]),v._v(" "),l("li",[v._v("GET 请求缓存场景较多；POST 一般不缓存；")]),v._v(" "),l("li",[v._v("GET 请求报文中实体部分为空；POST 请求报文中实体为有效数据")]),v._v(" "),l("li",[v._v("GET 请求的参数在 url 会记录；")]),v._v(" "),l("li",[v._v("GET 请求的 url 在浏览器中有限制；")]),v._v(" "),l("li",[v._v("POST 参数传递支撑更多类型")])]),v._v(" "),l("h3",{attrs:{id:"常见的-http-请求头和响应头"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#常见的-http-请求头和响应头"}},[v._v("#")]),v._v(" 常见的 HTTP 请求头和响应头")]),v._v(" "),l("p",[v._v("请求头：")]),v._v(" "),l("ul",[l("li",[v._v("Accept：内容类型")]),v._v(" "),l("li",[v._v("Accept-Charset：字符集")]),v._v(" "),l("li",[v._v("Accept-Language：浏览器当前设置的语言")]),v._v(" "),l("li",[v._v("Accept-Encoding：压缩编码")]),v._v(" "),l("li",[v._v("Connection：浏览器与服务器之间连接的类型")]),v._v(" "),l("li",[v._v("Cookie：当前页面设置的 Cookie")]),v._v(" "),l("li",[v._v("Host：发出请求的页面所在域")]),v._v(" "),l("li",[v._v("Referer：发出请求的页面的 URL")]),v._v(" "),l("li",[v._v("User-Agent：浏览器的用户代理字符串")])]),v._v(" "),l("p",[v._v("响应头：")]),v._v(" "),l("ul",[l("li",[v._v("Data：消息发送的时间")]),v._v(" "),l("li",[v._v("Server：服务器名称")]),v._v(" "),l("li",[v._v("Connection：连接类型")]),v._v(" "),l("li",[v._v("Cache-Control：控制 HTTP 缓存")]),v._v(" "),l("li",[v._v("Content-Type：文档类型\n"),l("ul",[l("li",[v._v("application/x-www-form-urlencoded：浏览器原生 form 表单，数据存放在 body 中，按照 & 拼接，并对 key、value 进行转码")]),v._v(" "),l("li",[v._v("multipart/form-data：通常上传文件使用")]),v._v(" "),l("li",[v._v("application/json：服务器消息主体是序列化后的 JSON 字符串")]),v._v(" "),l("li",[v._v("text/html：提交 XML 格式数据")])])])]),v._v(" "),l("h3",{attrs:{id:"http-状态码"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#http-状态码"}},[v._v("#")]),v._v(" HTTP 状态码")]),v._v(" "),l("ul",[l("li",[v._v("10x：\n"),l("ul",[l("li",[v._v("100：继续，响应已被接收，且仍未被拒绝")]),v._v(" "),l("li",[v._v("101：切换协议，服务器理解客户端请求，通过 Upgrade 消息头通知客户端采用不同的协议来完成这个请求。")])])]),v._v(" "),l("li",[v._v("20x：\n"),l("ul",[l("li",[v._v("200：成功")]),v._v(" "),l("li",[v._v("201：Created，通常是 PUT 方法得到的响应码")]),v._v(" "),l("li",[v._v("202：Accepted，服务器已接受请求，但尚未处理。")]),v._v(" "),l("li",[v._v("203：未授权信息，服务器成功处理了请求，但返回的实体头部元信息无效")]),v._v(" "),l("li",[v._v("204：无内容，没有响应内容，只有响应头")]),v._v(" "),l("li",[v._v("205：重置内容")]),v._v(" "),l("li",[v._v("206：部分内容，分段下载使用")])])]),v._v(" "),l("li",[v._v("30x：\n"),l("ul",[l("li",[v._v("301：永久重定向，被请求资源被永久移动到新位置，通过响应的 Location 找到新的 URL。客户端访问正确地址后应当自动更换请求为当前地址，浏览器会缓存")]),v._v(" "),l("li",[v._v("302：临时重定向，临时从不同的 URI 响应请求。通过响应的 Location 找到新的 URL。")]),v._v(" "),l("li",[v._v("304：客户端存在有效缓存，使用缓存内容即可\n"),l("ul",[l("li",[v._v("缺点：SEO 权重降低，搜索引擎收录减少，网站快照停止")])])])])]),v._v(" "),l("li",[v._v("40x：\n"),l("ul",[l("li",[v._v("400：错误请求")]),v._v(" "),l("li",[v._v("401：未授权，需要身份验证")]),v._v(" "),l("li",[v._v("402：需要付款，保留以供将来为数字支付系统而用，")]),v._v(" "),l("li",[v._v("403：禁止访问，客户端无权访问")]),v._v(" "),l("li",[v._v("404：未找到，找不到资源")]),v._v(" "),l("li",[v._v("405：不允许使用该方法")]),v._v(" "),l("li",[v._v("406：无法接受")]),v._v(" "),l("li",[v._v("407：要求代理身份验证")]),v._v(" "),l("li",[v._v("408：请求超时")])])]),v._v(" "),l("li",[v._v("50x：\n"),l("ul",[l("li",[v._v("500：内部服务器错误")]),v._v(" "),l("li",[v._v("501：未实现，服务器不支持请求中使用的方法")]),v._v(" "),l("li",[v._v("502：网关错误，服务器作为网关从上游拿到了一个无效的 HTTP 响应")]),v._v(" "),l("li",[v._v("503：服务不可用，临时的服务器维护或过载，将会在一段时间内恢复。")]),v._v(" "),l("li",[v._v("504：网关超时")]),v._v(" "),l("li",[v._v("505：HTTP 版本不受支持")])])])]),v._v(" "),l("h3",{attrs:{id:"http-发展"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#http-发展"}},[v._v("#")]),v._v(" HTTP 发展")]),v._v(" "),l("ul",[l("li",[v._v("HTTP 1.0: 非持久连接")]),v._v(" "),l("li",[v._v("HTTP 1.1：持久连接，浏览器为每个域名最多维护 6 个 TCP 连接，引入 Cookie")]),v._v(" "),l("li",[v._v("HTTP 2：二进制协议，可发起多个请求，多路复用，允许专用算法压缩头部，允许服务器主动向客户端推送数据，增加了安全性")]),v._v(" "),l("li",[v._v("HTTP 3：QUIC 协议，基于 UDP 的底层封装，实现了 流量控制、传输可靠、数据重传、拥塞控制等，继承了 TLS 加密功能。实现了多路复用，同一物理连接上实现了多个独立逻辑连接。快速握手功能。")])])])}),[],!1,null,null,null);_.default=i.exports}}]);