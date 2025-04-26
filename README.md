# Pretty Log

A VS Code extension for quickly adding styled console.log statements to your code with distinctive emoji markers. Make your debugging more visual and organized! No more staring into cluttered log output to find variables - use JSON formatting to add proper indentation to your logs. And customize how your console.logs appear.


![Pretty Log Demo](https://raw.githubusercontent.com/tilakoli/PrettyLog/master/assets/demo.gif)

![Basic Logging Output](https://raw.githubusercontent.com/tilakoli/PrettyLog/master/assets/outputRegular.png)

![JSON Formatted Output](https://raw.githubusercontent.com/tilakoli/PrettyLog/master/assets/outputstringyfied.png)

## Table of Contents
- [Quick Start](#quick-start)
- [Features](#features)
- [Examples](#examples)
  - [Basic Logging](#basic-logging-alt--)
  - [JSON Stringified Logging](#json-stringified-logging-alt--)
  - [Debug Logging](#debug-logging-alt--1)
  - [Error Logging](#error-logging-alt--2)
- [Customization](#customization)
  - [Emoji Customization](#emoji-customization)
  - [Configuration Options](#configuration-options)
  - [Customizing Keyboard Shortcuts](#customizing-keyboard-shortcuts)
- [Release Notes](#release-notes)

---
&nbsp;

## Quick Start

1. Select or place the cursor near any variable or expression in your code
2. Use one of the keyboard shortcuts:
   - `Alt + /` (Option + / on Mac) for basic logging
   - `Alt + '` (Option + ' on Mac) for JSON formatted logs
   - `Alt + 1` for Debug log
   - `Alt + 2` for Error log

---

## Features

- ✅ **Quick Insertion**: Add console logs with just a keyboard shortcut
- ✅ **Visual Markers**: Easily spot your logs with distinctive emoji markers
- ✅ **JSON Formatting**: Beautiful JSON output with proper indentation for nested logs
- ✅ **Source Tracking**: Quickly locate logs with file names and line numbers
- ✅ **Code Friendly**: Preserves your code's indentation and formatting
- ✅ **Customizable**: Personalize emoji markers and output format

---

## Examples

### Basic Logging (`Alt + /`)

```javascript
// Your code
const user = { name: 'John', age: 30 };
user  // <- have the cursor anywhere in the word and press Alt + /

// Result:
console.log('🧑‍💻app.js:2=>', user, '<===🛑');

// Output in your console: 
// 🧑‍💻app.js:2=> { name: 'John', age: 30 } <===🛑
```

### JSON Stringified Logging (`Alt + '`)

```javascript
// Your code
const user = { name: 'John', age: 30 };
user  // <- have the cursor anywhere in the word and press Alt + '

// Result:
console.log('🧑‍💻app.js:2=>', JSON.stringify(user, null, 2), '<===🛑');

// Output in your console:
// 🧑‍💻app.js:2=> {
//   "name": "John",
//   "age": 30
// } <===🛑
```

### Debug Logging (`Alt + 1`)

```javascript
// Your code
const isAuthenticated = false;
isAuthenticated  // <- have the cursor anywhere in the word and press Alt + 1

// Result:
console.debug('🐞 DEBUG app.js:2👉', isAuthenticated, '👈 🛑');

// Output in your console: 
// 🐞 DEBUG app.js:2👉 false 👈 🛑
```

### Error Logging (`Alt + 2`)

```javascript
// Your code
const errorMessage = "Invalid user credentials";
errorMessage  // <- have the cursor anywhere in the word and press Alt + 2

// Result:
console.error('❌ ERROR app.js:2👉', errorMessage, '👈 🛑');

// Output in your console: 
// ❌ ERROR app.js:2👉 Invalid user credentials 👈 🛑
```
---

## Customization

### Emoji Customization

| Setting                   | Default    | Description                            |
|---------------------------|------------|----------------------------------------|
| `prettyLog.emoji.prefix`  | `🧑‍💻`      | Emoji used at the beginning of logs    |
| `prettyLog.emoji.pointer` | `👉`       | Emoji used as pointer before variables |
| `prettyLog.emoji.end`     | `👈 🛑`    | Emoji used at the end of log statements |
| `prettyLog.emoji.error`   | `❌ ERROR` | Emoji/text used for error logs         |
| `prettyLog.emoji.debug`   | `🐞 DEBUG` | Emoji/text used for debug logs         |

To customize emojis:

1. Open **VS Code Settings**:
   - Press `Cmd + ,` (Mac) or `Ctrl + ,` (Windows/Linux)
   - Or go to Code > Preferences > Settings

2. In the search bar, type **"Pretty Log > Emoji"**

3. Edit any field to add your preferred emoji or text

4. Changes apply immediately to new log statements

To reset to default emojis, hover over the setting and click the "Reset Setting" icon (curved arrow).

### Configuration Options

You can customize which elements appear in your logs:

| Setting                         | Default | Description                               |
|---------------------------------|---------|-------------------------------------------|
| `prettyLog.includeFileName`     | `true`  | Include file name in the log output      |
| `prettyLog.includeLineNumber`   | `true`  | Include line number in the log output    |
| `prettyLog.includeVariableName` | `true`  | Include variable name in the log output  |

To customize these options:

1. Open **VS Code Settings** (Cmd+, or Ctrl+,)
2. Search for **"Pretty Log"**
3. Toggle the options as desired

### Customizing Keyboard Shortcuts

| Command | Default Shortcut |
|---------|----------|
| Insert Basic Log | `Alt+/` |
| Insert JSON Stringified Log | `Alt+'` |
| Insert Debug Log | `Alt+1` |
| Insert Error Log | `Alt+2` |

To customize these shortcuts:

1. Open VS Code Settings
2. Go to Keyboard Shortcuts (`Ctrl+K Ctrl+S` or `Cmd+K Cmd+S` on Mac)
3. Search for "Pretty Log" to see all available commands
4. Click the pencil icon next to any command and set your preferred key combination

Alternatively, edit your `keybindings.json` file directly:

```json
{
  "key": "ctrl+alt+l",
  "command": "prettyLog.insertBasicLog",
  "when": "editorTextFocus"
}
```

---

## Release Notes
See [CHANGELOG.md](CHANGELOG.md) for detailed release notes.

<!--## Contributing-->
<!--Found a bug or have a feature request? Please open an issue on our [GitHub repository](#).-->

<!--## License-->
<!--This extension is licensed under the **ISC License**.-->