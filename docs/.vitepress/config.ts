import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'TDesign Mobile Vue Starter',
  description: '基于 TDesign Mobile Vue 的移动端页面模板',
  base: '/',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/' },
      { text: 'GitHub', link: 'https://cnb.cool/hikari0818/tdesign-mobile-vue-starter-community.git' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '介绍', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '目录结构', link: '/guide/directory-structure' },
          ],
        },
        {
          text: '核心功能',
          items: [
            { text: '布局系统', link: '/guide/layout' },
            { text: '个人中心', link: '/guide/profile' },
            { text: '路由配置', link: '/guide/router' },
            { text: '状态管理', link: '/guide/store' },
          ],
        },
      ],
      '/components/': [
        {
          text: '组件',
          items: [
            { text: '概览', link: '/components/' },
            { text: '布局组件', link: '/components/layout' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://cnb.cool/hikari0818/tdesign-mobile-vue-starter-community.git' },
    ],

    footer: {
      message: '基于 TDesign Mobile Vue 构建',
      copyright: 'Copyright © 2024',
    },
  },
})
