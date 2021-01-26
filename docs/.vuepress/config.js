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
            "React核心.md",
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
      "/interview/": [
        {
          title: "面试",
          collapsable: false,
          children: [
            'javascript.md',
            'Event.md',
            '浏览器输入URL系列.md',
            'JS基础.md',
          ],
        },
      ],
    },
    lastUpdated: "更新时间",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "本文源码地址",
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
