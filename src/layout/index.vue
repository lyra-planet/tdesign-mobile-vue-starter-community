<script setup lang='ts'>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'Layout',
})

const route = useRoute()
const router = useRouter()

// 底部导航配置
const tabList = ref([
  {
    value: 'home',
    label: '首页',
    icon: 'home',
    path: '/home',
  },
  {
    value: 'message',
    label: '消息',
    icon: 'chat',
    path: '/message',
    badge: '2',
  },
  {
    value: 'my',
    label: '我的',
    icon: 'user',
    path: '/my',
  },
])

const activeTab = ref('home')

// 监听路由变化更新激活状态
watch(() => route.path, (newPath) => {
  const tab = tabList.value.find(item => newPath.startsWith(item.path))
  if (tab) {
    activeTab.value = tab.value
  }
}, { immediate: true })

// 处理tab切换
function handleTabChange(value: string) {
  const tab = tabList.value.find(item => item.value === value)
  if (tab) {
    activeTab.value = value
    router.push(tab.path)
  }
}
</script>

<template>
  <div class="layout-container">
    <!-- 状态栏模拟 -->
    <div class="status-bar">
      <div class="status-left">
        <span class="time">9:41</span>
      </div>
      <div class="status-right">
        <div class="signal-icons">
          <div class="signal-bars">
            <span class="bar" />
            <span class="bar" />
            <span class="bar" />
            <span class="bar active" />
          </div>
          <div class="wifi-icon">
            📶
          </div>
          <div class="battery">
            <div class="battery-level" />
          </div>
        </div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <router-view />
    </div>

    <!-- 底部导航栏 -->
    <div class="bottom-navigation">
      <div class="tab-bar">
        <div
          v-for="tab in tabList"
          :key="tab.value"
          class="tab-item"
          :class="{ active: activeTab === tab.value }"
          @click="handleTabChange(tab.value)"
        >
          <div class="tab-content">
            <div class="tab-icon">
              <t-icon
                :name="tab.icon"
                size="20"
                :color="activeTab === tab.value ? '#0052D9' : '#000'"
              />
              <t-badge
                v-if="tab.badge"
                :count="tab.badge"
                size="small"
                class="tab-badge"
              />
            </div>
            <div class="tab-label">
              {{ tab.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

// 状态栏样式
.status-bar {
  height: 44px;
  background: linear-gradient(180deg, #ffffff 0%, #f8f8f8 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  font-size: 14px;
  font-weight: 600;
  color: #000;
  border-bottom: 0.5px solid #e7e7e7;

  .time {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .status-right {
    display: flex;
    align-items: center;

    .signal-icons {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .signal-bars {
      display: flex;
      gap: 2px;

      .bar {
        width: 3px;
        height: 4px;
        background-color: #000;
        border-radius: 1px;
        opacity: 0.3;

        &.active {
          opacity: 1;
        }

        &:nth-child(2) {
          height: 6px;
        }

        &:nth-child(3) {
          height: 8px;
        }

        &:nth-child(4) {
          height: 10px;
        }
      }
    }

    .wifi-icon {
      font-size: 12px;
    }

    .battery {
      width: 24px;
      height: 12px;
      border: 1px solid #000;
      border-radius: 2px;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        right: -3px;
        top: 3px;
        width: 2px;
        height: 6px;
        background-color: #000;
        border-radius: 0 1px 1px 0;
      }

      .battery-level {
        width: 80%;
        height: 100%;
        background-color: #000;
        border-radius: 1px;
      }
    }
  }
}

// 主内容区域
.main-content {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

// 底部导航栏
.bottom-navigation {
  background-color: #fff;
  border-top: 0.5px solid #e7e7e7;
  padding: 8px 16px;
  padding-bottom: calc(8px + env(safe-area-inset-bottom));

  .tab-bar {
    display: flex;
    justify-content: center;
    gap: 8px;

    .tab-item {
      width: 114.33px;
      height: 40px;
      border-radius: 999px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      background-color: transparent;

      &.active {
        background-color: #f2f3ff;

        .tab-label {
          color: #0052d9;
        }
      }

      .tab-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .tab-icon {
          position: relative;
          margin-bottom: 2px;

          .tab-badge {
            position: absolute;
            top: -8px;
            right: -8px;
          }
        }

        .tab-label {
          font-size: 10px;
          color: #666;
          transition: color 0.3s ease;
        }
      }
    }
  }
}

// 适配安全区域
@supports (padding: max(0px)) {
  .bottom-navigation {
    padding-bottom: max(8px, env(safe-area-inset-bottom));
  }
}
</style>
