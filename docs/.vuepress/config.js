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
            "Git使用.md"
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
            '原型和原型链.md',
            'javascript.md',
            'Event.md',
            '浏览器输入URL系列.md',
            'JS基础.md',
            'React知识点.md',
            '垃圾回收.md',
          ],
        },
        {
          title: "手撕代码",
          collapsable: true,
          children: [
            'new模拟实现.md',
            'bind模拟实现.md',
            'call和apply模拟实现.md',
            'requestIdleCallback模拟实现.md',
          ],
        },
        {
          title: "设计模式",
          collapsable: true,
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
