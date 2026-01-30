"use strict";

//TODO Step 5. Guided Practice

// 1. Select all tasks
const tasks = document.querySelectorAll(".task");

// 2. Log text content
tasks.forEach((task) => {
    console.log(task.textContent);
});

// 3. Prefix each task so it becomes:
//    1) Learn DOM selectors, 2) Practice loops, etc.

tasks.forEach((task, index) => {
    task.textContent = `${index + 1}) ${task.textContent}`;
});

// 4. For every second task (index 1, 3, 5, …) add the class .highlight
tasks.forEach((task, index) => {
    if (index % 2 === 1) {
        task.classList.add("highlight");
    }
});

// 5. Use getElementsByTagName('li') to select all <li> elements and:
//    • Convert the result to an array.
//    • Set their style.textTransform to 'uppercase'.
const liCollection = document.getElementsByTagName("li");
const liArray = Array.from(liCollection);

liArray.forEach((li) => {
    li.style.textTransform = "uppercase";
});

//TODO Optional Mini-Challenge

// 1) Cards inside .grid
const cards = document.querySelectorAll(".grid .card");

cards.forEach((card, index) => {
    // 2.1 Add data-index attribute
    card.dataset.index = index;

    // 2.2 Add modifier class to even items (index 0, 2, 4, ...)
    if (index % 2 === 0) {
        card.classList.add("card-even");
    }

    // 2.3 Update child .card-title text to include index (1-based)
    const titleEl = card.querySelector(".card-title");
    if (titleEl) {
        titleEl.textContent = `${index + 1}. ${titleEl.textContent}`;
    }
});

// 2) Pattern for navigation links (the <li> items inside .nav-link)
const navItems = document.querySelectorAll(".nav-link .item");

navItems.forEach((item, index) => {
    // Add data-index
    item.dataset.index = index;

    // Add modifier class to even items
    if (index % 2 === 0) {
        item.classList.add("nav-link--even");
    }

    // Prefix text with index (1-based)
    item.textContent = `${index + 1}. ${item.textContent}`;
});
