export function getCppConstructors(message: any)
{
	let text = "// Constructors\n";
	text += message.className + "::" + message.className + "()\n{\n";
	for(let i = 0; i < message.fields.length; i++)
	{
		text += "\t" + "_" + message.fields[i].field_name + " = ;\n";
	}
	text += "}\n\n";
	text += message.className + "::" + message.className + "(const " + message.className + " &copy)\n{\n";
	if(message.fields.length === 0)
	{
		text += "\t(void) copy;\n";
	}
	for(let i = 0; i < message.fields.length; i++)
	{
		text += "\t" + "_" + message.fields[i].field_name + " = copy.get" + message.fields[i].field_name[0].toUpperCase() + message.fields[i].field_name.slice(1) + "();\n";
	}
	text += "}\n\n";
	if(message.fields.length > 0)
	{
		text +=  message.className + "::" + message.className + "(";
		for(let i = 0; i < message.fields.length; i++)
		{
			if(i !== 0)
			{
				text += ", ";
			}
			text += message.fields[i].field_type + " " + message.fields[i].field_name;
		}
		text += ")\n{\n";
		for(let i = 0; i < message.fields.length; i++)
		{
			text += "\t" + "_" + message.fields[i].field_name + " = " +  message.fields[i].field_name + ";\n";
		}
		text += "}\n\n";
	}
	return text;
}

export function getCppDestructors(message: any)
{
	let text = "\n// Destructor\n";
	text += message.className + "::" + "~" + message.className + "()\n{\n";
	text += "}\n\n";
	return text;
}

export function getCppOperators(message: any)
{
	let text = "\n// Operators\n";
	text += message.className + " & " + message.className + "::operator=(const " + message.className + " &assign)\n{\n";
	if(message.fields.length === 0)
	{
		text += "\t(void) assign;\n";
	}
	for(let i = 0; i < message.fields.length; i++)
	{
		text += "\t" + "_" + message.fields[i].field_name + " = assign.get" + message.fields[i].field_name[0].toUpperCase() + message.fields[i].field_name.slice(1) + "();\n";
	}
	text += "\treturn *this;\n}\n\n";
	return text;
}

export function getCppGettersSetters(message: any)
{
	let text = "";
	if(message.fields.length > 0)
	{
		text += "\n// Getters / Setters\n";
		for(let i = 0; i < message.fields.length; i++)
		{
			text += message.fields[i].field_type + " " + message.className + "::get" + message.fields[i].field_name[0].toUpperCase() + message.fields[i].field_name.slice(1) + "() const\n{\n";
			text += "\treturn _" + message.fields[i].field_name + ";\n}\n";
			text += "void " + message.className + "::set" + message.fields[i].field_name[0].toUpperCase() + message.fields[i].field_name.slice(1) + "(" + message.fields[i].field_type + " " + message.fields[i].field_name + ")\n{\n";
			text += "\t_" + message.fields[i].field_name + " = " + message.fields[i].field_name + ";\n}\n\n";
		}
	}
	return text;
}