<script setup lang="ts">
import { ref, nextTick, defineExpose } from "vue"; // onMounted, onBeforeUnmount
import QuillEditor from "@/components/RichTextEditor/index.vue";
import { useChatStore } from "@/store/modules/chat";
import { type ChatRequestData, IMessageData } from "@/api/chat/types/chat";
import { conversationsConversationsIdMessagesApi } from "@/api/conversations";
import type * as Conversations from "@/api/conversations/types/conversations";
import ChatRecord from "./ChatRecord.vue";
import GPTModelSelect from "@/components/GPTModelSelect/index.vue";
import { ElMessage } from "element-plus";
import { conversationsApi } from "@/api/conversations";
import { useUserStore } from "@/store/modules/user";
// import { useLlmModelStore } from "@/store/modules/llmModel";

// interface Props {
//     onSetChatTitle(id: string, name: string): void;
// }

export interface IChatRecordsRef {
    onChangeChat(id: string, name: string): void;
}

const chatStore = useChatStore();
const userStore = useUserStore();
// const llmModelStore = useLlmModelStore();
// const props = defineProps<Props>();
let conversation_id = "";
const chatRecords = ref<Conversations.ConversationsConversationsIdMessagesResponseData[]>([
    {
        id: "string", // 消息ID
        conversation_id: "string", // 会话ID
        chat_type: chatStore.chat_type, // 会话类型
        query: "string", // 用户输入
        response: "[aa](https://baidu.com/)", // AI回答
        meta_data: {},
        feedback_souce: 1,
        feedback_reason: "string",
        create_time: "string"
    }
]);
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
    conversation_id = res.id;
    // historys.value.unshift({
    //     id: res.id,
    //     name,
    //     chat_type,
    //     create_time: ""
    // });
    // onClickChatHistory(res.id, name);
    // onScrollTop();
}

// 发送消息
async function onSend(val: string) {
    if (!conversation_id) {
        ElMessage.warning("请先新建对话");
        await onCreateNewChat(val);
        return;
    }
    const query = val.trim();
    if (!query) {
        return;
    }
    const chatRecord: Conversations.ConversationsConversationsIdMessagesResponseData = {
        id: "", // 消息ID
        conversation_id, // 会话ID
        chat_type: chatStore.chat_type, // 会话类型
        query, // 用户输入
        response: "", // AI回答
        create_time: ""
    };
    chatRecords.value.push(chatRecord);
    // 重新设置会话名称
    // if (chatRecords.value.length === 1) {
    //     props.onSetChatTitle(conversation_id, query);
    // }
    onScrollBottom();
    // 发送接受消息
    try {
        const params = {
            query: val,
            conversation_id
        } as ChatRequestData;
        chatStore.chat(params, {
            onmessage: async (data: IMessageData) => {
                const res = JSON.parse(data.data);
                chatRecords.value.map(async (item) => {
                    if (res && (item.id === res?.message_id || item.id === "") && res.text) {
                        item.response += res.text;
                        item.id = res.message_id;
                    }
                });
                onScrollBottom();
            }
        });
    } catch (err) {
        console.error(err);
    }
}

// 切换聊天&缓存之前的聊天
async function onChangeChat(id: string) {
    if (!id) return;
    conversation_id = id;
    const res = await conversationsConversationsIdMessagesApi(id);
    chatRecords.value = res;
    inputValue.value = "";
    onScrollBottom();
}

// 将内部方法暴露给外部
defineExpose<IChatRecordsRef>({
    onChangeChat
});
</script>

<template>
    <div class="main-center">
        <div class="chat-records" ref="chatRecordsRef">
            <ChatRecord v-for="(record, index) in chatRecords" :key="index" :data="record" />
        </div>
        <div>
            <div class="chat-input-top">
                <el-button class="new-chat">新建对话</el-button>
                <GPTModelSelect />
            </div>
            <QuillEditor
                class="quill-editor"
                ploherholder="Enter发送；Shift+Enter换行"
                :value="inputValue"
                :onEnter="onSend"
            />
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
