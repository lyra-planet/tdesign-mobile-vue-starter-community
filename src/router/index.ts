import { createRouter } from 'vue-router'
import { routes as autoRoutes, handleHotUpdate } from 'vue-router/auto-routes'
import Layout from '@/layout/index.vue'

import { getRouterMode } from './utils'

// 将自动生成的路由作为 Layout 子路由
const layoutChildren = autoRoutes.filter(r => !r.path.startsWith('/error') && !r.path.startsWith('/login'))

const router = createRouter({
  history: getRouterMode(import.meta.env.VITE_ROUTER_MODE),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        { path: '', redirect: '/home' },
        // 自动生成的业务路由
        ...layoutChildren,
        { path: 'notice/:id', name: 'Notice', component: () => import('@/views/notice/index.vue') },
        { path: 'login', redirect: '/login/phone' },
        { path: 'login/phone', component: () => import('@/views/login/PhoneLoginPage.vue') },
        { path: 'login/password', component: () => import('@/views/login/PasswordLoginPage.vue') },
        { path: 'login/verify', component: () => import('@/views/login/VerifyCodePage.vue') },
        { path: 'my/edit', component: () => import('@/views/my/edit.vue') },
        { path: 'my/settings', component: () => import('@/views/my/settings.vue') },
      ],
    },
    // 登录重定向
    { path: '/login', redirect: '/login/phone' },
    // 错误页面
    ...autoRoutes.filter(r => r.path.startsWith('/error')),
    // 兜底重定向到 404
    { path: '/:pathMatch(.*)*', redirect: '/error/404' },
  ],
})

if (import.meta.hot) {
  handleHotUpdate(router)
}

export default router
