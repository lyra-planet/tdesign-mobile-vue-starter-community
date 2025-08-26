import { createRouter } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

import { getRouterMode } from './utils'

const router = createRouter({
  history: getRouterMode(import.meta.env.VITE_ROUTER_MODE),
  routes: [
    {
      path: '/',
      redirect: '/home',
      children: [
        ...routes,
        // 登录相关路由
        {
          path: '/login',
          redirect: '/login/phone',
        },
        {
          path: '/login/phone',
          name: 'PhoneLogin',
          component: () => import('@/views/login/PhoneLoginPage.vue'),
        },
        {
          path: '/login/password',
          name: 'PasswordLogin',
          component: () => import('@/views/login/PasswordLoginPage.vue'),
        },
        {
          path: '/login/verify',
          name: 'VerifyCodeLogin',
          component: () => import('@/views/login/VerifyCodePage.vue'),
        },
      ],
    },
    {
      path: '/publish',
      redirect: '/publish',
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
