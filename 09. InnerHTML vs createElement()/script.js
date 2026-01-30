"use strict";

//TODO  🟦 Module 7 - DOM Manipulation: Lesson 09. InnerHTML vs createElement()

//  Up to now you have:
//  • Selected elements (querySelector, querySelectorAll)
//  • Traversed (parentElement, children, nextElementSibling, childNodes, etc.)
//  • Created elements and inserted them (createElement, append, prepend)

//* In this lesson you compare two different ways of building/updating DOM:
//  1. innerHTML – string-based updates
//  2. createElement + DOM methods – node-based updates

//  You will:
//  • See what innerHTML really does to existing DOM.
//  • Understand when it is convenient vs when it is dangerous.
//  • Contrast it with a structured createElement approach.

//TODO  1. Conceptual Overview

//? 1.1 innerHTML

const list = document.querySelector(".tasks");
list.innerHTML =`
    <li class="task">Task 1</li>
    <li class="task">Task 2</li>
`;

//* What it does:
//  • Parses the string as HTML
//  • Removes all existing child nodes of list.
//  • Replaces them with new nodes built from the HTML string.

//* Pros:
//  • Very quick to write.
//  • Easy to paste in some HTML markup.
//  • Good for simple one-off content.

//* Cons:
//  • Blows away existing child nodes → you lose:
//      • Any data you attached to them.
//      • Any event listeners bound directly to those elements.
//  • More error-prone (typos in HTML, unclosed tags, etc.).
//  • Dangerous if you inject unsanitized user input (XSS).
//  • String concatenation can become messy and hard to maintain.

//? 1.2 createElement and friends

const li = document.createElement("li");
li.classList.add("task");
li.textContent = "Task from JS";
list.append(li);

//* Pros:
//  • Structured, composable, and easier to refactor.
//  • Type-safe at the DOM level (you are working with real, nodes, not strings).
//  • Easier to attach event listeners before/after inserting.
//  • Safer when dealing with user input (you set textContext instead of injecting raw HTML).

//* Cons:
//  • More verbose (especially for deeply nested markup). (verbose = using or expressed in more words than are needed.)
//  • Can feel slower to write for quick prototypes.

//? 1.3 Practical rule of thumb
//  • Use innerHTML for:
//      • Very simple, static chunks (e.g. resetting a demo, small snippets).
//      • When you completely control the HTML string and it is not based on user input.
//  • Prefer createElement + append/prepend for:
//      • Interactive UI.
//      • Anything where you attach event listeners.
//      • Reusable components/cards/items.
//      • Data-driven rendering (lists, grids, feeds).


//TODO  2. Lesson Setup

//  Use the same structure as Lesson 08:
//  • #section3 – “New Tasks” (<ul class="tasks">)
//  • #section4 – “My Tasks” (<ul class="tasks">)
//  • .grid – cards
//  • #section2 – buttons (not strictly needed here)

//* Folder:

//  module-07/
//      lesson-09-innerhtml-vs-createelement/
//          index.html
//          style.css
//          app.js


//TODO  3. Guided Practice – Using Your Current HTML

//  All tasks below go into Lesson 09’s app.js.

//? Task 1 – Replace “New Tasks” with innerHTML

//  Goal: see how innerHTML wipes and replaces content.
//*  1. Select the “New Tasks” list:

//* 2. Use innerHTML to completely replace its content:

//  Refresh the page and observe:
//  • The original <li> items are gone.
//  • Only the new three items from the string remain.

//? Task 2 – innerHTML and event listeners (why it is risky)

//  Goal: understand that innerHTML destroys existing nodes and their listeners.
//* 1. Add a click listener to the “My Tasks” items:

//* 2. Test it:
//  • In the browser, click different tasks in “My Tasks”.
//  • They should toggle a .task--selected class (style this in CSS if you like).

//* 3. Now, later in the same file, overwrite innerHTML of #section4 .tasks:

