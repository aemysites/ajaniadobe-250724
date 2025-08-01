/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // The header row should be a single cell, regardless of number of columns (per requirements).
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns2)'], // header row: single cell
    columns // content row: one cell for each column content
  ], document);

  element.replaceWith(table);
}
