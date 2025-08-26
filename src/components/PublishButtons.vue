<script lang="ts" setup>
import { AppIcon, FileCopyIcon, SearchIcon, UploadIcon } from 'tdesign-icons-vue-next'
import { h } from 'vue'

const uploadIcon = () => h(UploadIcon, { size: '24px' })

const fileCopyIcon = () => h(FileCopyIcon, { size: '24px' })
</script>

<template>
  <div class="row h-[80px] items-center justify-between flex flex-row">
    <t-button size="large" theme="light" :icon="fileCopyIcon">
      存草稿
    </t-button>
    <t-button size="large" theme="primary" :icon="uploadIcon">
      发布
    </t-button>
  </div>
</template>

<style scoped>
.row {
  margin: 0 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
</style>
