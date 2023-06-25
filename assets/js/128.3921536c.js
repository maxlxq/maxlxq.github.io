(window.webpackJsonp=window.webpackJsonp||[]).push([[128],{503:function(v,_,M){"use strict";M.r(_);var O=M(27),D=Object(O.a)({},(function(){var v=this,_=v.$createElement,M=v._self._c||_;return M("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[M("h1",{attrs:{id:"真正理解虚拟-dom"}},[M("a",{staticClass:"header-anchor",attrs:{href:"#真正理解虚拟-dom"}},[v._v("#")]),v._v(" 真正理解虚拟 DOM")]),v._v(" "),M("blockquote",[M("p",[v._v("Q: 为什么需要 虚拟 DOM？")]),v._v(" "),M("p",[v._v("🤔")])]),v._v(" "),M("h2",{attrs:{id:"什么是虚拟-dom"}},[M("a",{staticClass:"header-anchor",attrs:{href:"#什么是虚拟-dom"}},[v._v("#")]),v._v(" 什么是虚拟 DOM")]),v._v(" "),M("p",[v._v("虚拟 DOM 本质上是 JS 和 DOM 之间的一个映射缓存，在形态上表现为一个能够描述 DOM 结构及其属性信息的 JS 对象。")]),v._v(" "),M("p",[v._v("虚拟 DOM 参与的工作流程：")]),v._v(" "),M("ul",[M("li",[v._v("挂载阶段：React 结合 JSX 描述，构建出虚拟 DOM 树，通过 ReactDOM.render 实现虚拟 DOM 到真实 DOM 的映射（触发渲染流水线）")]),v._v(" "),M("li",[v._v("更新阶段：页面的变化在作用于真实 DOM 之前，会先作用于虚拟 DOM，虚拟 DOM 将在 JS 层借助算法先对比出有哪些真实 DOM 需要被改变，然后再将这些改变作用于真实 DOM。")])]),v._v(" "),M("h3",{attrs:{id:"为什么需要-虚拟-dom"}},[M("a",{staticClass:"header-anchor",attrs:{href:"#为什么需要-虚拟-dom"}},[v._v("#")]),v._v(" 为什么需要 虚拟 DOM")]),v._v(" "),M("p",[v._v("DOM 操作的演化过程：")]),v._v(" "),M("ul",[M("li",[v._v('原生 JS 支配下 "人肉 DOM" 时期：花费大量的时间去实现静态的 DOM。')]),v._v(" "),M("li",[v._v("jQuery 时期：将 DOM API 封装为相对简单和优雅的形式，使 DOM 操作变得简单、快速、稳定。但不能解决 DOM 操作量过大时浏览器的压力。")]),v._v(" "),M("li",[v._v("早期模版引擎方案：使用数据源，挂载到预置好的 HTML 模版里，然后返回标准的 HTML 代码字符串，赋值给 innerHTML，挂载到页面中，触发渲染流水线，完成真实 DOM 的渲染。但是每次数据改变的时候，都会将 DOM 整体注销再整体重渲染，不存在更新缓冲。当 DOM 操作频繁的情况下，会导致页面卡死。")]),v._v(" "),M("li",[v._v("虚拟 DOM：数据和模版结合后不直接对 真实 DOM 操作，而是使用 虚拟 DOM 来处理，对比前后两次虚拟 DOM，找到真正需要更新的 真实 DOM，生成一个 补丁集，打在需要更新的 真实 DOM 上，实现精准的 差量更新。")])]),v._v(" "),M("p",[v._v("总结1：通过算法获取补丁集进行差量更新，可以保证批量操作最少的 真实 DOM，减少直接通过大量真实 DOM 操作带来的性能体验问题。")]),v._v(" "),M("p",[v._v("React 选用虚拟 DOM，真的是为了更好的性能嘛？")]),v._v(" "),M("p",[v._v("其实，在整个 DOM 操作的演化过程中，主要矛盾不在于性能，而在于研发效率。")]),v._v(" "),M("p",[v._v("总结2：虚拟 DOM 正是前端开发者们为了追求更好的研发体验和研发效率而创造出来的高阶产物。")]),v._v(" "),M("p",[v._v("所以，虚拟 DOM 的优越之处在于，在提供更高效的研发模式的同时，仍然保持一个还不错的性能。")]),v._v(" "),M("p",[v._v("但 虚拟 DOM 也不是一定比 真实 DOM 性能好，当差量更新的数据跟全量更新类似时，虚拟 DOM 中间多了一层 JS diff 对比过程，然后才会进行 DOM 操作。")]),v._v(" "),M("p",[v._v("此时的 虚拟 DOM 比 真实 DOM 就耗时了许多。")]),v._v(" "),M("p",[v._v("因此，虚拟 DOM 的劣势主要在于 JS 计算的耗时，而 DOM 操作的能耗和 JS 计算的能耗根本不在一个量级，极少量的 DOM 操作耗费的性能足以支撑大量的 JS 计算。")]),v._v(" "),M("p",[v._v("总结3：虚拟 DOM 的价值不在于性能，而在别处。")]),v._v(" "),M("h3",{attrs:{id:"虚拟-dom-的价值到底是什么"}},[M("a",{staticClass:"header-anchor",attrs:{href:"#虚拟-dom-的价值到底是什么"}},[v._v("#")]),v._v(" 虚拟 DOM 的价值到底是什么")]),v._v(" "),M("p",[v._v("虚拟 DOM 解决的关键问题有以下两个：")]),v._v(" "),M("ol",[M("li",[v._v("研发体验/研发效率的问题：为数据驱动视图提供了高可用的载体，使得前端开发能够基于函数式 UI 的编程方式实现高效的声明式编程。")]),v._v(" "),M("li",[v._v("跨平台问题：虚拟 DOM 是对 真实渲染内容的一层抽象。若没有这一层抽象，那么视图层将和渲染平台紧密耦合在一起，为了实现同样的视图内容，可能要分别在 Web 端 和 Native 端写完全不同的两套甚至多套代码。"),M("br"),v._v('\n但现在中间多了一层描述性的虚拟 DOM，它描述的东西可以是真实 DOM，也可以是 iOS、Android、小程序等，同一套虚拟 DOM，可以对接不同平台的渲染逻辑，从而实现 "一次编码，多端运行"。')])]),v._v(" "),M("p",[v._v('除了差量更新以外， "批量更新"也是虚拟 DOM 在性能方面所做的一个重要努力： "批量更新"在通用虚拟 DOM 库里是由 batch 函数来处理的。在差量更新速度非常快的情况下，用户实际上只能看到最后一次更新的结果。但是仍然会触发多次重渲染流程，带来大量不必要的高耗能操作。')]),v._v(" "),M("p",[v._v("batch 的作用就是缓冲每次生成的 补丁集，它会把收集到的多个补丁集暂存到队列中，再将最终的结果交给渲染函数，最终实现集中化的 DOM 批量更新。")])])}),[],!1,null,null,null);_.default=D.exports}}]);