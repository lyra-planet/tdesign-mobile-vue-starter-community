<script setup lang="ts">
import { ref } from 'vue'
import HomeSwiperImageSrc from '@/assets/images/HomeSwiper.png'
import HomeCard from '@/components/HomeCard.vue'
import HomeFab from '@/components/HomeFab.vue'
import HomeSwiper from '@/components/HomeSwiper.vue'
import HomeTabBar from '@/components/HomeTabBar.vue'
import HomeTabs from '@/components/HomeTabs.vue'

import NavBarWithSearch from '@/components/NavBarWithSearch.vue'

defineOptions({ name: 'Home' })

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
    title: '少年,星空与梦想',
    image: '/src/assets/images/HomeCard.png',
    tags: [
      { label: 'AI绘画', theme: 'primary' },
      { label: '版权素材', theme: 'success' },
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
    title: '仰望星空的少女',
    image: '/src/assets/images/HomeCard.png',
    tags: [
      { label: 'AI绘画', theme: 'primary' },
      { label: '版权素材', theme: 'success' },
    ],
  },
  {
    type: 'card',
    id: 4,
    title: '少年,星空与梦想',
    image: '/src/assets/images/HomeCard.png',
    tags: [
      { label: 'AI绘画', theme: 'primary' },
      { label: '版权素材', theme: 'success' },
    ],
  },
  {
    type: 'card',
    id: 5,
    title: '少年,星空与梦想',
    image: '/src/assets/images/HomeCard.png',
    tags: [
      { label: 'AI绘画', theme: 'primary' },
      { label: '版权素材', theme: 'success' },
    ],
  },
  {
    type: 'card',
    id: 6,
    title: '少年,星空与梦想',
    image: '/src/assets/images/HomeCard.png',
    tags: [
      { label: 'AI绘画', theme: 'primary' },
      { label: '版权素材', theme: 'success' },
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
      title: `新卡片 ${nextId}`,
      image: '/src/assets/images/HomeCard.png',
      tags: [{ label: '新内容', theme: 'success' }],
    })
    refreshing.value = false
  }, 1200)
}

function handleScrolltolower() {
  console.log('触底，可以加载更多数据')
}

const loadingProps = ref({
  indicator: () => h('svg', {
    't': '1756052813561',
    'class': 'icon animate-spin',
    'viewBox': '0 0 1024 1024',
    'version': '1.1',
    'xmlns': 'http://www.w3.org/2000/svg',
    'p-id': '10046',
    'width': '24',
    'height': '24',
  }, [
    h('path', {
      'd': 'M469.333333 1022.250667C206.520889 1000.561778 0 780.401778 0 512 0 229.233778 229.233778 0 512 0c268.401778 0 488.561778 206.520889 510.250667 469.333333H907.946667C886.670222 269.468444 717.525333 113.777778 512 113.777778 292.067556 113.777778 113.777778 292.067556 113.777778 512c0 205.511111 155.690667 374.670222 355.555555 395.960889v114.289778z',
      'fill': '#417FF9',
      'p-id': '10047',
    }),
  ]),
})
</script>

<template>
  <div class="h-screen flex flex-col">
    <!-- 顶部 -->
    <NavBarWithSearch />
    <HomeTabs />

    <!-- 中间滚动区 -->
    <div class="flex-1 min-h-0 overflow-y-auto scroll-area bg-[#F3F3F3] pb-[56px]">
      <t-pull-down-refresh
        v-model="refreshing" :loading-bar-height="80" :max-bar-height="100"
        :loading-props="loadingProps"
        :loading-texts="['下拉刷新', '松开刷新', '正在刷新', '刷新完成']" @refresh="handleRefresh" @scrolltolower="handleScrolltolower"
      >
        <t-grid :column="2" :gutter="12" class="bg-[#F3F3F3] p-[12px] ">
          <template v-for="item in homeItems" :key="item.id">
            <HomeCard v-if="item.type === 'card'" :title="item.title" :image-src="item.image" :tags="item.tags" />
            <HomeSwiper v-else-if="item.type === 'swiper'" :images="item.images" />
          </template>
        </t-grid>
      </t-pull-down-refresh>
    </div>

    <!-- 底部 -->
    <HomeTabBar />
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
