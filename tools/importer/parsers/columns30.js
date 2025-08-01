/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (each representing a column)
  const cols = Array.from(grid.children).filter((el) => el && el.nodeType === 1);

  // If there are less than 2 columns, don't proceed
  if (cols.length < 2) return;

  // The header row must have exactly one column with the exact text
  const cells = [['Columns (columns30)']];

  // The columns row must have as many cells as there are columns in the grid
  cells.push(cols);

  // Build the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
