import { onMounted, onUnmounted, ref } from 'vue'

export function useTime() {
  const currentTime = ref('')
  let timeInterval: NodeJS.Timeout | null = null

  // 更新时间函数
  function updateTime() {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    currentTime.value = `${hours}:${minutes}`
  }

  // 开始时间更新
  function startTimeUpdate() {
    updateTime()
    timeInterval = setInterval(updateTime, 1000)
  }

  // 停止时间更新
  function stopTimeUpdate() {
    if (timeInterval) {
      clearInterval(timeInterval)
      timeInterval = null
    }
  }

  // 组件挂载时开始更新时间
  onMounted(() => {
    startTimeUpdate()
  })

  // 组件卸载时清除定时器
  onUnmounted(() => {
    stopTimeUpdate()
  })

  return {
    currentTime,
    updateTime,
    startTimeUpdate,
    stopTimeUpdate,
  }
}
