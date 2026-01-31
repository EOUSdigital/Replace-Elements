"use strict";

// 🟦 Module 7 - DOM Manipulation: Lesson 13. Replace Elements

//TODO Exercise

//  Read the example once, then write your own version that replaces Task 2 (not Task 1). Use whichever API you prefer, but keep the <li class="task"> class consistent.

//? Option A (recommended): querySelectorAll + index

const oldEl = document.querySelector("#section3 .tasks .task")[1];
const newEl = document.createElement("li");
newEl.className = "task";
newEl.textContent = "✅ Replaced Task 2";

oldEl.replaceWith(newEl);


//? Option B: CSS selector for the second child

const oldEl = document.querySelector("#section3 .tasks .task:nth-child(2)");
const newEl = document.createElement("li");
newEl.className = "task";
newEl.textContent = "✅ Replace Task 2";

oldEl.replaceWith(newEl);


//TODO  Your next task: replace a task while preserving data-id

//? Step 1 — Preserving data-id

window.addEventListener("DOMContentLoaded", () => {
    const ul = document.querySelector("#section3 .tasks");
    if (!ul) return;

    //  1) Give each task a data-id if missing
    const tasks = ul.querySelectorAll("li.task");
    tasks.forEach((li, i) => {
        if (!li.dataset.id) li.dataset.id = String(i + 1);
    });

    console.log("Before replace:", [...ul.querySelectorAll("li.task")].map(li => ({
        text: li.textContent,
        id: li.dataset.id
    })));

    //  2) Replace Task 2 (the second li.task)
    const oldEl = ul.querySelectorAll("li.task")[1];                    //  Task 2
    if (!oldEl) return;

    const newEl = document.createElement("li");
    newEl.className = oldEl.className;                                  //  preserve classes/state
    newEl.dataset.id = oldEl.dataset.id;                                //  preserve identity
    newEl.textContent = "✅ Replaced Task 2";

    oldEl.replaceWith(newEl);

    console.log("After replace:", [...ul.querySelectorAll("li.task")].map(li => ({
        text: li.textContent,
        id: li.dataset.id
    })));
});

//? Step 2 — Refresh the page
//  After refresh, you should see in New Tasks (#section3) that:
//  • “Task 2” is now “✅ Replaced Task 2”
//  • The console will show “Before replace” and “After replace”
//  • The second item should keep the same data-id value it had before replacement


//TODO  Replacing breaks direct event listeners

//? Challenge (teaching mode: pseudocode + constraints + tiny hint)

const ul = document.querySelector("#section3 .tasks");
if (!ul) throw new Error("Cannot find #section3 .tasks");

const tasks = ul.querySelectorAll("li.task");

tasks.forEach(taskItem => {
    if (!taskItem.querySelector("[data-action='delete']")) {
        const btn = document.createElement("button");
        btn.dataset.action = "delete";
        btn.textContent = "Delete";
        taskItem.append(btn);
    }
});

ul.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action='delete']");
    if (!btn) return;

    const taskItem = btn.closest("li.task");
    if (taskItem) taskItem.remove();
});
