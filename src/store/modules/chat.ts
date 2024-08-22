import { ref } from "vue";
import store from "@/store";
import { defineStore } from "pinia";
// import { useUserStore } from "./user";
import { chatApi } from "@/api/chat";
import { type ChatRequestData, ChatFetchEventOptions } from "@/api/chat/types/chat";
import { ChatType } from "@/api/conversations/types/conversations";
import { useLlmModelStore } from "@/store/modules/llmModel";

const pathChatTypeMap: { [key: string]: ChatType } = {
    "/chat": ChatType.GENERAL_CHAT,
    "/AISearch": ChatType.CHAT_WITH_SEARCH,
    "/knowledge": ChatType.CHAT_WITH_RETRIEVAL,
    "/recommend": ChatType.CHAT_WITH_RECOMMEND
};

export const useChatStore = defineStore("chat", () => {
    const chat_type = ref<ChatType>(ChatType.GENERAL_CHAT);
    const conversation_id = ref<string>("");

    // const userStore = useUserStore();
    const llmModelStore = useLlmModelStore();

    // 设置对话类型
    const setChatType = (type: string) => {
        chat_type.value = pathChatTypeMap[type] || ChatType.GENERAL_CHAT;
    };

    const onSelectConversation = (id: string = "") => {
        conversation_id.value = id;
    };

    /** 对话 */
    const chat = async (
        params: Pick<ChatRequestData, "conversation_id" | "query">,
        chatFetchEventOptions: ChatFetchEventOptions
    ) => {
        chatApi(
            {
                ...params,
                model_name: llmModelStore.model_name
            },
            chatFetchEventOptions
        );
    };

    return {
        chat,
        setChatType,
        onSelectConversation,
        chat_type,
        conversation_id
    };
});

/** 在 setup 外使用 */
export function useChatStoreHook() {
    return useChatStore(store);
}
