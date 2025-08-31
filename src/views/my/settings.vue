<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'Settings',
})

const router = useRouter()
const { t } = useI18n()

// 第一组设置项（通用设置、通知设置）
const firstGroup = [
  {
    name: t('pages.my.general_settings.title'),
    icon: 'app',
    action: () => router.push('/my/general-settings'),
  },
  {
    name: t('pages.my.settings_page.notifications'),
    icon: 'notification',
    action: () => console.log('通知设置'),
  },
]

// 第二组设置项（深色模式、字体大小、播放设置）
const secondGroup = [
  {
    name: t('pages.my.settings_page.dark_mode'),
    icon: 'image',
    action: () => console.log('深色模式'),
  },
  {
    name: t('pages.my.settings_page.font_size'),
    icon: 'chart',
    action: () => console.log('字体大小设置'),
  },
  {
    name: t('pages.my.settings_page.playback_settings'),
    icon: 'sound',
    action: () => console.log('播放设置'),
  },
]

// 第三组设置项（账号安全、隐私）
const thirdGroup = [
  {
    name: t('pages.my.settings_page.account_security'),
    icon: 'secured',
    action: () => console.log('账号安全'),
  },
  {
    name: t('pages.my.settings_page.privacy'),
    icon: 'info-circle',
    action: () => console.log('隐私设置'),
  },
]

// 处理返回
function handleBack() {
  router.back()
}

// 处理设置项点击
function handleSettingClick(setting: any) {
  setting.action()
}
</script>

<template>
  <div class="settings-page">
    <!-- 第一组设置 -->
    <div class="menu-section">
      <div
        v-for="(setting, index) in firstGroup"
        :key="index"
        class="menu-item"
        @click="handleSettingClick(setting)"
      >
        <div class="menu-content">
          <div class="menu-left">
            <t-icon :name="setting.icon" size="24" color="#0052D9" class="menu-icon" />
            <span class="menu-title">{{ setting.name }}</span>
          </div>
          <t-icon name="chevron-right" size="24" color="rgba(0, 0, 0, 0.4)" />
        </div>
      </div>
    </div>

    <!-- 第二组设置 -->
    <div class="menu-section">
      <div
        v-for="(setting, index) in secondGroup"
        :key="index"
        class="menu-item"
        @click="handleSettingClick(setting)"
      >
        <div class="menu-content">
          <div class="menu-left">
            <t-icon :name="setting.icon" size="24" color="#0052D9" class="menu-icon" />
            <span class="menu-title">{{ setting.name }}</span>
          </div>
          <t-icon name="chevron-right" size="24" color="rgba(0, 0, 0, 0.4)" />
        </div>
      </div>
    </div>

    <!-- 第三组设置 -->
    <div class="menu-section">
      <div
        v-for="(setting, index) in thirdGroup"
        :key="index"
        class="menu-item"
        @click="handleSettingClick(setting)"
      >
        <div class="menu-content">
          <div class="menu-left">
            <t-icon :name="setting.icon" size="24" color="#0052D9" class="menu-icon" />
            <span class="menu-title">{{ setting.name }}</span>
          </div>
          <t-icon name="chevron-right" size="24" color="rgba(0, 0, 0, 0.4)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.settings-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 20px;
}

.menu-section {
  background-color: white;
  margin: 16px 16px 0;
  border-radius: 12px;
  overflow: hidden;

  .menu-item {
    height: 56px;
    border-bottom: 0.5px solid #e7e7e7;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:last-child {
      border-bottom: none;
    }

    &:active {
      background-color: #f5f5f5;
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
          color: #000000;
          font-weight: 400;
        }
      }
    }
  }
}

// 移动端适配
@media (max-width: 414px) {
  .menu-section {
    margin: 16px 8px 0;

    .menu-item {
      .menu-content {
        padding: 0 12px;

        .menu-left {
          .menu-icon {
            margin-right: 10px;
          }

          .menu-title {
            font-size: 15px;
          }
        }
      }
    }
  }
}

@media (max-width: 375px) {
  .menu-section {
    .menu-item {
      height: 52px;

      .menu-content {
        .menu-left {
          .menu-title {
            font-size: 14px;
          }
        }
      }
    }
  }
}

// 适配安全区域
@supports (padding: max(0px)) {
  .settings-page {
    padding-bottom: max(20px, env(safe-area-inset-bottom));
  }
}
</style>
