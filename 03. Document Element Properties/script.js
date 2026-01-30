"use strict";

//TODO Module 07. Lesson 03. - Document Element Properties

const dm = document.getElementById('dm');
if (dm) {
    const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const saved = localStorage.getItem('dm');                   // "1" | "0" | null
    dm.checked = saved ? saved === '1' : preferDark;            // set initial state

    dm.addEventListener('change', () => {
        localStorage.setItem('dm', dm.checked ? '1' : '0');     // persist choice
    });
}

//TODO  Practice Block — DOM Lesson 01 (You do it)

//* Ground rules (for every task)
//  • Use Console only.
//  • Prefer querySelector/All, firstElementChild/nextElementSibling.
//  • Don’t use innerHTML (unless a task explicitly says “trusted HTML” — today none do).
//  • If something fails, post exactly what you typed and the message you saw.

//* A. Select & Scope (5–7 min)

//? Task A1: Select the first <h1> (or first heading on the page) and confirm it exists.
//  Accept: Console shows the element (not null).
//  Hint if stuck: Search for a generic heading selector first.

//? Task A2: Count how many links are inside the <nav> only.
//  Accept: You get a number (not all links on the page).
//  Hint if stuck: Select the nav first, then query inside it.

//? Task A3: Select all product cards and log how many there are.
//  Accept: The count should match what you see (you said 9 previously).
//  Hint if stuck: Cards have a class and a data-id.

//* B. Traverse (5–7 min)

//? Task B1: Starting from the element with class .current in the menu, add a class neighbor to its previous and next element siblings.
//  Accept: Both neighbors visibly change (outline or style if you set it in CSS).
//  Hint if stuck: Previous/next have “Element” in the property names.

//? Task B2: From the card with data-id="2", climb to the grid container and mark the first and last card with classes edge-first and edge-last.
//  Accept: First and last cards visibly marked.
//  Hint if stuck: Use closest to reach the grid.

//? Task B3 (mini-debug): Verify that the grid contains the card with data-id="3".
//  Accept: You see true in the Console.
//  Hint if stuck: There’s a built-in method that answers “does A contain B?”

//* C. Create & Insert (7–10 min)

//? Task C1: Add a new paragraph at the very end of the page body with the exact text:
//  Added at the end.
//  Accept: The paragraph appears at the bottom.
//  Constraints: Use createElement + safe text API.
//  Hint if stuck: End-of-container insertion method has the same name as the array method.

//? Task C2: Add a paragraph at the very top of the page body with the exact text:
//  Added at the top.
//  Accept: It appears above everything else inside <body>.
//  Hint if stuck: The symmetrical method to C1 but at the start.

//? Task C3: After the first heading you selected in A1, insert a new <em> that displays exactly Hot.
//  Accept: The <em> shows right after the heading.
//  Constraints: Build nodes with DOM methods; no innerHTML.
//  Hint if stuck: Create, set text, then place it with a sibling method.

//? Stretch C4 (optional): Clone that <em> and put the clone before the same heading.
//  Accept: You see Hot on both sides of the heading.
//  Hint if stuck: Cloning requires a specific method with a boolean for “deep”.

//* D. Attributes, Classes, Data, Styles (5–7 min)

//? Task D1: For every card with an even data-id, add a class selected.
//  Accept: Even cards are visibly marked (use a .selected style in your CSS if you want).
//  Hint if stuck: Convert dataset.id to a number and test with %.

//? Task D2: On the featured card (it has a matching class), append a small badge element that reads Featured.
//  Accept: The badge appears inside the featured card, once.
//  Constraints: Create with DOM methods; ensure you do not add duplicates if you re-run.
//  Hint if stuck: Check if a .badge already exists before appending.

//? Task D3: On the grid container, set a data attribute data-count to the number of element children it currently has.
//  Accept: Reading that data-count shows the correct number.
//  Hint if stuck: There’s a property that counts element children only.

//* E. Text vs Visible Text (2–3 min)

//? Task E1: Hide one card (any) using a class, not inline styles. Then compare the length of the container’s textContent and innerText.
//  Accept: The innerText length should be smaller.
//  Constraints: Add a .hidden { display:none } rule if you don’t have one.
//  Hint if stuck: Assign the class, then read both properties and compare.

//! Solution

//  A1. 
document.querySelector('h1');                           //  <h1 class="title">

//  A2. 
document.querySelectorAll('nav a').length;              //  3

//  A3. 
document.querySelectorAll('[data-id]').length;          //  9

//  B1. 
const current = document.querySelector('.current');
current?.previousElementSibling?.classList.add('neighbor');
current?.nextElementSibling?.classList.add('neighbor');

//  B2. 
const median = document.querySelector('[data-id="2"]');
const grid = median?.closest('.grid');
const firstCard = grid?.querySelector('.card:first-child');
const lastCard = grid?.querySelector('.card:last-child');
firstCard?.classList.add('edge-first');
lastCard?.classList.add('edge-last');

//  B3. 
// let grid = document.querySelector('.grid');
let card = document.querySelector('[data-id="3"]');
const isContained = grid.contains(card);

//  C1. 
const paragraph = document.createElement("p");
paragraph.textContent = "Added at the end.";
document.body.append(paragraph);

//  C2. 
const note = document.createElement("p");
note.textContent = "Added at the top.";
document.body.prepend(note);

//  C3. 
const h1 = document.querySelector('h1') || document.body.firstElementChild;
const em = document.createElement('span');
em.textContent = 'Hot';
h1?.after(em)

//  C4.
const copy = em.cloneNode(true);
h1?.before(copy);

//  D1. 
const evenDataCard = document.querySelectorAll('[data-id]');
evenDataCard.forEach(element => {
    if (Number(element.dataset.id) % 2 === 0) {
        element.classList.add("selected");
    }
});

//  D2. 
const el = document.querySelector('.featured');
if (!el.querySelector('.badge')) {
    const badge = document.createElement('span');
    badge.className =  'badge';
    badge.textContent = 'Featured';
    el.append(badge);
};

//  D3. 
/*
const container = document.querySelector('.grid');
const count = container.childElementCount;
container.setAttribute('data-count', count);
*/

//  E1.
/*
const container = document.querySelector('.container');
const tcLen = container.textContent.length;
const itLen = container.innerText.length;
console.log(tcLen, itLen);
*/

