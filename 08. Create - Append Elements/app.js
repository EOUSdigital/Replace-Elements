"use strict";

//TODO: 🟦 Module 7 - DOM Manipulation: Lesson 08. Create & Append Elements

//TODO 3. Guided Practice - Using Your Current HTML

//? Task 1 – Create and Append a New “New Task”

//  1. Select the “New Tasks” list in #section3:

const newTasksList = document.querySelector("#section3 .tasks");

//  2. Create a new <li> with class .task and some text, then append it:

if (newTasksList) {
    const li = document.createElement("li");
    li.classList.add("task");
    li.textContent = "Task 5 - Created via JS";
    newTasksList.append(li);
}


//? Task 2 – Prepend an Important Task in “My Tasks”

//  1. Select the "My Tasks" list:

const myTasksList = document.querySelector("#section4 .tasks");

//  2. Create a new <li> and prepend it so it appears first:

if (myTasksList) {
    const importantTask = document.createElement("li");
    importantTask.classList.add("task");
    importantTask.textContent = "🔥 Priority - Review DOM traversal";

    myTasksList.prepend(importantTask);
}


//? Task 3 - Dynamically Create a New Card

//  1. Select the .grid section:

const grid = document.querySelector(".grid");

//  2. Create a new card structure:

if (grid) {
    const card = document.createElement("article");
    card.classList.add("card");

    const title = document.createElement("h2");
    title.classList.add("card-title");
    title.textContent = "Card D (created)";

    //  Optional extra content:
    const body = document.createElement("p");
    body.textContent = "This card was created entirely from JavaScript.";

    //  Assemble
    card.append(title);
    card.append(body);

    //  Insert into grid
    grid.append(card);
}


//? Task 4 - Render a List from an Array (Mini-Pattern)

//  1. Define an array of additional tasks:

const extraTasks = [
    "🔍 Check app.js for errors",
    "🧮 Refactor repeated DOM code",
    "📝 Write README for Lesson 08",
];

//  2. Create and append <li> elements for each entry to the “New Tasks” list (or create a separate list if you prefer):

if (newTasksList) {
    extraTasks.forEach((taskText) => {
        const li = document.createElement("li");
        li.classList.add("task");
        li.textContent = taskText;
        newTasksList.append(li);
    });
}


//? Task 5 - Extract a Helper Function (optional, Recommended)

function createTaskItem(text) {
    const li = document.createElement("li");
    li.classList.add("task");
    li.textContent = text;
    return li;
}

if (newTasksList) {
    newTasksList.append(createTaskItem("Task 6 - Created via helper"));
}

if (myTasksList) {
    myTasksList.prepend(createTaskItem("🔥 Priority - Written via helper"));
}
