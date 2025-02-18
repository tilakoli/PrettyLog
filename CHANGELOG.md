# Change Log

All notable changes to the "Pretty Log" extension will be documented in this file.

## [0.0.9] - 2024-02-18
### FEAT
- Configuration options to show/hide variableName, line.NO, and fileName.
- Nearest word detection: Logging now works even if the cursor is on a word—no need to manually select the text.
- Code organization and handler functions for better maintainability.

## [0.0.8] - 2024-02-03
### FIX
- Update file name logic to keep consistent filename across windows, mac and ubuntu.

## [0.0.7] - 2024-02-03
### FIX
- Remove semicolon from the console log.

## [0.0.6] - 2024-02-02
### FIX
- Update Preview assets url.

## [0.0.5] - 2024-02-02
### Chore
- Update Readme and add previews.

## [0.0.4] - 2024-02-02
### FIX
- Line Indentation while logging

## [0.0.3] - 2024-02-02
### Added
- Extension icon added showing Pretty Log branding
- File name and line numbers now included in console logs for better debugging.

## [0.0.2] - 2024-01-31
### Added
- Initial release of Pretty Log
- Basic console.log functionality with emoji markers (🧑‍💻===>, <===🛑)
- JSON.stringify formatting with proper indentation
- Two keyboard shortcuts:
  - `alt + /` for basic console.log
  - `alt + '` for JSON.stringify
- Automatic indentation preservation