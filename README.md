# Code Fold

A lightweight way to fold Markdown sections and fenced code blocks right inside Inkdrop’s editor. Adds a fold gutter and commands so you can focus on the parts that matter.

## Usage

- Fold indicators are always visible in the left gutter. Click them to fold or unfold a block.
- Or use the commands and default keybindings below. Commands are available using Telescope by searching for "Code Fold:"

### Default keybindings

### Commands and default keybindings

- <kbd>Ctrl</kbd>+<kbd>M</kbd> <kbd>Ctrl</kbd>+<kbd>L</kbd>: Toggle fold at cursor (`code-fold:toggle-fold`)
- <kbd>Ctrl</kbd>+<kbd>M</kbd> <kbd>Ctrl</kbd>+<kbd>8</kbd>: Fold all (`code-fold:fold-all`)
- <kbd>Ctrl</kbd>+<kbd>M</kbd> <kbd>Ctrl</kbd>+<kbd>9</kbd>: Unfold all (`code-fold:unfold-all`)

Provided for compatibility with v1.x:
- <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd> / <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd>: Fold all (`code-fold:fold-all`)
- <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd> / <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>: Unfold all (`code-fold:unfold-all`)

You can customize or add your own keybindings from Inkdrop's Preferences > Keybindings.

## Changelog

### 2.0.0

- Support Inkdrop v6
- Migrated from CodeMirror v5 to v6
