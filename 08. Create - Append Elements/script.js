"use strict";

//TODO: 🟦 Module 7 - DOM Manipulation: Lesson 08. Create & Append Elements

//  In Lessons 05–07 you mainly selected and traversed existing nodes.

//  In Lesson 08 you start creating DOM nodes from JavaScript and inserting them into the page:
//  • Create new elements and text nodes.
//  • Configure them (classes, attributes, text).
//  • Insert them into the document with append, prepend, and appendChild.
//  This is the foundation of “rendering” UI with JavaScript (lists, cards, notifications, etc.).

//TODO 1. Core APIs You’ll Use

//? 1.1 document.createElement(tagName)

//  Creates a new element node in memory (not yet on the page).

const li = document.createElement("li");                            //  <li></li>   (not in DOM yet)
li.classList.add("task");
li.textContent = "New task created from JS";

//  Key points:
//  • The element does not appear in the page until you append/prepend it.
//      • You can set:
//      • textContent
//      • classList
//      • dataset
//      • setAttribute(...)
//      • etc. before or after appending.

//? 1.2 Node.append() vs Node.appendChild()

//  Both add nodes as children at the end.

const list = document.querySelector(".tasks");
const li = document.createElement("li");
li.textContent = "Appended task";

list.append(li);                                                    //  modern, flexible
//  list.appendChild(li);                                             //  older, still common

//  Differences:
//  • append(nodeOrString, ...)
//      • Can take multiple arguments.
//      • Can append strings directly (they become text nodes);
//      • Returns undefined.
//  • appendChild(node)
//      • Only accepts one Node.
//      • Returns the appended node.
//      • Older API; still widely used.
//  For modern code, append is usually sufficient.

//? 1.3 prepend()

//  Adds nodes at the beginning of a container

const importantTask = document.createElement("li");
importantTask.textContent = "!!! Important task";
list.prepend(importantTask);                                        //  now first item

//? 1.4 document.createTextNode()                                   //  optional

//  You can create a pure text node:

const textNode = document.createTextNode("Hello");
someElement.append(textNode);

//  In practice, element.textContent = "Hello" or append("Hello")   // is often simpler.

//TODO 2. Lesson Setup

//  For Lesson 08, use the same pattern as previous lessons:

//  module-07/
//      lesson-08-create-append-elements/
//          index.html
//          style.css
//          app.js

//  You can copy index.html and style.css from Lesson 07 so you have:
//  • #section3 – “New Tasks” list (.tasks .task)
//  • #section4 – “My Tasks” list (.tasks .task)
//  • #section5.grid – cards (.card, .card-title)
//  • #section2 – buttons (.btn)

//  Ensure in index.html:
<script type="module" src="./app.js"></script>

//TODO 3. Guided Practice - Using Your Current HTML

//  Implement these tasks in Lesson 08's app.js.

//  We will assume your HTML has:
//  • #section3 .tasks → “New Tasks” list
//  • #section4 .tasks → “My Tasks” list
//  • .grid with .card children

//? Task 1 – Create and Append a New “New Task”

//  1. Select the “New Tasks” list in #section3:
//  2. Create a new <li> with class .task and some text, then append it:

//  Check the browser: you should see a new task at the bottom of “New Tasks”.

//? Task 2 – Prepend an Important Task in “My Tasks”

//  1. Select the “My Tasks” list:
//  2. Create a new <li> and prepend it so it appears first:

//  Now “My Tasks” should have the new important task at the top.

//? Task 3 – Dynamically Create a New Card

//  1. Select the .grid section:
//  2. Create a new card structure:

//  You should now see a new card at the end of the grid.

//? Task 4 – Render a List from an Array (Mini-Pattern)

//  This is a first tiny step toward “rendering” from data.
//  1. Define an array of additional tasks:
//  2. Create and append <li> elements for each entry to the “New Tasks” list (or create a separate list if you prefer):

//  You have now used:
//  • data (array) → DOM elements → inserted into page.

