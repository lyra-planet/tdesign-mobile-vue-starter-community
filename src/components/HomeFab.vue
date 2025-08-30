<script lang="ts" setup>
import { AddIcon } from 'tdesign-icons-vue-next'
import { h } from 'vue'
import router from '@/router'

const iconFunc = () => h(AddIcon, { size: '24px' })

function onClick() {
  console.log('点击了发布')
  try {
    // 先尝试使用 router.push
    router.push({ name: 'Publish' })
  }
  catch (error) {
    // 如果 router.push 失败，尝试使用 window.location
    window.location.href = '/publish'
  }
}
</script>

<template>
  <t-fab :icon="iconFunc" style="right: 16px; bottom: 104px;" text="发布" @click="onClick" />
</template>
