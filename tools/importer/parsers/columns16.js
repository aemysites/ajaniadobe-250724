/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid of columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all columns
  const columnDivs = Array.from(grid.children);
  const numCols = columnDivs.length;

  // Each column's main content (image)
  const cells = columnDivs.map(col => {
    const img = col.querySelector('img');
    return img || col;
  });

  // Header row must have the same number of columns as the content row
  const headerRow = ['Columns (columns16)', ...Array(numCols - 1).fill('')];
  const tableRows = [headerRow, cells];

  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
