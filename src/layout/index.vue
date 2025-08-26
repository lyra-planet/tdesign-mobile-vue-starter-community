<script setup lang='ts'>
import { Icon as TIcon } from 'tdesign-icons-vue-next'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { talklist } from '../views/data/data.js'
import { useLayoutHook } from './hooks'

defineOptions({
  name: 'Layout',
})

const router = useRouter()
const route = useRoute()

// 实时时间
const currentTime = ref('')
let timeInterval: NodeJS.Timeout | null = null

// 更新时间函数
function updateTime() {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  currentTime.value = `${hours}:${minutes}`
}

// 组件挂载时开始更新时间
onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
})

// 组件卸载时清除定时器
onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})

// Tab navigation config
const value = ref('label_1')
const sum = ref(talklist.reduce((acc, element) => {
  return element.count - 0 + acc
}, 0))

const list = ref([
  { value: 'label_1', label: '首页', icon: 'home', num: 0, path: '/home' },
  { value: 'label_3', label: '聊天', icon: 'chat', num: sum.value, path: '/talklist' },
  { value: 'label_4', label: '我的', icon: 'user', num: 0, path: '/notice' },
])

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
    path: '/talklist',
    badge: sum.value > 0 ? sum.value.toString() : undefined,
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
  // 如果是从 notice 页面返回，或当前在 talklist 页面
  if (newPath === '/talklist' || route.matched.some(r => r.path.includes('notice'))) {
    value.value = 'label_3' // 设置为聊天
    activeTab.value = 'message'
  }
  else {
    // 根据当前路径找到对应的 tab
    const currentTab = list.value.find(item => item.path === newPath)
    if (currentTab) {
      value.value = currentTab.value
    }

    const tab = tabList.value.find(item => newPath.startsWith(item.path))
    if (tab) {
      activeTab.value = tab.value
    }
  }
}, { immediate: true })

watch(value, (val) => {
  const target = list.value.find(item => item.value === val)
  if (target && target.path) {
    router.push(target.path)
  }
})

// 处理tab切换
function handleTabChange(value: string) {
  const tab = tabList.value.find(item => item.value === value)
  if (tab) {
    activeTab.value = value
    router.push(tab.path)
  }
}

const { locale, layoutStore, localeState, localeOptions, t, add, onConfirm } = useLayoutHook()
</script>

<template>
  <div class="layout-container">
    <!-- 状态栏模拟 -->
    <div class="status-bar">
      <div class="status-left">
        <span class="time">{{ currentTime }}</span>
      </div>
      <div class="status-right">
        <div class="signal-icons">
          <div class="signal-icon">
            <img src="/my/ios-signal.svg" alt="信号" class="icon-svg">
          </div>
          <div class="wifi-icon">
            <img src="/my/ios-wifi.svg" alt="WiFi" class="icon-svg">
          </div>
          <div class="battery-icon">
            <img src="/my/ios-battery.svg" alt="电量" class="icon-svg">
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
              <TIcon
                :name="tab.icon"
                size="20"
                :color="activeTab === tab.value ? '#0052D9' : '#000'"
              />
              <t-badge
                v-if="tab.badge"
                :count="tab.badge as string"
                size="medium"
                class="tab-badge"
              />
            </div>
            <div
              class="tab-label"
              :style="{
                color: activeTab === tab.value ? '#0052D9' : '#666',
                width: '20px',
                height: '16px',
                fontSize: '10px',
                fontWeight: 600,
                fontFamily: 'PingFang SC',
                textAlign: 'center',
                lineHeight: '16px',
                opacity: 1,
              }"
            >
              {{ tab.label }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 苹果手机底部滑动指示器 -->
    <div class="home-indicator">
      <div class="indicator-bar" />
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
  height: 46px;
  background: transparent; // 改为透明背景
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 14px 14px 30px; // 上下14px，右14px，左30px
  font-size: 14px;
  font-weight: 600;
  color: #000;
  // border-bottom: 0.5px solid #e7e7e7; // 移除底部边界线
  box-sizing: border-box;

  .status-left {
    display: flex;
    align-items: center;
    height: 100%;

    .time {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      font-weight: 600;
      line-height: 1;
    }
  }

  .status-right {
    display: flex;
    align-items: center;
    height: 100%;

    .signal-icons {
      display: flex;
      align-items: center;
      width: 68px; // 固定组宽68px
      height: 100%;
      justify-content: space-between;
      gap: 0; // 移除间距

      .signal-icon,
      .wifi-icon,
      .battery-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
      }

      .icon-svg {
        width: 22px; // 放大图标
        height: 16px; // 放大图标
        object-fit: contain;
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
  padding: 8px;
  height: auto; // 移除固定高度
  display: flex;
  align-items: center;

  .tab-bar {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 8px;

    .tab-item {
      flex: 1;
      height: 40px;
      border-radius: 999px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      background-color: transparent;
      padding: 0 47.17px;
      min-width: 0;

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
        width: 100%;

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
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}

// 苹果手机底部滑动指示器
.home-indicator {
  width: 100%;
  height: 6.4vw; // 24px / 375px * 100vw = 6.4vw
  background-color: #ffffff;
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  padding-bottom: env(safe-area-inset-bottom);

  .indicator-bar {
    width: 35.73vw; // 134px / 375px * 100vw = 35.73vw
    height: 1.33vw; // 5px / 375px * 100vw = 1.33vw
    border-radius: 100px;
    background-color: #000000e6;
    opacity: 1;
  }
}

// 适配安全区域
@supports (padding: max(0px)) {
  .home-indicator {
    padding-bottom: max(0px, env(safe-area-inset-bottom));
  }
}
</style>
