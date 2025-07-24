/* global WebImporter */
export default function parse(element, { document }) {
  // Find the first child grid-layout, which contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all immediate children of the grid as columns
  const columns = Array.from(grid.children);
  if (!columns.length) return;
  // Build the table rows
  // Header row: exactly one column matching the example
  const headerRow = ['Columns (columns14)'];
  // Second row: as many columns as needed, each with a column element
  const contentRow = columns;
  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  // Replace the original element with the table
  element.replaceWith(table);
}
