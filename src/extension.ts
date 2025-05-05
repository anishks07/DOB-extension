// src/extension.ts
import * as vscode from 'vscode';

/**
 * This function is called when the extension is activated.
 * Activation happens based on the events listed in package.json,
 * in this case, when a .dob file is opened or focused.
 * @param context The extension context provided by the environment.
 */
export function activate(context: vscode.ExtensionContext) {
    // Add a very visible message to show that the extension is activated
    vscode.window.showInformationMessage('DOB Extension is now activated!');
    console.log('Extension "dob-extension" is now active because a .dob file is open!');

    // Register a command to say hello
    let sayHelloDisposable = vscode.commands.registerCommand('dob-extension.sayHello', () => {
        vscode.window.showInformationMessage('Hello from the DOB Extension!');
    });
    context.subscriptions.push(sayHelloDisposable);

    // Create status bar item to indicate when working with .dob files
    const dobStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    dobStatusBarItem.text = "$(file) DOB";
    dobStatusBarItem.tooltip = "Currently editing a .dob file";
    dobStatusBarItem.command = 'dob-extension.sayHello';
    context.subscriptions.push(dobStatusBarItem);

    // Register event to update status bar when active editor changes
    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(editor => {
            updateStatusBar(editor, dobStatusBarItem);
        })
    );

    // Update status bar on activation if there's an active editor
    updateStatusBar(vscode.window.activeTextEditor, dobStatusBarItem);

    // Register a hover provider for .dob files
    const hoverProvider = vscode.languages.registerHoverProvider('dob', {
        provideHover(document, position, token) {
            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);

            if (word) {
                return new vscode.Hover(`You hovered over "${word}" in a .dob file`);
            }
            return null;
        }
    });
    context.subscriptions.push(hoverProvider);
}

/**
 * Helper function to update the status bar visibility based on the active editor
 */
function updateStatusBar(editor: vscode.TextEditor | undefined, statusBarItem: vscode.StatusBarItem): void {
    if (editor && editor.document.languageId === 'dob') {
        statusBarItem.show();
    } else {
        statusBarItem.hide();
    }
}

/**
 * This function is called when the extension is deactivated.
 * Deactivation can happen when the environment closes or if the extension is manually disabled.
 */
export function deactivate() {
    console.log('Extension "dob-extension" is deactivated.');
}