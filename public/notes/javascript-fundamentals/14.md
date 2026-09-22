# Array Methods

## Learning Objectives

- know how to use map, filter and forEach array methods
- understand when to use map, filter and forEach array methods

## What even are JavaScript Array Methods?

Now that you're getting started with the basics of JavaScript, at some point soon you'll likely come across three seemingly magical words in many code examples: `.forEach()`, `.map()` and `.filter()`.

When you go to loop through (or _iterate_) through an array, the first thing you think of is probably a `for` loop.

`.forEach()`, `.map()` and `.filter()` are all just other ways of _iterating_ through arrays to perform a specific task on each _element_ of the array, and are called methods.

## Why should we use Array Methods?

- We write less code, leaving less opportunity for bugs
- `.forEach()` literally says what it is going to do (similarly `.map()` and `.filter()` do pretty much what they say on the tin!)
- It is more readable and intuitive than a `for` loop - we can name the variable representing each element of the array. For example, `number` is much nicer to read than `numbers[i]`, and if it was an array of people, you could name the parameter `person` rather than having to use `people[i]`

## .forEach()

The `.forEach()` method is the most similar to the for loop. The two examples of code below essentially do the same thing:

```javascript
const numbers = [1, 2, 3, 4, 5];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}

// You will see 1, 2, 3, 4, 5 on separate lines of the console
```

```javascript
const numbers = [1, 2, 3, 4, 5];

numbers.forEach(function(number) {
  console.log(number);
});

// You will see 1, 2, 3, 4, 5 on separate lines of the console
```

The function inside the parentheses of the `.forEach()` is simply executed "for each" element of the array.

### When should we use this?

`.forEach()` is a very generic array method. We should try to only use it when we want to perform a specific action for each element of an array.

### A common pitfall

`.forEach()` does not create a new array... in fact, it returns `undefined`!

That means if we try to do something like this...

```javascript
const numbers = [2, 10, 3];
const doubled = numbers.forEach(function (number) {
  return number * 2;
});
console.log(doubled);
```

We get a log of `undefined`.

## .map()

`.map()` is a lot like `.forEach()`, but it very helpfully creates and returns a new array as the below example shows:

```javascript
const numbers = [2, 10, 3];
const doubled = numbers.map(function (number) {
  return number * 2;
});
console.log(doubled); // [4, 20, 6]
```

Unlike forEach, the code above returns a new array containing doubled numbers.

### When should I use this?

Use `.map()` whenever you need to update data inside an array (by _mapping_ over it!).

For example, perhaps you have a list of names and you want to capitalise them all. You might write:

```javascript
const names = ['clara', 'ishmael', 'zehra', 'luke'];
const capitalised = names.map(function (name) {
  return name[0].toUpperCase() + name.slice(1);
});
console.log(capitalised); // ["Clara", "Ishmael", "Zehra", "Luke"]
```

`.map()` will _always_ return a new array of teh same length as the original!

## .filter()

`.filter()` loops through (or iterates) through data, and filters out data that doesn't match the criteria that we set. We define what those criteria are through a truth test inside a function.

For example, in the below case, we want to filter through an array to create a new array with only the three-letter words.

```javascript
const words = [
  'cat',
  'discombobulate',
  'dog',
  'antidisestablishmentarianism',
  'pusillanimous',
  'owl',
];
const threeLetterWords = words.filter(function (word) {
  return word.length === 3;
});
console.log(threeLetterWords); // ["cat", "dog", "owl"]
```

For every element in the array, the function will be called. The function should return either true or false, to tell JavaScript whether that element should be included in the resulting array or not.

### When should I use this?

This one is pretty straightforward: use it when you want to filter an array based on criteria you want to define yourself.

For example, perhaps you have an array of objects which represent people, and you want to create a new list of only the people who live in Leeds:

```javascript
const people = [
  { name: 'Charlie', age: 24, home: 'Leeds' },
  { name: 'Kit', age: 40, home: 'Sheffield' },
  { name: 'Noah', age: 18, home: 'Liverpool' },
  { name: 'Gigi', age: 18, home: 'Leeds' },
  { name: 'Karolina', age: 30, home: 'Stockport' },
];
const peopleInLeeds = people.filter(function(person) {
  return person.home === 'Leeds';
});
console.log(peopleInLeeds);

/* [
    {name: "Charlie", age: 24, home: "Leeds"},
    {name: "Noah", age: 18, home: "Leeds"},
] */
```
