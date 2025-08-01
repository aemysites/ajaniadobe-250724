/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (the columns)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid, each a column
  const columns = Array.from(grid.children);

  // The header row must be a single cell, not split into columns
  const header = ['Columns (columns9)'];

  // The second row (data row) has as many cells as there are columns
  const dataRow = columns.map(col => col);

  const table = WebImporter.DOMUtils.createTable([
    header, // header row: single cell
    dataRow // data row: one cell for each column
  ], document);

  element.replaceWith(table);
}
