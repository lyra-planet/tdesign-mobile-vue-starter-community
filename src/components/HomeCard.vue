<script lang="ts" setup>
import ImageSrc from '@/assets/images/HomeCard.png'
</script>

<template>
  <div class="w-[170px] rounded-[9px] flex flex-col overflow-hidden">
    <div class="h-[170px]  bg-blue-100">
      <t-image class="image-container" fit="fill" :src="ImageSrc" />
    </div>
    <div class="h-[74px] w-[170px] box-border bg-white py-[12px] px-[16px]">
      <div class="text-[14px] font-[400] mb-[8px]">
        少年,星空与梦想
      </div>
      <div>
        <t-tag variant="light" size="small" theme="primary" class="mr-[8px]">
          AI绘画
        </t-tag>
        <t-tag variant="light" size="small" theme="success">
          版权素材
        </t-tag>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped></style>
