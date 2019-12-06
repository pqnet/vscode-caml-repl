// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const config = vscode.workspace.getConfiguration('camlRepl');
	let terminal = vscode.window.createTerminal("Caml REPL", config.get('replCommand', 'camllight'));
	terminal.show();
	const runCaml = (code: string) => {
		// vscode.window.showInformationMessage(`Executing "${code}"`);
		`${code};;`.split('\n').forEach(line =>
			terminal.sendText(line)
		);
	};

	context.subscriptions.push(vscode.commands.registerCommand('extension.camlRepl.evaluate', () => {
		const activeTextEditor = vscode.window.activeTextEditor;
		if (activeTextEditor !== undefined) {
			activeTextEditor.selections.map((s) => {
				if (s.start.isEqual(s.end)) {
					return activeTextEditor.document.lineAt(s.start.line).text;
				}
				return activeTextEditor.document.getText(s);
			}).forEach(runCaml);
		}
	}));
}


// this method is called when your extension is deactivated
export function deactivate() { }
