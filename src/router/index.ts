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
          name: 'Home',
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
          name: 'Publish',
          path: 'publish',
          component: () => import('@/views/publish/index.vue'),
        },
        {
          path: 'home/search',
          name: 'Searchpage',
          component: () => import('@/views/search/index.vue'),
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
          path: 'my/general-settings',
          name: 'MyGeneralSettings',
          component: () => import('@/views/my/general-settings.vue'),
        },
        {
          path: 'my/black_mode',
          name: 'MyBlackMode',
          component: () => import('@/views/my/black_mode.vue'),
        },
        {
          path: 'my/edit',
          name: 'MyEdit',
          component: () => import('@/views/my/edit.vue'),
          meta: {
            title: '个人信息',
          },
        },
        {
          path: 'login/phone',
          name: 'PhoneLogin',
          component: () => import('@/views/login/PhoneLoginPage.vue'),
          meta: {
            title: '手机号登录',
          },
        },
        {
          path: 'login/password',
          name: 'PasswordLogin',
          component: () => import('@/views/login/PasswordLoginPage.vue'),
          meta: {
            title: '密码登录',
          },
        },
        {
          path: 'login/verify',
          name: 'VerifyCodeLogin',
          component: () => import('@/views/login/VerifyCodePage.vue'),
          meta: {
            title: '验证码登录',
          },
        },
        {
          path: 'datacenter',
          name: 'DataCenter',
          component: () => import('@/views/datacenter/index.vue'),
        },
      ],
    },
    // 不需要布局的页面
    // 登录页面重定向
    {
      path: '/login',
      redirect: '/login/phone',
    },
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
