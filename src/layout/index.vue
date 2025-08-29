<script setup lang='ts'>
import { Icon as TIcon } from 'tdesign-icons-vue-next'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { talklist } from '../store/talklist'

defineOptions({
  name: 'Layout',
})

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

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
    timeInterval = null
  }
})

// 消息总数计算
const sum = computed(() => {
  return talklist.reduce((acc, element) => {
    return (element.count || 0) + acc
  }, 0)
})

// 底部导航配置
const tabList = computed(() => [
  {
    value: 'home',
    label: t('pages.home.title'),
    icon: 'home',
    path: '/home',
  },
  {
    value: 'message',
    label: t('common.navigation.message'),
    icon: 'chat',
    path: '/talklist',
    badge: sum.value > 0 ? sum.value.toString() : undefined,
  },
  {
    value: 'my',
    label: t('pages.my.title'),
    icon: 'user',
    path: '/my',
  },
])

const PAGE_TITLES: Record<string, () => string> = {
  '/home': () => t('pages.home.title'),
  '/talklist': () => t('pages.talklist.title'),
  '/my': () => t('pages.my.title'),
  '/publish': () => t('pages.publish.title'),
  '/my/settings': () => t('pages.my.settings'),
}

function getPageTitle(): string {
  const path = route.path

  // 直接匹配
  if (PAGE_TITLES[path]) {
    return PAGE_TITLES[path]()
  }

  // 特殊处理 notice 页面
  if (path.startsWith('/notice')) {
    const params = route.params as Record<string, string>
    const noticeId = params.id
    if (noticeId) {
      const currentChat = talklist.find(item => item.id === noticeId)
      return currentChat?.name || '通知'
    }
    return '通知'
  }

  return '首页'
}

const activeTab = ref('home')

// 根据路径获取对应的tab
function getActiveTabByPath(path: string): string {
  if (path === '/talklist' || path.startsWith('/notice')) {
    return 'message'
  }

  const tab = tabList.value.find(item => path.startsWith(item.path))
  return tab?.value || 'home'
}

// 监听路由变化更新激活状态
watch(() => route.path, (newPath) => {
  activeTab.value = getActiveTabByPath(newPath)
}, { immediate: true })

// 处理tab切换
function handleTabChange(value: string) {
  const tab = tabList.value.find(item => item.value === value)
  if (tab) {
    activeTab.value = value
    router.push(tab.path)
  }
}

const showBackButton = computed(() => {
  const path = route.path
  return path === '/publish'
    || path.includes('/login')
    || path.startsWith('/notice')
    || path === '/my/settings'
})

const showBottomNav = computed(() => {
  const path = route.path
  return !path.includes('/my/settings')
    && !path.startsWith('/notice')
    && !path.startsWith('/login')
})

const showTitle = computed(() => {
  const path = route.path
  return path !== '/home' && !path.includes('/login')
})
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

    <!-- 页面标题栏 -->
    <div class="page-header">
      <div class="header-left">
        <!-- 根据条件显示返回按钮或菜单图标 -->
        <TIcon
          v-if="showBackButton"
          name="chevron-left"
          size="24"
          color="#000000e6"
          @click="router.back()"
        />
        <TIcon
          v-else
          name="view-list"
          size="24"
          color="#000000e6"
        />
        <!-- 首页显示搜索框 -->
        <t-search
          v-if="route.path === '/home'"
          class="navbar-search"
          placeholder="请搜索你想要的内容"
          shape="round"
        >
          <template #left-icon>
            <TIcon name="search" size="15px" />
          </template>
        </t-search>
      </div>
      <div class="header-title">
        <span v-if="showTitle">{{ getPageTitle() }}</span>
      </div>
      <div class="header-right">
        <div class="mini-program-buttons">
          <img src="/my/MiniProgramMoreOutlined.svg" alt="更多" class="mini-program-icon">
          <div class="divider-line" />
          <img src="/my/MiniProgramCloseOutlined.svg" alt="关闭" class="mini-program-icon">
        </div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <router-view />
    </div>

    <!-- 底部导航栏 -->
    <div v-if="showBottomNav" class="bottom-navigation">
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
                :count="tab.badge"
                size="medium"
                class="tab-badge"
              />
            </div>
            <div
              class="tab-label"
              :class="{ 'tab-label--active': activeTab === tab.value }"
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
  background-color: #fff;
  // background: transparent; // 改为透明背景
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
      font-size: 16px;
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
        width: 20px; // 放大图标
        height: 20px; // 放大图标
        object-fit: contain;
      }
    }
  }
}

// 页面标题栏样式
.page-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px 0 12px;
  background-color: #fff;
  border-bottom: none;
  height: 48px;
  position: relative;

  .header-left {
    position: absolute;
    left: 12px;
    display: flex;
    align-items: center;
    height: 100%;

    .navbar-search {
      --td-search-height: 32px;
      width: 189px !important;
      height: 32px;
      margin-left: 10px;
      display: flex;
      align-items: center;
    }

    :deep(.t-input__keyword) {
      max-width: 140px;
      font-size: 14px;
    }
  }

  .header-title {
    font-size: 18px;
    font-weight: 600;
    color: #000000e6;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    height: 26px;
    line-height: 26px;
    display: flex;
    align-items: center;
  }

  .header-right {
    position: absolute;
    right: 12px;
    display: flex;
    align-items: center;
    height: 100%;

    .mini-program-buttons {
      display: flex;
      align-items: center;
      height: 32px;
      border-radius: 16px;
      opacity: 1;
      border: 0.5px solid #e7e7e7;
      background-color: #fff;
      padding: 0 13px;

      .mini-program-icon {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .divider-line {
        width: 1px;
        height: 20px;
        background-color: #e7e7e7;
        opacity: 1;
        margin: 0 8px;
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
          width: 20px;
          height: 16px;
          font-size: 10px;
          font-weight: 600;
          font-family: 'PingFang SC', sans-serif;
          text-align: center;
          line-height: 16px;
          color: #666;
          transition: color 0.3s ease;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          opacity: 1;

          &--active {
            color: #0052d9;
          }
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
