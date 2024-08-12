import { request, requestV1 } from "@/utils/service"
import type * as Users from "./types/users"

/** 获取指定用户的会话列表接口 */
export function usersUserIdConversations(user_id: string) {
  return request<Users.UsersUserIdConversationsResponseData[]>({
    url: `/api/users/${user_id}/conversations`,
    method: "get"
  })
}

/** 注册接口 */
export function usersRegister(userInfo: Users.UsersRegisterRequestData) {
  return requestV1<Users.UsersRegisterResponseData>({
    url: "/api/users/register",
    method: "post",
    params: userInfo
  })
}

/** 登陆接口 */
export function usersLogin(userInfo: Users.UsersLoginRequestData) {
  return requestV1<Users.UsersLoginResponseData>({
    url: "/api/users/login",
    method: "post",
    params: userInfo
  })
}
