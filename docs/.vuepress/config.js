module.exports = {
  title: "大前端飞升指南",
  description: "欢迎访问公众号：大前端飞升指南",
  ga: "UA-121061441-1",
  markdown: {
    lineNumbers: true,
  },
  head: [["link", { rel: "icon", href: "https://skr.oss-cn-beijing.aliyuncs.com/blog/qrcode.jpeg" }]],
  themeConfig: {
    repo: "maxlxq/maxlxq.github.io",
    nav: [
      {
        text: "原创",
        link: "/blog/",
      },
    ],
    sidebar: {
      "/blog/": [
        {
          title: "Test",
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
