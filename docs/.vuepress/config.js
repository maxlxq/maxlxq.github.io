module.exports = {
  title: "大前端飞升指南",
  description: "欢迎访问公众号：大前端飞升指南",
  ga: "G-0WGB32QW31",
  markdown: {
    lineNumbers: true,
  },
  head: [["link", { rel: "icon", href: "/logo.jpg" }]],
  themeConfig: {
    repo: "maxlxq/maxlxq.github.io",
    nav: [
      {
        text: "原创",
        link: "/blog/",
      },
      {
        text: "刷题",
        link: "/leetcode/",
      },
      {
        text: "MDN",
        link: "/mdn/",
      },
      {
        text: "面试",
        link: "/interview/",
      },
    ],
    sidebar: {
      "/blog/": [
        {
          title: "DevOps",
          collapsable: false,
          children: [
            "Git使用.md",
            "GitHub-Actions实践.md",
          ],
        },
        {
          title: "Framework",
          collapsable: false,
          children: [
            "Fiber详解.md",
          ],
        },
        {
          title: "浏览器网络相关",
          collapsable: false,
          children: [
            "HTTP发展.md"
          ],
        },
        {
          title: "ECMAScript",
          collapsable: false,
          children: [
            "ECMAScript.md"
          ],
        },
        {
          title: "基础建设和架构",
          collapsable: false,
          children: [
            "基础建设和架构.md"
          ],
        },
      ],
      "/leetcode/": [
        {
          title: "力扣",
          collapsable: false,
          children: [
            'Array.md',
            'Tree.md',
          ],
        },
      ],
      "/mdn/": [
        {
          title: "MDN",
          collapsable: false,
          children: [
            '真_基础.md',
          ],
        },
        {
          title: "内置标准对象",
          collapsable: false,
          children: [
            'Symbol.md',
          ],
        },
      ],
      "/interview/": [
        {
          title: "面试",
          collapsable: false,
          children: [
            'JavaScript-基础.md',
            'CSS-基础.md',
            '浏览器-基础.md',
            'javascript.md',
            '浏览器-事件模型.md',
            '浏览器输入URL系列.md',
            'React知识点.md',
            '浏览器-垃圾回收机制.md',
          ],
        },
        {
          title: "JavaScript",
          collapsable: false,
          children: [
            'JavaScript-原型.md',
            'JavaScript-继承.md',
            'JavaScript-作用域.md',
            'JavaScript-闭包.md',
            'JavaScript-变量提升.md',
            'JavaScript-this.md',
            'JavaScript-IIFE.md',
            'JavaScript-instanceof原理.md',
            'JavaScript-bind原理.md',
            'JavaScript-apply和call.md',
            'JavaScript-柯里化.md',
            'JavaScript-垃圾回收机制.md',
            'JavaScript-浮点数精度.md',
            'JavaScript-new模拟实现.md',
            'JavaScript-事件循环机制.md',
            'JavaScript-Promise.md',
            'JavaScript-Generators原理.md',
          ],
        },
        {
          title: "CSS",
          collapsable: false,
          children: [
            'CSS-盒子模型.md',
            'CSS-选择器.md',
            'CSS-BFC.md',
            'CSS-position.md',
            'CSS-flex.md',
            'CSS-优先级.md',
            'CSS-圣杯布局-双飞翼布局.md',
            'CSS-新特性.md',
            'CSS-样式隔离.md',
            'CSS-性能优化.md',
            'CSS-层叠上下文.md',
            'CSS-居中方法.md',
            'CSS-浮动.md',
          ],
        },
        {
          title: "浏览器",
          collapsable: false,
          children: [
            '行内元素-块级元素.md',
            '浏览器-跨页面通信.md',
            '路由模式-hash&history.md',
            '浏览器-DOM树.md',
            '浏览器-事件模型.md',
            '浏览器-缓存机制.md',
            '浏览器架构.md',
            '浏览器-工作原理.md',
            '浏览器-内存泄漏.md',
            '浏览器-垃圾回收机制.md',
          ],
        },
        {
          title: "手撕代码",
          collapsable: false,
          children: [
            'requestIdleCallback模拟实现.md',
          ],
        },
        {
          title: "设计模式",
          collapsable: false,
          children: [
            'GoF介绍.md',
          ],
        },
      ],
    },
    lastUpdated: "更新时间",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "本文源码地址",
    smoothScroll: true,
  },
  plugins: [
    [
      "@vuepress/pwa",
      {
        serviceWorker: true,
        updatePopup: true,
      },
    ],
    ["@vuepress/medium-zoom", true],
    ["@vuepress/back-to-top", true],
  ],
};
