<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue"
import { useRoute } from "vue-router"
import { Expand, Fold } from "@element-plus/icons-vue"
import RightDrawer from "./components/RightDrawer/index.vue"
import ChatParams from "./components/RightDrawer/ChatParams.vue"
import { usePermissionStore } from "@/store/modules/permission"

const activeIndex = ref<string>("")
const collapse = ref<boolean>(true)
const route = useRoute()
const permissionStore = usePermissionStore()
const routes = computed(() => {
  const chatRoute = permissionStore.routes.find((item) => {
    if (!item.meta?.hidden && item.redirect === "/chat") {
      return true
    }
  })
  return chatRoute?.children || []
})

onMounted(() => {
  setActiveIndex()
})

watch(
  () => route.path,
  () => {
    setActiveIndex()
  }
)

function setActiveIndex() {
  activeIndex.value = route.path
}
</script>

<template>
  <el-container class="app-chat-container">
    <el-menu :collapse="collapse" :default-active="activeIndex" router class="menu">
      <el-scrollbar>
        <el-menu-item v-for="route in routes" :key="route.path" :index="route.path">
          <el-icon><component :is="(route.props as any)?.icon" /></el-icon>
          <template #title>{{ route.name }}</template>
        </el-menu-item>
      </el-scrollbar>
      <el-divider class="divider" />
      <el-button :icon="collapse ? Expand : Fold" @click="collapse = !collapse" class="expand-btn" plain />
    </el-menu>
    <!-- component slot -->
    <RightDrawer>
      <ChatParams />
    </RightDrawer>
    <router-view />
  </el-container>
</template>

<style lang="scss" scoped>
$btn-width-percent-100: 100%;

.app-chat-container {
  width: 100%;
  height: 100vh;

  .menu {
    text-align: center;
    display: flex;
    flex-direction: column;
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
</style>
