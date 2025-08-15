const { foldGutter } = require('@codemirror/language');
const { CompositeDisposable } = require('event-kit');
const { actions } = require('inkdrop');
const commands = require('./commands');

class CodeFoldPlugin {
    constructor() {
        this.disposables = new CompositeDisposable();
        this.foldExtension = [foldGutter()];
    }

    activate() {
        commands.forEach(command => {
            this.disposables.add(command.register());
        });
        inkdrop.store.dispatch(actions.mde.addExtension(this.foldExtension));
    }

    deactivate() {
        this.disposables.dispose();
        inkdrop.store.dispatch(actions.mde.removeExtension(this.foldExtension));
    }
}

module.exports = new CodeFoldPlugin();
