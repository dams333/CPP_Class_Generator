# Table of content
- [Table of content](#table-of-content)
- [Road Map](#roadmap)
- [Documentation](#documentation)
	- [Generator Pannel](#generator-pannel)
	- [Examples](#examples)
	- [Settings](#settings)
- [Contributing](#contributing)
# RoadMap
- Automaticaly add 42 header
- Give the choice to create constructors with only certain fields
- Inheritance managing
- All the features that I find useful ;)
# Documentation
## Generator pannel
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
---
## Examples
- Default generator (Errors are false positive detected by VScode but that's compile)
![Default](https://github.com/dams333/CPP_Class_Generator/raw/master/resources/defaultGenerator.gif)
- Complete all generator fields
![Default](https://github.com/dams333/CPP_Class_Generator/raw/master/resources/completeGenerator.gif)
---
## Settings
- "cppclassgenerator.defaultGetter" used to choose if the box "generate getter" is default checked
- "cppclassgenerator.defaultSetter" used to choose if the box "generate setter" is default checked
- "cppclassgenerator.defaultDebug" used to choose if the box "generate debug messages" is default checked
# Contributing
PR are welcome on Github to propose an improvement 