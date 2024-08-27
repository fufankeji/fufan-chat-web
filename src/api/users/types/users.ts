export interface ConversationItem {
    id: string;
    name: string;
    chat_type: string; // 会话类型
    create_time: string;
}

export interface UsersUserIdConversationsResponseData {
    data: ConversationItem[];
}

// 注册接口入参
export interface UsersRegisterRequestData {
    username: string;
    password: string;
}

export interface UsersRegisterResponseData {
    id: string;
    username: string;
}

/**
 * 登陆接口出入参
 */
export interface UsersLoginRequestData {
    username: string;
    password: string;
}

export interface UsersLoginResponseData {
    id: string;
    username: string;
    message: string;
}
