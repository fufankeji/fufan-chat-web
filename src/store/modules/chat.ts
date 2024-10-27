import { ref } from "vue";
import store from "@/store";
import { defineStore } from "pinia";
// import { useUserStore } from "./user";
import { chatApi, chatAISearchApi, chatKnowledgeApi } from "@/api/chat";
import { type ChatRequestData, IMessageData, KnowledgeChatRequestData } from "@/api/chat/types/chat";
import { ChatType } from "@/api/conversations/types/conversations";
import type * as Conversations from "@/api/conversations/types/conversations";
import { useLlmModelStore } from "@/store/modules/llmModel";
import { conversationsConversationsIdMessagesApi } from "@/api/conversations";
import { useChatHistoryStore } from "@/store/modules/chatHistory";

const pathChatTypeMap: { [key: string]: ChatType } = {
    "/chat": ChatType.GENERAL_CHAT,
    "/AISearch": ChatType.CHAT_WITH_SEARCH,
    "/knowledge": ChatType.CHAT_WITH_RETRIEVAL,
    "/recommend": ChatType.CHAT_WITH_RECOMMEND
};

type TOnScrollBottom = () => void;

export const useChatStore = defineStore("chat", () => {
    const chat_type = ref<ChatType>(ChatType.GENERAL_CHAT);
    const conversation_id = ref<string>("");
    const chat_history = ref<Conversations.MessageItem[]>([]);
    const onScrollBottom = ref<TOnScrollBottom>();

    const chatHistoryStore = useChatHistoryStore();
    const llmModelStore = useLlmModelStore();

    // 设置对话类型
    const setChatType = (type: string) => {
        chat_type.value = pathChatTypeMap[type] || ChatType.GENERAL_CHAT;
        chatHistoryStore.getConversations();
        onSelectConversation();
    };

    // 选中会话
    const onSelectConversation = (id: string = "") => {
        conversation_id.value = id;
        if (!id) {
            chat_history.value = [];
            return;
        }
        // getChatHistory();
    };

    // 设置滚动函数
    const setOnScrollBottom = (fn: TOnScrollBottom) => {
        onScrollBottom.value = fn;
    };

    // 获取聊天历史
    const getChatHistory = async () => {
        const res = await conversationsConversationsIdMessagesApi(conversation_id.value);
        chat_history.value = res.data;
    };

    // 新增一条聊天记录
    const pushMsg = (query: string) => {
        const chatMsg: Conversations.MessageItem = {
            id: "", // 消息ID
            conversation_id: conversation_id.value, // 会话ID
            chat_type: chat_type.value, // 会话类型
            query, // 用户输入
            response: "", // AI回答
            create_time: ""
        };
        chat_history.value?.push(chatMsg);
        onScrollBottom.value?.();
    };

    const chatOnmessage = async (data: IMessageData) => {
        const res = JSON.parse(data.data);
        if (!chat_history.value) return;
        chat_history.value.map(async (item) => {
            if (res && (item.id === res?.message_id || item.id === "")) {
                item.id = res.message_id;
                res.text && (item.response += res.text);
                res.docs && (item.docs = res.docs);
                res.search && (item.search = res.search);
            }
        });
        onScrollBottom.value?.();
    };

    /** 对话 */
    const chat = async (params: Pick<ChatRequestData, "query">) => {
        pushMsg(params.query);
        chatApi(
            {
                ...params,
                conversation_id: conversation_id.value,
                model_name: llmModelStore.model_name
            },
            { onmessage: chatOnmessage }
        );
    };

    /** 对话 */
    const chatAISearch = async (params: Pick<ChatRequestData, "query">) => {
        pushMsg(params.query);
        chatAISearchApi(
            {
                ...params,
                conversation_id: conversation_id.value,
                model_name: llmModelStore.model_name
            },
            { onmessage: chatOnmessage }
        );
    };

    /** 对话 */
    const chatKnowledge = async (params: Pick<KnowledgeChatRequestData, "query" | "knowledge_base_name">) => {
        pushMsg(params.query);
        chatKnowledgeApi(
            {
                ...params,
                conversation_id: conversation_id.value,
                model_name: llmModelStore.model_name
            },
            { onmessage: chatOnmessage }
        );
    };

    return {
        chat,
        chatAISearch,
        chatKnowledge,
        setChatType,
        onSelectConversation,
        setOnScrollBottom,
        getChatHistory,
        chat_type,
        conversation_id,
        chat_history
    };
});

/** 在 setup 外使用 */
export function useChatStoreHook() {
    return useChatStore(store);
}
