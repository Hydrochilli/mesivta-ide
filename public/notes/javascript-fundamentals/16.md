# HTML

## Learning objectives

- Understand the standard layout of a HTML document.
- Understand how to identify different elements within a Web page.
- Understand how to use the following HTML tags: `h1`, `h2`, `p`, `ul`, `ol`, `li`.

## What is HTML?

HyperText Markup Language, or **HTML**, is the standard markup language for creating Web pages. A *markup language* uses tags to identify structure and elements within a document. Each element in an HTML document tells the browser how to display the contents of that document.

There is an almost endless amount of tags available for various different purposes in HTML, far too many to memorise and so documentation will be your best friend. Here are a couple of examples to bookmark:

> [MDN: HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

> [W3Schools: HTML](https://www.w3schools.com/html/default.asp)

## Standard Structure

In general, every HTML file we create will follow a standard structure:

```html
<!DOCTYPE html>
<html lang='en'>
    <head>
        <title>Title goes here</title>
    </head>
    <body>

    </body>
</html>
```
- **The `<!DOCTYPE>` tag**: This tag needs to be at the top of every HTML file and helps the browser to display the web page correctly in HTML.
- **The `<html>` tag**: This contains everything except for the `<!DOCTYPE>` tag, this defines that the scope of the project as being written in HTML and sets the base written language e.g. `'en'` for English.
- **The `<head>` tag**: This is where we define the title of the document using the `<title>` tag, this is what appears on the tab on the browser. The `<head>` tag can also contain more information which we will explore more in the CSS notes.
- **The `<body>` tag**: This is where we build our main HTML information such as our `<p>`, `<h1>`, `<li>` tags etc and therefore where we will spend the majority of our time.

## HTML tags and examples

HTML labels its elements with tags, which are identified by the angle brackets around them. Most HTML elements have a start tag, followed by content, and then an end tag.

Some HTML tags are *self-closing*. They end with `/>` instead of just `>`.

Here are a few examples of some common HTML tags you will probably end up using often:

```html
  <h1>I am the most important header!</h1>
```
This `<h1>` tag represents the most important header for our web page and will render as the largest header, this is most likely our page name such as: `'Google'`.


```html
  <h2>I am the second most important header!</h2>
```
This `<h2>` tag represents the second most important header and will render slightly smaller than a `<h1>`. *Note: `heading tags` come in different sizes from `<h1>` all the way to `<h6>` and should always be written in descending order through our page.

```html
  <p>
    I am a paragraph!
  </p>
```
This `<p>` tag represents a paragraph. Whenever you see a block of text on a page this is usually contained within this tag.

```html
  <ul>
    <li>I am the first list item</li>
    <li>I am the second list item</li>
  </ul>
```
This `<ul>` tag represents an unordered list and contains our list elements represented by the `<li>` tags which in turn contain our content. This will render on the page initially as bullet points but can be styled if we so choose using CSS which we will come onto in another section.

It is also possible to render an ordered list if you so choose using a `<ol>` tag.

```html
  <img src="dog-image.png" alt="labrador holding a red ball in its mouth, sitting in the garden on a sunny day" />
```
This `<img>` tag is how we can render images to our page. This is structured slightly differently to previous tags we have shown you.

- Firstly it is a *self-closing tag* meaning it does not have a separate open and closing tag. They end with `/>` instead of just `>`.

- Secondly, inside this tag contains the attributes we can assign to this tag. In this case we have `src` and `alt` to fill in.

The `src` attribute is used to define the image you want to render, this could the name of a file contained within the project directory or an external link to an image.

The `alt` attribute is used to define a description of the image, this is crucial for two reasons:
- This text will display if the image fails to load.
- For accessibility purposes for users who may be using screen readers to navigate your page.

## Semantic HTML vs non-semantic HTML

Some HTML tag names describe the content that's inside them. We call these **semantic** tags - tags such as `<article>`, `<header>` and `<form>`. Other tags are more generic, and neither the developer nor the browser can tell what the content is from the tag name - these are **non-semantic** tags, such as `<div>` and `<span>`.

Using semantic HTML elements wherever possible has a lot of benefits for both users and developers. For example, using semantic elements makes it easier for search engines to make sense of the page content, so that its search results are more relevant. Semantic HTML is also incredibly useful for accessibility purposes; screen readers and assistive technologies can tell which elements have the content that's most useful for the user.

> [W3Schools: Semantic HTML](https://www.w3schools.com/html/html5_semantic_elements.asp)