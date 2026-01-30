"use strict";

//TODO  🟦 Module 7 - DOM Manipulation: Lesson 11. Insert Elements, Text and HTML

//  This lesson follows directly after “Refactor To Multiple Functions” and focuses on inserting existing elements, plain text, and HTML strings into precise positions in the DOM.

//* What you are learning
//  By the end, you should be able to:
//  • Insert content before/after an element, and at the start/end of an element.
//  • Choose the right API for the job:
//      • Elements → before(), after(), prepend(), append(), insertAdjacentElement()
//      • Text → textContent, insertAdjacentText()
//      • HTML → insertAdjacentHTML() (careful: security)
//  • Explain when to use textContent instead of innerHTML (most of the time).


//TODO  Concept explanation (the “where” and the “what”)

//? 1) The 4 insertion positions (mental model)
//  Most DOM insertion needs fall into these positions relative to a target element:
//  • beforebegin → Before the element. Only valid if the element is in the DOM tree and has a parent element.
//  • afterbegin → Just inside the element, before its first child.
//  • beforeend → Just inside the element, after its last child.
//  • afterend → After the element. Only valid if the element is in the DOM tree and has a parent element.
//  These positions map cleanly to insertAdjacent* methods.

//? 2) The safest default: treat user content as text
//  • Use "textContent" when you want to display a string as-is (safe; no HTML parsing).
//  • Use "insertAdjacentHTML" only for trusted HTML strings you control.

//* Minimal example (reference only)

const list = document.querySelector("#myList");

//  insert HTML at the end (inside list)
list.insertAdjacentElement("beforeend", "<li>New item</li>");

//  insert text at the start (inside list)
list.insertAdjacentElement("afterbegin", "Tasks: ");


//TODO  Guided practice (you write it; I review it)

//? Exercise A — Build one “insert” function that handles all 4 positions

//  Your task: create a function that inserts a small notice message in different places.

//* Requirements
//  1. Function name: insertNotice(targetEl, position, message)
//  2. position must support: "beforebegin" | "afterbegin" | "beforeend" | "afterend"
//  3. The notice must be inserted as an element (not just HTML string).
//  4. The notice must include:
//      • a class (e.g. "notice")
//      • its message as text (use textContent)

//* Hints (not the full solution)
//  • Use document.createElement("div")
//  • Set notice.textContent = message
//  • Use one of:
//      • targetEl.insertAdjacentElement(position, notice)
//      • or map position to before/prepend/append/after

//* Self-check
//  When you call it four times with four positions, you should visibly see the notice move around the target element.

//! Solution app.js


//? Exercise B — Insert list items three different ways

//* Pick an existing <ul> or <ol> from your Lesson 10 UI and implement three buttons:
//  1. Add item (safe text) → uses createElement("li") + textContent + append()
//  2. Add label (text) → uses insertAdjacentText("afterbegin", "...")
//  3. Add item (HTML) → uses insertAdjacentHTML("beforeend", "<li>...</li>")

//* Rule
//  • Only button (3) is allowed to use HTML strings, and only with a hard-coded string you control.

//* Self-check
//  • Explain (in one sentence) why #1 is safer than #3.
//  Answer: The point 1 is safer than point 3 because is using textContent rather than insertAdjacentHTML that can create a safety issue regarding XSS-unsafe elements such as <script>, or event handler content attributes.

//! Solution

function threeDifferentWays(ul) {
    const li = document.createElement("li");
    li.textContent = "Plain text";
    ul.append(li);

    ul.insertAdjacentText("beforebegin", "Label: ");
    
    ul.insertAdjacentHTML("beforeend", "<li>Inserted with HTML</li>");
}

//? Mini-challenge (problem-solving, not copying)

//  You will often want “insert after X”, but older codebases sometimes lack a helper.
//  Challenge: write insertAfter(referenceEl, newEl) without using insertAdjacentElement.

//* Hint
//  • Think: “insert before reference’s next sibling”.

///! Solution app.js

//? Reflection (answer briefly)
//  1. When would you choose textContent over insertAdjacentHTML, and why?
//  Answer: The textContent property of the Node interface represents the text content of the node and its descendants. The insertAdjacentHTML() method of the Element interface parses the specified input as HTML or XML and inserts the resulting nodes into the DOM tree at a specified position. Is not advisable to choose textContent over insertAdjacentHTML because will deal with raw HTML rather than plain text and can be used in XSS attacks. If I am sure that the the text does not contain HTML syntax, it does not convey its meaning and purpose, also can be slower because will search for the HTML parser.

//  2. If your UI becomes slow, why might repeated innerHTML += ... be a problem compared to creating elements?
//  Answer: When I include in my code repeated innerHTML() in different parts of the project can slow down the program because will search to return the HTML content of each element.

















































