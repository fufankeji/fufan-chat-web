import { ref } from "vue";
import store from "@/store";
import { defineStore } from "pinia";
import { useUserStore } from "@/store/modules/user";
import { usersUserIdConversations } from "@/api/users";
import type * as Users from "@/api/users/types/users";

export const useChatHistoryStore = defineStore("chatHistory", () => {
    const show_history = ref<boolean>(false);
    const conversations = ref<Users.UsersUserIdConversationsResponseData[]>([]);

    const userStore = useUserStore();

    const setShowHistory = async (value: boolean) => {
        show_history.value = value;
        const res = await usersUserIdConversations(userStore.token);
        conversations.value = res;
    };

    return { setShowHistory, show_history };
});

/** 在 setup 外使用 */
export function useChatHistoryStoreHook() {
    return useChatHistoryStore(store);
}
