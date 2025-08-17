<script setup lang='ts'>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'Login',
})

const router = useRouter()

onMounted(() => {
  router.replace('/login/phone')
})
</script>

<template>
  <div class="login-container">
    <div class="loading">
      正在跳转...
    </div>
  </div>
</template>

<style lang='scss' scoped>
.login-container {
  margin-top: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.loading {
  color: #666;
  font-size: 16px;
}
</style>
