import { ref } from "vue";
import store from "@/store";
import { defineStore } from "pinia";
import { useTagsViewStore } from "./tags-view";
import { useSettingsStore } from "./settings";
import { getToken, removeToken, setToken } from "@/utils/cache/cookies";
import { resetRouter } from "@/router";
// import { loginApi, getUserInfoApi } from "@/api/login"
// import { type LoginRequestData } from "@/api/login/types/login"
import { usersLogin, usersRegister } from "@/api/users";
import { type UsersLoginRequestData, UsersRegisterRequestData } from "@/api/users/types/users";
import routeSettings from "@/config/route";

export const useUserStore = defineStore("user", () => {
    const token = ref<string>(getToken() || "");
    const roles = ref<string[]>([]);
    const username = ref<string>("");
    const photo = ref<string>("https://sfile.chatglm.cn/activeimg/bdms/66135a5a1bfb5b0037b2bd52");

    const tagsViewStore = useTagsViewStore();
    const settingsStore = useSettingsStore();

    /** 登录 */
    // const login = async ({ username, password, code }: LoginRequestData) => {
    //   const { data } = await loginApi({ username, password, code })
    //   setToken(data.token)
    //   token.value = data.token
    // }

    // 登录
    const login = async (userInfo: UsersLoginRequestData) => {
        const data = await usersLogin(userInfo);
        username.value = data.username;
        setToken(data.id);
    };

    const register = async ({ username, password }: UsersRegisterRequestData) => {
        const data = await usersRegister({ username, password });
        setToken(data.id);
        token.value = data.id;
    };

    /** 获取用户详情 */
    const getInfo = async () => {
        // const { data } = await getUserInfoApi()
        // username.value = data.username
        // photo.value = data.photo
        // // 验证返回的 roles 是否为一个非空数组，否则塞入一个没有任何作用的默认角色，防止路由守卫逻辑进入无限循环
        // roles.value = data.roles?.length > 0 ? data.roles : routeSettings.defaultRoles
        roles.value = routeSettings.defaultRoles;
    };
    /** 模拟角色变化 */
    const changeRoles = async (role: string) => {
        const newToken = "token-" + role;
        token.value = newToken;
        setToken(newToken);
        // 用刷新页面代替重新登录
        window.location.reload();
    };
    /** 登出 */
    const logout = () => {
        removeToken();
        token.value = "";
        roles.value = [];
        resetRouter();
        _resetTagsView();
    };
    /** 重置 Token */
    const resetToken = () => {
        removeToken();
        token.value = "";
        roles.value = [];
    };
    /** 重置 Visited Views 和 Cached Views */
    const _resetTagsView = () => {
        if (!settingsStore.cacheTagsView) {
            tagsViewStore.delAllVisitedViews();
            tagsViewStore.delAllCachedViews();
        }
    };

    return { token, roles, username, photo, login, getInfo, register, changeRoles, logout, resetToken };
});

/** 在 setup 外使用 */
export function useUserStoreHook() {
    return useUserStore(store);
}
