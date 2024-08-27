<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import type * as Conversations from "@/api/conversations/types/conversations";
import systemPhoto from "@/assets/layouts/icons8-chatgpt-96.png";
import { EChatType } from "./Enum";
import MdPreview from "@/components/Markdown/MdPreview/index.vue";

export interface IChatRecord {
    role: EChatType;
    message_id: string;
    content: string;
    time: string;
}

export type TChatRecordItem = [IChatRecord, IChatRecord];

interface Props {
    data: Conversations.MessageItem;
}

const userStore = useUserStore();
const props = defineProps<Props>();
</script>

<template>
    <div :class="{ 'chat-record': true, 'chat-question': true }">
        <el-avatar :size="24" :src="userStore.photo">{{ userStore.username?.[0] }} </el-avatar>
        <div class="chat-content">
            <el-text type="info" class="time">{{ props.data.create_time }}</el-text>
            <MdPreview :moduleValue="props.data.query" />
        </div>
    </div>
    <div :class="{ 'chat-record': true, 'chat-question': false }">
        <el-avatar :size="24" :src="systemPhoto">{{ EChatType.SYSTEM }} </el-avatar>
        <div :class="{ 'chat-content': true, 'chat-error': !props.data.response }">
            <el-text type="info" class="time">{{ props.data.create_time }}</el-text>
            <MdPreview :moduleValue="props.data.response" />
        </div>
    </div>
</template>

<style scoped>
.chat-record {
    display: flex;
    gap: 8px;
    margin-top: 24px;

    .chat-content {
        background-color: var(--el-bg-color);
        border-radius: 8px;
        /* padding: 12px 16px; */
        position: relative;
        width: fit-content;
        max-width: 70%;
        word-break: break-all;
        font-size: 14px;

        .time {
            white-space: nowrap;
            position: absolute;
            top: -16px;
            left: 0;
            font-size: 12px;
            display: none;
        }

        &:hover .time {
            display: block;
        }

        pre {
            overflow: hidden;
            white-space: pre-line;
            margin: 0 auto;
        }
    }

    .chat-error {
        color: var(--el-color-danger);
    }
}
.chat-question {
    flex-direction: row-reverse;
    .chat-content {
        .time {
            right: 0;
            left: auto;
        }
    }
}
</style>
