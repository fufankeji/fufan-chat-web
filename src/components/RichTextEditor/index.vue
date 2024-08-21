<template>
    <div id="editor" :class="['quill-editor-ref', props.editorWrap]" ref="quillEditorRef" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import "quill/dist/quill.snow.css";

import Quill from "quill/core";
import Toolbar from "quill/modules/toolbar";
// 设置主题
import Snow from "quill/themes/snow";
import Bold from "quill/formats/bold";
import Italic from "quill/formats/italic";
import Header from "quill/formats/header";
// import Syntax from "quill/modules/syntax"
import Keyboard from "quill/modules/keyboard";

interface Props {
    value?: string;
    onEnter?(value: string): void;
    editorWrap?: string;
    readOnly?: boolean;
    ploherholder?: string;
}

const props = defineProps<Props>();
const quillEditorRef = ref<HTMLDivElement | null>(null);
let quillInstance: Quill | null = null;

Quill.register({
    "modules/toolbar": Toolbar,
    "themes/snow": Snow,
    "formats/bold": Bold,
    "formats/italic": Italic,
    "formats/header": Header,
    // "modules/syntax": Syntax,
    "modules/keyboard": Keyboard
});

function handler() {
    if (!quillInstance) {
        return;
    }
    const inputValue = quillInstance.getText();
    quillInstance.setText("");
    props.onEnter?.(inputValue);
    return false;
}

const bindings = {
    enter: {
        key: "Enter",
        SHORTKEY: false,
        handler: handler
    }
};

onMounted(() => {
    if (!quillEditorRef.value) return;
    quillInstance = new Quill(quillEditorRef.value, {
        theme: "snow",
        modules: {
            // syntax: true,
            toolbar: false,
            keyboard: {
                bindings
            }
        },
        placeholder: props.ploherholder || "请输入...",
        readOnly: props.readOnly
    });

    quillInstance.setText(props.value || "");
});
</script>

<style scoped>
.quill-editor-ref {
    /* min-height: 62px;
  max-height: 206px; */
    height: fit-content;
    border-radius: var(--el-border-radius-base);
    overflow-y: auto;
    background-color: var(--el-bg-color);

    :deep(.ql-editor.ql-blank::before) {
        color: var(--el-text-color-placeholder);
    }
}

.quill-editor-view {
    border: none;
    :deep(.ql-editor) {
        padding: 12px 16px;
    }
}
</style>
