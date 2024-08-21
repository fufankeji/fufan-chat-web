<template>
    <el-select style="width: 160px" :value="value">
        <el-option v-for="item in options" :label="item.label" :key="item.value" :value="item.value" />
    </el-select>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getLlmModelsApi } from "@/api/llm_model";

interface IOption {
    label: string;
    value: string;
}

const options = ref<IOption[]>([]);
const value = ref("");
// interface Props {
// }
// const props = defineProps<Props>()

onMounted(async () => {
    const data = await getLlmModelsApi();
    options.value = data.models.map((item) => ({ label: item, value: item }));
});
</script>

<style scoped></style>
