<script lang="ts" setup>
import { Icon as TIcon } from 'tdesign-icons-vue-next'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
function changeToSearch() {
  // 点击搜索框时跳转到搜索页面
  router.push('/home/search')
}
const { t } = useI18n()
</script>

<template>
  <t-navbar :fixed="false" class="h-[48px]">
    <template #left>
      <TIcon name="view-list" class="mr-[8px]" size="24px" @click="$router.back()" />
      <div class="search-wrapper" @click="changeToSearch()">
        <t-search class="navbar-search h-[32px]" :placeholder="t('common.search.placeholder')" shape="round" readonly>
          <template #left-icon>
            <TIcon name="search" size="15px" />
          </template>
        </t-search>
      </div>
    </template>
  </t-navbar>
</template>

<style lang='scss' scoped>
.t-icon-home {
  margin-right: 8px;
}

.search-wrapper {
  cursor: pointer;
}

.navbar-search {
  --td-search-height: 32px;
  width: 189px !important;
  pointer-events: none;
}

:deep(.t-input__keyword) {
  max-width: 140px;
  font-size: 14px;
}
</style>
