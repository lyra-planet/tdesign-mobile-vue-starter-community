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
  // 仅在开发环境输出缺失与回退警告，生产环境关闭以减少噪音与开销
  missingWarn: import.meta.env.DEV,
  fallbackWarn: import.meta.env.DEV,
  // 关闭基于 HTML 的消息警告
  warnHtmlMessage: false,
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

// 在浏览器空闲时预取：优先使用 requestIdleCallback，降级为 setTimeout
function scheduleIdle(task: () => void, timeout = 2000) {
  const ric = (window as any).requestIdleCallback as undefined | ((cb: IdleRequestCallback, opts?: { timeout?: number }) => number)
  if (typeof ric === 'function') {
    ric(() => task(), { timeout })
  }
  else {
    setTimeout(task, 0)
  }
}

function getLikelySwitchLocales(current: string): string[] {
  // 简单策略：中英互为高频切换；其它语言回退到中英
  if (current === 'zh-cn')
    return ['en-us']
  if (current === 'en-us')
    return ['zh-cn']
  return ['zh-cn', 'en-us'].filter(l => l !== current)
}

async function prefetchLikelyLocales(current: string) {
  const candidates = getLikelySwitchLocales(current)
  await Promise.all(candidates.map(async (locale) => {
    if (localeCache.has(locale))
      return
    const messages = await loadLocaleMessages(locale)
    if (messages && Object.keys(messages).length > 0) {
      i18n.global.setLocaleMessage(locale, messages)
    }
  }))
}

function schedulePrefetch(current: string): void {
  void prefetchLikelyLocales(current)
}

// 异步初始化 i18n
export async function initializeI18n() {
  const initialLocale = getStoredLocale()
  const initialMessages = await loadLocaleMessages(initialLocale)
  i18n.global.setLocaleMessage(initialLocale, initialMessages)
  const localeRefInit = i18n.global.locale as any
  localeRefInit.value = initialLocale
  // 空闲时间预取高概率切换语言包
  scheduleIdle(() => schedulePrefetch(initialLocale))
}

// 语言切换
export async function setLanguage(locale: string) {
  if ((i18n.global.locale as any).value === locale)
    return

  // 如果语言已加载，直接切换
  if (localeCache.has(locale)) {
    const localeRefCached = i18n.global.locale as any
    localeRefCached.value = locale
    // 切换完成后在空闲时间预取其它可能语言
    scheduleIdle(() => schedulePrefetch(locale))
    return
  }

  const messages = await loadLocaleMessages(locale)
  if (messages) {
    i18n.global.setLocaleMessage(locale, messages)
    const localeRef = i18n.global.locale as any
    localeRef.value = locale
  }
  // 切换完成后在空闲时间预取其它可能语言
  scheduleIdle(() => schedulePrefetch(locale))
}

export function useI18n(app: App) {
  app.use(i18n)
}