//? Task 5 – Extract a Helper Function (Optional, Recommended)

//  To avoid repetition when creating tasks, create a small helper:
//  Then reuse it:

//  This introduces the idea of UI factory functions: small functions that produce ready-to-use DOM elements.


//TODO  4. Reflection & Checkpoint

//  You can answer these in your journal; share them if you want feedback.
//  1. In your own words, what is the difference between:
//      • append and appendChild
//  Answer: The append(nodeOrString, ...) can take multiple arguments, strings directly (they become text nodes), and returns undefined. The appendChild(node) only accepts one Node, returns the appended node, and older API; still widely used. For modern code, append is usually sufficient.

//      • append and prepend
//  Answer: The .append() puts data inside an element at the last index; while .prepend() puts the prepending element at the first index.

//  2. Why is it usually a good idea to:
//      • Create the element in JS,
//      • Set its classes/text/attributes,
//      • Then append it to the DOM (instead of constantly modifying the DOM tree piece by piece)?
//  Answer: It is better to build an element in JavaScript, configure it (classes, text, attributes), and then append it once because it minimizes direct interactions with the live Document Object Model (DOM), reducing costly browser reflows/repaints, leading to much better performance, especially for complex elements or lists, and keeping your logic cleaner by separating creation from insertion. 

//  3. How could you use createElement + append in a real app?
//      • Example: rendering a list of notifications from an array of objects.
//      • Example: adding new comment cards to a feed when the user submits a form.
//  Answer: Implement pagination for an online shop using JavaScript, where each page displays 10 items. When a new item is added beyond the current capacity, automatically generate a new page.

//! Feedback

//? 1) `append` vs `appendChild`, and `append` vs `prepend`

//* append vs appendChild
//  This is correct and well phrased. You captured:
//  • Multiple arguments (for `append`)
//  • Accepting strings (for `append`)
//  • Return values (`undefined` vs the appended node)
//  • Historical vs modern usage
//  You clearly understand the distinction. No changes needed.

//* `append` vs `prepend`
//  Conceptually correct.
//  You could make it slightly sharper and more DOM-oriented like this:
//  • `append()` → inserts nodes as the last children of the target element.
//  • `prepend()` → inserts nodes as the first children of the target element.
//  But your answer already shows that you understand “end vs beginning” of the child list.

//? 2) Why create → configure → append is a good pattern

//  This is an excellent answer. You hit both:
//  • Performance: fewer layout/reflow/repaint operations because you touch the live DOM less.
//  • Code organization: clear separation between building an element and inserting it.

//  You could also note (for your own mental model) that:
//  • While a single element and a few operations are cheap, this pattern becomes very important when rendering lists, tables, or feeds with many nodes.
//  But overall, your reasoning here is strong and accurate.

//? 3) Real app use case for `createElement` + `append`

//  This is a valid scenario, and it can indeed use `createElement` + `append`, but you have not explicitly described how you would use those methods in that context. At the moment it reads more like a feature description than a DOM-creation process.

//  You could strengthen it like this:

//  For example, in an online shop with pagination:
//  • Keep an array of product objects (name, price, image URL, etc.).
//  • For the current page, use `createElement` to build a product card for each item (e.g. `<article class="product-card">` with image, title, price).
//  • For each card, set classes and attributes, then use `append` to insert it into a `.products-grid` container.
//  • When a new item is added and a new page is needed, generate a new page of cards in the same way: loop over the items for that page, `createElement` for each card, then `append` them into the container for that page.

//  That explicitly links:
//  • Data (products) → `createElement` for DOM nodes → `append` into the right container.
//  Your current idea is fine; it just needed this explicit connection to `createElement` + `append`.

//? Summary
//  • Q1: Correct and precise.
//  • Q2: Very good, both conceptually and practically.
//  • Q3: Good scenario; improve it by explicitly mentioning the steps where you use `createElement` and `append` to render those paginated items.