//  ‼️ Feedback

//* Love the hustle—this is solid work. Here’s tight, targeted feedback so you can correct just the few spots that need it.

//  ✅ All good as-is

//  • A1–A3: Good. (For A2 you scoped via `nav a` directly; also fine to do `const nav = …; nav?.querySelectorAll('a').length`.)
//  • B1: Perfect.
//  • C2, C4: Correct.
//  • D1: Correct and clear.
//  • D2: Great—you prevented duplicates with the `.badge` check.

//* ⚙️ Tiny improvements / fixes

//? 1. B2 — first/last card selection

//  • Your selectors `'.card:first-child'` & `'.card:last-child'` can fail if `.grid` has any non-`.card` child first/last. Safer:

/*
const median = document.querySelector('[data-id="2"]');
const grid = median?.closest('.grid');
grid?.firstElementChild?.classList.add('edge-first');
grid?.lastElementChild?.classList.add('edge-last');
// or: const cards = grid?.querySelectorAll('.card'); cards?.[0]?.classList.add('edge-first'); cards?.[cards.length-1]?.classList.add('edge-last');
*/

//? 2. B3 — variable reuse

//  • You redeclared `grid` with `let` again (shadowing). Also log the result so you see it:

/*
const grid = document.querySelector('.grid');
const card = document.querySelector('[data-id="3"]');
const isContained = !!grid && grid.contains(card);
console.log(isContained); // expect true
*/

//? 3. C1 — exact text

//  The prompt asked for a period: `"Added at the end."` (yours missed it). If you care about exact match:

/*
paragraph.textContent = "Added at the end.";
*/

//? 4. C3 — tag choice

//  The task said `<em>`, but you created a `<span>`. Functionally fine; if you want to match it exactly:

/*
const h1 = document.querySelector('h1') || document.body.firstElementChild;
const em = document.createElement('em');
em.textContent = 'Hot';
h1?.after(em);
*/

//? 5. D3 — attribute vs dataset

//  Works, but `dataset` is a bit cleaner and ensures a string:

/*
const container = document.querySelector('.grid');
container.dataset.count = String(container.childElementCount);
*/

//? 6. E1 — wrong target + missing “hide” step

//  Your page likely doesn’t have `.container`; use `.grid` (or another real element). Also the task wanted you to **hide a card** first. Do this sequence:


// 1) Hide one card via a class
document.querySelector('.card')?.classList.add('hidden');   // ensure CSS has .hidden { display:none }

// 2) Compare text lengths on the *grid* (or the parent section you want to measure)
const box = document.querySelector('.grid');
const tcLen = box.textContent.length;                       // includes hidden text
const itLen = box.innerText.length;                         // visible text only
console.log(tcLen, itLen);                                  // innerText should be smaller

//* 💡 Optional polish

//  Combine your B1 lines if you like:

const current2 = document.querySelector('.current');
[current2?.previousElementSibling, current2?.nextElementSibling]
        .filter(Boolean).forEach(el => el.classList.add('neighbor'));

//  Add a small CSS rule so your class changes pop visually:

/*
.neighbor { outline: 2px dashed orange; }
.edge-first { outline: 2px solid green; }
.edge-last { outline: 2px solid red; }
.selected { outline: 2px dashed orange; }
*/

//* Your next move

//  Run just these fix checks and send the outputs:

//  1. B3: `console.log(isContained)` prints `true`.
//  2. E1: After hiding one card, `textContent.length` vs `innerText.length` (post the two numbers).
//  3. D3: `document.querySelector('.grid')?.dataset.count` returns the number you expect.

//! Result

//* Great work — your checks prove you’ve got it:
//  • B3: true → the grid does contain the [data-id="3"] card.
//  • E1: textContent 722 vs innerText 169 → hidden content is excluded from innerText as expected.
//  • D3: dataset.count is "9" → stored as a string (that’s normal for dataset).
//  Ready to keep momentum? Here’s a short, focused practice block — you do it, I’ll only review results.


//TODO: Practice Block 2 (10–15 min)

//* F) Select & Scope

//? F1. Count all links on the page, then count links inside nav only, and print both numbers and their difference.
//  Accept: three numbers in the console (total, in-nav, difference).
//  Hint (if stuck): Do the global count first; then const nav = …; nav?.querySelectorAll('a').length.

//? F2. Select the last card in two different ways:
//  1. With one CSS selector,
//  2. With traversal from the grid (no CSS :last-*).
//  Accept: both ways return the same <article class="card" data-id="…">.
//  Hint: Think :last-of-type vs grid.lastElementChild (and confirm it’s a .card).

//* G) Traverse & Update

//? G1. Add class odd to cards with odd data-id.
//  Accept: odd-numbered cards visibly marked.
//  Constraint: Use the dataset.id value, not :nth-child.
//  Hint: Number(el.dataset.id) % 2 !== 0.

//? G2. Starting from the featured card, jump to its next element sibling and set a data attribute data-after="featured".
//  Accept: reading next.dataset.after returns "featured".

//* H) Create, Insert, Verify

//? H1. Create a new card via DOM methods (no innerHTML) with:
//  • tag: <article class="card" data-id="10"><h2 class="name">Ten</h2></article>
//  • insert it at the end of the grid.
//  • then update the grid’s data-count to reflect the new total.
//  Accept: .card count is 10, and grid.dataset.count is "10".
//  Hint: createElement twice (article, h2), set className, dataset.id, textContent, then append.

//* I) Safety & Cleanup

//? I1. Ensure there’s only one .badge inside the featured card (remove extras if any).
//  Accept: featured.querySelectorAll('.badge').length is 1.
//  Hint: If count > 1, remove all but the first.

//* What to send me

//  Post only these:
//  1. The three numbers from F1.
//  2. The code you used for F2 (both ways).
//  3. The count after H1: document.querySelectorAll('.card').length and grid.dataset.count.
//  4. The badge count after I1.

//! I will review and give you the next small block based on what (if anything) needs tightening.

//! Solution

//? F) Select & Scope

//  F1.
const allLinksCount = allLinks?.querySelectorAll('a').length;
const nav = document.querySelector('nav a');
const navLinksCount = nav ? nav?.querySelectorAll('a').length : 0;
const difference = navLinksCount - allLinksCount;
console.log(allLinksCount, navLinksCount, difference);

