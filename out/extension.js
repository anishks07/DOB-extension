"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// src/extension.ts
const vscode = __importStar(require("vscode"));
/**
 * This function is called when the extension is activated.
 * Activation happens based on the events listed in package.json,
 * in this case, when a .dob file is opened or focused.
 * @param context The extension context provided by the environment.
 */
function activate(context) {
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
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(editor => {
        updateStatusBar(editor, dobStatusBarItem);
    }));
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
exports.activate = activate;
/**
 * Helper function to update the status bar visibility based on the active editor
 */
function updateStatusBar(editor, statusBarItem) {
    if (editor && editor.document.languageId === 'dob') {
        statusBarItem.show();
    }
    else {
        statusBarItem.hide();
    }
}
/**
 * This function is called when the extension is deactivated.
 * Deactivation can happen when the environment closes or if the extension is manually disabled.
 */
function deactivate() {
    console.log('Extension "dob-extension" is deactivated.');
}
exports.deactivate = deactivate;
