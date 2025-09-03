import type { App } from 'vue'
import type { AppConfig } from './app.config'
import type { NetworkConfig } from './network.config'
import type { ThemeConfig } from './theme.config'
import { toReactive } from '@vueuse/core'
import axios from 'axios'
import { useStorage } from '@/utils/global'
import appConfig from './app.config'
import networkConfig from './network.config'
import themeConfig from './theme.config'

const { VITE_BASE_PATH } = import.meta.env

// 合并所有配置
type GlobalConfig = AppConfig & NetworkConfig & ThemeConfig

const config: GlobalConfig = {
  ...appConfig,
  ...networkConfig,
  ...themeConfig,
} as GlobalConfig

function getGlobalConfig<K extends keyof GlobalConfig>(k: K): GlobalConfig[K] {
  return config[k]
}

const storagePrefix = () => getGlobalConfig('storageNS')

function injectStorageConfig(app: App) {
  const { getItem, setItem } = useStorage()
  // 当前个性化配置较少，直接扁平化即可
  let storage = getItem<StorageConfig>(`${storagePrefix()}config`)
  if (!storage) {
    storage = {
      locale: getGlobalConfig('locale'),
    }
  }

  setItem(`${storagePrefix()}config`, storage)

  // 💡 此处要将其转为响应式，否则动态切换语言的时候不会生效
  ;(app.config.globalProperties as unknown as GlobalProperties).$storage = toReactive(storage)
}

export async function initGlobalConfig(app: App): Promise<GlobalConfig> {
  return axios.get(`${VITE_BASE_PATH}config.json`).then(({ data }) => {
    if (typeof data === 'object') {
      // 合并外部配置到内部配置
      Object.assign(config, data)
      app.config.globalProperties.$config = config
    }
    return config
  }).catch(() => {
    // 如果外部配置文件不存在，使用默认配置
    app.config.globalProperties.$config = config
    return config
  })
}

// 导出配置模块
export {
  appConfig,
  config,
  getGlobalConfig,
  injectStorageConfig,
  networkConfig,
  storagePrefix,
  themeConfig,
}

// 导出配置类型
export type {
  AppConfig,
  GlobalConfig,
  NetworkConfig,
  ThemeConfig,
}