//  F2.1 - The :last-of-type CSS pseudo-class represents the last element of its type (tag name) among a group of sibling elements.

const lastBySelector = document.querySelector('.card:last-of-type');

//  F2.2

const grid = document.querySelector('.grid');
const lastByTraverse = grid?.lastElementChild;

//? G) Traverse & Update

//  G1.

document.querySelectorAll('.card').forEach(element => {
    if (Number(element.dataset.id) % 2 !== 0) {
        element.classList.add('odd');
    }
});

//  G2.

const featured = document.querySelector('.featured');
const next = featured.nextElementSibling;
if (next) {
    next.setAttribute('data-after', 'featured');
}

//? H) Create, Insert, Verify

const grid = document.querySelector('.grid');
const article = document.createElement('article');
article.className = 'card';
article.dataset.id = '10';
const h2 = document.createElement('h2');
h2.className = 'name';
h2.textContent = "Ten";
grid.append(article);
article.append(h2);

grid.dataset.count = String(grid.childElementCount);

//? I) Safety & Cleanup

const featuredCard = document.querySelector('.featured');
const badges = featuredCard?.querySelectorAll('.badge') ?? [];
if (badges > 1) {
    for (let i = 1; i < badges.length; i++) {
        badges[i].remove();
    }
}

//  ‼️ Feedback

//  You are doing solid work. Here’s tight feedback with only the minimal fixes you need—then you run it and tell me the numbers.

//* Quick fixes (type these, do not rewrite everything)

//? F1 — counts

//  You referenced variables that don’t exist. Use the DOM directly and compute the right difference.

```js
const allLinksCount = document.querySelectorAll('a').length;
const nav = document.querySelector('nav');
const navLinksCount = nav ? nav.querySelectorAll('a').length : 0;
const difference = allLinksCount - navLinksCount; // total minus in-nav
console.log(allLinksCount, navLinksCount, difference);
```

//? F2 — last card (both ways)

//  Your versions are fine; just scope the selector and guard the traversal:

```js
// 1) Selector way (scoped)
const lastBySelector = document.querySelector('.grid .card:last-of-type');

// 2) Traversal way (ensure it’s actually a .card)
const grid = document.querySelector('.grid');
const lastByTraverse =
    grid?.lastElementChild?.matches('.card')
        ? grid.lastElementChild
        : grid?.querySelector('.card:last-of-type');

console.log(lastBySelector === lastByTraverse); // should be true
```

//? G1 — odd cards

//  You queried `'grid'` (tag) instead of **`.card`** elements.

```js
document.querySelectorAll('.card').forEach(el => {
    if (Number(el.dataset.id) % 2 !== 0) el.classList.add('odd');
});
```

//? G2 — data attribute

Yours works. Tiny improvement: use `dataset`.

```js
document.querySelector('.featured')?.nextElementSibling?.dataset.after = 'featured';
```

//? H1 — new card + update count

//  Watch redeclarations of `grid` (use a different variable name).

```js
const gridEl = document.querySelector('.grid');
const article = document.createElement('article');
article.className = 'card';
article.dataset.id = '10';

const h2 = document.createElement('h2');
h2.className = 'name';
h2.textContent = 'Ten';

article.append(h2);
gridEl.append(article);

gridEl.dataset.count = String(gridEl.childElementCount);
```

//? I1 — keep exactly one badge

//  You used `count` by mistake. Use `badges.length` and remove extras.

```js
const featuredCard = document.querySelector('.featured');
const badges = featuredCard ? featuredCard.querySelectorAll('.badge') : [];
badges.forEach((b, i) => { if (i > 0) b.remove(); });
```

//! Send me these 4 things after you run the fixes

//  1. The three numbers from F1 (`total, inNav, difference`).
//  2. The result of `console.log(lastBySelector === lastByTraverse)` from F2.
//  3. After H1, the values of:

```js
document.querySelectorAll('.card').length
document.querySelector('.grid').dataset.count
```

//  4. After I1 the value of:

```js
document.querySelector('.featured')?.querySelectorAll('.badge').length
```

//TODO: 📝 Practice Block 3 (≈10 min)

//* Ground rules
//  Console only. Prefer `querySelector/All`, element-based traversal (`firstElementChild`, `nextElementSibling`). No `innerHTML`.

//* J) Select, scope, and snapshots

//? J1. External links
//  Count all links that open in a new tab.
//  Accept: you log a single number.
//  Hint (if stuck): attribute selector for `target`.

//? J2. Static vs fresh count
//  1. Save a snapshot: `const snap = document.querySelectorAll('.card');`
//  2. Append one new card (id 11) to the grid (build via DOM methods).
//  3. Log `snap.length` and then `document.querySelectorAll('.card').length`.
//  Accept: first number stays the same; second number increases by 1.
//  Hint: `querySelectorAll` → static* NodeList.
//  Cleanup (optional): remove the last card when done.

//? K) Traverse like a pro

//* K1. “Between” markers
//  From the grid’s first and last cards, mark every element sibling "between" them with class `between`.
//  Accept: only middle cards have `between`.
//  Hint: start at `first.nextElementSibling`, loop until you hit `last`.

//* K2. `closest()` drill
//  Pick any “Add to cart” button, find its card with `closest('.card')`, and set a class `clicked-from-script` on that card.
//  Accept: the containing card has that class.
//  Hint: start from a button, not from the grid.

//? L) Create & insert precisely

//* L1. Insert before a specific card
//  Create card #12 (`<article class="card" data-id="12"><h2 class="name">Twelve</h2></article>`) and insert it **before** the card with `data-id="2"`.
//  Accept: inspecting the DOM shows #12 immediately before #2.
//  Hint: find the target first; then use a sibling insertion method.

//* L2. Batch add to the menu
//  Using a `DocumentFragment`, add three menu items: `Alpha`, `Beta`, `Gamma` to the end of the menu.
//  Accept: menu count increases by 3 in a single append.
//  Hint: build all three first, then append the fragment once.

//# What to send me (just these)

