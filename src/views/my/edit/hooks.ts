import type { FormInstanceFunctions } from 'tdesign-mobile-vue'
import type { FormData, FormVisible, UploadFile } from './types'
import dayjs from 'dayjs'
import { Toast } from 'tdesign-mobile-vue'
import { computed, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { updateUserInfo } from '@/api/auth'
import { useUserStore } from '@/store/user'
import { useAddressPicker } from '../composables/useAddressPicker'

export function useEditHook() {
  const router = useRouter()
  const formRef = ref<FormInstanceFunctions>()
  const userStore = useUserStore()

  const {
    addressColumns,
    onAddressColumnChange,
  } = useAddressPicker()

  // 表单数据
  const formData = ref<FormData>({
    username: '',
    gender: '',
    birthday: '',
    address: '',
    bio: '',
    photos: [],
  })

  const addressLabel = ref('')

  watch(() => userStore.userInfo, (newUserInfo) => {
    if (newUserInfo) {
      formData.value = {
        username: newUserInfo.name || '',
        gender: newUserInfo.gender || '',
        birthday: newUserInfo.birthday || '',
        address: newUserInfo.address || '',
        bio: newUserInfo.bio || '',
        photos: newUserInfo.photos?.map(url => ({ url })) || [],
      }
      addressLabel.value = newUserInfo.address || ''
    }
  }, { immediate: true })

  // 选择器状态
  const formVisible = reactive<FormVisible>({
    birthday: false,
    address: false,
  })

  // 日期相关状态
  const defaultBirthday = ref(dayjs().subtract(20, 'year').format('YYYY-MM-DD'))
  const birthdayValue = computed({
    get: () => formData.value.birthday || defaultBirthday.value,
    set: (value: string) => {
      formData.value.birthday = value
    },
  })

  // 事件处理函数
  async function handleSave() {
    console.log('保存个人信息:', formData.value)

    if (!userStore.userInfo) {
      Toast.error('用户信息不存在')
      return
    }

    try {
      const updateData = {
        name: formData.value.username,
        gender: formData.value.gender,
        birthday: formData.value.birthday,
        address: formData.value.address,
        location: formData.value.address,
        bio: formData.value.bio,
        photos: formData.value.photos?.map(photo => photo.url || '').filter(Boolean) || [],
      }

      const response = await updateUserInfo(updateData)

      if (response.success) {
        // 同步更新Pinia store中的用户信息
        const updatedUserInfo = {
          ...userStore.userInfo,
          ...updateData,
        }
        userStore.setUserInfo(updatedUserInfo)

        Toast.success('保存成功')
        router.back()
      }
      else {
        Toast.error(response.message || '保存失败')
      }
    }
    catch (error) {
      console.error('保存用户信息失败:', error)
      Toast.error('保存失败，请稍后重试')
    }
  }

  // 地址选择器确认
  function handleAddressConfirm(val: any, context: any) {
    const { label } = context
    const filteredLabels = label.filter(Boolean) // 过滤空值

    addressLabel.value = filteredLabels.join(' ')
    formData.value.address = filteredLabels.join(' ')
    formVisible.address = false
  }

  // 打开选择器
  function handleDatePickerOpen() {
    formVisible.birthday = true
  }

  function handleAddressPickerOpen() {
    formVisible.address = true
  }

  // 相片上传处理
  function handlePicChange(files: UploadFile[]) {
    console.log('上传文件变化:', files)
    formData.value.photos = files
  }

  return {
    formRef,
    formData,
    formVisible,
    addressColumns,
    addressLabel,
    birthdayValue,
    handleSave,
    handleAddressConfirm,
    onAddressColumnChange,
    handleDatePickerOpen,
    handleAddressPickerOpen,
    handlePicChange,
  }
}
