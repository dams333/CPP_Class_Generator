import { commands, ExtensionContext, Position, ViewColumn, WebviewPanel, window } from 'vscode';
import * as vscode from 'vscode';
import * as path from 'path';

function getGuiHtml() {
    let guiHTML =  `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>C++ Class Generators</title>
            <style>
			body{
				background-color:#17202A;
				color: #FFFFFF;
			}
			.button {
                background-color: Transparent;
                background-repeat:no-repeat;
                border: none;
                cursor:pointer;
                overflow: absolute;
                outline:none;
                padding: 12px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 12px;
                margin: 4px 2px;
                transition-duration: 0.4s;
				width:200px;
				margin-top: 30px;
				margin-left: calc(50% - 100px);
				color:white;
				border: 2px solid #008CBA;
            }
			.button:hover{
				background-color: #008CBA;
				color: black;
			}
			.input{
				background-color: Transparent;
				background-repeat:no-repeat;
				border: 1px solid #008CBA;
				color: #ffffff;
				overflow: absolute;
				outline:none;
				padding: 12px;
				text-align: center;
				text-decoration: none;
				display: inline-block;
				font-size: 22px;
				width: 300px;
				margin-left: calc(50% - 150px);
				margin-top: 5px;
				height: 12px
			}
			.label{
				color: #ffffff;
				text-align: center;
				font-family: "Arial";
				font-size: 17px;
				margin-left: calc(50% - 150px);
				margin-top: 20px;
			}
		</style>
	</head>
	<body>
		<form id="generation-form">
			<label class="label">Class name:</label> <br />
			<input type="text" class="input" id="className" placeholder="ClassName"/><br />
			<button class="button" onclick="generate()">Generate</button>
		</form>
		<script>
			const vscode = acquireVsCodeApi();
			function generate() {
				vscode.postMessage({
					className: document.getElementById('className').value
				});
			}
		</script>
	</body>
</html>
    `;
    return guiHTML;
}

export function activate(context: ExtensionContext) {

	console.log('42CppClassGenerator is now active!');

	let command = commands.registerCommand('42CppClassGenerator.openPannel', () => {
		let editor = window.activeTextEditor!;
		let onePanel: WebviewPanel;
		onePanel = window.createWebviewPanel(
			'cppgenerator',
			'Class Generator',
			{ viewColumn: ViewColumn.Two, preserveFocus: true },
			{
				enableScripts: true,
			}
		);
		onePanel.webview.html = getGuiHtml();
		onePanel.webview.onDidReceiveMessage(
			async (message: any) => {
				console.log("Start generating class " + message.className);

				if(vscode.workspace.workspaceFolders !== undefined)
				{
					{
						let text = "#ifndef " + message.className.toUpperCase() + "_HPP\n# define " + message.className.toUpperCase() + "_HPP\n\n";
						text += "# include <iostream>\n";
						text += "# include <string>\n\n";
						text += "class " + message.className + "\n{\n";
						text += "\tpublic:\n\t\t\n";
						text += "\tprivate:\n\t\t\n";
						text += "};\n\n";
						text += "#endif";

						const newFile = vscode.Uri.parse('untitled:' + path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, message.className + ".hpp"));
						vscode.workspace.openTextDocument(newFile).then(document => {
							const edit = new vscode.WorkspaceEdit();
							edit.insert(newFile, new vscode.Position(0, 0), text);
							return vscode.workspace.applyEdit(edit).then(success => {
								if (success) {
									document.save();
									vscode.window.showInformationMessage('HPP created !');
								} else {
									vscode.window.showInformationMessage('Error during HPP creation !');
								}
							});
						});
					}
					{
						let text = "#include \"" + message.className + ".hpp\"\n\n";

						const newFile = vscode.Uri.parse('untitled:' + path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, message.className + ".cpp"));
						vscode.workspace.openTextDocument(newFile).then(document => {
							const edit = new vscode.WorkspaceEdit();
							edit.insert(newFile, new vscode.Position(0, 0), text);
							return vscode.workspace.applyEdit(edit).then(success => {
								if (success) {
									document.save();
									vscode.window.showInformationMessage('CPP created !');
								} else {
									vscode.window.showInformationMessage('Error during CPP creation !');
								}
							});
						});
					}
				}
				else
				{
					console.error("Impossible to localise user");
				}

				return;
			},
			undefined,
			context.subscriptions
		);
	});
	context.subscriptions.push(command);
}

export function deactivate() {}
