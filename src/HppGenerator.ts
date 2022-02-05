export function getHppConstructors(message: any)
{
	let text = "\t\t// Constructors\n";
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
	return text;
}

export function getHppDestructors(message: any)
{
	let text = "\t\t\n\t\t// Destructor\n";
	text += "\t\t~" + message.className + "();\n";
	return text;
}

export function getHppOperators(message: any)
{
	let text = "\t\t\n\t\t// Operators\n";
	text += "\t\t" + message.className + " & operator=(const " + message.className + " &assign);\n";
	return text;
}
export function getHppGettersSetters(message: any)
{
	let text = "";
	if(message.fields.length > 0)
	{
		text += "\t\t\n\t\t// Getters / Setters\n";
		for(let i = 0; i < message.fields.length; i++)
		{
			if(message.fields[i].getter)
			{
				text += "\t\t" + message.fields[i].field_type + " get" + message.fields[i].field_name[0].toUpperCase() + message.fields[i].field_name.slice(1) + "() const;\n";
			}
			if(message.fields[i].setter)
			{
				text += "\t\tvoid set" + message.fields[i].field_name[0].toUpperCase() + message.fields[i].field_name.slice(1) + "(" + message.fields[i].field_type + " " + message.fields[i].field_name + ");\n";
			}
		}
	}
	return text;
}

export function getHppPrivate(message: any)
{
	let text = "";
	for(let i = 0; i < message.fields.length; i++)
	{
		text += "\t\t" + message.fields[i].field_type + " _" + message.fields[i].field_name + ";\n";
	}
	return text;
}