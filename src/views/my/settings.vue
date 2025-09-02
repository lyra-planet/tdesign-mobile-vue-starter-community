<script setup lang='ts'>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import MenuItem from './components/MenuItem.vue'

defineOptions({
  name: 'Settings',
})

const router = useRouter()
const { t } = useI18n()

// 设置项配置
const settingGroups = computed(() => [
  // 第一组：通用设置
  [
    {
      name: t('pages.my.general_settings.title'),
      icon: 'app',
      action: () => router.push('/my/general-settings'),
    },
    {
      name: t('pages.my.settings_page.notifications'),
      icon: 'notification',
      action: () => console.warn('通知设置'),
    },
  ],
  // 第二组：界面设置
  [
    {
      name: t('pages.my.settings_page.dark_mode'),
      icon: 'image',
      action: () => router.push('/my/black_mode'),
    },
    {
      name: t('pages.my.settings_page.font_size'),
      icon: 'chart',
      action: () => console.warn('字体大小设置'),
    },
    {
      name: t('pages.my.settings_page.playback_settings'),
      icon: 'sound',
      action: () => console.warn('播放设置'),
    },
  ],
  // 第三组：安全隐私
  [
    {
      name: t('pages.my.settings_page.account_security'),
      icon: 'secured',
      action: () => console.warn('账号安全'),
    },
    {
      name: t('pages.my.settings_page.privacy'),
      icon: 'info-circle',
      action: () => console.warn('隐私设置'),
    },
  ],
])

// 处理设置项点击
function handleSettingClick(setting: any) {
  setting.action()
}
</script>

<template>
  <div class="settings-page">
    <!-- 设置项组 -->
    <div
      v-for="(group, groupIndex) in settingGroups"
      :key="groupIndex"
      class="menu-section"
    >
      <MenuItem
        v-for="(setting, index) in group"
        :key="index"
        :item="setting"
        @click="handleSettingClick"
      />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.settings-page {
  min-height: 100vh;
  background-color: var(--td-bg-color-page);
  padding-bottom: 20px;
}

.menu-section {
  background-color: var(--td-bg-color-container);
  margin: 16px 16px 0;
  border-radius: 12px;
  overflow: hidden;
}

// 移动端适配
@media (max-width: 414px) {
  .menu-section {
    margin: 16px 8px 0;
  }
}

// 适配安全区域
@supports (padding: max(0px)) {
  .settings-page {
    padding-bottom: max(20px, env(safe-area-inset-bottom));
  }
}
</style>
