/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Accordion (accordion34)'];
  const cells = [headerRow];

  // Find all top-level accordion items
  // These should be direct children of 'element' with class including 'accordion' and 'w-dropdown',
  // but NOT the wrapper (which is just a flex-vertical container)
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion.w-dropdown'));
  accordionItems.forEach((item) => {
    // TITLE: Find the .w-dropdown-toggle inside each item, then the .paragraph-lg (the visible title span)
    let titleEl = null;
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      // The title is the .paragraph-lg, but if not, fallback to toggle
      titleEl = toggle.querySelector('.paragraph-lg') || toggle;
    } else {
      // fallback: first div with text inside the item
      titleEl = item.querySelector('.paragraph-lg') || item;
    }

    // CONTENT: The nav.accordion-content (or nav.w-dropdown-list), then the .rich-text/w-richtext child
    let contentEl = null;
    const nav = item.querySelector('nav.accordion-content, nav.w-dropdown-list');
    if (nav) {
      const rich = nav.querySelector('.rich-text, .w-richtext');
      contentEl = rich ? rich : nav;
    } else {
      // fallback: empty div, keep table shape
      contentEl = document.createElement('div');
    }

    // Add row (reference existing elements!)
    cells.push([
      titleEl,
      contentEl
    ]);
  });
  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
