<script setup lang="ts">
import { ref } from "vue"
import ChatHistory, { type IChatHistoryRef } from "./ChatHistory.vue"
import ChatRecords, { type IChatRecordsRef } from "./ChatRecords.vue"

const chatRecordsRef = ref<IChatRecordsRef>()
const chatHistoryRef = ref<IChatHistoryRef>()
const options = [
  {
    label: "选项1",
    value: "1",
    disabled: false
  }
]
const value = ref("1")

// 选中历史对话聊天
function onSelectChatHistory(id: string, name: string) {
  chatRecordsRef.value && chatRecordsRef.value.onChangeChat(id, name)
}

// 设置聊天title
function onSetChatTitle(id: string, name: string) {
  chatHistoryRef.value && chatHistoryRef.value.setChatTitle(id, name)
}
</script>

<template>
  <el-aside width="268px" class="layout-aside">
    <ChatHistory ref="chatHistoryRef" :onSelectChatHistory="onSelectChatHistory" />
  </el-aside>
  <el-container>
    <el-main class="layout-main">
      <el-select v-model="value" placeholder="Select" style="width: 240px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        />
      </el-select>
      <ChatRecords ref="chatRecordsRef" :onSetChatTitle="onSetChatTitle" />
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
$btn-width-percent-100: 100%;
.layout-aside {
  background-color: var(--el-bg-color);
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.layout-main {
  // background: linear-gradient(180deg, #f5f4f6, #e6ebf7);
  height: 100%;
  // border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
}
</style>
