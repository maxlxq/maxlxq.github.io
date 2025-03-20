# Claude与Trae研发提效

最近看 Claude 3.7 Sonnet 很火，之前注册过 Claude 一直没尝试过写代码，索性体验一下，感受AI带来的震撼效果。

## Claude 注册
请参考其他教程「Google 搜索：claude 注册」

## Claude 使用
登陆后，直接看到一个页面，可以直接进行提问。
![客户端对话首页](https://blog-1251891330.cos.ap-shanghai.myqcloud.com/image/interview/6a3a5d1f-e497-4048-a34a-ff33507e643d.webp)
例如：“使用React Native新建一个日记APP”；“使用React，写一个天气页面， 显示当前温度，当天气温范围，未来一周气温预测，根据实际天气展示对应的动画，如：下雨天展示一朵云正在下雨的动画效果，大晴天就显示一个太阳带墨镜的动态效果，打雷就显示两朵乌云碰撞摩擦生电的效果，诸如此类”。

### 写 React Native 页面
左侧会有 thinking 过程与解释，右侧会直接生成代码，因为是 React Native 框架，所以需要把代码放在自己的项目中执行看效果。按照 thinking 过程完成必要的第三方包安装「npm、pod」，然后保存重新执行。

![Claude 页面](https://blog-1251891330.cos.ap-shanghai.myqcloud.com/image/interview/e70ec0af-03ac-42c7-807f-46639bb7bd53.webp)

<!-- ![React Native执行效果](https://blog-1251891330.cos.ap-shanghai.myqcloud.com/image/interview/6a4f532a-a4b5-425e-9daf-0db032fade1b.webp) -->
<center><img src="https://blog-1251891330.cos.ap-shanghai.myqcloud.com/image/interview/6a4f532a-a4b5-425e-9daf-0db032fade1b.webp" width="200" alt="React Native执行效果" /></center>

可以看到页面效果还不错，可以根据自己的想法进行调整。

![调整一](https://blog-1251891330.cos.ap-shanghai.myqcloud.com/image/interview/ae62ca5e-2dd2-49c3-9e84-2abff162c0a1.webp)

![调整二](https://blog-1251891330.cos.ap-shanghai.myqcloud.com/image/interview/c2e6a48e-c75f-4109-a1b1-249913630965.webp)
功能方面需要细化的请详细描述补充，样式问题可以多考虑几点后一起发送让其修改，因为每次都会生成全量的页面代码。
不过多次生成的代码都会有版本存储。

![版本控制](https://blog-1251891330.cos.ap-shanghai.myqcloud.com/image/interview/435e1892-50b0-4eac-83aa-07af8d2af504.webp)

### 写 React 天气页面
对于 React 项目，Claude可以直接展示效果，甚至可以把设计稿或者原型图上传进去，然后得到更细致的结果。

![](https://blog-1251891330.cos.ap-shanghai.myqcloud.com/image/interview/8d7fdf0b-079d-409c-a482-d2b01a857485.jpg)
生成的React代码使用了 Tailwindcss，如果有拆分代码的需求，可以让 Claude 帮忙拆分子组件，抽离后放在React业务代码中使用。

使用 Claude 可以帮忙处理一些所见即所得的工作，具体的业务逻辑也可以通过描述进行生成，不过未曾尝试，帐号已被限制至19:00后可用。有需要可以订阅 pro。

## Trae 使用
使用 Trae 有两种模式，一种是 chat，一种是 builder。

![](https://blog-1251891330.cos.ap-shanghai.myqcloud.com/image/interview/654e20f5-95d9-4760-84a8-7de3a9c080f4.webp)

builder模式打开一个空白文件夹就可以提出你的诉求，进行项目创建，按照thinking过程中出现的脚本，点击右侧的运行按钮即可在终端执行。

![](https://blog-1251891330.cos.ap-shanghai.myqcloud.com/image/interview/79470b54-3ebe-4045-a38b-516985785466.webp)

chat模式下可以随时在项目代码中选中一些片段进行咨询，这种与常规的 copilot 一致。

![](https://blog-1251891330.cos.ap-shanghai.myqcloud.com/image/interview/f0a5fd78-833d-493e-910c-951cb4f581ea.webp)

暂未进行复杂项目的研发，一些 demo 案例在 Trae 和 Claude 的配合下很快实现，尝鲜一下。

--- DONE