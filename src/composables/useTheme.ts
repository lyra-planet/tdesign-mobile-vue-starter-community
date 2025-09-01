import { onMounted } from 'vue'

export function useTheme() {
  // 初始化主题模式
  function initTheme() {
    if (localStorage.getItem('theme-mode') === 'dark') {
      document.documentElement.setAttribute('theme-mode', 'dark')
    }
    else {
      document.documentElement.setAttribute('theme-mode', 'light')
    }
  }

  // 切换主题模式
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('theme-mode')
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('theme-mode', newTheme)
    localStorage.setItem('theme-mode', newTheme)
  }

  // 获取当前主题
  function getCurrentTheme(): string {
    return document.documentElement.getAttribute('theme-mode') || 'light'
  }

  // 组件挂载时初始化主题
  onMounted(() => {
    initTheme()
  })

  return {
    initTheme,
    toggleTheme,
    getCurrentTheme,
  }
}
