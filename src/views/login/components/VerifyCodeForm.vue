<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import FormContainer from './shared/FormContainer.vue'

const router = useRouter()

const countdown = ref(0)
let countdownTimer: ReturnType<typeof setInterval> | null = null
const verifyCode = ref('')
const codeValid = ref(false)

function validateVerifyCode(value: string) {
  const codeRegex = /^\d{6}$/
  codeValid.value = codeRegex.test(value)
}

watch(
  verifyCode,
  (newValue) => {
    if (newValue) {
      const cleanValue = newValue.replace(/\D/g, '')
      if (cleanValue !== newValue) {
        verifyCode.value = cleanValue
        return
      }
      validateVerifyCode(cleanValue)
    }
    else {
      codeValid.value = false
    }
  },
  { immediate: true },
)

function handleVerify() {
  if (codeValid.value) {
    router.push('/home')
  }
}

function handleResend() {
  if (countdown.value > 0 && countdown.value < 60) {
    return
  }

  countdown.value = 60
  startCountdown()
}

function startCountdown() {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }

  countdownTimer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(countdownTimer!)
      countdownTimer = null
    }
  }, 1000)
}

onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})
</script>

<template>
  <FormContainer
    title="请输入验证码"
    subtitle="验证码已通过短信发送至 +86 138****8888"
  >
    <div class="verify-section">
      <t-input
        v-model="verifyCode"
        placeholder="请输入验证码"
        class="auth-input-container"
        maxlength="6"
      >
        <template #suffix>
          <div class="suffix auth-flex-center">
            <div class="auth-divider auth-divider--24" />
            <div
              class="verify"
              :class="{ 'verify-disabled': countdown > 0 && countdown < 60 }"
              aria-role="button"
              @click="handleResend"
            >
              {{
                countdown > 0 && countdown < 60
                  ? `${countdown}秒后重发`
                  : "发送验证码"
              }}
            </div>
          </div>
        </template>
      </t-input>
    </div>

    <t-button
      size="large"
      theme="primary"
      class="verify-button auth-primary-button"
      :disabled="!codeValid"
      @click="handleVerify"
    >
      登录
    </t-button>
  </FormContainer>
</template>

<style lang="scss" scoped>
.verify {
  text-align: center;
  margin-left: 16px;
  font-family: 'PingFang SC';
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #0052d9;
  cursor: pointer;
  user-select: none;
}

.verify-disabled {
  color: #b5c7ff;
  cursor: not-allowed;
}
.verify-section {
  text-align: center;
  padding: 20px 0;
  margin-top: 24px;
}
</style>
