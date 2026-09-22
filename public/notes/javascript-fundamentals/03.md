# Data and Variables

## Learning Objectives

- know the different primitive data types
- understand that operations can be performed on data in JavaScript
- know how to assign data to a variable

## Storing data

Javascript has 7 primitive (basic) data types, these are:

- Strings
- Numbers (All js numbers are floating point numbers, i.e. decimals with no - distinction for integers)
- Booleans (`true` / `false`)
- `undefined`
- `null`
- Symbols - (unique values that are not equal to any other value, but that's as much as we need to know for now)
- BigInt - (a special numeric type that is used to accurately represent very large numbers - we won't use it on the course) 

There are also Objects (which includes Arrays) that we will cover in more detail separately.

Suppose we are going to use some data in our code like in the following example:

```js
'hello there northcoders!';

```

We could perform several operations on this piece of data (a **string** in this case), like in the following example:

```js
'hello northcoders'.toUpperCase();

'hello northcoders'.length;

'hello northcoders'[3];
```

However in programming it makes sense for us to store our data in such way that it can be re-used and manipulated throughout our code without us having to do the same operations over and over again. Consider the example below:

```js
'hello northcoders'.slice(0, 6);
```

This block of code is designed to access the first word in the string `"hello northcoders"`. However, if we needed to use this piece of data repeatedly throughout our code then we would have to write out this block of code again and again. Instead we can store this data "hello northcoders" in a **variable**.

## Variable declarations

> A variable is used to store a piece of data or information

So instead we could create a variable with a name of `firstWord` and this can store the piece of information `"hello northcoders"`

```js
const firstWord = 'hello northcoders'.slice(0, 6);
```

We can break this piece of code into several parts:

1. `const` this is a **keyword** in JavaScript and indicates we are creating a brand new variable

2. `firstWord` this is the **identifier** or **name** of the variable

3. `=` in JavaScript this symbol has a special meaning and is known as the **assignment operator**
   It is used to assign a value to a particular **variable name**

4. `"hello northcoders".slice(0, 6)` this is an expression which will be assigned to `firstWord`;
