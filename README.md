# Pretty Log
A VS Code extension for quickly adding styled `console.log` statements to your code with distinctive emoji markers. Make your debugging more visual and organized! And No more staring into the cluttered log output to find that one variable, use JSON formatting to add proper indentation to your logs.

## Usage
1. Select or place the cursor near any variable or expression in your code.
2. Use one of the keyboard shortcuts:
   - Press `alt + /` (or option + / on Mac) for basic logging.
   - Press `alt + '`  (or option + ' on Mac) for JSON formatted log outputs. Useful for nested data or arrays or nested objects.
   - Press `alt + 1` for Debug log.
   - Press `alt + 2` for Error log.

## Preview  
![Pretty Log Demo](https://raw.githubusercontent.com/tilakoli/PrettyLog/master/assets/demo.gif)  

### Screenshots  
![Pretty Log Screenshot](https://raw.githubusercontent.com/tilakoli/PrettyLog/master/assets/outputRegular.png)  
![Pretty Log Screenshot](https://raw.githubusercontent.com/tilakoli/PrettyLog/master/assets/outputstringyfied.png)  

## Why Pretty Log?
✅ **JSON Formatting**: Beautiful JSON output with proper indentation for nested logs.

✅ **Visual Markers**: Easily spot your logs with distinctive emoji markers.

✅ **Source Tracking**: Quickly locate the source of logs with file names and line numbers.

✅ **Code Friendly**: Preserves your code's indentation and formatting.

✅ **Quick Access**: Simple keyboard shortcuts for different logging styles.

✅ **Customizable Output**: Choose what to display in your logs!

<!-- Use the🧑‍💻 🛑 emoijs with in the readme files for line start and line end  -->
## Features 
- Quick `console.log` insertion with distinctive emoji markers 🧑‍💻 🛑
- File name and line number tracking for easy debugging
- `JSON.stringify` formatting with proper indentation
- Preserves your code's indentation
- Quick Logging shortcuts:
  - `alt + /` : Basic `console.log` with filename and line no, and emoji markers
  - `alt + '` : `JSON.stringify` with formatting, helpful to view nested data.


## Customization
  #### Configuration Options
You can customize the log output by choosing whether to include the `variable name`,` file name`, and `line number` in your logs or not. By default all the options will be enabled.

1. Open the **VS Code Settings**:  
   - Press `Cmd + Shift + P` (Mac) or `Ctrl + Shift + P` (Windows/Linux).  
   - Type **"Preferences: Open Settings (UI)"** and select it.  
2. In the search bar, type **"Pretty Log"**.  
3. Select the options you like  

| Setting                         | Default | Description                               |
|---------------------------------|---------|-------------------------------------------|
| `prettyLog.includeFileName`     | `true`  | Include file name in the log output.      |
| `prettyLog.includeLineNumber`   | `true`  | Include line number in the log output.    |
| `prettyLog.includeVariableName` | `true`  | Include variable name in the log output.  |

## Customizing Shortcuts

Pretty Log comes with the following default keyboard shortcuts:

| Command | Shortcut |
|---------|----------|
| Insert Basic Log | `Alt+/` |
| Insert JSON Stringified Log | `Alt+'` |
| Insert Error Log | `Alt+2` |
| Insert Debug Log | `Alt+1` |


You can customize these keyboard shortcuts to match your preferences:

1. Open VS Code Settings
2. Go to Keyboard Shortcuts (`Ctrl+K Ctrl+S` or `Cmd+K Cmd+S` on Mac)
3. Search for "Pretty Log" to see all available commands
4. Click the pencil icon next to any command and set your preferred key combination

Alternatively, you can directly edit your `keybindings.json` file by adding entries like:

```json
{
  "key": "ctrl+alt+l",
  "command": "prettyLog.insertBasicLog",
  "when": "editorTextFocus"
}
``` 

## Example 1: Basic Logging
```javascript
// Your code
const user = { name: 'John', age: 30 };
user  // <- have the cursor anywhere in the word and press alt + /


console.log('🧑‍💻app.js:2=>', user, '<===🛑');
// Output in your console: 
🧑‍💻app.js:2=> { name: 'John', age: 30 } <===🛑

```

## Example 2: JSON Stringified Logging
```javascript
// Your code
const user = { name: 'John', age: 30 };
user  // <- have the cursor anywhere in the word and press alt + '


console.log('🧑‍💻app.js:2=>', JSON.stringify(user, null, 2), '<===🛑');
// Output in your console
/*

🧑‍💻app.js:2=> {
  "name": "John",
  "age": 30
} <===🛑

*/
```

## Example 3: Debug Logging
```javascript
// Your code
const isAuthenticated = false;
isAuthenticated  // <- have the cursor anywhere in the word and press alt + 1


console.debug('🐞 DEBUG app.js:2👉', isAuthenticated, '👈 🛑');
// Output in your console: 
🐞 DEBUG app.js:2👉 false 👈 🛑
```

## Example 4: Error Logging
```javascript
const errorMessage = "Invalid user credentials";
errorMessage  // <- have the cursor anywhere in the word and press alt + 2


console.error('❌ ERROR app.js:2👉', errorMessage, '👈 🛑');
// Output in your console: 
❌ ERROR app.js:2👉 Invalid user credentials 👈 🛑
```

<!-- 
## Release Notes
See [CHANGELOG.md](CHANGELOG.md) for detailed release notes. -->

<!--## Contributing-->
<!--Found a bug or have a feature request? Please open an issue on our [GitHub repository](#).-->

<!--## License-->
<!--This extension is licensed under the **ISC License**.-->