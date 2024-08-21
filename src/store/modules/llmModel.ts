import { ref } from "vue";
import store from "@/store";
import { defineStore } from "pinia";
import { getLlmModelsApi } from "@/api/llm_model";

export const useLlmModelStore = defineStore("llmModel", () => {
    const llm_models = ref<string[]>([]);
    const model_name = ref<string>("chatglm3-6b"); // zhipu-api | chatglm3-6b

    const getLlmModels = async () => {
        const { data } = await getLlmModelsApi();
        llm_models.value = data.models;
    };

    const setModuleName = (name: string) => {
        model_name.value = name;
    };

    return { getLlmModels, setModuleName, llm_models, model_name };
});

/** 在 setup 外使用 */
export function useLlmModelStoreHook() {
    return useLlmModelStore(store);
}
