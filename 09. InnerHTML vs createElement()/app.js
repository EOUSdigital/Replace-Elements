"use strict";

//TODO  🟦 Module 7 - DOM Manipulation: Lesson 09. InnerHTML vs createElement()

//TODO  3. Guided Practice – Using Your Current HTML

//? Task 1 – Replace “New Tasks” with innerHTML

//* Goal: see how innerHTML wipes and replaces content.
//  1. Select the “New Tasks” list:

const newTasksList = document.querySelector("#section3 .tasks");

//  2. Use innerHTML to completely replace its content:

if  (newTasksList) {
    newTasksList.innerHTML = `
    <li class="task">Task A - From innerHTML</li>
    <li class="task">Task B - From innerHTML</li>
    <li class="task">Task C - From innerHTML</li>
    `;
}

//? Task 2 – innerHTML and event listeners (why it is risky)

//* Goal: understand that innerHTML destroys existing nodes and their listeners.
//  1. Add a click listener to the “My Tasks” items:

const myTasksList = document.querySelector("#section4 .tasks");

if (myTasksList) {
    myTasksList.addEventListener("click", (event) => {
        const li = event.target.closest(".task");
        if (!li) return;
        li.classList.toggle("task--selected");
    });
}

//  2. Test it:

//  3. Now, later in the same file, overwrite innerHTML of #section4 .tasks:

if (myTasksList) {
    myTasksList.innerHTML = `
    <li class="task">New Task 1 - Rewritten via innerHTML</li>
    <li class="task">New Task 2 - Rewritten via innerHTML</li>
    `;
}

//  4. Test again:

//? Task 3 – Append items with innerHTML += vs append

//* Goal: see the difference between string-based appending and node-based appending.
//  1. In app.js, after the innerHTML replacement for newTasksList, try:

if (newTasksList) {
    newTasksList.innerHTML += `
        <li class="task">Task D - Added with innerHTML +=</li>
    `;
}

//  2. Then, do the same with createElement

if (newTasksList) {
    const li = document.createElement("li");
    li.classList.add("task");
    li.textContent = "Task E - Added with createElement + append";
    newTasksList.append(li);
}

//? Task 4 – Rebuild “New Tasks” using createElement from an Array

//* Now reset “New Tasks” completely with innerHTML, and then rebuild it using createElement from data.
//  1. Define an array of tasks:

const tasksData = [
    "Learn innerHTML vs createElement",
    "Refactor list rendering logic",
    "Write README for Lesson 09",
];

//  2. Clear the list:

if (newTasksList) {
    newTasksList.innerHTML = "";                    //  wipe
}

//  3. Rebuild using createElement:

if (newTasksList) {
    tasksData.forEach((text) => {
        const li = document.createElement("li");
        li.classList.add("task");
        li.textContent = text;
        newTasksList.append(li);
    });
}

//? Task 5 – Helper: renderTasks(listElement, tasksArray)

//  Extract a reusable renderer that uses node-based creation, not innerHTML:

function renderTasks(listElement, tasks) {
    if (!listElement) return;

    //  OPtion A: simple reset with innerHTML + structured fill
    listElement.innerHTML = "";

    tasks.forEach((text) => {
        const li = document.createElement("li");
        li.classList.add("task");
        li.textContent = text;
        listElement.append(li);
    });
}

//  Example use:

const newTasks = [
    "Task 1 - Render via helper",
    "Task 2 - Render via helper",
];

// Example use (uncomment to see it override previous content):
// const newTasks = [
//   "Task 1 - Render via helper",
//   "Task 2 - Render via helper",
// ];
// renderTasks(newTasksList, newTasks);
// renderTasks(myTasksList, newTasks);