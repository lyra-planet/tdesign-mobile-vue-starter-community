import type { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { getGlobalConfig } from '@/config'

// 创建 pinia 实例
const store = createPinia()

// 配置持久化插件
store.use(piniaPluginPersistedstate)

export function setupStore(app: App) {
  app.use(store)
}

export function resetAllStores() {
  // 获取所有 store 实例并重置
  ;(store as any)._s.forEach((storeInstance: any) => {
    if (storeInstance.$reset) {
      storeInstance.$reset()
    }
  })
}

export function getPersistConfig(key: string) {
  const storagePrefix = getGlobalConfig('storageNS') || 'tdesign-mobile-'
  return {
    key: `${storagePrefix}${key}`,
    storage: localStorage,
  }
}

export { store }
export * from './user'
export { setupStore as useStore }
