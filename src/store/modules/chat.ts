import { ref } from "vue";
import store from "@/store";
import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { chatApi } from "@/api/chat";
import { type ChatRequestData, ChatFetchEventOptions } from "@/api/chat/types/chat";
import { ChatType } from "@/api/conversations/types/conversations";

const pathChatTypeMap: { [key: string]: ChatType } = {
    "/chat": ChatType.GENERAL_CHAT,
    "/AISearch": ChatType.CHAT_WITH_SEARCH,
    "/knowledge": ChatType.CHAT_WITH_RETRIEVAL,
    "/recommend": ChatType.CHAT_WITH_RECOMMEND
};

export const useChatStore = defineStore("chat", () => {
    const chat_type = ref<ChatType>(ChatType.GENERAL_CHAT);
    const conversation_id = ref<string>("");
    const history_len = ref<number>(3);
    const model_name = ref<string>("chatglm3-6b"); // zhipu-api | chatglm3-6b
    const temperature = ref<number>(0.8);
    const prompt_name = ref<string>("llm_chat");

    const userStore = useUserStore();

    // 设置对话类型
    const setChatType = (type: string) => {
        chat_type.value = pathChatTypeMap[type] || ChatType.GENERAL_CHAT;
    };

    const onSelectConversation = (id: string = "") => {
        conversation_id.value = id;
    };

    /** 对话 */
    const chat = async (params: ChatRequestData, chatFetchEventOptions: ChatFetchEventOptions) => {
        chatApi(
            {
                ...params,
                user_id: userStore.username,
                history_len: history_len.value,
                stream: true,
                model_name: model_name.value,
                temperature: temperature.value,
                max_tokens: 1024,
                prompt_name: prompt_name.value
            } as ChatRequestData,
            chatFetchEventOptions
        );
    };

    return {
        chat,
        setChatType,
        onSelectConversation,
        history_len,
        model_name,
        temperature,
        prompt_name,
        chat_type,
        conversation_id
    };
});

/** 在 setup 外使用 */
export function useChatStoreHook() {
    return useChatStore(store);
}
