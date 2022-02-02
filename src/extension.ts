import { commands, ExtensionContext, Position, ViewColumn, WebviewPanel, window } from 'vscode';
import * as vscode from 'vscode';
import * as path from 'path';
import { type } from 'os';

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
				font-family: Arial, Helvetica, sans-serif;
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
			.button2 {
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
				width:150px;
				margin-top: 30px;
				margin-left: calc(50% - 75px);
				color:white;
				border: 2px solid #008CBA;
			}
			.button2:hover{
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
				height: 12px;
				margin-bottom: 10px;
			}
			.type-input{
				background-color: Transparent;
				background-repeat:no-repeat;
				border: 1px solid #008CBA;
				color: #ffffff;
				overflow: absolute;
				outline:none;
				padding: 12px;
				text-align: center;
				text-decoration: none;
				display: inline;
				font-size: 22px;
				width: 100px;
				margin-top: 5px;
				height: 12px;
				margin-bottom: 10px;
				margin-left: 30%;
			}
			.name-input{
				background-color: Transparent;
				background-repeat:no-repeat;
				border: 1px solid #008CBA;
				color: #ffffff;
				overflow: absolute;
				outline:none;
				padding: 12px;
				text-align: center;
				text-decoration: none;
				display: inline;
				font-size: 22px;
				width: 300px;
				margin-top: 5px;
				height: 12px;
				margin-bottom: 10px;
				margin-left: 50px;
			}
			.label{
				color: #ffffff;
				text-align: center;
				font-family: "Arial";
				font-size: 17px;
				margin-left: calc(50% - 150px);
				margin-top: 20px;
			}
			.label2{
				color: #ffffff;
				text-align: center;
				font-family: "Arial";
				font-size: 17px;
				margin-left: 30%;
				margin-top: 20px;
			}
			.label3{
				color: #ffffff;
				text-align: center;
				font-family: "Arial";
				font-size: 17px;
				margin-left: 100px;
				margin-top: 20px;
			}
		</style>
	</head>
	<body>
		<form id="generation-form">
			<label class="label">Class name:</label> <br />
			<input type="text" class="input" id="className" placeholder="ClassName"/><br />
			<div id="fields">
			</div>
			<div class="button2" onclick="addField()">Add a field</div>
			<div class="button" onclick="generate()">Generate</div>
		</form>
		<script>
			let field = 0;
			const vscode = acquireVsCodeApi();
			function generate() {
				let fieldsList = [];
				if(document.getElementById("className").value == ""){
					vscode.postMessage({
						type: 'error'
					});
					return ;
				}
				for(let i = 0; i < field; i++){
					if(document.getElementById("field_type_" + i).value == "" && document.getElementById("field_name_" + i).value == "")
					{
						continue;
					}
					if(document.getElementById("field_type_" + i).value == "" || document.getElementById("field_name_" + i).value == "")
					{
						vscode.postMessage({
							type: 'error2'
						});
						return ;
					}
					fieldsList[i] = {field_type: document.getElementById("field_type_" + i).value, field_name: document.getElementById("field_name_" + i).value};
				}
				vscode.postMessage({
					type: "generate",
					className: document.getElementById('className').value,
					fields: fieldsList
				});
			}
			function addField() {
				let div = document.createElement("div");
				div.className = "field";
				document.getElementById('fields').appendChild(div);
				let label = document.createElement("label");
				label.className = "label2";
				label.innerHTML = "Field type:";
				div.appendChild(label);
				label = document.createElement("label");
				label.className = "label3";
				label.innerHTML = "Field name:";
				div.appendChild(label);
				let br = document.createElement("br");
				div.appendChild(br);
				let type = document.createElement("input");
				type.className = "type-input";
				type.type = "text";
				type.id = "field_type_" + field;
				type.placeholder = "Field type";
				div.appendChild(type);
				let name = document.createElement("input");
				name.className = "name-input";
				name.type = "text";
				name.id = "field_name_" + field;
				name.placeholder = "Field name";
				div.appendChild(name);
				field++;
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
			{ viewColumn: ViewColumn.One, preserveFocus: true },
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
							text += "\t\t// Constructors\n";
							text += "\t\t" + message.className + "();\n";
							text += "\t\t" + message.className + "(const " + message.className + " &copy);\n";
							if(message.fields.length > 0)
							{
								text += "\t\t" + message.className + "(";
								for(let i = 0; i < message.fields.length; i++)
								{
									if(i !== 0)
									{
										text += ", ";
									}
									text += message.fields[i].field_type + " " + message.fields[i].field_name;
								}
								text += ");\n";
							}	
							text += "\t\t\n\t\t// Destructor\n";
							text += "\t\t~" + message.className + "();\n";
							text += "\t\t\n\t\t// Operators\n";
							text += "\t\t" + message.className + " & operator=(const " + message.className + " &assign);\n";
							if(message.fields.length > 0)
							{
								text += "\t\t\n\t\t// Getters / Setters\n";
								for(let i = 0; i < message.fields.length; i++)
								{
									text += "\t\t" + message.fields[i].field_type + " get" + message.fields[i].field_name[0].toUpperCase() + message.fields[i].field_name.slice(1) + "();\n";
									text += "\t\tvoid set" + message.fields[i].field_name[0].toUpperCase() + message.fields[i].field_name.slice(1) + "(" + message.fields[i].field_type + " " + message.fields[i].field_name + ");\n";
								}
							}
							text += "\t\t\n";
							text += "\tprivate:\n";
							for(let i = 0; i < message.fields.length; i++)
							{
								text += "\t\t" + message.fields[i].field_type + " _" + message.fields[i].field_name + ";\n";
							}
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
										vscode.window.showInformationMessage('HPP created !');
									} else {
										vscode.window.showErrorMessage('Error during HPP creation !');
									}
								});
							});
						}
						{
							let text = "#include \"" + message.className + ".hpp\"\n\n";
							text += message.className + "::" + message.className + "()\n{\n";
							text += "\t\n";
							text += "}\n\n";

							const newFile = vscode.Uri.parse('untitled:' + path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, message.className + ".cpp"));
							vscode.workspace.openTextDocument(newFile).then(document => {
								const edit = new vscode.WorkspaceEdit();
								edit.insert(newFile, new vscode.Position(0, 0), text);
								return vscode.workspace.applyEdit(edit).then(success => {
									if (success) {
										document.save();
										vscode.window.showInformationMessage('CPP created !');
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
