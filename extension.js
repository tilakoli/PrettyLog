const vscode = require("vscode");

function activate(context) {
  //logging and formatting
  function insertLog(logType) {
    try {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showWarningMessage("No active editor found");
        return;
      }

      const config = vscode.workspace.getConfiguration("prettyLog");
      const selection = editor.selection;
      const document = editor.document;

      // Get custom emojis from config
      const prefixEmoji = config.get("emoji.prefix") || "🧑‍💻";
      const pointerEmoji = config.get("emoji.pointer") || "👉";
      const endEmoji = config.get("emoji.end") || "👈 🛑";
      const errorEmoji = config.get("emoji.error") || "❌ ERROR";
      const debugEmoji = config.get("emoji.debug") || "🐞 DEBUG";

      let text = editor.document.getText(selection);
      let selectedRange = selection;

      if (!text) {
        if (selection.isEmpty) {
          const wordRange = editor.document.getWordRangeAtPosition(
            selection.active
          );
          if (wordRange) {
            text = editor.document.getText(wordRange);
            selectedRange = wordRange;
          } else {
            text = '"prettyLog"';
          }
        } else {
          text = '"prettyLog"';
        }
      }

      // Get current line and surrounding context
      const curLineNum = selectedRange.start.line;
      const curLineText = document.lineAt(curLineNum).text;

      // Check if we're inside JSX (look for typical JSX patterns)
      const isInsideJSX =
        curLineText.trim().match(/<.*>/) ||
        curLineText.match(/^\s*</) ||
        curLineText.match(/>\s*$/);

      // Check if we're on a function declaration line
      const isFunctionDeclaration =
        curLineText.match(/\)\s*=>\s*{/) ||
        curLineText.match(/function\s+\w+\s*\(/) ||
        curLineText.match(/\w+\s*\([^)]*\)\s*{/);

      // Check if we're on a variable declaration line
      const isVariableDeclaration =
        curLineText.match(/^\s*(const|let|var)\s+\w+/) &&
        !curLineText.match(/;\s*$/);

      let position, indentation;

      if (isInsideJSX) {
        // For JSX, we need to wrap the log in {}
        const logText = `{console.log('${prefixEmoji} ${text}${pointerEmoji}', ${text}, '${endEmoji}')}`;

        // Try to find a good location - preferably right after a JSX opening tag
        position = new vscode.Position(curLineNum, curLineText.length);
        indentation = curLineText.match(/^\s*/)[0];

        // Custom JSX log format
        const logStatements = {
          basic: ` ${logText}`,
          json: ` ${logText.replace(")", ", null, 2)")}`,
          error: ` {console.error('${errorEmoji} ${text}${pointerEmoji}', ${text}, '${endEmoji}')}`,
          debug: ` {console.debug('${debugEmoji} ${text}${pointerEmoji}', ${text}, '${endEmoji}')}`,
        };

        const logToInsert = logStatements[logType] || logStatements.basic;

        editor.edit((editBuilder) => {
          editBuilder.insert(position, logToInsert);
        });

        return; // Exit early for JSX case
      }

      if (isFunctionDeclaration) {
        // For function declarations, find the opening brace and place log after it
        let bracePosition = -1;
        for (let i = curLineNum; i < document.lineCount; i++) {
          const line = document.lineAt(i).text;
          bracePosition = line.indexOf("{");
          if (bracePosition >= 0) {
            position = new vscode.Position(i, bracePosition + 1);
            indentation = document.lineAt(i).text.match(/^\s*/)[0] + "  "; // Add two spaces for indentation
            break;
          }
        }

        if (bracePosition < 0) {
          // Fallback if no brace found
          position = new vscode.Position(curLineNum, curLineText.length);
          indentation = curLineText.match(/^\s*/)[0];
        }
      } else if (isVariableDeclaration) {
        // For variable declarations, find the end of the declaration
        let endLine = curLineNum;
        let foundEnd = false;

        for (
          let i = curLineNum;
          i < Math.min(curLineNum + 30, document.lineCount);
          i++
        ) {
          const lineText = document.lineAt(i).text;
          if (
            lineText.trim().endsWith(";") ||
            (lineText.trim().endsWith("}") && !lineText.trim().endsWith("{}"))
          ) {
            endLine = i;
            foundEnd = true;
            break;
          }
        }

        if (foundEnd) {
          position = new vscode.Position(
            endLine,
            document.lineAt(endLine).text.length
          );
          indentation = document.lineAt(endLine).text.match(/^\s*/)[0];
        } else {
          // If end not found, default to current line
          position = new vscode.Position(curLineNum, curLineText.length);
          indentation = curLineText.match(/^\s*/)[0];
        }
      } else {
        // For all other cases, use the current line
        position = new vscode.Position(curLineNum, curLineText.length);
        indentation = curLineText.match(/^\s*/)[0];
      }

      const prefixParts = [];

      if (config.get("includeFileName")) {
        const fileName = editor.document.fileName.replace(/^.*[\\\/]/, "");
        prefixParts.push(fileName);
      }

      if (config.get("includeLineNumber")) {
        const lineNo = `:${selectedRange.start.line + 1}`;
        prefixParts.push(lineNo);
      }

      const prefix = prefixParts.length > 0 ? prefixParts.join("|") + "|" : "";

      let logPrefix;
      if (text === '"prettyLog"') {
        logPrefix = ""; 
      } else {
        logPrefix = config.get("includeVariableName")
          ? `${prefix}${text}`
          : prefix;
      }

      const logStatements = {
        basic: `\n${indentation}console.log('${prefixEmoji} ${logPrefix}${pointerEmoji}', ${text}, '${endEmoji}')`,
        json: `\n${indentation}console.log('${prefixEmoji} ${logPrefix}${pointerEmoji}', JSON.stringify(${text}, null, 2), '${endEmoji}')`,
        error: `\n${indentation}console.error('${errorEmoji} ${logPrefix}${pointerEmoji}', ${text}, '${endEmoji}')`,
        debug: `\n${indentation}console.debug('${debugEmoji} ${logPrefix}${pointerEmoji}', ${text}, '${endEmoji}')`,
      };

      const logToInsert = logStatements[logType] || logStatements.basic;

      editor
        .edit((editBuilder) => {
          editBuilder.insert(position, logToInsert);
        })
        .then(() => {
          const newPosition = new vscode.Position(
            position.line + 1,
            curLineText.length
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