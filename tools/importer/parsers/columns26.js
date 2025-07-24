/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that contains columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate column children (usually 2 cols, but could vary)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Table header, as specified
  const headerRow = ['Columns (columns26)'];
  // Table content row: all columns as-is, so content is resilient to small HTML variations
  const columnsRow = columns;

  const cells = [
    headerRow,
    columnsRow
  ];

  // Create and replace with the new table block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
