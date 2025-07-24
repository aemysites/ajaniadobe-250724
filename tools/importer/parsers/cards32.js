/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as specified
  const headerRow = ['Cards (cards32)'];

  // Find all immediate <a> children = one per card
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  const rows = cards.map(card => {
    // Card structure: <a> -> <div.grid> -> [img, contentDiv]
    // Select image (first img found inside the card)
    const img = card.querySelector('img');

    // Find the grid container (direct child div of <a>)
    const grid = card.querySelector(':scope > div');
    // The text content container is the second child of the grid
    let textDiv = null;
    if (grid && grid.children.length > 1) {
      textDiv = grid.children[1];
    }
    // Fallback: if grid not found or only one child, try last child div
    if (!textDiv) {
      const divs = card.querySelectorAll(':scope > div');
      if (divs.length > 0) {
        textDiv = divs[divs.length - 1];
      }
    }
    // Fallback to card itself if everything fails
    const textCell = textDiv || card;
    return [img, textCell];
  });
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
