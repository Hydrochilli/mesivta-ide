# Functions & execution context

## Learning Objectives

- understand the benefits of using functions
- know how to invoke functions in JavaScript
- know how to declare functions in JavaScript
- understand the basics of how JavaScript interprets code.
- understand the concepts of the call stack, the thread and the variable environment.

## Functions

Functions allow us to make code flexible and reusable. Essentially giving a block of code a name and then being able to run that code again and again. This has the benefit of not having to re-write the code and repeat ourselves, and also to re-use the code in different scenarios.

## Calling and Declaring Functions

A function that we have already seen is `console.log`:

```js
console.log('hello northcoders');
```

The above example is a **call** or an **invocation** of a the `console.log` function.
However, `console.log` is an in-built function. We will want to create our functions so that we can carry out tasks in our code.

Suppose we have a function called `add` that takes **2 inputs**, in this example `10` and `32` and produces an **output** of `42`:

```js
add(10, 32);
```

We can **declare a function** that will contain the instructions we need in order to fulfil the behaviour of this function.

```js
function add(a, b) {
  return a + b;
}
```

## Anatomy of a function

A function is composed of a sequence of statements called the function body. Values can be passed to a function, and the function will return a value.

We can break down the above `add` function example into different sections:

1. `function` - this is a **keyword** and indicates we are creating a new function

2. `add` - this is the name of the function

3. `(a,b)` - `a` and `b` are said to be **function parameters**, these are placeholders are variable names that refer to the inputs that were passed into the function when it was called.

4. `{}` - we write some curly braces and everything contained inside the curly braces is said to the **body of the function**. The body of the function contains the set of instructions that will executed when the function `add` is called.

5. `return a + b;` - `return` is a keyword in JavaScript. It used to indicate what our function will **output**. The expression `a + b` is the **return value** of the function. The **return value** is essentially the **output** of a function.

## What happens when JS runs my code?

The JavaScript interpreter reads code _line-by-line_. This differentiates it from some other language, where the code is compiled as it is written, or when it is built but before it is run.

This means that code can execute happily for some period, but fail at the point of encountering an error, which makes debugging and understanding the flow of your code an extremely valuable skill in JavaScript.

Variables in JavaScript are assigned to memory. Here are some examples: an array, a function and a string.

```js
const arr = [1, 2, 3];
function sayHello(name) {
  const str = 'hello ' + name;
  return str;
}
const me = 'Sam';
```

### The variable environment

When this file is run, these variables are placed in memory. But the content of the function is never examined or compiled, because the function was never called. Everything inside it remains 'hypothetical' until that execution happens.

These variables are now available in the global **variable environment**. This means what any point in our code, we can refer to them by their variable name, and access whatever value was stored at that point in memory. In the following example, the value saved under `us` is created by accessing two other stored variables:

```js
const me = 'Jonny';
const you = 'Sam';
const us = me + ' ' + you;
```

### The Call Stack

Running a JavaScript file creates a **global execution context**. This includes creating the global object that we have access to when we use things that are 'globally available' like `console.log`.

### The Thread

Within this global execution context, an **execution thread** begins running. This evaluates each line in turn, or **synchronously**. JavaScript is a 'single-threaded' language - it can only have one execution thread operating at a time.

In JavaScript, the **call stack** is used to keep track of _which_ execution thread is happening. A JavaScript process begins with the global thread being added to the call stack. However, if we execute a function, we will enter a new, **local execution context**. JS will add this to the call stack, to indicate that this context needs resolving before moving back to the global. This will ensure JavaScript executes the lines of code in the desired order. This example shows the order in which the lines are interpreted:

```js
function sayHello(name) {
  //1, function name added to variable environment, then //3 'name' is given value passed in as argument
  const str = 'hello ' + name; //4
  return str; //5
}
const greeting = sayHello('Sam'); //2, opens the execution context for 'sayHello', then //6 when 'greeting' is given the value returned from the local execution context.
console.log(greeting); //7
```

As we can see above, we can make variables available to the local variable environment when we open it by invoking the function with **arguments** (in this case, `'Sam'`). To receive this, `sayHello` is defined with **parameters** which these arguments match the order of. So the execution context of `sayHello` begins with a variable called `name` with a value of `'Sam'` in its variable environment.

To add an execution context is known as _pushing_ it to the call stack - when that function returns, it is _popped_ from the call stack.

When an execution context closes, all the variables that were defined in that environment are cleared from memory, in a process known as **garbage collection**.

However, we will often want to preserve a value that we have calculated over the course of the function invocation. To do this, we can use `return` followed by the value we want to return. This value will be assigned to the variable that we initialised in order to receive the output from the execution context - in this case, `greeting`.
