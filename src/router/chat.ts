import { type RouteRecordRaw } from "vue-router";
import { Coin, ChatLineRound, Search } from "@element-plus/icons-vue";

const Layouts = () => import("@/layouts/index.vue");

/**
 * chat业务路由
 * 页面必须设置 Name 属性
 */
export const chatRoutes: RouteRecordRaw[] = [
    // AI Chat
    {
        path: "/",
        component: Layouts,
        redirect: "/chat",
        children: [
            {
                path: "/chat",
                component: () => import("@/views/chat/index.vue"),
                name: "对话",
                props: {
                    icon: ChatLineRound
                }
            },
            {
                path: "/AISearch",
                component: () => import("@/views/AISearchChat/index.vue"),
                name: "AI搜索",
                props: {
                    icon: Search
                }
            },
            {
                path: "/knowledge",
                component: () => import("@/views/knowledge/index.vue"),
                name: "知识库",
                props: {
                    icon: Coin
                }
            }
        ]
    }
];

export default chatRoutes;