//* 4. Test again:
//  • Click on these new tasks.
//  • What happens?

//  You will see:
//  • The event listener on myTasksList still works (because it was attached to the parent, not the children) → event delegation survives.
//  • But if you had attached listeners directly to each <li> (e.g. li.addEventListener("click", ...)), they would all be lost when you changed innerHTML.

//  This illustrates:
//  • Direct child listeners + innerHTML → broken.
//  • Delegated listener on parent + innerHTML → fine (because the parent node remains the same).

//? Task 3 – Append items with innerHTML += vs append

//  Goal: see the difference between string-based appending and node-based appending.
//* 1. In app.js, after the innerHTML replacement for newTasksList, try:

//* 2. Then, do the same with createElement:

//? Observation:
//  • Both add new tasks at the end.
//  • But innerHTML += works by:
//      • Reading existing HTML as a string,
//      • Concatenating the new HTML string,
//      • Re-parsing the whole thing,
//      • Replacing children.
//  • append simply adds one new child node without re-parsing the entire list.
//  In small demos you won’t notice a performance difference, but in larger apps you will.

//? Task 4 – Rebuild “New Tasks” using createElement from an Array

//* Now reset “New Tasks” completely with innerHTML, and then rebuild it using createElement from data.
//  1. Define an array of tasks:

//  2. Clear the list:

//  3. Rebuild using createElement:

//  Now you have:
//  • Used innerHTML for a simple reset.
//  • Used createElement + append to reconstruct the list in a structured way.

//? Task 5 – Helper: renderTasks(listElement, tasksArray)

//  Extract a reusable renderer that uses node-based creation, not innerHTML:

//  Example use:

//  This function gives you a clean API:
//  • “Given an array of task texts, show them in this list element.”


//TODO  4. Reflection & Checkpoint

//* You can answer these in your journal; share them if you want feedback.
//  1. In your own words, what does element.innerHTML = "..." actually does to the existing child nodes of the element?
//  Answer: innerHTML gets a serialization of the nested child DOM elements within the element, or sets HTML or XML that should be parsed to replace the DOM tree within the element. 

//  2. What are the main differences between:
//  • innerHTML updates
//  • createElement + append/prepend updates
//  Answer: createElement is faster, as browsers are not required to parse the HTML string and then build a node tree out of it; it also does not have to attach event listeners as innerHTML does. Using innerHTML will cause browsers to reparse and recreate all DOM nodes inside the element whose innerHTML is modified.

//  3. In what situations would you avoid innerHTML?
//  • Think about:
//      • Security (user input),
//      • Losing event listeners,
//      • Large lists.
//  Answer: The best solution to use innerHTML without creating XSS vulnerabilities is to sanitize the user input using an open-source library available that provides this sanitization service.

//  4. When could innerHTML still be acceptable or convenient?
//  Answer: Writing a dynamic solution like a Markdown to HTML converter with a real-time preview, the innerHTML is the way to go, as it is a “one-size-fits-all” approach. This is precisely what’s required for this particular conversion and real-time preview. 

//  5. How would you design a real app list renderer?
//  • Would you:
//      • Use innerHTML everywhere?
//      • Use createElement everywhere?
//      • Or combine them (e.g. innerHTML for reset, createElement for building items)?
//  Answer: I will combine innerHTML and createElement for each situation to help me develop the necessary options and functionalities for the app.


//!  Feedback

//  Your answers show that you understand the core ideas, but a few of them need sharpening or are answering a slightly different question than the one asked. I will go through each one.

//? 1) What does `element.innerHTML = "..."` do?

//  Feedback:
//  • You mixed the getter and setter behaviour in one sentence.
//  • The question is specifically about the setter: `element.innerHTML = "..."`.
//  • The important part is: existing child nodes are removed and replaced by new nodes parsed from the string.

