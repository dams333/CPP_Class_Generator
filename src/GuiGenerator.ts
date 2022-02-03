export function getGuiHtml() {
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
			.label4{
				color: #ffffff;
				text-align: center;
				font-family: "Arial";
				font-size: 17px;
				margin-left: 38%;
				margin-top: 20px;
			}
		</style>
	</head>
	<body>
		<form id="generation-form">
			<label class="label">Class name:</label> <br />
			<input type="text" class="input" id="className" placeholder="ClassName"/><br />
			<div class="button2" onclick="addField()">Add a field</div>
			<div id="fields">
			</div>
			<br />
			<label class="label4">Generate constructor/destructor debug messages: <input type="checkbox" id="generateDebug"/></label>
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
					fields: fieldsList,
					debug: document.getElementById('generateDebug').checked
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