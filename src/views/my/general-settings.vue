<script setup lang='ts'>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { setLanguage } from '@/plugins/i18n'

defineOptions({
  name: 'GeneralSettings',
})

const router = useRouter()
const { t, locale } = useI18n()

// 语言相关
const isEnglish = computed({
  get: () => locale.value === 'en-us',
  set: (value: boolean) => {
    const newLocale = value ? 'en-us' : 'zh-cn'
    setLanguage(newLocale)
  },
})

const currentLanguageText = computed(() => {
  return locale.value === 'zh-cn' ? '中文' : 'English'
})

// 通用设置项
const generalSettings = [
  {
    name: 'pages.my.general_settings.language',
    icon: 'translate',
    type: 'switch',
    switchValue: isEnglish,
    currentValue: currentLanguageText,
  },
]
</script>

<template>
  <div class="general-settings-page">
    <!-- 设置项 -->
    <div class="menu-section">
      <div
        v-for="(setting, index) in generalSettings"
        :key="index"
        class="menu-item"
        :class="{ 'menu-item-no-click': setting.type === 'switch' }"
      >
        <div class="menu-content">
          <div class="menu-left">
            <t-icon :name="setting.icon" size="24" color="#0052D9" class="menu-icon" />
            <span class="menu-title">{{ t(setting.name) }}</span>
          </div>
          <div class="menu-right">
            <template v-if="setting.type === 'switch'">
              <span class="current-value">{{ setting.currentValue }}</span>
              <t-switch
                v-model="setting.switchValue.value"
                size="large"
              />
            </template>
            <t-icon v-else name="chevron-right" size="24" color="rgba(0, 0, 0, 0.4)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.general-settings-page {
  min-height: 100vh;
  background-color: var(--td-bg-color-page);
  padding-bottom: 20px;
}

.menu-section {
  background-color: var(--td-bg-color-container);
  margin: 16px 16px 0;
  border-radius: 12px;
  overflow: hidden;

  .menu-item {
    height: 56px;
    border-bottom: 0.5px solid var(--td-border-color);
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:last-child {
      border-bottom: none;
    }

    &:active {
      background-color: var(--td-bg-color-container-hover);
    }

    &.menu-item-no-click {
      cursor: default;

      &:active {
        background-color: transparent;
      }
    }

    .menu-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      height: 100%;

      .menu-left {
        display: flex;
        align-items: center;

        .menu-icon {
          margin-right: 12px;
        }

        .menu-title {
          font-size: 16px;
          color: var(--td-text-color-primary);
        }
      }

      .menu-right {
        display: flex;
        align-items: center;
        gap: 8px;

        .setting-value {
          font-size: 14px;
          color: var(--td-text-color-secondary);
        }

        .current-value {
          font-size: 14px;
          color: var(--td-text-color-secondary);
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
