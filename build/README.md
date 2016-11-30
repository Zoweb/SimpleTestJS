# How to build SimpleTestJS

Building is very easy.

Place the files you wish to build in the /src/main folder - these will be compiled and minified to the dist folder. Remember that when you add these, you need to add them to /build/build.js's `files.src` array. If the files use ES6, they can't be minified by UglifyJS. These need to be added to the /src/not-minifiable folder. If you can find a way to minify these, please add a pull request for it!

Each time you create a new release, make sure to increment /build/build.js's `const version` number:
The **first number** increments at every major release (one that changes the way the framework is used, e.g deprecating functions).
The **second number** increments at every minor release (e.g. adding a feature, doesn't change the way the framework is used)
The **third number** increments at every debugging release.
Each time the **first number** increments, the **second** and **third** numbers are reset to 0.
Each time the **second number** increments, the **third** number is reset to 0.

To compile: (`$ ` is not part of the command - it is a placeholder for whatever goes before the command, like (in Command Prompt) `C:\Users\myuser> `.
1. Make sure you have read and followed the text above.
2. Make sure you have Node.js and NPM installed. http://nodejs.org
3. Navigate to the /build folder: `$ cd ./build/`
4. Run the command: `$ npm install` to download all the dependencies
5. Compile the files: `$ node build`.
6. Delete the node_modules folder before syncing to GitHub
