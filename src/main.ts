import type { Directive } from 'vue'

import { createApp } from 'vue'

import { initGlobalConfig, injectStorageConfig } from '@/config'
import * as directives from '@/directives'
import { useI18n } from '@/plugins/i18n'
import { useUserStore } from '@/store/user'

import App from './App.vue'
import router from './router'
import { useStore } from './store'

import './style/reset.scss'
import './style/index.scss'
// [踩坑] TailwindCSS 放在 index 里面整合的话 HMR 会变慢
import './style/tailwind.css'
import 'tdesign-mobile-vue/es/style/index.css'

const app = createApp(App)

// 自定义指令
Object.keys((directives as { [k: string]: Directive })).forEach((k) => {
  app.directive(k, directives[k])
})

// 初始化全局配置
initGlobalConfig(app).then(() => {
  useStore(app)
  injectStorageConfig(app)
  app.use(useI18n).use(router)

  // 初始化用户数据
  const userStore = useUserStore()
  userStore.initUser()

  app.mount('#app')
})
