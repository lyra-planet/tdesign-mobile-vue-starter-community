<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <t-textarea
    v-model="value" class="textarea-publish" name="添加描述" label="添加描述" placeholder="分享你此刻的想法" :maxlength="500"
    indicator
  />
</template>

<style lang="scss" scoped>
.textarea-publish {
  height: 132px;
}
</style>
