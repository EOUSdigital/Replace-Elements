# Module 07 – Lesson 06: Traversing the DOM – Elements

## Overview

In this lesson, you learn how to **move around the DOM tree starting from a known element**. Instead of always querying from `document`, you will:

- Go **up** to parent elements.
- Go **down** to children.
- Move **sideways** between siblings.
- Use `closest()` to walk **upwards by selector**.

This is essential for writing interactive, context-aware code (e.g., “from this clicked button, find its card, list, or section and update only that part of the UI”).

---

## Learning Objectives

By completing this lesson, you will be able to:

1. Use element traversal properties:
   - `parentElement`
   - `children`
   - `firstElementChild` / `lastElementChild`
   - `nextElementSibling` / `previousElementSibling`
2. Explain the difference between moving:
   - Up (`parentElement`, `closest`)
   - Down (`children`, `firstElementChild`, `lastElementChild`)
   - Sideways (`nextElementSibling`, `previousElementSibling`)
3. Use `Element.closest(selector)` to find the nearest ancestor that matches a CSS selector.
4. Combine traversal with loops to:
   - Start from one element (e.g., `.card.featured` or a button).
   - Find related elements around it.
   - Apply classes, styles, or data attributes to those related elements.
5. Describe how DOM traversal supports real application patterns like event delegation and component‑scoped updates.

---

## Prerequisites

Before starting this lesson, you should be comfortable with:

- Basic HTML structure (sections, lists, buttons, nested elements).
- Module 07 – Lesson 05:
  - Selecting multiple elements with `querySelectorAll`, `getElementsByClassName`, `getElementsByTagName`.
- JavaScript fundamentals:
  - Variables, conditionals, functions.
  - Loops (`for`, `for...of`, `forEach`).
- The idea of **NodeList** / **HTMLCollection** and converting them with `Array.from()`.

---

## Files in This Lesson

Suggested folder structure:

```text
module-07/
  lesson-06-traversing-dom-elements/
    index.html
    style.css
    app.js
    README.md
```

- **index.html** – Page with:
  - A hero heading for Lesson 06.
  - A simple navigation list (`.nav-link .item`).
  - Two task lists (e.g., “New Tasks” and “My Tasks”).
  - A grid section with `.card` and `.card.featured`.
  - A section with buttons (`.btn`).
- **style.css** – Base layout + highlighting classes (e.g. `.sibling-highlight`, `.sibling-strong`, `.section-active`, `.grid-relative`).
- **app.js** – Lesson 06 logic (Tasks 1–4).
- **README.md** – This file.

---

## Setup & How to Run

1. Open the `lesson-06-traversing-dom-elements` folder in your editor.
2. Open `index.html` in your browser:
   - Double-click the file, or
   - Use a local dev server such as VS Code’s Live Server extension.
3. Ensure `app.js` is linked correctly in `index.html`:

   ```html
   <script type="module" src="./app.js"></script>
   ```

4. Open the browser DevTools console to see logs from the traversal exercises.

---

## Core Concepts

### 1. Moving Up: `parentElement`

```js
const featuredCard = document.querySelector(".card.featured");
const gridSection = featuredCard.parentElement; // direct parent element
```

- `parentElement` gives you the **immediate parent element**.
- Returns `null` if there is no parent or if the parent is not an element.

Use it when you want to move **one level up** from a known element.

---

### 2. Moving Down: `children`, `firstElementChild`, `lastElementChild`

```js
const gridSection = document.querySelector(".grid");

const children = gridSection.children;        // HTMLCollection of direct child elements
const firstCard = gridSection.firstElementChild;
const lastCard  = gridSection.lastElementChild;
```

- `children` → all direct child **elements** (no text nodes).
- `firstElementChild` → first child element or `null`.
- `lastElementChild` → last child element or `null`.

These are used when you know the container and want to inspect or operate on its immediate contents.

---

### 3. Moving Sideways: `nextElementSibling`, `previousElementSibling`

```js
const firstTask = document.querySelector("#section4 .tasks .task");

const secondTask = firstTask.nextElementSibling;
const thirdTask  = secondTask?.nextElementSibling || null;
```

- `nextElementSibling` → the next sibling element at the same level, or `null`.
- `previousElementSibling` → the previous sibling element, or `null`.

Use these to walk along a list or group of siblings **without re-querying** the whole document.

---

### 4. Walking Up by Selector: `closest(selector)`

```js
const saveButton = document.querySelector("#section2 .btn");

const buttonSection = saveButton.closest("section");   // finds nearest ancestor <section>
const mainContainer = saveButton.closest("#main");     // finds nearest ancestor with id="main"
```

- Starts from the element itself, then moves **upwards** through ancestors.
- Returns the **first** ancestor (or the element itself) that matches the selector.
- Returns `null` if there is no match.

