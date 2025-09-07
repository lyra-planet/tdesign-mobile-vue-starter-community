<script setup lang='ts'>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { MenuItem } from '@/components'
import { storagePrefix } from '@/config'
import { setLanguage } from '@/plugins/i18n'
import { useGlobal, useStorage } from '@/utils/global'

defineOptions({
  name: 'GeneralSettings',
})

const { t, locale } = useI18n()
const { $storage } = useGlobal()

// 语言相关（以 $storage.locale 为准，驱动 TDesign Provider 与持久化）
const isEnglish = computed(() => ($storage.locale === 'en-us'))

const currentLanguageText = computed(() => {
  return $storage.locale === 'zh-cn' ? '中文' : 'English'
})

// 通用设置项
const generalSettings = computed(() => [
  {
    name: t('pages.my.general_settings.language'),
    icon: 'translate',
    type: 'switch' as const,
    switchValue: isEnglish.value,
    currentValue: currentLanguageText.value,
  },
])

// 处理语言切换：同步 i18n 与 $storage，并持久化
async function handleLanguageChange(value: boolean) {
  const newLocale = value ? 'en-us' : 'zh-cn'
  await setLanguage(newLocale)
  $storage.locale = newLocale
  useStorage().setItem(`${storagePrefix()}config`, $storage)
}
</script>

<template>
  <div class="general-settings-page">
    <!-- 设置项 -->
    <div class="menu-section">
      <MenuItem
        v-for="(setting, index) in generalSettings"
        :key="index"
        :item="setting"
        @switch-change="handleLanguageChange"
      />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.general-settings-page {
  background-color: var(--td-bg-color-page);
  padding-bottom: 20px;
}

.menu-section {
  background-color: var(--td-bg-color-container);
  margin: 16px 16px 0;
  border-radius: 12px;
  overflow: hidden;
}
</style>
