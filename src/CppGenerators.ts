export function getCppConstructors(message: any)
{
	let text = "// Constructors\n";
	text += message.className + "::" + message.className + "()\n{\n";
	for(let i = 0; i < message.fields.length; i++)
	{
		text += "\t" + "_" + message.fields[i].field_name + " = " + message.fields[i].default + ";\n";
	}
	if(message.debug)
	{
		text += "\tstd::cout << \"\\e[0;33mDefault Constructor called of " + message.className + "\\e[0m\" << std::endl;\n";
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
	if(message.debug)
	{
		text += "\tstd::cout << \"\\e[0;33mCopy Constructor called of " + message.className + "\\e[0m\" << std::endl;\n";
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
		if(message.debug)
		{
			text += "\tstd::cout << \"\\e[0;33mFields Constructor called of " + message.className + "\\e[0m\" << std::endl;\n";
		}
		text += "}\n\n";
	}
	return text;
}

export function getCppDestructors(message: any)
{
	let text = "\n// Destructor\n";
	text += message.className + "::" + "~" + message.className + "()\n{\n";
	if(message.debug)
	{
		text += "\tstd::cout << \"\\e[0;31mDestructor called of " + message.className + "\\e[0m\" << std::endl;\n";
	}
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
			if(message.fields[i].getter)
			{
				text += message.fields[i].field_type + " " + message.className + "::get" + message.fields[i].field_name[0].toUpperCase() + message.fields[i].field_name.slice(1) + "() const\n{\n";
				text += "\treturn _" + message.fields[i].field_name + ";\n}\n";
			}
			if(message.fields[i].setter)
			{
				text += "void " + message.className + "::set" + message.fields[i].field_name[0].toUpperCase() + message.fields[i].field_name.slice(1) + "(" + message.fields[i].field_type + " " + message.fields[i].field_name + ")\n{\n";
				text += "\t_" + message.fields[i].field_name + " = " + message.fields[i].field_name + ";\n}\n\n";
			}
		}
	}
	return text;
}

export function getCppExceptions(message: any)
{
	let text = "";
	if(message.classExceptions.length > 0)
	{
		text += "\n\n// Exceptions\n";
		for(let i = 0; i < message.classExceptions.length; i++)
		{
			text += "const char * " + message.className + "::" + message.classExceptions[i].exception_name + "::what() const throw()\n{\n";
			text += "\treturn \"" + message.classExceptions[i].exception_what + "\";\n}\n";
		}
	}
	return text;
}


export function getCppStreamOperator(message: any)
{
	let text = "";
	if(message.format !== "")
	{
		let format = message.format;
		for(let i = 0; i < message.fields.length; i++)
		{
			let toReplace = "${" + message.fields[i].field_name + "}";
			let replacement = "\" << object.get" + message.fields[i].field_name[0].toUpperCase() + message.fields[i].field_name.slice(1) + "()" + " << \"";
			format = format.replaceAll(toReplace, replacement);
		}
		text += "\n\n// Stream operators\n";
		text += "std::ostream & operator<<(std::ostream &stream, const " + message.className + " &object)\n{\n";
		text += "\tstream << \"" + format + "\" << std::endl;\n";
		text += "\treturn stream;\n}\n";
	}
	return text;
}