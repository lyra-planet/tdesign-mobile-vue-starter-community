import type { RouterHistory } from 'vue-router'
import { createWebHashHistory, createWebHistory } from 'vue-router'

function getRouterMode(mode: string): RouterHistory {
  return mode === 'hash' ? createWebHashHistory('') : createWebHistory('')
}

export {
  getRouterMode,
}
