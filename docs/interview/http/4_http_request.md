
# HTTP 请求方法

7种方法：GET、POST、PUT、DELETE、HEAD、TRACE、OPTIONS

- GET：查
- DELETE：删除
- HEAD：与 GET 方法类似，但服务器在响应中只返回实体的头部分。举例：快速获取资源，根据响应状态码判定资源是否存在。
- POST：提交数据。数据被包含在请求体中，POST 请求可能会导致新的资源建立或修改已有资源。
- PUT：从客户端向服务端传送的数据取代指定的文档的内容。
- OPTIONS：获取当前 URL 支持的方法。若请求成功，则会在 HTTP 头中包含一个 Allow 头，值是所支持的方法，如 "GET, POST"
- TRACE：回环诊断，请求穿过层层代理、防火墙、网关或其他应用程序，在最终到达服务器时，弹回一条 TRACE 响应，客户端就可以查看 HTTP 请求报文在发送的途中是否被修改过。

## HTTP Headers 消息头

- General headers：同时适用于请求和响应消息，但与最终消息主体中传输的数据无关的消息头
- Request headers：包含更多有关要获取的资源或客户端消息的消息头
- Response headers：包含有关响应的补充信息
- Entity headers：包含有关实体主体的更多信息

[常见的消息头及其用途](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)




