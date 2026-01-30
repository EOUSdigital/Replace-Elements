# 🟦 Module 07 — DOM Manipulation  
## Lesson 12: Custom `insertAfter()` Challenge

This lesson is a focused challenge: you will build your own **`insertAfter(referenceEl, newEl)`** helper and use it to insert a new DOM node **after** an existing node inside the same parent container.

---

## Learning goals

By the end of Lesson 12, you should be able to:

- Explain why “insert after” is implemented using **`insertBefore(..., referenceEl.nextSibling)`**
- Write a safe helper function with **input validation**
- Test DOM utilities reliably (module scope vs console)
- Explain `nextSibling` vs `nextElementSibling` and why whitespace can matter

---

## Key DOM idea: “Insert after” using `insertBefore`

There is no native `insertAfter()` method on DOM nodes.

To insert a node **after** another node:

1. Get the **parent** of the reference node.
2. Get the node that comes **next** after the reference node (`referenceEl.nextSibling`).
3. Insert the new node **before** that next node.

```js
parent.insertBefore(newEl, referenceEl.nextSibling);
```

Why it works:

- If `referenceEl.nextSibling` exists → `newEl` is inserted immediately after `referenceEl`.
- If `referenceEl.nextSibling` is `null` → `insertBefore(newEl, null)` appends to the end.

---

## Part A — Implement `insertAfter(referenceEl, newEl)`

### Requirements

- Validate inputs:
  - `referenceEl` must be an `Element`
  - `newEl` must be an `Element`
- Ensure `referenceEl` has a parent element
- Use:
  - `parent.insertBefore(newEl, referenceEl.nextSibling)`
- Return `newEl` (useful for testing)

### Reference implementation (final)

```js
function insertAfter(referenceEl, newEl) {
  if (!(referenceEl instanceof Element)) {
    throw new TypeError(
      `insertAfter: referenceEl must be an Element. Got: ${typeof referenceEl} (${referenceEl?.nodeName || "missing"}).`
    );
  }

  if (!(newEl instanceof Element)) {
    throw new TypeError(
      `insertAfter: newEl must be an Element. Got: ${typeof newEl} (${newEl?.nodeName || "missing"}).`
    );
  }

  const parent = referenceEl.parentElement;
  if (!parent) {
    throw new Error(
      `insertAfter: referenceEl has no parentElement. (${referenceEl?.nodeName || "missing"}).`
    );
  }

  parent.insertBefore(newEl, referenceEl.nextSibling);
  return newEl;
}
```

---

## Part B — Test it on your Lesson 11 layout

Recommended target: `#section3 .tasks` (New Tasks list).

```js
const ref = document.querySelector("#section3 .tasks .task"); // Task 1
const x = document.createElement("li");
x.className = "task";
x.textContent = "Inserted after Task 1";

insertAfter(ref, x);
```

Expected result: a new list item appears directly after “Task 1”.

---

## Debugging: ES modules and the console

Your script is loaded like this:

```html
<script type="module" src="./app.js"></script>
```

In ES modules, functions are **not global** by default. If you want to test from the browser console, expose your helper:

```js
window.insertAfter = insertAfter;
```

Then in the console:

```js
typeof window.insertAfter; // "function"
```

---

## Optional verification: “did the DOM change?”

This is a good diagnostic pattern when you suspect your DOM gets overwritten:

```js
window.addEventListener("DOMContentLoaded", () => {
  const ul = document.querySelector("#section3 .tasks");
  const ref = ul?.querySelector(".task");
  if (!ul || !ref) return;

  const x = document.createElement("li");
  x.className = "task";
  x.textContent = "Inserted after Task 1";

  insertAfter(ref, x);

  setTimeout(() => {
    console.log("After 1s children:", ul.children.length);
    console.log([...ul.children].map(li => li.textContent));
  }, 1000);
});
```

---

## Self-check questions (with correct answers)

1) **Why does `insertBefore(newEl, referenceEl.nextSibling)` insert after `referenceEl`?**  
Because “after `referenceEl`” is the same position as “before the node that comes next” within the same parent.

2) **What happens when `referenceEl.nextSibling` is `null`?**  
`referenceEl` is the last child; `insertBefore(newEl, null)` behaves like append, so `newEl` is added to the end.

3) **Why might `nextSibling` be a text node, and why is that still okay?**  
Whitespace (new lines/indentation) in HTML can become text nodes in `childNodes`. This is fine because `insertBefore` accepts any `Node`, so inserting before that text node still places the new element immediately after the reference element in the correct order.  
(If you want element-only behavior, use `nextElementSibling`.)

---

## Common mistakes checklist

- ❌ Using template literals with quotes instead of backticks  
  ✅ Use backticks: `` `...${value}...` ``

- ❌ Calling `insertAfter` from the console without exposing it  
  ✅ Use: `window.insertAfter = insertAfter;`

- ❌ Confusing `nextSibling` (any node) with `nextElementSibling` (elements only)

---

## Extension ideas (next practice)

- Insert after the **last** task
- Prevent duplicates by comparing `.textContent`
- Insert multiple elements in order (`insertAfterMany`)

---

## What to save/commit for Lesson 12

- ✅ `insertAfter(referenceEl, newEl)` helper (validated + returns new element)
- ✅ Working test inserted into `#section3 .tasks`
- ✅ Notes on module scope and console testing
- ✅ Self-check answers completed

---

# Author

The project is Copyright (C) 2021-2025 EOUSdigital

This software is provided as source‑available and is not open source under the **OSI definition**.
You are granted permission to use, copy, and modify this software for personal, educational, or non‑commercial research purposes only.
Any commercial use, including but not limited to using this software or any derivative work in a product or service that is sold, monetized, or used internally by a for‑profit organization, is strictly prohibited without a separate written commercial license from the author.
Proper credit to the original author and a copy of this license must be included with any distribution or derivative work.
See the **LICENSE** file for full details.