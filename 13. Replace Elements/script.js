"use strict";

// 🟦 Module 7 - DOM Manipulation: Lesson 13. Replace Elements

//TODO  Concepts

//? 1) What “replace” means in the DOM

//  Replacing is a structural operation: one node is removed and another node takes its place in the same parent at the same position.

//  You always have:
//  • an old node (the one currently in the DOM)
//  • a new node (the replacement you provide)
//  • a parent (because replacement happens inside a parent)

//? 2) The core APIs you will use

//* A) Modern, simplest: replaceWith()

//  Called on the node you want to replace:
//  • oldEl.replaceWith(newEl)
//  • Works well for direct "swap this out" logic.
//  Keep rule: newEl must be a Node (typically an Element you created).

//* B) Classic and universal: parent.replaceChild(newChild, oldChild)

//  Called on the parent:
//  • parent.replaceChild(newEl, oldEl)
//  Useful when you already have the parent, or when you want stricter control.

//? 3) What happens to the old node after replacement

//  After replacement:
//  • The old node is removed from the DOM.
//  • Any event listeners attached directly to the old node are gone with it.
//  • If you kept a variable reference to the old node, it still exists in memory, but it is detached (not in the document).

//? 4) Common pitfalls you must avoid

//* Pitfall 1: Replacing with a string

//  You must use:
//  • an element you created (createElement) or an HTML parsing method (not recommended for replacements unless trusted).

//! You cannot do:
//  • replaceWith("<li>New</li>") (string)

//* Pitfall 2: Forgetting that IDs must be unique

//  If the old node had an id, decide whether the new node should inherit it. Duplicate IDs cause confusing selector bugs.

//* Pitfall 3: Losing events on replaced nodes

//  If the old element had a click handler, the new element will not automatically have it. Solutions:
//  • reattach the listener, or
//  • use event delegation on a parent element (recommended when you replace many children).

//? 5) Node vs Element vocabulary (important for accuracy)

//  • Node: broader category (Element, Text, Comment, etc.)
//  • Element: an HTML element node (<li>, <div>, etc.)
//  Most replacement methods accept Node, but in your lesson we will mostly use Element.


//TODO  Minimal example you should look at (one replacement, no extras)

//? Option 1: replaceWith (simplest)

const oldEl = document.querySelector("#section3 .tasks .task");                 //  first <li>
const newEl = document.createElement("li");
newEl.className = "task";
newEl.textContent = "✅ Replace Task 1";

oldEl.replaceWith(newEl);

//? Option 2: replaceChild (parent-controlled)

const oldEl = document.querySelector("#section3 .tasks .task");
const parent = oldEl.parentElement;

const newEl = document.createElement("li");
newEl.className = "task";
newEl.textContent = "✅ Replace Task 1";

parent.replaceChild(newEl, oldEl);


//TODO  Replace an element while preserving an attribute (e.g., keep a data-id)

//? Keep a data-id
//  • Part of the lesson’s core skill if your goal is to replace elements in real UIs reliably.
//  • Also a natural extension beyond the simplest “replace text” demo.

//? In practice, replacements are rarely “just swap the node.” You often must preserve at least one of these:
//  • an identifier (id, data-id, data-task-id)
//  • state (aria-*, data-selected, classList)
//  • behavior hooks (event delegation selectors, data-action)

//  So I recommend treating “preserve an attribute” as Lesson 13 core, immediately after the basic replacement, because it teaches you how to replace without breaking how your app identifies elements.

//? How we can structure Lesson 13 (clean and not overwhelming)
//  1. Core: replace a task <li> with a new <li> (you already did this).
//  2. Core: replace while preserving data-* (so identification survives).
//  3. Core concept: what happens to event listeners on replaced nodes + why delegation helps.
//  4. Extensions (optional): preserve classes, preserve focus, replace multiple nodes, etc.


//? Element form

// Element.matches() accepts one CSS selector string, not multiple arguments. So this:

e.target.matches("[data-action='delete']", "aria-selected='true'", "data-id")

//  will not do what you intend.

//  Also, attribute selectors must be written in CSS selector syntax:
//  • aria-selected='true' must be [aria-selected="true"]
//  • data-id must [data-id] (exists) or [data-id="123"] (equals)

//? Correct options

//* Option A — OR logic (any of them matches)
//  Use a single selector string with commas:

if (e.target.matches("[data-action='delete'], [aria-selected='true'], [data-id]")) {
    //  ...
}

//* Option B — AND logic (must have all of them)
//  Combine selectors without commas:

if (e.target.matches("[data-action='delete'][aria-selected='true'][data-id]")) {
    // ...
}

//* Option C — Best practice for delegated clicks (handles nested elements)
//  If the user clicks an icon inside a button, e.target might be the icon, not the button. Use closest():

const el = e.target.closest("[data-action='delete']");
if (el) {
    // delete action
}

//  And for AND logic with closest():

const el = e.target.closest("[data-action='delete'][aria-selected='true'][data-id]");
if (el) {
    // ...
}


