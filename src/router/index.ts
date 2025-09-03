import { createRouter } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'
import Layout from '@/layout/index.vue'

import { getRouterMode } from './utils'

const router = createRouter({
  history: getRouterMode(import.meta.env.VITE_ROUTER_MODE),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          redirect: '/home',
        },
        {
          path: 'home',
          component: () => import('@/views/home/index.vue'),
        },
        {
          path: 'my',
          component: () => import('@/views/my/index.vue'),
        },
        {
          path: 'talklist',
          component: () => import('@/views/talklist/index.vue'),
        },
        {
          path: 'publish',
          component: () => import('@/views/publish/index.vue'),
        },
        {
          path: 'notice/:id',
          name: 'Notice',
          component: () => import('@/views/notice/index.vue'),
        },
        {
          path: 'my/settings',
          name: 'MySettings',
          component: () => import('@/views/my/settings.vue'),
        },
        {
          path: 'datacenter',
          name: 'DataCenter',
          component: () => import('@/views/datacenter/index.vue'),
        },
      ],
    },
    // 不需要布局的页面
    {
      path: '/my/edit',
      name: 'MyEdit',
      component: () => import('@/views/my/edit.vue'),
      meta: {
        title: '个人信息',
      },
    },
    // {
    //   path: '/login',
    //   component: () => import('@/views/login/index.vue'),
    // },
    // {
    //   path: '/error/:code',
    //   component: () => import('@/views/error/index.vue'),
    // },
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
