import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"

export const useChatHistoryStore = defineStore("chatHistory", () => {
  const show_history = ref<boolean>(false)

  const setShowHistory = (value: boolean) => {
    console.log(value)

    show_history.value = value
  }

  return { setShowHistory, show_history }
})

/** 在 setup 外使用 */
export function useChatHistoryStoreHook() {
  return useChatHistoryStore(store)
}
