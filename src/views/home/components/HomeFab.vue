<script lang="ts" setup>
import { AddIcon } from 'tdesign-icons-vue-next'
import { h } from 'vue'
import { useI18n } from 'vue-i18n'
import router from '@/router'

const { t } = useI18n()
const iconFunc = () => h(AddIcon, { size: '24px' })

function onClick() {
  console.log('点击了发布')
  // 使用 path 确保与自动路由匹配，避免名称不一致导致失败
  router.push({ path: '/publish' })
}
</script>

<template>
  <t-fab :icon="iconFunc" style="right: 16px; bottom: 80px;" :text="t('pages.publish.publish_action')" @click="onClick" />
</template>
