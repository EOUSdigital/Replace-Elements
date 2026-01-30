# Module 07 – Lesson 09: innerHTML vs createElement()

## Overview

In earlier lessons, you learned how to:

- Select elements (`querySelector`, `querySelectorAll`)
- Traverse the DOM (`parentElement`, `children`, `childNodes`, `nextElementSibling`, etc.)
- Create and insert new elements (`createElement`, `append`, `prepend`)

In this lesson, you compare **two different ways** of building and updating the DOM:

1. Using **`innerHTML`** – string-based updates.
2. Using **`createElement` + DOM methods** – node-based, structured updates.

You will:

- See how `innerHTML` wipes and replaces existing child nodes.
- Observe how it interacts with event listeners.
- Contrast `innerHTML` with `createElement` + `append/prepend` for building lists.
- Implement a small, reusable `renderTasks` helper that renders list items from data.

---

## Learning Objectives

By the end of this lesson, you should be able to:

1. Explain what `element.innerHTML = "..."` does to existing child nodes.
2. Describe the differences between:
   - `innerHTML` updates, and
   - `createElement` + `append/prepend` updates.
3. Identify cases where `innerHTML` is **risky** or best avoided:
   - Security (XSS)
   - Losing event listeners or state
   - Large or frequently updated lists
4. Identify cases where `innerHTML` is still **acceptable or convenient**.
5. Use `createElement` + `append` to rebuild lists from arrays.
6. Implement a `renderTasks(listElement, tasksArray)` helper that renders an array of strings into a `<ul>` as `<li>` elements.

---

## Prerequisites

Before working through this lesson, you should be comfortable with:

- Basic DOM selection:
  - `document.querySelector`
  - `document.querySelectorAll`
- DOM traversal:
  - `parentElement`, `children`, `childNodes`
  - `firstElementChild`, `nextElementSibling`
- Creating and inserting elements:
  - `document.createElement`
  - `append`, `prepend`
- Arrays and loops:
  - `forEach`
- Using the browser DevTools console.

---

## Files in This Lesson

Suggested folder structure:

```text
module-07/
  lesson-09-innerhtml-vs-createelement/
    index.html
    style.css
    app.js
    README.md
```

- **index.html** – Same layout used in previous lessons, with:
  - `#section1` – navigation `<ul class="nav-link">`.
  - `#section3` – “New Tasks” section with `<ul class="tasks">`.
  - `#section4` – “My Tasks” section with `<ul class="tasks">`.
  - `#section5.grid` – cards (`<article class="card">` with `.card-title`).
  - `#section2` – buttons (`.btn`).
- **style.css** – Shared styles from previous lessons (you may add `.task--selected` to visualise selection).
- **app.js** – Lesson 09 logic (Tasks 1–5).
- **README.md** – This file.

Ensure `index.html` links to `app.js`:

```html
<script type="module" src="./app.js"></script>
```

---

## Setup & How to Run

1. Open the `lesson-09-innerhtml-vs-createelement` folder in your editor.
2. Open `index.html` in your browser:
   - Double-click the file, or
   - Use a local dev server such as VS Code Live Server.
3. Open the DevTools console (F12 / Ctrl+Shift+I).
4. Refresh after changes to `app.js` and observe how the lists in Section 3 and Section 4 change.

---

## Core Concepts

### 1. `innerHTML` – String-Based Updates

```js
const list = document.querySelector(".tasks");

list.innerHTML = `
  <li class="task">Task A</li>
  <li class="task">Task B</li>
`;
```

When you set `element.innerHTML = "..."`:

- The browser **removes all existing child nodes** of `element`.
- It then **parses the string as HTML** and creates a new DOM subtree.
- The previous children (and any event listeners attached directly to them) are **destroyed**.

It is convenient, but has important side effects.

---

### 2. `createElement` + `append` / `prepend` – Node-Based Updates

```js
const list = document.querySelector(".tasks");

const li = document.createElement("li");
li.classList.add("task");
li.textContent = "Task created via JS";

list.append(li);
```

This approach:

