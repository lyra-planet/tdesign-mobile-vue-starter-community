<script lang="ts" setup>
import { AddIcon } from 'tdesign-icons-vue-next'
import { h } from 'vue'

const iconFunc = () => h(AddIcon, { size: '24px' })

function onClick() {
  console.log('click Fab')
}
</script>

<template>
  <t-fab :icon="iconFunc" text="按钮文字" @click="onClick" />
</template>
