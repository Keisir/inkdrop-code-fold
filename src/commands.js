const {
    foldCode,
    unfoldCode,
    toggleFold,
    foldAll,
    unfoldAll,
} = require('@codemirror/language');
const { EditorCommand } = require('./editorCommand');

class FoldCodeAction extends EditorCommand {
    constructor() {
        super('fold-code');
    }

    run(editor) {
        return foldCode(editor);
    }
}

class UnfoldCodeAction extends EditorCommand {
    constructor() {
        super('unfold-code');
    }

    run(editor) {
        return unfoldCode(editor);
    }
}

class ToggleFoldCodeAction extends EditorCommand {
    constructor() {
        super('toggle-fold');
    }

    run(editor) {
        return toggleFold(editor);
    }
}

class FoldAllAction extends EditorCommand {
    constructor() {
        super('fold-all');
    }

    run(editor) {
        return foldAll(editor);
    }
}

class UnfoldAllAction extends EditorCommand {
    constructor() {
        super('unfold-all');
    }

    run(editor) {
        return unfoldAll(editor);
    }
}

module.exports = [
    new FoldCodeAction(),
    new UnfoldCodeAction(),
    new ToggleFoldCodeAction(),
    new FoldAllAction(),
    new UnfoldAllAction(),
];
