<script setup lang='ts'>
defineOptions({
  name: 'Talklist',
})
</script>

<template>
  <div>Ciallo~(∠・ω&lt; )⌒★!</div>
  <t-row>
    <t-col span="8" class="dark">
      first
    </t-col>
    <t-col span="8" class="light">
      second
    </t-col>
    <t-col span="8" class="dark">
      third
    </t-col>
  </t-row>
</template>

<style lang='scss' scoped>
.custom-divider {
  margin: 0px 0;
  --td-divider-color: #ff0000;
  --td-divider-content-line-style: none;
}
</style>
