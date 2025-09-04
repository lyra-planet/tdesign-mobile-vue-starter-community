<script setup lang="ts">
import type { HomeItem } from '@/api/home'
import { Message } from 'tdesign-mobile-vue'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { getHomeContent, refreshHomeContent } from '@/api/home'
import HomeCard from './components/HomeCard.vue'
import HomeFab from './components/HomeFab.vue'
import HomeSwiper from './components/HomeSwiper.vue'
import HomeTabs from './components/HomeTabs.vue'

defineOptions({ name: 'Home' })

const { t } = useI18n()

const refreshing = ref(false)
const loading = ref(false)
const homeItems = ref<HomeItem[]>([])
const currentPage = ref(1)
const hasMore = ref(true)

// 加载首页内容
async function loadHomeContent(page = 1, isRefresh = false) {
  try {
    if (!isRefresh)
      loading.value = true

    const response = await getHomeContent({ page, limit: 10 })

    if (response.success) {
      if (isRefresh || page === 1) {
        homeItems.value = response.data.items
      }
      else {
        homeItems.value.push(...response.data.items)
      }

      if (response.data.pagination) {
        hasMore.value = response.data.pagination.hasMore
        currentPage.value = response.data.pagination.page
      }
    }
    else {
      Message.error(response.message || '获取内容失败')
    }
  }
  catch (error) {
    console.error('加载首页内容失败:', error)
    Message.error('加载内容失败，请重试')
  }
  finally {
    loading.value = false
    if (isRefresh)
      refreshing.value = false
  }
}

// 刷新首页内容
async function handleRefreshContent() {
  try {
    refreshing.value = true
    const response = await refreshHomeContent()

    if (response.success) {
      homeItems.value = response.data.items
      Message.success('刷新成功')
    }
    else {
      Message.error(response.message || '刷新失败')
    }
  }
  catch (error) {
    console.error('刷新首页内容失败:', error)
    Message.error('刷新失败，请重试')
  }
  finally {
    refreshing.value = false
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadHomeContent()
})

function handleRefresh() {
  handleRefreshContent()
}

function handleScrolltolower() {
  // 加载更多数据
  if (hasMore.value && !loading.value) {
    loadHomeContent(currentPage.value + 1)
  }
}

function showMessage(theme: string, content = '这是一条普通通知信息', duration = 2000) {
  if (Message[theme]) {
    Message[theme]({
      offset: [108, 16],
      content,
      duration,
      icon: true,
      zIndex: 20000,
      context: document.querySelector('.content'),
    })
  }
}
const route = useRoute()
const router = useRouter()
const showSuccessMessage = () => showMessage('success', '发布成功')
onMounted(() => {
  if (route.query.success === '1') {
    showSuccessMessage()
    router.replace({
      path: route.path,
      query: { ...route.query, success: undefined },
    })
  }
})
</script>

<template>
  <div class="h-[calc(100vh-106px)] flex flex-col overflow-hidden">
    <!-- 顶部 -->
    <HomeTabs />

    <!-- 中间滚动区 -->
    <div class="content flex-1 min-h-0 overflow-y-auto scroll-area bg-[var(--td-bg-color-page)]">
      <t-pull-down-refresh
        v-model="refreshing" :loading-bar-height="80" :max-bar-height="100"
        :loading-texts="[t('pages.home.content.refresh.pull_down'), t('pages.home.content.refresh.release'), t('pages.home.content.refresh.refreshing'), t('pages.home.content.refresh.completed')]"
        @refresh="handleRefresh" @scrolltolower="handleScrolltolower"
      >
        <t-grid
          :column="2" :gutter="12"
          class="bg-[var(--td-bg-color-page)] p-[12px] justify-center place-items-center  items-center "
        >
          <template v-for="item in homeItems" :key="item.id">
            <HomeCard v-if="item.type === 'card'" :title="item.title" :image-src="item.image" :tags="item.tags" />
            <HomeSwiper v-else-if="item.type === 'swiper'" :images="item.images" />
          </template>
        </t-grid>
      </t-pull-down-refresh>
    </div>

    <!-- 底部 -->
    <HomeFab />
  </div>
</template>

<style lang="scss" scoped>
.scroll-area {
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

:deep(.t-pull-down-refresh) {
  overflow-y: auto !important;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>
