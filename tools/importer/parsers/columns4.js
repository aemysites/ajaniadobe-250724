/* global WebImporter */
export default function parse(element, { document }) {
  // Get all column divs
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Each column's content (for this HTML, it's the img)
  const columnCells = columns.map((col) => {
    const img = col.querySelector('img');
    return img ? img : '';
  });
  // Header row must be a single cell
  const cells = [
    ['Columns (columns4)'],
    columnCells // Second row: as many columns as present in the input
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}