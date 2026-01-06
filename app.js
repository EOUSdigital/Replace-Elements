"use strict";

//TODO 🟦 Module 7 - DOM Manipulation: Lesson 10. Refactor to Multiple Functions


//? Task 1 – Start With Data at the Top

//  Define the data for your lists at the top of app.js:

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

//  Goal: all initial list content lives in data, not hard-coded in JS logic.

//? Task 2 – Extract createTaskItem (Pure-ish UI Factory)

//  Create a small factory for <li> elements:

function createTaskItem(text) {
    const li = document.createElement("li");
    li.classList.add("task");
    li.textContent = text;
    return li;
}

//? Task 3 – Extract renderTasks(listElement, tasks)

//  Refactor your “build list from array” logic into a dedicated renderer:

function rendererTasks(listElement, tasks) {
    if (!listElement) return;

    // Clear existing tasks:
    listElement.innerHTML = "";

    // Render from data:
    tasks.forEach((text) => {
        const li = createTaskItem(text);
        listElement.append(li);
    });
}

//? Task 4 – Extract Event Wiring: setupTaskSelection(listElement)

//  You previously wrote delegated click handling. Now make it reusable:

function setupTaskSelection(listElement) {
    if (!listElement) return;

    listElement.addEventListener("click", (event) => {
        const li = event.target.closest(".task");
        if (!li) return;
        li.classList.toggle("task--selected");
    });
}

//? Task 5 – Create a Single init() Function

//  Now orchestrate everything in one place:

function init() {
    //  1. Select DOM elements
    const newTasksList = document.querySelector("#section3 .tasks");
    const myTasksList = document.querySelector("#section4 .tasks");

    //  2. Render initial state
    rendererTasks(newTasksList, newTasksData);
    rendererTasks(myTasksList, myTasksData);

    //  3. Setup interactions
    setupTaskSelection(myTasksList);
}

//  Run once
init();




