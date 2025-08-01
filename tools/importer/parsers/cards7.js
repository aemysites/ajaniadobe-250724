/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const rows = [['Cards (cards7)']];

  // Select all top-level card containers
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Image is the direct child <img> of each card container
    const img = cardDiv.querySelector('img');
    // For this HTML, there is no text content for the card (description, heading, etc)
    // So, the 2nd cell will be empty
    rows.push([img, '']);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
