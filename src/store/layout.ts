import type { layoutType } from './types'

import { defineStore } from 'pinia'
import { store } from './index'

const useLayoutStore = defineStore('tmv-layout', {
  state: (): layoutType => ({
    count: 0,
  }),
  actions: {
    ADD_COUNT() {
      this.count++
    },
  },
})

export function useLayoutStoreHook() {
  // 此处放一些使用 store 的额外操作
  // ...
  return useLayoutStore(store)
}
