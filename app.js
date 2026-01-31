"use strict";

<<<<<<< HEAD
//TODO 🟦 Module 7 - DOM Manipulation: Lesson 10. Refactor to Multiple Functions


// Task 1 – Start With Data at the Top

// Data for New Tasks (Section 3)
const newTasksData = [
    "Learn innerHTML vs createElement",
    "Refactor list rendering logic",
    "Write README for Lesson 10",
];

// Data for My Tasks (Section 4)
const myTasksData = [
    "Learn DOM selectors",
    "Practice loops",
    "Build a mini project",
    "Review and refactor",
];

// Task 2 – Extract createTaskItem (Pure-ish UI Factory)

function createTaskItem(text) {
    const li = document.createElement("li");
    li.classList.add("task");
    li.textContent = text;
    return li;
}

// Task 3 – Extract renderTasks(listElement, tasks)

function renderTasks(listElement, tasks) {
    if (!listElement) return;

    // Clear existing tasks:
    listElement.innerHTML = "";

    // Render from data:
    tasks.forEach((text) => {
        const li = createTaskItem(text);
        listElement.append(li);
    });
}

// Task 4 – Extract Event Wiring: setupTaskSelection(listElement)

function setupTaskSelection(listElement) {
    if (!listElement) return;

    listElement.addEventListener("click", (event) => {
        const li = event.target.closest(".task");
        if (!li) return;
        li.classList.toggle("task--selected");
    });
}

// Task 5 – Create a Single init() Function

// Task 6 – Optional: Separate Responsibilities Further

function getDomRefs() {
    return {
        newTasksList: document.querySelector("#section3 .tasks"),
        myTasksList: document.querySelector("#section4 .tasks"),
    };
}

function initialiseLists(dom) {
    renderTasks(dom.newTasksList, newTasksData);
    renderTasks(dom.myTasksList, myTasksData);
}

function initialiseEvents(dom) {
    setupTaskSelection(dom.myTasksList);
    setupTaskSelection(dom.newTasksList);
}

function init() {
    const dom = getDomRefs();
    initialiseLists(dom);
    initialiseEvents(dom);
}

// Run once
init();
=======
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

>>>>>>> f10f69aa1de65cb7cebee4ed362d2bb83514f94f

