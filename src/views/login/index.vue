<script setup lang='ts'>
import { ref } from 'vue'
import PasswordLoginForm from './components/PasswordLoginForm.vue'
import PhoneLoginForm from './components/PhoneLoginForm.vue'
import VerifyCodeForm from './components/VerifyCodeForm.vue'

defineOptions({
  name: 'Login',
})

// 当前显示的表单类型
const currentForm = ref('phone') // 'phone', 'password', 'verify'

// 处理表单类型切换
function handleSwitchForm(type) {
  currentForm.value = type
}
</script>

<template>
  <div class="login-container">
    <PhoneLoginForm
      v-if="currentForm === 'phone'"
      @switch-to="handleSwitchForm"
    />
    <PasswordLoginForm
      v-else-if="currentForm === 'password'"
      @switch-to="handleSwitchForm"
    />
    <VerifyCodeForm
      v-else-if="currentForm === 'verify'"
      @switch-to="handleSwitchForm"
    />
  </div>
</template>

<style lang='scss' scoped>
.login-container {
  margin-top: 4px;
}
</style>
