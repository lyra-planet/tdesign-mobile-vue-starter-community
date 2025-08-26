<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  images: string[]
}>()

function handleChange(index: number, context: any) {
  console.log('页数变化到》》》', index, context)
}
</script>

<template>
  <div class="w-[170px] h-[244px] rounded-[9px] flex flex-col overflow-hidden bg-red-50">
    <t-swiper :autoplay="true" class="h-full" :navigation="{ type: 'dots-bar' }" @change="handleChange">
      <t-swiper-item v-for="(item, index) in props.images" :key="index">
        <img :src="item" class="img object-cover w-[170px]">
      </t-swiper-item>
    </t-swiper>
  </div>
</template>

<style lang="scss" scoped>

</style>
