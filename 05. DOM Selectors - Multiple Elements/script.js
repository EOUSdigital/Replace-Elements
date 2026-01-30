"use strict";

//TODO Module 07. Lesson 05. DOM Selectors - Multiple Elements

//  In this lesson we move from selecting one element at a time to selecting groups of elements so we can style, modify, or remove them together. This builds directly on your work with arrays and loops in earlier modules.

//TODO Step 1. Recap: Single vs Multiple Element Selectors

//  So far you’ve used things like:

document.getElementById('main-title');                      //  single element
document.querySelector('.card')

//  These are ideal when you know you want just one element.

//  For many DOM tasks, however, we want to:
//  • Style all buttons.
//  • Add a class to every card.
//  • Update all list items.
//  For that, we need multiple-element selectors.

//TODO Step 2. The Main Multiple-Element Selectors

//? 2.1 document.querySelectorAll()

//  Signature

const elements = document.querySelectorAll('CSS selector');

//  • Accepts any valid CSS selector.
//  • Returns a NodeList (which is array-like and usually has forEach).
//  • The NodeList is static - id does not update automatically if the DOM changes.

//  Example: select all the list items with class .item

const items = document.querySelectorAll('.item');

items.forEach((item, index) => {
    item.textContent = `${index + 1}. ${item.textContent}`;
});

//  What is happening:
//  • We select all elements with .item.
//  • Loop with .forEach.
//  • Update their text to include an index.

//  You can use any CSS selector here:

document.querySelectorAll('p');                             //  select all <p> elements
document.querySelectorAll('.btn.primary');
document.querySelectorAll('ul li:nth-child(even)');
document.querySelectorAll('[data-role="card"]');

//? 2.2 document.getElementsByClassName()

//  Signature

const elements2 = document.getElementsByClassName('class-name');

//  • Returns an HTMLCollection (also array-like, but no forEach directly in older browsers).
//  • It is live - if elements with that class are added/removed, the collection updates automatically.

//  Example:

const buttons = document.getElementsByClassName('btn');

//  Convert to a real array to use array methods:
const btnArray = Array.from(buttons);

btnArray.forEach(btn => {
    btn.style.borderRadius = '9999px';
});

//? 2.3 document.getElementsByTagName()

//  Signature

const elements3 = document.getElementsByTagName('tag-name');

//  • Returns an HTMLCollection of all elements with that tag.
//  • Also love.

//  Example: make all <li> elements bold:

const listItems = document.getElementsByTagName('li');

Array.from(listItems).forEach(li => {
    li.style.fontWeight ='bold';
});

//? 2.4 Quick mention: getElementsByName()

//  Mostly used in forms:

const radios = document.getElementsByName('plan');

//  We will see it less often than the others, but it exists.


//TODO  Step 3. NodeList vs HTMLCollection

//  Both are array-like, but not real arrays:
//  • They have .length.
//  • You can access by index: items[0].
//  • You can iterate with for or for...of.

//  Key differences:

//* NodeList (from querySelectorAll)
//  • Often supports forEach directly:

items.forEach("...");

//  • Static: does not change when the DOM changes (in most cases).

//* HTMLCollection (from getElementsByClassName / getElementsByTagName)
//  • Does not reliably support forEach in older environments.
//  • Live: reflects changes in the DOM automatically.

//  To safely use array methods on either, you can convert to a real array:

const arr1 = Array.from(items);
const arr2 = [...items];                                    //  spread syntax

//  Then:

arr1.map("...");
arr1.filter("...");
arr1.forEach("...");

//  This is where your previous knowledge of array and higher-order methods becomes very powerful.


//TODO  Step 4. Practical Example: Zebra Striping a List

//  Imagine this HTML:

//  HTML can be found in index.html with class three

//  We want to:
//  • Add a light background to every second item.
//  • Add a number prefix to each item.

const tasks = document.querySelectorAll('.tasks .task');

