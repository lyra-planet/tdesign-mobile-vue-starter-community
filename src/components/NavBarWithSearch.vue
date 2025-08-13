<script lang="ts" setup>
import { Icon as TIcon } from 'tdesign-icons-vue-next'
</script>

<template>
  <t-navbar :fixed="false" class="py-[8px]">
    <template #left>
      <t-search class="navbar-search h-[32px]" placeholder="请搜索你想要的内容" shape="round ">
        <template #left-icon>
          <TIcon name="search" size="15px" />
        </template>
      </t-search>
    </template>

    <template #right>
      <TIcon name="home" size="24px" />
      <TIcon name="ellipsis" size="24px" />
    </template>
  </t-navbar>
</template>

<style lang='scss' scoped>
.t-icon-home {
  margin-right: 8px;
}
</style>
