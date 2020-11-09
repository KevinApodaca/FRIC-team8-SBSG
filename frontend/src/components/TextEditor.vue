<template>
  <editor
    :value="editorText"
    :options="editorOptions"
    :html="editorHtml"
    :visible="editorVisible"
    height="200px"
    initialEditType="wysiwyg"/>
</template>

<script>
import 'tui-editor/dist/tui-editor.css'
import 'tui-editor/dist/tui-editor-contents.css'
import 'codemirror/lib/codemirror.css'
import 'highlight.js/styles/github.css'
import { Editor } from '@toast-ui/vue-editor'

export default {
  name: 'TextEditor',
  data () {
    return {
      editorText: '',
      editorOptions: {
        hideModeSwitch: true,
        minHeight: '200px',
        language: 'en_US',
        useCommandShortcut: true,
        useDefaultHTMLSanitizer: true,
        usageStatistics: true,
        toolbarItems: [
          'heading', 'bold', 'italic', 'strike', 'divider', 'ul', 'ol', 'task',
          'divider', 'table', 'image', 'link', 'divider', 'hr', 'quote', 'indent',
          'outdent', 'divider', 'code', 'codeblock'
        ]
      },
      editorHtml: '',
      editorVisible: true
    }
  },
  components: {
    editor: Editor
  }
}
</script>
