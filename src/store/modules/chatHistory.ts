import { ref } from "vue";
import store from "@/store";
import { defineStore } from "pinia";
import { useUserStore } from "@/store/modules/user";
import { usersUserIdConversations } from "@/api/users";
import { useChatStore } from "@/store/modules/chat";
import type * as Users from "@/api/users/types/users";

export const useChatHistoryStore = defineStore("chatHistory", () => {
    const show_history = ref<boolean>(false);
    const conversations = ref<Users.ConversationItem[]>([]);

    const userStore = useUserStore();
    const chatStore = useChatStore();

    // 获取会话列表
    const getConversations = async () => {
        const res = await usersUserIdConversations({
            user_id: userStore.token,
            chat_type: chatStore.chat_type
        });
        conversations.value = res.data;
    };

    // 设置显示历史记录 & 获取会话列表
    const setShowHistory = async (value: boolean) => {
        show_history.value = value;
        if (!value) return;
        getConversations();
    };

    return { setShowHistory, getConversations, show_history, conversations };
});

/** 在 setup 外使用 */
export function useChatHistoryStoreHook() {
    return useChatHistoryStore(store);
}
