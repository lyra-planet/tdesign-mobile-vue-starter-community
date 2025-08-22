<script lang="ts" setup>
import ImageSrc from '@/assets/images/HomeSwiper.png'

const swiperList = [
  ImageSrc,
  ImageSrc,
  ImageSrc,
  ImageSrc,
  ImageSrc,
]
function handleChange(index: number, context: any) {
  console.log('基础示例,页数变化到》》》', index, context)
}
</script>

<template>
  <div class="w-[170px] h-[244px] rounded-[9px] flex flex-col overflow-hidden bg-red-50">
    <t-swiper :autoplay="true" class="h-full" :navigation="{ type: 'dots-bar' }" @change="handleChange">
      <t-swiper-item v-for="(item, index) in swiperList" :key="index">
        <img :src="item" class="img">
      </t-swiper-item>
    </t-swiper>
  </div>
</template>

<style lang='scss' scoped></style>
