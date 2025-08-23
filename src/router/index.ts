import { createRouter } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

import { getRouterMode } from './utils'

const router = createRouter({
  history: getRouterMode(import.meta.env.VITE_ROUTER_MODE),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: () => import('@/layout/index.vue'),
      redirect: '/home',
      children: routes,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/error/404',
    },
    // 在现有路由配置中添加
    {
      path: '/my/edit',
      name: 'MyEdit',
      component: () => import('@/views/my/edit.vue'),
      meta: {
        title: '个人信息',
      },
    },
    // 新增设置页面路由
    {
      path: '/my/settings',
      name: 'MySettings',
      component: () => import('@/views/my/settings.vue'),
      meta: {
        title: '设置',
      },
    },
  ],
})

if (import.meta.hot) {
  handleHotUpdate(router)
}

export default router
