<template>
    <el-select style="width: 160px" v-model="llmModelStore.model_name">
        <el-option v-for="item in llmModelStore.llm_models" :label="item" :key="item" :value="item" />
    </el-select>
</template>

<script setup lang="ts">
import { useLlmModelStore } from "@/store/modules/llmModel";

const llmModelStore = useLlmModelStore();
</script>

<style scoped></style>
