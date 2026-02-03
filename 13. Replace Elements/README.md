# 🟦 Module 07 — DOM Manipulation  
## Lesson 13: Replace Elements

This lesson teaches you how to **replace DOM elements** safely and how to keep UI behavior working after replacements by using **event delegation** and **behavior hooks**.

---

## Learning goals

By the end of Lesson 13, you should be able to:

- Replace an existing element with a new element using:
  - `oldEl.replaceWith(newEl)`
  - `parent.replaceChild(newEl, oldEl)`
- Explain what gets lost when you replace an element (the old node is removed from the DOM)
- Preserve essential “hooks” during replacement, such as:
  - identity (`data-id`)
  - state (classes, `aria-*`)
  - behavior hooks (`data-action`)
- Implement **one** delegated click handler using `closest()` and `data-action`
- Ensure replaced elements keep their delete button by using a helper `ensureDeleteButton(...)`

---

## Core concepts

### 1) What “replace” means
Replacing changes the DOM tree:

- The old element is removed from its parent
- The new element takes its place in the same position

This is different from editing text or attributes. It swaps **whole nodes**.

### 2) Two main APIs for replacement

#### A) `replaceWith` (simple)
```js
oldEl.replaceWith(newEl);
```

#### B) `replaceChild` (parent-controlled)
```js
parent.replaceChild(newEl, oldEl);
```

Both do the same job. Use the one that fits your code structure.

### 3) What replacement breaks
If you add event listeners directly on an element and then replace it, the new element will **not** inherit those listeners.

Solution: attach **one listener on a parent** (event delegation).

---

## Exercise A — Replace “Task 2” and preserve `data-id`

### Step 1: Ensure each task has a `data-id`
```js
const ul = document.querySelector("#section3 .tasks");
const tasks = ul.querySelectorAll("li.task");

tasks.forEach((li, i) => {
  if (!li.dataset.id) li.dataset.id = String(i + 1);
});
```

### Step 2: Replace the second task and preserve hooks
```js
const oldEl = ul.querySelectorAll("li.task")[1]; // Task 2

const newEl = document.createElement("li");
newEl.className = oldEl.className;      // preserve classes/state
newEl.dataset.id = oldEl.dataset.id;    // preserve identity
newEl.textContent = "✅ Replaced Task 2";

oldEl.replaceWith(newEl);
```

---

## Exercise B — Delete tasks using ONE delegated click handler

### Why delegation?
If tasks are replaced, direct per-button listeners can be lost or duplicated.
Delegation keeps behavior stable because the listener stays on the parent list.

### Behavior hook pattern
Use `data-action` for behavior and a class for styling:

- `data-action="delete"` → JavaScript behavior
- `.btn-delete` → CSS styling

### Helper: `ensureDeleteButton(li)`
```js
function ensureDeleteButton(li) {
  if (!li.querySelector("[data-action='delete']")) {
    const btn = document.createElement("button");
    btn.dataset.action = "delete"; // behavior hook
    btn.className = "btn-delete";  // styling hook
    btn.textContent = "Delete";
    li.append(btn);
  }
}
```

### Add delete buttons to all tasks
```js
const tasks = ul.querySelectorAll("li.task");
tasks.forEach(ensureDeleteButton);
```

### One delegated click listener (required)
```js
ul.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action='delete']");
  if (!btn) return;

  const taskItem = btn.closest("li.task");
  if (taskItem) taskItem.remove();
});
```

---

## Important notes (common pitfalls)

- `querySelector()` returns **one** element, not a list  
  Use `querySelectorAll()` when you need indexing: `[1]` for Task 2.
- `[data-action='delete']` only matches if the attribute exists on the button.
- CSS cannot style text nodes inserted by `insertAdjacentText` (from Lesson 11).
- After replacing a task, you must ensure it still has the delete button:
  ```js
  ensureDeleteButton(newEl);
  ```

---

## Optional CSS for `.btn-delete`
Add this to `style.css` if you want the delete button to look consistent:

```css
.btn-delete {
  margin-left: 0.75rem;
  padding: 0.25rem 0.6rem;
  border: 1px solid #babfc3;
  border-radius: 0.3rem;
  background: #fff;
  cursor: pointer;
  font-size: 0.9rem;
}
```

---

## Self-check questions

1) What is the difference between replacing an element and changing its text?
2) Why do direct event listeners not “carry over” when you replace a node?
3) Why is `data-action` a good behavior hook for delegated click handling?
4) What is the difference between `nextSibling` and `nextElementSibling`?

---

## What to commit/save for Lesson 13

- ✅ Replacement code for Task 2 preserving `data-id` and classes
- ✅ `ensureDeleteButton(li)` helper
- ✅ One delegated `click` listener on the list (`ul`)
- ✅ Optional `.btn-delete` styles in `style.css`

---

# Author

The project is Copyright (C) 2021-2025 EOUSdigital

This software is provided as source‑available and is not open source under the **OSI definition**.
You are granted permission to use, copy, and modify this software for personal, educational, or non‑commercial research purposes only.
Any commercial use, including but not limited to using this software or any derivative work in a product or service that is sold, monetized, or used internally by a for‑profit organization, is strictly prohibited without a separate written commercial license from the author.
Proper credit to the original author and a copy of this license must be included with any distribution or derivative work.
See the **LICENSE** file for full details.