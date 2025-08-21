<script setup lang='ts'>
import { useUserStore } from '@/store/user'

defineOptions({
  name: 'Home',
})
const userStore = useUserStore()
onMounted(() => {
  console.warn(userStore.userInfo)
})
</script>

<template>
  <div>Ciallo~(∠・ω&lt; )⌒★!</div>
</template>

<style lang='scss' scoped>

</style>
