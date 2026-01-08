# Module 07 – Lesson 10: Refactor to Multiple Functions

## Overview

In previous lessons you focused on **DOM selection**, **traversal**, and **creating/updating elements** (including `innerHTML` vs `createElement`).  
In this lesson, the main goal is to take that working code and **refactor it into small, well‑named functions**.

You keep the same behaviour:

- Render two task lists (“New Tasks” and “My Tasks”) from data.
- Allow clicking tasks to toggle a selected state.

But you improve the structure:

- All initial data is defined at the top.
- DOM‑building logic is extracted into reusable helpers.
- Event wiring is in its own function.
- There is a single `init()` function that orchestrates everything.

This is an important step from “one long script” toward “structured application code”.

---

## Learning Objectives

By completing this lesson, you will be able to:

1. Explain why it is beneficial to refactor a long script into multiple small functions.
2. Store UI state as **data** (arrays) instead of hard‑coding content in the DOM or inline logic.
3. Implement small, focused helpers with a **single responsibility**, such as:
   - `createTaskItem(text)`
   - `renderTasks(listElement, tasks)`
   - `setupTaskSelection(listElement)`
4. Introduce an `init()` (and supporting functions) as the single entry point that:
   - Fetches DOM references.
   - Renders initial UI.
   - Attaches event listeners.
5. Recognise and reduce repetition by extracting shared behaviour into helpers.

---

## Prerequisites

Before starting this lesson, you should be comfortable with:

- Basic DOM manipulation:
  - `querySelector`, `querySelectorAll`
  - `createElement`, `append`
- Working with arrays and `forEach`.
- Event handling:
  - `addEventListener`
  - Using `event.target` and `closest`.
- The HTML and CSS structure used in Lessons 08–09.

---

## Files in This Lesson

Suggested folder structure:

```text
module-07/
  lesson-10-refactor-to-multiple-functions/
    index.html
    style.css
    app.js
    README.md
```

- **index.html** – Same structure as Lessons 08–09:
  - `#section3` – “New Tasks” section with `<ul class="tasks">`.
  - `#section4` – “My Tasks” section with `<ul class="tasks">`.
  - `#section1`, `#section2`, `#section5` – navigation, buttons, and cards (not changed by this lesson, but still present).
- **style.css** – Shared styling. You may add a `.task--selected` style to highlight selected items.
- **app.js** – Refactored, function‑based implementation for Lesson 10.
- **README.md** – This file.

Ensure `index.html` includes:

```html
<script type="module" src="./app.js"></script>
```

---

## Setup & How to Run

1. Copy your existing `index.html` and `style.css` from Lesson 09 into a new folder:
   - `lesson-10-refactor-to-multiple-functions`.
2. Update the heading in `index.html` to mention **Lesson 10. Refactor to Multiple Functions**.
3. Create a new `app.js` and paste in the refactored code (see below).
4. Open `index.html` in your browser (directly or via a local server).
5. Open DevTools if you want to inspect the DOM and console.
6. Click on tasks in “New Tasks” and “My Tasks” to confirm the behaviour.

---

## Core Concepts

### 1. Data at the Top

Instead of hard‑coding list items in the JavaScript logic, you keep the initial task content in arrays:

```js
// Data for New Tasks (Section 3)
const newTasksData = [
  "Learn innerHTML vs createElement",
  "Refactor list rendering logic",
  "Write README for Lesson 10",
];

// Data for My Tasks (Section 4)
const myTasksData = [
  "Learn DOM selectors",
  "Practice loops",
  "Build a mini project",
  "Review and refactor",
];
```

This makes it clear what the starting state is and allows you to reuse this data when rendering.

---

### 2. `createTaskItem(text)` – UI Factory

A small helper whose only job is to create a `<li>` element representing a task:

```js
function createTaskItem(text) {
  const li = document.createElement("li");
  li.classList.add("task");
  li.textContent = text;
  return li;
}
```

- Single responsibility: **build one task element**.
- No knowledge of where or how it will be used.

---

### 3. `renderTasks(listElement, tasks)` – Renderer

This helper takes a list element and an array of strings and renders them:

```js
function renderTasks(listElement, tasks) {
  if (!listElement) return;

  // Clear existing tasks:
  listElement.innerHTML = "";

  // Render from data:
  tasks.forEach((text) => {
    const li = createTaskItem(text);
    listElement.append(li);
  });
}
```

Responsibilities:

- **Clear** any previous content of the list.
- **Append** a new `<li>` for each entry in `tasks`.

Note that:

- It does not hard‑code which list (New/My) it is working on.
- It uses `createTaskItem` so you do not repeat `<li>` construction logic.

