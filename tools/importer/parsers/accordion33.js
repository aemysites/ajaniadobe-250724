/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row from block name
  const rows = [['Accordion (accordion33)']];

  // Find all direct accordion blocks in this element
  const accordions = Array.from(element.querySelectorAll(':scope > .accordion'));
  accordions.forEach((accordion) => {
    // Extract the title
    let titleElem = accordion.querySelector('.w-dropdown-toggle .paragraph-lg');
    if (!titleElem) {
      // fallback: take the toggle and use its text if .paragraph-lg is missing
      const toggle = accordion.querySelector('.w-dropdown-toggle');
      if (toggle) {
        const span = document.createElement('span');
        span.textContent = toggle.textContent.trim();
        titleElem = span;
      }
    }
    // Extract the content
    let contentElem = accordion.querySelector('nav.accordion-content .w-richtext');
    if (!contentElem) {
      // fallback: just use the accordion-content nav if .w-richtext is missing
      const nav = accordion.querySelector('nav.accordion-content');
      if (nav) {
        contentElem = nav;
      }
    }
    // Defensive: If still no content, use empty span
    if (!contentElem) {
      contentElem = document.createElement('span');
    }
    // Defensive: If no title, use empty span
    if (!titleElem) {
      titleElem = document.createElement('span');
    }
    rows.push([titleElem, contentElem]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
