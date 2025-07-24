/* global WebImporter */
export default function parse(element, { document }) {
  // Get all columns (children) of the grid layout
  const columns = Array.from(element.children);
  // For each column, include its content (img wrapper)
  const contentCells = columns.map(col => col.firstElementChild || col);
  // The first row is a single cell header, exact per requirements
  const cells = [
    ['Columns (columns28)'],
    contentCells
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
