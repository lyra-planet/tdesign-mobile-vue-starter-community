<script setup lang='ts'>
import { Icon as TIcon } from 'tdesign-icons-vue-next'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { talklist } from '../store/talklist'

defineOptions({
  name: 'Layout',
})

const visible = ref(false)
const { t } = useI18n()
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
function changeToSearch() {
  // 点击搜索框时跳转到搜索页面
  router.push('/home/search')
}

// 组件挂载时开始更新时间
onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
  if (localStorage.getItem('theme-mode') === 'dark') {
    document.documentElement.setAttribute('theme-mode', 'dark')
  }
  else {
    document.documentElement.setAttribute('theme-mode', 'light')
  }
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
  '/my/general-settings': () => t('pages.my.general_settings.title'),
}

const baseSidebar = ref([
  {
    title: '首页',
    path: '/home',
  },
  {
    title: '搜索页',
    path: '/home/search', // 你需要在 router 里加一个对应页面
  },
  {
    title: '发布页',
    path: '/publish',
  },
  {
    title: '消息列表页',
    path: '/notice/1', // 示例，动态参数自己传
  },
  {
    title: '对话页',
    path: '/talklist',
  },
  {
    title: '个人中心页（已登录）',
    path: '/my',
  },
  {
    title: '个人中心页（未登录）',
    path: '/login/phone',
  },
  {
    title: '个人信息表单页',
    path: '/my/edit',
  },
  {
    title: '设置页',
    path: '/my/settings',
  },
  {
    title: '数据图表页',
    path: '/chart',
  },
  {
    title: '登录注册页（验证登录）',
    path: '/login/verify',
  },
  {
    title: '登录注册页（密码登录）',
    path: '/login/password',
  },
])

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
    || path.includes('/my')
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

const isLoginPage = computed(() => {
  return route.path.includes('/login')
})

const isMyPage = computed(() => {
  return route.path === '/my' || route.path.includes('/login')
})

function itemClick(index: number, item, context: { e: MouseEvent }) {
  console.log('itemclick: ', index, item, context)
  if (item.path) {
    console.log('路由跳转到: ', item.path)
    router.push(item.path)
    visible.value = false
  }
}
</script>

<template>
  <t-drawer
    v-model:visible="visible" style="--td-drawer-title-font-size:24px;--td-drawer-sidebar-height:90vh;"
    class="drawer-c" placement="left" title="页面目录" :items="baseSidebar" @item-click="itemClick"
  />
  <div class="layout-container" :class="{ 'login-layout': isLoginPage, 'show-background': isMyPage }">
    <!-- 页面标题栏 -->
    <div class="page-header" :class="{ 'page-header--transparent': isMyPage }">
      <div class="header-left">
        <!-- 根据条件显示返回按钮或菜单图标 -->
        <TIcon
          v-if="showBackButton" name="chevron-left" size="24" color="var(--td-text-color-primary)"
          @click="router.back()"
        />
        <TIcon v-else name="view-list" size="24" color="var(--td-text-color-primary)" @click="visible = true" />
        <!-- 首页显示搜索框 -->
        <t-search
          v-if="route.path === '/home'" class="navbar-search" :placeholder="t('common.search.placeholder')"
          shape="round"
          @click="changeToSearch()"
        >
          <template #left-icon>
            <TIcon name="search" size="15px" />
          </template>
        </t-search>
      </div>
      <div class="header-title">
        <span v-if="showTitle">{{ getPageTitle() }}</span>
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
          v-for="tab in tabList" :key="tab.value" class="tab-item" :class="{ active: activeTab === tab.value }"
          @click="handleTabChange(tab.value)"
        >
          <div class="tab-content">
            <div class="tab-icon">
              <TIcon
                :name="tab.icon" size="20"
                :color="activeTab === tab.value ? 'var(--td-brand-color-7)' : 'var(--td-text-color-primary)'"
              />
              <t-badge v-if="tab.badge" :count="tab.badge" size="medium" class="tab-badge" />
            </div>
            <div class="tab-label" :class="{ 'tab-label--active': activeTab === tab.value }">
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
  background-color: var(--td-bg-color-page);

  &.login-layout {
    // light 模式下透明背景
    background-color: transparent;
  }
}

// dark 模式下登录页面恢复原背景色
:root[theme-mode='dark'] .layout-container.login-layout {
  background-color: var(--td-bg-color-page);
}

.show-background {
  // 二倍图处理
  background: image-set(url('@/assets/images/bg.png') 1x, url('@/assets/images/bg@2x.png') 2x) no-repeat;
  background-size: contain;
  background-color: var(--td-bg-color-page);
}

// 页面标题栏样式
.page-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px 0 12px;
  background-color: var(--td-bg-color-container);
  height: 48px;
  position: relative;

  &--transparent {
    background-color: transparent;
  }

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
    color: var(--td-text-color-primary);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    height: 26px;
    line-height: 26px;
    display: flex;
    align-items: center;
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
  background-color: var(--td-bg-color-container);
  border-top: 0.5px solid var(--td-border-level-1-color);
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
        background-color: var(--td-brand-color-1);

        .tab-label {
          color: var(--td-brand-color-7);
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
          color: var(--td-text-color-secondary);
          transition: color 0.3s ease;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          &--active {
            color: var(--td-brand-color-7);
          }
        }
      }
    }
  }
}
</style>
