<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { getProfileServices, getUserStats, trackServiceClick } from '@/api/profile'
import defaultAvatarUrl from '@/assets/svgs/Avatar.svg?url'
import { MenuItem, ServiceGrid, StatsSection } from '@/components'

import { useUserStore } from '@/store/user'
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
      avatar: userInfo.avatar || defaultAvatarUrl,
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
const stats = ref([])
const serviceGroups = ref([])
const menuItems = ref([])
const loading = ref(false)

// 加载个人页面数据
async function loadProfileData() {
  try {
    loading.value = true

    // 并行加载服务数据和统计数据
    const [servicesResponse, statsResponse] = await Promise.all([
      getProfileServices(),
      getUserStats(userInfo?.id),
    ])

    if (servicesResponse.success) {
      // 翻译服务名称
      serviceGroups.value = servicesResponse.data.serviceGroups.map(group =>
        group.map(service => ({
          ...service,
          name: getServiceName(service.name),
        })),
      )

      // 翻译菜单项
      menuItems.value = servicesResponse.data.menuItems.map(item => ({
        ...item,
        name: getMenuItemName(item.name),
        action: getMenuAction(item.name),
      }))
    }

    if (statsResponse.success) {
      // 翻译统计项标签
      stats.value = statsResponse.data.stats.map(stat => ({
        ...stat,
        label: getStatLabel(stat.key),
      }))
    }
  }
  catch (error) {
    console.error('加载个人页面数据失败:', error)
  }
  finally {
    loading.value = false
  }
}

// 获取服务名称翻译
function getServiceName(name: string): string {
  const nameMap: Record<string, string> = {
    微信: t('pages.my.services.wechat'),
    QQ: t('pages.my.services.qq'),
    TDoc: t('pages.my.services.tdoc'),
    TMap: t('pages.my.services.tmap'),
    数据中心: t('pages.my.services.data_center'),
  }
  return nameMap[name] || name
}

// 获取菜单项名称翻译
function getMenuItemName(name: string): string {
  const nameMap: Record<string, string> = {
    联系客服: t('pages.my.contact_service'),
    设置: t('pages.my.settings'),
  }
  return nameMap[name] || name
}

// 获取统计项标签翻译
function getStatLabel(key: string): string {
  const labelMap: Record<string, string> = {
    all_posts: t('pages.my.stats.all_posts'),
    under_review: t('pages.my.stats.under_review'),
    published: t('pages.my.stats.published'),
    drafts: t('pages.my.stats.drafts'),
  }
  return labelMap[key] || key
}

// 获取菜单动作
function getMenuAction(name: string) {
  const actionMap: Record<string, () => void> = {
    联系客服: handleContact,
    设置: handleSettings,
  }
  return actionMap[name] || (() => {})
}

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

async function handleServiceClick(service: any) {
  console.warn('点击服务:', service.name)

  // 记录服务点击
  try {
    await trackServiceClick({
      serviceName: service.name,
      serviceType: service.type || 'internal',
    })
  }
  catch (error) {
    console.error('记录服务点击失败:', error)
  }

  // 处理服务跳转
  if (service.url) {
    if (service.type === 'external') {
      window.open(service.url, '_blank')
    }
    else {
      router.push(service.url)
    }
  }
  else if (service.name === t('pages.my.services.data_center')) {
    router.push('/datacenter')
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadProfileData()
})

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
