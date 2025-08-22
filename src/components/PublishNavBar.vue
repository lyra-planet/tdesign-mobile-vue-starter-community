<script lang="ts" setup>
import { Icon as TIcon } from 'tdesign-icons-vue-next'
import router from '@/router'

function handleClick() {
  // 回到主页
  router.back()
}
</script>

<template>
  <t-navbar title="发布动态" left-arrow :title-max-length="5" :fixed="false" @left-click="handleClick">
    <!-- <template #right>
      <div class="custom-capsule border-[0.5px] border-solid border-[#E7E7E7] rounded-full ">
        <TIcon name="chevron-left" size="20px" class="custom-capsule__icon" />
        <t-divider layout="vertical" />
        <TIcon name="home" size="20px" class="custom-capsule__icon" />
      </div>
    </template> -->
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
