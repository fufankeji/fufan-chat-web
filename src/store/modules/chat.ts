import { ref } from "vue";
import store from "@/store";
import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { chatApi } from "@/api/chat";
import { type ChatRequestData, ChatFetchEventOptions } from "@/api/chat/types/chat";

export const useChatStore = defineStore("chat", () => {
    const history_len = ref<number>(3);
    const model_name = ref<string>("chatglm3-6b"); // zhipu-api | chatglm3-6b
    const temperature = ref<number>(0.8);
    const prompt_name = ref<string>("llm_chat");

    const userStore = useUserStore();

    /** 对话 */
    const chat = async (params: ChatRequestData, chatFetchEventOptions: ChatFetchEventOptions) => {
        chatApi(
            {
                ...params,
                user_id: userStore.username,
                history_len: history_len.value,
                stream: true,
                model_name: model_name.value,
                temperature: temperature.value,
                max_tokens: 1024,
                prompt_name: prompt_name.value
            } as ChatRequestData,
            chatFetchEventOptions
        );
    };

    return { chat, history_len, model_name, temperature, prompt_name };
});

/** 在 setup 外使用 */
export function useChatStoreHook() {
    return useChatStore(store);
}
