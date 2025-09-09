<script setup lang="ts">
import type { HomeItem } from '@/api/home'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { getHomeContent, refreshHomeContent } from '@/api/home'
import { message as $message } from '@/plugins/message'
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
      $message.error(response.message || '获取内容失败')
    }
  }
  catch (error) {
    console.error('加载首页内容失败:', error)
    $message.error('加载内容失败，请重试')
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
    }
    else {
      $message.error(response.message || '刷新失败')
    }
  }
  catch (error) {
    console.error('刷新首页内容失败:', error)
    $message.error('刷新失败，请重试')
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

function showMessage(theme: string, content = '', duration = 2000) {
  const common = {
    duration,
    icon: true,
    zIndex: 20000,
    context: document.querySelector('.content'),
  }
  if (theme === 'success')
    $message.success(content, common)
  else if (theme === 'error')
    $message.error(content, common)
  else if (theme === 'warning')
    $message.warning(content, common)
  else $message.info(content, common)
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
    <t-pull-down-refresh
      v-model="refreshing" :loading-bar-height="80" :max-bar-height="100"
      :loading-texts="[t('pages.home.content.refresh.pull_down'), t('pages.home.content.refresh.release'), t('pages.home.content.refresh.refreshing'), t('pages.home.content.refresh.completed')]"
      class="flex-1 bg-[var(--td-bg-color-page)]"
      @refresh="handleRefresh" @scrolltolower="handleScrolltolower"
    >
      <div class="content h-full overflow-y-auto">
        <div class="grid-container">
          <template v-for="item in homeItems" :key="item.id">
            <HomeCard v-if="item.type === 'card'" :title="item.title" :image-src="item.image" :tags="item.tags" />
            <HomeSwiper v-else-if="item.type === 'swiper'" :images="item.images" />
          </template>
        </div>
      </div>
    </t-pull-down-refresh>

    <!-- 底部 -->
    <HomeFab />
  </div>
</template>

<style lang="scss" scoped>
.content {
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 12px;
  padding: 12px;
  background: var(--td-bg-color-page);
  justify-items: center;
  align-items: start;
}

// 响应式布局
@media (max-width: 400px) {
  .grid-container {
    grid-template-columns: 1fr;
    justify-items: stretch;
  }
}

@media (min-width: 401px) and (max-width: 600px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 601px) {
  .grid-container {
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  }
}
</style>
