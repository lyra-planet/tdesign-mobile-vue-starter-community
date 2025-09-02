<script setup lang='ts'>
import { ref } from 'vue'

import PublishButtons from '@/components/publish/PublishButtons.vue'

import PublishCell from '@/components/publish/PublishCell.vue'

import PublishTag from '@/components/publish/PublishTag.vue'

import PublishText from '@/components/publish/PublishText.vue'

import PublishUpload from '@/components/publish/PublishUpload.vue'

defineOptions({
  name: 'Publish',
})
</script>

<template>
  <div class="flex flex-col h-full justify-between">
    <div>
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