//  1. J1: the external link count.
//  2. J2: the two numbers you logged (snapshot vs fresh).
//  3. K2: the class list of the card you modified (e.g., output of `card.className`).
//  4. L1: the `data-id` sequence of the **first three cards** after insertion (e.g., `[1,12,2]` or whatever your first three are).
//  5. L2: the new menu item count.

//! Solution

//* J) Select, scope, and snapshots

//? J1. External links

document.addEventListener('DOMContentLoaded', () => {
    const externalLinks = document.querySelectorAll('a[target="_blank]"').length;
    console.log(externalLinks);
})

//  The document.addEventListener('DOMContentLoaded', () => {}) ensures the code runs after the HTML document is fully loaded. The line const externalLinks = document.querySelectorAll('a[target="_blank]"').length; returns a NodeList of links.

//? J2. Static vs fresh count

const snap = document.querySelectorAll('.card');
const article = document.createElement('article');
article.className = 'card';
article.dataset.id = '11';

const grid = document.querySelector('.grid');
grid.append(article);

console.log(snap.length); 
console.log(document.querySelectorAll('.card').length);

article.remove();

//? K) Traverse like a pro

//* K1. “Between” markers

const grid = document.querySelector('.grid');
const first = grid?.firstElementChild;
const last = grid?.lastElementChild;

let cur = first?nextElementSibling;
while (cur && cur !== last) {
    cur.classList.add('between');
    cur = cur.nextElementSibling;
}

document.querySelectorAll('.between').length;

//* K2. `closest()` drill

const button = document.querySelector('.add-to-cart');
const card = button.closest('.card');
if (card) {
    card.classList.add('clicked-from-script');
}


//? L) Create & insert precisely

//* L1. Insert before a specific card

const card12 = document.createElement('article');
card12.className = 'card';
card12.setAttribute('data-id', '12');
card12.innerHTML = '<h2 class = "name">Twelve</h2>';

const card2 = document.querySelector('.card[data-id="2"]');

if (card && card2.parentNode) {
    card2.parentNode.insertBefore(card12, card2);
}

//* L2. Batch add to the menu

const menu = document.querySelector('.menu');

const fragment = document.createDocumentFragment();

['Alpha', 'Beta', 'Gamma'].forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;
    fragment.appendChild(li);
});


//  ‼️ Feedback

//? J1. External links

//  Great start! Two tiny fixes:

//  1. Selector typo: You’ve got an extra quote inside the attribute value. It should be:

```
'a[target="_blank"]'
```

//  2. No need for DOMContentLoaded in the Console: You’re running this after the page is loaded, so you can query directly.

//  Try this directly in the Console (no wrapper), then tell me the number you see:

```js
document.querySelectorAll('a[target="_blank"]').length
```

//  Self-check: in the tiny playground I gave you, this should be 1 (the “Docs” link).

//  Stretch (optional, only if you want to be precise about “external”): count links whose `origin` differs from the current page:

```js
[...document.querySelectorAll('a[href]')].filter(a => {
    try { return new URL(a.href, location.href).origin !== location.origin; }
    catch { return false; }
}).length
```

//? J2. Static vs fresh count

```js
const snap = document.querySelectorAll('.card');
const article = document.createElement('article');
article.className = 'card';
article.dataset.id = '11';

const grid = document.querySelector('.grid');
grid.append(article);

console.log(snap.length); 
console.log(document.querySelectorAll('.card').length);

article.remove();
```

//? K1.

```js
const grid = document.querySelector('.grid');
const first = grid?.firstElementChild;
const last  = grid?.lastElementChild;

let cur = first?.nextElementSibling;
while (cur && cur !== last) {
    cur.classList.add('between');
    cur = cur.nextElementSibling;
}

// self-check:
document.querySelectorAll('.between').length
```

//? K2. `closest()` drill

```html
<button class="btn add" data-action="add">Add to cart</button>
```

//  —not `.add-to-cart`.

//  Use a matching selector and guard against `null`:

```js
// pick any "Add to cart" button
const button = document.querySelector('[data-action="add"]').length;           //  or '.btn.add'

// climb to its card and mark it
const card = button?.closest('card');
card?.classList.add('clicked-from-script');

// self-check
console.log(card?.className); // should include "clicked-from-script"
```

//  If you want to target a specific one (e.g., the last card’s button):

```js
const button = document.querySelector('.card:last-of-type [data-action="add"]');
```

//  Run it and send me the output of `console.log(card?.className)`.

//! Grab one real button (prefer a scoped, unambiguous pick), then climb:

```js
const button =
    document.querySelector('.card:last-of-type [data-action="add"]')
    || document.querySelector('.card:last-of-type .btn.add')
    || [...document.querySelectorAll('button')].find(b => b.textContent.includes('Add to card'));

    console.log('button found?', button?.outerHTML);

    const card = button?.closest('.card');
    console.log('card found?', !!card);
    card?.classList.add('clicked-from-script');
    console.log(card?.className);
```

//? L1 — insert #12 before #2 (no innerHTML)

//  Build the <h2> via DOM APIs and insert with before(). Also avoid dupes.

```js
if (!document.querySelector('.card[data-id="12"]')) {
    const card12 = document.createElement('article');
    card12.className = 'card';
    card12.dataset.id = '12';

    const h2 = document.createElement('h2');
    h2.className = 'name';
    h2.textContent = 'Twelve';
    card12.append(h2);

    const card2 = document.querySelector('.card[data-id="2"]');
    card2?.before(card12);
}

// self-check (first three data-ids):
[...document.querySelectorAll('.card')].slice(0,3).map(c => c.dataset.id)
```

//? L2 — batch add to the menu

//  • You created the lis but didn’t give them the class or append the fragment.

```js
const menu = document.querySelector('.menu');
const frag = document.createDocumentFragment();

['Alpha', 'Beta', 'Gamma'].forEach(name => {
    const li = document.createElement('li');
    li.className = 'menu-item';
    li.textContent = name;
    frag.append(li);
});

menu.append(frag);

document.querySelector('#menu').children.length;
```

//* Nice work — all four results check out:
//  • J1: 1 ✅
//  • K1: 8 ✅ (you had 10 cards at that time → 10 − 2 = 8 “between”)
//  • L1: ["1","12","2"] ✅ (inserted #12 before #2)
//  • L2: 7 ✅ (original 4 + Alpha/Beta/Gamma)


