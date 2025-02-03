const vscode = require('vscode');

function activate(context) {
    function insertLog(logType) {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;
        const selection = editor.selection;
        const text = editor.document.getText(selection);
        const position = editor.selection.end;
        const currentLine = editor.document.lineAt(position.line);
        const indentation = currentLine.text.match(/^\s*/)[0];
        const fileName = editor.document.fileName.replace(/^.*[\\\/]/, '');
        const lineNo = position.line + 1;

        let logToInsert = '';
        
        if (logType === 'basic') {
            logToInsert = `\n${indentation}console.log('🧑‍💻${fileName}:${lineNo}=>', ${text}, '<===🛑')`;
        } else if (logType === 'json') {
            logToInsert = `\n${indentation}console.log('🧑‍💻${fileName}:${lineNo}=>', JSON.stringify(${text}, null, 2), '<===🛑')`;
        }

        editor.edit(editBuilder => {
            editBuilder.insert(new vscode.Position(position.line, currentLine.text.length), logToInsert);
        });
    }

    let basicLog = vscode.commands.registerCommand('prettyLog.insertBasicLog', () => {
        insertLog('basic');
    });

    let jsonLog = vscode.commands.registerCommand('prettyLog.insertJsonLog', () => {
        insertLog('json');
    });

    context.subscriptions.push(basicLog, jsonLog);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};