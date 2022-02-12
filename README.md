# Table of content
- [Table of content](#table-of-content)
- [Road Map](#roadmap)
- [Documentation](#documentation)
- [Contributing](#contributing)
# RoadMap
- Automaticaly add 42 header
- Give the choice to create constructors with only certain fields
- Inheritance managing
- All the features that I find useful ;)
# Documentation
- The extension is available on:
	- https://marketplace.visualstudio.com/items?itemName=DamienHubleur.cppclassgenerator
	- https://open-vsx.org/extension/DamienHubleur/cppclassgenerator
- Open the generator pannel with the command `open C++ orthodox canonical class generator`
- Choose a class name (like `MySuperClass`)
- You can add all the fields you want 
	- For the type, precise `std` if needed. Examples: `std::string` or `int`
	- Choose a name without the `_` (like `mySuperInt`)
	- It's not mandatory to add a default value to the field
- You can add classe's exceptions
	- Precise the name (like `MySuperException`)
	- Precise whatever you want in the `what` function
- If you fill it, you cann add the overload of the `<<` operator (use the precised format to print some field in the message)
- You can generate debug message in constructor/destructor if the subject ask it

# Contributing
PR are welcome on Github to propose an improvement 