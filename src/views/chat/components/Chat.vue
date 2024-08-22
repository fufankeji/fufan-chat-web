<script setup lang="ts">
import { ref } from "vue";
import ChatRecords, { type IChatRecordsRef } from "./ChatRecords.vue";

const chatRecordsRef = ref<IChatRecordsRef>();

// 选中历史对话聊天
// function onSelectChatHistory(id: string, name: string) {
//   chatRecordsRef.value && chatRecordsRef.value.onChangeChat(id, name)
// }
</script>

<template>
    <el-container>
        <el-main class="layout-main">
            <ChatRecords ref="chatRecordsRef" />
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
