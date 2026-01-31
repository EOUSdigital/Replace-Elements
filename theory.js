"use strict";

// 🟦 Module 7 - DOM Manipulation: Lesson 13. Replace Elements

//TODO  How you will know what to do (without being given full code)

//? 1) Get the “minimum theory” first
//  Before any exercise, I will teach only what you need for that exact task—usually 3–5 facts.

//* For “Replace Elements,” the minimum theory is:
//  • querySelectorAll() returns a list you can index;
//  • querySelector() returns one element.
//  • Replacement requires old element + new element.
//  • Two valid replacement APIs:
//      • oldEl.replaceWith(newEl)
//      • parent.replaceChild(newEl, oldEl)
//  • If you want to preserve an attribute: read it from oldEl and set it on newEl.
//  That is enough to attempt the exercise.

//? 2) Get pseudocode (a recipe), not code
//  Pseudocode tells you the steps in plain language, so you are not stuck.
//  Example pseudocode for “replace Task 2”:
//  1. Select the ul in section 3.
//  2. Get the second li.task from that list.
//  3. Create a new li.
//  4. Copy the old element’s data-id onto the new one.
//  5. Set text on the new one.
//  6. Replace old with new.
//  You then write the actual JavaScript.

//? 3) Get constraints (so you do not wander)
//  Constraints prevent you from solving it in a different way that avoids learning the target concept.

//* Example constraints:
//  • Must use "replaceWith" (not innerHTML)
//  • Must use "createElement"
//  • Must preserve "data-id"

//? 4) You get a tiny hint (one small pointer)
//A hint is typically one line like:
//  • “Remember: to get item #2 from a NodeList, use index 1.”

//? 5) If you get stuck, you show what you tried
//  Then I help by correcting one small mistake at a time, not dumping the whole answer. You learn by fixing.

//? What developers do:
//  1. Start with the recipe (pseudocode).
//  2. Try to write it.
//  3. Use:
//  • the error message,
//  • a single reference page (MDN),
//  • and my feedback, to patch the gap.
//  This is how you become independent: you practice the skill of bridging gaps, not copying.

//! The point is that you will learn the knowledge just-in-time, then you will apply it with guidance that forces you to think, not copy.

//? Minimum theory (just what you need)
//  • Use document.querySelectorAll(selector) if you need to pick “Task 2” by index.
//  • Create the replacement with document.createElement("li").
//  • Replace with oldEl.replaceWith(newEl).
//  • Preserve an attribute by copying: newEl.dataset.id = oldEl.dataset.id.

//* Constraints
//  • Target: #section3 .tasks
//  • Replace Task 2 only.
//  • Use replaceWith.
//  • New element must remain an <li class="task">.
//  • Preserve data-id (if it doesn’t exist, set it first).

//* Hint
//  • “Task 2” is the second <li>, so its index is 1.

//? Task
//  Write the code in app.js (inside DOMContentLoaded) to do this replacement.

//* When you paste your attempt, I will:
//  • point out exactly what is wrong (if anything),
//  • give one small correction,
//  • and you fix it.


//TODO  Replacing breaks direct event listeners

//  If you attach a listener directly to a task element, then replace that task, the new element will not have the listener.
//  The real skill is:
//  • Detecting that break
//  • Fixing it with event delegation (one listener on the parent that continues to work even after replacements)
//  That is the point where replacement becomes “real-world.”
