import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLayoutStore = defineStore('layout', () => {
  const count = ref(0)

  const ADD_COUNT = () => {
    count.value++
  }

  return {
    count,
    ADD_COUNT,
  }
})

export const useLayoutStoreHook = () => useLayoutStore()
