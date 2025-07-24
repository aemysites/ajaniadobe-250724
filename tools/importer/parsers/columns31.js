/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid that contains the two columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get all direct children of grid (should be [img, content div])
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;
  // The first column is the image, the second is the content block
  const imgCol = columns[0];
  const contentCol = columns[1];
  // Build the table structure matching the example
  const headerRow = ['Columns (columns31)'];
  const contentRow = [imgCol, contentCol];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
