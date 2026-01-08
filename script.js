"use strict";

//TODO 🟦 Module 7 - DOM Manipulation: Lesson 10. Refactor to Multiple Functions


//TODO  1. Overview

//  So far you have:
//  • Written "script-style" code:
//      • Many querySelector calls at the top level.
//      • Direct DOM changes in sequence.
//  • Started to extract small helpers, e.g. createTaskItem, renderTasks.
//  In this lesson you focus on refactoring:
//  • Break larger behaviours into small, focused functions.
//  • Separate data, DOM selection, rendering, and event wiring.
//  • Have a clear init() function that sets up your UI when the page loads.
//  This is the bridge between “scripts” and “structured application code”.


//TODO  2. Target Structure for app.js (Conceptual)

//  We will still use the same HTML as Lessons 08–09:
//  • #section3 .tasks → “New Tasks”
//  • #section4 .tasks → “My Tasks”

//  A good high-level structure for Lesson 10’s app.js is:
//  "use strict";

//  1. Data
//  2. DOM helper(s) (optional)
//  3. UI building helpers (createTaskItem, renderTasks, etc.)
//  4. Event wiring helpers (setupTaskSelection, etc.)
//  5. init() – orchestrates everything
//  6. init(); // run

//  You already know the pieces; now we make them explicit and reusable.

//TODO  3. Guided Practice – Using Your Current HTML

//  Create a new Lesson 10 folder:

//  module-07/
//      lesson-10-refactor-to-multiple-functions/
//          index.html   (copy from Lesson 09, update title text)
//          style.css    (copy from Lesson 09)
//          app.js       (NEW for Lesson 10)

//? Task 1 – Start With Data at the Top

//  Define the data for your lists at the top of app.js:


//? Task 2 – Extract createTaskItem (Pure-ish UI Factory)

//  Create a small factory for <li> elements:

//  Characteristics:
//  • Single responsibility: “build a <li class="task"> for this text”.
//  • No direct DOM insertion.
//  • Reusable across both lists.

//  Characteristics:
//  • Single responsibility: “build a <li class="task"> for this text”.
//  • No direct DOM insertion.
//  • Reusable across both lists.

//? Task 3 – Extract renderTasks(listElement, tasks)

//  Refactor your “build list from array” logic into a dedicated renderer:

//  Key points:
//  • Does not know about #section3 or #section4; it only uses the element passed in.
//  • Works for any <ul> and any array of strings.

//? Task 4 – Extract Event Wiring: setupTaskSelection(listElement)

//  You previously wrote delegated click handling. Now make it reusable:

//  Again:
//  • Does not know “My Tasks”/“New Tasks”.
//  • Can be used on any list that has .task items.

//? Task 5 – Create a Single init() Function

//  Now orchestrate everything in one place:

function init() {
    //  1. Select DOM elements
    const newTasksList = document.querySelector("#section3 .tasks");
    const myTasksList = document.querySelector("#section4 .tasks");

    //  2. Render initial state
    renderTasks(newTasksList, newTasksData);
    renderTasks(myTasksList, myTasksData);

    //  3. Setup interactions
    setupTaskSelection(myTasksList);
}

//  Run once
init();

//  Behaviour:
//  • When the page loads, init():
//      • Selects the lists.
//      • Renders data into each list.
//      • Wires up click selection for “My Tasks”.
//  This gives you one entry point, which is very close to how apps are structured in frameworks.

//? Task 6 – Optional: Separate Responsibilities Further

//  If you want an extra step, you can break init() into smaller pieces:

//  This is not required, but it reinforces:
//  • “Get references”
//  • “Render UI”
//  • “Attach events”
//  as distinct phases.

//TODO  4. Reflection & Checkpoint

//  You can answer these in your study journal; share them if you want feedback.
//  1. In your own words, why is it useful to move from “a long top-level script” to “multiple small functions”?
//  Answer: It makes the code more self-descriptive, and it makes me understand the code better.

//  2. For each function you wrote (createTaskItem, renderTasks, setupTaskSelection, init):
//  • What is its single responsibility?
//  • What parameters does it need, and what does it return (if anything)?
//  Answer: The single responsibility for each function I wrote will give me one entry point.

//  3. How does having a clear init() function make your code easier to:
//  • Read,
//  • Debug,
//  • Extend later (e.g., adding buttons that add/remove tasks)?
//  Answer: It is used to prepare the code early, get setup code out of the way, and make sure everything's ready before main() starts.

//  4. Look at your final app.js:
//  • Is there any repetitive code that could be extracted into another helper?
//  • Is there any function doing more than one job?
//  Answer: The function renderTasks in Task 3 is repetitive code within the function setupTaskSelection in Task 4 that can be extracted into another helper. The function setupTaskSelection in Task 4 is doing more than one job.

