<script lang="ts" setup>
import { Icon as TIcon } from 'tdesign-icons-vue-next'
</script>

<template>
  <t-navbar :fixed="false" class="h-[48px]">
    <template #left>
      <TIcon name="view-list" class="mr-[8px]" size="24px" @click="$router.back()" />
      <t-search class="navbar-search h-[32px]" placeholder="请搜索你想要的内容" shape="round ">
        <template #left-icon>
          <TIcon name="search" size="15px" />
        </template>
      </t-search>
    </template>
  </t-navbar>
</template>

<style lang='scss' scoped>
.t-icon-home {
  margin-right: 8px;
}

.navbar-search {
  --td-search-height: 32px;
  width: 189px !important;
}

:deep(.t-input__keyword) {
  max-width: 140px;
  font-size: 14px;
}
</style>
