# DOB Language Support Extension

This extension provides support for files with the `.dob` extension in Visual Studio Code. It activates automatically when a `.dob` file is opened or becomes the active editor.

<img src="Logo.png" alt="DOB Extension Logo" width="100"/>

## Features

- Custom syntax highlighting for `.dob` files
- Custom file icon using your logo
- Status bar indicator when editing `.dob` files
- Hover information when hovering over words in `.dob` files
- Command to display a greeting message

## Project Structure and Workflow

### Core Files and Their Roles

#### Configuration Files
- **package.json**: The extension manifest that defines:
  - Extension metadata (name, version, etc.)
  - Activation events (triggers on `.dob` files)
  - Contributions to VS Code (languages, grammars, commands)
  - Custom file icon configuration
  - Dependencies and build scripts

- **tsconfig.json**: TypeScript configuration for the project
  - Defines how TypeScript files are compiled to JavaScript
  - Specifies compiler options and include/exclude patterns

#### Language Support Files
- **language-configuration.json**: Defines basic editor behavior for `.dob` files
  - Comment toggling (// and /* */)
  - Bracket matching and auto-closing
  - Auto-indentation rules
  - Word pattern definitions

- **syntaxes/dob.tmLanguage.json**: TextMate grammar file that defines syntax highlighting
  - Patterns for comments, strings, keywords, variables, and functions
  - Scope names used for theming
  - Repository of reusable pattern definitions

#### Extension Logic
- **src/extension.ts**: Main TypeScript file containing extension functionality
  - `activate` function runs when a `.dob` file is opened
  - Registers commands, status bar items, and providers
  - Implements hover functionality
  - Manages extension lifecycle

#### Assets
- **Logo.png**: Main logo for the extension
- **icons/dob-file-icon.png**: Custom file icon for `.dob` files

#### Examples
- **example.dob**: Sample file demonstrating the syntax and features

### How It All Works Together

1. **Initialization**:
   - When VS Code starts, it reads `package.json` to identify extensions
   - The `activationEvents` property indicates this extension activates on `.dob` files

2. **Activation Flow**:
   - When a `.dob` file is opened, VS Code activates the extension
   - `extension.ts` is loaded and its `activate` function is called
   - Extension registers UI components and language providers

3. **Editor Experience**:
   - TextMate grammar (`dob.tmLanguage.json`) provides syntax highlighting
   - Language configuration (`language-configuration.json`) handles editing behaviors
   - Custom file icon shows in file explorer and tabs
   - Status bar shows the "DOB" indicator
   - Hover provider shows information when hovering over words

4. **User Interaction**:
   - Status bar item can be clicked to execute the "DOB: Say Hello" command
   - Hover tooltips appear when hovering over words in `.dob` files

### Development Workflow

1. **Making Changes**:
   - Modify TypeScript files in the `src` directory
   - Update grammar or configuration files as needed
   - Add or modify assets in the `icons` directory

2. **Building**:
   - Run `npm run compile` or use the "build" task in VS Code
   - TypeScript files are compiled to JavaScript in the `out` directory

3. **Testing**:
   - Press F5 to launch a new VS Code window with the extension running
   - This development window has an orange status bar
   - Test your extension by opening `.dob` files
   - Debug logs appear in your main VS Code window's Debug Console

4. **Packaging**:
   - Run `vsce package` to create a VSIX file for distribution
   - The VSIX can be installed in regular VS Code instances

## Getting Started

### Prerequisites

- Ensure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository or download the source code.
2. Open the project folder in Visual Studio Code.
3. Install the dependencies by running:
   ```
   npm install
   ```

### Running the Extension

1. Press `F5` to launch the Extension Development Host.
2. Open a folder and create or open a file with the `.dob` extension.
3. The extension will activate, and you can use its features.

### Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

### License

This project is licensed under the MIT License. See the LICENSE file for details.