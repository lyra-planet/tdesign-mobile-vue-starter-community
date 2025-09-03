import { useI18n } from 'vue-i18n'
import { storagePrefix } from '@/config'
import { setLanguage } from '@/plugins/i18n'
import { useLayoutStoreHook } from '@/store/layout'
import { useGlobal, useStorage } from '@/utils/global'

export function useLayoutHook() {
  const { t, locale } = useI18n()
  const { $storage } = useGlobal()

  const layoutStore = useLayoutStoreHook()
  function add() {
    layoutStore.ADD_COUNT()
  }

  const localeState = reactive({
    show: false,
    locale: [locale.value],
  })
  const localeOptions = [
    { label: '中文（简体）', value: 'zh-cn' },
    { label: 'English (US)', value: 'en-us' },
  ]

  async function onConfirm(val: string[]) {
    const newLocale = val[0]
    localeState.show = false
    await setLanguage(newLocale)

    // 更新存储
    $storage.locale = newLocale
    useStorage().setItem(`${storagePrefix()}config`, $storage)
  }

  return {
    locale,
    layoutStore,
    localeState,
    localeOptions,
    t,
    add,
    onConfirm,
  }
}
