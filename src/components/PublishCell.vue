<script lang="ts" setup>
import { LocationIcon } from 'tdesign-icons-vue-next'

import { h } from 'vue'

const locationIcon = () => h(LocationIcon, { size: '24px', class: 't-icon-location' })
</script>

<template>
  <t-cell-group bordered>
    <t-cell title="所在位置" class="cell text-[100px]" :left-icon="locationIcon" arrow hover />
  </t-cell-group>
</template>

<style lang="scss" scoped>
</style>
