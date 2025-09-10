// Props（属性）
// - items: 列表数据（必填）
// - itemSize?: 预估的「单项最小高度」，用于首屏与滚动计算（默认 80）
// - keyField?: 每条数据的唯一键字段名（默认 'id'）
// - bufferPx?: 视口前后额外渲染的缓冲像素，越大越顺滑但渲染更多（默认 200）
// - pageMode?: 是否使用“页面滚动”模式（默认 false；false 表示用自身容器滚动）
// - listClass/itemClass/listTag/itemTag: 透传给 DynamicScroller，用于自定义列表/列表项的类名和标签
// - class/style: 组件外层容器的类名与行内样式
//
// Events（事件）
// - update(startIndex, endIndex, visibleStartIndex?, visibleEndIndex?)
// 可见区域变化时触发：
// - startIndex/endIndex：当前渲染区间（包含缓冲区）
// - visibleStartIndex/visibleEndIndex：真正位于视口内的区间
//
// Slots（插槽）
// - 默认插槽：v-slot="{ item, index }" 用来渲染每一项
<script setup lang='ts'>
import { computed } from 'vue'
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

interface Props<T = any> {
  items: T[]
  itemSize?: number
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
const minItemSize = computed(() => props.itemSize ?? 80)

function onUpdate(startIndex: number, endIndex: number, visibleStartIndex?: number, visibleEndIndex?: number) {
  emit('update', startIndex, endIndex, visibleStartIndex, visibleEndIndex)
}
</script>

<template>
  <DynamicScroller
    v-slot="{ item, index, active }" class="vl-container" :class="props.class" :style="props.style"
    :items="props.items" :min-item-size="minItemSize" :buffer="bufferPx" :key-field="keyField"
    :page-mode="pageMode" :list-class="props.listClass" :item-class="props.itemClass" :list-tag="props.listTag"
    :item-tag="props.itemTag" :emit-update="true" @update="onUpdate"
  >
    <DynamicScrollerItem :item="item" :index="index" :active="active">
      <slot :item="item" :index="index" />
    </DynamicScrollerItem>
  </DynamicScroller>
</template>

<style scoped lang='scss'>
.vl-container {
  height: 100%;
  overflow-y: auto;
}
</style>
