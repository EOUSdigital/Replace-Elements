"use strict";

// 🟦 Module 7 - DOM Manipulation: Lesson 12. Custom insertAfter() Challenge

//* The Challenge

//? Part A — Implement insertAfter(referenceEl, newEl)

//  Rules:
//  1. You must use: parent.insertBefore(newEl, referenceEl.nextSibling)
//  2. Validate inputs:
//      • referenceEl must be an Element
//      • newEl must be an Element
//  3. Throw helpful errors if invalid.
//  4. Return newEl (so the function is test-friendly).

//? Part B — Test it on your existing HTML

//  Use #section3 .tasks so the result is easy to see.

//! Solution

function insertAfter(referenceEl, newEl) {
    // TODO 1: validate referenceEl
    if (!(referenceEl instanceof Element)) {
        throw new TypeError(`insertAfter: referenceEl: ${typeof referenceEl} (${referenceEl?.nodeName || 'missing'}).`);
    }

    // TODO 2: validate newEl
    if (!(newEl instanceof Element)) {
        throw new TypeError(`insertAfter: newEl: ${typeof newEl} (${newEl?.nodeName || 'missing'}).`);
    }

    // TODO 3: get parent element
    const parent = referenceEl.parentElement;
    if (!parent) {
        throw new Error(`insertAfter: referenceEl has no parent: ${typeof parent} (${parent?.nodeName || 'missing'}).`);
    }
    
    // TODO 4: insert newEl after referenceEl
    parent.insertBefore(newEl, referenceEl.nextSibling);

    // TODO 5: return newEl
    return newEl
}

//  If your script is a module (type="module"), expose for console testing:

window.insertAfter = insertAfter;

//! Result

//  <li class="task"></li>

//? Alternative (no window): run the test inside app.js
//  If you prefer not to expose anything, simply put the test code at the bottom of app.js and refresh the page:

const ref = document.querySelector("#section3 .tasks .task");
const x = document.createElement("li");
x.className = "task";
x.textContent = "Inserted after Task 1";

insertAfter(ref, x);

//! Test

console.log("✅ Lesson 12 app.js loaded");

window.addEventListener("DOMContentLoaded", () => {
    const ul = document.querySelector("#section3 .tasks");
    const ref = document.querySelector("#section3 .tasks .task");

    console.log("ul found:", ul);
    console.log("ref found:", ref);

    if (!ul || !ref) {
        console.error("❌ Selector failed. Check your HTML IDs/classes and the folder you opened.");
        return;
    }

    const x = document.createElement("li");
    x.className = "task";
    x.textContent = "Inserted after Task 1";

    insertAfter(ref, x);
});
