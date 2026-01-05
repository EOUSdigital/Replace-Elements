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