//* Stronger version you can use:
//  `element.innerHTML = "..."` removes all existing child nodes of that element and replaces them with new nodes created by parsing the given HTML string. Any previous children (and their event listeners or state) are destroyed and replaced by a new DOM subtree.

//  Conceptually you are correct about “parsed to replace the DOM tree”; just make that the focus.

//? 2) `innerHTML` updates vs `createElement + append/prepend`

//  Feedback:
//  • You correctly mention that `innerHTML` reparses and recreates nodes.
//  • However:
//      • It is not always true that `createElement` is simply “faster”; for small updates the difference may be negligible.
//      • `innerHTML` does not attach event listeners automatically (neither does `createElement`). Event listeners are something you attach explicitly in your code.
//  Better to focus on how they work and side effects, not just “faster/slower”.

//* Suggested refinement:
//  • `innerHTML` works with HTML strings: it reparses the entire string and replaces all existing children with a new DOM subtree. This can be convenient, but it destroys existing nodes (and any listeners on them) and can be more expensive for large trees because everything is recreated.
//  • `createElement` + `append/prepend` works with actual DOM nodes: you build elements step-by-step and insert them. It is more structured, safer with user input (you can use `textContent`), and you can update the tree incrementally without reparsing a big HTML string.

//  If you want to mention performance, phrase it as:
//  For larger or frequent updates, incremental updates with `createElement` can be more efficient than repeatedly replacing large chunks of HTML with `innerHTML`.

//? 3) When would you avoid `innerHTML`?

//  Feedback:
//  • This is a valid mitigation strategy for security, but it does not answer the question directly.
//  • The question is: “In what situations would you avoid innerHTML?”, not “How to make it safer?”.
//  You need to list specific scenarios where you would rather not use `innerHTML`.

//* Better answer:
//  I would avoid `innerHTML` when:
//  • I am inserting user-controlled content and cannot guarantee it is properly sanitized (risk of XSS).
//  • The element’s children have event listeners or state attached directly to them, because `innerHTML` will destroy and recreate those nodes, breaking the listeners.
//  • I am updating large lists or complex UIs frequently; reparsing and recreating everything with `innerHTML` can be less efficient than updating only the necessary nodes with `createElement` and DOM methods.

//  Then you can add:
//  If I really must use `innerHTML` with user input, I would only do it after passing the input through a well-reviewed sanitization library.

//? 4) When is `innerHTML` acceptable or convenient?

//  Feedback:
//  • The example is reasonable: a Markdown → HTML preview is indeed a scenario where you might set a large HTML string at once.
//  • However, you must still keep in mind:
//      • The HTML must be sanitized if it is derived from user input.
//      • There are other ways to render (e.g. libraries that build DOM), but for this lesson, your intuition is fine.

//  I would broaden it slightly so it is not limited to Markdown:
//  `innerHTML` is convenient when:
//  • You need to inject a larger chunk of markup at once (e.g. a prebuilt HTML string from a Markdown converter or template engine).
//  • The content is fully controlled or sanitized, and you are not attaching individual event listeners to the child nodes.
//  • You are doing a simple reset of a container in a small demo or admin tool where performance and complex state are not critical.

//  Your Markdown example fits under this umbrella.

//? 5) How would you design a real app list renderer?

//  Feedback:
//  • The high-level idea (“combine them”) is fine, but it is too vague.
//  • For a real app, it helps to have a clear rule of thumb.

//  A stronger, more concrete answer:
//  I would combine them, but with a clear pattern:
//  • Use `innerHTML = ""` only to reset/clear a container when needed.
//  • Use `createElement` + `append` (or a helper like `renderTasks(list, tasks)`) to build list items from data.
//  This keeps the rendering structured and safe, and avoids losing state or listeners. I might still use `innerHTML` for small, static snippets (like inserting a simple `<strong>Empty list</strong>` message), but for main lists I would rely on `createElement` and DOM methods.

//  This shows that you are not just “combining randomly”, but using each tool for a specific, well-justified purpose.

