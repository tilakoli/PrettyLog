# Pretty Log
A VS Code extension for quickly adding styled `console.log` statements to your code with distinctive emoji markers. Make your debugging more visual and organized! And No more staring into the cluttered log output to find that one variable, use JSON formatting to add proper indentation to your logs.

## Get Started  
- **Basic Logging:** Press `` `alt + /` `` (or `` `option + /` `` on Mac)  
- **JSON Logging:** Press `` `alt + '` `` (or `` `option + '` `` on Mac)  


## Preview  
![Pretty Log Demo](https://raw.githubusercontent.com/tilakoli/PrettyLog/master/assets/demo.gif)  

### Screenshots  
![Pretty Log Screenshot](https://raw.githubusercontent.com/tilakoli/PrettyLog/master/assets/outputRegular.png)  
![Pretty Log Screenshot](https://raw.githubusercontent.com/tilakoli/PrettyLog/master/assets/outputstringyfied.png)  

## Why Pretty Log?
✅ **JSON Formatting**: Beautiful JSON output with proper indentation for arrays and objects.

✅ **Visual Markers**: Easily spot your logs with distinctive emoji markers.

✅ **Source Tracking**: Quickly locate the source of logs with file names and line numbers.

✅ **Code Friendly**: Preserves your code's indentation and formatting.

✅ **Quick Access**: Simple keyboard shortcuts for different logging styles.

## Usage
1. Select any variable or expression in your code.
2. Use one of the keyboard shortcuts:
   - Press `alt + /` (or option + / on Mac) for basic logging.
   - Press `alt + '`  (or option + ' on Mac) for JSON formatted log outputs. Useful for arrays and nested objects.

## Features
- Quick `console.log` insertion with distinctive emoji markers 🧑‍💻 🛑
- File name and line number tracking for easy debugging
- `JSON.stringify` formatting with proper indentation
- Preserves your code's indentation
- Quick Logging shortcuts:
  - `alt + /` : Basic `console.log` with filename and line no, and emoji markers
  - `alt + '` : `JSON.stringify` with formatting, helpful to view nested data.

## Installation
Search for **"Pretty Log"** in VS Code's extension marketplace or install it directly from [marketplace link].


## Example 1: Basic Logging
```javascript
// Your code
const user = { name: 'John', age: 30 };
user  // <- select this and press alt + /


console.log('🧑‍💻app.js:2=>', user, '<===🛑');
// Output in your console: 
🧑‍💻app.js:2=> { name: 'John', age: 30 } <===🛑

```

## Example 2: JSON Stringified Logging
```javascript
// Your code
const user = { name: 'John', age: 30 };
user  // <- select this and press alt + '


console.log('🧑‍💻app.js:2=>', JSON.stringify(user, null, 2), '<===🛑');
// Output in your console
/*

🧑‍💻app.js:2=> {
  "name": "John",
  "age": 30
} <===🛑

*/
```

<!-- 
## Release Notes
See [CHANGELOG.md](CHANGELOG.md) for detailed release notes. -->

<!--## Contributing-->
<!--Found a bug or have a feature request? Please open an issue on our [GitHub repository](#).-->

<!--## License-->
<!--This extension is licensed under the **ISC License**.-->