//TODO  📝 Practice Block 4 (≈10 min)

//* M. Parity & metadata

//? M1. Add class `even` to cards with even `data-id`, and class `odd` to odd ones.
//  Accept: two numbers equal `evenCount + oddCount === totalCards`.
//  Hint: use `Number(el.dataset.id) % 2`.

//? M2. For every “Add to cart” button, set an **ARIA label** like `Add Notebook` using the card’s `<h2 class="name">…</h2>` text.
//  Accept: reading `button.getAttribute('aria-label')` shows the right string.
//  Hint: start at the button → `closest('.card')` → find `.name`.

//* N. Insert & update

//? N1. Create two new cards **#13** “Thirteen” and **#14** “Fourteen” using a **DocumentFragment**, append both to the end of the grid in **one** operation, then update `grid.dataset.count`.
//  Accept: `.card` count increases by 2, and `grid.dataset.count` matches.
//  Hint: build `article+ h2` for each, append to a `DocumentFragment`, then `grid.append(frag)`.

//? N2. Remove the special card **#12** you inserted earlier.
//  Accept: the first three `data-id`s are back to something like `["1","2","3"]`.
//  Hint: select it and call `.remove()`.

//* O. Quick integrity checks

//? O1. Log these three lines (should agree):
//  • total cards: `document.querySelectorAll('.card').length`
//  • `Number(document.querySelector('.grid').dataset.count)`
//  • `document.querySelectorAll('.between').length + 2`

//! What to send me

//  1. M1: the two numbers you counted for `even` and `odd` (and the total).
//  2. M2: the `aria-label` of the **last** “Add to cart” button you updated.
//  3. N1: the new card count and `grid.dataset.count`.
//  4. N2: the first three `data-id`s after removing #12.
//  5. O1: the three integrity numbers you logged.


//! Solution

//* M. Parity & metadata

//? M1. Add class `even` to cards with even `data-id`, and class `odd` to odd ones.




//? M2. For every “Add to cart” button, set an **ARIA label** like `Add Notebook` using the card’s `<h2 class="name">…</h2>` text.



//* N. Insert & update

//? N1. Create two new cards **#13** “Thirteen” and **#14** “Fourteen” using a **DocumentFragment**, append both to the end of the grid in **one** operation, then update `grid.dataset.count`.



//? N2. Remove the special card **#12** you inserted earlier.



//* O. Quick integrity checks

//? O1. Log these three lines (should agree):





//TODO  Nano Block A — DOM reps (you do it)

//? A1. Find one button three ways
//  Goal: prove you can reliably select the same “Add to cart” button.
//  • Pick the featured card’s button.
//  • Log three booleans; each should be true.
//  • Constraints: no changes to the page yet.

//  What to log (exactly):

!!document.querySelector('.featured [data-action="add"]');
!!document.querySelector('.featured .btn.add');
!![...document.querySelectorAll('.featured button')].find(b => b.textContent.includes('Add to cart'));

//  Send me: the three true/false values you see (in order).

//? A2. Flip a class, then undo
//  Goal: apply then remove a class on that same card.
//  Constraints: no innerHTML, only class APIs.
//  What to run:

const btn = document.querySelector('.featured [data-action="add"]');
const card = btn?.closest('.card');
card?.classList.add('ping');
card?.classList.contains('ping');
card?.classList.remove('ping');
card?.classList.contains('ping');

//  Send me: the two booleans you saw (should be true then false).

//? A3. Add something, then undo it
//  Goal: make one new card and then roll it back so your page returns to normal.
//  Constraints: DOM methods only; no innerHTML.

//  What to run:

const grid = document.querySelector('.grid');
const before = document.querySelectorAll('.card').length;

const tmp = document.createElement('article');
tmp.className = 'card';
tmp.dataset.id = 'TEMP';

const h2 = document.createElement('h2');
h2.className = 'name';
h2.textContent = 'Temp';
tmp.append(h2);
grid.append(tmp);

const during = document.querySelectorAll('.card').length;
tmp.remove();

const after = document.querySelectorAll('.card').length;
console.log(before, during, after);

console.log([...document.querySelectorAll('.card')].slice(-2).map(c => c.dataset.id));
// should show something like ["TEMP", "<last-id>"] before removal


//  Send me: the three numbers before, during, after.

//! When stuck (use this 4-step mini-debug)
//  1. read the error text; if it says “null”, your selector didn’t match.
//  2. split it: first select into a variable, then console.log(var).
//  3. if it’s an element, var?.outerHTML to confirm it’s the right one.
//  4. proceed one method at a time.

//! Solution

//? A1. Find one button three ways

//  !!document.querySelector('.featured [data-action="add"]');
!!document.querySelector('.featured .btn.add');
!![...document.querySelectorAll('.featured button')].find(b => b.textContent.includes('Add to cart'));
true 

//? A2. 

const btn = document.querySelector('.featured [data-action="add"]');
const card = btn?.closest('.card');
card?.classList.add('ping');
console.log(card?.classList.contains('ping'));
card?.classList.remove('ping');
true 
false

//? A3.

const grid = document.querySelector('.grid');
const before = document.querySelectorAll('.card').length;

const tmp = document.createElement('article');
tmp.className = 'card';…
10 11 10
Array [ "9", "10" ]


//TODO  Nano Block B — your turn

//? B1. Move, then restore
//  Goal: move the first card to the end, then move it back to the front.
//  • Constraints: use DOM methods only (append, then prepend with the same node).
//  • Self-check: log the first card’s data-id before move, after move, after restore.
//! Send me: the three IDs you saw, in order.

//? B2. Add ARIA labels to buttons
//  Goal: for every “Add to cart” button, set aria-label to:
//  Add <card name> (e.g., Add Notebook).
//  • Constraints: start from each button → closest('.card') → find .name → read its text → set attribute or dataset.
//  • Self-check: log the aria-label of the last button.
//! Send me: that final label string.

//? B3. Insert a temporary card after #3, then remove it
//  Goal: build via DOM methods (no innerHTML)
//  <article class="card" data-id="TEMP2"><h2 class="name">Temp 2</h2></article>
//  Insert it after the card with data-id="3", confirm placement, then remove it.
//  • Constraints: find target first; use after() to insert; remove when done.
//  • Self-check: right after insertion, log the three IDs around it (like ["3","TEMP2","4"]).
//! Send me: that three-ID sequence you logged.


