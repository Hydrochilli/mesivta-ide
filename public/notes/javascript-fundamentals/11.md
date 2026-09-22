# Exports and Require

## Learning Objectives

- understand that in NodeJS, each file is treated as a separate "module"
- know that `module` is an object that represents the current module
- know how `require` is a function used to include modules from other files within the current file
- know that `module.exports` is the value returned when the module is required elsewhere

## CommonJS module system

> Node.js follows the CommonJS module system, and the builtin require function is the easiest way to include modules that exist in separate files. The basic functionality of require is that it reads a JavaScript file, executes the file, and then proceeds to return the exports object. [NodeJs explanation](https://nodejs.org/en/knowledge/getting-started/what-is-require/)

### `module.exports`

By default, each module we create in NodeJs has a `module` object available within it, that represents the current module. One important property of this object is the `.exports` property, the value of which is returned when the module is required into another file.

`module.exports` default value is an empty object (`{}`)

```js
// file1.js
console.log(module.exports); // {}
```

### `require`

`require` is a function that takes a single argument of the **path** to the file that is to be imported. (It can also take a 'module name', but more on that another day!)

```js
// file2.js
const mystery = require('./file1.js');
console.log(mystery); // {}
```

The following example shows how `module.exports` can be reassigned a new value, and that value is what will be returned when the module is _required_ into another file.

```js
// file1.js
const name = 'philippa';
module.exports = name;

// file2.js
const mystery = require('./file1.js');
console.log(mystery); // 'philippa'
```

> **Note:** The variable created in file2 from the return value of `require` is a brand new variable that can be named anything the developer wants, though it will often make sense to keep the same variable name across the different files

## Exporting non-primitive types

### Exporting objects

`module.exports` can be assigned any JavaScript value (not only primitives, as in the above example), and this becomes extremely useful when wanting to export multiple values from a single file inside an object. Consider the following example:

```js
// file1.js
const name1 = 'philippa';
const name2 = 'izzi';
const multipleNames = { name1: name1, name2: name2 };

module.exports = multipleNames;

// file2.js
const multipleNames = require('./file1.js');

console.log(multipleNames); // logs {name1: 'philippa', name2: 'izzi'}

console.log(multipleNames.name1); // philippa
console.log(multipleNames.name2); // izzi
```

### Exporting functions

Often we may also have functions that we want to use in multiple files, and exporting and requiring those functions is the easiest way to do that:

```js
// file1.js
const sayHello = function () {
  console.log('hello');
};

module.exports = sayHello;

// file2.js
const sayHello = require('./file1.js');
console.log(sayHello); // [Function sayHello]
// To get the 'hello' console.log, we have to invoke the required in function
sayHello(); // 'hello'
```

This can be done in conjunction with the previous example to export multiple objects from the same file:

```js
// file1.js
const sayHello = function () {
  console.log('hello');
};

sayGoodbye = function () {
  console.log('goodbye');
};

module.exports = { sayHello: sayHello, sayGoodbye: sayGoodbye };

// file2.js
const functionsObj = require('./file1.js');
console.log(functionsObj); /*
  {
    sayHello: [Function sayHello],
    sayGoodbye: [Function sayGoodbye]
  }
*/
functionsObj.sayHello(); // 'hello'
functionsObj.sayGoodbye(); // 'goodbye'
```

## Object short-hand property names

We can use short-hand when declaring objects if you want the new key to be the same as the variable name.

```js
// file1.js

const sayHello = function () {
  console.log('hello');
};

sayGoodbye = function () {
  console.log('goodbye');
};

module.exports = { sayHello, sayGoodbye };
// equivalent to { sayHello: sayHello, sayGoodbye: sayGoodbye };
```
