# Objects

Arrays are ordered collections of data we can use for storing multiple items. There are limitations to the use of ordered collections:s

```js
const details = ['Patricia', 'Lloyd', 55, 'St Marys', 'Leigh', 'Bolton'];
```

The array `details` stores multiple values representing details of a particular person. However, it becomes increasingly impossible to work out what the data represents as the only way of acccessing items is by their index position. We could instead use a `JavaScript` object in order to store the data values. An object is a collection of key-value pairs called **properties**. Below is an object with some data:

```js
const details = {
  firstName: 'Patricia',
  lastName: 'Lloyd',
  age: 55,
  placeOfWork: 'St Marys',
};
```

---

## Accessing objects

### Dot notation

Objects access refers to the process of "looking up" or accessing property values using a property key. Suppose we have an object with 2 properties, `name` and `age`

```js
const person = {
  name: 'Anat',
  age: 24,
};
```

We can access the property value `"Anat"` by accessing the object with a property key:

```js
person.name; // evaluates to "Anat"
```

The above example shows dot notation where we access a property value by stating the name of an object writing a `.` and then adding a key after the dot. If an object is accessed with a key that is not present inside an object then this will evaluate to `undefined`.

```js
const person = {
  name: 'Anat',
  age: 24,
};

person.job; // will evaluate to undefined
```

### Dynamic access

Alternatively we could use a variable to access an object instead of dot notation. Consider the example below:

```js
const phoneBook = {
  anat: '07986538201',
  paul: '07891867541',
  foluso: '0789573421',
};
const name = 'paul';

phoneBook.name; // evaluates to undefined
phoneBook[name]; // evaluates to "07891867541"
```

In the above example the square brackets mean that the **value of the variable** is being evaluated and then used as the key to access the property value inside the object. Any JavaScript expression can be used inside square brackets and will be evaluated before being used as the key to access a property value.
