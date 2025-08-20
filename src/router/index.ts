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
      children: routes.filter(r => r.path !== '/notice'),
    },
    {
      path: '/notice',
      name: 'Notice',
      component: () => import('@/views/notice/index.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/error/404',
    },
  ],
})

if (import.meta.hot) {
  handleHotUpdate(router)
}

export default router
