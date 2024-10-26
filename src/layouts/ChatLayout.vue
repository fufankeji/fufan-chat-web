<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
// import { Expand, Fold } from "@element-plus/icons-vue"
import ChatHistory from "@/components/ChatHistory/index.vue";
// import RightDrawer from "./components/RightDrawer/index.vue";
// import ChatParams from "./components/RightDrawer/ChatParams.vue";
import { usePermissionStore } from "@/store/modules/permission";
import { useChatHistoryStore } from "@/store/modules/chatHistory";
import { useLlmModelStore } from "@/store/modules/llmModel";
import { useChatStore } from "@/store/modules/chat";

const activeIndex = ref<string>("");
const collapse = ref<boolean>(false);
const route = useRoute();
const permissionStore = usePermissionStore();
const chatHistoryStore = useChatHistoryStore();
const llmModelStore = useLlmModelStore();
const chatStore = useChatStore();
const routes = computed(() => {
    const chatRoute = permissionStore.routes.find((item) => {
        if (!item.meta?.hidden && item.redirect === "/chat") {
            return true;
        }
    });
    return chatRoute?.children || [];
});

onMounted(() => {
    setActiveIndex();
    chatStore.setChatType(route.path);
    llmModelStore.getLlmModels();
});

watch(
    () => route.path,
    () => {
        setActiveIndex();
        chatStore.setChatType(route.path);
    }
);

function setActiveIndex() {
    activeIndex.value = route.path;
}
</script>

<template>
    <el-container class="app-chat-container">
        <el-aside
            :class="{
                'app-chat-aside': true,
                width240: !chatHistoryStore.show_history,
                width426: chatHistoryStore.show_history
            }"
        >
            <div class="app-chat-aside-left">
                <div class="logo">
                    <img src="/src/assets/img/logo/logo.jpg" height="32px" />
                    <el-tooltip content="历史记录">
                        <el-icon
                            class="history_icon"
                            @click="() => chatHistoryStore.setShowHistory(!chatHistoryStore.show_history)"
                            v-show="!chatHistoryStore.show_history"
                        >
                            <Operation />
                        </el-icon>
                    </el-tooltip>
                </div>
                <el-menu :collapse="collapse" :default-active="activeIndex" router class="menu">
                    <el-menu-item v-for="route in routes" :key="route.path" :index="route.path">
                        <el-icon><component :is="(route.props as any)?.icon" /></el-icon>
                        <template #title>{{ route.name }}</template>
                    </el-menu-item>
                    <!-- <el-divider class="divider" />
          <el-button :icon="collapse ? Expand : Fold" @click="collapse = !collapse" class="expand-btn" plain /> -->
                </el-menu>
            </div>
            <ChatHistory v-show="chatHistoryStore.show_history" />
        </el-aside>
        <!-- component slot -->
        <!-- <RightDrawer>
            <ChatParams />
        </RightDrawer> -->
        <router-view />
    </el-container>
</template>

<style lang="scss" scoped>
$btn-width-percent-100: 100%;

.app-chat-container {
    width: 100%;
    height: 100vh;

    .app-chat-aside {
        // width: 200px;
        display: flex;

        .app-chat-aside-left {
            background-color: #001529;
            width: 240px;
        }

        .logo {
            height: 48px;
            margin: 16px 8px 12px 8px;
            // background: rgba(255, 255, 255, 0.2);
            background-color: rgba(255, 255, 255, 0.4);
            border-radius: 6px;
            color: #fff;
            text-align: left;
            line-height: 48px;
            padding: 0 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .history_icon {
                line-height: 32px;
                font-size: 20px;
                &:hover {
                    cursor: pointer;
                }
            }
        }

        .menu {
            text-align: center;
            display: flex;
            flex-direction: column;
            background-color: #001529;
            border: none;

            :deep(.el-menu-item) {
                height: 40px;
                margin: 4px;
                border-radius: 8px;
                color: rgba($color: #fff, $alpha: 0.65);

                &:hover {
                    background-color: #001529;
                    color: #fff;
                }
            }

            :deep(.el-menu-item.is-active) {
                background-color: #1677ff;
                color: #fff;
            }
        }

        .divider {
            margin: auto auto 12px auto;
        }

        .expand-btn {
            font-size: 20px;
            // margin: auto auto 12px auto;
            margin-bottom: 12px;
            border: none;
        }
    }

    .width240 {
        width: 240px;
    }

    .width426 {
        width: 426px;
    }
}
</style>
