import { request } from "@/utils/service";
import type * as Users from "./types/users";

/** 获取指定用户的会话列表接口 */
export function usersUserIdConversations(data: { user_id: string }) {
    return request<Users.UsersUserIdConversationsResponseData[]>({
        url: `/api/users/${data.user_id}/conversations`,
        method: "get"
    });
}

/** 注册接口 */
export function usersRegister(userInfo: Users.UsersRegisterRequestData) {
    return request<Users.UsersRegisterResponseData>({
        url: "/api/users/register",
        method: "post",
        data: userInfo
    });
}

/** 登陆接口 */
export function usersLogin(userInfo: Users.UsersLoginRequestData) {
    return request<Users.UsersLoginResponseData>({
        url: "/api/users/login",
        method: "post",
        data: userInfo
    });
}
