import type { FormInstanceFunctions } from 'tdesign-mobile-vue'
import type { FormData, FormVisible, GenderOption, UploadFile } from './types'
import dayjs from 'dayjs'
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { areaList } from './data'

export function useEditHook() {
  const router = useRouter()
  const formRef = ref<FormInstanceFunctions>()

  // 表单数据
  const formData = ref<FormData>({
    username: '',
    gender: '',
    birthday: '',
    address: '',
    bio: '',
    photos: [],
  })

  // 性别选项
  const genderOptions: GenderOption[] = [
    { label: '男', value: '男' },
    { label: '女', value: '女' },
    { label: '保密', value: '保密' },
  ]

  // 选择器状态
  const formVisible = reactive<FormVisible>({
    birthday: false,
    address: false,
  })

  // 地址相关状态
  const provinces = reactive(areaList.map(province => ({
    label: province.label,
    value: province.value,
  })))

  const cities = reactive(areaList[0]?.children?.map(city => ({
    label: city.label,
    value: city.value,
  })) || [])

  const addressColumns = computed(() => [provinces, cities])
  const addressLabel = ref('')

  // 地址级联变化处理
  function onAddressColumnChange(value: any, context: any) {
    const { column, index } = context
    if (column === 0) {
      const selectedProvince = areaList[index]
      cities.splice(0, cities.length, ...(selectedProvince?.children?.map(city => ({
        label: city.label,
        value: city.value,
      })) || []))
    }
  }

  // 日期相关状态
  const defaultBirthday = ref(dayjs().subtract(20, 'year').format('YYYY-MM-DD'))
  const birthdayValue = computed({
    get: () => formData.value.birthday || defaultBirthday.value,
    set: (value: string) => {
      formData.value.birthday = value
    },
  })

  // 事件处理函数
  const handleBack = () => router.back()

  function handleSave() {
    console.log('保存个人信息:', formData.value)
    router.back()
  }

  // 地址选择器确认
  function handleAddressConfirm(val: any, context: any) {
    const { label } = context
    addressLabel.value = label.join(' ')
    formData.value.address = label.join(' ')
    formVisible.address = false
  }

  // 打开选择器
  function handleDatePickerOpen() {
    formVisible.birthday = true
  }

  function handleAddressPickerOpen() {
    formVisible.address = true
  }

  // 自定义上传方法 - 模拟上传成功
  function customRequestMethod(file: File): Promise<{ url: string }> {
    return new Promise((resolve) => {
      // 创建本地预览URL
      const url = URL.createObjectURL(file)
      // 模拟上传延迟
      setTimeout(() => {
        resolve({ url })
      }, 500)
    })
  }

  // 相片上传处理
  function handlePicChange(files: UploadFile[]) {
    console.log('上传文件变化:', files)
    formData.value.photos = files
  }

  return {
    formRef,
    formData,
    genderOptions,
    formVisible,
    provinces,
    cities,
    addressColumns,
    addressLabel,
    birthdayValue,
    handleBack,
    handleSave,
    handleAddressConfirm,
    onAddressColumnChange,
    handleDatePickerOpen,
    handleAddressPickerOpen,
    handlePicChange,
    customRequestMethod,
  }
}
