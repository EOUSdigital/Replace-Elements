"use strict";

//TODO  Step 5. Guided Practice – Using Your Current HTML

//  Assume your current HTML (the one you just showed: nav list, tasks, grid with cards, buttons) and a single app.js.
//  Please implement the following steps in app.js. You can keep your previous Lesson 05 code and add these beneath it, or comment some parts out if the console feels noisy.

//? Task 1 – Parent and Children

//  1. Select the section with the cards:

const  gridSection = document.querySelector('.grid');

if (gridSection) {
    //  2. From gridSection, get all direct child elements using .children and log them:
    
    const gridChildren = gridSection.children;
    console.log('Grid children:', gridChildren);
    
    //  3. Log firstElementChild and lastElementChild:
    
    console.log('First card:', gridSection.firstElementChild);
    console.log('Last card:', gridSection.lastElementChild);
}

//? Task 2 – Sibling Traversal in Tasks

//  1. Select the first task from the “My Tasks” list (you can use a more specific selector if you wish, but for now a simple .tasks .task is fine):

const firstTask = document.querySelector('#section4 .tasks .task');

if (firstTask) {
    //  2. Find its nextElementSibling and nextElementSibling again (the 2nd and 3rd tasks):
    
    const secondTask = firstTask.nextElementSibling;
    const thirdTask = secondTask?.nextElementSibling || null;
    
    //  3. Add a class .sibling-highlight to secondTask and .sibling-strong to thirdTask (you will style them in CSS):
    
    if (secondTask) {
        secondTask.classList.add('sibling-highlight');
    }
    
    if (thirdTask) {
        thirdTask.classList.add('sibling-strong');
    }
}

//? Task 3 – Using closest from a Button

//  1. Select one of the buttons:

const saveButton = document.querySelector('#section2 .btn');

if (saveButton) {
    //  2. From that button, find the nearest ancestor section and log it:
    
    const buttonSection = saveButton.closest('section');
    console.log('Button section:', buttonSection);
    
    //  3. Add a class .section-active to that section:
    
    if (buttonSection) {
        buttonSection.classList.add('section-active');
    }
}

//? Task 4 – Combine Traversal and Loop

//  1. Select the featured card:

const featuredCard = document.querySelector('.card.featured');

if (featuredCard) {
    //  2. From it, get the parent .grid:
    
    const grid = featuredCard.closest('.grid');
    
    //  3. From that grid, get all direct children via .children, convert them to an array, and add a class .grid-relative plus a data attribute data-from='featured' to each:
    
    if (grid) {
        const cardsFromGrid = Array.from(grid.children);
        
        cardsFromGrid.forEach((card, index) => {
            card.classList.add('grid-relative');
            card.dataset.from = 'featured';
            card.dataset.indexFromFeatured = index;
        })
    }
    
}

//  This exercise reinforces: start from one element → traverse → operate on nearby elements.