//! Solution

//? B1. Move, then restore

const grid = document.querySelector('.grid');
document.querySelector.prepend('.card[data-id="1"]');
document.querySelector.append('.card[data-id="1"]');
document.querySelector.prepend('.card[data-id="1"]');

//? B1. Micu

const grid  = document.querySelector('.grid');
const first = document.querySelector('.card[data-id="1"]');         // this returns the node
console.log(first.dataset.id);                                      // BEFORE → should log "1"

grid.append(first);                                                 // move to END
console.log(grid.lastElementChild.dataset.id);                      // AFTER MOVE → should log "1"

grid.prepend(first);                                                // move back to START
console.log(grid.firstElementChild.dataset.id);                     // AFTER RESTORE → should log "1"

//? B2. Add ARIA labels to buttons

const buttons = document.querySelectorAll('.btn.add');

buttons.forEach(btn => {
    const card = btn.closest('.card');
    const productName = card.querySelector('.name').textContent.trim();
    btn.setAttribute('aria-label', `Add ${productName}`);
});

console.log(buttons[buttons.length - 1].getAttribute('aria-label'));

//?  B2. Micu

document.querySelectorAll('.btn.add').forEach(btn => {
    const card = btn.closest('.card');
    const name = card?.querySelector('.name')?.textContent?.trim();
    if (name) btn.setAttribute('aria-label', `Add ${name}`);
});

[...document.querySelectorAll('.btn.add')].map(b => b.getAttribute('aria-label'));

//? B3. Insert a temporary card after #3, then remove it

const target = document.querySelector('.card[data-id="3"]');

const tempCard = document.createElement('article');
tempCard.className = 'card';
tempCard.setAttribute('data-id', 'TEMP2');

const h2 = document.createElement('h2');
h2.className = 'name';
h2.textContent = 'Temp 2';
tempCard.appendChild(h2);

target.after(tempCard);

const prev = target.getAttribute('data-id');
const next = tempCard.nextElementSibling?.getAttribute('data-id');
console.log([prev, tempCard.getAttribute('data-id'), next]);

tempCard.remove();

//? B3. Micu

//  Tiny optional tweak next time: you can use the friendlier accessors:
const prev = target.dataset.id;
const next = tempCard.nextElementSibling?.dataset.id;


//TODO  Nano Block C


//? C1. Mark every third card

//  Goal: add class `third` to cards where the 1-based index is divisible by 3 (3, 6, 9, …).
//  • Constraint: loop over `.card` NodeList; use the loop index.
//  • Self-check: the count equals `Math.floor(totalCards / 3)`.
//  • Send me: the number you logged for `.third` cards.

//? C2. Rebuild the last card safely

//  Goal: replace the last card’s content using `replaceChildren()` with:

```html
<h2 class="name">Last</h2>
<button class="btn add" data-action="add">Add to cart</button>
```

//  Then set the button’s `aria-label` to `Add Last`.
//  • Constraints: create elements via `createElement`; no `innerHTML`.
//  • Self-check: log `lastCard.querySelector('.name').textContent` and the button’s `aria-label`.
//  • Send me: those two strings.

//? C3. Sync the grid’s data-count

//  Goal: set `grid.dataset.count` to the actual number of `.card` elements.
//  • Constraint: compute from `document.querySelectorAll('.card').length`.
//  • Self-check: log both numbers on one line.
//  • Send me: the two numbers you logged.

//! Solution

//? C1. Mark every third card

const cards = document.querySelectorAll('.card');
cards.forEach((card, idx) => {
    if ((idx + 1) % 3 === 0) card.classList.add('third');
});

const thirdCount = document.querySelectorAll('.third').length;
const totalCards = cards.length;
const count = Math.floor(totalCards / 3);

console.log(thirdCount);                                        // Number of .third cards
console.log(thirdCount === count);                              // Self-check: true if equal


//? C2. Rebuild the last card safely

// Create <h2.name> with text Last and a <button.btn.add data-action="add">Add to cart</button>.
// Do lastCard.replaceChildren(h2, btn).
// Set btn.setAttribute('aria-label','Add Last').
// Send me: the two strings you log: the name text and the button’s aria-label.

const lastCard = document.querySelector('.grid .card:last-of-type');

const h2 = document.createElement('h2');
h2.className = 'name';
h2.textContent = 'Last';

const btn = document.createElement('button');
btn.className = 'btn add';
btn.dataset.action = 'add';
btn.textContent = 'Add to cart';
btn.setAttribute('aria-label', 'Add Last');

lastCard.replaceChildren(h2, btn);

// self-check (send me these two outputs)
console.log(lastCard.querySelector('.name').textContent);
console.log(lastCard.querySelector('button').getAttribute('aria-label'));


//? C3. Sync the grid’s data-count

// Compute actual = document.querySelectorAll('.card').length.
// Set document.querySelector('.grid').dataset.count = String(actual).
// Send me: the two numbers you log: actual and Number(grid.dataset.count).

const grid = document.querySelector('.grid');
const actual = document.querySelectorAll('.card').length;
grid.dataset.count = String(actual);

// self-check (send me these two numbers)
console.log(actual, Number(grid.dataset.count));


//TODO  Nano Block D

//? D1) Index the nav links
//  • Goal: add data-index (0-based) to each <a> inside <nav>.
//  • Constraints: scope to <nav> first, then loop.
//  • Accept: the last link’s dataset.index === count − 1.
//  • Send me: the last link’s dataset.index value.

//? D2) Attribute vs property on #email
//  • Goal: prove the difference between value attribute vs value property.
//  • Steps: set the attribute to alpha, then set the property to beta, then log both.
//  • Accept: the two logged strings are different.
//  • Send me: the two strings you logged (attribute first, then property).

//? D3) textContent vs innerHTML
//  • Goal: show that textContent treats tags as text; innerHTML parses them.
//  • Steps: create a temp <div>, set textContent to "<em>Sale</em>", check if it contains <em> (should be false), then set innerHTML to the same string and check again (should be true). Remove the temp node.
//  • Send me: the two booleans you logged (before/after).

