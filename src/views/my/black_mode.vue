<script setup lang='ts'>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/composables/useTheme'
import MenuItem from './components/MenuItem.vue'

defineOptions({
  name: 'MyBlackMode',
})

const { isDarkMode, toggleTheme } = useTheme()
const { t } = useI18n()

// 当前主题显示文本
const currentThemeText = computed(() => {
  return isDarkMode.value ? t('pages.my.theme.dark') : t('pages.my.theme.light')
})

// 主题设置项
const themeSettings = computed(() => [
  {
    name: t('pages.my.theme.title'),
    icon: 'image',
    type: 'switch' as const,
    switchValue: isDarkMode.value,
    currentValue: currentThemeText.value,
  },
])

// 处理主题切换
function handleThemeChange(value: boolean) {
  toggleTheme(value)
}
</script>

<template>
  <div class="theme-settings-page">
    <!-- 主题设置 -->
    <div class="menu-section">
      <MenuItem
        v-for="(setting, index) in themeSettings"
        :key="index"
        :item="setting"
        @switch-change="handleThemeChange"
      />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.theme-settings-page {
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
