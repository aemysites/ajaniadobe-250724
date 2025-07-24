/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid
  const columns = Array.from(grid.children);
  if (columns.length < 1) return;

  // The example markdown for columns9 specifies a single header cell,
  // and the second row should have the number of columns matching the intended layout.
  // For the given footer HTML, the screenshot and the HTML show four columns.
  // So, we must create a table: header row (single cell), content row (four cells).
  // This matches the requirements and the original structure.

  // Table header row: single cell exactly as specified
  const headerRow = ['Columns (columns9)'];
  const contentRow = columns;

  // Create the columns9 block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the element
  element.replaceWith(table);
}
