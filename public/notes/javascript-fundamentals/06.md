# Conditional logic

## Learning Objectives

- understand how `if` statements can be used to execute code only under certain conditions
- understand the concept of truthy and falsy values
- know how conditional operators can be used in JavaScript

## `if` statements

It is natural in programming that we will need to make decisions. Given some condition that holds to be true we will want to execute a set of instructions, otherwise we'll do something else. An `if` statement will check if a condition is **truthy** and if so then some code will be executed:

`if` statement syntax:

```js
if (/* condition here */) {
  // code in this block will be executed if condition is truthy
}
```

For example,

```js
if (true) {
  console.log('hello northcoders');
}
```

The condition in this example is `true` so the code within the following block will be executed and the `console.log` will be executed, printing something to the terminal. However, anybody expression that evaluates to a **truthy** value can be used as condition in an `if` statement.

## Truthy and Falsy Values

In JavaScript, type coercion is when one value is implicitly converted from one data type into another data type. For example, when using `+` operator if one of the operands is a string then the other operand will be coerced (automatically converted) into a string data type before the concatenation operation is carried out.

```js
10 + '5';
// evaluates to "105"
```

In the above example, `10` is coerced into the string `"10"` before being concatenated with the `"5"`.

A similar process can take place where value are coerced into `true` or `false`. A **truthy** value is one that will be coerced into `true` in a situation where a condition is being checked. Whilst **falsy** values in JavaScript are values that will be coerced (automatically converted) into `false` when used in contexts like an `if` statement. There are 6 **falsy** values in JavaScript: `false`, `null`, `undefined`, `""`, `NaN` and `0`. Consider the following example:

```js
const a = 10;
const b = 20;

if (a + b) {
  console.log(`The sum of ${a + b} is bigger than zero`);
}
```

In the above example, the expression `a + b` will evaluate to `30` and be coerced into `true` in the `if` statement, meaning that the `console.log` will be executed.

```js
const str = '';
if (str) {
  console.log('hello northcoders!');
}
```

In this above context, the `console.log` will not be executed as `str` is assigned a value of `""` and this is **falsy**. When used in the `if` statement here, the empty string will be coerced into `false` and therefore the code inside the block will not be executed.

Here are some useful explanations of [Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) and [Falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) from MDN.

## Logical operators

Sometimes a condition in a program will consist of multiple conditions. For example the condition that "a number is a positive integer" could be said to consist of two conditions: _"a number is positive"_ **and** _"a number is an integer"_. In this example, the word **and** is critical as it means that both conditions must hold true in order for the whole condition to be true.

### `&&` and `||`

In JavaScript `&&` is a logical operator, known as the **and** operator. Suppose we have two expressions that check something about a variable `a`:

```js
// condition 1 - check if a number is an integer
Number.isInteger(a);
```

```js
// condition 2 - check if a number is positive ( bigger than or equal to 0 )
a > 0;
```

Suppose now we want to create a new condition that depends on both condition 1 being `s` **and** condition 2 being `true`. This is condition can be created in JavaScript using the `&&` operator written in the following way:

```js
Number.isInteger(a) && a >= 0;
```

The condition above will only evaluate to `true` when both conditions, `Number.isInteger(a) > 0` and `a >= 0` are true, whilst the following using `||` (known as the **or** operator) would evaluate to `true` if either condition was true:

```js
Number.isInteger(a) || a >= 0;
```

### Ternary Operator

The Ternary Operator (also referred to as the [Conditional Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)) is different to the **and** and **or** operators, in that it has three parts instead of two, and is often used as a shortcut for an `if` statement: `condition ? execute if truthy : execute if falsy`

```js
const score = 4;
const result = score >= 5 ? 'Pass' : 'Fail';
console.log(result); // "Fail"
```

## Equality Operators

The [Strict Equality Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality) allows us to check whether two values are equal.

```js
console.log("hello" === "hello"); // true
console.log("hello" === "goodbye"); // false
```

The [Strict Inequality Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_inequality) allows us to check whether two values are NOT equal.

```js
console.log("hello" !== "hello"); // false
console.log("hello" !== "goodbye"); // true
```

Loose equality (`==` and `!=`) should be avoided for now, it tries to convert and compare values that are of different types, which can lead to difficult to spot bugs.

## Comparison Operators

A comparison operator allows us to compare two numerical values to check a particular relationship:

- statement: "10 is bigger than 11"

This statement can either be **true** or **false**. If we wanted to carry out this check with JavaScript we could write an expression like this:

- JavaScript expression: `10 < 11`, here we are using comparison operator: `<`. The 2 values on either side of the `<` operator will be checked in order to produce a **boolean value**.

```js
10 < 11;
// < is the "less than" comparison operator
// this expression evaluates to or "works out to have the value of" true
```

## Logical NOT `!` Operator

The [Logical NOT Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT) is used to change values from _truthy_ to _falsy_ and vice-versa, by using it before a value or expression.

```js
const a = true;
const b = false;
const c = 10 > 5;

console.log(!a); // false
console.log(!b); // true
console.log(!!a); // true
console.log(!c); // false
```
