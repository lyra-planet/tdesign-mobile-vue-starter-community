<script setup lang='ts'>
import NavBarWithSearch from '@/components/NavBarWithSearch.vue'

defineOptions({
  name: 'Home',
})
</script>

<template>
  <div>
    Header
  </div>
  <div>
    <t-grid :column="2" class="grid-demo">
      <t-grid-item text="标题文字" />
      <t-grid-item text="标题文字" />
      <t-grid-item text="标题文字" />
      <t-grid-item text="标题文字" />
      <t-grid-item text="最多四字" />
    </t-grid>
  </div>
  <div>
    footer
  </div>
  <div>Ciallo~(∠・ω&lt; )⌒★!</div>
</template>

<style lang='scss' scoped></style>
