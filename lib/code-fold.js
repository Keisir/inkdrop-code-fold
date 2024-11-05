'use babel';

const path = require('node:path');
const app = require('@electron/remote').app;
const modulePath = path.dirname(app.getAppPath()) + '/node_modules/';
require(modulePath + 'codemirror/addon/fold/foldcode.js');
require(modulePath + 'codemirror/addon/fold/foldgutter.js');
require(modulePath + 'codemirror/addon/fold/markdown-fold.js');

module.exports = {
    editor: undefined,

    activate() {
        const e = global.inkdrop.getActiveEditor();
        if (e === undefined) {
            global.inkdrop.onEditorLoad(this.activateEditor.bind(this));
        } else {
            this.activateEditor(e);
        }

        this.subscription = inkdrop.commands.add(document.body, {
            'code-fold:fold-all': () => this.foldAll(),
            'code-fold:unfold-all': () => this.unfoldAll()
        });
    },

    deactivate() {
        const editor = global.inkdrop.getActiveEditor();
        if (editor && editor.cm && this.originalGutters) {
            editor.cm.setOption('gutters', this.originalGutters);
        }
        this.subscription.dispose();
    },

    activateEditor(editor) {
        this.editor = editor;
        this.addGutters();
    },

    addGutters() {
        this.editor.cm.setOption('foldGutter', true);
        this.originalGutters = this.editor.cm.getOption('gutters');
        this.editor.cm.setOption('gutters', this.originalGutters.concat(['CodeMirror-foldgutter']));
    },

    foldAll() {
        const editor = global.inkdrop.getActiveEditor();
        editor.cm.execCommand('foldAll');
    },

    unfoldAll() {
        const editor = global.inkdrop.getActiveEditor();
        editor.cm.execCommand('unfoldAll');
    }
};
