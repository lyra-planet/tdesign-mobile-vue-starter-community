<script lang="ts" setup>
import { AddIcon } from 'tdesign-icons-vue-next'
import { Message } from 'tdesign-mobile-vue'
import { h } from 'vue'
import router from '@/router'

const iconFunc = () => h(AddIcon, { size: '24px' })

function showMessage(theme: string, content = '这是一条普通通知信息', duration = 5000) {
  if (Message[theme]) {
    Message[theme]({
      offset: [108, 12],
      content,
      duration,
      icon: true,
      zIndex: 20000,
      context: document.querySelector('.ddd'),
      // single: false, // 打开注释，体验多个消息叠加效果
    })
  }
}

const showSuccessMessage = () => showMessage('success', '这是一条成功的提示消息')

function onClick() {
  console.log('点击了发布')
  showSuccessMessage()
  // router.push('/publish')
}
</script>

<template>
  <t-fab :icon="iconFunc" style="right: 16px; bottom: 80px;" text="发布" @click="onClick" />
</template>