//TODO  OR (“any of these”) or AND (“all of these”)

//  Use Option C (closest) with a data-action behavior hook. It is the most practical choice for real UIs because it keeps working even when the user clicks on a nested element (icon/span) inside a button.

//? 1) Replace APIs
//  • oldEl.replaceWith(newEl) replaces oldEl in-place.
//  • parent.replaceChild(newEl, oldEl) does the same, but from the parent.

//? 2) Replace removes the old node
//  When you replace, the old element is detached from the DOM. If the old element had direct event listeners, those do not transfer.

//? 3) Preserve “hooks” so your app still recognizes the element
//  When replacing, you often must keep:
//  • identity: data-id="..." (so you still know which task it is)
//  • behavior hook: data-action="delete" (so delegated clicks still work)
//  • optional state: classes like .task--selected or aria-selected="true"

//? 4) Delegated clicks with closest() (recommended)
//  Instead of attaching click handlers to each button, attach one handler to the parent list and detect actions:

ul.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    const action = btn.dataset.action;                              //  e.g., "delete"
    //  ...
});


//TODO  Your next task: replace a task while preserving data-id

//? Step 1 — Ensure tasks have data-id

const ul = document.querySelector("#section3 .tasks");
const tasks = ul.querySelectorAll("li.task");

tasks.forEach((li, i) => {
    if (!li.dataset.id) li.dataset.id = String(i + 1);
});

//? Step 2 — Replace “Task 2” but keep its data-id (and classes)

const oldEl = ul.querySelectorAll("li.task")[1];                    //  Task 2

const newEl = document.createElement("li");
newEl.className = oldEl.className;                                  //  preserve classes/state
newEl.dataset.id = oldEl.dataset.id;                                //  preserve identity
newEl.textContent = "✅ Replace Task 2";

oldEl.replaceWith(newEl);

//? Quick check (optional)

console.log("New element data-id:", ul.querySelectorAll("li.task")[1].dataset.id);


//TODO  DOM concepts well enough that you can recreate the solution

//? 1) What “replace” really means
//  Replacing is a tree operation: one node is removed, and another node takes its place in the same parent, same position. That is the mental model.

//* Two core ways to do it:
//  • oldEl.replaceWith(newEl)
//  • parent.replaceChild(newEl, oldEl)
//  If you understand parent + child position, you understand replacement.

//? 2) The difference between one element and a collection

//* This is why your earlier attempt broke:
//  • querySelector() returns one element
//  • querySelectorAll() returns a NodeList you can index
//  This distinction is central to DOM work.

//? 3) What gets lost when you replace a node

//  When you replace an element, the old element is removed from the DOM. Anything attached to that exact node (especially direct event listeners) won’t automatically carry over. That is why developers use patterns like event delegation.

//? 4) What you must preserve (the “hooks”)
//  You only need to preserve what your UI logic relies on—not one from every category.

//* Typical hooks:
//  • Identity: data-id (so you can still recognize “which task is this?”)
//  • State: class or aria-* (selected, active, etc.)
//  • Behavior hook: data-action (so delegated click logic still works)

//? 5) “nextSibling can be text”

//  Whitespace can appear as text nodes in childNodes, so nextSibling may be a text node. That’s still fine because DOM insertion methods work with nodes, not just elements.


//TODO  add “extra” code

//  The simplest replace demo is 4 lines. But real projects fail when:
//  • selectors return null,
//  • you accidentally target the wrong list,
//  • you replace a node and lose identity/state/behavior,
//  • your code is in an ES module and the console can’t access it.
//  Added guards to prevent silent failure. The trick is: learn the simple version first, then learn the safety layer.

//  The “simple version” you should be able to write from memory:

const oldEl = document.querySelectorAll("#section3 .tasks .task")[1];
const newEl = document.createElement("li");
newEl.className = "task";
newEl.textContent = "Replaced";
oldEl.replaceWith(newEl);

//  Everything else is optional safety.

//! Book chapters that teach DOM thinking well
//  • Eloquent JavaScript — DOM chapter explains replaceChild and DOM operations clearly.
//  • JavaScript The Definitive Guide Master the World's Most-Used Programming Language - Seventh Edition by David Flanagan is strong


//TODO  Replacing breaks direct event listeners

//? Challenge (teaching mode: pseudocode + constraints + tiny hint)

//* Goal
//  Add a “Delete” button to each task and delete a task using one click handler that still works after you replace Task 2.

//* Pseudocode
//  1. Select "#section3 .tasks" (the "ul").
//  2. For each "li.task", ensure it contains a button with 'data-action="delete"'.
//  3. Add one click listener to the ul.
//  4. When a click happens:
//  • find the clicked delete button using "closest("[data-action='delete']")"
//  • find the related task item using "closest("li.task")"
//  • remove that task item

//! Constraints
//  • You must attach only one event listener (on the "ul").
//  • You must use 'data-action="delete"' and "closest(...)".
//  • Do not attach listeners to each button.

//* Hint
//  If the user clicks on the button text or inside it, e.target may be a child node—closest() solves that.