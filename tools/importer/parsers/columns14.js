/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid - these are the columns
  const gridChildren = Array.from(grid.children);

  // The header row must be a single cell, regardless of the columns
  const headerRow = ['Columns (columns14)'];
  // The data row: one cell for each column
  const columnsRow = gridChildren;

  // Build the table (first row: 1 cell, second row: N cells)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  element.replaceWith(table);
}
