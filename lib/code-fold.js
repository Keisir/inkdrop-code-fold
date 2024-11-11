'use babel';

const path = require('node:path');
const app = require('@electron/remote').app;
const modulePath = path.dirname(app.getAppPath()) + '/node_modules/';
require(modulePath + 'codemirror/addon/fold/foldcode.js');
require(modulePath + 'codemirror/addon/fold/foldgutter.js');
require(modulePath + 'codemirror/addon/fold/markdown-fold.js');

const editorLayoutSelector = '.editor-layout';
const pluginInjectedAttribute = 'data-code-fold-plugin-injected';

module.exports = {
    subscription: undefined,
    observer: undefined,

    activate() {
        const editor = inkdrop.getActiveEditor();
        if (editor === undefined) {
            inkdrop.onEditorLoad(this.activateEditor.bind(this));
        } else {
            this.activateEditor(editor);
        }
        this.watchEditor();

        this.subscription = inkdrop.commands.add(document.body, {
            'code-fold:fold-all': () => this.foldAll(),
            'code-fold:unfold-all': () => this.unfoldAll()
        });
    },

    deactivate() {
        const editor = inkdrop.getActiveEditor();
        if (editor && editor.cm && this.originalGutters) {
            editor.cm.setOption('gutters', this.originalGutters);
        }
        if (this.observer) {
            this.observer.disconnect();
        }
        this.subscription.dispose();
    },

    watchEditor() {
        const targetNode = document.querySelector(editorLayoutSelector);
        const config = { attributes: false, childList: true, subtree: false };
        this.observer = new MutationObserver((mutationList, observer) => {
            for (const mutation of mutationList) {
                if (mutation.type === 'childList') {
                    this.activateEditor(inkdrop.getActiveEditor());
                }
            }
        });
        this.observer.observe(targetNode, config);
    },

    activateEditor(editor) {
        if (editor == null) {
            return;
        }

        if (editor.cm.getOption(pluginInjectedAttribute)) {
            return;
        }
        editor.cm.setOption(pluginInjectedAttribute, true);

        this.addGutters(editor);
    },

    addGutters(editor) {
        editor.cm.setOption('foldGutter', true);
        this.originalGutters = editor.cm.getOption('gutters');
        editor.cm.setOption('gutters', this.originalGutters.concat(['CodeMirror-foldgutter']));
    },

    foldAll() {
        const editor = inkdrop.getActiveEditor();
        editor.cm.execCommand('foldAll');
    },

    unfoldAll() {
        const editor = inkdrop.getActiveEditor();
        editor.cm.execCommand('unfoldAll');
    }
};
