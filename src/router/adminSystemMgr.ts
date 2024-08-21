import { type RouteRecordRaw } from "vue-router";

const Layouts = () => import("@/layouts/index.vue");

/**
 * 原管理系统业务路由
 * 页面必须设置 Name 属性
 */
export const adminSystemMgrRoutes: RouteRecordRaw[] = [
    {
        path: "/dashboard",
        component: Layouts,
        // redirect: "/dashboard",
        children: [
            {
                path: "dashboard",
                component: () => import("@/views/dashboard/index.vue"),
                name: "Dashboard",
                meta: {
                    title: "首页",
                    svgIcon: "dashboard",
                    affix: true
                }
            }
        ]
    },
    {
        path: "/unocss",
        component: Layouts,
        redirect: "/unocss/index",
        children: [
            {
                path: "index",
                component: () => import("@/views/unocss/index.vue"),
                name: "UnoCSS",
                meta: {
                    title: "UnoCSS",
                    svgIcon: "unocss"
                }
            }
        ]
    },
    {
        path: "/link",
        meta: {
            title: "外链",
            svgIcon: "link"
        },
        children: [
            {
                path: "https://juejin.cn/post/7089377403717287972",
                component: () => {},
                name: "Link1",
                meta: {
                    title: "中文文档"
                }
            },
            {
                path: "https://juejin.cn/column/7207659644487139387",
                component: () => {},
                name: "Link2",
                meta: {
                    title: "新手教程"
                }
            }
        ]
    },
    {
        path: "/table",
        component: Layouts,
        redirect: "/table/element-plus",
        name: "Table",
        meta: {
            title: "表格",
            elIcon: "Grid"
        },
        children: [
            {
                path: "element-plus",
                component: () => import("@/views/table/element-plus/index.vue"),
                name: "ElementPlus",
                meta: {
                    title: "Element Plus",
                    keepAlive: true
                }
            },
            {
                path: "vxe-table",
                component: () => import("@/views/table/vxe-table/index.vue"),
                name: "VxeTable",
                meta: {
                    title: "Vxe Table",
                    keepAlive: true
                }
            }
        ]
    },
    {
        path: "/menu",
        component: Layouts,
        redirect: "/menu/menu1",
        name: "Menu",
        meta: {
            title: "多级路由",
            svgIcon: "menu"
        },
        children: [
            {
                path: "menu1",
                component: () => import("@/views/menu/menu1/index.vue"),
                redirect: "/menu/menu1/menu1-1",
                name: "Menu1",
                meta: {
                    title: "menu1"
                },
                children: [
                    {
                        path: "menu1-1",
                        component: () => import("@/views/menu/menu1/menu1-1/index.vue"),
                        name: "Menu1-1",
                        meta: {
                            title: "menu1-1",
                            keepAlive: true
                        }
                    },
                    {
                        path: "menu1-2",
                        component: () => import("@/views/menu/menu1/menu1-2/index.vue"),
                        redirect: "/menu/menu1/menu1-2/menu1-2-1",
                        name: "Menu1-2",
                        meta: {
                            title: "menu1-2"
                        },
                        children: [
                            {
                                path: "menu1-2-1",
                                component: () => import("@/views/menu/menu1/menu1-2/menu1-2-1/index.vue"),
                                name: "Menu1-2-1",
                                meta: {
                                    title: "menu1-2-1",
                                    keepAlive: true
                                }
                            },
                            {
                                path: "menu1-2-2",
                                component: () => import("@/views/menu/menu1/menu1-2/menu1-2-2/index.vue"),
                                name: "Menu1-2-2",
                                meta: {
                                    title: "menu1-2-2",
                                    keepAlive: true
                                }
                            }
                        ]
                    },
                    {
                        path: "menu1-3",
                        component: () => import("@/views/menu/menu1/menu1-3/index.vue"),
                        name: "Menu1-3",
                        meta: {
                            title: "menu1-3",
                            keepAlive: true
                        }
                    }
                ]
            },
            {
                path: "menu2",
                component: () => import("@/views/menu/menu2/index.vue"),
                name: "Menu2",
                meta: {
                    title: "menu2",
                    keepAlive: true
                }
            }
        ]
    },
    {
        path: "/hook-demo",
        component: Layouts,
        redirect: "/hook-demo/use-fetch-select",
        name: "HookDemo",
        meta: {
            title: "Hook",
            elIcon: "Menu",
            alwaysShow: true
        },
        children: [
            {
                path: "use-fetch-select",
                component: () => import("@/views/hook-demo/use-fetch-select.vue"),
                name: "UseFetchSelect",
                meta: {
                    title: "useFetchSelect"
                }
            },
            {
                path: "use-fullscreen-loading",
                component: () => import("@/views/hook-demo/use-fullscreen-loading.vue"),
                name: "UseFullscreenLoading",
                meta: {
                    title: "useFullscreenLoading"
                }
            },
            {
                path: "use-watermark",
                component: () => import("@/views/hook-demo/use-watermark.vue"),
                name: "UseWatermark",
                meta: {
                    title: "useWatermark"
                }
            }
        ]
    }
];

export default adminSystemMgrRoutes;
