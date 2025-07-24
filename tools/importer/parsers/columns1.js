/* global WebImporter */
export default function parse(element, { document }) {
  // Find the direct .container child
  const container = element.querySelector(':scope > .container');
  if (!container) return;

  // Find the grid that contains the columns
  const grid = container.querySelector(':scope > .grid-layout, :scope > [class*="grid-layout"]');
  if (!grid) return;

  // Get the immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children).filter((col) => col.nodeType === 1);
  if (columns.length === 0) return;

  // Table header row as per block definition
  const headerRow = ['Columns (columns1)'];

  // Table content row: each column as a cell
  const contentRow = columns.map((col) => col);

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
