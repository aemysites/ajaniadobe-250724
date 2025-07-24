/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as required
  const cells = [['Cards (cards24)']];
  // Find all direct card links
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach(card => {
    // --- Image cell (first column) ---
    // Use the first image found inside the first child div, or null
    let imageEl = null;
    const firstDiv = card.querySelector(':scope > div');
    if (firstDiv) {
      imageEl = firstDiv.querySelector('img');
    }
    // --- Text cell (second column) ---
    // Contains meta (tag & date) and title
    const textContent = [];
    // Meta info: tag and date row
    const metaRow = card.querySelector('.flex-horizontal');
    if (metaRow) textContent.push(metaRow);
    // Title
    const title = card.querySelector('h3');
    if (title) textContent.push(title);
    // Compose the row
    cells.push([
      imageEl,
      textContent
    ]);
  });
  // Create and replace with table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
