/* global WebImporter */
export default function parse(element, { document }) {
  // The table header, as in the example
  const headerRow = ['Cards (cards18)'];

  // Each direct child div is a card
  const cardDivs = element.querySelectorAll(':scope > div');

  // For each card: first cell = icon div, second cell = text paragraph
  const rows = Array.from(cardDivs).map(cardDiv => {
    // Find the .icon div (which wraps the svg icon)
    const icon = cardDiv.querySelector('.icon');
    // Find the text paragraph (utility-margin-bottom-0)
    const text = cardDiv.querySelector('p, .utility-margin-bottom-0');
    // Use a placeholder empty div if missing to retain structure
    const iconCell = icon || document.createElement('div');
    const textCell = text || document.createElement('div');
    return [iconCell, textCell];
  });

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with the new table
  element.replaceWith(table);
}
