/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const grid = element.querySelector('.w-layout-grid, .grid-layout');
  if (!grid) return;

  const gridCols = Array.from(grid.children);

  // Compose left cell (all text content and list)
  const leftCell = document.createElement('div');
  if (gridCols[0]) leftCell.appendChild(gridCols[0]);
  if (gridCols[1]) leftCell.appendChild(gridCols[1]);

  // Compose right cell (image)
  let rightCell = null;
  if (gridCols.length > 2 && gridCols[2]) {
    if (gridCols[2].tagName === 'IMG') {
      rightCell = gridCols[2];
    } else {
      const img = gridCols[2].querySelector('img');
      rightCell = img ? img : document.createElement('div');
    }
  } else {
    rightCell = document.createElement('div');
  }

  // Header row must have two columns to match content row, with header in first cell
  const headerRow = ['Columns (columns18)', ''];
  const contentRow = [leftCell, rightCell];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
