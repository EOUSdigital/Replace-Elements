"use strict";

//TODO  🟦 Module 7 - DOM Manipulation: Lesson 11. Insert Elements, Text and HTML

//  Exercise A — Build one “insert” function that handles all 4 positions

function insertNotice(targetEl, position, message) {
    if (!(targetEl instanceof Element)) {
        throw new TypeError("insertNotice: targetEl must be a DOM Element.");
    }

    const allowed = ["beforebegin", "afterbegin", "beforeend", "afterend"];
    if (!allowed.includes(position)) {
        throw new Error(`insertNotice: position must be one of ${allowed.join(", ")}`);
    }

    //  Inside a <ul> use <li>. Outside use a block element.
    const isInside = position === "afterbegin" || position === "beforeend";
    const tag = isInside ? "li" : "div";

    const notice = document.createElement(tag);
    notice.className = "notice";
    notice.textContent = message;

    targetEl.insertAdjacentElement(position, notice);
}

const list = document.querySelector("#section3 .tasks");

insertNotice(list, "beforebegin", "Start");
insertNotice(list, "afterbegin", "Task 0");
insertNotice(list, "beforeend", "Task 5");
insertNotice(list, "afterend", "Complete");

//  Exercise B — Insert list items three different ways

function threeDifferentWays(ul) {
    const li = document.createElement("li");
    li.textContent = "Plain text from Lesson 11";
    ul.append(li);

    const heading = ul.closest("section")?.querySelector("h1");
    if (heading) heading.insertAdjacentText("afterend", "Label: ");

    ul.insertAdjacentHTML("beforeend", "<li>Inserted with HTML in Lesson 11</li>");
}

const list3 = document.querySelector("#section3 .tasks");
threeDifferentWays(list3);

//  Mini-challenge (problem-solving, not copying)

function insertAfter(referenceEl, newEl) {
    if (!(referenceEl instanceof Element)) {
        throw new TypeError("insertAfter: referenceEl must be a DOM Element.");
    }

    if (!(newEl instanceof Element)) {
        throw new TypeError("insertAfter: newEl must be a DOM Element.");
    }

    const parent = referenceEl.parentElement;
    if (!parent) {
        throw new Error("insertAfter: referenceEl has no parent element.");
    }

    parent.insertBefore(newEl, referenceEl.nextSibling);
}

window.insertAfter = insertAfter;
