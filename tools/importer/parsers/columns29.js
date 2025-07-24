/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that holds the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all first-level children of the grid for columns
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Table header row exactly matching the block name
  const headerRow = ['Columns (columns29)'];

  // Prepare the columns row, referencing existing elements (not cloning)
  const columnsRow = columns;

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
