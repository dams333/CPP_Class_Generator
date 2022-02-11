# Table of content
- [Table of content](#table-of-content)
- [Road Map](#roadmap)
- [Documentation](#documentation)
	- [Installation](#installation)
	- [Usage](#usage)
	- [Example](#example)
- [Contributing](#contributing)
# RoadMap
- Automaticaly add 42 header
- Give the choice to create constructors with only certain fields
- Inheritance managing
- Class' excpetions
- All the features that I find useful ;)
# Documentation
## Installation
Until we make the extension cleaner, it is not available directly on VSCode store. To install it, use the commans `code --install-extension 42CppClassGenerator-0.0.1.vsix` with the version you can find in the release. If you want to compile it from the source, you can use `vsce package --baseContentUrl none --baseImagesUrl none` command
## Usage
- Open the generator pannel with the command `open C++ orthodox canonical class generator`
- Choose a class name (as `MySuperClass`)
- You can add all the fields you want 
- For the type, precise `std` if needed. Examples: `std::string` or `int`
- Choose a name without the `_` (as `mySuperInt`)
- You can generate debug message in constructor/destructor if the subject ask it

# Contributing
The major problem at the moment is the interface. I am not a frontend developer and my code is very ugly. Feel free to make a PR to improve the interface (in `src/GuiGenerator.ts`). But you can participate on any part of the code to propose an improvement