- Works with real DOM **nodes**, not HTML strings.
- Lets you build elements step-by-step:
  - Set classes, text, attributes, and dataset.
- Is easier to combine with event listeners and reusable “component” functions.
- Does **not** destroy the entire content of a container when you add one new item.

---

### 3. Event Listeners and `innerHTML`

A key difference:

- If you attach a listener directly to a child node (e.g. each `<li>`), then replace the parent’s `innerHTML`, those child nodes are destroyed and their listeners are lost.
- If you attach one listener on the **parent** (e.g. `<ul>`) and use **event delegation** (`event.target.closest(".task")`), the parent node remains the same, so the listener continues to work even after replacing `innerHTML` of its children.

This is why delegated listeners are often more robust.

---

### 4. `innerHTML +=` vs `append`

These two lines both *appear* to “add an item”:

```js
list.innerHTML += `<li class="task">New task</li>`;

const li = document.createElement("li");
li.classList.add("task");
li.textContent = "New task";
list.append(li);
```

However:

- `innerHTML +=`:
  - Reads the current HTML string.
  - Concatenates the new HTML string.
  - Re-parses the entire result and recreates all child nodes.
- `append`:
  - Creates **one new node**.
  - Appends it to the existing DOM tree without reparsing everything.

For small demos it may not matter, but for large or frequent updates it does.

---

### 5. Rendering From Data and `renderTasks`

Building lists from arrays is a first step toward data-driven UIs:

```js
const tasksData = [
  "Learn innerHTML vs createElement",
  "Refactor list rendering logic",
  "Write README for Lesson 09",
];

const newTasksList = document.querySelector("#section3 .tasks");

if (newTasksList) {
  newTasksList.innerHTML = ""; // reset
  tasksData.forEach((text) => {
    const li = document.createElement("li");
    li.classList.add("task");
    li.textContent = text;
    newTasksList.append(li);
  });
}
```

You can then encapsulate this logic in a helper:

```js
function renderTasks(listElement, tasks) {
  if (!listElement) return;

  // Reset container:
  listElement.innerHTML = "";

  // Render each item:
  tasks.forEach((text) => {
    const li = document.createElement("li");
    li.classList.add("task");
    li.textContent = text;
    listElement.append(li);
  });
}
```

This creates a simple API:  
**“Given a list element and an array of strings, render the tasks into the DOM.”**

---

## Guided Practice – Using Your Current HTML

All tasks below live in `app.js` and rely on your existing `index.html` structure.

### Task 1 – Replace “New Tasks” with `innerHTML`

**Goal:** see how `innerHTML` wipes and replaces content.

1. Select the “New Tasks” list in Section 3:

   ```js
   const newTasksList = document.querySelector("#section3 .tasks");
   ```

2. Use `innerHTML` to completely replace its content:

   ```js
   if (newTasksList) {
     newTasksList.innerHTML = `
       <li class="task">Task A - From innerHTML</li>
       <li class="task">Task B - From innerHTML</li>
       <li class="task">Task C - From innerHTML</li>
     `;
   }
   ```

**Result:**  
The original “Task 1–4” items are removed and replaced by Task A–C.

---

### Task 2 – `innerHTML` and Event Listeners (Why It Is Risky)

**Goal:** understand that `innerHTML` destroys existing nodes and their listeners.

1. Select the “My Tasks” list in Section 4:

   ```js
   const myTasksList = document.querySelector("#section4 .tasks");
   ```

2. Add a **delegated** click listener on the `<ul>`:

   ```js
   if (myTasksList) {
     myTasksList.addEventListener("click", (event) => {
       const li = event.target.closest(".task");
       if (!li) return;
       li.classList.toggle("task--selected");
     });
   }
   ```

   In your CSS, you can style `.task--selected` (e.g. background, bold text).

3. Now, later in the file, overwrite `innerHTML` of the same list:

   ```js
   if (myTasksList) {
     myTasksList.innerHTML = `
       <li class="task">New Task 1 - Rewritten via innerHTML</li>
       <li class="task">New Task 2 - Rewritten via innerHTML</li>
     `;
   }
   ```

