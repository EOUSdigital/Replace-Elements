"use strict";

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