//! Feedback

//todo  You are sending me the steps I need to copy and paste into the app.js, and I did it. It is great to see how a problem can be solved in the DOM. My question is, how will I learn to do it by myself if you write the code for me?

//? 1) Long top-level script → multiple small functions

//* This is a good start. You have captured two important benefits:
//  • Self-descriptive: functions with good names explain the code.
//  • Better understanding: splitting logic clarifies the flow.

//* You can strengthen this by adding a few more key points:
//  • Reusability – you can call the same function from different places (e.g. `renderTasks` for multiple lists).
//  • Testing and debugging – smaller functions are easier to test and debug in isolation.
//  • Change isolation – when you need to change something, you often modify just one function, not the whole file.

//* A stronger version could be:
//  It is useful because each function has a clear responsibility and a name, which makes the code more self-descriptive, easier to read, easier to reuse, and easier to debug. Instead of one long, fragile script, I get small building blocks I can reason about individually.

//  Your intuition is correct; just expand it slightly.

//? 2) Single responsibility, parameters, return values

//* This mixes two different ideas:
//  • Single responsibility → each function does one focused job.
//  • Single entry point → that is specifically `init()`, not each function.

//* Let’s map them clearly, based on the design we discussed:
//  1. `createTaskItem(text)`
//  • Responsibility: create a `<li class="task">` element for the given text.
//  • Parameters: `text` (string).
//  • Returns: a ready-to-append `<li>` element.

//  2. `renderTasks(listElement, tasks)`
//  • Responsibility: clear a list element and render all tasks into it.
//  • Parameters:
//      • `listElement` – the `<ul>` (or `<ol>`) DOM element.
//      • `tasks` – an array of strings.
//  • Returns: nothing (side effect: modifies the DOM inside `listElement`).

//  3. `setupTaskSelection(listElement)`
//  • Responsibility: attach a delegated click handler to allow selecting/deselecting `.task` items.
//  • Parameters: `listElement` – the `<ul>` whose children should be selectable.
//  • Returns: nothing (side effect: adds an event listener).

//  4. `init()`
//  • Responsibility: orchestrate the whole setup:
//      • select DOM nodes,
//      • render initial data,
//      • wire up events.
//  • Parameters: none.
//  • Returns: nothing.

//  So:
//  • Single responsibility: applies to each function.
//  • Single entry point: is specifically `init()`.

//? 3) Why `init()` helps (read, debug, extend)

//  You are thinking in the right direction (initialisation), but in our JS file there is no `main()`. `init()` is the main entry for your module.

//  How `init()` helps:
//  • Readability – when you open the file, you can scroll to `init()` and see:
//      • what DOM elements are used,
//      • which functions are called to render and attach behaviour.
//  • Debugging – if something is wrong on startup, you know the flow:
//      • `init()` → `renderTasks` → `createTaskItem`, etc.
//  • Extension – when you add a new feature (e.g. a “Add task” button), you know:
//      • “I should probably call the setup function from `init()`”.

//* A clearer version:
//  A clear `init()` gives me a single, predictable place where the app starts. It makes the code easier to read because I can see the overall setup flow in one function. It makes debugging easier because I can follow the chain of calls from `init()`. It also makes extension easier, because any new setup (events, initial renders) can be plugged into `init()` in a structured way.

//? 4) Repetition and functions doing more than one job

//  Without your exact Lesson 10 `app.js` in front of me, I cannot be 100% certain, but based on the structure we designed:
//  • `renderTasks` and `setupTaskSelection` should not contain overlapping logic.
//      • `renderTasks` – only clears + appends items.
//      • `setupTaskSelection` – only attaches the click listener.

//  So in the ideal version:
//  • `renderTasks` is not repetitive inside `setupTaskSelection`.
//  • `setupTaskSelection` is doing exactly one job: event wiring.
//  If you feel that your own version of `setupTaskSelection` is doing more than one job (for example: both rendering items and attaching events), then your instinct is correct: you should separate those concerns as we outlined.

//  A good way to check yourself:
//  • Ask of each function:
//      • Can I summarise this function in **one short sentence** without using “and”?
//      • If I find myself saying “it does X and Y…”, that is a sign it may be doing too much.

//? For Lesson 10, after refactor, the goal is:
//  • `createTaskItem` – “build one `<li>`”.
//  • `renderTasks` – “render all tasks for a given list”.
//  • `setupTaskSelection` – “attach selection behaviour for a list”.
//  • `init` – “wire everything together once on startup”.

