<script lang="ts" setup>
import { Message } from 'tdesign-mobile-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

function showMessage(theme: string, content = '这是一条普通通知信息', duration = 5000) {
  if (Message[theme]) {
    Message[theme]({
      offset: [10, 16],
      content,
      duration,
      icon: true,
      zIndex: 20000,
      context: document.querySelector('.ddd'),
      // single: false, // 打开注释，体验多个消息叠加效果
    })
  }
}

const showInfoMessage = () => showMessage('info', '这是一条普通通知信息')

const showWarnMessage = () => showMessage('warning', '这是一条需要用户关注到的警示通知')

const showSuccessMessage = () => showMessage('success', t('common.messages.success'))

const showErrorMessage = () => showMessage('error', t('common.messages.error'))
</script>

<template>
  <div class="button-demo">
    <t-button block size="large" variant="outline" theme="primary" @click="showInfoMessage">
      {{ t('common.buttons.info_notification') }}
    </t-button>
    <t-button block size="large" variant="outline" theme="primary" @click="showSuccessMessage">
      {{ t('common.buttons.success_notification') }}
    </t-button>
    <t-button block size="large" variant="outline" theme="primary" @click="showWarnMessage">
      {{ t('common.buttons.warning_notification') }}
    </t-button>
    <t-button block size="large" variant="outline" theme="primary" @click="showErrorMessage">
      {{ t('common.buttons.error_notification') }}
    </t-button>
  </div>
</template>
