/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .w-layout-grid inside the section
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Header row: one single cell/column, as per spec
  const headerRow = ['Columns (columns3)'];

  // Content row: one cell per column, as per grid layout
  const contentRow = columns;

  // Structure for createTable: header row is a single column, content row has N columns
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
