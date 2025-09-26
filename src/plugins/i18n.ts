import type { App } from 'vue'
import type { I18n } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import { storagePrefix } from '@/config'
import { useStorage } from '@/utils/global'

// 初始只加载中文
const defaultLocale = 'zh-cn'

export const i18n: I18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en-us',
  messages: {},
  // 仅在开发环境输出缺失与回退警告，生产环境关闭以减少噪音与开销
  missingWarn: import.meta.env.DEV,
  fallbackWarn: import.meta.env.DEV,
  // 关闭基于 HTML 的消息警告
  warnHtmlMessage: false,
})

// 懒加载优化
const localeFiles = import.meta.glob('../../locales/*.yaml', { eager: false })

function isLocaleLoaded(locale: string): boolean {
  return Object.keys(i18n.global.getLocaleMessage(locale) || {}).length > 0
}

async function loadMessagesIfNeeded(locale: string): Promise<void> {
  if (isLocaleLoaded(locale))
    return

  const localeKey = `../../locales/${locale}.yaml`
  const files = localeFiles as Record<string, () => Promise<{ default: any }>>
  const loader = files[localeKey]
  if (!loader)
    return

  try {
    const module = await loader()
    const messages = module?.default || {}
    i18n.global.setLocaleMessage(locale, messages)
  }
  catch (error) {
    if (import.meta.env.DEV)
      console.warn(`Failed to load locale ${locale}:`, error)
  }
}

function setGlobalLocale(locale: string) {
  const localeRef = i18n.global.locale as any
  localeRef.value = locale
}

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
  await loadMessagesIfNeeded(initialLocale)
  setGlobalLocale(initialLocale)

  // 空闲预取：在空闲时预取一个最可能语言（浏览器语言或回退语言）
  const requestIdle = (cb: () => void) => {
    const ric = (window as any).requestIdleCallback as undefined | ((fn: any) => number)
    if (typeof ric === 'function')
      ric(cb)
    else setTimeout(cb, 1200)
  }

  const normalizeLang = (lang?: string): string | undefined => {
    if (!lang)
      return undefined
    const l = lang.toLowerCase().replace('_', '-')
    if (l.startsWith('zh'))
      return 'zh-cn'
    if (l.startsWith('en'))
      return 'en-us'
    return undefined
  }

  requestIdle(async () => {
    const current = (i18n.global.locale as any).value as string
    const navLang = normalizeLang(navigator?.language)
    const fallback = (i18n.global.fallbackLocale as any) as string
    const candidate = navLang && navLang !== current ? navLang : fallback
    if (candidate && candidate !== current && !isLocaleLoaded(candidate))
      await loadMessagesIfNeeded(candidate)
  })
}

// 语言切换
export async function setLanguage(locale: string) {
  if ((i18n.global.locale as any).value === locale)
    return

  await loadMessagesIfNeeded(locale)
  setGlobalLocale(locale)
}

export function useI18n(app: App) {
  app.use(i18n)
}
