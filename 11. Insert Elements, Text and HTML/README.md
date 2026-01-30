# 🟦 Module 07 — DOM Manipulation  
## Lesson 11: Insert Elements, Text and HTML

This lesson focuses on **inserting content into the DOM** in a controlled way—using:
- **Elements** (created with `document.createElement`)
- **Text nodes** (plain text)
- **HTML strings** (parsed into nodes)

You will practice choosing the *right* insertion method for the job and placing content at precise positions.

---

## Learning goals

By the end of Lesson 11, you should be able to:

- Explain the **4 insertion positions**: `beforebegin`, `afterbegin`, `beforeend`, `afterend`
- Insert:
  - **Elements** with `insertAdjacentElement()` / `before()` / `after()` / `prepend()` / `append()`
  - **Text** with `textContent` or `insertAdjacentText()`
  - **HTML** with `insertAdjacentHTML()` (trusted strings only)
- Avoid invalid list structures (e.g., placing raw text directly inside a `<ul>`)
- Write a reusable helper: `insertAfter(referenceEl, newEl)`

---

## Your project context (based on your HTML)

You have two task lists:

- `#section3 .tasks` → **New Tasks**
- `#section4 .tasks` → **My Tasks**

Both are `<ul class="tasks"> ... </ul>`, so the correct children **inside** the list are `<li>` elements.

✅ **Inside `<ul>`**: insert `<li>`  
✅ **Outside `<ul>`**: insert block elements like `<div>` or `<p>`

---

## The 4 insertion positions (mental model)

When you target an element `targetEl`, these positions mean:

- `beforebegin` → **before** the element itself (as a sibling)
- `afterbegin` → **inside** the element, at the start
- `beforeend` → **inside** the element, at the end
- `afterend` → **after** the element itself (as a sibling)

---

## Core APIs (what to use and when)

### Insert an element (preferred)
Use when you are creating nodes safely with DOM methods:

- `targetEl.insertAdjacentElement(position, el)`
- `targetEl.before(el)` / `targetEl.after(el)`
- `targetEl.prepend(el)` / `targetEl.append(el)`

### Insert text
Use when you want **plain text**, not HTML:

- `someEl.textContent = "..."` (replace text)
- `targetEl.insertAdjacentText(position, "Label: ")` (insert text node)

### Insert HTML
Use **only** for trusted, hard-coded strings you control:

- `targetEl.insertAdjacentHTML(position, "<li>...</li>")`

⚠️ **Security note:** Never insert untrusted user input with `insertAdjacentHTML` or `innerHTML` (risk of XSS).

---

## Exercise A — One function that supports all 4 positions

### Requirement
Create `insertNotice(targetEl, position, message)` that:
- supports all 4 positions
- inserts a **real element** (not HTML string)
- uses `textContent` for the message
- uses `<li>` when inserting **inside** a `<ul>` and a block element when inserting **outside**

### Example solution pattern (reference)

```js
function insertNotice(targetEl, position, message) {
  const allowed = ["beforebegin", "afterbegin", "beforeend", "afterend"];
  if (!allowed.includes(position)) throw new Error("Invalid position");

  const isInside = position === "afterbegin" || position === "beforeend";
  const tag = isInside ? "li" : "div";

  const notice = document.createElement(tag);
  notice.className = "notice";
  notice.textContent = message;

  targetEl.insertAdjacentElement(position, notice);
}
```

### Suggested test calls (Section 3 list)
```js
const list3 = document.querySelector("#section3 .tasks");
insertNotice(list3, "beforebegin", "Start");
insertNotice(list3, "afterbegin", "Task 0");
insertNotice(list3, "beforeend", "Task 5");
insertNotice(list3, "afterend", "Complete");
```

---

## Exercise B — Insert list items three different ways

### Goal
Demonstrate **three** approaches:

1. **Element + textContent + append**
2. **Text insertion** (clean placement)
3. **HTML insertion** (trusted string)

