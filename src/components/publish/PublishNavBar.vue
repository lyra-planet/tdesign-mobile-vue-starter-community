<script lang="ts" setup>
import { Icon as TIcon } from 'tdesign-icons-vue-next'
import router from '@/router'

function handleClick() {
  // 回到主页
  router.push('/')
}
</script>

<template>
  <t-navbar title="发布动态" :title-max-length="5" :fixed="false" @left-click="handleClick">
    <template #left>
      <TIcon name="chevron-left" size="24px" />
    </template>
  </t-navbar>
</template>

<style lang="scss" scoped>
.t-icon-close {
  margin: 0 8px;
}

.t-icon-home {
  margin-right: 8px;
}

.custom-capsule {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-capsule__icon {
  flex: 1;
  position: relative;
  margin: 0;
}

.custom-capsule :deep(.t-divider--vertical-center) :deep(.t-divider--vertical) {
  margin: 0;
}
</style>
