/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout which contains the columns
  const grid = element.querySelector('.grid-layout, .w-layout-grid');

  let columns = [];
  if (grid) {
    // Only consider direct children of the grid as columns
    columns = Array.from(grid.children);
  }

  // Defensive: if the grid is missing, exit gracefully
  if (!columns.length) {
    // no columns to process, do nothing
    return;
  }

  // Header row: single cell, exactly as required
  const headerRow = ['Columns (columns34)']; // This must ALWAYS be a single cell

  // Content row: one cell per column
  const contentRow = columns;

  const cells = [
    headerRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
