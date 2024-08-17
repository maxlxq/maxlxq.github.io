import * as path from 'path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  base: '/',
  title: '前端周报',
  description: '前端相关技能学习记录分享',
  icon: '/D.png',
  logo: {
    light: '/D.png',
    dark: '/D.png',
  },
  themeConfig: {
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/maxlxq/maxlxq.github.io' },
    ],
  },
});
