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
      path: '/:pathMatch(.*)*',
      redirect: '/error/404',
    },
  ],
})

if (import.meta.hot) {
  handleHotUpdate(router)
}

export default router
