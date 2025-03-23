'use babel';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/markdown-fold.js';

const editorLayoutSelector = '.editor-layout';
const pluginInjectedAttribute = 'data-code-fold-plugin-injected';

class CodeFoldPlugin {
    subscription = undefined;
    observer = undefined;

    activate = () => {
        const editor = inkdrop.getActiveEditor();
        if (editor === undefined) {
            inkdrop.onEditorLoad(this.activateEditor.bind(this));
        } else {
            this.activateEditor(editor);
        }
        this.watchEditor();

        this.subscription = inkdrop.commands.add(document.body, {
            'code-fold:fold-all': () => this.foldAll(),
            'code-fold:unfold-all': () => this.unfoldAll(),
            'code-fold:toggle': () => this.toggleFold(),
            'code-fold:fold': () => this.fold(),
            'code-fold:unfold': () => this.unfold()
        });
    };

    deactivate = () => {
        const editor = inkdrop.getActiveEditor();
        if (editor && editor.cm && this.originalGutters) {
            editor.cm.setOption('gutters', this.originalGutters);
        }
        if (this.observer) {
            this.observer.disconnect();
        }
        this.subscription.dispose();
    };

    watchEditor = () => {
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
    };

    activateEditor = (editor) => {
        if (editor == null) {
            return;
        }

        if (editor.cm.getOption(pluginInjectedAttribute)) {
            return;
        }
        editor.cm.setOption(pluginInjectedAttribute, true);

        this.addGutters(editor);
    };

    addGutters = (editor) => {
        editor.cm.setOption('foldGutter', true);
        this.originalGutters = editor.cm.getOption('gutters');
        editor.cm.setOption('gutters', this.originalGutters.concat(['CodeMirror-foldgutter']));
    };

    foldAll = () => {
        const editor = inkdrop.getActiveEditor();
        editor.cm.execCommand('foldAll');
    };

    unfoldAll = () => {
        const editor = inkdrop.getActiveEditor();
        editor.cm.execCommand('unfoldAll');
    };

    toggleFold = () => {
        const editor = inkdrop.getActiveEditor();
        editor.cm.execCommand('toggleFold');
    };

    fold = () => {
        const editor = inkdrop.getActiveEditor();
        editor.cm.execCommand('fold');
    };

    unfold = () => {
        const editor = inkdrop.getActiveEditor();
        editor.cm.execCommand('unfold');
    };
}

const plugin = new CodeFoldPlugin();

module.exports = {
    config: {},
    activate() {
        plugin.activate();
    },
    deactivate() {
        plugin.deactivate();
    }
};
