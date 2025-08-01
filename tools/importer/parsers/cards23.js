/* global WebImporter */
export default function parse(element, { document }) {
  // Always start with the correct header row
  const headerRow = ['Cards (cards23)'];
  const rows = [headerRow];

  // Find all tab panes (each may contain a grid of cards)
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  tabPanes.forEach((tabPane) => {
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is a direct <a> child of the grid
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach((card) => {
      // IMAGE CELL
      // Find the first image under the card (may be missing)
      let img = card.querySelector('img');
      let imageCell = img ? img : '';

      // TEXT CELL
      // Try to gather heading and description in order
      // For heading: prefer h3 or element with class .h4-heading
      let heading = card.querySelector('h3, .h4-heading');
      let desc = card.querySelector('div.paragraph-sm');

      // Only push heading or description if they exist
      let textElems = [];
      if (heading) textElems.push(heading);
      if (desc) textElems.push(desc);

      // If none found, add empty string to preserve structure
      let textCell = textElems.length > 0 ? textElems : '';

      rows.push([imageCell, textCell]);
    });
  });

  // Create and replace with the cards block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
