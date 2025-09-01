import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { talklist } from '../store/talklist'

export function useNavigation() {
  const { t } = useI18n()
  const router = useRouter()
  const route = useRoute()
  const activeTab = ref('home')

  // 页面标题映射
  const PAGE_TITLES: Record<string, () => string> = {
    '/home': () => t('pages.home.title'),
    '/talklist': () => t('pages.talklist.title'),
    '/my': () => t('pages.my.title'),
    '/publish': () => t('pages.publish.title'),
    '/my/settings': () => t('pages.my.settings'),
    '/my/general-settings': () => t('pages.my.general_settings.title'),
  }

  // 侧边栏配置
  const baseSidebar = ref([
    {
      title: '首页',
      path: '/home',
    },
    {
      title: '搜索页',
      path: '/home/search',
    },
    {
      title: '发布页',
      path: '/publish',
    },
    {
      title: '消息列表页',
      path: '/notice/1',
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

  // 消息总数计算
  const messageSum = computed(() => {
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
      badge: messageSum.value > 0 ? messageSum.value.toString() : undefined,
    },
    {
      value: 'my',
      label: t('pages.my.title'),
      icon: 'user',
      path: '/my',
    },
  ])

  // 获取页面标题
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

  // 根据路径获取对应的tab
  function getActiveTabByPath(path: string): string {
    if (path === '/talklist' || path.startsWith('/notice')) {
      return 'message'
    }

    const tab = tabList.value.find(item => path.startsWith(item.path))
    return tab?.value || 'home'
  }

  // 处理tab切换
  function handleTabChange(value: string) {
    const tab = tabList.value.find(item => item.value === value)
    if (tab) {
      activeTab.value = value
      router.push(tab.path)
    }
  }

  // 跳转到搜索页面
  function changeToSearch() {
    router.push('/home/search')
  }

  // 侧边栏项目点击处理
  function handleSidebarItemClick(index: number, item: any, context: { e: MouseEvent }) {
    console.log('itemclick: ', index, item, context)
    if (item.path) {
      console.log('路由跳转到: ', item.path)
      router.push(item.path)
    }
  }

  // 监听路由变化更新激活状态
  watch(() => route.path, (newPath) => {
    activeTab.value = getActiveTabByPath(newPath)
  }, { immediate: true })

  return {
    activeTab,
    tabList,
    baseSidebar,
    messageSum,
    getPageTitle,
    getActiveTabByPath,
    handleTabChange,
    changeToSearch,
    handleSidebarItemClick,
  }
}
