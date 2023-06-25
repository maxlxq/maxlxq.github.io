(window.webpackJsonp=window.webpackJsonp||[]).push([[77],{449:function(r,a,t){"use strict";t.r(a);var e=t(27),o=Object(e.a)({},(function(){var r=this,a=r.$createElement,t=r._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":r.$parent.slotKey}},[t("h1",{attrs:{id:"taro-3-跨端框架原理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#taro-3-跨端框架原理"}},[r._v("#")]),r._v(" Taro 3 跨端框架原理")]),r._v(" "),t("blockquote",[t("p",[r._v("参考："),t("a",{attrs:{href:"https://juejin.cn/post/6989968343163731981",target:"_blank",rel:"noopener noreferrer"}},[r._v("Taro3 跨端跨框架原理初探"),t("OutboundLink")],1)])]),r._v(" "),t("h2",{attrs:{id:"taro-3-之前-重编译时-轻运行时"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#taro-3-之前-重编译时-轻运行时"}},[r._v("#")]),r._v(" Taro 3 之前（重编译时，轻运行时）")]),r._v(" "),t("p",[r._v("编译时使用 babel-parser 将 Taro 代码解析成抽象语法树，然后通过 babel-types 对抽象语法树进行一系列修改、转换操作，最后再通过 babel-generate 生成对应的目标代码。")]),r._v(" "),t("p",[r._v("缺点：")]),r._v(" "),t("ol",[t("li",[r._v("JSX 支持程度不完美。Taro 还不能 100% 支持所有的 JSX 语法。之前 Taro 采用穷举法对 JSX 可能的写法进行了一一适配，这是很繁重的工程。")]),r._v(" "),t("li",[r._v("不支持 source-map。Taro 对源码进行了一系列的转换操作之后，就不支持 source-map 了。")]),r._v(" "),t("li",[r._v("维护和迭代比较困难。")])]),r._v(" "),t("h2",{attrs:{id:"taro-3-之后-重运行时"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#taro-3-之后-重运行时"}},[r._v("#")]),r._v(" Taro 3 之后（重运行时）")]),r._v(" "),t("p",[r._v("Taro 3 主要通过在小程序端模拟实现 DOM、BOM API 来让前端框架直接运行在小程序环境中，从而达到了小程序和 H5 统一的目的。"),t("br"),r._v("\n而对于生命周期、组件库、API、路由等差异，依然可以通过定义统一标准，各端负责各自实现的方式来进行抹平。"),t("br"),r._v("\n所以，在 Taro 3 中同时支持 React、Vue 等框架，还支持让开发者自定义去拓展其他框架的支持。")]),r._v(" "),t("h2",{attrs:{id:"taro-小程序"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#taro-小程序"}},[r._v("#")]),r._v(" Taro 小程序")]),r._v(" "),t("p",[r._v("Taro 3 之后，小程序端的整体架构。首先是用户的 React 代码会通过 cli 进行 webpack 打包，其次会在运行时提供 React 对应的适配器进行适配，然后调用 Taro 提供的 DOM 和 BOM API，最后把整个程序渲染到所有的小程序端上面。")]),r._v(" "),t("p",[r._v("React-DOM 包含大量浏览器兼容类的代码，导致包太大，而这部分并不需要，因此做了一些定制和优化。")]),r._v(" "),t("p",[r._v("React 16+ 的架构：最上层是 React 的核心部分 react-core，中间是 react-reconciler，其职责是 维护 虚拟 DOM 树，内部实现了 Diff/Fiber 算法，决定更新时间和更新内容。"),t("br"),r._v("\nRenderer 负责具体平台的渲染工作，提供宿主组件、处理事件等等。")]),r._v(" "),t("p",[r._v("Taro 实现了 taro-react 包，用来连接 react-reconciler 和 taro-runtime 的 BOM/DOM API。是基于 react-reconciler 的小程序专用 React 渲染器，连接 @tarojs/runtime 的 DOM 实例，相当于小程序版的 react-dom。")]),r._v(" "),t("p",[r._v("最后，React 代码运行会生成 Taro DOM Tree，那么 如何更新到页面上呢？")]),r._v(" "),t("p",[r._v("小程序并没有提供动态创建节点的能力，需要考虑如何使用相对静态的 wxml 来渲染相对动态的 Taro DOM Tree。"),t("br"),r._v("\nTaro 使用了 模版拼接的方式，根据运行时提供的 DOM 树数据结构，各 templates 递归地相互引用，最终渲染出对应的动态 DOM 树。")]),r._v(" "),t("p",[r._v("首先，将小程序的所有组件进行模版化处理，从而得到小程序组件对应的模版。需要在 template 里面写上 组件 如 view，把它所有的属性全部列出来（因为小程序里面不能动态的添加属性）。"),t("br"),r._v("\n接下来遍历渲染所有子节点，基于组件的 template，动态递归渲染整棵树。")]),r._v(" "),t("p",[r._v("具体流程为 先遍历 Taro DOM Tree 根节点的子元素，再根据每个子元素的类型选择对应的模版来渲染子元素，然后在每个模版中又会去遍历当前元素的子元素，以此把整个节点数递归遍历出来。")]),r._v(" "),t("h2",{attrs:{id:"taro-h5"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#taro-h5"}},[r._v("#")]),r._v(" Taro H5")]),r._v(" "),t("p",[r._v("Taro 以小程序为主，因此 在 H5 端实现了一套基于小程序规范的组件库和 API 库。")]),r._v(" "),t("p",[r._v("H5 端架构，同样的需要把用户的 React 代码通过 Webpack 打包，然后在运行时做三件事：")]),r._v(" "),t("ol",[t("li",[r._v("实现一个组件库，同时给到多个框架去使用。Taro 使用了 Stencil 实现了一个 基于 WebComponents 且遵循微信小程序规范的组件库。")]),r._v(" "),t("li",[r._v("实现一个小程序规范的 API。")]),r._v(" "),t("li",[r._v("实现一个小程序规范的 路由机制。")])])])}),[],!1,null,null,null);a.default=o.exports}}]);