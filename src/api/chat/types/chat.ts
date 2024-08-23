export interface IMessageData {
    data: string; // ChatResponseData
}

export interface ChatFetchEventOptions {
    onmessage?(data: IMessageData): Promise<void>;
    onerror?(error: string): void;
    onclose?(): void;
}

export interface ChatRequestData {
    query: string; // 问题
    // user_id: string // 登陆用户（user123）
    conversation_id: string; // 会话ID（conv456）
    // conversation_name: string // 会话标题
    // history_len: number // 从数据库中取历史消息的数量（默认5）
    // history: any[] // 前端传来的当前会话的历史消息
    // stream: boolean // 是否采用流式输出
    model_name: string; // 使用的大模型的名称（chatglm3-6b）
    // temperature: number // 大模型的采样温度
    // max_tokens: number // 大模型生成的最大Token数（1024）
    // prompt_name: string // 使用的提示模板的名称（default｜llm_chat）
}

export interface KnowledgeChatRequestData extends ChatRequestData {
    knowledge_base_name?: string; // 知识库名称
}

export type ChatResponseData = ApiResponseData<{
    message_id: string;
    text: string;
}>;
