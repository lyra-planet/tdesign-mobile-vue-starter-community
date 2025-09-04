<script setup lang='ts'>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { MenuItem } from '@/components'
import { setLanguage } from '@/plugins/i18n'

defineOptions({
  name: 'GeneralSettings',
})

const { t, locale } = useI18n()

// 语言相关
const isEnglish = computed(() => locale.value === 'en-us')

const currentLanguageText = computed(() => {
  return locale.value === 'zh-cn' ? '中文' : 'English'
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

// 处理语言切换
function handleLanguageChange(value: boolean) {
  const newLocale = value ? 'en-us' : 'zh-cn'
  setLanguage(newLocale)
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
