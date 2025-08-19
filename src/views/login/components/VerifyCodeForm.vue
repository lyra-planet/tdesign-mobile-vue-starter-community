<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { sendVerifyCode, verifyCodeLogin } from '@/api/auth'
import { useUserStore } from '@/store/user'
import { cleanPhoneNumber, validateCode } from '@/utils/validators'
import FormContainer from './shared/FormContainer.vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 从路由参数获取手机号信息
const phoneNumber = ref(route.query.phone as string || '138****8888')
const countryCode = ref(route.query.countryCode as string || '+86')

const countdown = ref(0)
let countdownTimer: ReturnType<typeof setInterval> | null = null
const verifyCode = ref('')
const codeValid = ref(false)

// 加载状态
const isLoading = ref(false)
const errorMessage = ref('')

// 显示的手机号（脱敏处理）
const displayPhone = computed(() => {
  const phone = phoneNumber.value
  if (phone.length === 11) {
    return `${phone.slice(0, 3)}****${phone.slice(-4)}`
  }
  return phone
})

// 监听验证码变化并验证
watch(
  verifyCode,
  (newValue) => {
    // 清除错误信息
    errorMessage.value = ''

    if (newValue) {
      // 清理输入值
      const cleanValue = cleanPhoneNumber(newValue)
      if (cleanValue !== newValue) {
        verifyCode.value = cleanValue
        return
      }
      // 验证验证码
      codeValid.value = validateCode(cleanValue)
    }
    else {
      codeValid.value = false
    }
  },
  { immediate: true },
)

async function handleVerify() {
  if (!codeValid.value || isLoading.value) {
    return
  }

  try {
    isLoading.value = true
    errorMessage.value = ''

    const result = await verifyCodeLogin({
      phone: phoneNumber.value,
      code: verifyCode.value,
      countryCode: countryCode.value,
    })

    if (result.success && result.data) {
      // 保存用户信息到store
      userStore.handleLoginSuccess(result.data.token, result.data.user)
      // 跳转到首页
      router.push('/home')
    }
    else {
      errorMessage.value = result.message
    }
  }
  catch (error) {
    console.log(error)
    errorMessage.value = '网络错误，请稍后重试'
  }
  finally {
    isLoading.value = false
  }
}

async function handleResend() {
  if (countdown.value > 0 && countdown.value < 60) {
    return
  }

  try {
    const result = await sendVerifyCode({
      phone: phoneNumber.value,
      countryCode: countryCode.value,
    })

    if (result.success) {
      countdown.value = result.data?.countdown || 60
      startCountdown()
    }
    else {
      errorMessage.value = result.message
    }
  }
  catch (error) {
    errorMessage.value = '重发失败，请稍后重试'
  }
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
    :subtitle="`验证码已通过短信发送至 ${countryCode} ${displayPhone}`"
  >
    <div class="verify-section">
      <t-input
        v-model="verifyCode"
        placeholder="请输入验证码"
        class="auth-input-container"
        maxlength="6"
        :tips="errorMessage"
        status="error"
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
      :disabled="!codeValid || isLoading"
      :loading="isLoading"
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
