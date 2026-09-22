# CSS

## Learning Objectives

- understand the different purposes of CSS in creating a web page
- understand how to link an internal CSS file to a HTML file
- understand how IDs and classes can be used to separate concerns
- understand CSS specificity

## What is CSS?

Cascading Style Sheets, or **CSS**, is a *style sheet language* that expresses the presentation of structured documents. A CSS file tells the browser how to display elements within the HTML document that links to it.

> [MDN: CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

> [W3Schools: CSS](https://www.w3schools.com/css/default.asp)

## Linking CSS to HTML

In order to render our CSS we need to create a link in our HTML file. This can be done by adding a `<link>` tag to our `<head>` tag like so:

```html
  <!DOCTYPE html>
  <html>
    <head>
      <link rel="stylesheet" href="mystyle.css">
    </head>
    <body>
      <h1>This is a heading</h1>
      <p>This is a paragraph.</p>
    </body>
  </html>
```
We just need to ensure that the `href` atrribute contains the correct file path to the CSS file.

## CSS Rulesets

A CSS ruleset defines the styling for a selected element or group of elements. Take a look at this example:

```css
p {
  color: red;
}
```

The name of the element at the beginning of the ruleset, in this case `p`, is the **selector**. All `<p>` tags in the HTML document will be targeted by this ruleset. The lines inside the braces that come after the selector are called **declarations**. In this particular ruleset, we want to affect the `color` **property**, and the **property value** we are assigning to it is `red`. You can have as many declarations inside the ruleset as you like.

CSS syntax has some rules to follow:

- the declaration has to be wrapped in braces `{}`
- separate the property from its value with a colon `:`
- separate each declaration with a semicolon `;` (semicolons aren't optional in CSS in the way that they're optional in JavaScript)

## The Cascade

The order in which you write your CSS rules matters. When two rulesets are applied to an element, the last one to appear in the CSS file will be the ruleset that's applied. This is called the *cascade*, the C in CSS. In the following example:

```css
p {
  color: red;
}

p {
  color: blue;
}
```

...the colour of the text in every `p` tag in the HTML will be **blue**.

> [MDN: Introducing the CSS Cascade](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade)

## ID's and Classes

In HTML we can apply either ID or class attributes to our tags like this:

```html
  <h1 class='main-header'></h1>
  <p id='intro-text'></p>
```

These can be referenced in our CSS file in order to apply styling to specific content. We may not always want *all* of our `<p>` tags to be styled the same way so this enables us to be more selective.

When referencing these attributes we need to use specific syntax. A class style is denoted with a `'.'` and an ID style is denoted with a `'#'` like this:

```css
// The full stop before the class denotes it is a class being referenced
  .main-header {
    border: 1px solid red;
    border-radius: 5px, 5px, 5px, 5px;
  }

// The hash here denotes it is an ID being referenced
  #intro-text {
    color: blue;
  }
```

## CSS Specificity

Consider the following situation:

```html
<article class='main-article'>
  <p>Hello and welcome to my site!</p>
  <p id='link'>Click here for more info...</p>
</article>
```

```css
  .main-article {
    color: red
  }

  #link {
    color: blue
  }
```
Here we have a conflict, the `<p>` tags are contained with an `<article>` tag and there is an id linked to one of those `<p>`.

Here we need to consider that CSS follows a *Specificity Hierarchy* and will evaluate in the following priority order from highest to lowest:

1 - Inline styles - Example: `<h1 style="color: pink;">`

2 - IDs - Example: #link

3 - Classes - Example: .main-article

4 - Elements- Example: h1, p

Meaning that in the above example the ID style instruction will supercede the class instruction.

## CSS Resets

Each browser - Chrome, Firefox, Edge and so on - will apply default styling to an HTML document if there is no CSS provided. However, default styling differs slightly from browser to browser. In order to have full control over our own CSS styles, so that our styles look as identical as possible across all browsers, it's a good idea to use **CSS resets**. This is a basic example of a reset, in which the margin and padding of all elements, denoted by the wildcard `*`, are set to 0:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

Because of the cascade, resets are always the first styles to appear at the top of a CSS file. That way, if we want to have different styles in a particular element, the later property will *override* the property in the reset.

## Further Reading

- [CSS Tricks](https://css-tricks.com/)
- [CSS Battle](https://cssbattle.dev/)
- [CSS Grid Garden](https://cssgridgarden.com/)
- [CSS Flexbox Froggy](https://flexboxfroggy.com/)