---

### 4. `setupTaskSelection(listElement)` – Event Wiring

This function attaches a **delegated click handler** to a task list:

```js
function setupTaskSelection(listElement) {
  if (!listElement) return;

  listElement.addEventListener("click", (event) => {
    const li = event.target.closest(".task");
    if (!li) return;
    li.classList.toggle("task--selected");
  });
}
```

- Single responsibility: **make tasks clickable/selectable** in the given list.
- Uses event delegation on the `<ul>` so it works even if items are re‑rendered.

You can then apply this behaviour to one or more lists (New Tasks, My Tasks, etc.).

---

### 5. `getDomRefs`, `initialiseLists`, `initialiseEvents`, and `init`

To keep your code organised, you separate “DOM queries”, “rendering”, and “events”:

```js
function getDomRefs() {
  return {
    newTasksList: document.querySelector("#section3 .tasks"),
    myTasksList: document.querySelector("#section4 .tasks"),
  };
}

function initialiseLists(dom) {
  renderTasks(dom.newTasksList, newTasksData);
  renderTasks(dom.myTasksList, myTasksData);
}

function initialiseEvents(dom) {
  setupTaskSelection(dom.myTasksList);
  setupTaskSelection(dom.newTasksList);
}

function init() {
  const dom = getDomRefs();
  initialiseLists(dom);
  initialiseEvents(dom);
}

// Run once
init();
```

This gives you:

- A **single entry point** (`init`) that clearly shows the startup flow.
- Internal functions with very specific responsibilities:
  - `getDomRefs` – select and bundle DOM elements.
  - `initialiseLists` – render initial tasks.
  - `initialiseEvents` – attach interactions.

---

## Final `app.js` (Lesson 10)

For reference, here is the complete version:

```js
"use strict";

//TODO 🟦 Module 7 - DOM Manipulation: Lesson 10. Refactor to Multiple Functions

// Task 1 – Start With Data at the Top

// Data for New Tasks (Section 3)
const newTasksData = [
  "Learn innerHTML vs createElement",
  "Refactor list rendering logic",
  "Write README for Lesson 10",
];

// Data for My Tasks (Section 4)
const myTasksData = [
  "Learn DOM selectors",
  "Practice loops",
  "Build a mini project",
  "Review and refactor",
];

// Task 2 – Extract createTaskItem (Pure-ish UI Factory)

function createTaskItem(text) {
  const li = document.createElement("li");
  li.classList.add("task");
  li.textContent = text;
  return li;
}

// Task 3 – Extract renderTasks(listElement, tasks)

function renderTasks(listElement, tasks) {
  if (!listElement) return;

  // Clear existing tasks:
  listElement.innerHTML = "";

  // Render from data:
  tasks.forEach((text) => {
    const li = createTaskItem(text);
    listElement.append(li);
  });
}

// Task 4 – Extract Event Wiring: setupTaskSelection(listElement)

function setupTaskSelection(listElement) {
  if (!listElement) return;

  listElement.addEventListener("click", (event) => {
    const li = event.target.closest(".task");
    if (!li) return;
    li.classList.toggle("task--selected");
  });
}

// Task 5 & 6 – init and separation of responsibilities

function getDomRefs() {
  return {
    newTasksList: document.querySelector("#section3 .tasks"),
    myTasksList: document.querySelector("#section4 .tasks"),
  };
}

function initialiseLists(dom) {
  renderTasks(dom.newTasksList, newTasksData);
  renderTasks(dom.myTasksList, myTasksData);
}

function initialiseEvents(dom) {
  setupTaskSelection(dom.myTasksList);
  setupTaskSelection(dom.newTasksList);
}

function init() {
  const dom = getDomRefs();
  initialiseLists(dom);
  initialiseEvents(dom);
}

// Run once
init();
```

---

## Reflection & Checkpoint

You can answer these in your study journal; share them if you want feedback.

1. In your own words, why is it useful to move from “a long top‑level script” to “multiple small functions”?
   - Think about readability, reuse, debugging, and future changes.

2. For each function (`createTaskItem`, `renderTasks`, `setupTaskSelection`, `getDomRefs`, `initialiseLists`, `initialiseEvents`, `init`):
   - What is its **single responsibility**?
   - What inputs (parameters) does it need?
   - What does it return (if anything)?

3. How does having a clear `init()` function make your code easier to:
   - Read,
   - Debug,
   - Extend later (e.g., adding buttons to add/remove tasks)?

4. Look at your final `app.js`:
   - Is there any repetitive code that could be extracted into another helper?
   - Is any function doing more than one job?  
     If yes, how would you split it?