### Important correctness note (lists)
A `<ul>` should contain `<li>` children. Raw text directly inside a `<ul>` is **invalid** HTML (browsers may still display it).

✅ Cleanest label placement for your layout: **after the section heading**, not inside the `<ul>`.

### Reference implementation (Section 3)
```js
function threeDifferentWays(ul) {
  // 1) Element insertion (safe)
  const li = document.createElement("li");
  li.className = "task";
  li.textContent = "Plain text";
  ul.append(li);

  // 2) Text insertion (clean + semantic): after the <h1>
  const section = ul.closest("section");
  const heading = section?.querySelector("h1");
  if (heading) heading.insertAdjacentText("afterend", " Label: ");

  // 3) HTML insertion (trusted string only)
  ul.insertAdjacentHTML("beforeend", "<li class=\"task\">Inserted with HTML</li>");
}

const list3 = document.querySelector("#section3 .tasks");
threeDifferentWays(list3);
```

### Styling note about text nodes
CSS **cannot** directly target a plain text node inserted with `insertAdjacentText`.  
If you want the label styled, insert an element (e.g., `<p class="tasks-label">`) and then insert text into it.

---

## Mini-challenge — `insertAfter(referenceEl, newEl)`

### Requirement
Implement `insertAfter` **without** using `insertAdjacentElement`.

Correct approach:
- Find the parent
- Insert before `referenceEl.nextSibling`

Reference:
```js
function insertAfter(referenceEl, newEl) {
  const parent = referenceEl.parentElement;
  if (!parent) throw new Error("No parent element");
  parent.insertBefore(newEl, referenceEl.nextSibling);
}
```

### Console test (quick)
```js
const ref = document.querySelector("#section3 .tasks .task"); // first task
const x = document.createElement("li");
x.className = "task";
x.textContent = "Inserted after Task 1";
insertAfter(ref, x);
```

If your scripts are ES modules (`type="module"`), expose for console testing:
```js
window.insertAfter = insertAfter;
```

---

## Common mistakes checklist

- ✅ Using the correct method name:
  - `insertAdjacentText` (not `insertAdjacentElementText`)
  - `insertAdjacentHTML` (not `insertAdjacentElementHTML`)
- ✅ Using `insertAdjacentElement` only with real Elements (not strings)
- ✅ Not placing raw text inside a `<ul>` (prefer label outside or in a `<li>`)
- ✅ Using `textContent` for user-visible strings (safe)
- ✅ Using HTML insertion only for trusted hard-coded templates

---

## Reflection questions (answer in 2–3 sentences each)

1. When should you use `textContent` instead of `insertAdjacentHTML`, and why?
2. Why is inserting raw text directly inside a `<ul>` a semantic problem?
3. What does `referenceEl.nextSibling` represent in `insertAfter`?

---

## Exit ticket (quick check)

- What position inserts *inside the element at the end*?
- Which method inserts a text node: `insertAdjacentText` or `insertAdjacentHTML`?
- If you want to insert an actual node, which method do you choose?

---

## What to commit/save for Lesson 11

- ✅ `insertNotice(...)` working for all four positions
- ✅ `threeDifferentWays(...)` demonstrating element/text/HTML insertion
- ✅ `insertAfter(...)` helper tested on a list item
- ✅ `.notice` styles (and optional `.tasks-label` styles if you added a label element)

---

# Author

The project is Copyright (C) 2021-2025 EOUSdigital

This software is provided as source‑available and is not open source under the **OSI definition**.
You are granted permission to use, copy, and modify this software for personal, educational, or non‑commercial research purposes only.
Any commercial use, including but not limited to using this software or any derivative work in a product or service that is sold, monetized, or used internally by a for‑profit organization, is strictly prohibited without a separate written commercial license from the author.
Proper credit to the original author and a copy of this license must be included with any distribution or derivative work.
See the **LICENSE** file for full details.