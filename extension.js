const vscode = require("vscode");
console.log("🧑‍💻 vscode👉", vscode, "👈 🛑");

// USER CONFIGS:
//  - Enable/Disable FileName, Line No, variable name in the logs from vs code settings.

// Log Types:
// basic : Basic log something like :: console.log('🧑‍💻 ${text}👉', ${logText}, '👈 🛑')
// json :  For formatting the arrays in the console output. :: console.log('🧑‍💻 ${fileName}:${lineNo}|${text}=>', JSON.stringify(${logToInsert}, null, 2), '👈 🛑')

// error : LOG out marked as errors with error emojis  :: console.error('❌ ERROR 🧑‍💻 ${fileName}:${lineNo}|${text}=>', ${logToInsert}, '👈 🛑')
// debug : LOG out marked with a bug emoji :: console.debug('🐞 DEBUG 🧑‍💻 ${fileName}:${lineNo}|${text}=>', ${logToInsert}, '👈 🛑')

//  [][][][][][][][][][][] <============== WIP =============> [][][][][][][][][][] //
// The next step will be to add the functionality of log detection, don't print the log in invalid places eg: inside a object
// It should be printed outside the obj itself where it won't throw any errors.

function activate(context) {
  // actual function for logging and formatting
  function insertLog(logType) {
    try {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showWarningMessage("No active editor found");
        return;
      }

      const config = vscode.workspace.getConfiguration("prettyLog");
      const selection = editor.selection;

      let text = editor.document.getText(selection);
      if (!text) {
        if (selection.isEmpty) {
          const wordRange = editor.document.getWordRangeAtPosition(
            selection.active
          );
          if (wordRange) {
            text = editor.document.getText(wordRange);
          } else {
            text = '"prettyLog"';
          }
        } else {
          text = '"prettyLog"';
        }
      }

      const position = editor.selection.end;
      const currentLine = editor.document.lineAt(position.line);
      const indentation = currentLine.text.match(/^\s*/)[0];

      const prefixParts = [];

      if (config.get("includeFileName")) {
        const fileName = editor.document.fileName.replace(/^.*[\\\/]/, "");
        prefixParts.push(fileName);
      }

      if (config.get("includeLineNumber")) {
        const lineNo = `:${position.line + 1}`;
        prefixParts.push(lineNo);
      }

      const prefix = prefixParts.length > 0 ? prefixParts.join("|") + "|" : "";

      let logPrefix;
      if (text === '"prettyLog"') {
        logPrefix = text;
      } else {
        logPrefix = config.get("includeVariableName")
          ? `${prefix}${text}`
          : prefix;
      }

      const logStatements = {
        basic: `\n${indentation}console.log('🧑‍💻 ${logPrefix}👉', ${text}, '👈 🛑')`,
        json: `\n${indentation}console.log('🧑‍💻 ${logPrefix}👉', JSON.stringify(${text}, null, 2), '👈 🛑')`,
        error: `\n${indentation}console.error('❌ ERROR ${logPrefix}👉', ${text}, '👈 🛑')`,
        debug: `\n${indentation}console.debug('🐞 DEBUG ${logPrefix}👉', ${text}, '👈 🛑')`,
      };

      const logToInsert = logStatements[logType] || logStatements.basic;

      editor
        .edit((editBuilder) => {
          editBuilder.insert(
            new vscode.Position(position.line, currentLine.text.length),
            logToInsert
          );
        })
        .then(() => {
          const newPosition = new vscode.Position(
            position.line + 1,
            currentLine.text.length
          );
          editor.selection = new vscode.Selection(newPosition, newPosition);
        });
    } catch (error) {
      vscode.window.showErrorMessage(`Error inserting log: ${error.message}`);
      console.error("Error in insertLog:", error);
    }
  }
  // Register commands
  const commands = [
    { id: "prettyLog.insertBasicLog", type: "basic" },
    { id: "prettyLog.insertJsonLog", type: "json" },
    { id: "prettyLog.insertErrorLog", type: "error" },
    { id: "prettyLog.insertDebugLog", type: "debug" },
  ];

  const registeredCommands = commands.map((cmd) =>
    vscode.commands.registerCommand(cmd.id, () => insertLog(cmd.type))
  );

  context.subscriptions.push(...registeredCommands);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
