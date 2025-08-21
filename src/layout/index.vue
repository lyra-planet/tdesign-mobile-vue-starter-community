<script lang="ts" setup>
import { Icon as TIcon } from 'tdesign-icons-vue-next'

defineOptions({
  name: 'Layout',
})
</script>

<template>
  <t-navbar :fixed="false" left-arrow>
    <template #right>
      <div class="icon-wrapper">
        <TIcon name="ellipsis" size="18px" />
        <div class="divider" />
        <svg
          t="1755629152334"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1484"
          width="16"
          height="16"
        >
          <path
            d="M512 1024C229.233778 1024 0 794.766222 0 512S229.233778 0 512 0s512 229.233778 512 512-229.233778 512-512 512z m0-113.777778c219.932444 0 398.222222-178.289778 398.222222-398.222222S731.932444 113.777778 512 113.777778 113.777778 292.067556 113.777778 512s178.289778 398.222222 398.222222 398.222222z m0-227.555555a170.666667 170.666667 0 1 1 0-341.333334 170.666667 170.666667 0 0 1 0 341.333334z"
            fill="#000000"
            p-id="1485"
          />
        </svg>
      </div>
    </template>
  </t-navbar>

  <router-view />
</template>

<style lang="scss" scoped>
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
