const app = require('electron').remote.app;
const modulePath = app.getAppPath() + '/node_modules/'
require(modulePath + 'codemirror/addon/fold/foldcode.js');
require(modulePath + 'codemirror/addon/fold/foldgutter.js');
require(modulePath + 'codemirror/addon/fold/markdown-fold.js');

module.exports = {

  activate() {
    global.inkdrop.on('editor:init', this.handleEditorInit.bind(this));
  },

  deactivate() {
    const editor = global.inkdrop.getActiveEditor();
    if (editor && editor.codeMirror && this.originalGutters) {
      editor.codeMirror.setOption('gutters', this.originalGutters);
    }
  },

  handleEditorInit(editor) {
    var cm = editor.codeMirror;
    this.originalGutters = cm.getOption('gutters');
    cm.setOption('foldGutter', true);
    cm.setOption('gutters', this.originalGutters.concat(["CodeMirror-foldgutter"]));
  }
};