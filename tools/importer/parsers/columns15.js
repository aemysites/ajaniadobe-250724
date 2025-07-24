/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the columns
  let mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) {
    // fallback: look for grid-layout class anywhere
    mainGrid = element.querySelector('div.grid-layout') || element;
  }
  // Get column children
  const cols = Array.from(mainGrid.children);
  // Compose the columns for the block: use all direct children of the grid
  const columns = cols.map((col) => col);

  // Compose the table: header row one column, second row as many as needed
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns15)'], // header row: always one column
    columns,                 // second row: n columns
  ], document);
  element.replaceWith(table);
}
