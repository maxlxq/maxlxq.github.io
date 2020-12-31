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
          title: "Test",
          collapsable: false,
          children: [
            "test.md"
          ],
        },
      ],
      "/leetcode/": [
        {
          title: "力扣",
          collapsable: false,
          children: [
          ],
        },
      ],
      "/interview/": [
        {
          title: "面试",
          collapsable: false,
          children: [

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
