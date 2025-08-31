<script setup lang='ts'>
import { useI18n } from 'vue-i18n'

defineOptions({
  name: '403',
})

const { t } = useI18n()
</script>

<template>
  <div class="error-page">
    <h3>{{ t('common.error.403_title') }}</h3>
    <p>{{ t('common.error.403_message') }}</p>
  </div>
</template>

<style lang='scss' scoped>

</style>
