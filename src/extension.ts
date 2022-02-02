import * as vscode from 'vscode';
import * as path from 'path';
import { getGuiHtml } from './GuiGenerator';
import { getHppConstructors, getHppDestructors, getHppOperators, getHppGettersSetters, getHppPrivate } from './HppGenerator';
import { getCppConstructors, getCppDestructors, getCppOperators, getCppGettersSetters } from './CppGenerators';

export function activate(context: vscode.ExtensionContext) {

	console.log('42CppClassGenerator is now active!');

	let command = vscode.commands.registerCommand('42CppClassGenerator.openPannel', () => {
		let onePanel: vscode.WebviewPanel;
		onePanel = vscode.window.createWebviewPanel(
			'cppgenerator',
			'Class Generator',
			{ viewColumn: vscode.ViewColumn.One, preserveFocus: true },
			{
				enableScripts: true,
			}
		);
		onePanel.webview.html = getGuiHtml();
		onePanel.webview.onDidReceiveMessage(
			async (message: any) => {
				if(message.type === "error")
				{
					vscode.window.showErrorMessage('Please specify a class name');
				}
				if(message.type === "error2")
				{
					vscode.window.showErrorMessage('One of the field is incomplete');
				}
				if(message.type === "generate")
				{
					console.log("Start generating class " + message.className);

					if(vscode.workspace.workspaceFolders !== undefined)
					{
						{
							let text = "#ifndef " + message.className.toUpperCase() + "_HPP\n# define " + message.className.toUpperCase() + "_HPP\n\n";
							text += "# include <iostream>\n";
							text += "# include <string>\n\n";
							text += "class " + message.className + "\n{\n";
							text += "\tpublic:\n";
							text += getHppConstructors(message);
							text += getHppDestructors(message);
							text += getHppOperators(message);
							text += getHppGettersSetters(message);
							text += "\t\t\n";
							text += "\tprivate:\n";
							text += getHppPrivate(message);
							text += "\t\t\n";
							text += "};\n\n";
							text += "#endif";

							const newFile = vscode.Uri.parse('untitled:' + path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, message.className + ".hpp"));
							vscode.workspace.openTextDocument(newFile).then(document => {
								const edit = new vscode.WorkspaceEdit();
								edit.insert(newFile, new vscode.Position(0, 0), text);
								return vscode.workspace.applyEdit(edit).then(success => {
									if (success) {
										document.save();
									} else {
										vscode.window.showErrorMessage('Error during HPP creation !');
									}
								});
							});
						}
						{
							let text = "#include \"" + message.className + ".hpp\"\n\n";
							text += getCppConstructors(message);
							text += getCppDestructors(message);
							text += getCppOperators(message);
							text += getCppGettersSetters(message);
							
							const newFile = vscode.Uri.parse('untitled:' + path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, message.className + ".cpp"));
							vscode.workspace.openTextDocument(newFile).then(document => {
								const edit = new vscode.WorkspaceEdit();
								edit.insert(newFile, new vscode.Position(0, 0), text);
								return vscode.workspace.applyEdit(edit).then(success => {
									if (success) {
										document.save();
									} else {
										vscode.window.showErrorMessage('Error during CPP creation !');
									}
								});
							});
						}
					}
					else
					{
						console.error("Impossible to localise user");
					}
					vscode.window.showInformationMessage('Files created !');
					onePanel.dispose();
					return;
				}
			},
			undefined,
			context.subscriptions
		);
	});
	context.subscriptions.push(command);
}

export function deactivate() {}
