<script setup lang='ts'>
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
    <div>Header</div>

    <HomeTabs />

    <!-- 中间滚动区：关键是 flex-1 + min-h-0 + overflow-y-auto -->

    <div class="flex-1 min-h-0 overflow-y-auto scroll-area">
      <!-- <t-pull-down-refresh
        v-model="refreshing" :loading-bar-height="80" :max-bar-height="100"
        :loading-texts="['下拉刷新', '松开刷新', '正在刷新', '刷新完成']" @refresh="handleRefresh" @scrolltolower="handleScrolltolower"
      > -->
      <t-grid :column="2" :gutter="12" class="bg-[#F3F3F3] p-[12px]">
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
      <!-- </t-pull-down-refresh> -->
      <!-- <HomeFab /> -->
    </div>

    <!-- 底部 -->
    <div>
      <HomeTabBar />
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* 给中间滚动区更顺滑的手机滚动体验 */
.scroll-area {
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}
</style>
