/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the row for the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid-layout (the columns)
  const columnEls = Array.from(grid.children);

  // Ensure we have at least one column
  if (columnEls.length === 0) return;

  // Build the table cells array for createTable
  // Header row as per spec: a single cell array with the header text
  const cells = [['Columns (columns31)']];

  // Columns row: each cell is an array of the column's child nodes (to include all content, not cloning)
  const columnsRow = columnEls.map(col => {
    // For robustness, include all childNodes except empty text nodes
    return Array.from(col.childNodes).filter(node => {
      return !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim());
    });
  });

  cells.push(columnsRow);

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
