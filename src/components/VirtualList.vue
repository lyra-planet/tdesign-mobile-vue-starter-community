<script setup lang='ts'>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'

interface Props<T = any> {
  items: T[]
  itemHeight: number
  buffer?: number
  itemKey?: string | ((item: T, index: number) => string | number)
  containerStyle?: string | Record<string, string>
  containerClass?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'scroll', event: Event): void }>()

const containerRef = ref<HTMLElement | null>(null)
const scrollTop = ref(0)
const containerHeight = ref(0)

const normalizedBuffer = computed(() => props.buffer ?? 5)
const totalCount = computed(() => props.items?.length ?? 0)

const startIndex = computed(() => Math.max(0, Math.floor(scrollTop.value / props.itemHeight) - normalizedBuffer.value))
const endIndex = computed(() => {
  const end = Math.ceil((scrollTop.value + containerHeight.value) / props.itemHeight) + normalizedBuffer.value - 1
  return Math.min(totalCount.value - 1, Math.max(0, end))
})

const visibleItems = computed(() => props.items.slice(startIndex.value, endIndex.value + 1))
const paddingTop = computed(() => startIndex.value * props.itemHeight)
const paddingBottom = computed(() => Math.max(0, (totalCount.value - endIndex.value - 1) * props.itemHeight))

function onScroll(e: Event) {
  if (containerRef.value)
    scrollTop.value = containerRef.value.scrollTop
  emit('scroll', e)
}

function updateContainerHeight() {
  containerHeight.value = containerRef.value?.clientHeight || window.innerHeight
}

function getKey(item: any, index: number) {
  if (typeof props.itemKey === 'function')
    return props.itemKey(item, index)
  if (typeof props.itemKey === 'string' && item)
    return item[props.itemKey]
  return index
}

onMounted(async () => {
  await nextTick()
  updateContainerHeight()
  window.addEventListener('resize', updateContainerHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateContainerHeight)
})
</script>

<template>
  <div ref="containerRef" class="vl-container" :class="props.containerClass" :style="props.containerStyle" @scroll="onScroll">
    <div :style="{ height: `${paddingTop}px` }" />

    <template v-for="(item, i) in visibleItems" :key="getKey(item, startIndex + i)">
      <slot :item="item" :index="startIndex + i" />
    </template>

    <div :style="{ height: `${paddingBottom}px` }" />
  </div>
</template>

<style scoped lang='scss'>
.vl-container {
  height: 100%;
  overflow-y: auto;
}
</style>
