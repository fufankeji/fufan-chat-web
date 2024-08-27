<script setup lang="ts">
import { ref, reactive, nextTick } from "vue";
import { Plus, Edit, Delete } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type * as Users from "@/api/users/types/users";
import { conversationsApi, deleteConversationById, updateConversationName } from "@/api/conversations";
import { useUserStore } from "@/store/modules/user";
import { useChatHistoryStore } from "@/store/modules/chatHistory";
import { useChatStore } from "@/store/modules/chat";

const userStore = useUserStore();
const chatHistoryStore = useChatHistoryStore();
const chatStore = useChatStore();
const historyListUlRef = ref<HTMLDivElement | null>(null);
const hoverId = ref<string>();
const editChatInfo = reactive<Users.ConversationItem>({
    id: "",
    name: "",
    chat_type: "",
    create_time: ""
});
const dialogVisible = ref<boolean>(false);

// 点击聊天历史
function onSelectConversation(id?: string) {
    chatStore.onSelectConversation(id);
    chatStore.getChatHistory();
}

// 滚动到顶部
function onScrollTop() {
    nextTick(() => {
        if (!historyListUlRef.value) {
            return;
        }
        historyListUlRef.value.scrollTop = 0;
    });
}

// 新建对话
async function onCreateNewChat() {
    const res = await conversationsApi({
        user_id: userStore.token,
        name: "新对话",
        chat_type: chatStore.chat_type
    });
    await chatHistoryStore.getConversations();
    chatStore.onSelectConversation(res.id);
    chatStore.getChatHistory();
    onScrollTop();
}

// 删除历史对话
async function onDeleteChatHistory(id: string) {
    await deleteConversationById(id);
    await chatHistoryStore.getConversations();
    ElMessage({
        type: "success",
        message: "删除成功"
    });
    if (chatStore.conversation_id === id) {
        // 若当前选中被删除则默认选中第一项并回到顶部
        chatStore.onSelectConversation();
    }
}

// 删除确认
function onConfirmDeleteChatHistroy(id: string) {
    ElMessageBox.confirm("删除后不可恢复，确认删除该对话吗？", "确认删除", { type: "warning" }).then(() => {
        onDeleteChatHistory(id);
    });
}

// 打开编辑弹框
function onOpenEditChatTitleDialog(chatInfo: Users.ConversationItem) {
    editChatInfo.id = chatInfo.id;
    editChatInfo.name = chatInfo.name;
    dialogVisible.value = true;
}

// 关闭编辑弹框
function onCloseEditChatTitleDialog() {
    editChatInfo.id = "";
    editChatInfo.name = "";
    dialogVisible.value = false;
}

// 保存修改聊天标题
async function onSaveChatTitle() {
    await updateConversationName({
        conversationId: editChatInfo.id,
        name: editChatInfo.name
    });
    await chatHistoryStore.getConversations();
    ElMessage({
        type: "success",
        message: "修改成功"
    });
    onCloseEditChatTitleDialog();
}
</script>

<template>
    <div class="layout-aside-main">
        <div class="history-title">
            <el-text class="history-label">历史记录</el-text>
            <el-icon class="close-icon" @click="() => chatHistoryStore.setShowHistory(!chatHistoryStore.show_history)">
                <CloseBold />
            </el-icon>
        </div>
        <el-button :icon="Plus" class="create-chat-btn" @click="onCreateNewChat">新建对话</el-button>
        <ul class="history-list" ref="historyListUlRef">
            <li
                v-for="item in chatHistoryStore.conversations"
                :key="item.id"
                @mouseenter="hoverId = item.id"
                @mouseleave="hoverId = undefined"
                @click="() => onSelectConversation(item.id)"
                :class="{ active: chatStore.conversation_id === item.id }"
            >
                <span class="chat-title">{{ item.name }}</span>
                <span class="operate" v-show="hoverId === item.id" @click="(e) => e.stopPropagation()">
                    <el-button type="primary" link :icon="Edit" @click="() => onOpenEditChatTitleDialog(item)" />
                    <el-button
                        type="primary"
                        link
                        :icon="Delete"
                        class="delete-btn"
                        :auto-insert-space="false"
                        @click="() => onConfirmDeleteChatHistroy(item.id)"
                    />
                </span>
            </li>
        </ul>
        <el-dialog v-model="dialogVisible" title="编辑" width="30%" :before-close="onCloseEditChatTitleDialog">
            <el-input v-model="editChatInfo.name" />
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="onCloseEditChatTitleDialog">取消</el-button>
                    <el-button type="primary" @click="onSaveChatTitle">确认</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
$btn-width-percent-100: 100%;

.layout-aside-main {
    background-color: #001529;
    border-left: 1px solid rgba($color: #eee, $alpha: 0.3);
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding-top: 16px;

    .history-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        height: 32px;
        color: #fff;

        .history-label {
            color: #fff;
        }

        .close-icon:hover {
            cursor: pointer;
        }
    }

    .create-chat-btn {
        // width: $btn-width-percent-100;
        justify-content: flex-start;
        margin: 12px 8px 0;
    }

    .history-list {
        padding-inline-start: 0;
        flex: 1;
        overflow: auto;
        padding: 0 8px;
        > li {
            display: flex;
            align-items: center;
            padding: 0 16px;
            /* justify-content: center; */
            height: 36px;
            // background-color: var(--el-fill-color-lighter);
            // margin: 8px 0 0;
            /* color: var(--el-color-info); */
            border-radius: 4px;
            font-size: 14px;
            cursor: pointer;
            color: #fff;

            &:hover {
                // background-color: var(--el-color-primary-light-8);
                background-color: #252728;
            }

            &:nth-of-type(1) {
                margin-top: 0;
            }

            .chat-title {
                flex: 1;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .operate {
                margin-left: auto;

                .delete-btn {
                    margin-left: 4px;
                    vertical-align: -0.18em;
                    color: var(--el-color-danger);
                }
            }
        }

        .active {
            // background-color: var(--el-color-primary-light-8);
            background-color: #252728;
        }
    }
}
</style>
