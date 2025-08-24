<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  title: string
  tags: { label: string, theme: 'primary' | 'success' | 'default' | 'danger' | 'warning' }[]
  imageSrc: string
}>()
</script>

<template>
  <div class="w-[170px] rounded-[9px] flex flex-col overflow-hidden">
    <div class="h-[170px] bg-blue-100">
      <t-image class="image-container" fit="fill" :src="props.imageSrc" />
    </div>
    <div class="h-[74px] w-[170px] box-border bg-white py-[12px] px-[16px]">
      <div class="text-[14px] font-[400] mb-[8px]">
        {{ props.title }}
      </div>
      <div>
        <t-tag
          v-for="(tag, index) in props.tags" :key="index" variant="light" size="small" :theme="tag.theme"
          class="mr-[8px]"
        >
          {{ tag.label }}
        </t-tag>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
