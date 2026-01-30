# Module 07 – Lesson 05: DOM Selectors – Multiple Elements

## Overview

This lesson introduces **multiple-element DOM selectors** and shows how to work with groups of elements in a clean, predictable way. You will build on your existing knowledge of arrays, loops, and single-element selectors to:

- Select many elements at once (e.g. all cards, all nav links, all list items).
- Iterate over them with different looping strategies.
- Apply bulk changes to content, styles, and classes.

By the end of this lesson you should be comfortable moving from *“change this one element”* to *“update this whole group of elements in a controlled way.”*

---

## Learning Objectives

By completing this lesson, you will be able to:

1. Use `document.querySelectorAll()` with CSS selectors to select multiple elements.
2. Use `document.getElementsByClassName()` and `document.getElementsByTagName()` and understand how they differ from `querySelectorAll()`.
3. Explain the difference between **NodeList** and **HTMLCollection**, including:
   - Static vs live collections.
   - Why you might convert them to real arrays.
4. Iterate over multiple elements using:
   - `forEach`
   - `for...of`
   - Classic `for` (optional)
5. Apply bulk DOM updates such as:
   - Updating text content with indices (e.g. numbered lists).
   - Adding/removing/toggling classes on groups of elements.
   - Applying inline styles programmatically.
6. Use `Array.from()` or the spread operator (`[...]`) to convert DOM collections into arrays and then use array methods such as `map`, `filter`, and `forEach`.

---

## Prerequisites

Before starting this lesson, you should be comfortable with:

- Basic HTML structure (tags, attributes, classes, IDs).
- JavaScript fundamentals (variables, functions, conditionals).
- Arrays and loops:
  - `for`
  - `for...of`
  - `forEach`
- Single-element DOM selection:
  - `document.getElementById()`
  - `document.querySelector()`

If any of these feel weak, briefly review the earlier lessons in Module 07 and your notes from Modules 4–6 (arrays and loops).

---

## Files in This Lesson

A typical folder structure for this lesson might look like:

```text
module-07/
  lesson-05-dom-selectors-multiple/
    index.html
    styles.css
    app.js
    README.md
```

- **index.html** – Base markup for testing selectors (lists, cards, nav links, etc.).
- **styles.css** – Simple styles plus any helper classes (e.g. `.highlight`, `.card--even`).
- **app.js** – All JavaScript for this lesson (selectors, loops, DOM updates).
- **README.md** – This file.

You can adapt the structure to match your own project, but keep the separation of concerns clear.

---

## Setup & How to Run

1. Open the project folder in your editor (e.g. VS Code).
2. Open `index.html` in a browser:
   - Either by double-clicking it, or
   - Using a local dev server (such as the VS Code Live Server extension).
3. Make sure `app.js` is correctly linked in `index.html`, e.g.:

   ```html
   <script src="app.js" defer></script>
   ```

4. Open the browser **DevTools console** to see logs and test your code interactively.

---

## Core Concepts

### 1. Selecting Multiple Elements

**`querySelectorAll`**

```js
const cards = document.querySelectorAll('.grid .card');
```

- Selects **all** elements that match the CSS selector.
- Returns a **NodeList** (static collection).

**`getElementsByClassName`**

```js
const buttons = document.getElementsByClassName('btn');
```

- Returns an **HTMLCollection** of all elements with the given class.
- Collection is **live** (it updates when the DOM changes).

**`getElementsByTagName`**

```js
const listItems = document.getElementsByTagName('li');
```

- Returns an **HTMLCollection** of all elements with the given tag name.
- Also **live**.

---

### 2. NodeList vs HTMLCollection

- Both are **array-like**: they have `.length` and can be indexed like `items[0]`.
- They are **not** full arrays.

Key differences:

- `NodeList` (from `querySelectorAll`):
  - Usually supports `.forEach` in modern browsers.
  - Is **static** (does not automatically reflect DOM changes after selection).

- `HTMLCollection` (from `getElementsByClassName`, `getElementsByTagName`):
  - Does **not** reliably support array methods (e.g. `forEach`, `map`, `filter`).
  - Is **live** (updates automatically when matching elements are added or removed).

To use powerful array methods (`map`, `filter`, etc.), convert collections into a real array:

```js
const itemsArray = Array.from(items);
// or
const itemsArray = [...items];
```

---

### 3. Looping Over Multiple Elements

Given:

```js
const items = document.querySelectorAll('.item');
```

**Using `forEach`:**

```js
items.forEach((item, index) => {
  item.textContent = `${index + 1}) ${item.textContent}`;
});
```

**Using `for...of`:**

```js
for (const item of items) {
  item.classList.add('highlight');
}
```

**Using `for...of` with index via `entries()`:**

```js
for (const [index, item] of items.entries()) {
  item.dataset.index = index;
}
```

---

### 4. Converting Collections to Arrays & Using `filter`

```js
const liCollection = document.getElementsByTagName('li');
const liArray = Array.from(liCollection);

const longItems = liArray.filter(li => li.textContent.length > 10);

longItems.forEach(li => {
  li.style.fontWeight = 'bold';
});
```

This pattern is important:

1. Select with `getElementsByTagName` or `getElementsByClassName`.
2. Convert to an array with `Array.from` (or spread).
3. Use array methods (`filter`, `map`, etc.) to process the elements.
4. Optionally loop again to apply DOM changes.

---

## Guided Practice Tasks

You can recreate or adapt the following tasks in `index.html` and `app.js`.

### Task 1 – Number and Highlight a List

HTML example:

```html
<ul class="tasks">
  <li class="task">Learn DOM selectors</li>
  <li class="task">Practice loops</li>
  <li class="task">Build a mini project</li>
  <li class="task">Review and refactor</li>
</ul>
```

**Steps:**

1. Select all `.task` elements using `querySelectorAll`.
2. Log each task’s text in the console.
3. Prefix each item with its index: `1) ...`, `2) ...`.
4. Add a `.highlight` class to every second item (`index` 1, 3, 5, …).

### Task 2 – Uppercase All `<li>` Elements

1. Use `getElementsByTagName('li')` to select all list items.
2. Convert the collection to an array.
3. Set `style.textTransform = 'uppercase'` for each item.

### Task 3 – Filter Long Items

1. Starting from the same `<li>` collection, convert it to an array.
2. Use `filter` to create a new array `longItems` where `textContent.length > 10`.
3. Apply a visual effect (e.g. `fontWeight = 'bold'` or a special class) only to `longItems`.

---

## Optional Mini-Challenge

Pick an area of your own project (for example, a cards grid or navigation bar) and:

1. Select all relevant elements:
   - All `.card` elements in a grid, or
   - All `.nav-link` elements in the header.
2. Use a loop (`forEach` or `for...of`) to:
   - Add a `data-index` attribute to each element.
   - Add a modifier class to even items (e.g. `.card--even`).
   - Update a child element’s text (e.g. `.card-title`) to include the index.
3. Observe the result in the browser and tweak styles in CSS.

This will help you connect the lesson exercises to a real, evolving project.

---

## Knowledge Check

Use these questions to confirm understanding (you can write answers in your study journal):

1. What is the main difference between `querySelector` and `querySelectorAll`?
2. Why might you convert a NodeList or HTMLCollection into a real array?
3. In your own words, what is the difference between a **static** collection and a **live** collection?
4. Give a real use case in your project where you would need to:
   - Select multiple elements, and
   - Apply changes to all of them in a loop.


