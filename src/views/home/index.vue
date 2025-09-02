<script setup lang="ts">
import { Message } from 'tdesign-mobile-vue'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import HomeSwiperImageSrc from '@/assets/images/HomeSwiper.png'
import HomeCard from '@/components/home/HomeCard.vue'
import HomeFab from '@/components/home/HomeFab.vue'
import HomeSwiper from '@/components/home/HomeSwiper.vue'
import HomeTabs from '@/components/home/HomeTabs.vue'

defineOptions({ name: 'Home' })

const { t } = useI18n()

const refreshing = ref(false)

// 数据类型
interface HomeItem {
  type: 'card' | 'swiper'
  id: number
  title?: string
  image?: string
  images?: string[]
  tags?: { label: string, theme: 'primary' | 'success' | 'default' | 'danger' | 'warning' }[]
}

// 示例数据
const homeItems = ref<HomeItem[]>([
  {
    type: 'card',
    id: 1,
    title: t('pages.home.content.card_title_1'),
    image: '/src/assets/images/HomeCard.png',
    tags: [
      { label: t('pages.home.content.tags.ai_art'), theme: 'primary' },
      { label: t('pages.home.content.tags.copyright_material'), theme: 'success' },
    ],
  },
  {
    type: 'swiper',
    id: 2,
    images: [
      HomeSwiperImageSrc,
      HomeSwiperImageSrc,
      HomeSwiperImageSrc,
      HomeSwiperImageSrc,
      HomeSwiperImageSrc,
    ],
  },
  {
    type: 'card',
    id: 3,
    title: t('pages.home.content.card_title_2'),
    image: '/src/assets/images/HomeCard.png',
    tags: [
      { label: t('pages.home.content.tags.ai_art'), theme: 'primary' },
      { label: t('pages.home.content.tags.copyright_material'), theme: 'success' },
    ],
  },
  {
    type: 'card',
    id: 4,
    title: t('pages.home.content.card_title_1'),
    image: '/src/assets/images/HomeCard.png',
    tags: [
      { label: t('pages.home.content.tags.ai_art'), theme: 'primary' },
      { label: t('pages.home.content.tags.copyright_material'), theme: 'success' },
    ],
  },
  {
    type: 'card',
    id: 5,
    title: t('pages.home.content.card_title_1'),
    image: '/src/assets/images/HomeCard.png',
    tags: [
      { label: t('pages.home.content.tags.ai_art'), theme: 'primary' },
      { label: t('pages.home.content.tags.copyright_material'), theme: 'success' },
    ],
  },
  {
    type: 'card',
    id: 6,
    title: t('pages.home.content.card_title_1'),
    image: '/src/assets/images/HomeCard.png',
    tags: [
      { label: t('pages.home.content.tags.ai_art'), theme: 'primary' },
      { label: t('pages.home.content.tags.copyright_material'), theme: 'success' },
    ],
  },
])

function handleRefresh() {
  refreshing.value = true
  // 模拟刷新完成并新增数据
  setTimeout(() => {
    const nextId = homeItems.value.length + 1
    homeItems.value.push({
      type: 'card',
      id: nextId,
      title: `${t('pages.home.content.new_card_prefix')} ${nextId}`,
      image: '/src/assets/images/HomeCard.png',
      tags: [{ label: t('pages.home.content.tags.new_content'), theme: 'success' }],
    })
    refreshing.value = false
  }, 1200)
}

function handleScrolltolower() {
  console.log('触底，可以加载更多数据')
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
