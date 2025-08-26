<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import VerifyCodeForm from './components/VerifyCodeForm.vue'

defineOptions({
  name: 'VerifyCodePage',
})
</script>

<template>
  <Navbar />
  <div class="login-container">
    <VerifyCodeForm />
  </div>
</template>

<style lang='scss' scoped>
.login-container {
  margin-top: 4px;
}
</style>
