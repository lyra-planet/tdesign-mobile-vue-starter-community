<script setup lang='ts'>
defineOptions({
  name: 'Notice',
})
</script>

<template>
  <t-sticky>
    <div class="header" />
  </t-sticky>
  <div class="main">
    <div class="talkbox">
      <div class="avatar-demo">
        <div class="talk-list">
          <t-avatar class="avatar-example" image="https://tdesign.gtimg.com/mobile/demos/avatar1.png" />
          <div class="talk-content">
            这是一条短消息
          </div>
        </div>
        <t-divider class="custom-divider" content="今天19:00" align="center" />
        <div class="talk-list">
          <t-avatar class="avatar-example" image="https://tdesign.gtimg.com/mobile/demos/avatar1.png" />
          <div class="talk-content">
            这是一条非常长的消息内容，用来测试消息框是否能够根据文本长度自动调整宽度和高度，最大宽度应该限制在200px
          </div>
        </div>
      </div>
    </div>
  </div>
  <t-divider />
  <div class="bottom">
    <t-input label="" placeholder="请输入" class="inputbox">
      <template #prefixIcon>
        <app-icon />
      </template>
    </t-input>
    <t-button class="send-button">
      发送
    </t-button>
  </div>
</template>

<style lang='scss' scoped>
.main {
  display: flex;
  flex-direction: column;
  height: 80vh;
}

.inputbox {
  background-color: hsl(0, 0%, 90%);
  width: 90%;
  border-radius: 50px;
  border: 1px solid #0a0a0a;
  height: 10px;
}

.header {
  height: 5vh;
  background-color: #fff;
}

.talkbox {
  flex: 1;
  background-color: #ffffff;
}

.talk-content {
  background-color: #dedddd;
  margin-top: 5px;
  margin-left: 10px;
  border-radius: 10px;
  padding: 8px 12px;
  line-height: 1.4;
  font-size: 14px;
  max-width: 200px;
  min-width: 40px;
  width: fit-content;
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
}

.talk-list {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  margin-top: 12px;
}

.bottom {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: #f8f9fa;
  border-top: 1px solid #eee;
}

.send-button {
  margin-left: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 15px;
  padding: 8px 12px;
  cursor: pointer;
}
.custom-divider {
  margin: 0px 0;
  --td-divider-color: #ff0000;
  --td-divider-content-line-style: none;
}
</style>
