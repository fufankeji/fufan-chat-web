<script lang="ts" setup>
// import { ref } from "vue"
// import { useRouter } from "vue-router";
// import { useUserStore } from "@/store/modules/user";
// import { useChatStore } from "@/store/modules/chat";

// const router = useRouter();
// const userStore = useUserStore();
// const chatStore = useChatStore();

// 退出登陆
// function logout() {
//     userStore.logout();
//     router.push("/login");
// }
</script>

<template>
    <div class="chat-prams-container">
        <label>请选择对话模式</label>
        <!-- <el-select model-value="LLM对话">
            <el-option key="LLM对话" label="LLM对话" value="LLM对话" />
        </el-select>
        <label>请选择LLM模型</label>
        <el-select v-model="chatStore.model_name">
            <el-option key="zhipu-api" label="zhipu-api" value="zhipu-api" />
            <el-option key="chatglm3-6b" label="chatglm3-6b" value="chatglm3-6b" />
        </el-select>
        <label>请选择Prompt模版</label>
        <el-select v-model="chatStore.prompt_name">
            <el-option key="default" label="default" value="default" />
            <el-option key="llm_chat" label="llm_chat" value="llm_chat" />
        </el-select>
        <label>Temperature</label>
        <el-slider v-model="chatStore.temperature" :min="0" :max="2.0" :step="0.1" :marks="{ 0: '0', 2.0: '2.0' }" />
        <label>历史对话轮数</label>
        <div>
            <el-input-number v-model="chatStore.history_len" :min="1" :max="10" />
        </div>
        <el-button @click="logout" class="logout-btn">退出登陆</el-button> -->
    </div>
</template>

<style lang="scss" scoped>
$btn-width-percent-100: 100%;

.chat-prams-container {
    font-size: 14px;
    position: relative;
    height: 100%;
    overflow: auto;

    > label {
        display: inline-block;
        margin: 20px 0 8px;

        &::after {
            content: ":";
        }

        &:nth-of-type(1) {
            margin-top: 0;
        }
    }

    .logout-btn {
        width: $btn-width-percent-100;
        margin-top: 24px;
        // position: sticky;
        // bottom: 0;
    }
}
</style>
