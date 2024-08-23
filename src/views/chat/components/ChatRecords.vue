<script setup lang="ts">
import { ref, nextTick, onMounted } from "vue";
import QuillEditor from "@/components/RichTextEditor/index.vue";
import { useChatStore } from "@/store/modules/chat";
import { conversationsApi } from "@/api/conversations";
import ChatRecord from "./ChatRecord.vue";
import GPTModelSelect from "@/components/GPTModelSelect/index.vue";
import { useUserStore } from "@/store/modules/user";

export interface IChatRecordsRef {
    onChangeChat(id: string, name: string): void;
}

const chatStore = useChatStore();
const userStore = useUserStore();
const chatRecordsRef = ref<HTMLDivElement | null>(null);
const inputValue = ref<string>("");

// 滚动到底部
function onScrollBottom() {
    nextTick(() => {
        if (!chatRecordsRef.value) {
            return;
        }
        chatRecordsRef.value.scrollTop = chatRecordsRef.value.scrollHeight;
    });
}

// 新建对话
async function onCreateNewChat(query?: string) {
    const name = query || "新对话";
    const chat_type = chatStore.chat_type;
    const res = await conversationsApi({ user_id: userStore.token, name, chat_type });
    chatStore.onSelectConversation(res.id);
    // onScrollTop();
}

// 发送消息
async function onSend(val: string) {
    const query = val.trim();
    if (!query) {
        return;
    }
    !chatStore.conversation_id && (await onCreateNewChat(query));
    // 发送接受消息
    try {
        chatStore.chat({ query });
    } catch (err) {
        console.error(err);
    }
}

onMounted(() => {
    onScrollBottom();
});
</script>

<template>
    <div class="main-center">
        <div class="chat-records" ref="chatRecordsRef">
            <ChatRecord v-for="(record, index) in chatStore.chat_history" :key="index" :data="record" />
        </div>
        <div>
            <div class="chat-input-top">
                <el-button class="new-chat">新建对话</el-button>
                <GPTModelSelect />
            </div>
            <QuillEditor class="quill-editor" :value="inputValue" :onEnter="onSend" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main-center {
    width: 998px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    height: 100%;

    .chat-records {
        flex: 1;
        /* padding: 8px; */
        overflow: auto;
        padding: 24px 0;
    }

    .chat-input-top {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        gap: 8px;
    }

    .quill-editor {
        margin-top: auto;
        max-height: 206px;
    }
}
</style>
