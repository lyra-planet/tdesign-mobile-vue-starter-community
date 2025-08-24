<script setup lang='ts'>
import { Message } from 'tdesign-mobile-vue'
import { ref } from 'vue'
import HomeCard from '@/components/HomeCard.vue'
import HomeFab from '@/components/HomeFab.vue'
import HomeSwiper from '@/components/HomeSwiper.vue'
import HomeTabBar from '@/components/HomeTabBar.vue'
import HomeTabs from '@/components/HomeTabs.vue'
import NavBarWithSearch from '@/components/NavBarWithSearch.vue'

defineOptions({ name: 'Home' })

const refreshing = ref(false)

function handleRefresh() {
  refreshing.value = true
  // 模拟刷新完成
  setTimeout(() => {
    refreshing.value = false
  }, 1200)
}

function handleScrolltolower() {
  console.log('触底')
}
</script>

<template>
  <!-- 用 h-screen 确保整页有固定高度；如果你项目里已全局把 html/body/#app 设为 100% 高度，也可继续用 h-full -->
  <div class="h-screen flex flex-col">
    <!-- 顶部 -->
    <NavBarWithSearch />
    <HomeTabs />

    <!-- 中间滚动区：关键是 flex-1 + min-h-0 + overflow-y-auto -->

    <div class="ddd flex-1 min-h-0 overflow-y-auto scroll-area bg-[#F3F3F3]">
      <t-pull-down-refresh
        v-model="refreshing" :loading-bar-height="80" :max-bar-height="100"
        :loading-texts="['下拉刷新', '松开刷新', '正在刷新', '刷新完成']" @refresh="handleRefresh" @scrolltolower="handleScrolltolower"
      >
        <t-grid :column="2" :gutter="12" class="bg-[#F3F3F3] p-[12px] ">
          <HomeCard />
          <HomeSwiper />
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
        </t-grid>
      </t-pull-down-refresh>
    </div>
    <!-- 底部 -->
    <div>
      <HomeTabBar />
    </div>
    <HomeFab />
  </div>
</template>

<style lang="scss" scoped>
/* 给中间滚动区更顺滑的手机滚动体验 */
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
