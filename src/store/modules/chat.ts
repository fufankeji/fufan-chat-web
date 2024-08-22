import { ref } from "vue";
import store from "@/store";
import { defineStore } from "pinia";
// import { useUserStore } from "./user";
import { chatApi } from "@/api/chat";
import { type ChatRequestData, ChatFetchEventOptions } from "@/api/chat/types/chat";
import { ChatType } from "@/api/conversations/types/conversations";
import type * as Conversations from "@/api/conversations/types/conversations";
import { useLlmModelStore } from "@/store/modules/llmModel";
import { conversationsConversationsIdMessagesApi } from "@/api/conversations";

const pathChatTypeMap: { [key: string]: ChatType } = {
    "/chat": ChatType.GENERAL_CHAT,
    "/AISearch": ChatType.CHAT_WITH_SEARCH,
    "/knowledge": ChatType.CHAT_WITH_RETRIEVAL,
    "/recommend": ChatType.CHAT_WITH_RECOMMEND
};

export const useChatStore = defineStore("chat", () => {
    const chat_type = ref<ChatType>(ChatType.GENERAL_CHAT);
    const conversation_id = ref<string>("");
    const chat_history = ref<Conversations.ConversationsConversationsIdMessagesResponseData[]>();

    // const userStore = useUserStore();
    const llmModelStore = useLlmModelStore();

    // 设置对话类型
    const setChatType = (type: string) => {
        chat_type.value = pathChatTypeMap[type] || ChatType.GENERAL_CHAT;
    };

    // 选中会话
    const onSelectConversation = (id: string = "") => {
        conversation_id.value = id;
        if (!id) {
            chat_history.value = [];
            return;
        }
        getChatHistory();
    };

    // 获取聊天历史
    const getChatHistory = async () => {
        const res = await conversationsConversationsIdMessagesApi(conversation_id.value);
        chat_history.value = res;
    };

    // 新增一条聊天记录
    const pushMsg = (chatMsg: Conversations.ConversationsConversationsIdMessagesResponseData) => {
        chat_history.value?.push(chatMsg);
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
        pushMsg,
        chat_type,
        conversation_id,
        chat_history
    };
});

/** 在 setup 外使用 */
export function useChatStoreHook() {
    return useChatStore(store);
}
