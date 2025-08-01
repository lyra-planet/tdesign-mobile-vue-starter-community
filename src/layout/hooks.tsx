import { useI18n } from 'vue-i18n'
import { stroagePrefix } from '@/config'
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

  function onConfirm(val: string[]) {
    localeState.show = false
    // vue-i18n、storageConfig、localStorage 三处同步更新
    locale.value = val[0]
    $storage.locale = val[0]
    useStorage().setItem(`${stroagePrefix()}config`, $storage)
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
