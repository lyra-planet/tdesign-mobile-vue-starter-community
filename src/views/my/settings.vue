<script setup lang='ts'>
import { useRouter } from 'vue-router'

defineOptions({
  name: 'Settings',
})

const router = useRouter()

// 第一组设置项（通用设置、通知设置）
const firstGroup = [
  {
    name: '通用设置',
    icon: 'app',
    action: () => console.log('通用设置'),
  },
  {
    name: '通知设置',
    icon: 'notification',
    action: () => console.log('通知设置'),
  },
]

// 第二组设置项（深色模式、字体大小、播放设置）
const secondGroup = [
  {
    name: '深色模式',
    icon: 'image',
    action: () => console.log('深色模式'),
  },
  {
    name: '字体大小',
    icon: 'chart',
    action: () => console.log('字体大小设置'),
  },
  {
    name: '播放设置',
    icon: 'sound',
    action: () => console.log('播放设置'),
  },
]

// 第三组设置项（账号安全、隐私）
const thirdGroup = [
  {
    name: '账号安全',
    icon: 'secured',
    action: () => console.log('账号安全'),
  },
  {
    name: '隐私',
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
    <!-- 头部 -->
    <div class="header">
      <div class="header-left" @click="handleBack">
        <t-icon name="chevron-left" size="24" color="#000" />
      </div>
      <div class="header-title">
        设置
      </div>
      <div class="header-right">
        <!-- 空白占位 -->
      </div>
    </div>

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

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: white;
  height: 48px;
  border-bottom: 0.5px solid #e7e7e7;
  position: relative;

  .header-left {
    cursor: pointer;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 17px;
    font-weight: 600;
    color: #333;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .header-right {
    width: 24px;
    height: 24px;
  }
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
