<script lang="ts" setup>
import { Icon as TIcon } from 'tdesign-icons-vue-next'

defineOptions({
  name: 'Layout',
})
</script>

<template>
  <t-navbar :fixed="false" left-arrow>
    -->
    <template #right>
      <div class="icon-wrapper">
        <TIcon name="ellipsis" size="18px" />
        <div class="divider" />
        <TIcon name="ellipsis" size="16px" />
      </div>
    </template>
  </t-navbar>

  <router-view />
</template>

<style lang="less" scoped>
.t-navbar {
  margin-bottom: 4px;
}

.custom-title {
  margin-left: 12px;
  font-size: 18px;
  font-weight: 600;
}

.t-icon-home {
  margin-right: 8px;
}

.icon-wrapper {
  width: 87px;
  height: 32px;
  border-radius: 16px;
  opacity: 1;
  border: 0.5px solid #e7e7e7;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-right: 12px;
}

.divider {
  width: 1px;
  height: 20px;
  opacity: 1;
  background-color: #e7e7e7;
}
</style>
