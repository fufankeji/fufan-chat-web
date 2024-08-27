import { request } from "@/utils/service";
import type * as Conversations from "./types/conversations";

/** 新建会话接口 */
export function conversationsApi(data: Conversations.ConversationsRequestData) {
    return request<Conversations.ConversationsResponseData>({
        url: "/api/conversations",
        method: "post",
        data
    });
}

/** 删除会话接口 */
export function deleteConversationById(conversationId: string) {
    return request({
        url: `/api/conversations/${conversationId}`,
        method: "delete"
    });
}

/** 更新会话名称 */
export function updateConversationName(data: { conversationId: string; name: string }) {
    return request({
        url: `/api/conversations/${data.conversationId}/update_name`,
        method: "put",
        data: {
            name: data.name
        }
    });
}

/** 获取指定会话的消息列表接口 */
export function conversationsConversationsIdMessagesApi(conversations_id: string) {
    return request<Conversations.ConversationsConversationsIdMessagesResponseData>({
        url: `/api/conversations/${conversations_id}/messages`,
        method: "get"
    });
}