tasks.forEach((task, index) => {
    // Add a number prefix
    task.textContent = `${index + 1}. ${task.textContent}`;

    // Zebra striping: even rows
    if (index % 2 === 1) {
        task.style.backgroundColor = '#f4f4f4';
    }
});

//  This is a classic pattern: select many → iterate → apply some logic.


//TODO  Step 5. Guided Practice (Your Turn)

//  Use a simple HTML file such as:

//  HTML can be found in index.html with class four

//  In app.js, complete the following steps.

//? Task 1 – Select and log
//  1. Select all elements with the class .task using querySelectorAll.
//  2. Log each task’s text content to the console.

//? Task 2 – Modify text with index
//  3. Update each task so it becomes:
//      1) Learn DOM selectors,
//      2) Practice loops, etc.

//? Task 3 – Add a class to every second item
//  4. For every second task (index 1, 3, 5, …) add the class .highlight.

//? Task 4 – Practice with getElementsByTagName
//  5. Use getElementsByTagName('li') to select all <li> elements and:
//  • Convert the result to an array.
//  • Set their style.textTransform to 'uppercase'.

//  If you wish, you can also try getElementsByClassName('task') and see how it behaves if you add/remove tasks dynamically.


//TODO  Step 6. Reflection & Checkpoint

//* A few questions to ensure the concept is clear:
//  1. In your own words, what is the main difference between querySelector and querySelectorAll?
//  Answer: The querySelector() returns the first Element within the document that matches the specific CSS selector, while the method querySelectorAll() will return a static (not live) NodeList representing a list of the document's elements that match the specific group of selectors.

//  2. Why might you convert a NodeList or HTMLCollection into a real array?
//  Answer: The only reason to convert an HTMLCollection and NodeList to an Array is if I want to use higher-order functions like forEach, map, filter, and reduce. 

//  3. Can you think of a situation in a real project (for example, your navigation or cards grid) where you would want to select multiple elements and apply changes in a loop?
//  Answer: I can use NodeList to create a dynamic list for pagination for a website.

//  If you would like, you can paste your app.js solution here, and we can review and refine it together.

//! Feedback

//* 1) querySelector vs querySelectorAll
//  Your answer:
//  • querySelector() returns the first element that matches;
//  • querySelectorAll() returns a static NodeList of all elements that match.
//  This is correct.

//  Two small additions for precision:
//  • Both use CSS selectors (not just simple tag or class names).
//  • querySelectorAll() returning a static NodeList means:
//      • If you add/remove elements after the call, the NodeList does not update automatically.
//  You have captured the essential difference very well: first match vs all matches (as a collection).

//* 2) Converting NodeList/HTMLCollection to a real array
//  Your answer:
//  The only reason to convert … is to use higher-order functions like forEach, map, filter, and reduce.

//  This is almost there, but with two clarifications:
//  1. NodeList already has forEach in modern browsers, so you usually convert a NodeList when you want:
//      • map, filter, reduce, find, some, every, etc.
//      • To pass it into functions that expect a real array.
//  2. HTMLCollection has no array methods at all, so conversion is very common there.
//  Another subtle reason to convert:
//  • Snapshot vs live view:
//      • HTMLCollection is live; if the DOM changes, its contents change.
//      • By converting it to an array (e.g. Array.from(collection)), you freeze the current state and can work with that snapshot safely in a loop.
//  So your main point (higher-order methods) is correct; there are just a couple of practical nuances around live vs static and NodeList’s built-in forEach.

//* 3) Real-project scenario for selecting multiple elements
//  Your answer:
//      Use NodeList to create a dynamic list for pagination for a website.
//  Conceptually, this is on the right track: pagination is a good example where multiple elements are controlled together.

//  To make this more concrete, here’s how this might look in a real UI:
//  • You have page number buttons:

<nav class="pagination">
    <button class="page-btn" data-page="1">1</button>
    <button class="page-btn" data-page="2">2</button>
    <button class="page-btn" data-page="3">3</button>
</nav>

//  • In JavaScript, you would:

const pageButtons = document.querySelectorAll('.page-btn');

pageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const page = Number(btn.dataset.page);

        //  1) Update active button
        pageButtons.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        //  2) Show only the cards for this page
        //  (here you would also select all cards and hide/show them based on page)
    });
});

//  You can do a similar thing in your card grid or navigation:
//  • Select all .nav-link elements and toggle an active class.
//  • Select all .card elements and apply different styles (zebra striping, hover effects, filtering, etc.).
//  Your intuition is good; the more concrete you can be about what you loop over and what you change, the stronger your reasoning.


//TODO  Small Knowledge Test (Lesson 05 – Final Check)

//  Answer these directly in your head or in code; you do not need to send them unless you want feedback.

//? 1. Selector writing
//  You have:

//  HTML can be found in index.html with class grid

//* a) How would you select all cards inside .grid using querySelectorAll?
const cards = document.querySelectorAll('.grid .card');
//  This means: all elements with class card that are descendants of an element with class grid.

//* b) How would you select only the featured card?
const cards = document.querySelector('.card.featured');
//  • .card.featured ensures the element is both a card and featured.
//  • Variable name in singular reflects that querySelector returns one element, not a list.

//? 2. Looping style
//  You called:

const items = document.querySelectorAll('.item');

//  Show two different ways to loop over items:
//  • Using forEach

items.forEach((item, index) => {
    item.textContent = `${index + 1}) ${item.textContent}`;
});

//  • Using for...of

for (const item in items) {
    item.textContent = item.textContent.toUpperCase();
}

//  If you also need the index, you can use entries():

for (const [index, item] of items.entries()) {
    item.textContent = `${index + 1}) ${item.textContent}`;
}

//! Key point:
//  • for...of → values (DOM elements).
//  • for...in → property names / indices (usually not what you want with NodeLists).

//? Array conversion
//  You have:

const liCollection = document.getElementsByTagName('li');

//  How do you:
//  • Convert it to a real array?
const newCollection = Array.from(liCollection);

newCollection.forEach(li => {
    li.style.accentColor = '#7E2811';
})

//  • Use filter to keep only <li> elements whose textContent length is greater than 10?

const longItems = newCollection.filter(li => li.textContent.length > 10);

longItems.forEach(li => {
    li.style.fontWeight = 'bold';
});

//  • Converts the HTMLCollection to an array.
//  • Filters based on the textContent length.
//  • Gives you a new array (longItems) containing only the matching <li> elements.

//! Summary of Key Fixes

//  1. Selectors
//  • Use .grid .card for “cards inside grid”.
//  • Prefer semantic names like featuredCard and selectors like .card.featured.
//  2. Loops
//  • Template literals: use ${index}, not $(index).
//  • Use for...of (not for...in) to iterate over NodeList elements.
//  3. Array conversion and filtering
//  • Convert collections with Array.from(...) or [...collection].
//  • filter must return a boolean; then use the resulting array.

//TODO  Optional Mini-Challenge

//  Pick an area of your own project (for example, a card grid or navigation bar) and:
//  1. Select all relevant elements:
//  • All .card elements in a grid, or
//  • All .nav-link elements in the header.
//  2. Use a loop (forEach or for...of) to:
//  • Add a data-index attribute to each element.
//  • Add a modifier class to even items (e.g. .card--even).
//  • Update a child element’s text (e.g., .card-title) to include the index.
//  3. Observe the result in the browser and tweak styles in CSS.

//! Solution

//? 1) Selector for data-index

const cards  = document.querySelectorAll('.grid .card');

//? 2) Loop over each card
cards.forEach((card, index) => {
    
    //  2.1 Add  data-index attribute
    card.dataset.index = index;                 // or:   card.setAttribute('data-index', index);
    
    //  2.2 Add modifier class to even items
    if (index % 2 === 0) {
        card.classList.add('card-even');
    }

    //  2.3 Update child .card-title
    const titleEl = card.querySelector('.card-title');
    if (!titleEl) {
        titleEl.textContent = `${titleEl.textContent} (${index})`;
    }
});










