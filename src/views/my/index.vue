<script setup lang='ts'>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import MenuItem from './components/MenuItem.vue'
import ServiceGrid from './components/ServiceGrid.vue'
import StatsSection from './components/StatsSection.vue'
import UserInfoCard from './components/UserInfoCard.vue'

defineOptions({
  name: 'My',
})

const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()
const { isLoggedIn, userInfo } = userStore

function extractCityName(address: string): string {
  if (!address)
    return ''

  // 处理格式如："北京市 朝阳区" 或 "广东省 深圳市 南山区"
  const parts = address.split(' ').filter(Boolean)

  if (parts.length >= 2) {
    const cityPart = parts.find(part => part.includes('市'))
    if (cityPart) {
      return cityPart
    }

    const firstPart = parts[0]
    if (firstPart.includes('北京') || firstPart.includes('天津')
      || firstPart.includes('上海') || firstPart.includes('重庆')) {
      return firstPart
    }

    return parts[1]
  }

  return parts[0] || address
}

const displayUserInfo = computed(() => {
  if (isLoggedIn && userInfo) {
    return {
      avatar: userInfo.avatar || '/my/Avatar.svg',
      nickname: userInfo.name,
      tags: userInfo.constellation || userInfo.location
        ? [
            ...(userInfo.constellation ? [{ label: userInfo.constellation, icon: 'tag', type: 'constellation' }] : []),
            ...(userInfo.location ? [{ label: extractCityName(userInfo.location), icon: 'location', type: 'location' }] : []),
          ]
        : [],
    }
  }
  return null
})

const guestInfo = computed(() => ({
  nickname: t('pages.my.login_register'),
}))

// 统计数据
const stats = computed(() => [
  { label: t('pages.my.stats.all_posts'), icon: 'form', count: 0 },
  { label: t('pages.my.stats.under_review'), icon: 'search', count: 0 },
  { label: t('pages.my.stats.published'), icon: 'upload', count: 0 },
  { label: t('pages.my.stats.drafts'), icon: 'file-copy', count: 0 },
])

// 服务数据 - 分组显示
const serviceGroups = computed(() => [
  // 第一行：推荐服务
  [
    { name: t('pages.my.services.wechat'), icon: '/my/wechat.svg' },
    { name: t('pages.my.services.qq'), icon: '/my/qq.svg' },
    { name: t('pages.my.services.tdoc'), icon: '/my/Tdoc.svg' },
    { name: t('pages.my.services.tmap'), icon: '/my/Tmap.svg' },
  ],
  // 第二行：数据中心服务
  Array.from({ length: 4 }, () => ({
    name: t('pages.my.services.data_center'),
    icon: '/my/default.svg',
  })),
])

// 菜单项配置
const menuItems = computed(() => [
  {
    name: t('pages.my.contact_service'),
    icon: 'service',
    action: handleContact,
  },
  {
    name: t('pages.my.settings'),
    icon: 'setting',
    action: handleSettings,
  },
])

// 处理登录
function handleLogin() {
  if (!isLoggedIn) {
    router.push('/login')
  }
  else {
    router.push('/my/edit')
  }
}

function handleEdit() {
  router.push('/my/edit')
}

function handleContact() {
  console.warn('联系客服')
}

function handleSettings() {
  router.push('/my/settings')
}

function handleServiceClick(service: any) {
  console.warn('点击服务:', service.name)

  // 如果是数据中心服务，跳转到数据中心页面
  if (service.name === t('pages.my.services.data_center')) {
    router.push('/datacenter')
  }
}

function handleStatClick(stat: any, index: number) {
  console.warn('点击统计:', stat, index)
}

function handleMenuClick(item: any) {
  item.action()
}
</script>

<template>
  <div class="my-page">
    <!-- 用户信息和统计数据合并卡片 -->
    <div class="user-stats-card">
      <!-- 用户信息区域 -->
      <UserInfoCard
        :is-logged-in="isLoggedIn"
        :user-info="displayUserInfo"
        :guest-text="guestInfo.nickname"
        @user-click="handleLogin"
        @edit-click="handleEdit"
      />

      <!-- 分隔线 -->
      <div class="divider" />

      <!-- 统计数据 -->
      <StatsSection
        :stats="stats"
        @stat-click="handleStatClick"
      />
    </div>

    <!-- 推荐服务卡片 -->
    <ServiceGrid
      :title="t('pages.my.services.title')"
      :services="serviceGroups"
      @service-click="handleServiceClick"
    />

    <!-- 菜单项 -->
    <div class="menu-section">
      <MenuItem
        v-for="(item, index) in menuItems"
        :key="index"
        :item="item"
        @click="handleMenuClick"
      />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.my-page {
  min-height: 100vh;
  padding-bottom: 62px;
  color: var(--td-text-color-primary);
}

// 用户信息和统计数据合并卡片
.user-stats-card {
  background-color: var(--td-bg-color-container);
  margin: 0px 16px 16px 16px;
  border-radius: 12px;
  overflow: hidden;
}

// 分隔线
.divider {
  height: 1px;
  background: #f3f3f3;
  margin: 0;
}

// 菜单项容器
.menu-section {
  background-color: var(--td-mask-background);
  margin: 0 16px;
  border-radius: 12px;
  overflow: hidden;
}

// 适配安全区域
@supports (padding: max(0px)) {
  .my-page {
    padding-bottom: max(20px, env(safe-area-inset-bottom));
  }
}
</style>
