# Pretty Log

A VS Code extension for quickly adding styled console.log statements to your code with distinctive emoji markers. Make your debugging more visual and organized!

## Features

- Quick console.log insertion with distinctive emoji markers
- JSON.stringify formatting with proper indentation
- Preserves your code's indentation
- Custom keyboard shortcuts:
  - `alt + /` : Basic console.log with emoji markers
  - `alt + '` : JSON.stringify with formatting

## Installation

Search for "Pretty Log" in VS Code's extension marketplace or install it directly from [marketplace link].

## Usage

1. Select any variable or expression in your code
2. Use one of the keyboard shortcuts:
   - Press `alt + /` for basic logging
   - Press `alt + '` for JSON stringified logging

### Example 1: Basic Logging
```javascript
// Your code
const user = { name: 'John', age: 30 };
user  // <- select this and press alt + /

console.log('🧑‍💻===>', JSON.stringify(user, null, 2), '<===🛑');
// 🧑‍💻===>' { name: 'John', age: 30 } '<===🛑