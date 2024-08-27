import * as path from 'path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  base: '/',
  title: '前端周报',
  description: '前端相关技能学习记录分享',
  icon: 'https://ahulib-1251891330.cos.ap-hongkong.myqcloud.com/image/D.png',
  logo: {
    light: 'https://ahulib-1251891330.cos.ap-hongkong.myqcloud.com/image/D.png',
    dark: 'https://ahulib-1251891330.cos.ap-hongkong.myqcloud.com/image/D.png',
  },
  themeConfig: {
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/maxlxq/maxlxq.github.io' },
    ],
    footer: {
      message: `
        © 2024 MAXLXQ. All Rights Reserved. <br />
        备案号：<a href="https://beian.miit.gov.cn/#/Integrated/index">皖ICP备16006052号</a>
      `
    },
    outlineTitle: '大纲',
    nextPageText: '下一页',
    prevPageText: '上一页',
    searchPlaceholderText: '搜索文档',
  },
});