Use `closest()` instead of manually chaining `parentElement.parentElement…`, and instead of a global `document.querySelector` when your starting point is a known element (often from `event.target`).

---

## Guided Practice – Using Your Current HTML

These tasks assume an HTML structure similar to:

- A grid section with `.grid` and `.card` / `.card.featured`.
- A “My Tasks” section (`#section4`) containing a `.tasks` list with `.task` items.
- A button section (`#section2`) containing `.btn` buttons.

Implement the following in `app.js`.

### Task 1 – Parent and Children (Grid / Cards)

1. Select the section with the cards:

   ```js
   const gridSection = document.querySelector(".grid");
   ```

2. If it exists, get and log its direct children:

   ```js
   if (gridSection) {
     const gridChildren = gridSection.children;
     console.log("Grid children:", gridChildren);
   }
   ```

3. Still inside the same `if` block, log the first and last child elements:

   ```js
   console.log("First card:", gridSection.firstElementChild);
   console.log("Last card:", gridSection.lastElementChild);
   ```

### Task 2 – Sibling Traversal in “My Tasks”

1. Select the first task from the “My Tasks” list (for example, in `#section4`):

   ```js
   const firstTask = document.querySelector("#section4 .tasks .task");
   ```

2. Find its next siblings:

   ```js
   if (firstTask) {
     const secondTask = firstTask.nextElementSibling;
     const thirdTask  = secondTask?.nextElementSibling || null;
   }
   ```

3. Add visual classes (defined in CSS) to the 2nd and 3rd tasks:

   ```js
   if (secondTask) {
     secondTask.classList.add("sibling-highlight");
   }

   if (thirdTask) {
     thirdTask.classList.add("sibling-strong");
   }
   ```

### Task 3 – Using `closest()` from a Button

1. Select one of the buttons (e.g. the first `.btn` inside `#section2`):

   ```js
   const saveButton = document.querySelector("#section2 .btn");
   ```

2. Use `closest()` to find the nearest ancestor `section` and log it:

   ```js
   if (saveButton) {
     const buttonSection = saveButton.closest("section");
     console.log("Button section:", buttonSection);
   }
   ```

3. Add a class `.section-active` to that section:

   ```js
   if (buttonSection) {
     buttonSection.classList.add("section-active");
   }
   ```

### Task 4 – Combine Traversal and Loop (Featured Card → All Cards)

1. Select the featured card:

   ```js
   const featuredCard = document.querySelector(".card.featured");
   ```

2. From it, get the parent `.grid`:

   ```js
   if (featuredCard) {
     const grid = featuredCard.closest(".grid");
   }
   ```

3. From that grid:

   - Get all direct children via `.children`.
   - Convert them to an array.
   - For each card, add:
     - a class `.grid-relative`
     - a data attribute `data-from="featured"`
     - a data attribute `data-index-from-featured="<index>"`

   Example implementation:

   ```js
   if (featuredCard) {
     const grid = featuredCard.closest(".grid");

     if (grid) {
       const cardsFromGrid = Array.from(grid.children);

       cardsFromGrid.forEach((card, index) => {
         card.classList.add("grid-relative");
         card.dataset.from = "featured";
         card.dataset.indexFromFeatured = index;
       });
     }
   }
   ```

---

## Optional Mini‑Challenge – Card Scoped Actions

Extend your page with a button inside each card, for example:

```html
<article class="card">
  <h2 class="card-title">Card A</h2>
  <button class="card-btn">Select</button>
</article>
```

Then in `app.js`:

1. Add a single event listener to the grid section:

   ```js
   const gridSection = document.querySelector(".grid");

   gridSection.addEventListener("click", (event) => {
     const button = event.target.closest(".card-btn");
     if (!button) return;

     const card = button.closest(".card");
     // Do something with this specific card
   });
   ```

2. Inside the handler:
   - Use `closest(".card")` to get the card.
   - Toggle a class like `.card-selected` on that card only.
   - Optionally log or display which card was selected using a data attribute or the title.

This challenge directly connects traversal to a prevalent pattern: **event delegation + component-scoped updates**.

---

## Knowledge Check

Use these questions to confirm your understanding (you can write answers in your study journal):

1. In your own words, what is the difference between:
   - `parentElement` and `children`
   - `firstElementChild` and `nextElementSibling`
2. When would you prefer to use `closest(selector)` instead of:
   - Chaining `parentElement.parentElement…`
   - A global `document.querySelector` call?
3. Describe a real application scenario where DOM traversal is essential, for example:
   - Clicking a button inside a card to update that card only.
   - Clicking a list item and highlighting only items in the same list.
   - Handling a click on a table row using only one event listener on the table.