//! Solution

//? D1) Index the nav links

const navElement = document.querySelector('nav');
if (!nav) { console.warn('No <nav> found'); }
const aElement = navElement.querySelectorAll('a');

aElement.forEach((element, index) => {
    element.dataset.index = index;
});

const lastIndex = aElement[aElement.length - 1].dataset.index;
console.log(lastIndex, aElement.length - 1);
console.log([...aElement].map(a => a.dataset.index));

//? D2) Attribute vs property on #email

//* A) Attribute vs property (clearest):

const input = document.getElementById('email');
input.setAttribute('value', 'alpha');
input.value = 'beta';
console.log(input.getAttribute('value'), input.value);

//* B) defaultValue vs value (also valid):

const input = document.getElementById('email');
input.defaultValue = 'alpha';
input.value = 'beta';
console.log(input.defaultValue, input.value);

//? D3) textContent vs innerHTML

const test = document.createElement('div');

// Treat as text (no HTML parsing)
test.textContent = '<em>Sale</em>';
document.body.append(test);
const beforeHasEm = !!test.querySelector('em');

// Parse as HTML
test.innerHTML = '<em>Sale</em>';
const afterHasEm = !!test.querySelector('em');

// 3) Remove the test
test.remove();

// Log
console.log(beforeHasEm, afterHasEm);


//TODO  Nano Block E (next)

//? E1) Rename cards by ID
//  • Goal: set each .name text to Product #<data-id>.
//  • Constraints: DOM methods only (no innerHTML); skip cards that lack .name by creating one if necessary.
//  • Accept: first and last card show the expected pattern.
//  • Send me: the .textContent of the first and last .name.

//? E2) External-link hygiene
//  • Goal: for every link that opens in a new tab, ensure rel="noopener noreferrer" is present.
//  • Constraints: don’t touch links without target="_blank".
//  • Accept: you can count how many links you updated (0 is valid).
//  • Send me: the number of links you set/updated.

//? E3) Hide one, measure text
//  • Goal: add class .hidden (with display:none in your CSS) to any one card, then compare the grid’s textContent.length vs innerText.length.
//  • Accept: innerText.length is smaller.
//  • Send me: the two numbers.


//! Solution

//? E1) Rename cards by ID

const rename = document.querySelectorAll('.card');

rename.forEach((card) => {
    let newName = card.querySelector('.name');
    
    if (!newName) {
        newName = document.createElement('span');
        newName.className = 'name';
        card.append(newName);
    }
    
    newName.textContent = `Product #${card.dataset.id}`;
})

const allNames = document.querySelectorAll('.name');
const firstName = allNames[0].textContent;
const lastName = allNames[allNames.length - 1].textContent;

console.log(allNames[0].textContent, allNames[allNames.length - 1].textContent);


//? E2) External-link hygiene

const externalLink = document.querySelectorAll('a[target="_blank"]');
let updatedCount = 0;

externalLink.forEach(link => {
    let rel = link.getAttribute('rel') || '';
    let tokens = rel.toLowerCase().split(/\s+/).filter(Boolean);

    let changed = false;
    if (!tokens.includes('noopener')) {
        tokens.push('noopener');
        changed = true;
    }

    if (!tokens.includes('noreferrer')) {
        tokens.push('noreferrer');
        changed = true;
    }

    if (changed) {
        link.setAttribute('rel', tokens.join(' '));
        updatedCount++;
    }
});


console.log(`Updated ${updatedCount} link(s).`);

//? E3) Hide one, measure text

const cards = document.querySelectorAll('.card');
if (cards.length > 0) {
    cards[0].classList.add('hidden');
}

const grid  = document.querySelector('.grid');
const textLength = grid.textContent.length;
const innerLength = grid.innerText.length;

console.log(`textContent.length: ${textLength}`);
console.log(`innerText.length: ${innerLength}`);


//TODO  Final Checkpoint (5 short tasks)

//? Ck1) One precise selector
//  • Goal: a single selector that targets the featured card’s “Add to cart” button.
//  • Send me: just the selector string you used.

//? Ck2) Traverse up
//  • Goal: start from any .name element and reach the grid element without using a global selector.
//  • Accept: you land on the correct .grid.
//  • Send me: the .className (or an equivalent proof) of the node you reached.

//? Ck3) Insert before last
//  • Goal: create a new card #99 named “Ninety-Nine” and place it before the last card.
//  • Constraints: DOM methods only.
//  • Accept: the second-to-last card has data-id="99".
//  • Send me: the last two data-id values after your insertion.

//? Ck4) Clean edges idempotently
//  • Goal: ensure only the first card has edge-first and only the last has edge-last (remove any previous ones, then set the correct ones).
//  • Accept: querying for each of those classes returns exactly one node, and they’re first/last.
//  • Send me: the two data-ids of the nodes that have edge-first and edge-last.

//? Ck5) Safe tip under nav
//  • Goal: create (via DOM APIs) a line under <nav> that reads:
//  • Tip: Use querySelector for precision. with querySelector wrapped in a <code> tag.
//  • Accept: it appears immediately after <nav>.
//  • Send me: the parent tag name of the node you inserted (should be the element directly following <nav>).


//! Solution

//? Ck1) One precise selector

//* .card.featured button[data-action="add"]
//  Quick self-checks (run any/all)

//* It returns exactly one element:
document.querySelectorAll('.card.featured button[data-action="add"]').length === 1

//* Its closest card is featured:
document.querySelector('.card.featured button[data-action="add"]')?.closest('.card')?.classList.contains('featured') === true

//* It is the correct button:
document.querySelector('.card.featured button[data-action="add"]')?.textContent.trim() === 'Add to cart'

//? Ck2) Traverse up

//* Start from any .name element
const nameElement = document.querySelector('.name');

//* Traverse up to find the closest ancestor that contains the .grid
let current = nameElement;
while (current && !current.classList?.contains('grid')) {
    current = current.parentElement;
}

//* Now find the .grid within that ancestor
const gridElement = current ?? null;

//* Output the className of the grid element as proof
console.log(gridElement?.className);

//* Should print true (same node identity)
const realGrid = document.querySelector('.grid');
console.log(gridElement === realGrid);

