<template>
  <div :class="[props.editorWrap]">
    <div id="editor" class="quill-editor" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import "quill/dist/quill.snow.css"

import Quill from "quill/core"
import Toolbar from "quill/modules/toolbar"
// 设置主题
import Snow from "quill/themes/snow"
import Bold from "quill/formats/bold"
import Italic from "quill/formats/italic"
import Header from "quill/formats/header"
// import Syntax from "quill/modules/syntax"
import Keyboard from "quill/modules/keyboard"

interface Props {
  value?: string
  send?(value: string): void
  editorWrap?: string
}

const props = defineProps<Props>()

Quill.register({
  "modules/toolbar": Toolbar,
  "themes/snow": Snow,
  "formats/bold": Bold,
  "formats/italic": Italic,
  "formats/header": Header,
  // "modules/syntax": Syntax,
  "modules/keyboard": Keyboard
})

let quillInstance: Quill | null = null

function handler() {
  if (!quillInstance) {
    return
  }
  const inputValue = quillInstance.getText()
  quillInstance.setText("")
  props.send?.(inputValue)
  return false
}

const bindings = {
  enter: {
    key: "Enter",
    SHORTKEY: false,
    handler: handler
  }
}

onMounted(() => {
  quillInstance = new Quill("#editor", {
    theme: "snow",
    modules: {
      // syntax: true,
      toolbar: false,
      keyboard: {
        bindings
      }
    },
    placeholder: "请输入..."
  })

  quillInstance.setText(props.value || "")
})
</script>

<style scoped>
.quill-editor {
  min-height: 62px;
  max-height: 206px;
  border-radius: var(--el-border-radius-base);
  overflow-y: auto;
  background-color: var(--el-bg-color);
  :deep(.ql-editor.ql-blank::before) {
    color: var(--el-text-color-placeholder);
  }
}
</style>
