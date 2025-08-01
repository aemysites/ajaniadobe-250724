/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header
  const headerRow = ['Columns (columns1)'];

  // 2. Select the columns: get the .grid-layout which holds column elements directly
  const grid = element.querySelector('.grid-layout');
  let contentRow = [];
  if (grid) {
    // Get top-level children of grid as columns (image, then right content)
    contentRow = Array.from(grid.children);
  } else {
    // Fallback: put all children except script/style, just in case structure changes
    contentRow = Array.from(element.children).filter(e => e.nodeName !== 'SCRIPT' && e.nodeName !== 'STYLE');
  }

  // 3. Compose the table: header, then one row with each column in a cell
  const cells = [
    headerRow,
    contentRow
  ];

  // 4. Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
