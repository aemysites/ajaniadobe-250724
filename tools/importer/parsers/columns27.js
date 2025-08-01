/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (the columns container)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the immediate children of the grid (columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Reference the left/content column and right/image column
  const leftCol = columns[0];
  const rightCol = columns[1];

  // Compose the header row exactly matching the requested block name
  const headerRow = ['Columns (columns27)'];
  // Compose the content row referencing the actual column elements
  const contentRow = [leftCol, rightCol];

  // Build the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original section with the block table
  element.replaceWith(table);
}