4. Test in the browser:

   - Click new tasks in “My Tasks”.
   - They still toggle `.task--selected`.

**Key insight:**

- The listener was attached to the **parent** `<ul>`, which is still the same node.
- If listeners had been attached directly to each `<li>`, they would have been lost when `innerHTML` replaced them.

---

### Task 3 – `innerHTML +=` vs `append`

**Goal:** see the difference between string-based appending and node-based appending.

1. After Task 1’s `innerHTML` replacement on `newTasksList`, append a new item using `innerHTML +=`:

   ```js
   if (newTasksList) {
     newTasksList.innerHTML += `
       <li class="task">Task D - Added with innerHTML +=</li>
     `;
   }
   ```

2. Then add another item using `createElement` + `append`:

   ```js
   if (newTasksList) {
     const li = document.createElement("li");
     li.classList.add("task");
     li.textContent = "Task E - Added with createElement + append";
     newTasksList.append(li);
   }
   ```

**Result:**

- You briefly see A–E in Section 3.
- Under the hood, `innerHTML +=` re-parses the entire content, while `append` adds a single node.

---

### Task 4 – Rebuild “New Tasks” Using `createElement` From an Array

**Goal:** reset a list and rebuild it from data using structured DOM methods.

1. Define an array of tasks:

   ```js
   const tasksData = [
     "Learn innerHTML vs createElement",
     "Refactor list rendering logic",
     "Write README for Lesson 09",
   ];
   ```

2. Clear the “New Tasks” list:

   ```js
   if (newTasksList) {
     newTasksList.innerHTML = ""; // wipe
   }
   ```

3. Rebuild the list using `createElement`:

   ```js
   if (newTasksList) {
     tasksData.forEach((text) => {
       const li = document.createElement("li");
       li.classList.add("task");
       li.textContent = text;
       newTasksList.append(li);
     });
   }
   ```

**Result:**

- The list in Section 3 now shows the three strings from `tasksData`.
- Earlier A–E items are gone because the list was reset.

---

### Task 5 – Helper: `renderTasks(listElement, tasksArray)`

**Goal:** extract a reusable list renderer using node-based creation.

1. Implement the helper:

   ```js
   function renderTasks(listElement, tasks) {
     if (!listElement) return;

     // Reset:
     listElement.innerHTML = "";

     // Render:
     tasks.forEach((text) => {
       const li = document.createElement("li");
       li.classList.add("task");
       li.textContent = text;
       listElement.append(li);
     });
   }
   ```

2. Use it with example data:

   ```js
   const newTasks = [
     "Task 1 - Render via helper",
     "Task 2 - Render via helper",
   ];

   // Example calls (uncomment to see them override previous content):
   // renderTasks(newTasksList, newTasks);
   // renderTasks(myTasksList, newTasks);
   ```

**Result:**

- When you call `renderTasks`, the target list is cleared and repopulated from the array.
- You now have a small, reusable “renderer” function for lists.

---

## Reflection & Checkpoint

You can answer these in your study journal; share them if you want feedback.

1. In your own words, what does `element.innerHTML = "..."` do to existing child nodes?
   - Think about: node removal, replacement, and event listeners.

2. What are the main differences between:
   - `innerHTML` updates (string-based, reparse/rebuild), and
   - `createElement` + `append/prepend` updates (node-based, incremental)?

3. In what situations would you **avoid** `innerHTML`?
   - Security concerns (user input / XSS).
   - Lists or components with event listeners attached to child nodes.
   - Large or frequently updated UIs.

4. When could `innerHTML` still be acceptable or convenient?
   - Example scenarios involving:
     - Small static snippets.
     - A full, sanitized HTML snippet (e.g. a Markdown preview).
     - Simple resets in demos or admin tools.

5. How would you design a real app list renderer?
   - Would you:
     - Use `innerHTML` everywhere?
     - Use `createElement` everywhere?
     - Or combine them (e.g. `innerHTML = ""` for reset, `createElement` + `append` to build items)?
   - Write down your “rule of thumb” for future projects.
