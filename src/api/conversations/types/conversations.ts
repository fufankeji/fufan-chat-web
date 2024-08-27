export enum ChatType {
    GENERAL_CHAT = "general_chat",
    CHAT_WITH_RETRIEVAL = "chat_with_retrieval",
    CHAT_WITH_SEARCH = "chat_with_search",
    CHAT_WITH_RECOMMEND = "chat_with_recommend"
}

export interface ConversationsRequestData {
    user_id: string; // 用户ID
    name: string; // 会话名称
    /**
     * 普通对话页面：general_chat
     * 知识库对话页面：chat_with_retrieval
     * AI搜索页面：chat_with_search
     * 推荐系统页面：chat_with_recommend
     */
    chat_type: ChatType; // 会话类型
}

export interface ConversationsResponseData {
    id: string;
}

export interface MessageItem {
    id: string; // 消息ID
    conversation_id: string; // 会话ID
    chat_type: ChatType; // 会话类型
    query: string; // 用户输入
    response: string; // AI回答
    meta_data?: object;
    feedback_souce?: number;
    feedback_reason?: string;
    create_time: string;
    docs?: string[];
    search?: string[];
}

export interface ConversationsConversationsIdMessagesResponseData {
    data: MessageItem[];
}