//* Sanity facts about the grid node
console.log(gridElement?.tagName);      // "SECTION" in your playground
console.log(gridElement?.id);           // "products"
console.log(gridElement?.className);    // "grid"

//* Alternative (even shorter, still not global)
const gridElement = document.querySelector('.name')?.closest('.grid');
console.log(gridElement?.className);


//? Ck3) Insert before last

const grid = document.querySelector('.grid');
const last = grid?.lastElementChild;

const elCard = document.createElement('article');
elCard.className = 'card';
elCard.dataset.id = '99';

const h2 = document.createElement('h2');
h2.className = 'name';
h2.textContent = 'Ninety-Nine';
elCard.append(h2);

last?.before(elCard);

const tail = [...grid.querySelectorAll('.card')].slice(-2).map(c => c.dataset.id);
console.log(tail);


//? Ck4) Clean edges idempotently

const edge = document.querySelectorAll('.card');
if (edge.length === 0) throw new Error('No cards found.');

edge.forEach(card => {
    card.classList.remove('edge-first', 'edge-last');
});

const prevCard = edge[0];
prevCard.classList.add('edge-first');

const nextCard = edge[edge.length - 1];
nextCard.classList.add('edge-last');

const edgeFirstNode = document.querySelector('.edge-first');
const edgeLastNode = document.querySelector('.edge-last');

const idempotently = [
    edgeFirstNode?.dataset.id,
    edgeLastNode?.dataset.id
];

console.log(idempotently);

//* Feedback

console.log(
    document.querySelectorAll('.edge-first').length === 1,
    document.querySelectorAll('.edge-last').length === 1
);

const cards = document.querySelectorAll('.card');
console.log(
    cards[0].classList.contains('edge-first'),
    cards[cards.length - 1].classList.contains('edge-last')
);

//? Ck5) Safe tip under nav

const nav = document.querySelector('nav');

const p = document.createElement('p');
p.textContent = 'Tip: Use ';
const code = document.createElement('code');
code.textContent = 'querySelector';
p.appendChild(code);
p.appendChild(document.createTextNode(' for precision.'));

nav.parentNode.insertBefore(p, nav.nextElementSibling);

console.log(p.parentNode.tagName);

//* Feedback

// immediately before/after relationships
console.log(p.previousElementSibling === nav);         // should be true
console.log(nav.nextElementSibling === p);             // should be true

// content check
console.log(p.querySelector('code')?.textContent === 'querySelector'); // true


//TODO  Mini-project (1 small page tweak)

//? “Stats strip” above the grid
//  • Goal: insert a compact <div class="stats"> before .grid that shows:
//  • Total cards: X
//  • Even: E
//  • Odd: O
//  • Constraints: compute values from the current DOM; prefer small spans inside the div; DOM methods only; no innerHTML.
//  • Accept: X === E + O.
//  • Send me: the textContent of .stats once it’s inserted (one string).

//! Solution

const cards = document.querySelectorAll('.card');
const total = cards.length;
let even = 0;
let odd = 0;

cards.forEach(card => {
    const num = parseInt(card.getAttribute('data-id'), 10);
    if (!isNaN(num)) {
        num % 2 === 0 ? even++ : odd++;
    }
});

const statsDiv = document.createElement('div');
statsDiv.className = 'stats';

const totalSpan = document.createElement('span');
totalSpan.textContent = `Total cards: ${total}`;

const evenSpan = document.createElement('span');
evenSpan.textContent = `Even: ${even}`;

const oddSpan = document.createElement('span');
oddSpan.textContent = `Odd: ${odd}`;

statsDiv.appendChild(totalSpan);
statsDiv.appendChild(document.createTextNode(' '));
statsDiv.appendChild(evenSpan);
statsDiv.appendChild(document.createTextNode(' '));
statsDiv.appendChild(oddSpan);

const grid = document.querySelector('.grid');
grid.parentNode.insertBefore(statsDiv, grid);

statsDiv.textContent;


//! Feedback

//  Small improvements

//? 1. Idempotency (avoid duplicates). If you run it again, you’ll create another .stats. Update if it exists; insert only if missing.

const grid = document.querySelector('.grid');
const stats = document.querySelector('.stats') ?? document.createElement('div');
if (!stats.isConnected) grid.parentNode.insertBefore(stats, grid);
stats.className = 'stats';
// rebuild content each time (see #3)


//? 2. Numeric parsing. Reading the ID via dataset and Number() is a bit clearer:

const num = Number(card.dataset.id);
if (Number.isFinite(num)) { /* count even/odd */ }


//? 3. One-pass rebuild. Use replaceChildren to overwrite the content cleanly and add nice separators:

stats.replaceChildren(
    Object.assign(document.createElement('span'), { textContent: `Total cards: ${total}` }),
    document.createTextNode(' · '),
    Object.assign(document.createElement('span'), { textContent: `Even: ${even}` }),
    document.createTextNode(' · '),
    Object.assign(document.createElement('span'), { textContent: `Odd: ${odd}` })
);


//? 4. Self-checks (10 seconds).

console.log(total === even + odd);                                          // should be true
console.log(document.querySelectorAll('.stats').length);                    // should be 1
console.log(document.querySelector('.stats')?.nextElementSibling === grid); // true


//? 5. Optional polish (CSS).
//  Add a tiny style so it reads well:

//  .stats { margin: .5rem 0 1rem; font-size: .9rem; opacity: .85; }
//  .stats > span + span::before { content: " · "; margin: 0 .25rem; }


//* If you paste the value returned by statsDiv.textContent, I’ll tick the mini-project as complete.

const grid = document.querySelector('.grid');
const stats = document.querySelector('.stats') ?? document.createElement('div');
if (!stats.isConnected) grid.parentNode.insertBefore(stats, grid);

stats.className = 'stats'; stats.replaceChildren(
    Object.assign(document.createElement('span'), { textContent: `Total cards: ${total}` }),
    document.createTextNode(' · '),
    Object.assign(document.createElement('span'), { textContent: `Even: ${even}` }),
    document.createTextNode(' · '),
    Object.assign(document.createElement('span'), { textContent: `Odd: ${odd}` })
); 

console.log(total === even + odd);
console.log(document.querySelectorAll('.stats').length);
console.log(document.querySelector('.stats')?.nextElementSibling === grid);