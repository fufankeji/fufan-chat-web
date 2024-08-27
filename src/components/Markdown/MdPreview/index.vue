<template>
    <div class="md-editor-wrap">
        <MdPreview :editorId="props.editorId" :modelValue="props.moduleValue" />
    </div>
    <!-- <MdCatalog :editorId="id" :scrollElement="scrollElement" /> -->
</template>

<script setup lang="ts">
import { MdPreview } from "md-editor-v3";
// preview.css相比style.css少了编辑器那部分样式
import "md-editor-v3/lib/preview.css";

interface Props {
    editorId?: string;
    moduleValue?: string;
}
const props = defineProps<Props>();
</script>

<style scoped>
.md-editor-wrap {
    border-radius: var(--el-border-radius-base);
    :deep(.md-editor-preview-wrapper) {
        padding: 0 16px;
        background-color: var(--el-bg-color);
    }
    :deep(.md-editor-preview) {
        color: var(--el-text-color-regular);
    }
}
.md-editor {
    border-radius: var(--el-border-radius-base);
    background-color: var(--el-bg-color);
}
</style>
