import type { App } from 'vue'
import type { I18n } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import { storagePrefix } from '@/config'
import { useStorage } from '@/utils/global'

// 懒加载优化
const localeFiles = import.meta.glob('../../locales/*.y(a)?ml', { eager: false })

// 缓存优化
const localeCache = new Map<string, any>()

async function loadLocaleMessages(locale: string) {
  // 检查缓存
  if (localeCache.has(locale)) {
    return localeCache.get(locale)
  }

  const localeKey = `../../locales/${locale}.yaml`
  const localeLoader = localeFiles[localeKey]
  if (localeLoader) {
    try {
      const module = await localeLoader() as { default: any }
      const messages = module.default || {}

      localeCache.set(locale, messages)
      return messages
    }
    catch (error) {
      if (import.meta.env.DEV) {
        console.warn(`Failed to load locale ${locale}:`, error)
      }
      return {}
    }
  }
  return {}
}

// 初始只加载中文
const defaultLocale = 'zh-cn'

// 🤔 此处要不要写一个函数，用来专门翻译国际化，避免某些语言翻译不全呢？？

export const i18n: I18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en-us',
  messages: {},
})

function getStoredLocale(): string {
  try {
    const { getItem } = useStorage()
    const storage = getItem<StorageConfig>(`${storagePrefix()}config`)
    return storage?.locale || defaultLocale
  }
  catch {
    return defaultLocale
  }
}

// 异步初始化 i18n
export async function initializeI18n() {
  const initialLocale = getStoredLocale()
  const initialMessages = await loadLocaleMessages(initialLocale)
  i18n.global.setLocaleMessage(initialLocale, initialMessages)
  ;(i18n.global.locale as any).value = initialLocale
}

// 语言切换
export async function setLanguage(locale: string) {
  if ((i18n.global.locale as any).value === locale)
    return

  // 如果语言已加载，直接切换
  if (localeCache.has(locale)) {
    ;(i18n.global.locale as any).value = locale
    return
  }

  const messages = await loadLocaleMessages(locale)
  if (messages) {
    i18n.global.setLocaleMessage(locale, messages)
    ;(i18n.global.locale as any).value = locale
  }
}

export function useI18n(app: App) {
  app.use(i18n)
}
