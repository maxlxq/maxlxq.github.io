(window.webpackJsonp=window.webpackJsonp||[]).push([[119],{494:function(t,a,s){"use strict";s.r(a);var _=s(27),v=Object(_.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"react-hooks-设计动机和工作模式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#react-hooks-设计动机和工作模式"}},[t._v("#")]),t._v(" React_Hooks 设计动机和工作模式")]),t._v(" "),s("h2",{attrs:{id:"设计动机"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#设计动机"}},[t._v("#")]),t._v(" 设计动机")]),t._v(" "),s("ul",[s("li",[t._v("为什么需要 React-Hooks？")]),t._v(" "),s("li",[t._v("什么是类组件、函数组件？有何区别？")])]),t._v(" "),s("h3",{attrs:{id:"类组件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#类组件"}},[t._v("#")]),t._v(" 类组件")]),t._v(" "),s("p",[t._v("基于 ES6 Class 这种写法，通过继承 React.Component 得来的 React 组件。")]),t._v(" "),s("h3",{attrs:{id:"函数组件-无状态组件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#函数组件-无状态组件"}},[t._v("#")]),t._v(" 函数组件/无状态组件")]),t._v(" "),s("p",[t._v("以函数形式存在的 React 组件。")]),t._v(" "),s("p",[t._v("早期并没有 Hooks 加持，内部无法定义和维护 state，又称为 无状态组件。")]),t._v(" "),s("h3",{attrs:{id:"类比-fc-cc"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#类比-fc-cc"}},[t._v("#")]),t._v(" 类比 FC & CC")]),t._v(" "),s("ul",[s("li",[t._v("类组件需要继承 class，函数组件不需要")]),t._v(" "),s("li",[t._v("类组件可以访问生命周期方法，函数组件不行")]),t._v(" "),s("li",[t._v("类组件中可以获取到实例化之后的 this，函数组件不行")]),t._v(" "),s("li",[t._v("类组件内部可以定义和维护 state，函数组件不行")])]),t._v(" "),s("p",[t._v("以上是否意味着 类组件一定比函数组件 更好呢？")]),t._v(" "),s("h3",{attrs:{id:"类组件-重装战舰"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#类组件-重装战舰"}},[t._v("#")]),t._v(" 类组件：重装战舰")]),t._v(" "),s("p",[t._v("类组件是面向对象编程思想的一种表征。")]),t._v(" "),s("ol",[s("li",[t._v("封装：将一类属性和方法，集中到一个 Class 中去。")]),t._v(" "),s("li",[t._v("继承：类可以继承 现有类，实现对某一类属性和方法的复用。")])]),t._v(" "),s("p",[t._v("类组件中预置了相当多的东西，需要去制定，state 和 生命周期 就是其中的典型。")]),t._v(" "),s("p",[t._v("当实现一个简易的组件时，类组件相对于真正的 组件代码，显得非常笨重。")]),t._v(" "),s("p",[t._v("由于封装的存在，组件与组件之间可能有些强关联，内部逻辑难以拆分和复用。")]),t._v(" "),s("p",[t._v("使用 高阶组件、Render Props 等能解决上面问题，但是需要一定的学习成本。")]),t._v(" "),s("h3",{attrs:{id:"函数组件-轻巧快艇"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#函数组件-轻巧快艇"}},[t._v("#")]),t._v(" 函数组件：轻巧快艇")]),t._v(" "),s("p",[t._v("函数组件在写法上是轻量、灵活、易于组织和维护的。")]),t._v(" "),s("p",[t._v("函数组件会捕获 render 内部的状态。")]),t._v(" "),s("p",[t._v("函数组件更加契合 React 框架的设计理念。")]),t._v(" "),s("blockquote",[s("p",[t._v("UI = render(data) || UI = f(data)")])]),t._v(" "),s("p",[t._v("React 组件本身定位就是函数，一个接受数据、生成 UI 的函数。")]),t._v(" "),s("h3",{attrs:{id:"hooks-本质-一套能够使函数组件更强大、更灵活的钩子"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#hooks-本质-一套能够使函数组件更强大、更灵活的钩子"}},[t._v("#")]),t._v(" Hooks 本质：一套能够使函数组件更强大、更灵活的钩子")]),t._v(" "),s("p",[t._v("前面说到，函数组件比类组件缺少了很多东西，如 state、生命周期等。")]),t._v(" "),s("p",[t._v("Hooks 出现就是为了帮助函数组件补齐这些缺失的能力。")]),t._v(" "),s("p",[t._v("允许函数组件自由的选择使用，制定出最合适的函数组件。")]),t._v(" "),s("h2",{attrs:{id:"工作模式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#工作模式"}},[t._v("#")]),t._v(" 工作模式")]),t._v(" "),s("h3",{attrs:{id:"核心-api"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#核心-api"}},[t._v("#")]),t._v(" 核心 API")]),t._v(" "),s("ul",[s("li",[t._v("useState(): 引入状态 state")]),t._v(" "),s("li",[t._v("useEffect(): 副作用，可以在此实现 componentDidMount、componentDidUpdate、componentWillUnmount 里面做的事，如 DOM 操作、订阅事件、调用外部 API")])])])}),[],!1,null,null,null);a.default=v.exports}}]);