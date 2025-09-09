<script setup lang='ts'>
import { computed } from 'vue'
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

// - items: any[]
// - itemSize: number (必填，固定高度)
// - keyField: string (默认 'id')
// - bufferPx: number (像素，默认 200)
// - pageMode: boolean (默认 false)
// - listClass/itemClass/listTag/itemTag: 透传给 RecycleScroller，自定义样式/标签
// 事件：
// - update(startIndex, endIndex, visibleStartIndex?, visibleEndIndex?)
// 插槽：默认插槽 v-slot="{ item, index }"

interface Props<T = any> {
  items: T[]
  itemSize: number
  keyField?: string
  bufferPx?: number
  pageMode?: boolean
  listClass?: string
  itemClass?: string
  listTag?: string
  itemTag?: string
  class?: string
  style?: string | Record<string, string>
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update', startIndex: number, endIndex: number, visibleStartIndex?: number, visibleEndIndex?: number): void
}>()

const keyField = computed(() => props.keyField ?? 'id')
const bufferPx = computed(() => props.bufferPx ?? 200)
const pageMode = computed(() => props.pageMode ?? false)

function onUpdate(startIndex: number, endIndex: number, visibleStartIndex?: number, visibleEndIndex?: number) {
  emit('update', startIndex, endIndex, visibleStartIndex, visibleEndIndex)
}
</script>

<template>
  <RecycleScroller
    class="vl-container" :class="props.class" :style="props.style" :items="props.items"
    :item-size="props.itemSize" v-slot="{ item, index }" :buffer="bufferPx" :key-field="keyField"
    :page-mode="pageMode" :list-class="props.listClass" :item-class="props.itemClass" :list-tag="props.listTag"
    :item-tag="props.itemTag" :emit-update="true" @update="onUpdate"
  >
    <slot :item="item" :index="index" />
  </RecycleScroller>
</template>

<style scoped lang='scss'>
.vl-container {
  height: 100%;
  overflow-y: auto;
}
</style>
