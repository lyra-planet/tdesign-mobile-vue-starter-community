<script setup lang='ts'>
import { ref } from 'vue'

import PublishButtons from '@/components/PublishButtons.vue'

import PublishCell from '@/components/PublishCell.vue'

import PublishNavBar from '@/components/PublishNavBar.vue'

import PublishTag from '@/components/PublishTag.vue'

import PublishText from '@/components/PublishText.vue'

import PublishUpload from '@/components/PublishUpload.vue'

defineOptions({
  name: 'Publish',
})
</script>

<template>
  <div class="flex flex-col h-full justify-between">
    <div>
      <PublishNavBar />
      <PublishUpload />
      <PublishText />
      <PublishTag />
      <PublishCell />
    </div>
    <PublishButtons />
  </div>
</template>

<style lang="scss" scoped>

</style>
